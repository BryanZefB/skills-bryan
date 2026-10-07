"""Fetch only the two selected external sources, without overwriting files."""

import hashlib
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from validate import EXTERNAL, ROOT, load_manifest, safe_path, verify_folder


def extract_repository(repo, entry, destination):
    records = subprocess.check_output([
        "git", "-C", str(repo), "ls-tree", "-rz", entry["commit"], "--", entry["upstream_path"]
    ]).split(b"\0")
    found = {}
    for record in records:
        if not record:
            continue
        metadata, raw_path = record.split(b"\t", 1)
        mode, kind, blob = metadata.decode().split()
        if kind != "blob" or mode not in ("100644", "100755"):
            raise ValueError("Only regular upstream files are accepted")
        path = raw_path.decode("utf-8")
        prefix = entry["upstream_path"] + "/"
        if not path.startswith(prefix):
            raise ValueError("Unexpected upstream path")
        relative = path[len(prefix):]
        expected = entry["files"].get(relative)
        if not expected or expected["git_blob"] != blob or expected["mode"] != mode:
            raise ValueError(f"Upstream inventory differs from lock: {relative}")
        content = subprocess.check_output(["git", "-C", str(repo), "cat-file", "blob", blob])
        if hashlib.sha256(content).hexdigest() != expected["sha256"]:
            raise ValueError(f"Upstream bytes differ from lock: {relative}")
        target = safe_path(destination, relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)
        if mode == "100755" and os.name != "nt":
            target.chmod(0o755)
        found[relative] = expected
    if set(found) != set(entry["files"]):
        raise ValueError("Upstream file inventory is incomplete")


def fetch(root):
    data = load_manifest(root)
    entries = [entry for entry in data["skills"] if entry["name"] in EXTERNAL]
    pending = []
    # Preflight both before making any change.
    for entry in entries:
        target = safe_path(root, entry["path"])
        if target.exists():
            verify_folder(root, entry)
            print(f"Already present and unchanged: {entry['name']}")
        else:
            pending.append(entry)
    if not pending:
        return
    # Staging stays on the same filesystem for rename. No checkout, hooks,
    # filters, helper scripts or downloaded Python code are executed.
    with tempfile.TemporaryDirectory(prefix=".skills-fetch-", dir=root) as staging:
        staging = Path(staging)
        repositories = {}
        staged = []
        for entry in pending:
            key = (entry["repository"], entry["commit"])
            if key not in repositories:
                repo = staging / f"repo-{len(repositories)}"
                subprocess.run(["git", "init", "--quiet", "--template=", str(repo)], check=True)
                subprocess.run([
                    "git", "-C", str(repo), "-c", "core.hooksPath=" + str(staging / "no-hooks"),
                    "fetch", "--quiet", "--depth=1", entry["repository"], entry["commit"]
                ], check=True)
                repositories[key] = repo
            folder = staging / entry["name"]
            folder.mkdir()
            extract_repository(repositories[key], entry, folder)
            staged.append((entry, folder))
        # All downloads and hashes succeed before making folders visible.
        for entry, folder in staged:
            target = safe_path(root, entry["path"])
            if target.exists():
                raise ValueError(f"Destination appeared during fetch; refusing overwrite: {target}")
            target.parent.mkdir(parents=True, exist_ok=True)
            folder.rename(target)
            print(f"Fetched pinned original files: {entry['name']}")


def main():
    try:
        fetch(ROOT)
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        return 1
    print("External files remain local-only and ignored by Git; no skills were installed in an agent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
