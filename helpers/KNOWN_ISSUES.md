# Known setup issues

Add to this list as helpers actually hit things. Participants only need
SETUP.md unless an instructor points them here. Linux was walked on
1 October 2026 (Miniforge, NumPy 2.4.6, AvaFrame `c745a2dec4a7`).
Windows and macOS, including the C++ compile, have not been walked on
hardware yet — paste real failures here after that pass.

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
- `com4FlowPy` still needs `gcc` / `g++` (`build-essential`) and the
  in-place build in SETUP.md. See AvaFrame import below.

## AvaFrame import (com4FlowPy)

Walked on Linux, 1 October 2026: Miniforge, Python 3.11, NumPy 2.4.6,
AvaFrame `c745a2dec4a7`. `python check_setup.py` passed after the
conda-forge packages in `environment.yml` and
`python setup.py build_ext --inplace`. Windows and macOS compiles are
still untested.

- Do not `pip install avaframe` or `pip install -e .`. That install pins
  `numpy<2` and fights the conda GDAL stack. Do not downgrade NumPy to
  get the build to run. This pass compiled against NumPy 2.4.6.
- `ModuleNotFoundError: avaframe.com1DFA.DFAfunctionsCython` means the
  in-place build has not been run, or the C++ compiler was missing.
  A warning about MoT-Voellmy during the build is expected. Saturday
  does not use that module.
- `ModuleNotFoundError` for `deepmerge`, `deepdiff`, `shapefile`,
  `seaborn`, `cmcrameri`, `contextily`, or `tabulate` means the env was
  created from an older `environment.yml`. Recreate it, or:

  ```bash
  mamba install -c conda-forge --override-channels deepmerge deepdiff pyshp seaborn cmcrameri contextily tabulate cython
  ```

- If the compile fails on Saturday, notebooks 00–03 still run. For
  notebook 04, use `data/04_runout/outputs_reference/` instead of a live
  Flow-Py run. `check_setup.py` will keep reporting FAIL on
  `avaframe.com4FlowPy` until the extension builds.
- Existing Anaconda: conda 22.11’s classic solver was OOM-killed at about
  28 GB RSS while solving this file (31 GB machine, swap already full).
  Use Miniforge. If Miniforge was installed with `bash Miniforge3-….sh -b`
  and `mamba activate` says the shell is not initialized, run this in
  that terminal only:

  ```bash
  source "$HOME/miniforge3/bin/activate"
  eval "$(mamba shell hook --shell bash)"
  mamba activate autoates-workshop
  ```

  Do not run `mamba shell init` on a machine that should keep Anaconda
  as the default shell.
- A `~/.condarc` that lists `defaults` makes mamba mix `pkgs/main` into
  the env. This Linux pass did that, and rasterio still imported. If
  rasterio later fails to find `libgdal`, recreate the env from a
  Miniforge terminal so conda-forge stays the only channel.

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
