"""Validate the selected collection without running third-party code."""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path, PurePosixPath
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
SELECTED = {
    "grill-with-docs", "frontend-design",
    "vercel-composition-patterns", "diagnosing-bugs", "code-review",
    "codebase-design", "domain-modeling", "tdd", "to-spec", "to-tickets",
    "grilling", "setup-matt-pocock-skills", "security-best-practices",
    "security-threat-model", "playwright-cli", "supabase-postgres-best-practices",
    "web-design-guidelines",
}
SOURCES = {
    "frontend-design": ("anthropics/skills", "skills/frontend-design"),
    "playwright-cli": ("microsoft/playwright-cli", "skills/playwright-cli"),
    "vercel-composition-patterns": ("vercel-labs/agent-skills", "skills/composition-patterns"),
    "web-design-guidelines": ("vercel-labs/agent-skills", "skills/web-design-guidelines"),
    "security-best-practices": ("openai/skills", "skills/.curated/security-best-practices"),
    "security-threat-model": ("openai/skills", "skills/.curated/security-threat-model"),
    "supabase-postgres-best-practices": ("supabase/agent-skills", "skills/supabase-postgres-best-practices"),
    "grilling": ("mattpocock/skills", "skills/productivity/grilling"),
    **{name: ("mattpocock/skills", f"skills/engineering/{name}")
       for name in {"grill-with-docs", "code-review", "codebase-design", "domain-modeling",
                    "tdd", "to-spec", "to-tickets", "diagnosing-bugs", "setup-matt-pocock-skills"}},
}
APACHE_LICENSED = {"frontend-design", "playwright-cli", "security-best-practices", "security-threat-model"}
REQUIRED_SKILLS = {
    "grill-with-docs": ["grilling", "domain-modeling"],
    "code-review": ["setup-matt-pocock-skills"],
    "to-spec": ["setup-matt-pocock-skills"],
    "to-tickets": ["setup-matt-pocock-skills"],
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
        raise ValueError(f"Manifest must contain exactly the {len(SELECTED)} selected skill names")
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
        if entry["distribution"] != "vendored":
            raise ValueError(f"Unexpected distribution for {name}")
        expected_license = "Apache-2.0" if name in APACHE_LICENSED else "MIT"
        if entry["license"] != expected_license:
            raise ValueError(f"Unexpected license for {name}")
        if entry.get("required_skills", []) != REQUIRED_SKILLS.get(name, []):
            raise ValueError(f"Required skill dependencies changed for {name}")
        for dependency in entry.get("required_skills", []):
            if dependency not in names:
                raise ValueError(f"Missing dependency for {name}: {dependency}")
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


def validate(root):
    root = root.resolve()
    data = load_manifest(root)
    for entry in data["skills"]:
        verify_folder(root, entry)
    skills_root = root / "skills"
    for path in skills_root.iterdir():
        if path.name not in SELECTED or not path.is_dir():
            raise ValueError(f"Unselected content under skills/: {path.name}")
    if (root / ".git").exists():
        staged = subprocess.run(["git", "-C", str(root), "ls-files", "--stage", "-z", "--", "skills"],
                                capture_output=True, check=True)
        index = {}
        for row in staged.stdout.split(b"\0"):
            if not row:
                continue
            metadata, path = row.split(b"\t", 1)
            mode, blob, stage = metadata.decode().split()
            if stage != "0":
                raise ValueError(f"Unresolved Git index conflict: {path.decode()}")
            index[path.decode()] = (mode, blob)
        for entry in data["skills"]:
            for relative, record in entry["files"].items():
                path = entry["path"] + "/" + relative
                if path not in index:
                    continue
                mode, blob = index[path]
                if mode != record["mode"]:
                    raise ValueError(f"Git file mode mismatch: {path}")
                if blob != record["git_blob"]:
                    raise ValueError(f"Git index blob mismatch: {path}")
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
    return len(data["skills"])


def main():
    try:
        count = validate(ROOT)
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        return 1
    print(f"OK: all {count} selected skill folders verified and distributed.")
    print("OK: required Matt Pocock skill dependencies are available.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
