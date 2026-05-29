// ============================================================
// interaction.js — Mouse drag, click selection, R key rotation
// ============================================================

const Interaction = {
  pieces: null,
  selectedPiece: null,
  isDragging: false,
  dragOffsetX: 0,
  dragOffsetY: 0,
  onStateChange: null,

  init(piecesRef, onChangeCb) {
    this.pieces = piecesRef;
    this.onStateChange = onChangeCb;
  },

  // Find which piece is under the cursor using isPointInPath
  hitTest(mx, my) {
    // Check in reverse order (top piece first)
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const piece = this.pieces[i];
      const tv = getTransformedVertices(piece);
      // Build path and test
      const ctx = Renderer.ctx;
      ctx.beginPath();
      ctx.moveTo(tv[0].x, tv[0].y);
      for (let j = 1; j < tv.length; j++) {
        ctx.lineTo(tv[j].x, tv[j].y);
      }
      ctx.closePath();
      if (ctx.isPointInPath(mx, my)) {
        return piece;
      }
    }
    return null;
  },

  selectPiece(piece) {
    if (this.selectedPiece && this.selectedPiece !== piece) {
      this.selectedPiece.selected = false;
    }
    if (piece) {
      piece.selected = true;
      this.selectedPiece = piece;
      // Move to top: remove and push
      const idx = this.pieces.indexOf(piece);
      if (idx >= 0) {
        this.pieces.splice(idx, 1);
        this.pieces.push(piece);
      }
    } else {
      this.selectedPiece = null;
    }
    if (this.onStateChange) this.onStateChange();
  },

  handleMouseDown(e) {
    const rect = Renderer.canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (Renderer.displayWidth / rect.width);
    const my = (e.clientY - rect.top) * (Renderer.displayHeight / rect.height);

    const hit = this.hitTest(mx, my);
    if (hit) {
      this.isDragging = true;
      this.dragOffsetX = mx - hit.x;
      this.dragOffsetY = my - hit.y;
      this.selectPiece(hit);
    } else {
      this.selectPiece(null);
    }
  },

  handleMouseMove(e) {
    if (!this.isDragging || !this.selectedPiece) return;

    const rect = Renderer.canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (Renderer.displayWidth / rect.width);
    const my = (e.clientY - rect.top) * (Renderer.displayHeight / rect.height);

    this.selectedPiece.x = mx - this.dragOffsetX;
    this.selectedPiece.y = my - this.dragOffsetY;
    if (this.onStateChange) this.onStateChange();
  },

  handleMouseUp(e) {
    this.isDragging = false;
    if (this.onStateChange) this.onStateChange();
  },

  handleKeyDown(e) {
    if (e.key === 'r' || e.key === 'R') {
      if (this.selectedPiece) {
        this.selectedPiece.rotation += 15;
        if (this.onStateChange) this.onStateChange();
      }
    }
  },

  // Bind events to canvas
  bindEvents() {
    const canvas = Renderer.canvas;
    canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    canvas.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }
};
