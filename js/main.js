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
    if (gamePlayArea) gamePlayArea.style.display = 'none';
    if (gameCardGrid) gameCardGrid.style.display = '';
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Game card click -> show embed
  const GAMES = {
    golgol: {
      embed: 'https://itch.io/embed-upload/17035372?color=333333',
      portrait: false,
      info: `<h3 class="info-game-title">GolGol</h3>
<p class="info-synopsis">간단한 2D 클리커 게임. 탭하여 플레이하세요.</p>
<div class="info-section">
  <h4>기술 스택</h4>
  <div class="info-badges">
    <span class="badge">Unity</span><span class="badge">C#</span><span class="badge">2D</span>
  </div>
</div>`
    },
    pumpumkin: {
      embed: 'https://itch.io/embed-upload/17699633?color=333333',
      portrait: true,
      info: `<h3 class="info-game-title">Pumpumkin</h3>
<p class="info-synopsis">할로윈 밤, 마법의 호박밭에서 시작된 클리커 모험. 호박을 클릭하여 사탕을 수집하고, 사탕으로 업그레이드를 구매하여 25단계의 호박을 진화시키는 게임입니다.</p>
<div class="info-section">
  <h4>게임 플로우</h4>
  <div class="info-flow">
    <span class="flow-step">호박 클릭</span><span class="flow-arrow">→</span>
    <span class="flow-step">사탕 획득</span><span class="flow-arrow">→</span>
    <span class="flow-step">업그레이드 구매</span><span class="flow-arrow">→</span>
    <span class="flow-step">호박 진화</span><span class="flow-arrow">→</span>
    <span class="flow-step">반복 (25단계)</span>
  </div>
</div>
<div class="info-grid">
  <div class="info-section">
    <h4>호박 진화</h4>
    <p>25단계 / 5등급 — Normal → Rare → Epic → Legendary → Mythic (황금 호박)</p>
  </div>
  <div class="info-section">
    <h4>업그레이드</h4>
    <p>클릭강화 / 자동수집 / 크리티컬 / 광폭모드 — 지수적 비용 증가 곡선</p>
  </div>
  <div class="info-section">
    <h4>이벤트</h4>
    <p>랜덤 황금 호박 (10배 보너스) + 귀신 스폰 탭 이벤트</p>
  </div>
  <div class="info-section">
    <h4>사탕 시스템</h4>
    <p>6종 진화 (107개 스프라이트) — 클릭강화 레벨에 따라 사탕 외형 변화</p>
  </div>
</div>
<div class="info-section">
  <h4>기술 스택</h4>
  <div class="info-badges">
    <span class="badge">Unity 6000</span><span class="badge">C#</span><span class="badge">DI Container</span><span class="badge">EventBus</span><span class="badge">Excel ↔ SO</span><span class="badge">Object Pooling</span><span class="badge">WebGL</span><span class="badge">URP</span>
  </div>
</div>`
    }
  };
  const gameCards = document.querySelectorAll('.game-card');
  const gameIframe = document.getElementById('gameIframe');
  const gameEmbed = document.querySelector('.game-embed');
  const gameCardGrid = document.getElementById('gameCardGrid');
  const gamePlayArea = document.getElementById('gamePlayArea');
  const gameBackBtn = document.getElementById('gameBackBtn');
  const gameInfo = document.getElementById('gameInfo');

  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.game;
      const game = GAMES[key];
      if (game) {
        gameIframe.src = game.embed;
        gameEmbed.classList.toggle('game-embed--portrait', game.portrait);
        if (gameInfo) gameInfo.innerHTML = game.info;
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
