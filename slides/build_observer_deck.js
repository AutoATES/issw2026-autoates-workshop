/**
 * Observer / projector deck for the ISSW 2026 autoATES workshop.
 * Maps are the slides. Talking-point copy stays off the rasters.
 */
const PptxGenJS = require("/home/jmsykes/Documents/Code/issw-autoATES-comparison/paper/poster/node_modules/pptxgenjs");
const path = require("path");

const FIG = path.join(__dirname, "figures");
const fig = (name) => path.join(FIG, name);

const SIZE = {
  ates_finished: [1122, 1118],
  elev_hillshade: [1744, 868],
  elev_slope: [998, 1055],
  forest_cover_gap: [1728, 897],
  forest_seasons: [2086, 731],
  pra_two_scenarios: [1744, 868],
  runout_two_scenarios: [1744, 868],
};

const C = {
  navy: "1B3A4B",
  ink: "1A1A1A",
  mute: "5C6570",
  line: "D4D0C8",
  paper: "FFFFFF",
  cream: "F4F1EA",
  simple: "90EF98",
  chal: "00ADFF",
  complex: "F15393",
  extreme: "B400FF",
};

function contain(slide, name, box) {
  const [ow, oh] = SIZE[name];
  const ar = ow / oh;
  let w = box.w;
  let h = box.h;
  if (w / h > ar) w = h * ar;
  else h = w / ar;
  slide.addImage({
    path: fig(name + ".png"),
    x: box.x + (box.w - w) / 2,
    y: box.y + (box.h - h) / 2,
    w,
    h,
  });
}

function footer(slide, page, n) {
  slide.addText("ISSW 2026  ·  autoATES v3.0 workshop  ·  Connaught Creek", {
    x: 0.5, y: 7.15, w: 10.5, h: 0.22,
    fontFace: "Calibri", fontSize: 11, color: C.mute, margin: 0,
  });
  slide.addText(String(page) + " / " + n, {
    x: 11.9, y: 7.15, w: 0.9, h: 0.22,
    fontFace: "Calibri", fontSize: 11, color: C.mute, align: "right", margin: 0,
  });
}

function mapSlide(pres, { title, kicker, name, page, n, note }) {
  const slide = pres.addSlide();
  slide.background = { color: C.paper };
  slide.addText(kicker, {
    x: 0.5, y: 0.22, w: 12.3, h: 0.28,
    fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, charSpacing: 1.2,
  });
  slide.addText(title, {
    x: 0.5, y: 0.48, w: 12.3, h: 0.42,
    fontFace: "Calibri", fontSize: 24, bold: true, color: C.ink, margin: 0,
  });
  contain(slide, name, { x: 0.35, y: 1.0, w: 12.6, h: 6.0 });
  footer(slide, page, n);
  if (note) slide.addNotes(note);
  return slide;
}

