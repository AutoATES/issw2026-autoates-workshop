# ISSW 2026 workshop: autoATES v3.0

Hands-on tutorial for producing automated Avalanche Terrain Exposure Scale
(autoATES) maps with open-source tools.

- **When:** Saturday 3 October 2026, 09:00–16:00
- **Where:** Aava Hotel, Peak Room, Whistler, BC
- **Who:** Practitioners, researchers, and consultants. Follow along on a laptop,
  or sit and watch — both tracks are first-class.

This repository is the participant kit: notebooks, a small Connaught Creek
dataset, step-by-step reference outputs, and the schedule. It is **not** the
research tree used to build the western Canada production maps.

## Two tracks

| | Follow along | Observe |
|---|---|---|
| Laptop | Python 3.11 environment + QGIS | Optional. Maps are on the projector. |
| What you do | Run the notebook for the current module | Listen, look at the maps, ask questions |
| If you get stuck | Copy that step's `outputs_reference/` and continue | Stay with the room |
| You leave with | A Connaught Creek ATES map you produced (or assembled) | The method, the design choices, and where to get the code |

Helpers will not stop the room for one laptop. Jumping ahead with reference
outputs is the intended recovery path, not a shortcut to feel bad about.

## Live site: Connaught Creek

The live domain is **Connaught Creek, Rogers Pass** (13 km²). It is the
held-out comparison site from the ISSW papers, small enough that Flow-Py
finishes on a laptop, and already in the room if you saw the talks.

We run it on the **production data stack**, not the 5 m lidar used in the
multi-agency comparison:

- ALOS AW3D30 (~30 m surface)
- Sentinel-2 forest canopy (pretrained model, bundled scenes)
- Typical and infrequent potential release area (PRA)
- com4FlowPy runout at alpha 30° (typical) and 18° (infrequent)
- autoATES v3.0 classifier (ATES v.2 floors, then averaging)

The South Coast / Spearhead benchmark (~150–390 km² of Whistler-area
backcountry) is a **precomputed** extra in `data/optional_southcoast/`. It is
the terrain outside the hotel, but it is too large to run live on mixed
laptops in a 50-minute Flow-Py block. Open it in QGIS if you want; do not
start it as a second live run.

## Repository layout

```
notebooks/                 one notebook per module, run in order
data/<step>/inputs/        what that step needs
data/<step>/outputs_reference/   known-good result if you skip or stall
config/                    workshop autoATES + Flow-Py settings
qgis/                      ATES colour ramps
slides/                    observer deck (PDF)
helpers/                   instructor notes, not required reading
participant/               pre-send email
```

Each notebook starts with: *you should have X from the last step; if not,
copy the reference outputs.*

## Before you arrive

1. Read [SETUP.md](SETUP.md) and create the `autoates-workshop` environment.
2. Clone this repository.
3. Download the data zip from the GitHub Release (link in SETUP.md) and unpack
   it into `data/`.
4. Run the pass/fail check in SETUP.md.
5. Skim [SCHEDULE.md](SCHEDULE.md). The papers are optional.

If the install fails, come anyway. Sit on the observe track; you will still
get the method. Helpers will be in the room from 08:15 for last-mile setup.

## Day-of rule

Conference wifi is not a plan. Bring the repo and the data zip on disk.
USB copies and a local hotspot will be at the door.

## Citation

See [CITING.md](CITING.md). Maps produced in this workshop are a tutorial
product, not an operational ATES map.
