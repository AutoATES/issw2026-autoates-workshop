# Participant email

Send about three weeks before 3 October. The week-of reminder is
[EMAIL_REMINDER.md](EMAIL_REMINDER.md). The GitHub repo already contains
the Connaught data, so there is no need to attach a zip.

Copy from the line below.

---

Subject: ISSW Saturday 3 Oct — autoATES workshop

Hello,

The autoATES v3.0 workshop is Saturday 3 October, 09:00–16:00, Aava Hotel
Peak Room, Whistler.

You are welcome to run the notebooks on a laptop or to follow the same
maps on the projector. Prior GIS or Python helps if you want to run the
models yourself, but it is not required. Colleagues from SFU and BFW
will be in the room.

We will map Connaught Creek, Rogers Pass (13 km²), on the same kind of
global data used for the western Canada production run (ALOS 30 m
elevation, Sentinel-2 forest). That is the drainage from the comparison
talks.

## If you would like to follow along on a laptop

Please try the install before Saturday so we can keep the morning on the
mapping rather than on conda.

1. Install QGIS 3 from https://qgis.org
2. Install Git from https://git-scm.com and Miniforge from
   https://github.com/conda-forge/miniforge#miniforge3
3. Follow SETUP.md in the workshop repository (conda environment, three
   folders side by side, one check script):
   https://github.com/AutoATES/issw2026-autoates-workshop
4. You are ready when `python check_setup.py` prints only OK lines and
   JupyterLab opens `notebooks/00_orientation.ipynb`.

SETUP.md explains what conda is, notes for Windows and macOS, and
includes a prompt you can paste into ChatGPT, Claude, Copilot, or Grok
if an install command fails. Those tools are useful for PATH / conda /
GDAL errors. Please do not use them to change PRA or Flow-Py parameters.

Conference wifi is often slow when many people download the same
packages. If you can, get the three folders onto disk before you travel.
We will also have USB copies in the room from 08:15.

If the install is still not cooperating, please still come. You will see
every step on the projector, and you can run the notebooks later from
the same repository.

## Saturday timetable

09:00–09:25  Welcome and a finished Connaught ATES map
09:25–10:20  Elevation (ALOS 30 m) — how the surface is built, slope
10:20–10:35  Break
10:35–12:00  Forest cover from Sentinel-2 — canopy cover and gap area
12:00–13:00  Lunch (a good time to catch up on laptops)
13:00–13:50  Potential release area — typical and infrequent scenarios
13:50–14:50  Runout with com4FlowPy (alpha 30° and 18°)
14:50–15:05  Break
15:05–15:45  ATES classifier — open the map in QGIS
15:45–16:00  Take-home: pointing this at a home range, Q&A

If a laptop step does not finish, copy that module’s `outputs_reference`
folder and continue with the group. Those files are there so a stalled
run does not put you behind.

Optional background: the ISSW autoATES v3.0 extended abstract. It is
not required reading.

See you Saturday.
John, with colleagues from SFU and BFW
