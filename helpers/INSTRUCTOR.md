# Instructor notes

Not participant reading. The public schedule is [SCHEDULE.md](../SCHEDULE.md).

## Site decision (locked unless John changes it)

**Live AOI: Connaught Creek, 13 km², ALOS 30 m + Sentinel-2 forest.**

South Coast / Spearhead is precomputed only. Cypress (~18 km², North Shore)
is a possible future small Coast Range example; it is not this workshop.

Do not switch the live DEM to the 5 m lidar comparison stack. On a fast
machine, python-engine Flow-Py at 5 m took ~15 minutes for *one* Connaught
scenario. Mixed laptops will not finish two scenarios in the runout block.
The 30 m production stack is also the story we advertised: global free data.

## Pedagogical spine

Each hour answers one design question from the v3.0 paper:

| Module | Question the map should answer |
|---|---|
| Elevation | Why a consistent 30 m surface, and what it costs |
| Forest | Why summer+winter Sentinel-2, and gap area vs canopy % |
| PRA | Why two scenarios, especially below 30° |
| Runout | Why alpha 30 / 18, and what Flow-Py is |
| ATES | Floors then average; calibration lives in the scenarios |

If you have to drop something, drop the live DEM-download demo first. Do
not drop PRA, Flow-Py, or the classifier.

## Jump-ahead protocol

Say this out loud at 09:00 and again after lunch:

> If your laptop is not on the current step, copy that folder's
> `outputs_reference/` into your working outputs and open the next
> notebook. That is how the workshop is built. You are not behind.

Helpers: do not re-install conda during a science block. Offer the
checkpoint, then sit down. Take names for lunch.

## Projector vs laptops

One person owns the projector. They run the notebook (or show the
reference GeoTIFFs) on a known-good machine. Laptops are a chorus, not
the source of truth. If Jupyter dies on the projector, fall back to
`slides/ISSW2026_autoATES_workshop_observer.pptx` (PDF sibling in the
same folder) or QGIS with `qgis/LOAD.md`. Have the deck and QGIS open
before 09:00.

## Data the room will actually see

Minimum layers on the projector for Connaught:

- Hillshade + slope
- Canopy cover and gap area
- Typical PRA, infrequent PRA
- Typical runout reach, infrequent runout reach
- autoATES class raster, ATES colours
- Expert consensus overlay (discussion, not a score)

Optional at the end: South Coast precomputed ATES in QGIS, zoomed to
something people know (Spearhead / Singing Pass / etc.).

## Things not to improvise

- Do not retune PRA thresholds live “to look more like the expert map.”
  That is the opposite of the v3.0 design.
- Do not score the classifier against the expert map as if it were an
  exam. Connaught is held out; inter-mapper agreement is the ceiling.
- Do not start a second AOI after 15:45.

## Week-before checklist

- [ ] Every helper has run 00–05 on their OS
- [ ] Windows helper has hit the GDAL path at least once
- [ ] Data zip is hashed and copied to at least two USBs + one local disk
- [ ] Projector laptop has the env, the zip, QGIS styles, and slides offline
- [ ] AutoATES and AvaFrame pins in SETUP.md are real tags
- [ ] Flow-Py on the 30 m Connaught clip timed on a mid-range laptop
      (desktop numba: 3.4 s for both scenarios — `helpers/TIMING.md`.
      Re-time Windows + Mac.)
- [ ] Reference outputs regenerated from those pins, not from a dirty tree
