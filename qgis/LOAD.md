# Load Connaught in QGIS (day of)

Open a blank project. Set the project CRS to **EPSG:3979** (Canada Atlas
Lambert) — that is the DEM / PRA / ATES grid. Forest rasters are 10 m
UTM 11N; QGIS will reproject on the fly.

Add layers **bottom to top**:

| Layer | Path | Style |
|---|---|---|
| Hillshade / DEM | `data/01_elevation/inputs/alos_aw3d30_connaught.tif` | Singleband gray, or hillshade renderer |
| Slope | `data/01_elevation/outputs_reference/slope.tif` | `qgis/slope_angle.txt` as a color ramp, or Magma 0–50° |
| Canopy | `data/02_forest/outputs_reference/sen2_canopy_cover.tif` | 0–100, greens |
| Typical PRA | `data/03_pra/outputs_reference/pra_frequent_pra_sieve.tif` | `qgis/pra_binary_frequent.txt` |
| Infrequent PRA | `data/03_pra/outputs_reference/pra_extreme_pra_sieve.tif` | `qgis/pra_binary_extreme.txt` |
| Typical reach | `data/04_runout/outputs_reference/frequent/*fpTravelAngleMax.tif` | Plasma |
| Infrequent reach | `data/04_runout/outputs_reference/extreme/*fpTravelAngleMax.tif` | Plasma |
| ATES | `data/05_ates/outputs_reference/ATES_classification.tif` | **`qgis/ates_classes.qml`** |
| Expert overlay | `data/00_orientation/inputs/expert_consensus.shp` | Outline only, 0.6 mm, no fill |

ATES `.qml`: Layer Properties → Symbology → Style → Load.

Keep ATES and the expert outline on for the 15:05 discussion. Turn PRA
and runout on one at a time so the room can see typical vs infrequent.
