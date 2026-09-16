#!/usr/bin/env python3
"""Pass/fail check for the ISSW autoATES workshop environment.

Run from anywhere, with the workshop conda env activated:

    python check_setup.py
"""
from __future__ import annotations

import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent
sys.path.insert(0, str(REPO / "notebooks"))

ok = True


def check(name: str, fn) -> None:
    global ok
    try:
        detail = fn()
        print(f"  OK   {name}" + (f"  ({detail})" if detail else ""))
    except Exception as exc:
        ok = False
        print(f"  FAIL {name}")
        print(f"       {type(exc).__name__}: {exc}")


def main() -> int:
    print("ISSW 2026 autoATES workshop — setup check")
    print(f"python: {sys.executable}")
    print(f"repo:   {REPO}")
    print()

    print("Python packages")

    def _pkg(mod):
        m = __import__(mod)

        def _inner():
            return getattr(m, "__version__", m.__file__)

        return _inner

    for name in ("numpy", "scipy", "rasterio", "geopandas", "numba", "matplotlib"):
        check(name, _pkg(name))
    check("yaml", _pkg("yaml"))

    print()
    print("Libraries (AutoATES + AvaFrame)")
    from workshop import AUTOATES_ROOT, AVAFRAME_ROOT, DATA

    def _autoates():
        if not (AUTOATES_ROOT / "autoates").exists():
            raise FileNotFoundError(
                f"autoates package not found at {AUTOATES_ROOT}. "
                "Clone AutoATES-v3.0 next to this repo, or set AUTOATES_ROOT."
            )
        import autoates  # noqa: F401

        return str(AUTOATES_ROOT)

    def _avaframe():
        if not (AVAFRAME_ROOT / "avaframe").exists():
            raise FileNotFoundError(
                f"avaframe package not found at {AVAFRAME_ROOT}. "
                "Clone AvaFrame next to this repo, or set AVAFRAME_ROOT."
            )
        import avaframe  # noqa: F401
        from avaframe.com4FlowPy import com4FlowPy  # noqa: F401

        return str(AVAFRAME_ROOT)

    check("autoates", _autoates)
    check("avaframe.com4FlowPy", _avaframe)

    print()
    print("Connaught data")

    required = [
        DATA / "aoi" / "connaught_creek.shp",
        DATA / "01_elevation" / "inputs" / "alos_aw3d30_connaught.tif",
        DATA / "02_forest" / "inputs" / "sen2_forest_binary.tif",
        DATA / "02_forest" / "outputs_reference" / "sen2_canopy_cover.tif",
        DATA / "03_pra" / "outputs_reference" / "pra_frequent_pra_sieve.tif",
        DATA / "04_runout" / "outputs_reference" / "frequent",
        DATA / "05_ates" / "outputs_reference" / "ATES_classification.tif",
        DATA / "00_orientation" / "inputs" / "expert_consensus.shp",
    ]

    def _file(p: Path):
        def _inner():
            if p.is_dir():
                n = len(list(p.glob("*.tif")))
                if n == 0:
                    raise FileNotFoundError(f"no GeoTIFFs in {p}")
                return f"{n} tifs"
            if not p.exists():
                raise FileNotFoundError(p)
            return f"{p.stat().st_size / 1e3:.0f} kB"

        return _inner

    for p in required:
        check(str(p.relative_to(REPO)), _file(p))

    print()
    if ok:
        print("All checks passed. Open Jupyter with:")
        print("  jupyter lab notebooks/00_orientation.ipynb")
        print("Pick the kernel named 'autoATES workshop' if you see more than one.")
        return 0
    print("One or more checks failed. See SETUP.md (and the AI prompt there).")
    print("You can still come and watch — this does not block the observe track.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
