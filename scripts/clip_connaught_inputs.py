"""Clip the Connaught Creek workshop inputs from the production mosaics.

Run from the workshop repo root, with the autoates-workshop (or autoates_v3)
env active. Rasters are gitignored; this fills data/<step>/inputs/.
"""
from __future__ import annotations

import shutil
from pathlib import Path

import geopandas as gpd
import numpy as np
import rasterio
from rasterio.features import geometry_mask
from rasterio.windows import from_bounds
from shapely.ops import unary_union

REPO = Path(__file__).resolve().parents[1]
DATA = REPO / "data"

AOI_SRC = Path(
    "/home/jmsykes/Documents/Data/SARNIF/SLF_comparison/ATES_comparison_AOI.shp"
)
EXPERT_SRC = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Test_sites/ConnaughtCreek/"
    "ATES_benchmark/Connaught_benchmark_3-expert consensus.shp"
)
ALOS = Path(
    "/home/jmsykes/Documents/Data/SARNIF/DEM/ALOS30m_Mosaics/"
    "ALOS30m_AvCanFxZones_Mosaic_Projected.tif"
)
CANOPY = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Forest_Classification/Sentinel2/"
    "RogersPass_Sen2_CanopyCover.tif"
)
BINARY = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Forest_Classification/Sentinel2/"
    "Columbias_Rockies/T11UMS/Sen2_forest_bi_T11UMS_20240831_20240324.tif"
)
STACK = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Forest_Classification/Sentinel2/"
    "Columbias_Rockies/T11UMS/Sen2_stack_T11UMS_20240831_20240324.tif"
)
NDVI_SUMMER = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Forest_Classification/Sentinel2/"
    "Columbias_Rockies/T11UMS/NDVI_summer.tif"
)
NDSI_WINTER = Path(
    "/home/jmsykes/Documents/Data/SARNIF/Forest_Classification/Sentinel2/"
    "Columbias_Rockies/T11UMS/NDSI_winter.tif"
)

# Extra DEM/forest around the mapping AOI so Flow-Py is not clipped at the edge.
BUFFER_M = 400.0
PROFILE_OPTS = dict(compress="deflate", tiled=True, predictor=2, zlevel=6)


def _aoi_buffered():
    g = gpd.read_file(AOI_SRC)
    if g.crs is None:
        raise SystemExit(f"AOI has no CRS: {AOI_SRC}")
    metric = g.to_crs(32611)
    geom = unary_union(metric.geometry).buffer(BUFFER_M)
    return gpd.GeoDataFrame(geometry=[geom], crs=metric.crs)


def _write_vector(gdf: gpd.GeoDataFrame, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    for ext in (".shp", ".shx", ".dbf", ".prj", ".cpg"):
        p = dest.with_suffix(ext)
        if p.exists():
            p.unlink()
    gdf.to_file(dest)


def clip_raster(src_path: Path, dest: Path, aoi_metric: gpd.GeoDataFrame) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        dest.unlink()
    aux = Path(str(dest) + ".aux.xml")
    if aux.exists():
        aux.unlink()
    with rasterio.open(src_path) as src:
        aoi = aoi_metric.to_crs(src.crs)
        bounds = aoi.total_bounds
        window = from_bounds(*bounds, transform=src.transform).round_offsets().round_lengths()
        window = window.intersection(src.window(*src.bounds))
        if window.width <= 0 or window.height <= 0:
            raise SystemExit(f"{src_path.name} does not overlap the AOI")
        data = src.read(window=window)
        transform = src.window_transform(window)
        geoms = list(aoi.geometry)
        mask = geometry_mask(
            geoms,
            transform=transform,
            invert=True,
            out_shape=(int(window.height), int(window.width)),
            all_touched=True,
        )
        nodata = src.nodata
        if nodata is None:
            nodata = -9999 if np.issubdtype(data.dtype, np.floating) or data.dtype == np.int16 else 255
        data = np.where(mask, data, nodata)
        profile = src.profile.copy()
        profile.update(
            height=int(window.height),
            width=int(window.width),
            transform=transform,
            nodata=nodata,
            blockxsize=256,
            blockysize=256,
            **PROFILE_OPTS,
        )
        with rasterio.open(dest, "w", **profile) as dst:
            dst.write(data)
            dst.update_tags(workshop_source=str(src_path), workshop_buffer_m=str(BUFFER_M))
    print(f"wrote {dest.relative_to(REPO)}  {dest.stat().st_size / 1e6:.2f} MB")


def main() -> None:
    aoi = _aoi_buffered()
    _write_vector(aoi.to_crs(32611), DATA / "aoi" / "connaught_creek.shp")
    print("wrote data/aoi/connaught_creek.shp")

    expert = gpd.read_file(EXPERT_SRC)
    _write_vector(expert, DATA / "00_orientation" / "inputs" / "expert_consensus.shp")
    print("wrote data/00_orientation/inputs/expert_consensus.shp")

    clip_raster(ALOS, DATA / "01_elevation" / "inputs" / "alos_aw3d30_connaught.tif", aoi)
    clip_raster(CANOPY, DATA / "02_forest" / "inputs" / "sen2_canopy_cover_source.tif", aoi)
    clip_raster(BINARY, DATA / "02_forest" / "inputs" / "sen2_forest_binary.tif", aoi)
    clip_raster(NDVI_SUMMER, DATA / "02_forest" / "inputs" / "ndvi_summer.tif", aoi)
    clip_raster(NDSI_WINTER, DATA / "02_forest" / "inputs" / "ndsi_winter.tif", aoi)
    clip_raster(STACK, DATA / "02_forest" / "inputs" / "sen2_stack_t11ums.tif", aoi)

    # PRA/ATES live path uses the production canopy product, already clipped.
    canopy_in = DATA / "02_forest" / "inputs" / "sen2_canopy_cover_source.tif"
    canopy_ref = DATA / "02_forest" / "outputs_reference" / "sen2_canopy_cover.tif"
    canopy_ref.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(canopy_in, canopy_ref)
    print(f"copied production canopy -> {canopy_ref.relative_to(REPO)}")


if __name__ == "__main__":
    main()
