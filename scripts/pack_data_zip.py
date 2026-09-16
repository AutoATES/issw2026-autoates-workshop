"""Build connaught_workshop_data.zip from data/ (rasters + shapefiles)."""
from __future__ import annotations

import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
DATA = REPO / "data"
DEST = REPO / "outputs" / "connaught_workshop_data.zip"
SKIP = {".gitkeep"}


def main() -> None:
    DEST.parent.mkdir(parents=True, exist_ok=True)
    files = [
        p for p in DATA.rglob("*")
        if p.is_file() and p.name not in SKIP and p.suffix != ".md"
    ]
    with zipfile.ZipFile(DEST, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for p in files:
            zf.write(p, p.relative_to(REPO))
    mb = DEST.stat().st_size / 1e6
    print(f"wrote {DEST} ({mb:.1f} MB, {len(files)} files)")


if __name__ == "__main__":
    main()
