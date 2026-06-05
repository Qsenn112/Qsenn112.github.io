(function() {

  // ===== SIDEBAR NAVIGATION =====
  var categoryBtns = document.querySelectorAll('.nav-category-btn');
  var contentViews = document.querySelectorAll('.content-view');
  var activeCategory = 'project';
  var activeProject = null;

  function expandCategory(btn) {
    var subitems = btn.nextElementSibling;
    if (subitems && subitems.classList.contains('nav-subitems')) {
      subitems.classList.add('open');
      btn.classList.add('expanded');
    }
  }

  function collapseCategory(btn) {
    var subitems = btn.nextElementSibling;
    if (subitems && subitems.classList.contains('nav-subitems')) {
      subitems.classList.remove('open');
      btn.classList.remove('expanded');
    }
  }

  function setActiveCategory(category) {
    activeCategory = category;

    categoryBtns.forEach(function(btn) {
      var cat = btn.dataset.category;
      if (cat === category) {
        btn.classList.add('active');
        expandCategory(btn);
      } else {
        btn.classList.remove('active');
        collapseCategory(btn);
      }
    });

    var viewId = 'view-' + category;
    contentViews.forEach(function(view) {
      view.classList.toggle('active', view.id === viewId);
    });
  }

  function setActiveSubitem(key) {
    activeProject = key;
    document.querySelectorAll('.nav-subitem').forEach(function(item) {
      item.classList.toggle('active', item.dataset.project === key || item.dataset.research === key);
    });
  }

  categoryBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var category = btn.dataset.category;
      if (category === activeCategory) return;
      setActiveCategory(category);
    });
  });

  document.querySelector('.sidebar-header').addEventListener('click', function() {
    setActiveCategory('project');
    setActiveSubitem(null);
    document.querySelectorAll('.nav-subitem').forEach(function(item) {
      item.classList.remove('active');
    });
    hideDetailPanel();
    hideResearchDetail();
    var mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== PROJECT DATA =====
  var PROJECTS = {
    ovumrumble: {
      thumb: 'O',
      thumbClass: 'thumb-ovum-lg',
      title: 'Ovum-Rumble',
      subtitle: '3D 턴제 물리 보드게임 \\u00b7 Unity \\u00b7 URP \\u00b7 Mirror',
      desc: '공룡 알을 드래그해서 튕기고, 상대방의 알을 보드 밖으로 밀어내는 3D 턴제 물리 보드게임. 1~2인 플레이(핫시트/AI/VPS 릴레이 네트워크) 지원.\\\\n\\\\nCore → Rules → Presentation 단방향 계층, GameEvents 정적 이벤트 버스로 결합도 최소화. FeatureFlags ScriptableObject로 폭탄/바람/지진/공룡NPC/HP/4인 등 확장 On/Off.',
      flow: 'Setup → Aiming → Resolving → CheckingResult → Result',
      tags: ['Unity', 'C#', 'URP', 'Mirror', '턴제', '물리', '멀티플레이어', 'AI'],
      features: [
        '플릭(드래그) 조작 — 알을 클릭→드래그→놓기로 방향/힘 제어, 궤적 시각화',
        '턴제 시스템 — TurnController가 P1↔P2 교대 진행, 발사 중 입력 잠금',
        '물리 시뮬레이션 — MotionResolver가 알 정지 감시, fixedDeltaTime 조절로 2.5배속 처리',
        'AI 대전 — KNOCKOUT/NUDGE/DEFENSE/SETUP 4단계 전략, 지형 분석 포함',
        '멀티플레이어 — VPS 릴레이 네트워크 (룸 코드 생성/입력), 상태 동기화',
        '맵 시스템 — IBoardSurface 인터페이스로 다양한 지형 지원, StaticBoardLoader 로드',
        '확장 모듈 — FeatureFlags로 폭탄/바람/지진/공룡NPC/HP/4인 등 On/Off'
      ],
      actions: [
        { label: '플레이하기', class: 'btn-play', url: 'https://qsenn112.github.io/ovum-rumble-webgl/', external: true },
        { label: 'GitHub', class: 'btn-web', url: 'https://github.com/BomB1961/Ovum-Rumble', external: true }
      ]
    },

    jumprace: {
      thumb: 'J',
      thumbClass: 'thumb-jump-lg',
      thumbImage: 'images/jump-racing-thumbnail.jpeg',
      title: '2D \uc810\ud504 \ub808\uc774\uc2f1',
      subtitle: '2D \u00b7 Arcade \u00b7 Godot',
      desc: '\uc2a4\ud398\uc774\uc2a4\ubc14\ub85c \uc810\ud504\ud558\ub294 2D \ub808\uc774\uc2f1 \uac8c\uc784. \uc7a5\uc560\ubb3c \ud68c\ud53c \ubc0f \ucf64\ubcf4 \uc810\uc218 \uc2dc\uc2a4\ud15c \uad6c\ud604.',
      flow: '\uac8c\uc784 \uc2dc\uc791 \u2192 \uc790\ub3d9 \uc804\uc9c4 \u2192 \uc2a4\ud398\uc774\uc2a4\ubc14 \uc810\ud504 \u2192 \uc7a5\uc560\ubb3c \ud68c\ud53c \u2192 \ucf64\ubcf4 \uc810\uc218 \u2192 \uac8c\uc784 \uc624\ubc84',
      tags: ['Godot', 'GDScript', '2D', 'Arcade'],
      features: [
        '\uc6d0\ud130\uce58 \uc870\uc791 \u2014 \uc2a4\ud398\uc774\uc2a4\ubc14/\ud130\uce58 \ud55c \ubc88\uc73c\ub85c \uc810\ud504',
        '\uc7a5\uc560\ubb3c \u2014 \ub098\ubb34, \ubc14\uc704, \uad6c\ub369\uc774 \ub4f1 \ub2e4\uc591\ud55c \ud328\ud134',
        '\ucf64\ubcf4 \uc2dc\uc2a4\ud15c \u2014 \uc5f0\uc18d \uc7a5\uc560\ubb3c \ud68c\ud53c \uc2dc \uc810\uc218 \ubc30\uc728 \uc0c1\uc2b9',
        '\uc810\uc218\ud310 \u2014 \ub85c\uceec \ucd5c\uace0 \uc810\uc218 \uc800\uc7a5'
      ],
      actions: [{ label: '\ud50c\ub808\uc774\ud558\uae30', class: 'btn-web', url: '#', external: false }]
    },
    spaceshooter: {
      thumb: '\ud83d\ude80',
      thumbClass: 'thumb-space-lg',
      title: 'Space Shooter',
      subtitle: '2D \u00b7 Top-View \u00b7 Shoot\'em Up \u00b7 Web',
      desc: '\ub4dc\ub798\uace4 \ud50c\ub77c\uc774\ud2b8 \uc2a4\ud0c0\uc77c\uc758 \ud0d1\ubdf0 2D \uc6b0\uc8fc\uc120 \uc288\ud305 \uac8c\uc784. \ub124\uc628 \uae00\ub85c\uc6b0 \uc2e0\uc2a4\uc6e8\uc774\ube0c \ube44\uc8fc\uc5bc, 4\uc885 \uc6b0\uc8fc\uc120 \uc120\ud0dd, \uc6e8\uc774\ube0c \uae30\ubc18 \ubcf4\uc2a4\uc804, \ub8e8\uc988\ub77c\uc774\ud06c \uc5c5\uadf8\ub808\uc774\ub4dc \uc2dc\uc2a4\ud15c.',
      flow: '\uc6b0\uc8fc\uc120 \uc120\ud0dd(4\uc885) \u2192 \uc790\ub3d9 \uc804\uc9c4 + \uc88c\uc6b0 \uc774\ub3d9 \u2192 \uc624\ud1a0\uc0f7 \u2192 \uc801\u00b7\uc6b4\uc11d\u00b7\ubcf4\uc2a4 \ucc98\uce58 \u2192 \uc6e8\uc774\ube0c \ud074\ub9ac\uc5b4 \u2192 \uc5c5\uadf8\ub808\uc774\ub4dc \uc120\ud0dd(3\uc9c0\uc120\ub2e4) \u2192 \ub2e4\uc74c \uc6e8\uc774\ube0c',
      tags: ['JavaScript', 'HTML5 Canvas', 'Web Game', 'E2E Tested'],
      features: [
        '4\uc885 \uc6b0\uc8fc\uc120 \u2014 \ubc38\ub7f0\uc2a4/\uacf5\uaca9/\uc18d\ub3c4/\ubc29\uc5b4, \uac01\uac01 \ub124\uc628 \uae00\ub85c\uc6b0 \uc0c9\uc0c1\u00b7\uc2a4\ud0ef \ucc28\ubcc4\ud654',
        '\uc6e8\uc774\ube0c \uc2dc\uc2a4\ud15c \u2014 \ubb34\ud55c \uc6e8\uc774\ube0c, 5\uc2a4\ud14c\uc774\uc9c0\ub9c8\ub2e4 \ubcf4\uc2a4 \ub4f1\uc7a5 (HP\ubc14\u00b7\uc721\uac01\ud615 \ub514\uc790\uc778)',
        '\ub8e8\uc988\ub77c\uc774\ud06c \uc5c5\uadf8\ub808\uc774\ub4dc \u2014 \uc2a4\ud14c\uc774\uc9c0 \ud074\ub9ac\uc5b4 \ud6c4 8\uc885 \uc911 3\uc9c0\uc120\ub2e4 (ATK/\uc5f0\uc0ac/\uc18d\ub3c4/HP/\ud655\uc0b0\ud0c4/\uc2e4\ub4dc)',
        '\ub124\uc628 \uae00\ub85c\uc6b0 \u2014 3\ub808\uc774\uc5b4 \ud328\ub7f4\ub799\uc2a4 \ubcc4 \ubc30\uacbd, \uc2e0\uc2a4\uc6e8\uc774\ube0c \uc544\uc6c3\ub7f0 \ube44\uc8fc\uc5bc',
        '\ucda9\ub3cc \uac10\uc9c0 \u2014 AABB, \ud3f4\ub9ac\uace4 \ud06c\uae30\uc640 \ub3d9\uc77c\ud55c \uc815\ubc00 \ucda9\ub3cc \ubc15\uc2a4',
        'Playwright E2E \u2014 11\uac1c \ud14c\uc2a4\ud2b8\ub85c \uac8c\uc784 \ud50c\ub85c\uc6b0\u00b7\ucda9\ub3cc\u00b7\uc6e8\uc774\ube0c\u00b7\uc5c5\uadf8\ub808\uc774\ub4dc \uac80\uc99d'
      ],
      actions: [{ label: '\ud50c\ub808\uc774\ud558\uae30', class: 'btn-web', url: '#', external: false }]
    },
    golgol: {
      thumb: 'G',
      thumbClass: 'thumb-golgol-lg',
      title: 'GolGol',
      subtitle: '2D \u00b7 Story',
      desc: '2D \uc2a4\ud1a0\ub9ac \uc5b4\ub4dc\ubca4\ucc98 \uac8c\uc784. \ud50c\ub808\uc774\uc5b4\ub294 \uae30\uc5b5\uc744 \uc78a\uc740 \uc8fc\uc778\uacf5\uc774 \ub418\uc5b4 3\uac1c\uc758 \uc2a4\ud14c\uc774\uc9c0(\uc9c0\uc625\ub3c4\u00b7\uc778\uac04\ub3c4\u00b7\ucc9c\uc0c1\ub3c4)\ub97c \ud0d0\ud5d8\ud558\uace0, \uc804\ud22c\uc640 \uae30\uc5b5 \uc870\uac01 \uc218\uc9d1\uc744 \ud1b5\ud574 \uacfc\uac70\uc758 \uc9c4\uc2e4\uc744 \ubc1d\ud600\ub0b4\ub294 \uc2a4\ud1a0\ub9ac\uc785\ub2c8\ub2e4.',
      flow: '\uc2a4\ud14c\uc774\uc9c0 \uc9c4\uc785 \u2192 \ud0d0\ud5d8 (\uc774\ub3d9/\uc810\ud504/\ud68c\ud53c) \u2192 \uc804\ud22c (HellGuard) \u2192 \uae30\uc5b5 \uc870\uac01 \uc218\uc9d1 \u2192 \uc2a4\ud14c\uc774\uc9c0 \uc804\ud658 \u2192 \uc5d4\ub529',
      tags: ['Unity 6', 'C#', 'DI Container', 'EventBus', 'ScriptableObject', 'Excel \u2194 SO', 'Rigidbody2D', 'FSM'],
      features: [
        '\uc804\ud22c \u2014 HellGuard FSM (Idle\u2192Patrol\u2192Chase\u2192Attack\u2192Hurt\u2192Dead), OverlapCircleAll \ud788\ud2b8\ud310\uc815',
        '\uc774\ub3d9 \u2014 WASD + \uc810\ud504(Space) + \uc549\uae30(Ctrl), Rigidbody2D \uae30\ubc18',
        '\uae30\uc5b5 \uc870\uac01 \u2014 3D \ud50c\ub85c\ud305+\ud384\uc2a4 \uc774\ud399\ud2b8, TimeScale 0 \ud50c\ub798\uc2dc\ubc31 \uc5f0\ucd9c, HashSet \uc218\uc9d1 \ucd94\uc801',
        '\uc2a4\ud14c\uc774\uc9c0 \u2014 4\uac1c MVP \uc2a4\ud14c\uc774\uc9c0(\ubc08\ubb34\ub364/\uc9c0\uc625\ub3c4/\uc778\uac04\ub3c4/\ucc9c\uc0c1\ub3c4), Portal+Boundary \uc804\ud658',
        '\uc5d4\ub529 \u2014 4\ub2e8\uacc4 \uc2dc\ud000\uc2a4 (\uae30\uc5b5 \uc2ac\ub77c\uc774\ub4dc\u2192\uacc4\uc2dc\u2192\uc815\uccb4\uc131 \ub9c8\uc8fc\u2192\ub9c8\ubb34\ub9ac)'
      ],
      extraSections: [
        {
          label: '\uc544\ud0a4\ud14d\ucc98',
          items: [
            'PlayerController \uc624\ucf00\uc2a4\ud2b8\ub808\uc774\uc158 \u2014 Movement\u00b7Combat\u00b7Health\u00b7Animation 4\uac1c \ud558\uc704 \ucef4\ud3ec\ub10c\ud2b8 \uc870\uc728',
            'Interface \uacc4\uce35 \u2014 IDamageable, IEnemy, IGameService, IMemoryService, IData',
            'EventBus \u2014 14\uac1c \uc774\ubca4\ud2b8\ub85c \ucef4\ud3ec\ub10c\ud2b8 \uac04 \ub290\uc2a8\ud55c \uacb0\ud569, \ubc1c\ud589/\uad6c\ub3c5 \ud328\ud134',
            'DI Container \u2014 \uc778\ud504\ub77c \uad6c\ucd95, CameraFollow Resolve\uc5d0 \uc0ac\uc6a9',
            'Static Singleton \u2014 PlayerHealth, StageTransitionManager \ub4f1 \ud575\uc2ec \uac1d\uccb4'
          ]
        },
        {
          label: '\uc131\ub2a5 \ucd5c\uc801\ud654',
          items: [
            'StageActivator \u2014 \ube44\ud65c\uc131 \uc2a4\ud14c\uc774\uc9c0 GameObjects SetActive(false)\ub85c \ub809 \ubc29\uc9c0',
            'MemoryFragmentDataCache \u2014 Resources \ud3f4\ub354 \ube44\ub3d9\uae30 \ub85c\ub4dc',
            'Bootstrap \ubd80\ud2b8 \uc2dc\ud000\uc2a4 \u2014 Execution Order -1000, DontDestroyOnLoad \uc2f1\uae00\ud1a4'
          ]
        },
        {
          label: '\ub370\uc774\ud130 \uc2dc\uc2a4\ud15c',
          items: [
            'Excel (OleDb) \u2192 ScriptableObject (GameData.asset) \u2014 ExcelAutoConverter \uc790\ub3d9 \ubcc0\ud658',
            'StageData, EnemyData, PlayerData, MemoryFragmentData 4\uc885 \uc2dc\ud2b8',
            '\ub7f0\ud0c0\uc784 SO \uc5d0\uc14b \u2014 EnemyDataSO, MemoryFragmentDataSO, IntroStoryDataSO, EndingSlideDataSO'
          ]
        },
        {
          label: '\uc52c \uad6c\uc870',
          items: [
            'Boot (\uc9c4\uc785\uc810/\ubd84\uae30) \u2192 Intro (\uc778\ud2b8\ub85c) \u2192 MainMenuScene \u2192 Game (\uba54\uc778) \u2192 GameOver / Ending',
            'PlayerPrefs\ub85c \uccab \uc2e4\ud589 \uc5ec\ubd80 \ud655\uc778 \u2192 Intro \uc2a4\ud0b5'
          ]
        }
      ],
      retrospective: '<p>\ud574\ub2f9 \ud504\ub85c\uc81d\ud2b8\uc758 \ubc30\uacbd \uc774\ubbf8\uc9c0\uc640 \uae30\uc5b5\uc758 \uc870\uac01\uc740 AI\ub97c \ud65c\uc6a9\ud574 \uc81c\uc791\ud588\ub2e4. \uae30\uc5b5\uc758 \uc870\uac01\uc740 \ud070 \ubb38\uc81c \uc5c6\uc774 \uc81c\uc791\ud560 \uc218 \uc788\uc5c8\uc9c0\ub9cc, \ubc30\uacbd \uc774\ubbf8\uc9c0 \uc81c\uc791 \uacfc\uc815\uc5d0\uc11c\ub294 \uc2dc\ud589\ucc29\uc624\uac00 \ub9ce\uc558\ub2e4.</p>' +
        '<p>\uc6b0\uc120 ChatGPT\ub97c \ud65c\uc6a9\ud574 \uc6d0\ud558\ub294 \uc774\ubbf8\uc9c0 \uc2a4\ud0c0\uc77c\uc758 \ud504\ub86c\ud504\ud2b8\ub97c \uc81c\uc791\ud55c \ub4a4, Freepik\uc744 \ud1b5\ud574 \uc2e4\uc81c \uc774\ubbf8\uc9c0\ub97c \uc0dd\uc131\ud588\ub2e4. \uc5d0\uc14b \uc81c\uc791 \uacfc\uc815 \uc790\uccb4\ub294 \uc774\uc804 \ud504\ub85c\uc81d\ud2b8\uc778 "Pumpumkin"\uc758 \uc6cc\ud06c\ud50c\ub85c\uc6b0\uc640 \ube44\uc2b7\ud588\uc9c0\ub9cc, \uac00\uc7a5 \ud070 \ucc28\uc774\uc810\uc740 DownScale \uc791\uc5c5\uc774 \ud544\uc694\ud588\ub2e4\ub294 \uc810\uc774\ub2e4.</p>' +
        '<p>AI\ub85c \uc0dd\uc131\ub41c \uc774\ubbf8\uc9c0\ub4e4\uc740 \ud06c\uae30\uac00 \uc77c\uc815\ud558\uc9c0 \uc54a\uc558\uae30 \ub54c\ubb38\uc5d0, Unity \ud504\ub85c\uc81d\ud2b8\uc5d0\uc11c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574 \uc6d0\ud558\ub294 \ud574\uc0c1\ub3c4\uc778 1920x1080\uc73c\ub85c \uac15\uc81c \ub2e4\uc6b4\uc2a4\ucf00\uc77c \uc791\uc5c5\uc744 \uc9c4\ud589\ud588\ub2e4. UI \ubc84\ud2bc \uc5ed\uc2dc \uc6d0\ud558\ub294 \uc2a4\ud0c0\uc77c\uc758 \uae30\uc900 \uc774\ubbf8\uc9c0\ub97c \uba3c\uc800 \uc81c\uc791\ud55c \ub4a4, Google Flow\ub97c \ud65c\uc6a9\ud574 \ub3d9\uc77c\ud55c \uc2a4\ud0c0\uc77c\uc758 \ubc84\ud2bc\ub4e4\uc744 \uc0dd\uc131\ud588\ub2e4.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">\uc560\ub2c8\uba54\uc774\uc158 \uc791\uc5c5</h5>' +
        '<p>\ud574\ub2f9 \ud504\ub85c\uc81d\ud2b8\uc5d0\uc11c \uac00\uc7a5 \uc5b4\ub824\uc6e0\ub358 \ubd80\ubd84\uc740 \uc560\ub2c8\uba54\uc774\uc158 \uc791\uc5c5\uc774\uc5c8\ub2e4. \ud3c9\uc18c \uace0\ubbfc\uc774\ub358 "\uc5d0\uc14b \uc2a4\ud0c0\uc77c \ud1b5\uc77c" \ubb38\uc81c\ub294 AI\ub97c \ud65c\uc6a9\ud574 \uc5b4\ub290 \uc815\ub3c4 \ud574\uacb0\ud560 \uc218 \uc788\uc5c8\uc9c0\ub9cc, \uc560\ub2c8\uba54\uc774\uc158 \uc81c\uc791 \uacfc\uc815\uc5d0\uc11c \uc0c8\ub85c\uc6b4 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4.</p>' +
        '<p>\uc8fc\uc778\uacf5 "\uace8\uace8"\uc758 \uc5d0\uc14b\uc774 \ub0b4\uac00 \uad6c\uc0c1\ud588\ub358 \uc0ac\uc774\ub4dc\ubdf0\uc6a9\uc774 \uc544\ub2c8\ub77c \ud0d1\ubdf0\uc6a9 \uc2a4\ud504\ub77c\uc774\ud2b8 \uc2dc\ud2b8\ub85c \uc81c\uc791\ub41c \uac83\uc774\ub2e4. \ucc98\uc74c\uc5d0\ub294 AI\uc5d0\uac8c "\uc5d0\uc14b \uc548\uc758 \uc2a4\ud504\ub77c\uc774\ud2b8 \uc2dc\ud2b8\ub97c \uc798\ub77c \uc560\ub2c8\uba54\uc774\uc158\uae4c\uc9c0 \uc801\uc6a9\ub41c \uce90\ub9ad\ud130 \ub370\uc774\ud130\ub97c \ub9cc\ub4e4\uc5b4 \uc918"\uc640 \uac19\uc774 \uc694\uccad\ud588\uc9c0\ub9cc, \uacc4\uc18d\ud574\uc11c \ud0d1\ubdf0 \uc774\ubbf8\uc9c0 \ud55c \uc7a5\uc774 \uc0ac\uc774\uc5d0 \ucc38\uc870\ub418\ub294 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4.</p>' +
        '<p>\uacb0\uad6d \uc2a4\ud504\ub77c\uc774\ud2b8 \uc2dc\ud2b8 \ub0b4\ubd80\uc758 \ud504\ub808\uc784\uc744 \uc9c1\uc811 \ubc88\ud638\ub85c \uc9c0\uc815\ud558\ub294 \ubc29\uc2dd\uc73c\ub85c \uc791\uc5c5\uc744 \uc9c4\ud589\ud588\ub2e4. \uc608\ub97c \ub4e4\uc5b4, "\uc67c\ucabd\ubd80\ud130 1\ubc88~\ub9c8\uc9c0\ub9c9 \ubc88\ud638\uae4c\uc9c0 \uc0ac\uc6a9", "3\ubc88 \ud504\ub808\uc784\uc740 \uc81c\uc678", "\uc560\ub2c8\uba54\uc774\uc158 \uc774\ub984\uc740 Jump"\uc640 \uac19\uc774 \uc138\ubd80\uc801\uc73c\ub85c \uc9c0\uc2dc\ud574 \uc560\ub2c8\uba54\uc774\uc158\uc744 \uc81c\uc791\ud588\ub2e4.</p>' +
        '<p>\uc560\ub2c8\uba54\uc774\uc158 \uc81c\uc791 \uc774\ud6c4\uc5d0\ub3c4 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4. \uace8\uace8\uc774 \uc810\ud504 \uc911 \uacf5\uaca9\ud560 \uacbd\uc6b0 Animator\uc758 <code>IsJumping</code> \ud50c\ub798\uadf8\uac00 \uc720\uc9c0\ub418\uc5b4 \uacf5\uc911 \uacf5\uaca9 \uc560\ub2c8\uba54\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc7ac\uc0dd\ub418\uc9c0 \uc54a\uc558\ub2e4. \uc774 \ubb38\uc81c\ub294 \uacf5\uaca9 \ud2b8\ub9ac\uac70 \uc9c1\uc804\uc5d0 <code>IsJumping</code> \uac12\uc744 \uac15\uc81c\ub85c <code>false</code>\ub85c \ubcc0\uacbd\ud55c \ub4a4, <code>SmartCoroutine</code>\uc744 \uc0ac\uc6a9\ud574 \ud55c \ud504\ub808\uc784 \uc774\ud6c4 \uc6d0\ub798 \uac12\uc73c\ub85c \ubcf5\uad6c\ud558\ub294 \ubc29\uc2dd\uc73c\ub85c \ud574\uacb0\ud588\ub2e4.</p>' +
        '<p>\uc801 \ubcf4\uc2a4 \ubaac\uc2a4\ud130\ub4e4 \uc5ed\uc2dc \uac19\uc740 \ubc29\uc2dd\uc73c\ub85c \uc2a4\ud504\ub77c\uc774\ud2b8 \ud504\ub808\uc784\uc744 \uc815\ud655\ud558\uac8c \uc9c0\uc815\ud558\uace0 \uc560\ub2c8\uba54\uc774\uc158 \uc774\ub984\uc744 \uc9c1\uc811 \ubd80\uc5ec\ud574 \uc81c\uc791\ud588\ub2e4.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">\uc801 AI \u2014 \ub0ad\ub5a0\ub7ec\uc9c0 \ucd94\ub77d \ubc29\uc9c0</h5>' +
        '<p>\ub450 \ubc88\uc9f8\ub85c \uc5b4\ub824\uc6e0\ub358 \ubd80\ubd84\uc740 \uc801 AI\uc758 \ub0ad\ub5a0\ub7ec\uc9c0 \ucd94\ub77d \ubc29\uc9c0 \uc2dc\uc2a4\ud15c\uc774\uc5c8\ub2e4. \uc801 \uc624\ube0c\uc81d\ud2b8\ub4e4\uc774 \uc21c\ucc30\ud558\uac70\ub098 \ud50c\ub808\uc774\uc5b4\ub97c \ucd94\uaca9\ud560 \ub54c \ub0ad\ub5a0\ub7ec\uc9c0\ub85c \ub5a8\uc5b4\uc838 \uc989\uc0ac\ud558\ub294 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4. \uc774\ub97c \ud574\uacb0\ud558\uae30 \uc704\ud574 Raycast \uae30\ubc18\uc758 \uc5e3\uc9c0 \uac10\uc9c0 \uc2dc\uc2a4\ud15c\uc744 \uad6c\ud604\ud588\ub2e4.</p>' +
        '<p><strong>1\ub2e8\uacc4 \u2014 Center Raycast:</strong> \uba3c\uc800 \uc801 \uc624\ube0c\uc81d\ud2b8\uc758 \uc911\uc559\uc5d0\uc11c \uc544\ub798 \ubc29\ud5a5\uc73c\ub85c Raycast\ub97c \ubc1c\uc0ac\ud574 \ud604\uc7ac \uc9c0\uba74 \uc704\uc5d0 \uc788\ub294\uc9c0\ub97c \ud655\uc778\ud588\ub2e4. \ub9cc\uc57d \ubc14\ub2e5\uc774 \uac10\uc9c0\ub418\uc9c0 \uc54a\ub294\ub2e4\uba74(\uc810\ud504 \uc911\uc774\uac70\ub098 \uacf5\uc911 \uc0c1\ud0dc\ub77c\uace0 \ud310\ub2e8) \uc5e3\uc9c0 \uccb4\ud06c \uc790\uccb4\ub97c \uc218\ud589\ud558\uc9c0 \uc54a\uace0 <code>false</code>\ub97c \ubc18\ud658\ud558\ub3c4\ub85d \uc124\uacc4\ud588\ub2e4. \uc774\ub97c \ud1b5\ud574 \uc801\uc774 \uc9c0\uc0c1 \uc0c1\ud0dc\uc77c \ub54c\ub9cc \uc5e3\uc9c0 \uac10\uc9c0\uac00 \ub3d9\uc791\ud558\ub3c4\ub85d \uc548\uc804 \uc7a5\uce58\ub97c \uad6c\uc131\ud588\ub2e4.</p>' +
        '<p><strong>2\ub2e8\uacc4 \u2014 Edge Raycast:</strong> \uadf8 \ub2e4\uc74c \uc801\uc774 \ubc14\ub77c\ubcf4\ub294 \ubc29\ud5a5\uc73c\ub85c \uc77c\uc815 \uac70\ub9ac\ub9cc\ud07c \uc624\ud504\uc14b\uc744 \uc801\uc6a9\ud55c \ub4a4, \ud574\ub2f9 \uc704\uce58\uc5d0\uc11c \uc544\ub798 \ubc29\ud5a5\uc73c\ub85c \ub2e4\uc2dc Raycast\ub97c \ubc1c\uc0ac\ud588\ub2e4. \ub9cc\uc57d \uc774 Raycast\uac00 \ubc14\ub2e5\uc744 \uac10\uc9c0\ud558\uc9c0 \ubabb\ud55c\ub2e4\uba74, \ud574\ub2f9 \ubc29\ud5a5\uc5d0 \uc9c0\ud615\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294\ub2e4\uace0 \ud310\ub2e8\ud574 \uc774\ub3d9\uc744 \ucc28\ub2e8\ud558\ub3c4\ub85d \uad6c\ud604\ud588\ub2e4. \uc774\ub97c \ud1b5\ud574 \uc801 AI\uac00 \ub0ad\ub5a0\ub7ec\uc9c0\ub85c \ub5a8\uc5b4\uc9c0\ub294 \ubb38\uc81c\ub97c \ubc29\uc9c0\ud560 \uc218 \uc788\uc5c8\ub2e4.</p>' +
        '<p>\ud558\uc9c0\ub9cc \ubb38\uc81c\ub97c \ud574\uacb0\ud558\uc790 \ub610 \ub2e4\ub978 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4. \uac00\uc7a5 \uc790\uc8fc \ub4f1\uc7a5\ud558\ub294 \uc77c\ubc18 \ubaac\uc2a4\ud130\uc778 "HellGuard"\uc758 \uc560\ub2c8\uba54\uc774\uc158\uc774 Raycast \ud310\uc815 \uacfc\uc815\uc5d0\uc11c \uc9c0\uc18d\uc801\uc73c\ub85c \uae5c\ube61\uc774\ub294 \ud604\uc0c1\uc774 \ubc1c\uc0dd\ud55c \uac83\uc774\ub2e4.</p>' +
        '<br>' +
        '<p>\uccab \ud504\ub85c\uc81d\ud2b8\uc600\uae30 \ub54c\ubb38\uc5d0 \uc695\uc2ec\uc774 \ub9ce\uc774 \ub4e4\uc5b4\uac14\ub2e4. \uc2e4\ub825\uc5d0 \ube44\ud574 \uad6c\ud604 \ubc94\uc704\ub97c \ud06c\uac8c \uc7a1\uc558\uace0, \uacb0\uad6d \uad6c\ud604\ud558\uc9c0 \ubabb\ud55c \uc2dc\uc2a4\ud15c\ub4e4\ub3c4 \ub9ce\uc558\ub2e4. \uc2e4\uc81c\ub85c \uc644\uc131\ub41c \uac83\uc740 \ucef7\uc52c\uacfc AI\ub97c \ud65c\uc6a9\ud55c \uc5d0\uc14b \uc81c\uc791 \uc2dc\uc2a4\ud15c\uc774 \ub300\ubd80\ubd84\uc774\uc5c8\ub2e4.</p>' +
        '<p>\ud2b9\ud788 \uae30\uc5b5\uc758 \uc870\uac01\uc744 \ud68d\ub4dd\ud55c \ub4a4 \ucef7\uc52c\uc774 \uc7ac\uc0dd\ub418\ub294 \uc5f0\ucd9c\uc744 \ub9cc\ub4e4\uba74\uc11c \ub9ce\uc740 \uac83\uc744 \ub290\uaf08\ub2e4. \ucc98\uc74c\uc5d0\ub294 \ucef7\uc52c\uc774 \uc2e4\ud589\ub418\uba74 \ub2e8\uc21c\ud788 \uac8c\uc784\ub9cc \uba48\ucd94\uba74 \ub41c\ub2e4\uace0 \uc0dd\uac01\ud588\uc9c0\ub9cc, \uc2e4\uc81c\ub85c\ub294 \uc791\uc740 \ub514\ud14c\uc77c \ud558\ub098\uae4c\uc9c0 \uace0\ub824\ud558\uba70 \uac8c\uc784\uc744 \uc124\uacc4\ud574\uc57c \ud55c\ub2e4\ub294 \uc810\uc744 \uae68\ub2ec\uc558\ub2e4.</p>' +
        '<p>\uc774\ubc88 \ud504\ub85c\uc81d\ud2b8\ub97c \ud1b5\ud574 \uc2a4\uc2a4\ub85c \ubd80\uc871\ud55c \ubd80\ubd84\uc744 \ub9ce\uc774 \ub290\uaf08\ub2e4. \ub3d9\uc2dc\uc5d0 \ud3c9\uc18c \ub2e8\uc21c\ud788 \uc990\uae30\uae30\ub9cc \ud588\ub358 \uac8c\uc784\ub4e4\uc774 \uc2e4\uc81c\ub85c\ub294 \uc5bc\ub9c8\ub098 \ub9ce\uc740 \ub178\ub825\uacfc \ub514\ud14c\uc77c \uc704\uc5d0\uc11c \ub9cc\ub4e4\uc5b4\uc9c0\ub294\uc9c0 \uc54c \uc218 \uc788\uc5c8\uace0, \uc774\ub97c \uad6c\ud604\ud558\ub294 \uac8c\uc784 \uac1c\ubc1c\uc790\ub4e4\uc5d0 \ub300\ud55c \uc874\uacbd\uc2ec\ub3c4 \ud06c\uac8c \uc0dd\uacbc\ub2e4.</p>',
      actions: [{ label: 'Go to Demo', class: 'btn-web', url: 'https://tpgns3353-ctrl.itch.io/golgol', external: true }]
    },
    pumpumkin: {
      thumb: 'P',
      thumbClass: 'thumb-pumpkin-lg',
      thumbImage: 'images/pumpumkin-thumbnail.jpeg',
      title: 'Pumpumkin',
      subtitle: '2D \u00b7 Clicker',
      desc: '\ud560\ub85c\uc708 \ubc24, \ub9c8\ubc95\uc758 \ud638\ubc15\ubc2d\uc5d0\uc11c \uc2dc\uc791\ub41c \ud074\ub9ac\ucee4 \ubaa8\ud5d8. \ud638\ubc15\uc744 \ud074\ub9ad\ud558\uc5ec \uc0ac\ud0d5\uc744 \uc218\uc9d1\ud558\uace0, \uc0ac\ud0d5\uc73c\ub85c \uc5c5\uadf8\ub808\uc774\ub4dc\ub97c \uad6c\ub9e4\ud558\uc5ec 25\ub2e8\uacc4\uc758 \ud638\ubc15\uc744 \uc9c4\ud654\uc2dc\ud0a4\ub294 \uac8c\uc784\uc785\ub2c8\ub2e4.',
      flow: '\ud638\ubc15 \ud074\ub9ad \u2192 \uc0ac\ud0d5 \ud68d\ub4dd(+1) \u2192 \uc5c5\uadf8\ub808\uc774\ub4dc \uad6c\ub9e4(4\uc885) \u2192 \ud638\ubc15 \uc9c4\ud654(25\ub2e8\uacc4) \u2192 \ubc18\ubcf5 / \ub79c\ub364 \uc774\ubca4\ud2b8 \ubc1c\uc0dd (\ud669\uae08 \ud638\ubc15 10x / \uad11\ud3ed \ubaa8\ub4dc 2x / \uadc0\uc2e0 \uc2a4\ud3f0)',
      tags: ['Unity 6000', 'C#', 'DI Container', 'EventBus', 'Excel \u2194 SO', 'Object Pooling', 'WebGL', 'URP'],
      features: [
        '\ud074\ub9ad \u2014 \ud638\ubc15 \ud074\ub9ad \uc2dc \uc0ac\ud0d5 \ud68d\ub4dd (\ud074\ub9ad\uac15\ud654/\ud06c\ub9ac\ud2f0\uceec/\uad11\ud3ed/\ud669\uae08 \ubc30\uc728 \uc911\uc811)',
        '\uc5c5\uadf8\ub808\uc774\ub4dc \u2014 \ud074\ub9ad\uac15\ud654(\ub808\ubca8\ub2f9+1), \uc790\ub3d9\uc218\uc9d1(\ucd08\ub2f9+1), \ud06c\ub9ac\ud2f0\uceec(+5%\ud655\ub960,2\ubc30), \uad11\ud3ed\ubaa8\ub4dc(30\ucd08x2)',
        '\uc9c4\ud654 \u2014 25\ub2e8\uacc4\u00b75\ub4f1\uae09 \uc21c\ucc28 \uc9c4\ud654 (Normal\u2192Rare\u2192Epic\u2192Legendary\u2192Mythic), 0\u219210M \uc0ac\ud0d5 \ub204\uc801',
        '\uc0ac\ud0d5 \u2014 107\uc885 \uc2a4\ud504\ub77c\uc774\ud2b8, \ud074\ub9ad\uac15\ud654 \ub808\ubca8\uc5d0 \ub530\ub77c 6\ub2e8\uacc4 \uc9c4\ud654 (10\ub808\ubca8\ub2f9 \ub2e4\ub978 \uc2a4\ud504\ub77c\uc774\ud2b8)',
        '\ub79c\ub364 \u2014 \ud669\uae08 \ud638\ubc15(10\ubc30 \ubcf4\ub108\uc2a4), \uad11\ud3ed \ubaa8\ub4dc(30\ucd08 \ub79c\ub364 \ubc1c\ub3d9), \uadc0\uc2e0(3\ud328\ud134 \uc774\ub3d9\u00b7\ud0ed \ubcf4\uc0c1)'
      ],
      extraSections: [
        {
          label: '\ud575\uc2ec \uc544\ud0a4\ud14d\ucc98',
          items: [
            'Singleton \u2014 GameManager.Instance\ub85c \uc804\uccb4 \uac8c\uc784 \uc0c1\ud0dc \uad00\ub9ac\u00b7DontDestroyOnLoad',
            'DI Container \u2014 DIContainer + [Inject] \uc18d\uc131, 8\uac1c \ucf54\uc5b4 \ucef4\ud3ec\ub10c\ud2b8 \uc0dd\uc131\u00b7\uc8fc\uc785, Scene/Global \uc774\uc911 \uad6c\uc870',
            'EventBus \u2014 static EventBus&lt;T&gt; + readonly struct, Game\u2194UI \ub808\uc774\uc5b4 \ubd84\ub9ac, GC \uc81c\ub85c, IDisposable \uc790\ub3d9 \ud574\uc81c',
            '\ud1b5\uc2e0 \uc6d0\uce59 \u2014 Game\u2192UI\ub294 EventBus\ub85c\ub9cc, UI\u2192Game\uc740 DI\ub85c \ucef4\ud3ec\ub10c\ud2b8 \uc9c1\uc811 \ud638\ucd9c'
          ]
        },
        {
          label: '\uc131\ub2a5 \ucd5c\uc801\ud654',
          items: [
            'Object Pooling \u2014 FloatingText 10\uac1c, CandyProjectile 10\uac1c+Trail 48\uac1c, UpgradePopupItem 5\uac1c \uac00\uc0c1 \uc2a4\ud06c\ub864',
            'readonly struct \uc774\ubca4\ud2b8 \u2014 \ubaa8\ub4e0 \uc774\ubca4\ud2b8 \uad6c\uc870\uccb4\ud654\ub85c GC Allocation 0',
            '\uc77c\uad04 \ub85c\ub4dc \u2014 107\uac1c \uc0ac\ud0d5 \uc2a4\ud504\ub77c\uc774\ud2b8 Resources.LoadAll \ud55c \ubc88\uc5d0',
            '\uc6d0\uc790\uc801 \uc800\uc7a5 \u2014 JSON \uc138\uc774\ube0c tmp\u2192bak \ubc29\uc2dd (\uc190\uc0c1 \ubc29\uc9c0)',
            '\uac00\uc0c1 \uc2a4\ud06c\ub864 \u2014 \uc5c5\uadf8\ub808\uc774\ub4dc \ud31d\uc5c5 5\uac1c \ud56d\ubaa9\ub9cc \uc2e4\uc874, 102\ub808\ubca8 \ub300\uc751'
          ]
        },
        {
          label: '\uac8c\uc784 \uae30\ub2a5',
          items: [
            '\ud53c\ub4dc\ubc31 \uc774\ud399\ud2b8 \u2014 \uc22b\uc790 \ud31d\uc5c5, \uc0ac\ud0d5 \ubc1c\uc0ac\uccb4 \uada4\uc801, \ud638\ubc15 \ud074\ub9ad \uc560\ub2c8\uba54\uc774\uc158',
            '\uc9c4\ud654 \uc774\ud399\ud2b8 \u2014 \ub4f1\uae09\ubcc4 \ud30c\ud2f0\ud07c\u00b7\ud654\uba74 \ud50c\ub798\uc2dc\u00b7\ud754\ub4e4\ub9bc (Normal\u2194Mythic \uac15\ub3c4\ucc28\ubcc4)',
            '\ud669\uae08 \ud638\ubc15 \u2014 \ub79c\ub364 \ub4f1\uc7a5, \uae08\uc0c9 \ud384\uc2a4 \uc774\ud399\ud2b8, \ud074\ub9ad \uc2dc 10\ubc30 \ubcf4\uc0c1',
            '\uadc0\uc2e0 \uc774\ubca4\ud2b8 \u2014 3\ud328\ud134(\uc9c1\uc120/\uc0ac\uc778/\ub79c\ub364) \uc774\ub3d9, \ud0ed \uc2dc \uc0ac\ud0d5 \ubcf4\uc0c1',
            '\uc790\ub3d9 \uc800\uc7a5 \u2014 \ubc31\uadf8\ub77c\uc6b4\ub4dc \uc9c4\uc785\u00b7\uc885\ub8cc \uc2dc JSON \uc800\uc7a5',
            '\ubc30\uacbd \uc601\uc0c1 \u2014 VideoPlayer + RawImage (Material Override, WebGL \ud638\ud658)',
            '\ubc18\uc751\ud615 UI \u2014 Canvas Scaler Shrink, \ubaa8\ubc14\uc77c \uc138\ub85c(1080\u00d71920) \uae30\uc900'
          ]
        }
      ],
      retrospective: '<p>\uc5c5\uadf8\ub808\uc774\ub4dc \ubc84\ud2bc \ub514\uc790\uc778\uc5d0\uc11c \ucc98\uc74c\uc5d4 \ub2e8\uc21c\ud558\uac8c \ub808\ubca8 1\ubd80\ud130 \ub808\ubca8 max\uae4c\uc9c0 \ub098\uc5f4 \ud55c \ud6c4 \uc5c5\uadf8\ub808\uc774\ub4dc\uac00 \uc644\ub8cc\ub41c \ub808\ubca8\uc744 \ubd88\ud22c\uba85\ucc98\ub9ac + \ud130\uce58 \ubd88\uac00\ub85c \ucc98\ub9ac\ub97c \ud588\ub2e4. \uadf8\ub7ec\ub098 \ub9c9\uc0c1 \ud638\ubc15 \uc544\uc774\ucf58\uacfc \uc0ac\ud0d5\uc5d0 \ub300\ud55c \ub514\uc790\uc778\uc744 \ub05d\ub0b4\uace0 \ub098\uc790 \uc0ac\ud0d5 \uc774\ubbf8\uc9c0\ub294 107\uac1c\uac00 \ub118\uc5b4\uac00 \ubc84\ub9ac\ub2c8 \ub9cc\uc57d \ud50c\ub808\uc774\uc5b4\uac00 \uc0ac\ud0d5\uc744 \ub05d\uae4c\uc9c0 \uc5c5\uadf8\ub808\uc774\ub4dc \uc2dc \uc2a4\ud06c\ub864\uc744 \ub108\ubb34 \ubc11\uc73c\ub85c \ub0b4\ub824\uc57c \ud55c\ub2e4\ub294 \ub2e8\uc810\uc774 \ubc1c\uc0dd\ud588\ub2e4. \uadf8\uc5d0 \ub530\ub978 \uc624\ube0c\uc81d\ud2b8 107\uac1c\ub97c \uc18c\ud658\ud558\uba74\uc11c \ub809\ub3c4 \ubc1c\uc0dd\ud588\ub2e4.</p>' +
        '<p>\uc120\uc0dd\ub2d8\uaed8\uc11c \uc624\ube0c\uc81d\ud2b8 \ud480\ub9c1\uc774\ub77c\ub294 \uac1c\ub150\uc744 \uc0ac\uc6a9\ud574 \ubcf4\ub77c\uace0 \ud558\uc154\uc11c \uc801\uc6a9\ud588\ub2e4. \ub098\ub294 \uc5ec\uae30\uc11c \ub9cc\uc871\ud588\uc5c8\ub2e4. \ubc18\uc751 \uc18d\ub3c4\ub098 \ub809\uc774 \uc720\uc758\ubbf8\ud558\uac8c \uc904\uc5b4\ub4e4\uc5b4 \uac8c\uc784 \ud50c\ub808\uc774\uc5d0 \ubb38\uc81c\uac00 \uc5c6\ub294 \uc218\uc900\uc774\uc5c8\ub2e4. \uadf8\ub807\uc9c0\ub9cc \uc544\uc9c1 \ud50c\ub808\uc774\uc5b4\uac00 107\uac1c\uc758 \ub808\ubca8 \uce78\uc744 \uc9c1\uc811 \uc2a4\ud06c\ub864\ud574\uc11c \uc5c5\uadf8\ub808\uc774\ub4dc \ud574\uc57c \ud55c\ub2e4\ub294 \ubd88\ud3b8\ud568\uc740 \ud574\uacb0 \ub418\uc9c0 \uc54a\uc558\ub2e4.</p>' +
        '<p>\uc5c5\uadf8\ub808\uc774\ub4dc \ubc84\ud2bc\uc5d0 \ub300\ud55c \uc804\uccb4\uc801\uc778 \ub514\uc790\uc778 \uc7ac\uad6c\uc131\uc774 \ud544\uc694\ud588\ub2e4. \uc0ac\ud0d5 \ud14c\ub9c8\uac00 10\uac1c\uc529 11\uac1c\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\uc5c8\uae30 \ub54c\ubb38\uc5d0 \ud31d\uc5c5 \ubc84\ud2bc\uc744 11\uac1c\ub85c \ub098\ub204\uace0 \ub808\ubca8\uc774 1\uc624\ub97c \ub54c\ub9c8\ub2e4 \ud574\ub2f9 \ubc84\ud2bc\uc740 \uc7ac\uc0ac\uc6a9\ud558\uace0 \uc774\ubbf8\uc9c0\uc640 \ud14d\uc2a4\ud2b8\ub97c \ub2e4\uc74c \ub808\ubca8 \uc0ac\ud0d5\uc73c\ub85c \ubcc0\uacbd \ud574 10\ubc88 \ubc18\ubcf5\ub418\uace0 \ud574\ub2f9 \ud14c\ub9c8\uc758 \ub808\ubca8\uc744 \uc62c\ub838\ub2e4\uba74 \ud68c\uc0c9\ucc98\ub9ac + \ud074\ub9ad \ubd88\uac00 \ucc98\ub9ac\ud588\ub2e4. \uc774\ub807\uac8c \ud558\ub2c8 \ud50c\ub808\uc774\uc5b4\uac00 \uc9c1\uad00\uc801\uc774\uace0 \uc2a4\ud06c\ub864 \ud560 \ud589\ub3d9\uc774 \uc904\uc5b4 \ud50c\ub808\uc774 \ud558\uae30 \ud3b8\ud588\ub2e4. \ubc84\ud2bc\uc5d0 \ub300\ud55c \ud558\ub098\uc758 \ub514\uc790\uc778\ub3c4 \uc0ac\uc6a9\uc790\uc758 \uc785\uc7a5\uc5d0\uc11c \uc0dd\uac01\ud558\uc9c0 \ubabb\ud588\uace0 \ud50c\ub808\uc774\uc5b4 \uc785\uc7a5\uc744 \uba3c\uc800 \uc0dd\uac01\ud574\uc57c \ud55c\ub2e4\uace0 \ub290\uaf08\ub2e4.</p>' +
        '<br>' +
        '<p>\uc0ac\ud0d5 \uc774\ubbf8\uc9c0\ub294 \uc2a4\ud0c0\uc77c \ub808\ud37c\ub7f0\uc2a4\uac00 \ub420 \uc774\ubbf8\uc9c0\ub97c \ud55c \uc7a5 \uc900\ube44\ud558\uace0 google flow, chat GPT, Freepeek\uc744 \ud1b5\ud574\uc11c \uc81c\uc791\ud588\ub2e4. \uad6c\uae00 \ud50c\ub85c\uc6b0\ub294 \uc0dd\uc131 \uc18d\ub3c4\uac00 \ube60\ub978 \ud3b8\uc774\uc9c0\ub9cc \ubaa8\ub378\uc774 \ub098\ub178\ubc14\ub098\ub098\ub85c \uc81c\ud55c \ub410\uace0, \ubb34\uc5c7\ubcf4\ub2e4 \uc774\ubbf8\uc9c0 \ud06c\uae30\ub97c \ub0b4\uac00 \uc81c\uc5b4\ud560 \uc218 \uc5c6\ub2e4\ub294 \ub2e8\uc810\uc774 \uc788\uc5c8\ub2e4. \ucc57 \uc9c0\ud53c\ud2f0\ub294 \uc774\ubbf8\uc9c0 \uc0dd\uc131 \uae30\ub2a5\uc774 \ub2e4\ub978 \ubaa8\ub378\ub4e4\ubcf4\ub2e4 \ud654\uc9c8\uc774 \ub5a8\uc5b4\uc9c0\ub294 \ubaa8\uc2b5\uc744 \ubcf4\uc5ec \uc774\ubbf8\uc9c0 \uc0dd\uc131 \ubd80\ubd84\uc5d0\uc11c \uc81c\uc678\ud588\ub2e4. \ud504\ub9ac\ud53d\uc740 \ub2e4\ub978 AI\ub4e4\ubcf4\ub2e4 \uc774\ubbf8\uc9c0\uc758 \ube44\uc728\uacfc \ud06c\uae30\ub97c \ub0b4\uac00 \uc138\ubc00\ud558\uac8c \ucee8\ud2b8\ub864\ud560 \uc218 \uc788\uc5c8\ub2e4\ub294 \uc810\uacfc \ud654\uc9c8 \ubd80\ubd84\uc5d0\uc11c \uc120\ud0dd\ud588\ub2e4.</p>' +
        '<p>\uc6cc\ud06c \ud50c\ub85c\uc6b0\ub97c \uc815\ub9ac\ud558\uc790\uba74 \ub2e4\uc74c\uacfc \uac19\ub2e4.</p>' +
        '<ol>' +
        '<li>\ub808\ud37c\ub7f0\uc2a4 \uc774\ubbf8\uc9c0\ub97c \ubcf4\ub0b4\uace0 \ud574\ub2f9 \uc2a4\ud0c0\uc77c\ub85c \ub0b4\uac00 \uc6d0\ud558\ub294 \ud14c\ub9c8\uc758 \uc0ac\ud0d5 \ud504\ub86c\ud504\ud2b8\ub97c \uc5bb\ub294\ub2e4. (Ex) \ub9c8\uc2dc\uba5c\ub85c \ubd84\uc704\uae30\uc758 \uc0ac\ud0d5)</li>' +
        '<li>\ud504\ub9ac\ud53d\uc5d0 \ud574\ub2f9 \ud504\ub86c\ud504\ud2b8\ub97c \ubcf4\ub0b4\uace0 \uc6d0\ud558\ub294 \uc774\ubbf8\uc9c0\ub97c \ucd9c\ub825\ud55c\ub2e4.</li>' +
        '<li>\ucd9c\ub825\ud55c \uc774\ubbf8\uc9c0\ub97c \uac00\uacf5\ud558\uae30 \uc804 AI\ub85c \ub9cc\ub4e0 \uc774\ubbf8\uc9c0\ub4e4(\ud2b9\ud788 \ud53d\uc140)\uc740 \ud655\ub300 \ud574 \ubcf4\uba74 \ub9c8\uac10\uc774 \uc88b\uc9c0\uac00 \uc54a\ub2e4.</li>' +
        '<li>3-1. Google AI Pixel Snapper Web\uc744 \uc81c\uc791 \ud574 \uc774\ubbf8\uc9c0\ub97c \ub123\uace0 \ud53d\uc140\uc744 \ucd5c\ub300\ud55c \uae54\ub054\ud558\uac8c \uc815\ub9ac\ud55c\ub2e4.</li>' +
        '<li>\uc774\ubbf8\uc9c0\ub97c \uc5bb\uc740 \ud6c4 \ud574\ub2f9 \uc774\ubbf8\uc9c0\uc758 \ubc30\uacbd\uc744 \uc720\ub2c8\ud2f0\uc5d0 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub3c4\ub85d \ubc30\uacbd\uc744 \ud22c\uba85\ud654\ud55c\ub2e4.</li>' +
        '<li>\ud22c\uba85\ud654 \ud55c \ubc30\uacbd\uc744 Google AI Studio\ub97c \ud1b5\ud574 \uc81c\uc791\ud55c \uc2a4\ud504\ub77c\uc774\ud2b8 \uc790\ub3d9 \uc2a4\ud50c\ub9ac\ud130\ub97c \ud1b5\ud574\uc11c \uc774\ubbf8\uc9c0\ub97c \uc790\ub978\ub2e4.</li>' +
        '</ol>' +
        '<p>\uc704\uc640 \uac19\uc740 \uacfc\uc815\uc744 \ud1b5\ud574\uc11c \ud544\uc694\ud55c \uc0ac\ud0d5 \uc5d0\uc14b\uc744 \uc900\ube44 \ud588\ub2e4.</p>' +
        '<br>' +
        '<p>\uc544\uc26c\uc6e0\ub358 \uc810\uc740 \uc544\uc9c1 \ud53d\uc140 \uc2a4\ub0a9\ud37c\uac00 \uc720\ub8cc \uc11c\ube44\uc2a4\ub4e4\uc5d0 \ube44\ud574 \ud004\ub9ac\ud2f0\uac00 \ub5a8\uc5b4\uc9c4\ub2e4\ub294 \uc810\uc774 \uc544\uc27d\ub2e4. \uc218\uc815\uc5d0 \uc218\uc815\uc744 \uac70\ub4ed\ud588\uc9c0\ub9cc \ud55c\uacc4\uac00 \ub69c\ub82c\ud588\ub2e4.</p>' +
        '<p>AI \uc774\ubbf8\uc9c0\ub97c \ud65c\uc6a9\ud55c \uac8c\uc784\uc744 \ub9cc\ub4e4\uc5b4 \ubcf4\uace0 \uc2f6\uc5b4\uc11c \uc9c4\ud589\ud588\ub358 \ud504\ub85c\uc81d\ud2b8\uc600\ub2e4. \uc774\ubbf8\uc9c0\uc758 \ud004\ub9ac\ud2f0\ub294 \uae30\uc220\ub825\uc758 \ud55c\uacc4\ub85c \uc778\ud574 \uc544\uc26c\uc6e0\uc9c0\ub9cc AI\ub97c \uc5b4\ub5bb\uac8c \ud65c\uc6a9\ud574\uc57c \ud558\ub294\uc9c0 \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \uace0\ubbfc\ud558\uace0 \uc2e4\uc804\uc5d0\uc11c \uc801\uc6a9\ud560 \uc218 \uc788\ub294\uc9c0 \uc54c \uc218 \uc788\uc5c8\ub358 \ud504\ub85c\uc81d\ud2b8\uc600\ub2e4.</p>',
      actions: [{ label: 'Go to Demo', class: 'btn-web', url: 'https://tpgns3353-ctrl.itch.io/pumpumkin', external: true }]
    },
    todolist: {
      thumb: 'T',
      thumbClass: 'thumb-todo-lg',
      thumbImage: 'images/todo-list-icon.jpeg',
      title: 'Todo List',
      subtitle: 'App \u00b7 Tauri \u00b7 Web',
      desc: '\ud560 \uc77c\uc744 \uad00\ub9ac\ud558\ub294 \uc571\uc785\ub2c8\ub2e4. \ucd94\uac00, \uc218\uc815, \uc0ad\uc81c, \uc644\ub8cc \uccb4\ud06c \uae30\ub2a5\uacfc \uce74\ud14c\uace0\ub9ac/\uc6b0\uc120\uc21c\uc704 \ubd84\ub958, \ud544\ud130\ub9c1\uc744 \uc9c0\uc6d0\ud569\ub2c8\ub2e4. \uc6f9 \ubc84\uc804\uacfc Android \uc571\uc73c\ub85c \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4.',
      flow: '\ud560 \uc77c \uc785\ub825 \u2192 \uce74\ud14c\uace0\ub9ac/\uc6b0\uc120\uc21c\uc704 \uc120\ud0dd \u2192 \ucd94\uac00 \u2192 \uc644\ub8cc \ud1a0\uae00 \u2192 \uc218\uc815/\uc0ad\uc81c \u2192 \ud544\ud130\ub85c \uc870\ud68c',
      tags: ['Vanilla HTML/CSS/JS', 'Tauri v2 + Rust', 'LocalStorage', '\ubc18\uc751\ud615 + \ub2e4\ud06c\ubaa8\ub4dc', 'GitHub Pages'],
      features: [
        '\ud560 \uc77c CRUD \u2014 \ucd94\uac00, \ubaa8\ub2ec \uc218\uc815, \uc989\uc2dc \uc0ad\uc81c',
        '\uc644\ub8cc \uccb4\ud06c \u2014 \uccb4\ud06c\ubc15\uc2a4 \ud1a0\uae00 \uc2dc \ucde8\uc18c\uc120 \ud45c\uc2dc',
        '\uce74\ud14c\uace0\ub9ac \ubd84\ub958 \u2014 \uc77c\ubc18/\uc5c5\ubb34/\uac1c\uc778/\uc1fc\ud551/\ud559\uc2b5 \ud0dc\uadf8',
        '\uc6b0\uc120\uc21c\uc704 \uc124\uc815 \u2014 \ub0ae\uc74c/\ubcf4\ud1b5/\ub192\uc74c \uc0c9\uc0c1 \ud0dc\uadf8\ub85c \uc2dc\uac01 \uad6c\ubd84',
        '\ud544\ud130\ub9c1 \u2014 \uce74\ud14c\uace0\ub9ac, \uc6b0\uc120\uc21c\uc704, \uc0c1\ud0dc \uc870\ud569 \ud544\ud130',
        '\ud1b5\uacc4 \u2014 \uc804\uccb4/\uc644\ub8cc/\uc9c4\ud589\uc911 \uac1c\uc218 \uc2e4\uc2dc\uac04 \ud45c\uc2dc'
      ],
      actions: [
        { label: '\uc6f9\uc73c\ub85c \ubc29\ubb38', class: 'btn-web', url: '/todo/', external: true },
        { label: '\uc571 \ub2e4\uc6b4\ub85c\ub4dc (APK)', class: 'btn-apk', url: 'https://github.com/tpgns3353-ctrl/tpgns3353-ctrl.github.io/releases/download/v1.0.0/todo-list.apk', external: true, download: true }
      ]
    },
    webnovel: {
      thumb: 'R',
      thumbClass: 'thumb-novel-lg',
      thumbImage: 'images/red-moon-night-thumbnail.png',
      title: '\ubd89\uc740\ub2ec\uc758 \ubc24',
      subtitle: 'Interactive Novel \u00b7 Story \u00b7 9 Chapters',
      desc: 'AI \uae30\ubc18 \uc778\ud130\ub799\ud2f0\ube0c \uc6f9\uc18c\uc124 \uc2dc\ubba4\ub808\uc774\ud130. \uc624\ube60\uc758 \uc8fd\uc74c\uc744 \ubaa9\uaca9\ud55c \uc18c\ub140 \uc18c\ub77c\uc778\uc774 \ubcf5\uc218\ub97c \uc704\ud574 \uac80\uc0ac\uac00 \ub418\uc5c8\uc9c0\ub9cc, \uc2e4\uc885\ub41c \uc624\ube60\ub97c \ucc3e\ub294 \uc5ec\uc815 \uc18d\uc5d0\uc11c \uc544\ubc84\uc9c0\uac00 \ud751\ub9c8\ubc95\uc73c\ub85c \uc624\ube60\uc758 \ubab8\uc744 \uc870\uc885\ud558\uace0 \uc788\uc74c\uc744 \uc54c\uac8c \ub418\uace0, \ubcf5\uc218\uc640 \uac00\uc871\uc560 \uc0ac\uc774\uc5d0\uc11c \uc120\ud0dd\ud574\uc57c \ud558\ub294 \uae30\ub85c\uc5d0 \uc11c\ub294 \uc774\uc57c\uae30\uc785\ub2c8\ub2e4.',
      flow: '\uc81c1\uc7a5~\uc81c9\uc7a5 \u00b7 \uc120\ud0dd\uc9c0 \ubd84\uae30 \u00b7 \uc2a4\ud0ef \uc2dc\uc2a4\ud15c (\uccb4\ub825/\uc815\uc2e0\ub825/\uc720\ub300) \u00b7 \ub2e4\uc911 \uc5d4\ub529',
      tags: ['\uc6f9\uc18c\uc124', '\uc778\ud130\ub799\ud2f0\ube0c', '\uc120\ud0dd\uc9c0 \ubd84\uae30', '\ud55c\uad6d\uc5b4', 'GitHub Pages'],
      features: [
        '\ucd1d 9\uc7a5 \uad6c\uc131, \uc120\ud0dd\uc9c0\uc5d0 \ub530\ub77c \uc2a4\ud1a0\ub9ac \uc804\uac1c\uac00 \ub2ec\ub77c\uc9d1\ub2c8\ub2e4',
        '\uccb4\ub825\u00b7\uc815\uc2e0\ub825\u00b7\uc720\ub300 \uc2a4\ud0ef \uc2dc\uc2a4\ud15c\uc73c\ub85c \ud50c\ub808\uc774\uc5b4\uc758 \uc120\ud0dd\uc774 \ubc18\uc601\ub429\ub2c8\ub2e4',
        '\ubd89\uc740\ub2ec\uc758 \ubc24 \u2014 "\ub2f9\uc2e0\uc740 \uafc8\uc744 \uc704\ud574 \ubb34\uc5c7\uae4c\uc9c0 \ud76c\uc0dd\ud560 \uc218 \uc788\ub294\uac00?"',
        '\ub85c\uceec \uc800\uc7a5 \uae30\ub2a5\uc73c\ub85c \uc774\uc5b4\uc11c \uc77d\uae30 \uac00\ub2a5'
      ],
      extraSections: [
        {
          label: 'GitHub',
          items: [
            '\uc18c\uc2a4 \ucf54\ub4dc: github.com/tpgns3353-ctrl/webnovel',
            '\uc6d0\ubcf8 \ud504\ub85c\uc81d\ud2b8: AI \uae30\ubc18 CLI \uc2dc\ubba4\ub808\uc774\ud130 (Maskweaver/OpenCode)'
          ]
        }
      ],
      retrospective: '<p>"\ubd89\uc740 \ub2ec\uc758 \ubc24" \ud504\ub85c\uc81d\ud2b8\ub294 AI \uae30\ubc18 \ucc44\ud305 \uc2dc\ubba4\ub808\uc774\uc158\uc744 \uc81c\uc791\ud574 \ubcf4\uc790\ub294 \ubaa9\ud45c\ub85c \uc9c4\ud589\ud55c \ud504\ub85c\uc81d\ud2b8\uc600\ub2e4. \uc804\uccb4 \uac1c\ubc1c \uacfc\uc815\uc5d0\uc11c AI \ub3c4\uad6c\ub97c \uc801\uadf9\uc801\uc73c\ub85c \ud65c\uc6a9\ud588\uc73c\uba70, \uc57d 5\uc2dc\uac04 \ub9cc\uc5d0 \ud504\ub85c\ud1a0\ud0c0\uc785\uc744 \uc644\uc131\ud588\ub2e4.</p>' +
        '<p>\ucc98\uc74c \ud504\ub85c\uc81d\ud2b8\ub97c \uc2dc\uc791\ud558\uba70 \uac00\uc7a5 \uace0\ubbfc\ud588\ub358 \ubd80\ubd84\uc740 \ub2e4\uc74c\uacfc \uac19\uc558\ub2e4. "\ud50c\ub808\uc774\uc5b4\uc758 \uc120\ud0dd\uc5d0 \ub530\ub77c \ub300\ud654 \ud750\ub984\uacfc \uc2a4\ud1a0\ub9ac\uac00 \ub2ec\ub77c\uc9c0\ub294 AI \ucc44\ud305 \uc2dc\ubba4\ub808\uc774\uc158\uc744 \uc5b4\ub5bb\uac8c \uc124\uacc4\ud574\uc57c \ud560\uae4c?" \ub2e8\uc21c\ud788 \ub300\uc0ac\ub97c \ucd9c\ub825\ud558\ub294 \uc218\uc900\uc774 \uc544\ub2c8\ub77c, \ud50c\ub808\uc774\uc5b4 \uc120\ud0dd\uc5d0 \ub530\ub77c \uc774\uc57c\uae30 \uad6c\uc870\uac00 \ubcc0\ud654\ud574\uc57c \ud588\uae30 \ub54c\ubb38\uc5d0 \ub514\uc790\uc778\uacfc \uae30\ud68d \ubb38\uc11c \uc124\uacc4\uc5d0 \ub9ce\uc740 \uc2dc\uac04\uc744 \ud22c\uc790\ud588\ub2e4.</p>' +
        '<p>\uc2a4\ud1a0\ub9ac\ub97c \uad00\ud1b5\ud558\ub294 \ud575\uc2ec \uba54\uc2dc\uc9c0\ub294 <strong>"\uafc8\uc744 \uc704\ud574 \uc5b4\ub514\uae4c\uc9c0 \ud560 \uc218 \uc788\ub294\uac00?"</strong>\ub85c \uc815\ud588\ub2e4. \ubca0\ub974\uc138\ub974\ud06c\ub77c\ub294 \uc791\ud488\uc744 \ubcf4\uba70 \ud574\ub2f9 \uc8fc\uc81c\ub97c \uac8c\uc784\uc73c\ub85c \ud45c\ud604\ud574 \ubcf4\uace0 \uc2f6\ub2e4\ub294 \uc0dd\uac01\uc744 \uac00\uc9c0\uace0 \uc788\uc5c8\uace0, \uc774\ub97c \uae30\ubc18\uc73c\ub85c \uc138\uacc4\uad00\uacfc \uc2a4\ud1a0\ub9ac\ub97c \uad6c\uc131\ud588\ub2e4.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">OpenSpec \uc6cc\ud06c\ud50c\ub85c\uc6b0</h5>' +
        '<p>\ubc29\ub300\ud55c \uc2a4\ud1a0\ub9ac\ub97c \ud63c\uc790 \uc124\uacc4\ud558\ub294 \uac83\uc740 \ub9ce\uc740 \uc2dc\uac04\uc774 \ud544\uc694\ud588\uae30 \ub54c\ubb38\uc5d0 OpenSpec \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \ud65c\uc6a9\ud588\ub2e4. OpenSpec\uc740 <strong>\uae30\ud68d \u2192 \uae30\ud68d \ubb38\uc11c \uc791\uc131 \u2192 \uc801\uc6a9 \u2192 \uc800\uc7a5 \u2192 \uc218\uc815</strong> \ub2e8\uacc4\ub97c \ubc18\ubcf5\ud558\uba70 \ud504\ub85c\uc81d\ud2b8\ub97c \ubc1c\uc804\uc2dc\ud0a4\ub294 \uad6c\uc870\ub97c \uac00\uc9c0\uace0 \uc788\uc5c8\ub2e4.</p>' +
        '<p>\ucd08\uae30 \ub2e8\uacc4\uc5d0\uc11c\ub294 \ud14c\ub9c8, \uc8fc\uc778\uacf5, \uae30\ubcf8 \uc138\uacc4\uad00, \uc2a4\ud1a0\ub9ac \ubc30\uacbd \uc815\ub3c4\ub9cc \uc815\uc758\ud588\uace0, \uc774\ud6c4\uc5d0\ub294 \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \ub530\ub77c\uac00\uba70 \ub0b4\uc6a9\uc744 \uad6c\uccb4\ud654\ud588\ub2e4. \uadf8 \uacb0\uacfc \uc138\uacc4\uad00, \uc815\uce58 \uccb4\uacc4, \uc9c0\ub9ac\uc640 \uc5ed\uc0ac, \uc8fc\uc694 \uce90\ub9ad\ud130 \uc124\uc815, \uba54\uc778 \uc2a4\ud1a0\ub9ac \ud750\ub984, \ud544\uc218 \uc7a5\uba74 \uad6c\uc131, \ud53c\ud558\uace0 \uc2f6\uc740 \ud074\ub9ac\uc170, \uc2a4\ud1a0\ub9ac\ub97c \uc790\uc5f0\uc2a4\ub7fd\uac8c \uc5f0\uacb0\ud558\ub294 \uc870\ub825\uc790 \uce90\ub9ad\ud130 \ub4f1 \ub0b4\uac00 \ubbf8\ucc98 \uace0\ub824\ud558\uc9c0 \ubabb\ud588\ub358 \uc694\uc18c\ub4e4\uae4c\uc9c0 \uccb4\uacc4\uc801\uc73c\ub85c \uc815\ub9ac\ud560 \uc218 \uc788\uc5c8\ub2e4.</p>' +
        '<p>\ud2b9\ud788 \ud765\ubbf8\ub85c\uc6e0\ub358 \uc810\uc740 \uc120\ud0dd\uc9c0 \ubd84\uae30 \uad6c\uc870\uc640 \ub2e4\uc911 \uc5d4\ub529, \uadf8\ub9ac\uace0 \uccb4\ub825\u00b7\uc815\uc2e0\ub825\u00b7\uc720\ub300\uac10 \uae30\ubc18\uc758 \uc2a4\ud0ef \uc2dc\uc2a4\ud15c\uae4c\uc9c0 \uc790\uc5f0\uc2a4\ub7fd\uac8c \uc124\uacc4 \ud750\ub984\uc5d0 \ud3ec\ud568\ub418\uc5c8\ub2e4\ub294 \uc810\uc774\uc5c8\ub2e4.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">\ud14c\uc2a4\ud2b8 \uacfc\uc815 \u2014 Agent Session \uc2dc\ubba4\ub808\uc774\ud130</h5>' +
        '<p>\uad6c\ud604 \uc774\ud6c4 \ud14c\uc2a4\ud2b8\ub294 Agent Session \uae30\ubc18 \uc2dc\ubba4\ub808\uc774\ud130\ub97c \uc81c\uc791\ud574 \uc9c4\ud589\ud588\ub2e4. \uae30\uc874 \ubc29\uc2dd\uc740 <strong>\uc571 \ube4c\ub4dc \u2192 \ud14c\uc2a4\ud2b8 \u2192 \uc624\ub958 \ubc1c\uacac \u2192 \uc218\uc815 \u2192 \uc7ac\ube4c\ub4dc \u2192 \uc7ac\ud14c\uc2a4\ud2b8</strong> \uacfc\uc815\uc744 \ubc18\ubcf5\ud574\uc57c \ud588\uc9c0\ub9cc, Agent Session \uae30\ubc18 \ud14c\uc2a4\ud2b8 \ud658\uacbd\uc744 \uc0ac\uc6a9\ud558\uba74\uc11c <strong>\uc624\ub958 \ubc1c\uacac \u2192 \uc218\uc815 \u2192 \uc989\uc2dc \uc7ac\ud14c\uc2a4\ud2b8 \u2192 \ucd5c\uc885 \ube4c\ub4dc</strong> \ud615\ud0dc\ub85c \uac1c\ubc1c \ud750\ub984\uc744 \ub2e8\ucd95\ud560 \uc218 \uc788\uc5c8\ub2e4. \uc774\ub97c \ud1b5\ud574 \ubc18\ubcf5 \ube4c\ub4dc\uc5d0 \uc18c\ubaa8\ub418\ub294 \uc2dc\uac04\uacfc \ube44\uc6a9\uc744 \ud06c\uac8c \uc904\uc77c \uc218 \uc788\uc5c8\ub2e4.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">\ud50c\ub7ab\ud3fc\ubcc4 \uc785\ub825 \ucc98\ub9ac \ubb38\uc81c</h5>' +
        '<p>\uc571 \ube4c\ub4dc \uc5ed\uc2dc AI\uc640 \ud611\uc5c5\ud558\uba70 \uc9c4\ud589\ud588\ub2e4. \uac1c\ubc1c \uacfc\uc815\uc5d0\uc11c \uac00\uc7a5 \uc5b4\ub824\uc6e0\ub358 \ubd80\ubd84 \uc911 \ud558\ub098\ub294 \uc6f9 \ud658\uacbd\uacfc APK(Android) \ud658\uacbd\uc758 \uc785\ub825 \ubc29\uc2dd \ucc28\uc774\uc600\ub2e4.</p>' +
        '<ul>' +
        '<li><strong>\uc6f9 \ubc84\uc804:</strong> SpaceBar \u2192 \ud14d\uc2a4\ud2b8 \uc2a4\ud0b5 / \ub2e4\uc74c \uc7a5\uba74 \uc9c4\ud589, \uc22b\uc790 \ud0a4\ud328\ub4dc \u2192 \uc120\ud0dd\uc9c0 \uc120\ud0dd</li>' +
        '<li><strong>APK \ubc84\uc804:</strong> \ud654\uba74 \ud130\uce58 \u2192 \ud14d\uc2a4\ud2b8 \uc2a4\ud0b5 / \ub2e4\uc74c \uc7a5\uba74 \uc774\ub3d9 / \uc120\ud0dd\uc9c0 \uc120\ud0dd</li>' +
        '</ul>' +
        '<p>\ud558\uc9c0\ub9cc \ubaa8\ubc14\uc77c \ud658\uacbd\uc5d0\uc11c\ub294 \ud55c \ubc88\uc758 \ud130\uce58 \uc785\ub825\uc73c\ub85c \ud14d\uc2a4\ud2b8 \uc2a4\ud0b5\uacfc \ub2e4\uc74c \uc7a5\uba74 \uc774\ub3d9\uc774 \ub3d9\uc2dc\uc5d0 \uc2e4\ud589\ub418\ub294 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\ub2e4. \uc774\ub97c \ud574\uacb0\ud558\uae30 \uc704\ud574 \ud130\uce58 \uc785\ub825 \uc774\ud6c4 \uc77c\uc815 \uc2dc\uac04 \ub3d9\uc548 \ucd94\uac00 \uc785\ub825\uc744 \uc81c\ud55c\ud558\ub294 \uc785\ub825 \ucfe8\ub2e4\uc6b4(Input Cooldown) \uad6c\uc870\ub97c \uc801\uc6a9\ud588\ub2e4.</p>' +
        '<br>' +
        '<p>\uc774\ubc88 \ud504\ub85c\uc81d\ud2b8\ub97c \ud1b5\ud574 AI \ub3c4\uad6c\ub97c \ud65c\uc6a9\ud55c \ube60\ub978 \ud504\ub85c\ud1a0\ud0c0\uc774\ud551 \uc5ed\ub7c9\uc744 \ud0a4\uc6b8 \uc218 \uc788\uc5c8\uace0, \uae30\ud68d\ubd80\ud130 \uad6c\ud604\u00b7\ud14c\uc2a4\ud2b8\u00b7\ubc30\ud3ec\uae4c\uc9c0\uc758 \uc804\uccb4 \uac1c\ubc1c \ud750\ub984\uc744 \uacbd\ud5d8\ud560 \uc218 \uc788\uc5c8\ub2e4. \ub610\ud55c \ub2e8\uc21c\ud788 AI\uc5d0\uac8c \uacb0\uacfc\ubb3c\uc744 \uc694\uccad\ud558\ub294 \uac83\uc774 \uc544\ub2c8\ub77c, \ubb38\uc81c\ub97c \uc815\uc758\ud558\uace0 \ubc29\ud5a5\uc744 \uc124\uacc4\ud558\uba70 AI\uc640 \ud611\uc5c5\ud558\ub294 \uacfc\uc815\uc774 \uc911\uc694\ud558\ub2e4\ub294 \uc810\uc744 \ubc30\uc6b8 \uc218 \uc788\uc5c8\ub2e4.</p>',
      actions: [
        { label: '\uc18c\uc124 \uc77d\uae30', class: 'btn-web', url: '/webnovel/', external: true },
        { label: '\uc571 \ub2e4\uc6b4\ub85c\ub4dc (APK)', class: 'btn-apk', url: 'https://github.com/tpgns3353-ctrl/tpgns3353-ctrl.github.io/releases/download/v1.0.0/red-moon-night.apk', external: true, download: true }
      ]
    },
    board: {
      thumb: 'B',
      thumbClass: 'thumb-board-lg',
      thumbImage: 'images/community-board-thumbnail.jpeg',
      title: '\uac8c\uc2dc\ud310',
      subtitle: 'Web App \u00b7 React \u00b7 Supabase',
      desc: 'React + Supabase \uae30\ubc18 \ud480\uc2a4\ud0dd \uac8c\uc2dc\ud310\uc785\ub2c8\ub2e4. \ud68c\uc6d0\uac00\uc785/\ub85c\uadf8\uc778, \uac8c\uc2dc\uae00 CRUD, \ub300\ub313\uae00, \uce74\ud14c\uace0\ub9ac \ubd84\ub958, \ud30c\uc77c \ucca8\ubd80, \uc2e4\uc2dc\uac04 \uc54c\ub9bc, \ub2e4\ud06c\ubaa8\ub4dc, \uad00\ub9ac\uc790 \ud328\ub110\uc744 \uc9c0\uc6d0\ud569\ub2c8\ub2e4.',
      flow: '\ud68c\uc6d0\uac00\uc785 \u2192 \ub85c\uadf8\uc778 \u2192 \uac8c\uc2dc\uae00 \uc791\uc131(\uce74\ud14c\uace0\ub9ac/\ud30c\uc77c\ucca8\ubd80) \u2192 \ub313\uae00/\ub300\ub313\uae00 \u2192 \uc2e4\uc2dc\uac04 \uc54c\ub9bc \uc218\uc2e0 \u2192 \uad00\ub9ac\uc790\ub294 \uc804\uccb4 \uad00\ub9ac',
      tags: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind CSS 4', 'Supabase (PostgreSQL/Auth/Storage/Realtime)', 'Vercel'],
      features: [
        '\uc778\uc99d \u2014 \uc774\uba54\uc77c \ud68c\uc6d0\uac00\uc785/\ub85c\uadf8\uc778, \uc774\uba54\uc77c \uc778\uc99d, \uad00\ub9ac\uc790\u00b7\uc77c\ubc18 \uc0ac\uc6a9\uc790 \uad8c\ud55c \ubd84\ub9ac',
        '\uac8c\uc2dc\uae00 \u2014 CRUD, \uce74\ud14c\uace0\ub9ac \ubd84\ub958, \uac80\uc0c9, \ud398\uc774\uc9c0\ub124\uc774\uc158, \uacf5\uc9c0 \uace0\uc815, \ud30c\uc77c \ucca8\ubd80(\uc774\ubbf8\uc9c0 \ub9ac\uc0ac\uc774\uc9d5)',
        '\ub313\uae00 \u2014 \ub300\ub313\uae00(\uc2a4\ub808\ub4dc) \uc9c0\uc6d0, \uc791\uc131\uc790\u00b7\uad00\ub9ac\uc790 \uc0ad\uc81c \uac00\ub2a5',
        '\uc2e4\uc2dc\uac04 \uc54c\ub9bc \u2014 \ub313\uae00/\ub300\ub313\uae00 \uc791\uc131 \uc2dc Supabase Realtime\uc73c\ub85c \uc989\uc2dc \ud478\uc2dc (\uc54c\ub9bc\ubca8 + \ud1a0\uc2a4\ud2b8)',
        '\uc0ac\uc6a9\uc790 \uc124\uc815 \u2014 \ud504\ub85c\ud544 \ud3b8\uc9d1, \ube44\ubc00\ubc88\ud638 \ubcc0\uacbd, \uc54c\ub9bc on/off, \ub2e4\ud06c\ubaa8\ub4dc(\uacc4\uc815\ubcc4 DB \uc800\uc7a5), \uacc4\uc815 \ud0c8\ud1f4',
        '\uad00\ub9ac\uc790 \ud328\ub110 \u2014 \ub300\uc2dc\ubcf4\ub4dc \ud1b5\uacc4, \uc0ac\uc6a9\uc790 \uad8c\ud55c \uad00\ub9ac, \uac8c\uc2dc\uae00/\ub313\uae00/\uce74\ud14c\uace0\ub9ac \uad00\ub9ac'
      ],
      extraSections: [
        {
          label: '\uc544\ud0a4\ud14d\ucc98',
          items: [
            'SPA \uad6c\uc870 \u2014 React Router \uae30\ubc18 13\uac1c \ub77c\uc6b0\ud2b8, ProtectedRoute\ub85c \uc811\uadfc \uad8c\ud55c \uc81c\uc5b4',
            'Context API \u2014 AuthContext(\uc778\uc99d), ThemeContext(\ud14c\ub9c8), NotificationContext(\uc54c\ub9bc) \uc804\uc5ed \uc0c1\ud0dc \uad00\ub9ac',
            'Custom Hooks \u2014 usePosts, useComments, useCategories, useProfile\ub85c DB \ucffc\ub9ac \ucea1\uc290\ud654',
            'Supabase BaaS \u2014 \ubc31\uc5d4\ub4dc \uc11c\ubc84 \uc5c6\uc774 PostgreSQL + Auth + Storage + Realtime \ud1b5\ud569 \ud65c\uc6a9'
          ]
        },
        {
          label: '\ubcf4\uc548',
          items: [
            'RLS (Row Level Security) \u2014 PostgreSQL \uc218\uc900\uc5d0\uc11c \ud14c\uc774\ube14\ubcc4 \uc77d\uae30/\uc4f0\uae30/\uc0ad\uc81c \uad8c\ud55c \uc81c\uc5b4',
            'DB \ud2b8\ub9ac\uac70 \u2014 \ud68c\uc6d0\uac00\uc785 \uc2dc \ud504\ub85c\ud544 \uc790\ub3d9 \uc0dd\uc131, \ub313\uae00 \uc791\uc131 \uc2dc \uc54c\ub9bc \uc790\ub3d9 \uc0dd\uc131',
            'Soft Delete \u2014 \uacc4\uc815 \ud0c8\ud1f4 \uc2dc \ub2c9\ub124\uc784\uc744 "\ud0c8\ud1f4\ud55c \uc0ac\uc6a9\uc790"\ub85c \ubcc0\uacbd, \uac8c\uc2dc\uae00/\ub313\uae00\uc740 \uc720\uc9c0'
          ]
        }
      ],
      actions: [
        { label: '\uc6f9\uc73c\ub85c \ubc29\ubb38', class: 'btn-web', url: 'https://bulletin-board-peach.vercel.app/', external: true }
      ]
    }
  };

  var GAME_EMBEDS = {
    spaceshooter: { src: '/games/spaceshooter/index.html', portrait: true },
    jumprace: { src: '/games/jumprace/index.html', portrait: false },
    golgol: { src: 'https://itch.io/embed-upload/17035372?color=333333', portrait: false },
    pumpumkin: { src: 'https://itch.io/embed-upload/17699633?color=333333', portrait: true }
  };

  var RESEARCH_EMBEDS = {
    spriteslicer:    { src: '/games/sprite-sheets-slicer/dist/index.html', portrait: false },
    'spriteslicer-v2': { src: '/games/sprite-sheets-slicer-v2/dist/index.html', portrait: false },
    'pixel-snapper': { src: '/games/pixel-snapper/dist/index.html', portrait: false }
  };

  // ===== RESEARCH DATA =====
  var RESEARCH = {
    blackwater: {
      title: 'BlackWater:Salvage',
      subtitle: 'Multiplayer \u00b7 Unity \u00b7 Research',
      desc: '멀티플레이어 해양 샐비지 게임의 기술 연구 및 프로토타입 개발 과정입니다.',
      flow: '멀티플레이어 구조 설계 → Unity Netcode 연구 → 해양 물리 시뮬레이션 → 샐비지 메카닉 프로토타입',
      tags: ['Unity', 'Multiplayer', 'Netcode', 'Physics', 'Research'],
      features: [
        '멀티플레이어 아키텍처 — Unity Netcode for GameObjects 기반 서버-클라이언트 구조 연구',
        '해양 시뮬레이션 — Buoyancy, Water Physics, Underwater Effects',
        '샐비지 메카닉 — 잠수, 인양, 보상 시스템 프로토타입',
        '선박 커스터마이징 — 모듈식 선박 업그레이드 시스템 설계'
      ],
      actions: [
        { label: '지형 뷰어 열기', class: 'btn-web', url: '/cave-viewer.html', external: true }
      ]
    },
    'ai-workflow': {
      title: 'AI Asset Workflow',
      subtitle: 'AI \u00b7 Pipeline \u00b7 Research',
      desc: 'AI 이미지 생성 도구를 활용한 게임 에셋 제작 파이프라인 연구입니다. ChatGPT, Freepik, Google Flow 등 다양한 AI 도구를 조합하여 효율적인 에셋 제작 워크플로우를 구축했습니다.',
      flow: '레퍼런스 수집 → ChatGPT로 프롬프트 생성 → Freepik/Flow로 이미지 생성 → 후처리(배경제거/스프라이트 분할) → Unity 임포트',
      tags: ['AI', 'ChatGPT', 'Freepik', 'Pipeline', 'Asset'],
      features: [
        '프롬프트 엔지니어링 — ChatGPT로 원하는 스타일의 이미지 생성 프롬프트 제작',
        'Freepik 활용 — 이미지 비율/크기 세밀 제어, 고화질 출력',
        '후처리 자동화 — 배경 투명화, 스프라이트 시트 자동 분할',
        'Unity 통합 — 자동화된 임포트 파이프라인, 메타데이터 설정'
      ],
      extraSections: [
        {
          label: '워크플로우 상세',
          items: [
            'Step 1: 레퍼런스 이미지 → ChatGPT로 프롬프트 역설계',
            'Step 2: Freepik에 프롬프트 전달 → 원하는 이미지 출력',
            'Step 3: AI Pixel Snapper로 픽셀 정제 (픽셀 아트의 경우)',
            'Step 4: 배경 투명화 → Google AI Studio로 스프라이트 자동 분할',
            'Step 5: Unity 프로젝트에 임포트 및 메타데이터 설정'
          ]
        }
      ],
      actions: []
    },
    'pixel-snapper': {
      title: 'Pixel Snapper',
      subtitle: 'Tool \u00b7 Pixel Art \u00b7 AI Refinement',
      desc: 'AI로 생성된 이미지를 픽셀 아트로 정제하는 툴 개발 연구입니다. AI 생성 이미지의 노이즈와 흐릿한 경계를 제거하고 깔끔한 픽셀 아트로 변환하는 알고리즘을 연구했습니다.',
      flow: 'AI 이미지 입력 → 픽셀 그리드 스냅 → 경계 정리 → 픽셀 아트 출력',
      tags: ['Pixel Art', 'AI', 'Tool', 'Algorithm', 'JavaScript'],
      features: [

        '픽셀 그리드 스냅 — 안티앨리어싱 제거, 픽셀 단위로 그리드 정렬',
        '경계 정리 — 흐릿한 외곽선을 선명한 픽셀 경계로 변환',
        'Web 기반 — 브라우저에서 바로 사용 가능한 웹 툴'
      ],
      extraSections: [
        {
          label: '한계점',
          items: [
            '유료 픽셀 아트 툴(Aseprite 등) 대비 화질 한계 존재',
            '복잡한 패턴/텍스처 변환 시 디테일 손실 발생',
            '색상 팔레트 자동 추출 정확도 개선 필요'
          ]
        }
      ],
      actions: []
    },
    wfc: {
      title: 'WFC',
      subtitle: 'Algorithm · ProcGen · Wave Function Collapse',
      desc: 'WFC는 Wave Function Collapse로 규칙에 따라 랜덤 구조를 생성하는 알고리즘이다.\n\n게임에서 던전 생성, 맵 생성, 아이템 배치 등에 사용된다.\nWFC는 규칙을 정할 수가 있다는 점에서 완전 랜덤 생성과 차이를 가진다.\n예를 들어 무작위 랜덤 생성 방식은 문 앞에 곧바로 벽이 생성 돼 앞으로 갈 수 없다던지, 플레이어 스폰 위치 주위로 물이 생성 돼 플레이어가 게임을 진행할 수 없게 된다는 문제가 발생한다.\n에셋을 미리 프리팹화 해 놓고 WFC 알고리즘을 이용한다면 자연스럽게 보이는 랜덤을 연출할 수 있다.',
      flow: '첫 번째 칸: 모든 오브젝트 후보 (물, 불, 풀, 돌) → 규칙 적용 → 물 선택 시 이웃 칸 후보는 불, 풀만 → 각 칸마다 규칙에 맞는 후보군 축소 → 붕괴/전파 반복 → 전체 맵 생성',
      tags: ['WFC', 'ProcGen', 'Algorithm', 'Research'],
      features: [
        '자연스러움 — 규칙 기반 생성으로 완전 랜덤 대비 자연스러운 배치',
        '적은 데이터 — 소수의 타일과 규칙만으로 다양한 구조 생성 가능',
        '리플레이성 증가 — 매번 다른 맵이 생성되어 게임 경험 다변화',
        '수작업 비용 감소 — 레벨 디자이너의 반복 작업을 자동화'
      ],
      extraSections: [
        {
          label: '동작 원리',
          items: [
            '물, 불, 풀, 돌이 있다면 첫 번째 칸에는 모든 오브젝트인 물, 불, 풀, 돌이 올 수 있다',
            '내가 "물 옆에는 불 혹은 풀만 가능"이라는 규칙을 세웠다',
            '랜덤 생성된 첫 번째 칸이 물이라면 돌과 물은 두 번째 칸에 올 수 없고, 불과 풀만 가능하다',
            '확장시켜서 불, 풀에도 규칙을 세웠다면 그 규칙에 맞게 다음 칸에 올 후보군이 정해진다'
          ]
        },
        {
          label: '장점',
          items: [
            '자연스러움 — 규칙으로 제어된 랜덤 생성',
            '적은 데이터로도 가능 — 프리팹 + 규칙 조합',
            '리플레이성 증가 — 매번 다른 맵 구조',
            '수작업 비용 감소 — 레벨 디자인 자동화'
          ]
        },
        {
          label: '단점 및 한계',
          items: [
            '모순(Contradiction) — 모든 조건을 만족시킬 수 없는 경우 발생, 재시작 필요',
            '복잡도 증가 — 오브젝트 수가 많아질수록 연결 규칙, 방향, 회전 등을 전부 일일이 정의해야 함',
            '간편하면서도 어려운 알고리즘 — 직관적이지만 규칙 설계에 많은 고민이 필요',
            'WFC Explainer를 클릭해 직관적으로 경험해 보세요'
          ]
        }
      ],
      actions: [
        { label: 'WFC Explainer', class: 'btn-web', url: '/wfc-explainer.html', external: true }
      ]
    },
    spriteslicer: {
      title: 'Sprites Sheets Slicer',
      subtitle: 'Tool · Google AI Studio · Unity · Sprite Pipeline',
      heroImage: 'images/sprite-slicer-ui.png',
      desc: '존재하는 스프라이트 시트를 자동으로 슬라이싱 하는 툴입니다. Google AI Studio를 활용해서 제작했습니다.\n일일이 자르고 따로 저장 후 배경을 제거하는 방식을 효율적으로 전환 시켜 보았습니다.\n\n또한 Unity에서 바로 사용 가능하도록 .meta 파일을 자동 생성하고 개별 스프라이트로 패키징하는 파이프라인도 개발했습니다.',
      flow: '스프라이트 시트 업로드 → 그리드/오프셋/패딩 설정 → 실시간 프리뷰 확인 → 일괄 ZIP 내보내기 → Unity .meta 생성',
      tags: ['Google AI Studio', 'Unity', 'Sprite', 'Tool', 'Automation'],
      features: [
        'Google AI Studio를 활용해 제작한 웹 기반 스프라이트 시트 슬라이싱 도구',
        'Unity 호환 — 각 스프라이트마다 .meta 파일 자동 생성, Unity 프로젝트에 바로 임포트 가능',
        '투명도 보존 — RGBA 알파 채널 유지, 개별 스프라이트에 불필요한 배경 없이 추출',
        '일괄 처리 — 여러 스프라이트를 한 번에 처리하고 .zip으로 패키징'
      ],
      extraSections: [
        {
          label: 'V1',
          items: [
            '이미지 업로드 — 드래그 앤 드롭 또는 클릭으로 스프라이트 시트(PNG, JPG, WebP) 불러오기',
            '그리드 슬라이싱 — 셀 너비/높이, 오프셋(Offset), 패딩(Padding) 설정으로 정교하게 자르기',
            '실시간 프리뷰 — 캔버스 위 빨간색 가이드라인으로 자르기 설정 즉시 확인',
            '스마트 감지 — 그리드 내 내용이 없는(완전 투명한) 셀은 자동 제외, 유효한 스프라이트만 추출',
            '확대/축소 — 줌 인/아웃 및 초기화 기능으로 세밀한 픽셀 단위 조정 가능',
            '일괄 내보내기 — 모든 스프라이트를 ZIP 파일로 압축 다운로드, 개별 저장도 가능',
            '픽셀 아트 최적화 — image-rendering: pixelated로 저해상도 픽셀 아트도 선명하게 표시'
          ]
        },
        {
          label: 'V1 사용 방법',
          items: [
            '1. 상단의 Upload Sheet 버튼을 눌러 이미지를 선택',
            '2. 좌측 Slice Settings에서 스프라이트의 크기와 간격을 조절',
            '3. 우측 Preview 영역에서 생성된 스프라이트들을 확인',
            '4. Export All 버튼을 눌러 모든 결과물을 ZIP 파일로 저장'
          ]
        },
        {
          label: 'V2',
          items: [
            '비격자형 자유 배치 자동 감지 — 스프라이트가 격자 형태가 아니거나 크기/간격이 불규칙해도 개별 이미지 영역의 경계를 탐색하여 완벽하게 자동으로 찾아내 잘라냄',
            '패딩 설정 및 최소 크기 필터 — 잘라낸 스프라이트 가장자리에 여백(px) 설정, 미세한 노이즈나 점을 무시할 수 있는 가로/세로 최소 제한 필터',
            '실시간 마스크 디버그 뷰 (Mask View) — 눈 감기 아이콘 활성화 시 검은색(추출 대상)/흰색(배경) 마스킹 레이어 전환으로 수치 튜닝이 직관적',
            '간편한 일괄 압축 ZIP 내보내기 — 감지된 모든 스프라이트를 ZIP으로 압축 다운로드, 개별 PNG 저장 및 선택 삭제도 지원'
          ]
        },
        {
          label: 'V1 대비 개선점',
          items: [
            '가장자리 찢어짐/계단 현상 제거 — 알고리즘 페더링 적용으로 투명 경계 부분이 찢어지거나 깨지는 Alias 현상 완전 방지, 부드러운 곡선 가장자리 연출',
            '8방향 정밀 영역 탐색 (8-connectivity) — 대각선으로 겹치거나 흐르듯 연결된 도트 아트까지 8가지 각도에서 빈틈없이 역추적, 세밀한 선/파편 무늬도 손실 없이 캡처',
            '스포이트 배경색 채취 (Pipette Color Pick) — 캔버스 위 원하는 부분을 클릭하여 즉각 RGB를 투명화 컬러로 치환, 0,0 좌표 고정 방식 탈피',
            '샘플 샌드박스 탑재 — 두 번의 터치로 환경을 체험할 수 있는 테스트용 샘플 슬라이스 엔진 내장'
          ]
        },
        {
          label: 'Candy_5 스프라이트 추출 결과',
          items: [
            'Unity Sprite Slicer로 할로윈 아이콘 모음에서 Candy_5 스프라이트 10장 추출',
            '개별 .meta 파일 자동 생성, Unity 프로젝트에 바로 드래그 앤 드롭 가능',
            '원본 해상도 유지, 알파 채널 보존'
          ]
        }
      ],
      actions: [
        { label: 'V1 테스트하기', class: 'btn-web', url: '#', external: false },
        { label: 'V2 테스트하기', class: 'btn-web-v2', url: '#', external: false },
        { label: '결과물 보기', class: 'btn-web', url: '/spriteslicer-demo.html', external: false }
      ]
    },
    'procedural-skybox': {
      title: 'Procedural Skybox',
      subtitle: 'Research \u00b7 Unity \u00b7 Shader \u00b7 Blender \u00b7 AI',
      desc: '프로시저럴 스카이박스\\n\\nOvum_Rumble의 하늘 디자인에 대해서 고민하고 있던 중 회의를 통해 두가지 방향으로 협의 됐다. 단색 이미지를 채워 캐주얼함을 극대화 하자는 것과 프로시저럴 스카이박스를 해보자는 것. 귀여움으로 봤을 때는 단색 이미지를 넣는 것이 더 어울린다고 생각한다. 그러나 나는 새로운 개념을 적용해보고 도전하는 것을 좋아하는 성격이기에 지금 아니면 언제 또 해보겠냐는 생각으로 프로시저럴 스카이박스로 진행하자고 팀원들을 설득했다.\\n\\n프로시저럴 스카이박스라는 개념을 처음 알았다. 검색 해 보니 수학적 계산을 통해 하늘을 실시간으로 생성하고 보정하는 방식이라고 한다.\\n대표적으로 원신 같은 게임에서 사용되는 방식이며, 날씨 변화, 태양의 방향, 시간의 흐름 등을 자연스럽게 표현할 수 있다는 장점이 있다.\\n\\n해당 기능을 프로젝트에 적용하기 위해 필요한 준비물은 다음과 같았다.\\n\\n구름 아트 이미지\\n블랜더를 통해 제작한 카드 모델\\n코딩 및 쉐이더 적용\\n\\n작업을 진행하기 전, 현실적으로 내가 가능한 일과 불가능한 일을 먼저 구분했다.\\n내 한계를 마주보는 일은 가슴 아팠지만, 발전하기 위해서 그리고 목적을 완수하기 위해서는 반드시 필요한 과정이라고 생각했다.\\n\\n나는 비전공자였기 때문에 요구되는 모든 능력이 부족했다.\\n하지만 AI라는 툴의 한계와 나의 한계를 어디까지 부딪혀볼 수 있는지 확인해보고 싶었다.\\n\\n내가 직접 수행 가능했던 영역은 블랜더를 통한 카드 모델 제작이었다.\\n\\n다행히 해당 프로젝트는 오픈소스로 공개되어 있었기 때문에 구름 아트 이미지와 코드 일부를 깃허브 리포지터리에서 구할 수 있었다.\\n나는 해당 리포지터리 링크를 AI에게 전달하고, 이 기능을 현재 프로젝트에 맞게 적용하고 싶다고 요청했다.\\n\\n원본 깃허브 프로젝트는 시간이 흐르며 아침 → 낮 → 밤으로 변화하는 구조였다.\\n하지만 내가 진행하던 프로젝트에서는 시간의 흐름 시스템을 제거하고, 각각의 맵에 아침 / 낮 / 밤 상태를 고정 적용하는 방식으로 방향을 수정했다.\\n\\n리포지터리 내부를 확인해보니 폴더 이름과 구조가 상당히 정리되지 않은 상태였다.\\n아마 원작자가 개인적으로 사용하던 프로젝트를 이후에 공개한 것으로 보였다.\\n\\n따라서 깃 내부의 파일들을 전부 직접 열람하면서 어떤 기능이 실제로 필요한지 하나씩 확인했고, 프로젝트에 적용 가능한 구조인지 AI에게 분석을 요청했다.\\n이 과정을 통해 계획을 수정했고, 최종적으로는 깃허브에서 SkyboxSphere과 쉐이더를 획득해 프로젝트에 적용할 수 있었다.\\n\\n사진에서는 CloudsCards도 리포지터리의 모델을 사용한 것처럼 보이지만, 실제로는 모양이 마음에 들지 않아서 내가 직접 만든 카드 모델로 교체했다.\\n\\n이때 중요한 점은 \"내가 제작한 카드 모델을 사용해서 진행한다\"는 것을 AI에게 반드시 명시해야 한다는 점이다.\\n\\nAI는 기본적으로 기존 리포지터리 구조를 유지하려는 성향이 강했기 때문에, 이 부분을 정확하게 설명하지 않으면 기존 모델 기준으로 작업을 계속 진행하려 했다.\\n\\n카드 모델 제작은 블랜더를 통해 진행했다.\\n구름 이미지를 미리 준비해두었다면 블랜더 UV에 직접 적용하면서 배치 작업을 진행하는 방법도 있다.\\n\\n나는 다른 방식으로 작업했지만, 개인적으로는 UV에 바로 확인하면서 진행하는 방식을 추천한다.\\n배치 상태와 구름의 배치 상태를 실시간으로 확인할 수 있다는 장점이 있기 때문이다.\\n\\n추가로 작업하면서 알게 된 팁이 하나 있다.\\n\\n카드 모델이 뒤집혀 있는 상태로 유니티에 임포트되면 뒷면은 렌더링되지 않는다.\\n따라서 블랜더 우측 상단의 Viewport Overlay → Face Orientation 기능을 활성화해서 앞면과 뒷면(붉은색 표시)을 반드시 확인하면서 작업하는 것을 추천한다.\\n\\n나도 알고 싶지 않았다...\\n\\n블랜더에서 카드 모델 작업이 끝난 뒤에는 유니티로 임포트한 후, AI에게 \"기존 깃의 구조와 기능을 최대한 유지하면서 프로젝트를 진행한다\"는 점을 다시 명시했다.\\n\\n이후 AI가 작업 완료 여부를 물어봤고, 완료됐다고 답하자 아래의 3가지 Tool이 자동으로 제작됐다.\\n\\n<br><img src=\"images/procedural-skybox-irradiancemap.webp\" alt=\"Generate IrradianceMap\" style=\"max-width:100%;border-radius:8px;margin:6px 0;\"><br><small style=\"color:#888;\">▲ Generate IrradianceMap</small><br><br><img src=\"images/procedural-skybox-creatematerials.webp\" alt=\"Create All Materials\" style=\"max-width:100%;border-radius:8px;margin:6px 0;\"><br><small style=\"color:#888;\">▲ Create All Materials</small><br><br><img src=\"images/procedural-skybox-setupscene.webp\" alt=\"Setup Skybox System in Scene\" style=\"max-width:100%;border-radius:8px;margin:6px 0;\"><br><small style=\"color:#888;\">▲ Setup Skybox System in Scene</small>\\n\\n\\n\\nGenerate IrradianceMap : 픽셀 그라데이션 텍스처 1개 생성. \\n이 텍스처는 스카이 셰이더가 하늘의 수직 분포 (천정→지평선 그라데이션 + 태양 추가 분포)를 계산할 때 사용합니다. R채널 = 수직 그라데이션, G채널 = 태양 추가 영역.\\n\\n\\n\\nCreate All Materials 단계 : 기존의 셰이더와 텍스쳐를 조합해서 메터리얼 6개 생성. \\n셰이더 할당: Sky_Day → GenshinSky, Cloud_Day → GenshinCloud\\n텍스처 할당: IrradianceMap, MoonTex, CloudMap 등\\n색상/수치 설정: 해 크기, 산란 강도, 별 밝기, 구름 색상 등을 코드로 일괄 세팅\\n\\n\\n\\nSetup Skybox System in Scene 단계 : 씬에 게임오브젝트 계층을 생성하고, 도구 2에서 만든 매터리얼을 연결\\n \\n\\n\\n스카이 박스와 구름 카드의 위치와 크기를 맞춰주면 작업이 끝난다. 프로젝트에 적용 완료 했고 Ovum_Rumble 게임에서 확인 할 수 있다. \\n\\n\\n신기했던 점은 나는 툴을 만들어 달라고 요청한 적이 없었다는 것이다.\\n하지만 AI는  셋업 과정을 자동화하기 위해 스스로 Tool을 제작했고, 결과적으로 작업 속도를 훨씬 단축시켜줬다.\\n\\n이번 작업을 통해 느낀 점은, AI는 단순히 코드를 대신 작성해주는 수준에서 끝나는 것이 아니라는 점이 놀라웟다.\\n내가 표현하고자하는 방향성과 의도를 전달할 수만 있다면, 작업 구조 자체를 보조하거나 자동화하는 방향으로도 활용 가능하다.\\n\\n📎 참고 자료\\n<a href=\"https://techartnomad.tistory.com/695\" target=\"_blank\" style=\"color:#60a5fa;\">techartnomard 블로그</a> — Procedural Skybox 개념 및 구현 참조\\n<a href=\"https://github.com/xinyangaa/Unity_URP_Genshin_Impact_Programmed_Skybox\" target=\"_blank\" style=\"color:#60a5fa;\">xinyangaa GitHub 리포지터리</a> — 원본 오픈소스 프로젝트',
      flow: '회의로 방향 결정 → 개념 연구 → 가능역량 판단 → GitHub 오픈소스 분석 → AI 커스터마이징 → Blender 카드모델 제작 → Unity 임포트 → AI Tool 자동생성(3종) → Ovum_Rumble 적용',
      tags: ['Procedural Skybox', 'Unity', 'Shader', 'Blender', 'AI', 'Research'],
      features: [
        '실시간 하늘 렌더링 — 수학적 계산으로 날씨·태양·시간 흐름을 자연스럽게 표현',
        'GitHub 오픈소스 분석 — 필요 부분만 추출하여 프로젝트에 맞게 커스터마이징',
        'Blender 직접 모델링 — 구름 카드 모델 제작, UV 매핑, Face Orientation 확인',
        'AI 자동 Tool 생성 — IrradianceMap·Materials·Scene Setup 3종 자동 제작',
        'Ovum_Rumble 실제 적용 완료'
      ],
      extraSections: [
        {
          label: 'AI가 자동 제작한 3가지 Tool',
          items: [
            'Generate IrradianceMap — 픽셀 그라데이션 텍스처 생성 (R=수직그라데이션, G=태양영역)',
            'Create All Materials — 셰이더+텍스처 조합 6종 메터리얼 생성 (색상/수치 일괄 세팅)',
            'Setup Skybox System in Scene — 씬 계층 생성 및 메터리얼 자동 연결'
          ]
        },
        {
          label: 'Blender 작업 팁',
          items: [
            '뒤집힌 카드 모델은 유니티에서 뒷면 렌더링 안 됨 → Face Orientation(앞=파랑/뒤=빨강) 확인 필수',
            'UV에 구름 이미지 직접 적용하면서 배치하면 실시간 확인 가능 — 추천 방식'
          ]
        },
        {
          label: 'AI 협업 인사이트',
          items: [
            'AI는 기존 구조 유지 성향이 강함 → \"내 모델 사용\" 명시 필수',
            'Tool 제작 요청 없이도 AI가 자동화 Tool을 스스로 생성 — 작업 속도 대폭 단축',
            '방향성만 정확히 전달하면 비전공자도 고급 기능 구현 가능'
          ]
        }
      ],
      actions: [
      ]
    }
  };

  // ===== DETAIL PANEL =====
  function buildDetailHTML(project) {
    var actionsHTML = project.actions.map(function(a) {
      if (a.download) return '<a href="' + a.url + '" download class="detail-btn ' + a.class + '">' + a.label + '</a>';
      var target = a.external ? ' target="_blank"' : '';
      return '<a href="' + a.url + '"' + target + ' class="detail-btn ' + a.class + '">' + a.label + '</a>';
    }).join('');

    var featuresHTML = project.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');
    var tagsHTML = project.tags.map(function(t) { return '<span class="detail-tag">' + t + '</span>'; }).join('');

    var extraHTML = '';
    if (project.extraSections) {
      project.extraSections.forEach(function(section) {
        var itemsHTML = section.items.map(function(item) { return '<li>' + item + '</li>'; }).join('');
        extraHTML += '<div class="detail-section"><h4 class="detail-label">' + section.label + '</h4><ul class="detail-list">' + itemsHTML + '</ul></div>';
      });
    }

    var retroHTML = '';
    if (project.retrospective) {
      retroHTML = '<div class="detail-section retrospective-wrapper">' +
        '<button class="retrospective-toggle" onclick="var n=this.nextElementSibling;var o=n.classList.contains(\'open\');n.classList.toggle(\'open\',!o);this.classList.toggle(\'active\',!o);">\ud83d\udcdd \ud504\ub85c\uc81d\ud2b8\ub97c \uc9c4\ud589\ud558\uba70... <span class="toggle-arrow">\u25b8</span></button>' +
        '<div class="retrospective-content">' + project.retrospective + '</div></div>';
    }

    var thumbContent = project.thumbImage ? '<img src="' + project.thumbImage + '" alt="' + project.title + '">' : project.thumb;

    return '<div class="detail-header">' +
      '<div class="detail-thumb ' + project.thumbClass + '">' + thumbContent + '</div>' +
      '<div class="detail-title-area"><h2 class="detail-title">' + project.title + '</h2><p class="detail-subtitle">' + project.subtitle + '</p></div>' +
      '</div>' +
      '<div class="detail-body">' +
      '<div class="detail-section"><h4 class="detail-label">\uc124\uba85</h4><p class="detail-text">' + project.desc + '</p></div>' +
      '<div class="detail-section"><h4 class="detail-label">\ud50c\ub85c\uc6b0</h4><p class="detail-text">' + project.flow + '</p></div>' +
      '<div class="detail-section"><h4 class="detail-label">\uc0ac\uc6a9 \uae30\uc220</h4><div class="detail-tags">' + tagsHTML + '</div></div>' +
      '<div class="detail-section"><h4 class="detail-label">\uc8fc\uc694 \uae30\ub2a5</h4><ul class="detail-list">' + featuresHTML + '</ul></div>' +
      extraHTML + retroHTML +
      '</div>' +
      '<div class="detail-actions">' + actionsHTML + '</div>';
  }

  var detailPanel = document.createElement('div');
  detailPanel.className = 'detail-panel';
  detailPanel.style.display = 'none';
  var projectList = document.querySelector('.project-list');
  if (projectList) projectList.after(detailPanel);

  function hideDetailPanel() {
    detailPanel.style.display = 'none';
    detailPanel.innerHTML = '';
    delete detailPanel.dataset.current;
  }

  function openDetail(key) {
    var project = PROJECTS[key];
    if (!project) return;

    detailPanel.innerHTML = buildDetailHTML(project) +
      '<div class="iframe-container" style="display:none;"><iframe id="game-iframe" width="100%" height="700" frameborder="0" allowfullscreen></iframe><button class="iframe-close">\u2715 Close Game</button></div>' +
      '<button class="detail-close">\u2190 Back to Projects</button>';
    detailPanel.style.display = 'block';

    var closeBtn = detailPanel.querySelector('.detail-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        hideDetailPanel();
        setActiveSubitem(null);
      });
    }

    var iframeWrap = detailPanel.querySelector('.iframe-container');
    var iframeBtn = detailPanel.querySelector('.iframe-close');
    if (iframeBtn && iframeWrap) {
      iframeBtn.addEventListener('click', function() {
        iframeWrap.style.display = 'none';
        var gi3 = document.getElementById('game-iframe');
        if (gi3) gi3.src = '';
      });
    }

    var demoBtn = detailPanel.querySelector('.btn-web');
    if (demoBtn && GAME_EMBEDS[key]) {
      var embed = GAME_EMBEDS[key];
      demoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var gi4 = document.getElementById('game-iframe');
        if (gi4) gi4.src = embed.src;
        var iw = detailPanel.querySelector('.iframe-container');
        if (iw) { iw.style.display = 'block'; iw.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    }

    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== RESEARCH DETAIL PANEL =====
  function buildResearchDetailHTML(research) {
    var tagsHTML = research.tags.map(function(t) { return '<span class="detail-tag">' + t + '</span>'; }).join('');
    var featuresHTML = research.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');

    var heroHTML = '';
    if (research.heroImage) {
      heroHTML = '<div class="detail-hero"><img src="' + research.heroImage + '" alt="' + research.title + '" style="max-width:100%;border-radius:12px;border:2px solid #1e293b;"></div>';
    }

    var extraHTML = '';
    if (research.extraSections) {
      research.extraSections.forEach(function(section) {
        var itemsHTML = section.items.map(function(item) { return '<li>' + item + '</li>'; }).join('');
        extraHTML += '<div class="detail-section"><h4 class="detail-label">' + section.label + '</h4><ul class="detail-list">' + itemsHTML + '</ul></div>';
      });
    }

    var actionsHTML = '';
    if (research.actions && research.actions.length > 0) {
      actionsHTML = '<div class="detail-actions">' + research.actions.map(function(a) {
        var target = a.external ? ' target="_blank"' : '';
        return '<a href="' + a.url + '"' + target + ' class="detail-btn ' + (a.class || 'btn-web') + '">' + a.label + '</a>';
      }).join('') + '</div>';
    }

    return '<div class="detail-header">' +
      '<div class="detail-title-area"><h2 class="detail-title">' + research.title + '</h2><p class="detail-subtitle">' + research.subtitle + '</p></div>' +
      '</div>' +
      '<div class="detail-body">' +
      heroHTML +
      '<div class="detail-section"><h4 class="detail-label">\uc124\uba85</h4><p class="detail-text">' + research.desc + '</p></div>' +
      '<div class="detail-section"><h4 class="detail-label">\ud50c\ub85c\uc6b0</h4><p class="detail-text">' + research.flow + '</p></div>' +
      '<div class="detail-section"><h4 class="detail-label">\uc0ac\uc6a9 \uae30\uc220</h4><div class="detail-tags">' + tagsHTML + '</div></div>' +
      '<div class="detail-section"><h4 class="detail-label">\uc8fc\uc694 \ub0b4\uc6a9</h4><ul class="detail-list">' + featuresHTML + '</ul></div>' +
      extraHTML +
      '</div>' + actionsHTML;
  }

  var researchDetailPanel = document.createElement('div');
  researchDetailPanel.className = 'detail-panel';
  researchDetailPanel.style.display = 'none';
  var researchList = document.getElementById('research-list');
  if (researchList) researchList.after(researchDetailPanel);

  function hideResearchDetail() {
    researchDetailPanel.style.display = 'none';
    researchDetailPanel.innerHTML = '';
    delete researchDetailPanel.dataset.current;
  }

  function openResearchDetail(key) {
    var research = RESEARCH[key];
    if (!research) return;

    researchDetailPanel.innerHTML = buildResearchDetailHTML(research) +
      '<div class="iframe-container" style="display:none;"><iframe id="research-iframe" width="100%" height="700" frameborder="0" allowfullscreen></iframe><button class="iframe-close">\u2715 Close</button></div>' +
      '<button class="detail-close">\u2190 Back to Research</button>';
    researchDetailPanel.style.display = 'block';

    var closeBtn = researchDetailPanel.querySelector('.detail-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        hideResearchDetail();
        setActiveSubitem(null);
      });
    }

    // Iframe close button
    var iframeWrap = researchDetailPanel.querySelector('.iframe-container');
    var iframeBtn = researchDetailPanel.querySelector('.iframe-close');
    if (iframeBtn && iframeWrap) {
      iframeBtn.addEventListener('click', function() {
        iframeWrap.style.display = 'none';
        var gi = document.getElementById('research-iframe');
        if (gi) gi.src = '';
      });
    }

    // V1 button → RESEARCH_EMBEDS[key]
    var btnV1 = researchDetailPanel.querySelector('.btn-web');
    if (btnV1 && RESEARCH_EMBEDS[key]) {
      btnV1.addEventListener('click', function(e) {
        e.preventDefault();
        var gi = document.getElementById('research-iframe');
        if (gi) gi.src = RESEARCH_EMBEDS[key].src;
        var iw = researchDetailPanel.querySelector('.iframe-container');
        if (iw) { iw.style.display = 'block'; iw.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    }

    // V2 button → RESEARCH_EMBEDS[key + '-v2']
    var btnV2 = researchDetailPanel.querySelector('.btn-web-v2');
    if (btnV2 && RESEARCH_EMBEDS[key + '-v2']) {
      btnV2.addEventListener('click', function(e) {
        e.preventDefault();
        var gi = document.getElementById('research-iframe');
        if (gi) gi.src = RESEARCH_EMBEDS[key + '-v2'].src;
        var iw = researchDetailPanel.querySelector('.iframe-container');
        if (iw) { iw.style.display = 'block'; iw.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    }

    researchDetailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== SIDEBAR SUB-ITEM → OPEN DETAIL =====
  document.querySelectorAll('.nav-subitem[data-project]').forEach(function(item) {
    item.addEventListener('click', function() {
      var key = item.dataset.project;
      setActiveCategory('project');
      setActiveSubitem(key);

      var projectItem = document.querySelector('.project-item[data-project="' + key + '"]');
      if (projectItem) {
        projectItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { openDetail(key); }, 300);
      } else {
        openDetail(key);
      }
    });
  });

  // ===== PROJECT LIST ITEMS → OPEN DETAIL =====
  document.querySelectorAll('.project-item[data-project]').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var key = item.dataset.project;

      if (detailPanel.style.display === 'block' && detailPanel.dataset.current === key) {
        hideDetailPanel();
        setActiveSubitem(null);
        delete detailPanel.dataset.current;
        return;
      }

      detailPanel.dataset.current = key;
      setActiveSubitem(key);
      openDetail(key);
    });
  });

  // ===== SIDEBAR RESEARCH → OPEN DETAIL =====
  document.querySelectorAll('.nav-subitem[data-research]').forEach(function(item) {
    item.addEventListener('click', function() {
      var key = item.dataset.research;
      setActiveCategory('research');
      setActiveSubitem(key);

      var researchItem = document.querySelector('.research-item[data-research="' + key + '"]');
      if (researchItem) {
        researchItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { openResearchDetail(key); }, 300);
      } else {
        openResearchDetail(key);
      }
    });
  });

  // ===== RESEARCH LIST ITEMS → OPEN DETAIL =====
  document.querySelectorAll('.research-item[data-research]').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var key = item.dataset.research;

      if (researchDetailPanel.style.display === 'block' && researchDetailPanel.dataset.current === key) {
        hideResearchDetail();
        setActiveSubitem(null);
        delete researchDetailPanel.dataset.current;
        return;
      }

      researchDetailPanel.dataset.current = key;
      setActiveSubitem(key);
      openResearchDetail(key);
    });
  });

})();
