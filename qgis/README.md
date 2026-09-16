# QGIS styles

Day-of layer order: [LOAD.md](LOAD.md).

Put ATES class colour ramps (`.qml`) here so everyone in the room sees
the same map.

Shipped:

- `ates_classes.qml` — classes 0–4, Canadian ATES colours
- `ates_class.txt`, `pra_binary_frequent.txt`, `pra_binary_extreme.txt`,
  `slope_angle.txt` — gdaldem palettes, reusable in QGIS

Load the style from Layer Properties → Symbology → Style → Load after
adding the GeoTIFF. Notebook 05 also colourizes a GeoTIFF for people who
never open QGIS.

Do not use the ATES class ramp on a continuous Flow-Py grid.
