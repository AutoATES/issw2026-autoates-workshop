/**
 * Afternoon opener for the ISSW 2026 autoATES workshop.
 * Ten slides on the v3.0 change: two scenarios, validation, classifier.
 * Figures are the poster panels. Speaker notes stay inside those labels.
 */
const path = require("path");

function loadPptx() {
  const tries = [
    "pptxgenjs",
    path.join(__dirname, "node_modules", "pptxgenjs"),
    "/tmp/pptx-modules/node_modules/pptxgenjs",
    "/home/jmsykes/Documents/Code/issw-autoATES-comparison/paper/poster/node_modules/pptxgenjs",
  ];
  for (const t of tries) {
    try {
      return require(t);
    } catch (e) {
      /* next */
    }
  }
  throw new Error("pptxgenjs not found. Install it, or set NODE_PATH.");
}

const PptxGenJS = loadPptx();

const FIG = path.join(__dirname, "figures");
const POSTER = path.join(FIG, "poster");

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
  zero: "D9D9D9",
};

const N = 10;

function footer(slide, page) {
  slide.addText("ISSW 2026  ·  autoATES v3.0  ·  afternoon", {
    x: 0.5, y: 7.15, w: 10.5, h: 0.22,
    fontFace: "Calibri", fontSize: 12, color: C.mute, margin: 0,
  });
  slide.addText(String(page) + " / " + N, {
    x: 11.9, y: 7.15, w: 0.9, h: 0.22,
    fontFace: "Calibri", fontSize: 12, color: C.mute, align: "right", margin: 0,
  });
}

function kicker(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 0.22, w: 12.3, h: 0.26,
    fontFace: "Calibri", fontSize: 13, color: C.mute, margin: 0, charSpacing: 1.2,
  });
}

function title(slide, text, h) {
  slide.addText(text, {
    x: 0.5, y: 0.48, w: 12.3, h: h || 0.46,
    fontFace: "Calibri", fontSize: 26, bold: true, color: C.ink, margin: 0,
  });
}

/** Fit an image inside a box. Preserves aspect ratio. */
function contain(slide, file, ow, oh, box) {
  const ar = ow / oh;
  let w = box.w;
  let h = box.h;
  if (w / h > ar) w = h * ar;
  else h = w / ar;
  slide.addImage({
    path: file,
    x: box.x + (box.w - w) / 2,
    y: box.y + (box.h - h) / 2,
    w,
    h,
  });
}

