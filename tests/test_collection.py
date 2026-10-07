"""Regression tests for integrity, scope and upstream preservation."""

import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from validate import SELECTED, load_manifest, safe_path, validate


class CollectionTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name) / "collection"
        shutil.copytree(ROOT, self.root, ignore=shutil.ignore_patterns(
            ".git", "__pycache__"))

    def change_lock(self, mutate):
        path = self.root / "sources.lock.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        mutate(data)
        path.write_text(json.dumps(data), encoding="utf-8")

    def test_clean_clone_validates_without_network(self):
        with patch("subprocess.run", side_effect=AssertionError("network/process not expected")):
            self.assertEqual(validate(self.root), len(SELECTED))

    def test_upstream_edit_is_rejected(self):
        path = self.root / "skills/tdd/SKILL.md"
        path.write_bytes(path.read_bytes() + b"\nChanged\n")
        with self.assertRaisesRegex(ValueError, "Hash mismatch"):
            validate(self.root)

    def test_extra_skill_is_rejected(self):
        (self.root / "skills/unrequested").mkdir()
        with self.assertRaisesRegex(ValueError, "Unselected content"):
            validate(self.root)

    def test_duplicate_manifest_name_is_rejected(self):
        self.change_lock(lambda data: data["skills"].append(data["skills"][0]))
        with self.assertRaisesRegex(ValueError, f"exactly the {len(SELECTED)}"):
            load_manifest(self.root)

    def test_required_dependency_cannot_be_dropped(self):
        self.change_lock(lambda data: next(entry for entry in data["skills"]
                                          if entry["name"] == "grill-with-docs").update(required_skills=[]))
        with self.assertRaisesRegex(ValueError, "Required skill dependencies changed"):
            load_manifest(self.root)

    def test_dependency_folder_is_required_in_clean_clone(self):
        shutil.rmtree(self.root / "skills/grilling")
        with self.assertRaisesRegex(ValueError, "Missing skill folder: grilling"):
            validate(self.root)

    def test_unapproved_repository_is_rejected(self):
        self.change_lock(lambda data: data["skills"][0].update(repository="https://example.com/code.git"))
        with self.assertRaisesRegex(ValueError, "Unapproved source"):
            load_manifest(self.root)

    def test_path_traversal_is_rejected(self):
        for path in ("../outside", "/absolute", "C:/outside", "a/../../outside", "a\\outside"):
            with self.subTest(path=path), self.assertRaises(ValueError):
                safe_path(self.root, path)

    def test_broken_local_link_is_rejected(self):
        path = self.root / "docs/quality-extra.md"
        path.write_text("[Missing](missing.md)\n", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "Broken/unsafe link"):
            validate(self.root)

    def test_executable_mode_is_checked(self):
        subprocess.run(["git", "init", "--quiet", "--template=", str(self.root)], check=True)
        script = "skills/tdd/SKILL.md"
        subprocess.run(["git", "-C", str(self.root), "add", "--", script], check=True)
        subprocess.run(["git", "-C", str(self.root), "update-index", "--chmod=+x", "--", script], check=True)
        with self.assertRaisesRegex(ValueError, "Git file mode mismatch"):
            validate(self.root)
        subprocess.run(["git", "-C", str(self.root), "update-index", "--chmod=-x", "--", script], check=True)
        self.assertEqual(validate(self.root), len(SELECTED))


if __name__ == "__main__":
    unittest.main()
