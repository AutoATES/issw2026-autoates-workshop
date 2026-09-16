# ISSW 2026 workshop: autoATES v3.0

Hands-on tutorial for producing automated Avalanche Terrain Exposure Scale
(autoATES) maps with open-source tools.

- **When:** Saturday 3 October 2026, 09:00–16:00
- **Where:** Aava Hotel, Peak Room, Whistler, BC
- **Who:** Practitioners, researchers, and consultants. Follow along on a
  laptop, or sit and watch — both tracks are first-class.

This repository is the participant kit: notebooks, the Connaught Creek
dataset, step-by-step reference outputs, and the schedule. It is **not**
the research tree used to build the western Canada production maps.

**Start here if you want to follow along:** [SETUP.md](SETUP.md)  
**Start here if you want the day plan:** [SCHEDULE.md](SCHEDULE.md)  
**Email we send to participants:** [participant/EMAIL.md](participant/EMAIL.md)

## Two tracks

| | Follow along | Observe |
|---|---|---|
| Laptop | Python 3.11 environment + QGIS | Optional. Maps are on the projector. |
| What you do | Run the notebook for the current module | Listen, look at the maps, ask questions |
| If you get stuck | Copy that step's `outputs_reference/` and continue | Stay with the room |
| You leave with | A Connaught Creek ATES map you produced (or assembled) | The method, the design choices, and where to get the code |

Helpers will not stop the room for one laptop. Jumping ahead with
reference outputs is the intended recovery path.

## Live site: Connaught Creek

The live domain is **Connaught Creek, Rogers Pass** (13 km²) — the held-out
comparison drainage from the ISSW talks, small enough that Flow-Py finishes
on a laptop.

We use the **production data stack**, not the 5 m lidar from the
multi-agency comparison:

- ALOS AW3D30 (~30 m surface; ~21 m on this projected clip)
- Sentinel-2 forest (operational binary layer, then canopy cover and gap area)
- Typical and infrequent potential release area (PRA)
- com4FlowPy runout at alpha 30° (typical) and 18° (infrequent)
- autoATES v3.0 classifier

On a desktop with numba, the full chain on this clip takes about **5 seconds**.
Laptops will be slower; reference outputs are in `data/<step>/outputs_reference/`
if a step does not finish.

## Before you arrive

1. Follow [SETUP.md](SETUP.md): Miniforge, QGIS, three git clones, `conda env create`.
2. Run `python check_setup.py` and get all `OK` lines.
3. Skim [SCHEDULE.md](SCHEDULE.md). The papers are optional.

If the install fails, come anyway. Sit on the observe track. You can paste
the error into ChatGPT / Claude / Copilot / Grok using the prompt in SETUP.md,
and helpers will be in the room from 08:15.

Conference wifi is not a plan. Bring the repo on disk. USB copies will be
at the door.

## Repository layout

```
check_setup.py             pass/fail for the environment
SETUP.md                   install, including a beginner conda walkthrough
SCHEDULE.md                Saturday timetable
notebooks/                 00–06, run in order
data/<step>/inputs/        what that step needs
data/<step>/outputs_reference/   known-good result if you skip or stall
config/                    workshop autoATES + Flow-Py settings
qgis/                      ATES colour ramp
participant/               email to send
helpers/                   instructor notes
```

## Citation

See [CITING.md](CITING.md). Maps produced in this workshop are a tutorial
product, not an operational ATES map.
