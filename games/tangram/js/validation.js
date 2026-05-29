// ============================================================
// validation.js — IoU-based answer validation
// ============================================================

const IoU_CANVAS_SIZE = 200;
const PASS_THRESHOLD = 0.85;

const Validation = {
  offscreenCanvas: null,
  offscreenCtx: null,

  init() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = IoU_CANVAS_SIZE;
    this.offscreenCanvas.height = IoU_CANVAS_SIZE;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
  },

  // Calculate IoU between target silhouette and user pieces
  // All positions are in game canvas coordinates (assume ~860x520)
  calculate(pieces, level, gameCanvasWidth, gameCanvasHeight) {
    const ctx = this.offscreenCtx;
    const w = IoU_CANVAS_SIZE;
    const h = IoU_CANVAS_SIZE;

    // Scale factors: game canvas → IoU canvas
    const sx = w / gameCanvasWidth;
    const sy = h / gameCanvasHeight;

    // --- Render target silhouette in white ---
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    const silhouette = level.silhouette;
    // silhouette coordinates are already in 0-200 range (IoU canvas)
    for (const poly of silhouette) {
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }
    const targetData = ctx.getImageData(0, 0, w, h).data;

    // --- Render user pieces in white ---
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    for (const piece of pieces) {
      const tv = getTransformedVertices(piece);
      ctx.beginPath();
      // Scale from game canvas → IoU canvas
      ctx.moveTo(tv[0].x * sx, tv[0].y * sy);
      for (let i = 1; i < tv.length; i++) {
        ctx.lineTo(tv[i].x * sx, tv[i].y * sy);
      }
      ctx.closePath();
      ctx.fill();
    }
    const userData = ctx.getImageData(0, 0, w, h).data;

    // --- Pixel comparison ---
    let tp = 0, fp = 0, fn = 0;
    const pixelCount = w * h;

    for (let i = 0; i < pixelCount; i++) {
      // Alpha channel: index = i * 4 + 3
      const targetAlpha = targetData[i * 4 + 3];
      const userAlpha = userData[i * 4 + 3];

      const targetFilled = targetAlpha > 128;
      const userFilled = userAlpha > 128;

      if (targetFilled && userFilled) tp++;
      else if (!targetFilled && userFilled) fp++;
      else if (targetFilled && !userFilled) fn++;
    }

    const denominator = tp + fp + fn;
    if (denominator === 0) return 0;

    return tp / denominator;
  },

  isPassed(iou) {
    return iou >= PASS_THRESHOLD;
  },

  formatPercent(iou) {
    return Math.round(iou * 100);
  }
};
