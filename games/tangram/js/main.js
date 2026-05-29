// ============================================================
// main.js — Game state, loop, and orchestration
// ============================================================

const Game = {
  pieces: [],
  currentLevelIndex: 0,
  phase: 'idle',        // idle | playing | checking | ended
  pendingIou: null,     // IoU result after check
  animFrameId: null,

  // ── Init ──
  init() {
    Validation.init();
    Renderer.init('game-canvas');
    this.pieces = initPieces();
    Interaction.init(this.pieces, () => this.requestRender());
    Interaction.bindEvents();
    Scoring.reset();

    // Bind buttons
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
    document.getElementById('btn-check').addEventListener('click', () => this.checkAnswer());
    document.getElementById('btn-next').addEventListener('click', () => this.nextLevel());
    document.getElementById('btn-restart-go').addEventListener('click', () => this.restartGame());
    document.getElementById('btn-play-again').addEventListener('click', () => this.restartGame());

    // Handle window resize
    window.addEventListener('resize', () => {
      Renderer.resize();
      this.requestRender();
    });

    // Show start screen
    Screens.show('start');
  },

  // ── Game Flow ──
  startGame() {
    this.currentLevelIndex = 0;
    Scoring.reset();
    this.loadLevel(0);
    Screens.show('play');
  },

  loadLevel(index) {
    this.currentLevelIndex = index;
    const level = LEVELS[index];
    this.phase = 'playing';
    this.pendingIou = null;

    // Reset pieces to default positions
    this.pieces = initPieces();
    Interaction.init(this.pieces, () => this.requestRender());
    Interaction.selectedPiece = null;

    // Update HUD
    document.getElementById('hud-level').textContent = level.id;
    document.getElementById('hud-score').textContent = Scoring.totalScore;
    document.getElementById('hud-timer').textContent = level.timeLimit;
    document.getElementById('hud-match').textContent = '일치도 --%';

    // Start timer
    Timer.start(level.timeLimit,
      (timeLeft) => this.onTimerTick(timeLeft),
      () => this.onTimerExpire()
    );

    this.requestRender();
  },

  onTimerTick(timeLeft) {
    const hudTimer = document.getElementById('hud-timer');
    hudTimer.textContent = timeLeft;

    // Color change when low
    if (Timer.isLow()) {
      hudTimer.style.color = '#ff6b6b';
      hudTimer.style.fontWeight = '800';
    } else {
      hudTimer.style.color = '';
      hudTimer.style.fontWeight = '';
    }
  },

  onTimerExpire() {
    if (this.phase !== 'playing') return;
    this.phase = 'ended';

    // Show game over
    document.getElementById('gameover-level').textContent = LEVELS[this.currentLevelIndex].id;
    document.getElementById('gameover-score').textContent = Scoring.totalScore + '점';
    Screens.show('gameover');
  },

  // ── Answer Check ──
  checkAnswer() {
    if (this.phase !== 'playing') return;
    this.phase = 'checking';
    Timer.stop();

    const level = LEVELS[this.currentLevelIndex];
    const iou = Validation.calculate(
      this.pieces, level,
      Renderer.displayWidth, Renderer.displayHeight
    );

    this.pendingIou = iou;
    const matchPercent = Validation.formatPercent(iou);

    // Update HUD
    const hudMatch = document.getElementById('hud-match');
    hudMatch.textContent = `일치도 ${matchPercent}%`;

    if (Validation.isPassed(iou)) {
      hudMatch.style.background = 'linear-gradient(135deg, #7ecb76, #4caf50)';
      // Calculate score
      const levelScore = Scoring.recordLevel(
        level.id, level.baseScore, iou, Timer.getTimeLeft()
      );

      // Update HUD score
      document.getElementById('hud-score').textContent = Scoring.totalScore;

      // Show level clear screen
      setTimeout(() => {
        document.getElementById('clear-iou').textContent = matchPercent + '%';
        document.getElementById('clear-score').textContent = '+' + levelScore;
        document.getElementById('clear-time').textContent = Timer.getTimeLeft() + '초';

        if (this.currentLevelIndex >= LEVELS.length - 1) {
          // Final level → ending screen
          document.getElementById('ending-total').textContent = Scoring.totalScore + '점';
          Screens.show('ending');
        } else {
          Screens.show('clear');
        }
        this.phase = 'idle';
      }, 600);
    } else {
      hudMatch.style.background = 'linear-gradient(135deg, #ff6b6b, #e74c3c)';

      // Failed - resume playing
      setTimeout(() => {
        // Restart timer from where it was
        const remainingTime = Timer.getTimeLeft();
        if (remainingTime <= 0) {
          this.onTimerExpire();
        } else {
          this.phase = 'playing';
          Timer.start(remainingTime,
            (tl) => this.onTimerTick(tl),
            () => this.onTimerExpire()
          );
        }
      }, 1200);
    }

    this.requestRender();
  },

  nextLevel() {
    if (Screens.isTransitioning()) return;
    const next = this.currentLevelIndex + 1;
    if (next < LEVELS.length) {
      this.loadLevel(next);
      Screens.show('play');
    }
  },

  restartGame() {
    if (Screens.isTransitioning()) return;
    Timer.stop();
    this.startGame();
  },

  // ── Render Loop ──
  requestRender() {
    if (!this.animFrameId) {
      this.animFrameId = requestAnimationFrame(() => this.render());
    }
  },

  render() {
    this.animFrameId = null;
    Renderer.clear();
    Renderer.drawPlacementHint();

    const level = LEVELS[this.currentLevelIndex];
    Renderer.drawSilhouette(level, this.pendingIou);
    Renderer.drawPieces(this.pieces);

    // Debug info if IoU was calculated
    if (this.pendingIou !== null) {
      Renderer.drawDebugInfo(this.pendingIou, this.pieces);
    }
  }
};

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
  // Delay initial render to ensure CSS layout is settled
  setTimeout(() => {
    Renderer.resize();
    Game.requestRender();
  }, 100);
});
