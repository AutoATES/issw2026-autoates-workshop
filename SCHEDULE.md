# ISSW 2026 autoATES v3.0 workshop itinerary

Saturday 3 October 2026, 09:00–16:00  
Aava Hotel, Peak Room, Whistler

Clock time is seven hours. After lunch and two breaks that is about
**5.5 hours of teaching**. Setup is not a session: it happens before the
workshop, or at the door from 08:15.

Two tracks share the room. Follow-along people run the notebook for the
current module. Observers watch the same maps on the projector. Helpers
do not pause the narrative for one laptop — use `outputs_reference/` and
rejoin.

## Staffing

| Role | When | Job |
|---|---|---|
| Projector / narrative | all day | Owns the clock and the slides. Does not debug laptops. |
| Door / Windows / conda | 08:15–12:00, then as needed | Env check, USB, “copy the checkpoint.” |
| QGIS + jump-ahead | all day | Load rasters, styles, get people back on the current step. |
| Flow-Py / AvaFrame (BFW) | afternoon, on call morning | com4FlowPy config, runtime, failed runs. |
| PRA + classifier (SFU) | afternoon, on call morning | Typical vs infrequent, floors vs averaging. |

Helpers should have run every notebook on their own laptop the week before.

## 08:15–09:00 — Door (not a session)

Last-mile environment check. USB copies of the repo + data zip. Local
hotspot if the hotel wifi is down. Success is: `conda activate autoates-workshop`
and the pass/fail import in [SETUP.md](SETUP.md). People who are not ready
sit on the observe track and try again at lunch.

## Morning — inputs, and why they look like this

### 09:00–09:25 — Welcome and a finished map

Notebook: `00_orientation.ipynb`

- Two-track rules and helper roles.
- Pipeline on one slide: DEM → forest → PRA → runout → ATES.
- Finished Connaught Creek ATES map (the thing we will rebuild).
- Why this site: 13 km², held-out comparison drainage, already in the talks.
- Typical vs infrequent in one sentence: one parameterization cannot stand
  in for everyday events and the larger, less frequent avalanches that still
  belong on an ATES map.

Observers: ATES classes 0–4, and that the expert map is a reference, not
ground truth.

### 09:25–10:20 — Elevation

Notebook: `01_elevation.ipynb`

Follow-along: load the bundled ALOS AW3D30 clip, compute slope and
hillshade, open in the notebook and in QGIS. A 5-minute projector demo of
*how* you would download a DEM for a home range (OpenTopography / ALOS).
Nobody downloads live.

Observers: why a 30 m global surface instead of a lidar patchwork; the
surface sits on canopy in forest; slope is smoothed, so Extreme cliffs and
isolated low-angle start zones are both harder to pick out.

**Checkpoint.** If the notebook failed, copy
`data/01_elevation/outputs_reference/` and continue.

### 10:20–10:35 — Break

Helpers catch up laptops. Jump-ahead people can start the forest notebook.

### 10:35–12:00 — Forest cover from Sentinel-2

Notebook: `02_forest.ipynb`

Follow-along: apply a **pretrained** classifier to bundled summer and winter
Sentinel-2 for the Connaught tile. Produce binary conifer, canopy cover
(3×3 neighbourhood), and gap area. We do not train a model in the room.

Observers:

- Why paired summer (greenness) and winter (conifer vs leafless deciduous
  vs snow, and paths in gullies).
- Canopy cover vs gap area: PRA uses cover; the ATES classifier uses the
  size of openings.
- Treeline is estimated from the canopy layer and is used to segment large
  PRAs. It is not an ATES input.

**Checkpoint.** Copy `data/02_forest/outputs_reference/` if needed.

## 12:00–13:00 — Lunch

Last chance to unstick laptops. Afternoon modules assume forest outputs
exist (yours or the reference).

## Afternoon — the v3.0 model

### 13:00–13:50 — Potential release area

Notebook: `03_pra.ipynb`

Follow-along: run typical and infrequent PRA on the Connaught stack.
Inspect rasters and polygons.

Observers: the calibration envelope from the ski-area start-zone maps.
Published v2 sits on that envelope. Typical moves a little along it.
Infrequent is the layer that actually detects start zones below 30°.
Segmentation into polygons is what lets us talk about start-zone size.

**Checkpoint.** `data/03_pra/outputs_reference/`

### 13:50–14:50 — Runout (com4FlowPy)

Notebook: `04_runout.ipynb`  
BFW-led.

Follow-along: typical runout at alpha 30°, infrequent at 18°. Look at
travel angle, z-delta, and route-flux. On this 13 km², ~21 m grid both
Flow-Py scenarios finished in **3.4 s** on a desktop with numba (see
`helpers/TIMING.md`). If a laptop is still going with 15 minutes left,
copy the reference outputs and look at those.

Observers: why two alphas; what Flow-Py is (mass-routing, not RAMMS);
what “reach” means versus intensity.

**Checkpoint.** `data/04_runout/outputs_reference/`  
This is the step most likely to fail on a laptop. Jumping ahead here is
normal.

### 14:50–15:05 — Break

### 15:05–15:45 — ATES classifier

Notebook: `05_ates.ipynb`

Follow-along: run the classifier, colourize, open in QGIS next to the
expert consensus map (overlay, not a scoreboard).

Observers: the ATES v.2 technical model as floors then averaging. Infrequent
runout reach sets Simple; typical runout reach sets Challenging; Complex is
a statement about typical overhead exposure. Regional calibration is
supposed to live in the PRA and runout scenarios, not in retuned class
thresholds. Class 0 is a safety decision: calling avalanche terrain
non-avalanche is the error that hurts someone.

### 15:45–16:00 — Take-home

Notebook: `06_takehome.ipynb` (skim, do not run a second AOI)

- How to point this at a home range: AOI shapefile, DEM, forest, config.
- Optional: open the precomputed South Coast / Spearhead map — Whistler
  backcountry, already run, QGIS only.
- Papers, this repo, AutoATES v3.0 tag, AvaFrame, best-practices doc
  (in development).
- What this map is not: an operational product, a substitute for a local
  mapper, or a finished western Canada forecast-region tile.

## What we will not do live

- Install conda, git, or AvaFrame from scratch.
- Create Copernicus / OpenTopography accounts.
- Download a new DEM or Sentinel tile on hotel wifi.
- Train the forest model.
- Run the 5 m lidar Connaught comparison stack (15+ minutes per Flow-Py
  scenario on a fast machine, and it is not the global workflow).
- Run the South Coast benchmark as a second live domain (386 km²).
- Let people bring their own AOI for the afternoon.

## Timing risks, in order

1. Morning treated as install lab → afternoon starts late. Mitigation: door
   at 08:15, observe track, USB.
2. Flow-Py hangs or is slow → classifier gets squeezed. Mitigation:
   reference outputs, BFW on this block, 30 m Connaught only.
3. Forest notebook tries to become a remote-sensing course. Mitigation:
   pretrained model, 85 minutes is apply-and-interpret, not train.

If the room is behind at lunch, cut the live DEM demo (already optional)
before you cut PRA, Flow-Py, or the classifier.
