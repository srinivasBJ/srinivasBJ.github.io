---
title: "Band-Aid AI — Classical CV Wound Detection & Dressing Placement"
description: "An offline OpenCV + NumPy pipeline that finds a wound on a photo of an arm and composites a band-aid over it — skin segmentation in YCrCb/HSV, anomaly scoring in CIELAB, and an interpretable five-factor confidence score."
date: 2026-07-18
category: "experiments"
tags: ["opencv", "numpy", "computer-vision", "image-processing", "gradio"]
---

<video controls class="w-full rounded-lg border border-[var(--color-border)] my-6 shadow-md" poster="/images/bandage-ai-poster.jpg">
  <source src="/videos/bandage-ai-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## What this is

Band-Aid AI takes a photograph of an arm, locates the wound on it, and places a
band-aid over that wound — correctly sized, rotated along the injury, and blended
into the local lighting.

The constraint I set for myself was that it had to run **entirely offline on CPU**.
No cloud services, no paid APIs, no pretrained weights, no training data. Just
**OpenCV and NumPy**, with every threshold derived from the image itself rather
than hardcoded. That constraint is the whole point of the project: it forces the
detection to be explainable. There is no black box to blame — every decision the
pipeline makes can be traced to a number I can print.

## Why YCrCb (and why HSV alongside it)

The first job is isolating skin so the background stops competing for attention.

RGB is a terrible space for this, because in RGB the brightness of a pixel is
smeared across all three channels. A pale arm in shadow and a dark arm in sunlight
land nowhere near each other, so any fixed RGB threshold is really just a threshold
on lighting.

**YCrCb separates luma (Y) from chrominance (Cr, Cb).** Human skin — across the
full range of skin tones — clusters tightly in the Cr/Cb plane, because what
differs between skin tones is mostly *how much* light is reflected, not the
underlying hue of haemoglobin and melanin. By thresholding on Cr and Cb alone and
ignoring Y entirely, the segmentation survives shadow, a curved limb, and a
different person's arm without retuning.

**HSV is layered on top as a sanity check.** YCrCb alone will happily accept very
grey or very dark pixels whose chrominance drifts into the skin cluster by
accident. A saturation/value floor in HSV rejects those. A pixel must pass *both*
rules to count as skin, which keeps false skin low at a small cost in recall — the
right trade here, since a false skin region invents a place for the detector to
hallucinate a wound.

After segmentation, the silhouette rim is eroded away. The outer edge of an arm
carries a strong shading gradient that looks exactly like a dark, elongated wound,
and a real wound lies *on* the limb rather than at its boundary — so nothing is
lost by ignoring the rim.

## Scoring the anomaly

Wound-ness is scored in **CIELAB**, on the a\* (green–red) axis. Each skin pixel is
compared against **two** references:

1. the **median a\*** of the person's entire skin region, and
2. its own **local neighbourhood**.

Robust median/MAD statistics are used instead of mean/standard deviation, because a
wound is by definition an outlier and would otherwise drag the very baseline it is
being measured against. Darkness modulates the redness score, since most injuries
are both redder and darker than the skin around them.

The comparison against the local neighbourhood is what kills the classic false
positive: a broad shading gradient across a forearm is redder than the global
median, but it is *not* redder than its immediate surroundings. Only a localised
anomaly passes both tests.

Region growth then uses **hysteresis thresholding** — strict seeds first, then
growth outward into contiguous weaker pixels — so the dressing is sized to the
wound's full extent rather than just its bright core. Fragments within a bridging
radius are merged, so a dashed knife cut becomes one injury instead of five.

## The confidence score

This is the part I care most about. The pipeline emits **five interpretable
sub-scores**, each normalised to [0, 1]:

| Sub-score | What it measures |
| --- | --- |
| `intensity` | mean wound-score inside the blob — how red/dark it actually is |
| `contrast` | how much the blob stands out from a dilated **ring** of surrounding healthy skin |
| `size` | plausibility of the area relative to the skin region |
| `texture` | roughness of the blob relative to that same ring |
| `shape` | **solidity** — wound pixels ÷ convex-hull area |

