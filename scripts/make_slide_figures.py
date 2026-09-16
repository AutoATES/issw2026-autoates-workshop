"""Build large-type Connaught maps for the observer / projector deck."""
from __future__ import annotations

import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import rasterio
from matplotlib.colors import ListedColormap
from matplotlib.patches import Patch

REPO = Path(__file__).resolve().parents[1]
DATA = REPO / "data"
OUT = REPO / "slides" / "figures"
OUT.mkdir(parents=True, exist_ok=True)

sys.path.insert(0, str(REPO / "notebooks"))
from workshop import canopy_from_binary, hillshade, read_raster  # noqa: E402

ATES = ["#ffffff", "#90ef98", "#00adff", "#f15393", "#b400ff"]
ATES_CMAP = ListedColormap(ATES)


def _save(fig, name: str) -> None:
    fig.savefig(OUT / name, dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("wrote", name)


def _show(ax, arr, cmap, vmin=None, vmax=None, nodata_mask=None):
    a = np.array(arr, dtype="float64")
    if nodata_mask is not None:
        a = np.where(nodata_mask, np.nan, a)
    ax.imshow(a, cmap=cmap, vmin=vmin, vmax=vmax)
    ax.set_axis_off()


def main() -> None:
    dem, _, transform, _ = read_raster(DATA / "01_elevation" / "inputs" / "alos_aw3d30_connaught.tif")
    cell = abs(transform.a)
    hs = hillshade(dem, cell)
    slope, *_ = read_raster(DATA / "01_elevation" / "outputs_reference" / "slope.tif")

    binary, bprof, btr, _ = read_raster(DATA / "02_forest" / "inputs" / "sen2_forest_binary.tif")
    ndvi, *_ = read_raster(DATA / "02_forest" / "inputs" / "ndvi_summer.tif")
    ndsi, *_ = read_raster(DATA / "02_forest" / "inputs" / "ndsi_winter.tif")
    cover = canopy_from_binary(binary, nodata_mask=~np.isfinite(binary))
    sys.path.insert(0, str(Path.home() / "Documents/Code/AutoATES/AutoATES-v3.0"))
    from autoates.comAutoATES.atesValidation.forestGaps import gap_metrics

    from scipy.ndimage import uniform_filter

    valid = np.isfinite(cover)
    _, gap = gap_metrics(
        np.nan_to_num(cover, nan=100.0),
        abs(btr.a),
        valid=valid,
        max_area_ha=20.0,
        enclosed_only=False,
    )
    # Paper rule: do not read alpine as one unbounded opening.
    win = max(3, int(round(300.0 / abs(btr.a))))
    nb_cover = uniform_filter(np.nan_to_num(cover, nan=0.0), size=win)
    gap = np.where(valid & (nb_cover > 30.0) & (gap > 0), gap, np.nan)

    pra_f, *_ = read_raster(DATA / "03_pra" / "outputs_reference" / "pra_frequent_pra_sieve.tif")
    pra_e, *_ = read_raster(DATA / "03_pra" / "outputs_reference" / "pra_extreme_pra_sieve.tif")
    alpha_f, *_ = read_raster(
        next((DATA / "04_runout" / "outputs_reference" / "frequent").glob("*fpTravelAngleMax.tif"))
    )
    alpha_e, *_ = read_raster(
        next((DATA / "04_runout" / "outputs_reference" / "extreme").glob("*fpTravelAngleMax.tif"))
    )
    ates, *_ = read_raster(DATA / "05_ates" / "outputs_reference" / "ATES_classification.tif")

    # 1. Hillshade + elevation
    fig, axs = plt.subplots(1, 2, figsize=(11, 5.2))
    _show(axs[0], hs, "gray", 0, 1)
    axs[0].set_title("Hillshade", fontsize=16, pad=8)
    _show(axs[1], dem, "terrain")
    axs[1].set_title("ALOS AW3D30 (m)", fontsize=16, pad=8)
    _save(fig, "elev_hillshade.png")

    fig, ax = plt.subplots(figsize=(6.2, 6.2))
    _show(ax, slope, "magma", 0, 50)
    ax.set_title("Slope (degrees)", fontsize=18, pad=8)
    _save(fig, "elev_slope.png")

    # 2. Forest
    fig, axs = plt.subplots(1, 3, figsize=(13.2, 4.6))
    _show(axs[0], ndvi / 10000.0, "RdYlGn", 0, 0.8)
    axs[0].set_title("Summer NDVI", fontsize=16, pad=8)
    _show(axs[1], ndsi / 10000.0, "Blues", -0.2, 0.8)
    axs[1].set_title("Winter NDSI", fontsize=16, pad=8)
    _show(axs[2], binary, "Greens", 0, 1)
    axs[2].set_title("Binary conifer", fontsize=16, pad=8)
    _save(fig, "forest_seasons.png")

    fig, axs = plt.subplots(1, 2, figsize=(11, 5.2))
    _show(axs[0], cover, "YlGn", 0, 100)
    axs[0].set_title("Canopy cover %  (3×3)", fontsize=16, pad=8)
    g = np.where(gap > 0, gap, np.nan)
    _show(axs[1], g, "YlOrRd", 0, 20)
    axs[1].set_title("Gap area (ha)", fontsize=16, pad=8)
    _save(fig, "forest_cover_gap.png")

    # 3. PRA
    fig, axs = plt.subplots(1, 2, figsize=(11, 5.2))
    for ax, arr, title in (
        (axs[0], pra_f, "Typical PRA"),
        (axs[1], pra_e, "Infrequent PRA"),
    ):
        _show(ax, hs, "gray", 0, 1)
        overlay = np.ma.masked_where(~(arr > 0), arr)
        ax.imshow(overlay, cmap="autumn", alpha=0.75, vmin=0, vmax=1)
        ax.set_title(title, fontsize=16, pad=8)
    _save(fig, "pra_two_scenarios.png")

    # 4. Runout
    fig, axs = plt.subplots(1, 2, figsize=(11, 5.2))
    for ax, arr, title in (
        (axs[0], alpha_f, "Typical reach  ·  α 30°"),
        (axs[1], alpha_e, "Infrequent reach  ·  α 18°"),
    ):
        _show(ax, hs, "gray", 0, 1)
        reached = np.where(np.isfinite(arr) & (arr > 0), arr, np.nan)
        ax.imshow(reached, cmap="plasma", alpha=0.85)
        ax.set_title(title, fontsize=16, pad=8)
    _save(fig, "runout_two_scenarios.png")

    # 5. ATES
    fig, ax = plt.subplots(figsize=(7.2, 7.0))
    plot = np.where((ates >= 0) & (ates <= 4), ates, np.nan)
    ax.imshow(hs, cmap="gray", vmin=0, vmax=1)
    ax.imshow(plot, cmap=ATES_CMAP, vmin=0, vmax=4, alpha=0.82)
    ax.set_axis_off()
    ax.set_title("")
    handles = [
        Patch(facecolor=ATES[i], edgecolor="none", label=lab)
        for i, lab in enumerate(
            ["0 Non-avalanche", "1 Simple", "2 Challenging", "3 Complex", "4 Extreme"]
        )
    ]
    ax.legend(handles=handles, loc="lower left", frameon=True, fontsize=11)
    _save(fig, "ates_finished.png")

    print("figures ->", OUT)


if __name__ == "__main__":
    main()
