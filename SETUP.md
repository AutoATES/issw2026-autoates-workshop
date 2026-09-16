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

Then point Python at the pinned AutoATES clone (see [Pins](#pins)):

```bash
export AUTOATES_ROOT=/path/to/AutoATES-v3.0
export PYTHONPATH="$AUTOATES_ROOT:$PYTHONPATH"
python -c "import autoates, avaframe; print('ok', autoates.__file__)"
```

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
python -c "import autoates, avaframe; print('autoates/avaframe ok')"
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

These are the commits the Connaught reference outputs were built with
(16 September 2026). Tag a workshop snapshot before sending SETUP to
participants; until then use the hashes.

| Package | Source | Pin |
|---|---|---|
| AutoATES v3.0 | `github.com/AutoATES/AutoATES-v3.0` | `adb83f616576` (`feature/pra-reconciliation-gridsearch`) |
| AvaFrame (com4FlowPy, numba engine) | local clone of `OpenNHM/AvaFrame` | `c745a2dec4a7` (`master`) |
| Forest product | Sentinel-2 T11UMS binary + Rogers Pass canopy | summer 2024-08-31, winter 2024-03-24 |

AvaFrame must be importable as `avaframe` (the AutoATES runout step calls
com4FlowPy in-process). Numba is in `environment.yml` on purpose: it is
~20× faster than the pure-Python Flow-Py engine.

## If it fails

1. Come to the room at 08:15. Bring the error text.
2. If we cannot fix it in ten minutes, observe. You will still see every
   map, and you can run the notebooks later from the same repo.
3. Known issues: [helpers/KNOWN_ISSUES.md](helpers/KNOWN_ISSUES.md)
   (Windows GDAL, PATH, conda vs pip mixing).

## What not to do

- Do not install from `environment.yml` *and* a system Python *and* OSGeo4W
  into the same session and hope they share GDAL.
- Clone AutoATES-v3.0 **at the pin below**, not a random working copy
  with sweep configs and site batches. This workshop repo is the lesson
  path; AutoATES-v3.0 is the library.
- Do not download ALOS or Sentinel-2 yourself unless you are already
  comfortable with it. The Connaught clips are in the data zip.
