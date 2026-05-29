// ============================================================
// renderer.js — Canvas rendering for pieces, silhouette, guides
// ============================================================

const Renderer = {
  canvas: null,
  ctx: null,
  dpr: 1,
  displayWidth: 860,
  displayHeight: 520,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.resize();
  },

  resize() {
    const wrapper = this.canvas.parentElement;
    const wrapperWidth = wrapper ? wrapper.clientWidth : 860;
    // Use at least 800px width for the canvas
    const maxW = Math.max(Math.min(wrapperWidth, 860), 800);
    this.displayWidth = maxW;
    this.displayHeight = Math.round(this.displayWidth * 520 / 860);

    this.canvas.style.width = this.displayWidth + 'px';
    this.canvas.style.height = this.displayHeight + 'px';
    this.canvas.width = this.displayWidth * this.dpr;
    this.canvas.height = this.displayHeight * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  },

  clear() {
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);
    // Background
    this.ctx.fillStyle = '#fafafa';
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
    // Subtle grid
    this.ctx.strokeStyle = '#f0f0f0';
    this.ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = 0; x < this.displayWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.displayHeight);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.displayHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.displayWidth, y);
      this.ctx.stroke();
    }
  },

  // Draw silhouette guide (scaled from 200x200 to canvas)
  drawSilhouette(level, iouValue) {
    const sw = this.displayWidth;
    const sh = this.displayHeight;
    const scaleX = sw / 200;
    const scaleY = sh / 200;

    // Center the silhouette area in the right half of canvas
    const offsetX = sw * 0.55;
    const offsetY = sh * 0.08;

    const silhouette = level.silhouette;

    for (const poly of silhouette) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        offsetX + poly[0].x * scaleX * 0.4,
        offsetY + poly[0].y * scaleY * 0.85
      );
      for (let i = 1; i < poly.length; i++) {
        this.ctx.lineTo(
          offsetX + poly[i].x * scaleX * 0.4,
          offsetY + poly[i].y * scaleY * 0.85
        );
      }
      this.ctx.closePath();

      // Fill color based on IoU
      if (iouValue !== undefined && iouValue >= 0.85) {
        this.ctx.fillStyle = 'rgba(126, 203, 118, 0.3)';
        this.ctx.strokeStyle = '#7ecb76';
      } else {
        this.ctx.fillStyle = 'rgba(161, 140, 209, 0.15)';
        this.ctx.strokeStyle = 'rgba(161, 140, 209, 0.5)';
      }
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([6, 4]);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // Category label
    this.ctx.fillStyle = '#a18cd1';
    this.ctx.font = 'bold 14px "Segoe UI", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      `🎯 ${level.name} (${level.category})`,
      offsetX + 40 * scaleX * 0.4,
      offsetY - 12
    );
    this.ctx.textAlign = 'start';
  },

  // Draw all pieces
  drawPieces(pieces) {
    // Sort by z-order (selected piece last = on top)
    const sorted = [...pieces].sort((a, b) => {
      if (a.selected) return 1;
      if (b.selected) return -1;
      return 0;
    });

    for (const piece of sorted) {
      this.drawPiece(piece);
    }
  },

  // Draw a single piece
  drawPiece(piece) {
    const tv = getTransformedVertices(piece);
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(tv[0].x, tv[0].y);
    for (let i = 1; i < tv.length; i++) {
      ctx.lineTo(tv[i].x, tv[i].y);
    }
    ctx.closePath();

    // Fill
    ctx.fillStyle = piece.color;
    ctx.fill();

    // Outline
    ctx.strokeStyle = piece.selected ? '#333' : 'rgba(0,0,0,0.2)';
    ctx.lineWidth = piece.selected ? 2.5 : 1.5;
    ctx.stroke();

    // Selection glow
    if (piece.selected) {
      ctx.shadowColor = piece.color;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = piece.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  },

  // Show IoU result overlay
  drawDebugInfo(iou, pieces) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(8, 8, 160, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(`IoU: ${(iou * 100).toFixed(1)}%`, 16, 28);
    ctx.fillText(`Pieces: ${pieces.length}`, 16, 44);
  },

  // Show placement hint area
  drawPlacementHint() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(161, 140, 209, 0.08)';
    const x = this.displayWidth * 0.05;
    const y = this.displayHeight * 0.05;
    const w = this.displayWidth * 0.48;
    const h = this.displayHeight * 0.9;
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = '#d5c8ef';
    ctx.font = '13px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👆 여기에 조각을 배치하세요', x + w/2, y + h/2);
    ctx.textAlign = 'start';
  }
};
