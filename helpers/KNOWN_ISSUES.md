# Known setup issues

Add to this list as helpers actually hit things. Participants only need
SETUP.md unless an instructor points them here. Windows/macOS have not
been walked on hardware yet — paste real failures here after that pass.

Install errors: SETUP.md has a prompt to paste into ChatGPT / Claude /
Copilot / Grok. Prefer that for PATH and conda; prefer a helper for GIS.

## Windows + GDAL

- Install the workshop env from `environment.yml` on conda-forge. Do not
  also put OSGeo4W on `PATH` in the same terminal.
- If `import rasterio` fails with a DLL error, the usual cause is mixing
  pip wheels of GDAL with conda GDAL. Recreate the env; do not pip-install
  rasterio on top.
- Paths with spaces (`Documents\My work\...`) break some AvaFrame calls.
  Unpack the repo to `C:\issw2026-autoates-workshop` if needed.

## macOS

- Xcode command-line tools must be installed (`xcode-select --install`).
- Apple silicon: use the osx-arm64 Miniforge installer, not an x86_64
  env under Rosetta, unless you already know that path works.

## Linux

- Usually the easy path. If `rasterio` cannot find `libgdal`, the env was
  probably created without conda-forge as priority.

## Jupyter kernel

After creating the env:

```bash
mamba activate autoates-workshop
python -m ipykernel install --user --name autoates-workshop --display-name "autoATES workshop"
```

In JupyterLab, pick that kernel. A kernel named “Python 3” may be the
system Python, which does not have rasterio.

## Flow-Py runtime

- Live domain is Connaught at ~30 m. If someone points the config at the
  5 m lidar or at South Coast, stop them.
- Numba is in the environment on purpose. If Flow-Py falls back to the
  pure-Python engine, expect a slower run; use reference outputs rather
  than waiting.
- A run that is still going with 15 minutes left in the block should be
  abandoned for the reference rasters.

## QGIS

- Styles in `qgis/` are for the workshop class raster. They will look
  wrong on a continuous PRA or alpha-angle grid.
- If QGIS cannot read a GeoTIFF, check CRS and that the file actually
  copied from `outputs_reference/` (not a 0-byte failed write).
