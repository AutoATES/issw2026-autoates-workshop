# Participant email

Send ~3 weeks before 3 October. Reminder the week of is
[EMAIL_REMINDER.md](EMAIL_REMINDER.md). Do not attach the data zip if the
GitHub repo already contains `data/` (it does). Attach nothing large.

Replace the GitHub URL if the repo is not under AutoATES yet.

Copy from the line below.

---

Subject: ISSW Saturday 3 Oct — autoATES workshop (laptop optional)

Hello,

The autoATES v3.0 workshop is Saturday 3 October, 09:00–16:00, Aava Hotel
Peak Room, Whistler.

You can follow along on a laptop or sit and watch. Both are intended.
Prior GIS or Python helps if you want to run the models yourself;
beginners are welcome to observe. Helpers from SFU and BFW will be in
the room.

We will map Connaught Creek, Rogers Pass (13 km²), on the same kind of
global data used for the western Canada production run (ALOS 30 m
elevation, Sentinel-2 forest). That is the drainage from the comparison
talks.

## If you want to follow along

Please do this *before* Saturday. There is no install session in the
morning.

1. Install QGIS 3 from https://qgis.org
2. Install Git from https://git-scm.com and Miniforge from
   https://github.com/conda-forge/miniforge#miniforge3
3. Follow SETUP.md in the workshop repository (conda environment, three
   folders side by side, one pass/fail script):
   https://github.com/AutoATES/issw2026-autoates-workshop
4. Success is: `python check_setup.py` prints only OK lines, and
   JupyterLab opens `notebooks/00_orientation.ipynb`.

SETUP.md includes a short explanation of what conda is, Windows/macOS
notes, and a prompt you can paste into ChatGPT, Claude, Copilot, or Grok
if an install command fails. Those tools are useful for PATH / conda /
GDAL errors. They should not be used to retune the model.

Hotel wifi is not a plan — bring the folders on disk. USB copies will be
at the door from 08:15.

If the install fails, come anyway. You will see every step on the
projector, and you can run the notebooks later from the same repository.

## Saturday timetable

09:00–09:25  Welcome and a finished Connaught ATES map
09:25–10:20  Elevation (ALOS 30 m) — how the surface is built, slope
10:20–10:35  Break
10:35–12:00  Forest cover from Sentinel-2 — canopy % and gap area
12:00–13:00  Lunch (last chance to unstick laptops)
13:00–13:50  Potential release area — typical and infrequent scenarios
13:50–14:50  Runout with com4FlowPy (alpha 30° and 18°)
14:50–15:05  Break
15:05–15:45  ATES classifier — open the map in QGIS
15:45–16:00  Take-home: pointing this at a home range, Q&A

If a laptop step fails, copy that module’s `outputs_reference` folder and
continue. That is how the day is built, not a last resort.

Optional background (not required): the ISSW autoATES v3.0 extended
abstract.

See you Saturday.
John, with colleagues from SFU and BFW
