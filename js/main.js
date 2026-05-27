document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links li');
  const mainContent = document.querySelector('.main-content');
  const sections = document.querySelectorAll('.section');

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el && mainContent) {
      const top = el.offsetTop - mainContent.offsetTop;
      mainContent.scrollTo({ top, behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.target;
      if (target) {
        scrollToSection(target);
      }
    });
  });

  function updateActiveNav() {
    let currentId = '';
    const scrollTop = mainContent.scrollTop;
    const offset = 80;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      if (scrollTop >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === currentId);
    });
  }

  mainContent.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  document.querySelector('.nav-logo')?.addEventListener('click', () => {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Game card click -> show embed
  const GAMES = {
    golgol: { embed: 'https://itch.io/embed-upload/17035372?color=333333', portrait: false },
    pumpumkin: { embed: 'https://itch.io/embed-upload/17699633?color=333333', portrait: true }
  };
  const gameCards = document.querySelectorAll('.game-card');
  const gameIframe = document.getElementById('gameIframe');
  const gameEmbed = document.querySelector('.game-embed');
  const gameCardGrid = document.getElementById('gameCardGrid');
  const gamePlayArea = document.getElementById('gamePlayArea');
  const gameBackBtn = document.getElementById('gameBackBtn');

  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.game;
      const game = GAMES[key];
      if (game) {
        gameIframe.src = game.embed;
        gameEmbed.classList.toggle('game-embed--portrait', game.portrait);
      }
      gameCardGrid.style.display = 'none';
      gamePlayArea.style.display = 'block';
      updateSidebarActive(key);
    });
  });

  gameBackBtn?.addEventListener('click', () => {
    gamePlayArea.style.display = 'none';
    gameCardGrid.style.display = '';
  });

  function updateSidebarActive(game) {
    document.querySelectorAll('.sidebar-item[data-game]').forEach(item => {
      item.classList.toggle('active', item.dataset.game === game);
    });
  }
});