async function main() {
  const pres = new PptxGenJS();
  pres.defineLayout({ name: "WIDE", width: 13.3, height: 7.5 });
  pres.layout = "WIDE";
  pres.title = "ISSW 2026 autoATES v3.0 — afternoon";
  pres.author = "John Sykes";
  pres.subject = "Two scenarios, validation, and the v3.0 classifier";

  // 1 — frame
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("AFTERNOON  ·  13:00", {
      x: 0.7, y: 1.35, w: 12, h: 0.32,
      fontFace: "Calibri", fontSize: 15, color: "A8C0CC", margin: 0, charSpacing: 1.4,
    });
    s.addText("What changed in autoATES v3.0", {
      x: 0.7, y: 1.8, w: 12, h: 0.7,
      fontFace: "Calibri", fontSize: 40, bold: true, color: "FFFFFF", margin: 0,
    });
    s.addText("Two scenarios, what the validation supports, and how a cell gets its class.\nThen we run that model on Connaught Creek.", {
      x: 0.7, y: 2.7, w: 11.2, h: 1.15,
      fontFace: "Calibri", fontSize: 20, color: "E8EEF0", margin: 0,
    });
    const pills = [
      { t: "Two scenarios", d: "Typical and infrequent, in parallel" },
      { t: "Validation", d: "Nine regions. One held out." },
      { t: "Classifier", d: "Floors first. Then an average." },
    ];
    pills.forEach((p, i) => {
      const x = 0.7 + i * 4.05;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 4.55, w: 3.85, h: 1.45,
        fill: { color: "24485C" },
      });
      s.addText(p.t, {
        x: x + 0.22, y: 4.7, w: 3.4, h: 0.42,
        fontFace: "Calibri", fontSize: 18, bold: true, color: "FFFFFF", margin: 0,
      });
      s.addText(p.d, {
        x: x + 0.22, y: 5.18, w: 3.4, h: 0.55,
        fontFace: "Calibri", fontSize: 15, color: "D5E2E8", margin: 0,
      });
    });
    s.addNotes("BFW has introduced autoATES. This block is the v3.0 change, then notebook 03. About 15 minutes. Do not re-teach the whole pipeline.");
  }

  // 2 — workflow
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "THE CHANGE");
    title(s, "Two tracks. They meet in the classifier.");
    contain(s, path.join(POSTER, "ates_workflow.png"), 4372, 1852, {
      x: 0.4, y: 1.1, w: 12.5, h: 5.9,
    });
    footer(s, 2);
    s.addNotes("Read the figure. Typical PRA into alpha 30. Infrequent PRA into alpha 18. PRA calibrated to 613 ski-area start zones. The live notebook uses the bundled Connaught forest layer in that same role. Runout detail belongs to the BFW block. The sentence under the title on the figure is the point: the two tracks are not averaged together.");
  }

  // 3 — PRA envelope
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "WHY TWO SCENARIOS");
    title(s, "Infrequent is the layer that sees start zones below 30°.");
    contain(s, path.join(POSTER, "fig2_pra.png"), 3716, 1820, {
      x: 0.35, y: 1.08, w: 12.6, h: 5.7,
    });
    footer(s, 3);
    s.addNotes("Each dot is a parameter combination. The line is the best detection at a given extra area. v2.0 is one point on that envelope. Typical sits a little further along. On the right-hand panel, start zones below 30°, infrequent is the setting that climbs the curve. Keep the ISSW thresholds in the room. Do not retune them live to look more like an expert map. Do not quote a detection rate unless you are reading it off this figure.");
  }

  // 4 — validation figure
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "VALIDATION");
    title(s, "Connaught was held out.");
    contain(s, path.join(POSTER, "fig4_validation.png"), 2478, 1277, {
      x: 0.4, y: 1.1, w: 12.5, h: 5.85,
    });
    footer(s, 4);
    s.addNotes("Panel (a): weighted kappa against the expert map. Connaught is the red bar, marked held out, 0.73. The grey band is inter-mapper agreement, so 1.0 is not the target. Panel (b): agreement with the autoATES starting map. Use the figure’s own words for the groups: corrected, redrawn, independent. Connaught is independent. This is context. It is not a scoreboard for the overlay we open at 15:05.");
  }

  // 5 — how to hold the validation
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "HOW WE WILL USE THAT");
    title(s, "Three rules for the Connaught overlay.");
    const cards = [
      {
        h: "A reference",
        b: "The expert map is there for discussion. Agreement between mappers is the ceiling on this comparison.",
      },
      {
        h: "Tune the scenarios",
        b: "Regional calibration belongs in the typical and infrequent runs. The class thresholds stay as published.",
      },
      {
        h: "Leave the thresholds",
        b: "Editing them in the room so Connaught looks closer to the overlay undoes the v3.0 design.",
      },
    ];
    cards.forEach((c, i) => {
      const x = 0.5 + i * 4.2;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.45, w: 4.0, h: 5.15,
        fill: { color: C.cream },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.45, w: 0.12, h: 5.15,
        fill: { color: C.navy },
      });
      s.addText(String(i + 1), {
        x: x + 0.35, y: 1.7, w: 3.4, h: 0.55,
        fontFace: "Calibri", fontSize: 28, bold: true, color: C.navy, margin: 0,
      });
      s.addText(c.h, {
        x: x + 0.35, y: 2.4, w: 3.4, h: 0.9,
        fontFace: "Calibri", fontSize: 26, bold: true, color: C.ink, margin: 0,
      });
      s.addText(c.b, {
        x: x + 0.35, y: 3.5, w: 3.4, h: 2.6,
        fontFace: "Calibri", fontSize: 18, color: C.ink, margin: 0,
      });
    });
    footer(s, 5);
    s.addNotes("Say these out loud before anyone opens the expert layer. If the room wants a number, go back one slide. Do not invent a second statistic.");
  }

  // 6 — classifier diagram
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "THE CLASSIFIER");
    title(s, "Floors raise the class. The average cannot lower it.");
    contain(s, path.join(POSTER, "fig3_classifier.png"), 3751, 2875, {
      x: 0.35, y: 1.08, w: 12.6, h: 5.9,
    });
    footer(s, 6);
    s.addNotes("Walk top to bottom. Inputs, then Tier A floors (raise only; route options are greyed as not implemented), then Tier B scores that may stay silent, then the higher of the floor and the averaged score, then class 0 if it is clearly met. Class 0 can overrule a floor. The next slide is the same rules in the colours the map will use. The flowchart palette is the poster palette.");
  }

  // 7 — floors in map colours
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "WHAT SETS THE CLASS");
    title(s, "Five decisions. The map uses these colours.");
    const rows = [
      [C.zero, "1A1A1A", "0  Non-avalanche", "Clear non-avalanche tests. This step can overrule a floor."],
      [C.simple, "1A1A1A", "1  Simple", "Floor: inside the infrequent runout."],
      [C.chal, "1A1A1A", "2  Challenging", "Floor: inside the typical runout."],
      [C.complex, "FFFFFF", "3  Complex", "Floor: overhead hazard."],
      [C.extreme, "FFFFFF", "4  Extreme", "Floor: slope steeper than 45°, and open."],
    ];
    rows.forEach((r, i) => {
      const y = 1.18 + i * 0.98;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y, w: 4.15, h: 0.88,
        fill: { color: r[0] },
      });
      s.addText(r[2], {
        x: 0.7, y, w: 3.8, h: 0.88,
        fontFace: "Calibri", fontSize: 20, bold: true, color: r[1], valign: "middle", margin: 0,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 4.65, y, w: 8.15, h: 0.88,
        fill: { color: C.cream },
      });
      s.addText(r[3], {
        x: 4.9, y, w: 7.7, h: 0.88,
        fontFace: "Calibri", fontSize: 20, color: C.ink, valign: "middle", margin: 0,
      });
    });
    s.addText("Tier B is averaged with the floor, and the higher value is kept. Route options are unimplemented.", {
      x: 0.5, y: 6.4, w: 12.3, h: 0.4,
      fontFace: "Calibri", fontSize: 16, color: C.mute, margin: 0,
    });
    footer(s, 7);
    s.addNotes("Colours match the QGIS style and the Connaught map, not the poster flowchart. Tier B (PRA, runout, neighbourhood slope, opening size) is averaged, and the higher of that average and the floor is kept. A Tier B score may stay silent. Route options are not implemented. Class 0 is a safety decision: calling avalanche terrain non-avalanche is the error that hurts someone.");
  }

  // 8 — Connaught PRA, what they run next
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "13:00  ·  CONNAUGHT CREEK");
    title(s, "Next notebook: these two start-zone layers.");
    contain(s, path.join(FIG, "pra_two_scenarios.png"), 1744, 868, {
      x: 0.35, y: 1.08, w: 12.6, h: 5.9,
    });
    footer(s, 8);
    s.addNotes("13 km², ALOS about 21 m on this clip. Typical is the tighter layer. Infrequent fills in lower-angle and forested start zones. If a laptop stalls, copy data/03_pra/outputs_reference/ and continue. Do not switch to the 5 m lidar stack.");
  }

  // 9 — finished map
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    kicker(s, "15:05  ·  SAME DRAINAGE");
    title(s, "The classifier turns those layers into this map.");
    const notes = [
      ["Open the overlay", "Put this next to the expert consensus map. Talk about where they differ."],
      ["Hold the three rules", "Reference, scenarios, published thresholds. The kappa slide is the comparison."],
      ["Watch class 0", "A white cell is a claim that the tests for non-avalanche were clearly met."],
    ];
    notes.forEach((n, i) => {
      const y = 1.25 + i * 1.85;
      s.addText(n[0], {
        x: 0.5, y, w: 5.3, h: 0.45,
        fontFace: "Calibri", fontSize: 22, bold: true, color: C.navy, margin: 0,
      });
      s.addText(n[1], {
        x: 0.5, y: y + 0.48, w: 5.3, h: 1.05,
        fontFace: "Calibri", fontSize: 16, color: C.ink, margin: 0,
      });
    });
    contain(s, path.join(FIG, "ates_finished.png"), 1122, 1118, {
      x: 6.05, y: 1.15, w: 6.8, h: 5.8,
    });
    footer(s, 9);
    s.addNotes("Square map, legend is on the figure. Pink is Complex and purple is Extreme, matching the QGIS style. South Coast is optional and QGIS-only at the end. Do not start a second live AOI.");
  }

  // 10 — clock
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("THE NEXT THREE HOURS", {
      x: 0.7, y: 0.4, w: 12, h: 0.3,
      fontFace: "Calibri", fontSize: 14, color: "A8C0CC", margin: 0, charSpacing: 1.2,
    });
    const blocks = [
      ["13:00", "Potential release area", "Both scenarios. Notebook 03. You are here."],
      ["13:50", "Runout, with BFW", "com4FlowPy. Alpha 30° and alpha 18°. Notebook 04."],
      ["15:05", "Classifier", "Floors, then the Connaught map beside the expert overlay. Notebook 05."],
    ];
    blocks.forEach((b, i) => {
      const y = 1.0 + i * 1.55;
      s.addText(b[0], {
        x: 0.7, y, w: 2.1, h: 0.55,
        fontFace: "Calibri", fontSize: 26, bold: true, color: "FFFFFF", margin: 0,
      });
      s.addText(b[1], {
        x: 3.0, y, w: 9.3, h: 0.5,
        fontFace: "Calibri", fontSize: 26, bold: true, color: "FFFFFF", margin: 0,
      });
      s.addText(b[2], {
        x: 3.0, y: y + 0.55, w: 9.3, h: 0.5,
        fontFace: "Calibri", fontSize: 18, color: "D5E2E8", margin: 0,
      });
    });
    s.addText("If a laptop is still running, copy that folder’s outputs_reference and stay with the room.", {
      x: 0.7, y: 5.85, w: 11.8, h: 0.45,
      fontFace: "Calibri", fontSize: 16, color: "A8C0CC", margin: 0,
    });
    s.addNotes("Break is 14:50–15:05. Flow-Py is the step most likely to stall; reference rasters are expected there. Total on this clip was about 5 seconds on the desktop with numba. Laptops will be slower. We do not start a second AOI after 15:45.");
  }

  const out = path.join(__dirname, "ISSW2026_autoATES_v3_afternoon.pptx");
  await pres.writeFile({ fileName: out });
  console.log("wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
