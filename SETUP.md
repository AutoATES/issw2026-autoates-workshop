# Setup (do this before 3 October)

The workshop does **not** include an install session. If this file is still
open on Saturday morning, sit on the observe track and try again at lunch.
Helpers will be in the Peak Room from 08:15 with USB copies.

You do not need to be a programmer. You do need admin rights on the laptop
and about 30–45 minutes the first time.

## What you are installing, in plain language

| Piece | What it is | Why |
|---|---|---|
| **Miniforge (conda)** | A small program that keeps Python and GIS libraries in their own folder, so they do not fight with the rest of your computer | rasterio / GDAL are painful to install any other way |
| **`autoates-workshop` env** | That isolated folder, with Python 3.11 and the libraries we use | Every notebook in this repo expects it |
| **Git** | A tool to copy the three code folders from the internet | You can also download zip files if you prefer |
| **QGIS 3** | A map window | Looking at GeoTIFFs. The models run in Python, not inside QGIS |
| **AutoATES v3.0** | The mapping library | PRA, ATES classifier |
| **AvaFrame** | The library that contains com4FlowPy | Runout |

We clone AutoATES and AvaFrame next to the workshop folder. We do **not**
`pip install` AvaFrame from source on the day — that compile step is a
common Windows failure. The notebooks add those clones to Python’s path.

## What you need

- A laptop you can install software on (admin rights).
- **16 GB RAM preferred, 8 GB minimum.**
- ~5 GB free disk.
- Windows, macOS, or Linux. Windows is the fussiest (GDAL). If you already
  use WSL2, use that.

Put the project in a path **without spaces** if you can:

- Good: `C:\issw-workshop\` or `~/Documents/issw-workshop/`
- Bad: `C:\Users\Alex\My Documents\ISSW workshop\`

## 0. Three installers

Do these once, before the clones.

1. **QGIS 3** — https://qgis.org (the current long-term release is fine).
2. **Git** — https://git-scm.com (Windows: Git for Windows; the defaults are fine).
3. **Miniforge** — https://github.com/conda-forge/miniforge#miniforge3
   - Windows: run the `.exe`. When it asks, allow it to add Miniforge to PATH,
     or use the **Miniforge Prompt** from the Start menu from here on.
   - macOS / Linux: run the `.sh` installer, then open a new terminal.

You will type commands in a **terminal**:

- Windows: **Miniforge Prompt** (safest) or Git Bash
- macOS: Terminal
- Linux: any terminal

If a command is not found, close the window and open a new one so PATH updates.

## 1. Clone the three folders (siblings)

```bash
mkdir issw-workshop
cd issw-workshop

git clone https://github.com/AutoATES/issw2026-autoates-workshop.git
git clone https://github.com/AutoATES/AutoATES-v3.0.git
cd AutoATES-v3.0
git checkout adb83f616576
cd ..

git clone https://github.com/OpenNHM/AvaFrame.git
cd AvaFrame
git checkout c745a2dec4a7
cd ..
```

You should now have:

```
issw-workshop/
  issw2026-autoates-workshop/   ← notebooks and Connaught data
  AutoATES-v3.0/                ← library
  AvaFrame/                     ← com4FlowPy
```

No git? Download each repository as a ZIP from GitHub (green Code button →
Download ZIP), unpack, and rename the folders to match the names above.
Then `git checkout` does not apply — we will help you at the door if the
default branch is not the pin.

If the workshop GitHub URL is not live yet, use the zip we emailed or the
USB copy, and still clone AutoATES-v3.0 and AvaFrame as above.

## 2. Create the conda environment

```bash
cd issw2026-autoates-workshop

conda env create -f environment.yml
conda activate autoates-workshop
```

`mamba` works in place of `conda` if that is what Miniforge gave you. The
first run downloads a few hundred MB and can take 10–20 minutes. Do this
on hotel wifi the night before, not at 08:50.

Windows: if `conda` is not found, open **Miniforge Prompt** and try again.
Do not also put OSGeo4W on PATH in that same window.

## 3. Pass/fail

Still in the `autoates-workshop` environment, from the workshop repo folder:

```bash
python check_setup.py
```

You want every line to start with `OK`. Then:

```bash
python -m ipykernel install --user --name autoates-workshop --display-name "autoATES workshop"
jupyter lab notebooks/00_orientation.ipynb
```

In JupyterLab, pick the kernel **autoATES workshop**. A kernel named only
“Python 3” is often the system Python, which does not have rasterio.

Open QGIS once and confirm it launches. You do not need a project file yet.
To look at a map: Layer → Add Raster →
`data/05_ates/outputs_reference/ATES_classification.tif`, then Layer
Properties → Symbology → Style → Load → `qgis/ates_classes.qml`.

## 4. What “done” looks like

- [ ] `conda activate autoates-workshop` works
- [ ] `python check_setup.py` prints only `OK` lines
- [ ] JupyterLab opens `00_orientation.ipynb` with the workshop kernel
- [ ] QGIS opens
- [ ] `data/01_elevation/inputs/alos_aw3d30_connaught.tif` exists (it ships
      in the repo; no separate data download)

You do **not** need to run notebooks 01–05 in advance.

## If it fails — use an AI tool, then come anyway

Paste the block below into ChatGPT, Claude, Copilot, Grok, or similar.
It is good at conda/PATH/GDAL errors. It is not a substitute for the
helpers in the room, and it should not change PRA or Flow-Py parameters.

```
I am setting up a conda-forge Python 3.11 environment for an ISSW workshop
on avalanche terrain mapping (autoATES, rasterio, geopandas, AvaFrame
com4FlowPy).

Operating system:
<Windows 11 / macOS version / Linux distro>

The folder layout is:
  issw-workshop/issw2026-autoates-workshop
  issw-workshop/AutoATES-v3.0
  issw-workshop/AvaFrame

The command I ran:
<paste the command>

The full error:
<paste>

Please help me fix the install. Prefer conda-forge packages. Do not mix
pip-installed GDAL/rasterio with conda GDAL. Do not put OSGeo4W on PATH
together with this environment. Do not ask me to compile AvaFrame from
source if a clone + PYTHONPATH will work.
```

If it is still broken after that:

1. Come to the Peak Room at 08:15. Bring the error text (a screenshot is fine).
2. If we cannot fix it in ten minutes, observe. You will still see every
   map, and you can run the notebooks later from the same repo.
3. Known issues: [helpers/KNOWN_ISSUES.md](helpers/KNOWN_ISSUES.md).

## Pins

Reference outputs were built 16 September 2026 with:

| Package | Source | Pin |
|---|---|---|
| AutoATES v3.0 | `github.com/AutoATES/AutoATES-v3.0` | `adb83f616576` |
| AvaFrame | `github.com/OpenNHM/AvaFrame` | `c745a2dec4a7` |
| Forest product | Sentinel-2 T11UMS | summer 2024-08-31, winter 2024-03-24 |

Numba is in the environment on purpose. It makes Flow-Py much faster.
Without it, use the reference runout rasters rather than waiting.

## What not to do

- Do not mix this conda env, a system Python, and OSGeo4W in one terminal.
- Do not `pip install rasterio` or `pip install gdal` on top of conda.
- Do not clone a random AutoATES working copy with site-batch configs.
  Use the pin above.
- Do not download a new DEM or Sentinel tile for the workshop. Connaught
  is already in `data/`.
