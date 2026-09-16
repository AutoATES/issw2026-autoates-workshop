# Notebooks

Run in order. Each one states what it expects from the previous step and
how to copy `data/<step>/outputs_reference/` if that step failed.

| # | File | Module | Live compute? |
|---|---|---|---|
| 00 | `00_orientation.ipynb` | Finished map, pipeline | No — display only |
| 01 | `01_elevation.ipynb` | ALOS clip, slope, hillshade | Light |
| 02 | `02_forest.ipynb` | Apply pretrained Sentinel-2 model | Moderate |
| 03 | `03_pra.ipynb` | Typical + infrequent PRA | Light |
| 04 | `04_runout.ipynb` | com4FlowPy | The slow one |
| 05 | `05_ates.ipynb` | Classifier | Light |
| 06 | `06_takehome.ipynb` | Home range, South Coast preview | No live second AOI |

Notebooks 00–06 are wired to the Connaught bundle and `notebooks/workshop.py`.
Run from the `notebooks/` directory with `AUTOATES_ROOT` set (see SETUP.md).
Each one still has a checkpoint path if a live call fails.
