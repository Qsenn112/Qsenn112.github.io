// ============================================================
// scoring.js — Score calculation
// ============================================================

const TIME_WEIGHT = 5;  // points per second remaining

const Scoring = {
  totalScore: 0,
  levelScores: [],

  reset() {
    this.totalScore = 0;
    this.levelScores = [];
  },

  // levelScore = baseScore × IoU + max(0, timeLeft) × timeWeight
  calculateLevelScore(baseScore, iou, timeLeft) {
    const basePart = baseScore * iou;
    const timeBonus = Math.max(0, timeLeft) * TIME_WEIGHT;
    return Math.round(basePart + timeBonus);
  },

  recordLevel(levelId, baseScore, iou, timeLeft) {
    const score = this.calculateLevelScore(baseScore, iou, timeLeft);
    this.levelScores.push({ levelId, score, iou });
    this.totalScore += score;
    return score;
  },

  getTotalScore() {
    return this.totalScore;
  }
};
