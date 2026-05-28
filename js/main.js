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

  // ===== PROJECT DATA =====
  const PROJECTS = {
    golgol: {
      thumb: 'G',
      thumbClass: 'thumb-golgol-lg',
      title: 'GolGol',
      subtitle: '2D · Story',
      desc: '간단한 2D 스토리 어드벤처 게임입니다. 탭하여 진행하는 인터랙티브 스토리를 경험할 수 있습니다.',
      flow: '스토리 시작 → 선택지 등장 → 탭으로 진행 → 엔딩 도달',
      tags: ['Unity', 'C#', '2D', 'Story'],
      features: [
        '탭 기반 인터랙티브 스토리 진행',
        '2D 스프라이트 애니메이션',
        '분기 선택지 시스템',
        '멀티플 엔딩'
      ],
      actions: [{ label: 'Go to Demo', class: 'btn-web', url: 'https://tpgns3353-ctrl.itch.io/golgol', external: true }]
    },
    pumpumkin: {
      thumb: 'P',
      thumbClass: 'thumb-pumpkin-lg',
      title: 'Pumpumkin',
      subtitle: '2D · Clicker',
      desc: '할로윈 밤, 마법의 호박밭에서 시작된 클리커 모험. 호박을 클릭하여 사탕을 수집하고, 사탕으로 업그레이드를 구매하여 25단계의 호박을 진화시키는 게임입니다.',
      flow: '호박 클릭 → 사탕 획득(+1) → 업그레이드 구매(4종) → 호박 진화(25단계) → 반복 / 랜덤 이벤트 발생 (황금 호박 10x / 광폭 모드 2x / 귀신 스폰)',
      tags: ['Unity 6000', 'C#', 'DI Container', 'EventBus', 'Excel ↔ SO', 'Object Pooling', 'WebGL', 'URP'],
      features: [
        '클릭 — 호박 클릭 시 사탕 획득 (클릭강화/크리티컬/광폭/황금 배율 중첩)',
        '업그레이드 — 클릭강화(레벨당+1), 자동수집(초당+1), 크리티컬(+5%확률,2배), 광폭모드(30초x2)',
        '진화 — 25단계·5등급 순차 진화 (Normal→Rare→Epic→Legendary→Mythic), 0→10M 사탕 누적',
        '사탕 — 107종 스프라이트, 클릭강화 레벨에 따라 6단계 진화 (10레벨당 다른 스프라이트)',
        '랜덤 — 황금 호박(10배 보너스), 광폭 모드(30초 랜덤 발동), 귀신(3패턴 이동·탭 보상)'
      ],
      extraSections: [
        {
          label: '핵심 아키텍처',
          items: [
            'Singleton — GameManager.Instance로 전체 게임 상태 관리·DontDestroyOnLoad',
            'DI Container — DIContainer + [Inject] 속성, 8개 코어 컴포넌트 생성·주입, Scene/Global 이중 구조',
            'EventBus — static EventBus&lt;T&gt; + readonly struct, Game↔UI 레이어 분리, GC 제로, IDisposable 자동 해제',
            '통신 원칙 — Game→UI는 EventBus로만, UI→Game은 DI로 컴포넌트 직접 호출'
          ]
        },
        {
          label: '성능 최적화',
          items: [
            'Object Pooling — FloatingText 10개, CandyProjectile 10개+Trail 48개, UpgradePopupItem 5개 가상 스크롤',
            'readonly struct 이벤트 — 모든 이벤트 구조체화로 GC Allocation 0',
            '일괄 로드 — 107개 사탕 스프라이트 Resources.LoadAll 한 번에',
            '원자적 저장 — JSON 세이브 tmp→bak 방식 (손상 방지)',
            '가상 스크롤 — 업그레이드 팝업 5개 항목만 실존, 102레벨 대응'
          ]
        },
        {
          label: '게임 기능',
          items: [
            '피드백 이펙트 — 숫자 팝업, 사탕 발사체 궤적, 호박 클릭 애니메이션',
            '진화 이펙트 — 등급별 파티클·화면 플래시·흔들림 (Normal↔Mythic 강도차별)',
            '황금 호박 — 랜덤 등장, 금색 펄스 이펙트, 클릭 시 10배 보상',
            '귀신 이벤트 — 3패턴(직선/사인/랜덤) 이동, 탭 시 사탕 보상',
            '자동 저장 — 백그라운드 진입·종료 시 JSON 저장',
            '배경 영상 — VideoPlayer + RawImage (Material Override, WebGL 호환)',
            '반응형 UI — Canvas Scaler Shrink, 모바일 세로(1080×1920) 기준'
          ]
        }
      ],
      actions: [{ label: 'Go to Demo', class: 'btn-web', url: 'https://tpgns3353-ctrl.itch.io/pumpumkin', external: true }]
    },
    todolist: {
      thumb: 'T',
      thumbClass: 'thumb-todo-lg',
      title: 'Todo List',
      subtitle: 'App · Tauri · Web',
      desc: '할 일을 관리하는 앱입니다. 추가, 수정, 삭제, 완료 체크 기능과 카테고리/우선순위 분류, 필터링을 지원합니다. 웹 버전과 Android 앱으로 사용 가능합니다.',
      flow: '할 일 입력 → 카테고리/우선순위 선택 → 추가 → 완료 토글 → 수정/삭제 → 필터로 조회',
      tags: ['Vanilla HTML/CSS/JS', 'Tauri v2 + Rust', 'LocalStorage', '반응형 + 다크모드', 'GitHub Pages'],
      features: [
        '할 일 CRUD — 추가, 모달 수정, 즉시 삭제',
        '완료 체크 — 체크박스 토글 시 취소선 표시',
        '카테고리 분류 — 일반/업무/개인/쇼핑/학습 태그',
        '우선순위 설정 — 낮음/보통/높음 색상 태그로 시각 구분',
        '필터링 — 카테고리, 우선순위, 상태 조합 필터',
        '통계 — 전체/완료/진행중 개수 실시간 표시'
      ],
      actions: [
        { label: '웹으로 방문', class: 'btn-web', url: '/todo/', external: true },
        { label: '앱 다운로드 (APK)', class: 'btn-apk', url: '/todo/todo-list.apk', external: false, download: true }
      ]
    }
  };

  function buildDetailHTML(project) {
    let actionsHTML = project.actions.map(a => {
      if (a.download) {
        return '<a href="' + a.url + '" download class="detail-btn ' + a.class + '">' + a.label + '</a>';
      }
      const target = a.external ? ' target="_blank"' : '';
      return '<a href="' + a.url + '"' + target + ' class="detail-btn ' + a.class + '">' + a.label + '</a>';
    }).join('');

    let featuresHTML = project.features.map(f => '<li>' + f + '</li>').join('');
    let tagsHTML = project.tags.map(t => '<span class="detail-tag">' + t + '</span>').join('');

    let extraHTML = '';
    if (project.extraSections) {
      project.extraSections.forEach(function(section) {
        let itemsHTML = section.items.map(function(item) { return '<li>' + item + '</li>'; }).join('');
        extraHTML += '<div class="detail-section">' +
          '<h4 class="detail-label">' + section.label + '</h4>' +
          '<ul class="detail-list">' + itemsHTML + '</ul>' +
        '</div>';
      });
    }

    return '<div class="detail-header">' +
      '<div class="detail-thumb ' + project.thumbClass + '">' + project.thumb + '</div>' +
      '<div class="detail-title-area">' +
        '<h2 class="detail-title">' + project.title + '</h2>' +
        '<p class="detail-subtitle">' + project.subtitle + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="detail-body">' +
      '<div class="detail-section">' +
        '<h4 class="detail-label">설명</h4>' +
        '<p class="detail-text">' + project.desc + '</p>' +
      '</div>' +
      '<div class="detail-section">' +
        '<h4 class="detail-label">플로우</h4>' +
        '<p class="detail-text">' + project.flow + '</p>' +
      '</div>' +
      '<div class="detail-section">' +
        '<h4 class="detail-label">사용 기술</h4>' +
        '<div class="detail-tags">' + tagsHTML + '</div>' +
      '</div>' +
      '<div class="detail-section">' +
        '<h4 class="detail-label">주요 기능</h4>' +
        '<ul class="detail-list">' + featuresHTML + '</ul>' +
      '</div>' +
      extraHTML +
    '</div>' +
    '<div class="detail-actions">' + actionsHTML + '</div>';
  }

  // ===== GAME SECTION =====
  const gameCards = document.querySelectorAll('.game-card');
  const gameCardGrid = document.getElementById('gameCardGrid');
  const gameDetailArea = document.getElementById('gameDetailArea');
  const gameDetailContent = document.getElementById('gameDetailContent');
  const gameDetailBackBtn = document.getElementById('gameDetailBackBtn');
  const gamePlayArea = document.getElementById('gamePlayArea');
  const gamePlayBackBtn = document.getElementById('gamePlayBackBtn');
  const gameIframe = document.getElementById('gameIframe');
  const gameEmbedWrapper = document.getElementById('gameEmbedWrapper');

  const GAME_EMBEDS = {
    golgol: { src: 'https://itch.io/embed-upload/17035372?color=333333', portrait: false },
    pumpumkin: { src: 'https://itch.io/embed-upload/17699633?color=333333', portrait: true }
  };

  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.game;
      const project = PROJECTS[key];
      if (!project) return;

      gameDetailContent.innerHTML = buildDetailHTML(project);

      const demoBtn = gameDetailContent.querySelector('.btn-web');
      if (demoBtn && GAME_EMBEDS[key]) {
        const embed = GAME_EMBEDS[key];
        const newBtn = demoBtn.cloneNode(true);
        newBtn.addEventListener('click', (e) => {
          e.preventDefault();
          gameIframe.src = embed.src;
          gameEmbedWrapper.classList.toggle('game-embed--portrait', embed.portrait);
          gameDetailArea.style.display = 'none';
          gamePlayArea.style.display = 'block';
        });
        demoBtn.replaceWith(newBtn);
        newBtn.textContent = 'Go to Demo';
      }

      gameCardGrid.style.display = 'none';
      gameDetailArea.style.display = 'block';
      updateSidebarActive(key);
    });
  });

  gameDetailBackBtn?.addEventListener('click', () => {
    gameDetailArea.style.display = 'none';
    gameCardGrid.style.display = '';
  });

  gamePlayBackBtn?.addEventListener('click', () => {
    gamePlayArea.style.display = 'none';
    gameIframe.src = '';
    gameDetailArea.style.display = 'block';
  });

  // ===== PROJECTS SECTION =====
  const projectDetailCards = document.querySelectorAll('.project-detail-card');
  const projectCardGrid = document.getElementById('projectCardGrid');
  const projectDetailArea = document.getElementById('projectDetailArea');
  const projectDetailContent = document.getElementById('projectDetailContent');
  const projectBackBtn = document.getElementById('projectBackBtn');

  projectDetailCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const project = PROJECTS[key];
      if (!project) return;

      projectDetailContent.innerHTML = buildDetailHTML(project);
      projectCardGrid.style.display = 'none';
      projectDetailArea.style.display = 'block';
      updateSidebarActive(key);
    });
  });

  projectBackBtn?.addEventListener('click', () => {
    projectDetailArea.style.display = 'none';
    projectCardGrid.style.display = '';
  });

  // ===== COMMON =====
  function updateSidebarActive(game) {
    document.querySelectorAll('.sidebar-item[data-game]').forEach(item => {
      item.classList.toggle('active', item.dataset.game === game);
    });
  }

  document.querySelector('.nav-logo')?.addEventListener('click', () => {
    if (gamePlayArea) { gamePlayArea.style.display = 'none'; gameIframe.src = ''; }
    if (gameDetailArea) gameDetailArea.style.display = 'none';
    if (gameCardGrid) gameCardGrid.style.display = '';
    if (projectDetailArea) projectDetailArea.style.display = 'none';
    if (projectCardGrid) projectCardGrid.style.display = '';
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
