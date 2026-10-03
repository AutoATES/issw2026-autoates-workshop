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

## Afternoon opener

`ISSW2026_autoATES_v3_afternoon.pptx` — 10 slides, same 13.3 × 7.5 in
frame. For the start of the 13:00 block, after a BFW introduction to
autoATES. Poster figures live in `figures/poster/`.

| Slide | Point |
|---|---|
| 1 | What changed in v3.0 |
| 2 | Two parallel tracks |
| 3 | PRA envelope, including below 30° |
| 4–5 | Validation, and how to use the Connaught overlay |
| 6–7 | Classifier: floors, then the average |
| 8–9 | The two PRA layers, then the Connaught map |
| 10 | The rest of the afternoon |

```bash
node build_afternoon_deck.js
```
