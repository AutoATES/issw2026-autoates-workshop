# Workshop data

Rasters are **not** stored in git. Unpack `connaught_workshop_data.zip`
from the GitHub Release so that the folders below fill with files.

## Live bundle (required)

Connaught Creek AOI, ~13 km², production stack.

| Folder | Inputs (what you start with) | `outputs_reference/` (if you skip or stall) |
|---|---|---|
| `aoi/` | Connaught Creek polygon | — |
| `00_orientation/` | Finished ATES map + expert overlay for the opening | same |
| `01_elevation/` | ALOS AW3D30 clip | slope, hillshade |
| `02_forest/` | Sentinel-2 summer/winter clips + pretrained model | binary conifer, canopy cover, gap area |
| `03_pra/` | aligned DEM + canopy | typical and infrequent PRA rasters/polygons |
| `04_runout/` | PRA + DEM | Flow-Py typical (α 30°) and infrequent (α 18°) |
| `05_ates/` | PRA + runout + forest + slope | classified ATES raster, colourized |

Each notebook tells you which folder it reads. If your last step failed,
copy that step's `outputs_reference/` contents into your working output
directory (or into the next step's `inputs/`, as the notebook says) and
continue.

## Optional extra (not live)

`optional_southcoast/` — precomputed autoATES v3.0 for the South Coast /
Spearhead benchmark (Whistler-area backcountry, on the order of
10² km²). Open in QGIS at the end if you want. Do not point the workshop
config at it during the afternoon.

## What this bundle is not

- Not the 5 m lidar / agency-comparison stack from paper 1.
- Not a forecast-region tile.
- Not a licence to redistribute ALOS or Sentinel-2 beyond the workshop
  and fair-use research. See [CITING.md](../CITING.md).

## Building the zip (maintainers)

Clip ALOS and Sentinel-2 to `aoi/`, run the pinned AutoATES + AvaFrame
tags once, and copy each module's products into the matching
`outputs_reference/`. Record the pin and a checksum next to the Release.
Do not generate reference outputs from a dirty working tree.
