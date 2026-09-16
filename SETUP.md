# Setup (do this before 3 October)

The workshop does not include an install session. If this file is still
open on Saturday morning, sit on the observe track and try again at lunch.

## What you need

- A laptop you can install software on (admin rights).
- **16 GB RAM preferred, 8 GB minimum.** Flow-Py is the memory hog.
- ~5 GB free disk for the environment + the Connaught data zip.
- QGIS 3.x ([qgis.org](https://qgis.org)) for looking at GeoTIFFs. The
  computation runs in Python; QGIS is the map window.
- Optional: git. You can also download the repository as a zip.

Windows is supported but is the fussiest path (GDAL). If you have WSL2 or
a Mac/Linux machine, use that.

## 1. Install the conda environment

[Miniforge](https://github.com/conda-forge/miniforge) (mamba) is the
recommended installer. Anaconda works if you already have it.

```bash
git clone https://github.com/AutoATES/issw2026-autoates-workshop.git
cd issw2026-autoates-workshop

mamba env create -f environment.yml
mamba activate autoates-workshop
```

Use `conda` in place of `mamba` if that is what you have.

Pin AutoATES v3.0 and AvaFrame from [the workshop release notes](#pins)
once those tags exist. Do not `pip install` a random GitHub main branch.

## 2. Download the data zip

The rasters are not in git.

1. Download `connaught_workshop_data.zip` from the GitHub Release (URL
   will be filled when the bundle is cut).
2. Unpack it so that `data/01_elevation/inputs/` contains the DEM, and so
   on. The zip matches the folder names in this repository.
3. Keep a copy on a USB stick.

Day-of, USB copies will be at the door. Do not plan on hotel wifi.

## 3. Pass/fail check

With `autoates-workshop` activated:

```bash
python -c "import numpy, scipy, rasterio, geopandas, numba, matplotlib, yaml; print('ok')"
```

You want `ok` and no traceback. Then:

```bash
jupyter lab notebooks/00_orientation.ipynb
```

If the notebook kernel starts, you are done. Open QGIS once and confirm it
launches; you do not need a project file yet.

## 4. What “done” looks like

- [ ] `mamba activate autoates-workshop` works
- [ ] The import line prints `ok`
- [ ] JupyterLab opens `00_orientation.ipynb`
- [ ] QGIS opens
- [ ] `data/` has been unpacked from the zip (or you will get it at the door)

You do **not** need to run notebooks 01–05 in advance. Reference outputs
are there if you want to peek.

## Pins

Filled when we tag the workshop snapshot:

| Package | Source | Tag / commit |
|---|---|---|
| AutoATES v3.0 | `github.com/AutoATES/AutoATES-v3.0` | *TBD* |
| AvaFrame (com4FlowPy) | *TBD* | *TBD* |
| Forest classifier | bundled in the data zip | *TBD* |

## If it fails

1. Come to the room at 08:15. Bring the error text.
2. If we cannot fix it in ten minutes, observe. You will still see every
   map, and you can run the notebooks later from the same repo.
3. Known issues: [helpers/KNOWN_ISSUES.md](helpers/KNOWN_ISSUES.md)
   (Windows GDAL, PATH, conda vs pip mixing).

## What not to do

- Do not install from `environment.yml` *and* a system Python *and* OSGeo4W
  into the same session and hope they share GDAL.
- Do not clone the full research `AutoATES-v3.0` working tree. This
  workshop repo is the path.
- Do not download ALOS or Sentinel-2 yourself unless you are already
  comfortable with it. The Connaught clips are in the data zip.
