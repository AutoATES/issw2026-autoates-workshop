# Observer / projector deck

`ISSW2026_autoATES_workshop_observer.pptx` — 12 slides, 16:9-wide
(13.3 × 7.5 in). Same maps as the notebooks. Talking-point copy is off
the rasters; speaker notes are on the slides.

PDF sibling is the Jupyter-died fallback.

| Slide | Module |
|---|---|
| 1 | Title |
| 2 | Two tracks |
| 3 | Pipeline |
| 4 | Finished ATES map |
| 5 | Elevation |
| 6–7 | Forest |
| 8 | PRA typical / infrequent |
| 9 | Runout α 30 / 18 |
| 10–11 | ATES classifier |
| 12 | Take-home |

Rebuild after changing maps:

```bash
python scripts/make_slide_figures.py
cd slides && node build_observer_deck.js
```

`build_observer_deck.js` requires `pptxgenjs` (the comparison-repo
`paper/poster/node_modules` path is hardcoded until this repo has its
own install).
