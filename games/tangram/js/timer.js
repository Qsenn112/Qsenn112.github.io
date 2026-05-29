// ============================================================
// timer.js — Countdown timer system
// ============================================================

const Timer = {
  timeLeft: 0,
  timeLimit: 0,
  intervalId: null,
  onTick: null,
  onExpire: null,

  start(seconds, onTickCb, onExpireCb) {
    this.stop();
    this.timeLimit = seconds;
    this.timeLeft = seconds;
    this.onTick = onTickCb;
    this.onExpire = onExpireCb;

    if (this.onTick) this.onTick(this.timeLeft);

    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.onTick) this.onTick(this.timeLeft);
      if (this.timeLeft <= 0) {
        this.stop();
        if (this.onExpire) this.onExpire();
      }
    }, 1000);
  },

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  getElapsed() {
    return this.timeLimit - Math.max(0, this.timeLeft);
  },

  getTimeLeft() {
    return Math.max(0, this.timeLeft);
  },

  isLow() {
    return this.timeLeft <= this.timeLimit * 0.3;
  }
};
