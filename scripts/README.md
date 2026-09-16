# Maintainer scripts

Participants run `python check_setup.py` at the repo root, then the
notebooks. These scripts build the Connaught data bundle and regenerate
reference outputs.

```bash
cd /path/to/issw2026-autoates-workshop
export AUTOATES_ROOT=$HOME/Documents/Code/AutoATES/AutoATES-v3.0
# env with rasterio, geopandas, avaframe, numba

python scripts/clip_connaught_inputs.py
python scripts/run_pipeline.py          # PRA + Flow-Py + ATES
python scripts/stage_reference_outputs.py
```

`clip_connaught_inputs.py` reads mosaics on this machine under
`/home/jmsykes/Documents/Data/SARNIF/`. It will not run on a participant
laptop.

Time the Flow-Py block from the run log (`outputs/connaught/autoATES_run_*.log`)
before calling the 30 m Connaught domain “laptop-safe.”
