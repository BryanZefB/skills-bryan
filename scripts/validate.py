"""Validate the selected collection without running third-party code."""

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path, PurePosixPath
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
SELECTED = {
    "good-design", "grill-me", "grill-with-docs", "frontend-design",
    "vercel-react-best-practices", "diagnosing-bugs", "code-review",
    "codebase-design", "domain-modeling", "tdd", "to-spec", "to-tickets",
}
EXTERNAL = {"good-design", "grill-me"}
SOURCES = {
    "good-design": ("kipperacademy/skillpper", "good-design"),
    "grill-me": ("kipperacademy/skillpper", "grill-me"),
    "frontend-design": ("anthropics/skills", "skills/frontend-design"),
    "vercel-react-best-practices": ("vercel-labs/agent-skills", "skills/react-best-practices"),
    **{name: ("mattpocock/skills", f"skills/engineering/{name}")
       for name in SELECTED - EXTERNAL - {"frontend-design", "vercel-react-best-practices"}},
}


def safe_path(root, relative):
    """Accept only portable, contained paths with no symlink parents."""
    if not isinstance(relative, str) or not relative or "\\" in relative or ":" in relative:
        raise ValueError(f"Invalid relative path: {relative!r}")
    pure = PurePosixPath(relative)
    if pure.is_absolute() or any(part in ("", ".", "..") for part in relative.split("/")):
        raise ValueError(f"Unsafe path: {relative!r}")
    root = root.resolve()
    target = root.joinpath(*pure.parts)
    current = root
    for part in pure.parts:
        current = current / part
        if current.is_symlink() or (hasattr(current, "is_junction") and current.is_junction()):
            raise ValueError(f"Link is not allowed: {relative}")
    if not target.resolve().is_relative_to(root):
        raise ValueError(f"Path escapes root: {relative}")
    return target


def load_manifest(root):
    data = json.loads((root / "sources.lock.json").read_text(encoding="utf-8"))
    if data.get("schema_version") != 1:
        raise ValueError("Unsupported manifest schema")
    entries = data.get("skills", [])
    names = [entry.get("name") for entry in entries]
    if len(names) != len(SELECTED) or set(names) != SELECTED:
        raise ValueError("Manifest must contain exactly the 12 selected skill names")
    for entry in entries:
        name = entry["name"]
        slug, upstream_path = SOURCES[name]
        if entry["repository"] != f"https://github.com/{slug}.git" or entry["upstream_path"] != upstream_path:
            raise ValueError(f"Unapproved source for {name}")
        if entry["path"] != f"skills/{name}":
            raise ValueError(f"Unexpected destination for {name}")
        safe_path(root, entry["path"])
        if not re.fullmatch(r"[a-f0-9]{40}", entry["commit"]):
            raise ValueError(f"Unpinned commit for {name}")
        expected_distribution = "external" if name in EXTERNAL else "vendored"
        if entry["distribution"] != expected_distribution:
            raise ValueError(f"Unexpected distribution for {name}")
        expected_license = "NOASSERTION" if name in EXTERNAL else (
            "Apache-2.0" if name == "frontend-design" else "MIT")
        if entry["license"] != expected_license:
            raise ValueError(f"Unexpected license for {name}")
        if "SKILL.md" not in entry["files"]:
            raise ValueError(f"Missing entrypoint for {name}")
        for relative, record in entry["files"].items():
            safe_path(root / entry["path"], relative)
            if record["mode"] not in ("100644", "100755"):
                raise ValueError(f"Unsupported file mode for {name}/{relative}")
            if not re.fullmatch(r"[a-f0-9]{64}", record["sha256"]):
                raise ValueError(f"Invalid SHA-256 for {name}/{relative}")
            if not re.fullmatch(r"[a-f0-9]{40}", record["git_blob"]):
                raise ValueError(f"Invalid Git blob for {name}/{relative}")
        if set(entry["files"]) & set(entry["packaging_files"]):
            raise ValueError(f"Packaging overwrites upstream content for {name}")
        for relative, digest in entry["packaging_files"].items():
            safe_path(root / entry["path"], relative)
            if not re.fullmatch(r"[a-f0-9]{64}", digest):
                raise ValueError(f"Invalid packaging hash for {name}/{relative}")
    return data