async function main() {
  const pres = new PptxGenJS();
  pres.defineLayout({ name: "WIDE", width: 13.3, height: 7.5 });
  pres.layout = "WIDE";
  pres.title = "ISSW 2026 autoATES v3.0 workshop";
  pres.author = "John Sykes";
  pres.subject = "Observer / projector deck — Connaught Creek";

  const N = 12;

  // 1 Title
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("ISSW 2026  ·  Saturday 3 October  ·  09:00–16:00  ·  Peak Room", {
      x: 0.7, y: 1.6, w: 12, h: 0.35,
      fontFace: "Calibri", fontSize: 16, color: "A8C0CC", margin: 0,
    });
    s.addText("autoATES v3.0", {
      x: 0.7, y: 2.15, w: 12, h: 0.85,
      fontFace: "Calibri", fontSize: 48, bold: true, color: "FFFFFF", margin: 0,
    });
    s.addText("Mapping Connaught Creek with open-source tools", {
      x: 0.7, y: 3.05, w: 12, h: 0.45,
      fontFace: "Calibri", fontSize: 22, color: "E8EEF0", margin: 0,
    });
    s.addText("Follow along on a laptop, or sit and watch. Both tracks are first-class.", {
      x: 0.7, y: 5.55, w: 12, h: 0.35,
      fontFace: "Calibri", fontSize: 16, color: "A8C0CC", margin: 0,
    });
    s.addNotes("Welcome. Two tracks. Connaught 13 km2, production stack not 5 m lidar.");
  }

  // 2 Two tracks
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    s.addText("HOW THE ROOM WORKS", {
      x: 0.5, y: 0.28, w: 12.3, h: 0.28,
      fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, charSpacing: 1.2,
    });
    s.addText("Two tracks, one timetable", {
      x: 0.5, y: 0.55, w: 12.3, h: 0.5,
      fontFace: "Calibri", fontSize: 28, bold: true, color: C.ink, margin: 0,
    });
    const cards = [
      { x: 0.5, title: "Follow along", body: "Run the notebook for the current module. Python 3.11 + QGIS. If a step fails, copy that folder’s outputs_reference and continue." },
      { x: 4.7, title: "Observe", body: "Same maps on this screen. No laptop required. You leave with the method, the design choices, and where to get the code." },
      { x: 8.9, title: "Jump ahead", body: "data/<step>/outputs_reference/ is the recovery path. Helpers will not stop the room for one laptop." },
    ];
    for (const c of cards) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.x, y: 1.4, w: 3.9, h: 3.6,
        fill: { color: C.cream }, line: { color: C.line, width: 1 },
      });
      s.addText(c.title, {
        x: c.x + 0.25, y: 1.6, w: 3.4, h: 0.55,
        fontFace: "Calibri", fontSize: 22, bold: true, color: C.navy, margin: 0,
      });
      s.addText(c.body, {
        x: c.x + 0.25, y: 2.3, w: 3.4, h: 2.4,
        fontFace: "Calibri", fontSize: 16, color: C.ink, margin: 0,
      });
    }
    s.addText("Helpers from 08:15. USB copies at the door. Conference wifi is not a plan.", {
      x: 0.5, y: 5.3, w: 12.3, h: 0.4,
      fontFace: "Calibri", fontSize: 16, color: C.mute, margin: 0,
    });
    footer(s, 2, N);
  }

  // 3 Pipeline
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    s.addText("THE CHAIN", {
      x: 0.5, y: 0.28, w: 12.3, h: 0.28,
      fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, charSpacing: 1.2,
    });
    s.addText("Five steps. Typical and infrequent stay split.", {
      x: 0.5, y: 0.55, w: 12.3, h: 0.5,
      fontFace: "Calibri", fontSize: 28, bold: true, color: C.ink, margin: 0,
    });
    const steps = [
      ["1", "Elevation", "ALOS 30 m surface"],
      ["2", "Forest", "Sentinel-2 canopy + gap"],
      ["3", "PRA", "Typical / infrequent"],
      ["4", "Runout", "Flow-Py  α 30° / 18°"],
      ["5", "ATES", "Floors, then average"],
    ];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 2.55;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.6, w: 2.35, h: 3.3,
        fill: { color: C.navy },
      });
      s.addText(st[0], {
        x, y: 1.85, w: 2.35, h: 0.7,
        fontFace: "Calibri", fontSize: 32, bold: true, color: C.chal, align: "center", margin: 0,
      });
      s.addText(st[1], {
        x: x + 0.12, y: 2.65, w: 2.1, h: 0.55,
        fontFace: "Calibri", fontSize: 20, bold: true, color: "FFFFFF", align: "center", margin: 0,
      });
      s.addText(st[2], {
        x: x + 0.12, y: 3.3, w: 2.1, h: 1.1,
        fontFace: "Calibri", fontSize: 15, color: "D5E3EA", align: "center", margin: 0,
      });
    });
    s.addText("One parameterization cannot stand in for everyday events and the larger, less frequent avalanches that still belong on an ATES map.", {
      x: 0.5, y: 5.2, w: 12.3, h: 0.55,
      fontFace: "Calibri", fontSize: 16, color: C.ink, margin: 0,
    });
    footer(s, 3, N);
    s.addNotes("Typical vs infrequent is the v3.0 design. Do not retune class thresholds live.");
  }

  // 4 Finished map
  mapSlide(pres, {
    kicker: "09:00  ·  THE MAP WE WILL REBUILD",
    title: "Connaught Creek, Rogers Pass — 13 km²",
    name: "ates_finished",
    page: 4, n: N,
    note: "Held-out comparison drainage. Production stack, not 5 m lidar. Expert overlay is a reference, not ground truth.",
  });

  // 5 Elevation
  mapSlide(pres, {
    kicker: "09:25  ·  ELEVATION",
    title: "30 m surface. Canopy-top in forest. Slope is smoothed.",
    name: "elev_hillshade",
    page: 5, n: N,
    note: "Why not a lidar patchwork. Extreme cliffs and isolated low-angle start zones are both harder to pick out.",
  });

  // 6 Forest seasons
  mapSlide(pres, {
    kicker: "10:35  ·  FOREST",
    title: "Summer greenness. Winter conifer, deciduous, and gully paths.",
    name: "forest_seasons",
    page: 6, n: N,
    note: "We do not train a model in the room. Operational binary is bundled. Then 3x3 canopy and gap area.",
  });

  // 7 Cover vs gap
  mapSlide(pres, {
    kicker: "10:35  ·  FOREST",
    title: "PRA uses canopy cover. The classifier uses opening size.",
    name: "forest_cover_gap",
    page: 7, n: N,
    note: "Gap is only read where the neighbourhood is forested, so alpine is not one unbounded opening. Treeline segments large PRAs; it is not an ATES input.",
  });

  // 8 PRA
  mapSlide(pres, {
    kicker: "13:00  ·  POTENTIAL RELEASE AREA",
    title: "Typical is tighter. Infrequent picks up start zones below 30°.",
    name: "pra_two_scenarios",
    page: 8, n: N,
    note: "Published v2 sits on the calibration envelope. Do not retune thresholds live.",
  });

  // 9 Runout
  mapSlide(pres, {
    kicker: "13:50  ·  RUNOUT",
    title: "com4FlowPy — typical α 30°, infrequent α 18°. Not RAMMS.",
    name: "runout_two_scenarios",
    page: 9, n: N,
    note: "Desktop numba: 3.4 s for both scenarios. If a laptop is still going at 14:35, load reference outputs. BFW owns this block.",
  });

  // 10 ATES again with classifier note - reuse finished map? Use ates_finished with different kicker
  mapSlide(pres, {
    kicker: "15:05  ·  ATES CLASSIFIER",
    title: "Infrequent sets the envelope. A floor cannot be averaged down.",
    name: "ates_finished",
    page: 10, n: N,
    note: "Live call is atesCore. Paper hybrid is atesValidation. Class 0 is a safety decision. Discuss next to the expert overlay; do not score as an exam.",
  });

  // 11 Classifier rules
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    s.addText("15:05  ·  WHAT SETS THE CLASS", {
      x: 0.5, y: 0.28, w: 12.3, h: 0.28,
      fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, charSpacing: 1.2,
    });
    s.addText("Floors first. Then the rest is averaged.", {
      x: 0.5, y: 0.55, w: 12.3, h: 0.5,
      fontFace: "Calibri", fontSize: 28, bold: true, color: C.ink, margin: 0,
    });
    const rows = [
      [C.simple, "Simple", "Infrequent runout reach"],
      [C.chal, "Challenging", "Typical runout reach"],
      [C.complex, "Complex", "Typical overhead / contributing area"],
      [C.extreme, "Extreme", "Slope > 45° and open canopy"],
    ];
    rows.forEach((r, i) => {
      const y = 1.3 + i * 1.15;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y, w: 0.22, h: 0.95, fill: { color: r[0] },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.72, y, w: 12.08, h: 0.95,
        fill: { color: C.cream },
      });
      s.addText(r[1], {
        x: 1.0, y: y + 0.12, w: 3.2, h: 0.7,
        fontFace: "Calibri", fontSize: 22, bold: true, color: C.ink, valign: "middle", margin: 0,
      });
      s.addText(r[2], {
        x: 4.4, y: y + 0.12, w: 8.1, h: 0.7,
        fontFace: "Calibri", fontSize: 20, color: C.ink, valign: "middle", margin: 0,
      });
    });
    footer(s, 11, N);
    s.addNotes("Regional calibration lives in the PRA and runout scenarios, not in retuned class thresholds.");
  }

  // 12 Take-home
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("TAKE-HOME", {
      x: 0.7, y: 0.7, w: 12, h: 0.3,
      fontFace: "Calibri", fontSize: 14, color: "A8C0CC", margin: 0, charSpacing: 1.2,
    });
    s.addText("Point this at a home range with an AOI, a 30 m surface, and a canopy raster.", {
      x: 0.7, y: 1.15, w: 12, h: 0.9,
      fontFace: "Calibri", fontSize: 26, bold: true, color: "FFFFFF", margin: 0,
    });
    const items = [
      "Keep typical / infrequent parameters unless you have a reason and a validation set.",
      "A map from this tutorial is not an operational ATES product.",
      "Repo, pins, and papers: SETUP.md and CITING.md in the workshop repository.",
      "Best-practices document is in development.",
    ];
    items.forEach((t, i) => {
      s.addText(t, {
        x: 0.7, y: 2.3 + i * 0.7, w: 12, h: 0.55,
        fontFace: "Calibri", fontSize: 18, color: "E8EEF0", margin: 0,
      });
    });
    s.addNotes("Do not start a second live AOI. South Coast is QGIS-only if the extra zip is present.");
  }

  const out = path.join(__dirname, "ISSW2026_autoATES_workshop_observer.pptx");
  await pres.writeFile({ fileName: out });
  console.log("wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
