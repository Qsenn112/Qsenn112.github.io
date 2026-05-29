// ============================================================
// screens.js — Screen transition management
// ============================================================

const Screens = {
  currentScreen: null,
  transitioning: false,

  // All screen IDs
  ids: ['start', 'play', 'clear', 'gameover', 'ending'],

  show(screenId) {
    if (this.transitioning) return;
    this.transitioning = true;

    // Hide all screens
    for (const id of this.ids) {
      const el = document.getElementById('screen-' + id);
      if (el) el.classList.remove('active');
    }

    // Show target screen
    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
    }
    this.currentScreen = screenId;

    // Allow transitions after animation completes
    setTimeout(() => {
      this.transitioning = false;
    }, 350);
  },

  getCurrent() {
    return this.currentScreen;
  },

  isTransitioning() {
    return this.transitioning;
  }
};
