import argparse
import os
import re
from typing import Dict, List, Tuple


ALLOWED_MODELS = {
    "ByteDance",
    "ChatGPT",
    "Flux",
    "Grok",
    "Ideogram",
    "Leonardo",
    "Midjourney",
    "NanoBananaPro",
    "Qwen",
    "Reve",
}

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def canonicalize_model_name(raw: str) -> str:
    """
    Map a directory name to one of the allowed model names.

    Rules:
    - Strip all non-alphanumeric characters and compare case-insensitively.
    - Special-case any "Nano Banana"/"Nano Banana Pro" variants to NanoBananaPro.
    """
    # Remove anything that's not a letter or digit
    cleaned = re.sub(r"[^A-Za-z0-9]", "", raw).lower()

    # Special-case Nano Banana variants
    if cleaned.startswith("nanobanana"):
        return "NanoBananaPro"

    for model in ALLOWED_MODELS:
        model_clean = re.sub(r"[^A-Za-z0-9]", "", model).lower()
        if cleaned == model_clean:
            return model

    raise ValueError(f"Directory '{raw}' does not map to a known model name")


def normalize_parent_dir_name(dir_name: str) -> str:
    """
    Convert a parent directory name to the desired `<parent-directory-name>`:
    - Replace spaces with underscores.
    - Preserve other punctuation (e.g., periods) as-is.
    Example: 'Claude 2.1 Maya Coorporate' -> 'Claude_2.1_Maya_Coorporate'
    """
    return dir_name.replace(" ", "_")


def collect_image_files(root: str) -> List[Tuple[str, List[str]]]:
    """
    Walk the tree and return a list of (dirpath, [image filenames]) pairs
    where each dirpath contains at least one image file.
    """
    results: List[Tuple[str, List[str]]] = []
    for dirpath, dirnames, filenames in os.walk(root):
        image_files = [
            f
            for f in filenames
            if os.path.splitext(f)[1].lower() in IMAGE_EXTENSIONS
        ]
        if image_files:
            results.append((dirpath, image_files))
    return results


def build_rename_plan(
    root: str,
) -> List[Tuple[str, str]]:
    """
    Build a list of (old_path, new_path) renames that would bring all image files
    under `root` into the pattern:

        <parent-directory-name>-<model-name>-<seq>.<extension>

    where:
      - <parent-directory-name> is the name of the *top-level* parent folder
        under `root`, with spaces replaced by underscores.
      - <model-name> is one of the allowed model names.
      - <seq> is a 1-based index within each model directory.
    """
    plan: List[Tuple[str, str]] = []

    image_dirs = collect_image_files(root)

    root_basename = os.path.basename(os.path.abspath(root))

    for dirpath, files in image_dirs:
        rel = os.path.relpath(dirpath, root)
        parts = rel.split(os.sep)

        # We support two layouts:
        #   1) Global root:   <root>/<parent-directory-name>/<model-directory>/[...images...]
        #   2) Per-parent root:  <root>/<model-directory>/[...images...]  (where root *is* the parent)
        if len(parts) >= 2:
            parent_dir_raw = parts[0]
            model_dir_raw = parts[1]
        elif len(parts) == 1:
            # Treat the provided root directory itself as the parent
            parent_dir_raw = root_basename
            model_dir_raw = parts[0]
        else:
            print(f"Skipping directory (not parent/model structure): {dirpath}")
            continue

        parent_name = normalize_parent_dir_name(parent_dir_raw)

        try:
            model_name = canonicalize_model_name(model_dir_raw)
        except ValueError as e:
            print(f"WARNING: {e}; skipping directory {dirpath}")
            continue

        # Sort files to make sequencing deterministic
        files_sorted = sorted(files)

        # Build target names per directory
        used_targets: Dict[str, str] = {}
        for idx, fname in enumerate(files_sorted, start=1):
            ext = os.path.splitext(fname)[1]
            ext_lower = ext.lower()
            if ext_lower not in IMAGE_EXTENSIONS:
                continue

            new_name = f"{parent_name}-{model_name}-{idx}{ext_lower}"
            if fname == new_name:
                # Already in desired format for this position; leave as-is
                continue

            # Ensure uniqueness within this directory
            if new_name in used_targets:
                raise RuntimeError(
                    f"Target name collision in {dirpath}: "
                    f"{fname} and {used_targets[new_name]} -> {new_name}"
                )

            used_targets[new_name] = fname

            old_path = os.path.join(dirpath, fname)
            new_path = os.path.join(dirpath, new_name)
            plan.append((old_path, new_path))

    return plan


def apply_rename_plan(plan: List[Tuple[str, str]], dry_run: bool = True) -> None:
    """
    Apply the rename plan. Uses a two-phase rename with temporary names to avoid
    collisions when renaming multiple files within the same directory.
    """
    if not plan:
        print("No files to rename.")
        return

    print(f"Planned renames: {len(plan)} file(s)")
    for src, dst in plan:
        print(f"{src} -> {dst}")

    if dry_run:
        print("\nDry run only; no files were renamed.")
        return

    # Phase 1: rename everything to temporary names
    temp_paths: Dict[str, str] = {}
    for idx, (src, _dst) in enumerate(plan):
        dirpath = os.path.dirname(src)
        basename = os.path.basename(src)
        temp_name = f"__tmp_renaming_{idx}__{basename}"
        temp_path = os.path.join(dirpath, temp_name)
        os.rename(src, temp_path)
        temp_paths[src] = temp_path

    # Phase 2: rename temporary names to final destinations
    for src, dst in plan:
        temp_path = temp_paths[src]
        final_dir = os.path.dirname(dst)
        os.makedirs(final_dir, exist_ok=True)
        os.rename(temp_path, dst)

    print("\nRename applied successfully.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Normalize image filenames to the pattern "
            "<parent-directory-name>-<model-name>-<seq>.<extension>"
        )
    )
    parser.add_argument(
        "--root",
        type=str,
        default=".",
        help="Root directory to scan (default: current directory).",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually perform the renames. Without this flag, runs in dry-run mode.",
    )
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    print(f"Scanning root: {root}")

    plan = build_rename_plan(root)
    apply_rename_plan(plan, dry_run=not args.apply)


if __name__ == "__main__":
    main()


