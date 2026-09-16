# Publish this repo before the participant email goes out

1. Create an empty public repo `AutoATES/issw2026-autoates-workshop`
   (or another org; then fix the clone URL in SETUP.md, README.md, and
   `participant/EMAIL.md`).
2. From this folder:

   ```bash
   git remote add origin git@github.com:AutoATES/issw2026-autoates-workshop.git
   git push -u origin main
   ```

3. Confirm `data/01_elevation/inputs/alos_aw3d30_connaught.tif` is on
   GitHub (it should be; the Connaught bundle is committed).
4. Optional USB: `python scripts/pack_data_zip.py` plus a clone of the
   three repos at the pins in SETUP.md.

Windows/macOS install has not been walked on hardware yet. After John
runs SETUP.md on his Windows laptop, add anything that actually broke to
[KNOWN_ISSUES.md](KNOWN_ISSUES.md) and, if needed, a sentence in SETUP.md.
