# Setup with Docker (fastest)

The Docker image already contains everything from [SETUP.md](SETUP.md)
sections 1–4: the conda environment, autoATES v3.0 (ISSW snapshot), AvaFrame
at the workshop pin with its Flow-Py extension built, and JupyterLab with
the **autoATES workshop** kernel. You do not need Miniforge, a compiler, or
the two library clones.

You still need this repository (notebooks + Connaught data) and QGIS to
look at the maps.

## 1. Install Docker

- **macOS / Windows:** [Docker Desktop](https://www.docker.com/products/docker-desktop/).
  Windows: keep the default WSL 2 backend.
- **Linux:** Docker Engine + the compose plugin
  (`sudo apt install docker.io docker-compose-v2` on Ubuntu, or the
  [official packages](https://docs.docker.com/engine/install/)).

Docker Desktop → Settings → Resources: give it **at least 8 GB memory**
(Flow-Py runs out at the default on some laptops) and 4+ CPUs.

## 2. Get this repository

```bash
git clone https://github.com/Avalanche-Savvy/issw2026-autoates-workshop.git
cd issw2026-autoates-workshop
```

Or download the ZIP from GitHub and unpack it. A path without spaces is
safest.

## 3. Start it

```bash
docker compose pull      # downloads the prebuilt image (~1 GB compressed, 3.6 GB on disk), once
docker compose up
```

Open **http://localhost:8888** and start with `notebooks/00_orientation.ipynb`.
Pick the kernel **autoATES workshop** if asked. Stop with `Ctrl+C`, or with
`docker compose down` from another terminal.

Linux: run it as your own user so the files it writes belong to you:

```bash
HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose up
```

## 4. Check it

```bash
docker compose run --rm workshop python check_setup.py
```

Every line should start with `OK`.

## How files flow

Your repository folder is mounted into the container at `/workshop`, so:

- notebook edits are saved in your folder;
- outputs (`outputs/`, `notebooks/work/`) appear in your folder, and you
  can open them in QGIS on your laptop as described in SETUP.md section 4.

Nothing else on your machine changes. To remove everything later:
`docker compose down --rmi all`.

## No internet on the day / building it yourself

If the pull does not work, build the image locally from this folder (needs
internet for ~10–20 minutes; do it before you travel):

```bash
docker compose build
```

Apple Silicon and other ARM machines get a native `linux/arm64` image;
Intel/AMD machines get `linux/amd64`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `port is already allocated` / `address already in use` | Something else uses 8888 (often a Jupyter you started outside Docker). Stop it, or run `JUPYTER_PORT=8899 docker compose up` and open http://localhost:8899. |
| Flow-Py cell dies / kernel restarts | Raise Docker Desktop memory (step 1). Or copy that module's `outputs_reference/`. |
| `Permission denied` writing outputs (Linux) | Start with `HOST_UID=$(id -u) HOST_GID=$(id -g)` as above. |
| `denied` or `unauthorized` on `docker compose pull` | The image is not public yet; use `docker compose build`. |
| Windows: files not visible in the container | Share the drive in Docker Desktop → Settings → Resources → File sharing, or clone into your WSL home. |

## Maintainers

- `.github/workflows/docker.yml` builds `linux/amd64` + `linux/arm64` on
  native runners, runs `check_setup.py` and a JupyterLab smoke test in each,
  and pushes `ghcr.io/avalanche-savvy/issw2026-autoates-workshop:latest`
  (plus `:sha-…` and branch tags).
- After the first push, make the package public: GitHub → the org's
  Packages → `issw2026-autoates-workshop` → Package settings → Change
  visibility → Public.
- Library pins are build args in the `Dockerfile` (`AUTOATES_REF`,
  `AVAFRAME_REF`, full SHAs); `/opt/PINS` in the image records them.
