# QGIS styles

Put ATES class colour ramps (`.qml`) here so everyone in the room sees
the same map.

Intended files (to be added with the data bundle):

- `ates_classes.qml` — classes 0–4, Canadian ATES colours
- `pra_binary.qml` — typical / infrequent PRA
- `canopy_cover.qml` — 0–100 %
- `gap_area.qml` — opening size (ha)

Load the style from Layer Properties → Symbology → Style → Load after
adding the GeoTIFF. Notebook 05 also colourizes a GeoTIFF for people who
never open QGIS.

Do not use the ATES class ramp on a continuous Flow-Py grid.
