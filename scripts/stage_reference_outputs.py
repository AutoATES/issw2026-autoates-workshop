"""Copy a finished outputs/connaught run into data/*/outputs_reference/.

Idempotent. Run after scripts/run_pipeline.py succeeds.
"""
from __future__ import annotations

import shutil
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
RUN = REPO / "outputs" / "connaught"
DATA = REPO / "data"


def _copy(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    print(f"{src.relative_to(REPO)} -> {dest.relative_to(REPO)}")


def _copy_glob(folder: Path, pattern: str, dest_dir: Path) -> int:
    n = 0
    dest_dir.mkdir(parents=True, exist_ok=True)
    for src in sorted(folder.glob(pattern)):
        if src.is_file():
            shutil.copy2(src, dest_dir / src.name)
            print(f"{src.relative_to(REPO)} -> {dest_dir.relative_to(REPO)}/")
            n += 1
    return n


def main() -> None:
    if not RUN.exists():
        raise SystemExit(f"no run directory: {RUN}")

    pra = RUN / "PRA"
    _copy(pra / "autoATES_v3_DSM_00.tif", DATA / "01_elevation" / "outputs_reference" / "dem_aligned.tif")
    slope = pra / "pra_frequent_slope.tif"
    if slope.exists():
        _copy(slope, DATA / "01_elevation" / "outputs_reference" / "slope.tif")

    forest = pra / "autoATES_v3_FOREST_CANOPY_00.tif"
    if forest.exists():
        _copy(forest, DATA / "02_forest" / "outputs_reference" / "sen2_canopy_cover_aligned.tif")

    _copy_glob(pra, "pra_frequent_*", DATA / "03_pra" / "outputs_reference")
    _copy_glob(pra, "pra_extreme_*", DATA / "03_pra" / "outputs_reference")
    for extra in ("pra_treeline.tif",):
        p = pra / extra
        if p.exists():
            _copy(p, DATA / "03_pra" / "outputs_reference" / extra)

    for scen in ("frequent", "extreme"):
        res_dirs = sorted((RUN / "FlowPy" / scen).glob("res_*"))
        if not res_dirs:
            print(f"WARNING: no FlowPy res dir for {scen}")
            continue
        dest = DATA / "04_runout" / "outputs_reference" / scen
        dest.mkdir(parents=True, exist_ok=True)
        n = _copy_glob(res_dirs[-1], "com4_*_run_*.tif", dest)
        print(f"  {scen}: {n} rasters from {res_dirs[-1].name}")

    ates = RUN / "ATES"
    for name in (
        "ATES_classification.tif",
        "ATES_classification_rgb.tif",
        "ATES_classification.gpkg",
    ):
        p = ates / name
        if p.exists():
            _copy(p, DATA / "05_ates" / "outputs_reference" / name)

    rgb = RUN / "rgb"
    if rgb.exists():
        dest = DATA / "00_orientation" / "outputs_reference"
        _copy_glob(rgb, "*ates*", dest)
        # finished map for the opening
        for cand in sorted(rgb.glob("*ates*")):
            if cand.suffix == ".tif":
                _copy(cand, DATA / "00_orientation" / "inputs" / "ates_finished.tif")
                break

    print("done")


if __name__ == "__main__":
    main()
