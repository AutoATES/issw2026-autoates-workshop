"""Shared paths and plotting for the ISSW workshop notebooks."""
from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import rasterio
from matplotlib.colors import ListedColormap

REPO = Path(__file__).resolve().parents[1]
DATA = REPO / "data"
OUT = REPO / "outputs" / "connaught"


def _first_existing(candidates, marker: str) -> Path | None:
    for raw in candidates:
        if not raw:
            continue
        p = Path(raw).expanduser().resolve()
        if (p / marker).exists():
            return p
    return None


def find_autoates() -> Path:
    found = _first_existing(
        [
            os.environ.get("AUTOATES_ROOT"),
            REPO.parent / "autoATES-v3.0-issw",
            REPO.parent / "AutoATES-v3.0",
            REPO.parent / "AutoATES" / "AutoATES-v3.0",
            Path.home() / "Documents" / "Code" / "autoATES-v3.0-issw",
            Path.home() / "Documents" / "Code" / "AutoATES" / "AutoATES-v3.0",
            Path.home() / "Documents" / "autoATES-v3.0-issw",
            Path.home() / "Documents" / "AutoATES-v3.0",
        ],
        marker="autoates",
    )
    return found or (REPO.parent / "autoATES-v3.0-issw")


def find_avaframe() -> Path:
    """Directory that contains the `avaframe` Python package."""
    found = _first_existing(
        [
            os.environ.get("AVAFRAME_ROOT"),
            REPO.parent / "AvaFrame",
            REPO.parent / "AvaFrame" / "AvaFrame",
            Path.home() / "Documents" / "Code" / "AvaFrame" / "AvaFrame",
            Path.home() / "Documents" / "AvaFrame",
        ],
        marker="avaframe",
    )
    return found or (REPO.parent / "AvaFrame")


AUTOATES_ROOT = find_autoates()
AVAFRAME_ROOT = find_avaframe()

for _root in (AUTOATES_ROOT, AVAFRAME_ROOT):
    s = str(_root)
    if s not in sys.path:
        sys.path.insert(0, s)

ATES_HEX = {
    0: "#ffffff",
    1: "#90ef98",
    2: "#00adff",
    3: "#f15393",
    4: "#b400ff",
}


def need(path: Path, reference: Path | None = None) -> Path:
    """Return path if it exists, else copy from reference, else raise."""
    if path.exists():
        return path
    if reference is not None and reference.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        if reference.is_dir():
            if path.exists():
                shutil.rmtree(path)
            shutil.copytree(reference, path)
        else:
            shutil.copy2(reference, path)
        print(f"checkpoint: copied {reference.relative_to(REPO)} -> {path.relative_to(REPO)}")
        return path
    raise FileNotFoundError(
        f"Missing {path}. Unpack the data zip, or copy the matching "
        "data/<step>/outputs_reference/ files."
    )


def read_raster(path: Path, band: int = 1):
    with rasterio.open(path) as src:
        arr = src.read(band)
        nodata = src.nodata
        if nodata is not None:
            arr = np.where(arr == nodata, np.nan, arr.astype("float64"))
        else:
            arr = arr.astype("float64")
        return arr, src.profile, src.transform, src.crs


def write_raster(path: Path, arr: np.ndarray, profile: dict, nodata=-9999.0) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    out = np.where(np.isfinite(arr), arr, nodata)
    p = profile.copy()
    p.update(dtype=rasterio.float32, count=1, nodata=nodata, compress="deflate", tiled=True)
    with rasterio.open(path, "w", **p) as dst:
        dst.write(out.astype("float32"), 1)
    return path


def hillshade(z, cell, azimuth=315.0, altitude=45.0):
    dy, dx = np.gradient(z, cell, cell)
    slope = np.pi / 2.0 - np.arctan(np.hypot(dx, dy))
    aspect = np.arctan2(-dx, dy)
    az = np.radians(azimuth)
    alt = np.radians(altitude)
    hs = np.sin(alt) * np.sin(slope) + np.cos(alt) * np.cos(slope) * np.cos(az - aspect)
    return np.clip(hs, 0, 1)


def show(arr, title="", cmap="terrain", vmin=None, vmax=None, ax=None):
    ax = ax or plt.gca()
    im = ax.imshow(arr, cmap=cmap, vmin=vmin, vmax=vmax)
    ax.set_title(title)
    ax.set_axis_off()
    plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    return ax


def show_ates(arr, title="ATES", ax=None):
    cmap = ListedColormap([ATES_HEX[i] for i in range(5)])
    ax = ax or plt.gca()
    plot = np.where(np.isfinite(arr) & (arr >= 0) & (arr <= 4), arr, np.nan)
    im = ax.imshow(plot, cmap=cmap, vmin=0, vmax=4)
    ax.set_title(title)
    ax.set_axis_off()
    cbar = plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04, ticks=[0, 1, 2, 3, 4])
    cbar.ax.set_yticklabels(["0 Non-avalanche", "1 Simple", "2 Challenging", "3 Complex", "4 Extreme"])
    return ax


def canopy_from_binary(binary, nodata_mask=None, win=3):
    """3x3 neighbourhood canopy percent. binary is 1=conifer, 0=not."""
    from scipy.ndimage import uniform_filter

    b = np.where(np.isfinite(binary), binary, 0.0)
    cover = uniform_filter(b.astype("float64"), size=win, mode="constant", cval=0.0) * 100.0
    cover = np.clip(cover, 0.0, 100.0)
    if nodata_mask is not None:
        cover = np.where(nodata_mask, np.nan, cover)
    return cover
