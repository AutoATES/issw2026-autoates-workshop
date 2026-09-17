# ISSW 2026 workshop: autoATES v3.0

A full-day tutorial on producing automated Avalanche Terrain Exposure Scale
(autoATES) maps with open-source tools.

- **When:** Saturday 3 October 2026, 09:00–16:00
- **Where:** Aava Hotel, Peak Room, Whistler, BC
- **Who:** Practitioners, researchers, and consultants. You can run the
  notebooks on a laptop, or follow the same maps on the projector.

This repository is the participant kit: notebooks, the Connaught Creek
dataset, reference outputs for each step, and the schedule. It is separate
from the research tree used to build the western Canada production maps.

**If you want to run the models:** start with [SETUP.md](SETUP.md).  
**If you want the day plan:** [SCHEDULE.md](SCHEDULE.md).  
**Email to participants:** [participant/EMAIL.md](participant/EMAIL.md).

## Following along or watching

The room is set up for both. The projector shows the same maps as the
notebooks. If you are on a laptop and a step does not finish, copy that
module’s `outputs_reference/` folder and continue with the group — those
files are there so a stalled run does not put you behind.

| | On a laptop | Watching |
|---|---|---|
| Software | Python 3.11 environment + QGIS | Optional |
| During the day | Run the notebook for the current module | Same maps on the projector; questions welcome |
| If a step fails | Copy `outputs_reference/` and go on | Stay with the discussion |
| You leave with | A Connaught Creek ATES map you produced or assembled | The method, the design choices, and where to get the code |

Colleagues from SFU and BFW will be in the room to help with installs
and with the Flow-Py block.

## Live site: Connaught Creek

We will map **Connaught Creek, Rogers Pass** (13 km²). It is the held-out
comparison drainage from the ISSW talks, and small enough that Flow-Py
finishes on a laptop.

We use the production data stack, not the 5 m lidar from the multi-agency
comparison:

- ALOS AW3D30 (~30 m surface; ~21 m on this projected clip)
- Sentinel-2 forest (operational binary layer, then canopy cover and gap area)
- Typical and infrequent potential release area (PRA)
- com4FlowPy runout at alpha 30° (typical) and 18° (infrequent)
- autoATES v3.0 classifier

On a desktop with numba, the full chain on this clip takes about 5 seconds.
Laptops will be slower. Reference outputs are in
`data/<step>/outputs_reference/` if a step does not finish.

## Before Saturday

1. Follow [SETUP.md](SETUP.md): Miniforge, QGIS, three git clones, and
   `conda env create`.
2. Run `python check_setup.py` and check that the lines print `OK`.
3. Skim [SCHEDULE.md](SCHEDULE.md). The papers are optional background.

If the install is still giving you trouble, please still come. You will
see every step on the projector, and you can run the notebooks later from
this repository. SETUP.md includes a prompt you can paste into ChatGPT,
Claude, Copilot, or Grok for PATH / conda / GDAL errors. Helpers will be
in the Peak Room from 08:15, and we will have USB copies of the folders.

Conference networks are often slow with a few dozen people downloading
the same packages. Please get the three folders onto disk before you
travel if you can.

## Repository layout

```
check_setup.py             environment check
SETUP.md                   install, including a short conda walkthrough
SCHEDULE.md                Saturday timetable
notebooks/                 00–06, run in order
data/<step>/inputs/        what that step needs
data/<step>/outputs_reference/   known-good result if you skip or stall
config/                    workshop autoATES + Flow-Py settings
qgis/                      ATES colour ramp + day-of load order
slides/                    observer / projector deck (pptx + pdf)
participant/               email to send
helpers/                   notes for instructors
```

## Citation

See [CITING.md](CITING.md). Maps produced in this workshop are a tutorial
product, not an operational ATES map.