def verify_folder(root, entry):
    folder = safe_path(root, entry["path"])
    expected = set(entry["files"]) | set(entry["packaging_files"])
    if not folder.is_dir():
        raise ValueError(f"Missing skill folder: {entry['name']}")
    actual = set()
    for path in folder.rglob("*"):
        relative = path.relative_to(folder).as_posix()
        safe_path(folder, relative)
        if path.is_file():
            actual.add(relative)
    if actual != expected:
        raise ValueError(f"File inventory mismatch for {entry['name']}: "
                         f"missing={sorted(expected - actual)}, extra={sorted(actual - expected)}")
    for relative in sorted(expected):
        content = safe_path(folder, relative).read_bytes()
        record = entry["files"].get(relative)
        digest = record["sha256"] if record else entry["packaging_files"][relative]
        if hashlib.sha256(content).hexdigest() != digest:
            raise ValueError(f"Hash mismatch: {entry['name']}/{relative}")
        if record:
            blob = b"blob " + str(len(content)).encode() + b"\0" + content
            if hashlib.sha1(blob).hexdigest() != record["git_blob"]:
                raise ValueError(f"Git blob mismatch: {entry['name']}/{relative}")
    text = (folder / "SKILL.md").read_text(encoding="utf-8")
    parts = text.split("---", 2)
    if not text.startswith("---\n") or len(parts) != 3:
        raise ValueError(f"Missing frontmatter for {entry['name']}")
    name_match = re.search(r"^name:\s*(.+)$", parts[1], re.MULTILINE)
    if not name_match or name_match.group(1).strip().strip("\"'") != entry["name"]:
        raise ValueError(f"Frontmatter name mismatch for {entry['name']}")
    if not re.search(r"^description:\s*\S", parts[1], re.MULTILINE):
        raise ValueError(f"Missing description for {entry['name']}")


def validate(root, require_external=False):
    root = root.resolve()
    data = load_manifest(root)
    absent_external = []
    for entry in data["skills"]:
        folder = safe_path(root, entry["path"])
        if entry["distribution"] == "external" and not folder.exists() and not require_external:
            absent_external.append(entry["name"])
            continue
        verify_folder(root, entry)
    skills_root = root / "skills"
    for path in skills_root.iterdir():
        if path.name not in SELECTED or not path.is_dir():
            raise ValueError(f"Unselected content under skills/: {path.name}")
    if (root / ".git").exists():
        result = subprocess.run(["git", "-C", str(root), "ls-files", "-z", "--", "skills"],
                                capture_output=True, check=True)
        tracked = result.stdout.decode().split("\0")
        for path in tracked:
            if any(path.startswith(f"skills/{name}/") for name in EXTERNAL):
                raise ValueError(f"External-only file tracked by Git: {path}")
    for file in root.rglob("*.md"):
        if ".git" in file.parts or file.is_relative_to(skills_root):
            continue
        for destination in re.findall(r"\[[^\]]*\]\(([^)]+)\)", file.read_text(encoding="utf-8")):
            destination = destination.strip().strip("<>")
            if re.match(r"(?:https?://|mailto:|#)", destination):
                continue
            relative = unquote(destination.split("#", 1)[0])
            if not relative:
                continue
            target = (file.parent / relative).resolve()
            if not target.is_relative_to(root) or not target.exists():
                raise ValueError(f"Broken/unsafe link in {file.relative_to(root)}: {destination}")
    for directory in ("scripts", "tests"):
        for file in (root / directory).glob("*.py"):
            compile(file.read_text(encoding="utf-8"), str(file), "exec")
    return absent_external


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--require-external", action="store_true",
                        help="Require the two local-only skills to have been fetched")
    args = parser.parse_args()
    try:
        absent = validate(ROOT, args.require_external)
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        return 1
    print(f"OK: 12 selected sources; {12 - len(absent)} skill folders verified.")
    if absent:
        print("External-only, not fetched in this clone: " + ", ".join(absent))
    print("Known limitation: grill-with-docs requires unselected skill 'grilling'.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
