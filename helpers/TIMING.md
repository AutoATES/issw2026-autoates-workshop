# Timed Connaught run (reference outputs)

Machine: workshop maintainer desktop, 16 Sep 2026.  
Domain: Connaught Creek, 13 km², ALOS ~21.3 m (EPSG:3979 clip).  
Pins: AutoATES `adb83f616576`, AvaFrame `c745a2dec4a7`, Flow-Py `engine=numba`.

| Step | Wall clock |
|---|---|
| Preprocess (align + clip) | 0.1 s |
| PRA typical + infrequent | 0.9 s |
| Typical runout (α 30°) | 1.4 s |
| Infrequent runout (α 18°) | 2.0 s |
| ATES + colourize | 0.2 s |
| **Total** | **~5 s** |

Grid: 259 × 260. Treeline from canopy: 1979 m.  
ATES class share on valid cells, dev8 reference of 2 Oct 2026: 0 1%, 1 11%, 2 24%, 3 55%, 4 9%.

Without numba, budget ~20× on Flow-Py (~30–40 s here; still inside the
afternoon block on a mid-range laptop). The 5 m lidar comparison stack is
**not** this domain: python-engine Flow-Py was ~15 min per scenario.

Re-time on a Windows laptop and a Mac before ISSW and paste the numbers here.