Two of these deserve a note.

**The ring.** Rather than comparing a candidate to the whole image, the blob mask is
dilated and the original blob subtracted from it, leaving an annulus of nearby
healthy skin. `contrast` is the difference between the mean score inside the blob
and the mean score in that ring. This is a *local* measurement, so it is immune to
global lighting.

**Solidity.** A cut or abrasion fills most of its convex hull. Scattered blood
specks and hair strands do not. The acceptance band starts low (fill > 0.15),
because a thin cut legitimately fills only a modest share of its hull — but
anything below that is rejected outright.

**Texture** was the cue that fixed my hardest false positives. Measured on real
photos, genuine injuries land at **1.8–3.6×** the sharpness of their surroundings,
while shading artefacts and out-of-focus background objects sit below **1.2**. It is
floored rather than zeroed, so a genuinely smooth wound is demoted but never
silently discarded.

### The formula

The five sub-scores are combined as a **geometric mean**:

```python
combined   = (intensity * contrast * size * shape * texture) ** 0.20
confidence = combined * min(1.0, intensity * 2) * 0.98
```

The exponent `0.20` is `1/5` — the fifth root of the product of five factors.

The geometric mean is deliberate. A **sum** would let a candidate that scores
brilliantly on four factors and near-zero on the fifth still pass. A **product**
makes any near-zero sub-score *disqualifying*, which is exactly the semantics I
want: a wound must be red **and** locally distinct **and** plausibly sized **and**
compact **and** texturally rough. Failing any single one of those should veto the
candidate, not be averaged away.

The two trailing terms are guards. `min(1.0, intensity * 2)` re-penalises very faint
candidates that scraped through on geometry alone. The `0.98` cap means the system
**never reports certainty** — it is a heuristic, and it should say so.

### Worked example

For a typical accepted candidate:

```
intensity = 0.95     contrast = 0.90     size = 0.85
shape     = 0.78     texture  = 0.92

combined   = (0.95 × 0.90 × 0.85 × 0.78 × 0.92) ** 0.20
           = (0.5215) ** 0.20
           ≈ 0.878
confidence = 0.878 × 1.0 × 0.98
           ≈ 0.86
```

### Where the threshold came from

`min_confidence = 0.85`, and that number is measured rather than chosen by taste.
Across the test images, true wounds scored **0.92–0.98**, while every false positive
— shading, background objects, facial features on a webcam frame — stayed at or
below **0.74**. There is a clean gap between those two populations, and 0.85 sits
inside it. When nothing clears the bar, the pipeline returns the original image
unchanged rather than guessing.

## Placement and compositing

Once a wound is located, orientation comes from the wound itself when it is
elongated enough to have a meaningful axis; otherwise **PCA on the skin mask** gives
the limb axis and the dressing follows the arm.

Fit is then verified against the band-aid's **real alpha footprint** — not its
bounding box. Room is measured along and across its axis, it slides toward the
roomier side, and it shrinks until at least **93%** of its opaque pixels sit on
skin. Compositing is alpha blending with a feathered edge, local-illumination
matching so the dressing picks up the scene's lighting, and a soft contact shadow.

## Interface and testing

The demo is a **Gradio** app with a before/after slider, live progress, tunable
parameters, and a per-sub-score confidence breakdown in the UI — so you can see
*why* a candidate was accepted or rejected, not just the verdict. There is also a
CLI for single images and a batch mode that writes a JSON summary over a directory.

Backing it is a **32-test pytest suite**, including explicit *no false positive on
healthy skin* guards and a regression test for each real-photo failure I hit during
development.

---

**Download the full project (source code and assets):** [bandage-ai.zip on Google Drive](https://drive.google.com/file/d/1DJeVQXPrrXGoOwt3FVYzQaH2ckNu6E1r/view?usp=sharing)
