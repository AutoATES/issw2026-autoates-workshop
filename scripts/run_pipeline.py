"""Run the workshop autoATES config (PRA + Flow-Py + ATES).

Uses AUTOATES_ROOT if set, otherwise the local AutoATES-v3.0 clone.
Must be launched from the workshop repo root.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
DEFAULT_AUTOATES = Path.home() / "Documents/Code/AutoATES/AutoATES-v3.0"
AUTOATES_ROOT = Path(os.environ.get("AUTOATES_ROOT", DEFAULT_AUTOATES)).expanduser()

sys.path.insert(0, str(AUTOATES_ROOT))

from autoates.comAutoATES.comAutoATES import runAutoATES, load_config  # noqa: E402


def main() -> None:
    os.chdir(REPO)
    cfg_path = REPO / "config" / "autoATESCfg_workshop.ini"
    cfg = load_config(cfg_path)
    print(f"AUTOATES_ROOT={AUTOATES_ROOT}")
    print(f"config={cfg_path}")
    print(f"working_dir={cfg['General']['working_dir']}")
    result = runAutoATES(config=cfg, config_path=cfg_path)
    print("status:", result.get("status"))
    times = result.get("_step_times", {})
    for k, v in times.items():
        print(f"  {k}: {v} min")


if __name__ == "__main__":
    main()
