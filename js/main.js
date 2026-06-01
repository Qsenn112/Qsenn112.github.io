document.addEventListener('DOMContentLoaded', () => {

  // ===== PROJECT DATA =====
  const PROJECTS = {
    ovumrumble: {
      thumb: 'O',
      thumbClass: 'thumb-ovum-lg',
      title: 'Ovum-Rumble',
      subtitle: 'Team Project · 2D Action · URP',
      desc: '계란 캐릭터가 전장을 누비는 팀 기반 2D 액션 게임. 유니티 URP 환경에서 셰이더 및 플레이어 컨트롤 시스템을 담당하여 팀 프로젝트로 개발 중입니다.',
      flow: '캐릭터 선택 → 스테이지 진입 → 전투(공격/회피/스킬) → 보스 처치 → 다음 스테이지',
      tags: ['Unity', 'C#', 'URP', 'Shader', 'Team Project'],
      features: [
        'URP 셰이더 — 계란 캐릭터 전용 Toon 셰이더 및 이펙트 구현',
        '플레이어 컨트롤 — Rigidbody2D 기반 이동, 점프, 대시, 공격 콤보 시스템',
        '팀 협업 — Git으로 버전 관리, PR 리뷰, 씬 머지 충돌 최소화',
        '2D 액션 — 피격 판정, 무적 프레임, 넉백, 피드백 이펙트'
      ],
      actions: [{ label: 'Go to GitHub', class: 'btn-web', url: 'https://github.com/BomB1961/Ovum-Rumble', external: true }]
    },

    jumprace: {
      thumb: 'J',
      thumbClass: 'thumb-jump-lg',
      title: '2D 점프 레이싱',
      subtitle: '2D · Arcade · Godot',
      desc: '스페이스바로 점프하는 2D 레이싱 게임. 장애물 회피 및 콤보 점수 시스템 구현.',
      flow: '게임 시작 → 자동 전진 → 스페이스바 점프 → 장애물 회피 → 콤보 점수 → 게임 오버',
      tags: ['Godot', 'GDScript', '2D', 'Arcade'],
      features: [
        '원터치 조작 — 스페이스바/터치 한 번으로 점프',
        '장애물 — 나무, 바위, 구덩이 등 다양한 패턴',
        '콤보 시스템 — 연속 장애물 회피 시 점수 배율 상승',
        '점수판 — 로컬 최고 점수 저장'
      ],
      actions: [{ label: '🎮 플레이하기', class: 'btn-web', url: '#', external: false }]
    },
    golgol: {
      thumb: 'G',
      thumbClass: 'thumb-golgol-lg',
      title: 'GolGol',
      subtitle: '2D · Story',
      desc: '2D 스토리 어드벤처 게임. 플레이어는 기억을 잃은 주인공이 되어 3개의 스테이지(지옥도·인간도·천상도)를 탐험하고, 전투와 기억 조각 수집을 통해 과거의 진실을 밝혀내는 스토리입니다.',
      flow: '스테이지 진입 → 탐험 (이동/점프/회피) → 전투 (HellGuard) → 기억 조각 수집 → 스테이지 전환 → 엔딩',
      tags: ['Unity 6', 'C#', 'DI Container', 'EventBus', 'ScriptableObject', 'Excel ↔ SO', 'Rigidbody2D', 'FSM'],
      features: [
        '전투 — HellGuard FSM (Idle→Patrol→Chase→Attack→Hurt→Dead), OverlapCircleAll 히트판정',
        '이동 — WASD + 점프(Space) + 앉기(Ctrl), Rigidbody2D 기반',
        '기억 조각 — 3D 플로팅+펄스 이펙트, TimeScale 0 플래시백 연출, HashSet 수집 추적',
        '스테이지 — 4개 MVP 스테이지(뼈무덤/지옥도/인간도/천상도), Portal+Boundary 전환',
        '엔딩 — 4단계 시퀀스 (기억 슬라이드→계시→정체성 마주→마무리)'
      ],
      extraSections: [
        {
          label: '아키텍처',
          items: [
            'PlayerController 오케스트레이션 — Movement·Combat·Health·Animation 4개 하위 컴포넌트 조율',
            'Interface 계층 — IDamageable, IEnemy, IGameService, IMemoryService, IData',
            'EventBus — 14개 이벤트로 컴포넌트 간 느슨한 결합, 발행/구독 패턴',
            'DI Container — 인프라 구축, CameraFollow Resolve에 사용',
            'Static Singleton — PlayerHealth, StageTransitionManager 등 핵심 객체'
          ]
        },
        {
          label: '성능 최적화',
          items: [
            'StageActivator — 비활성 스테이지 GameObjects SetActive(false)로 렉 방지',
            'MemoryFragmentDataCache — Resources 폴더 비동기 로드',
            'Bootstrap 부트 시퀀스 — Execution Order -1000, DontDestroyOnLoad 싱글톤'
          ]
        },
        {
          label: '데이터 시스템',
          items: [
            'Excel (OleDb) → ScriptableObject (GameData.asset) — ExcelAutoConverter 자동 변환',
            'StageData, EnemyData, PlayerData, MemoryFragmentData 4종 시트',
            '런타임 SO 에셋 — EnemyDataSO, MemoryFragmentDataSO, IntroStoryDataSO, EndingSlideDataSO'
          ]
        },
        {
          label: '씬 구조',
          items: [
            'Boot (진입점/분기) → Intro (인트로) → MainMenuScene → Game (메인) → GameOver / Ending',
            'PlayerPrefs로 첫 실행 여부 확인 → Intro 스킵'
          ]
        }
      ],
      retrospective: '<p>해당 프로젝트의 배경 이미지와 기억의 조각은 AI를 활용해 제작했다. 기억의 조각은 큰 문제 없이 제작할 수 있었지만, 배경 이미지 제작 과정에서는 시행착오가 많았다.</p>' +
        '<p>우선 ChatGPT를 활용해 원하는 이미지 스타일의 프롬프트를 제작한 뒤, Freepik을 통해 실제 이미지를 생성했다. 에셋 제작 과정 자체는 이전 프로젝트인 "Pumpumkin"의 워크플로우와 비슷했지만, 가장 큰 차이점은 DownScale 작업이 필요했다는 점이다.</p>' +
        '<p>AI로 생성된 이미지들은 크기가 일정하지 않았기 때문에, Unity 프로젝트에서 사용하기 위해 원하는 해상도인 1920x1080으로 강제 다운스케일 작업을 진행했다. UI 버튼 역시 원하는 스타일의 기준 이미지를 먼저 제작한 뒤, Google Flow를 활용해 동일한 스타일의 버튼들을 생성했다.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">🎬 애니메이션 작업</h5>' +
        '<p>해당 프로젝트에서 가장 어려웠던 부분은 애니메이션 작업이었다. 평소 고민이던 "에셋 스타일 통일" 문제는 AI를 활용해 어느 정도 해결할 수 있었지만, 애니메이션 제작 과정에서 새로운 문제가 발생했다.</p>' +
        '<p>주인공 "골골"의 에셋이 내가 구상했던 사이드뷰용이 아니라 탑뷰용 스프라이트 시트로 제작된 것이다. 처음에는 AI에게 "에셋 안의 스프라이트 시트를 잘라 애니메이션까지 적용된 캐릭터 데이터를 만들어 줘"와 같이 요청했지만, 계속해서 탑뷰 이미지 한 장이 사이에 참조되는 문제가 발생했다.</p>' +
        '<p>결국 스프라이트 시트 내부의 프레임을 직접 번호로 지정하는 방식으로 작업을 진행했다. 예를 들어, "왼쪽부터 1번~마지막 번호까지 사용", "3번 프레임은 제외", "애니메이션 이름은 Jump"와 같이 세부적으로 지시해 애니메이션을 제작했다.</p>' +
        '<p>애니메이션 제작 이후에도 문제가 발생했다. 골골이 점프 중 공격할 경우 Animator의 <code>IsJumping</code> 플래그가 유지되어 공중 공격 애니메이션이 정상적으로 재생되지 않았다. 이 문제는 공격 트리거 직전에 <code>IsJumping</code> 값을 강제로 <code>false</code>로 변경한 뒤, <code>SmartCoroutine</code>을 사용해 한 프레임 이후 원래 값으로 복구하는 방식으로 해결했다.</p>' +
        '<p>적 보스 몬스터들 역시 같은 방식으로 스프라이트 프레임을 정확하게 지정하고 애니메이션 이름을 직접 부여해 제작했다.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">🧠 적 AI — 낭떠러지 추락 방지</h5>' +
        '<p>두 번째로 어려웠던 부분은 적 AI의 낭떠러지 추락 방지 시스템이었다. 적 오브젝트들이 순찰하거나 플레이어를 추격할 때 낭떠러지로 떨어져 즉사하는 문제가 발생했다. 이를 해결하기 위해 Raycast 기반의 엣지 감지 시스템을 구현했다.</p>' +
        '<p><strong>1단계 — Center Raycast:</strong> 먼저 적 오브젝트의 중앙에서 아래 방향으로 Raycast를 발사해 현재 지면 위에 있는지를 확인했다. 만약 바닥이 감지되지 않는다면(점프 중이거나 공중 상태라고 판단) 엣지 체크 자체를 수행하지 않고 <code>false</code>를 반환하도록 설계했다. 이를 통해 적이 지상 상태일 때만 엣지 감지가 동작하도록 안전 장치를 구성했다.</p>' +
        '<p><strong>2단계 — Edge Raycast:</strong> 그 다음 적이 바라보는 방향으로 일정 거리만큼 오프셋을 적용한 뒤, 해당 위치에서 아래 방향으로 다시 Raycast를 발사했다. 만약 이 Raycast가 바닥을 감지하지 못한다면, 해당 방향에 지형이 존재하지 않는다고 판단해 이동을 차단하도록 구현했다. 이를 통해 적 AI가 낭떠러지로 떨어지는 문제를 방지할 수 있었다.</p>' +
        '<p>하지만 문제를 해결하자 또 다른 문제가 발생했다. 가장 자주 등장하는 일반 몬스터인 "HellGuard"의 애니메이션이 Raycast 판정 과정에서 지속적으로 깜빡이는 현상이 발생한 것이다.</p>' +
        '<br>' +
        '<p>첫 프로젝트였기 때문에 욕심이 많이 들어갔다. 실력에 비해 구현 범위를 크게 잡았고, 결국 구현하지 못한 시스템들도 많았다. 실제로 완성된 것은 컷씬과 AI를 활용한 에셋 제작 시스템이 대부분이었다.</p>' +
        '<p>특히 기억의 조각을 획득한 뒤 컷씬이 재생되는 연출을 만들면서 많은 것을 느꼈다. 처음에는 컷씬이 실행되면 단순히 게임만 멈추면 된다고 생각했지만, 실제로는 작은 디테일 하나까지 고려하며 게임을 설계해야 한다는 점을 깨달았다.</p>' +
        '<p>이번 프로젝트를 통해 스스로 부족한 부분을 많이 느꼈다. 동시에 평소 단순히 즐기기만 했던 게임들이 실제로는 얼마나 많은 노력과 디테일 위에서 만들어지는지 알 수 있었고, 이를 구현하는 게임 개발자들에 대한 존경심도 크게 생겼다.</p>',
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
      retrospective: '<p>업그레이드 버튼 디자인에서 처음엔 단순하게 레벨 1부터 레벨 max까지 나열 한 후 업그레이드가 완료된 레벨을 불투명처리 + 터치 불가로 처리를 했다. 그러나 막상 호박 아이콘과 사탕에 대한 디자인을 끝내고 나자 사탕 이미지는 107개가 넘어가 버리니 만약 플레이어가 사탕을 끝까지 업그레이드 시 스크롤을 너무 밑으로 내려야 한다는 단점이 발생했다. 그에 따른 오브젝트 107개를 소환하면서 렉도 발생했다.</p>' +
        '<p>선생님께서 오브젝트 풀링이라는 개념을 사용해 보라고 하셔서 적용했다. 나는 여기서 만족했었다. 반응 속도나 렉이 유의미하게 줄어들어 게임 플레이에 문제가 없는 수준이었다. 그렇지만 아직 플레이어가 107개의 레벨 칸을 직접 스크롤해서 업그레이드 해야 한다는 불편함은 해결 되지 않았다.</p>' +
        '<p>업그레이드 버튼에 대한 전체적인 디자인 재구성이 필요했다. 사탕 테마가 10개씩 11개로 이루어져 있었기 때문에 팝업 버튼을 11개로 나누고 레벨이 1오를 때마다 해당 버튼은 재사용하고 이미지와 텍스트를 다음 레벨 사탕으로 변경 해 10번 반복되고 해당 테마의 레벨을 올렸다면 회색처리 + 클릭 불가 처리했다. 이렇게 하니 플레이어가 직관적이고 스크롤 할 행동이 줄어 플레이 하기 편했다. 버튼에 대한 하나의 디자인도 사용자의 입장에서 생각하지 못했고 플레이어 입장을 먼저 생각해야 한다고 느꼈다.</p>' +
        '<br>' +
        '<p>사탕 이미지는 스타일 레퍼런스가 될 이미지를 한 장 준비하고 google flow, chat GPT, Freepeek을 통해서 제작했다. 구글 플로우는 생성 속도가 빠른 편이지만 모델이 나노바나나로 제한 됐고, 무엇보다 이미지 크기를 내가 제어할 수 없다는 단점이 있었다. 챗 지피티는 이미지 생성 기능이 다른 모델들보다 화질이 떨어지는 모습을 보여 이미지 생성 부분에서 제외했다. 프리픽은 다른 AI들보다 이미지의 비율과 크기를 내가 세밀하게 컨트롤할 수 있었다는 점과 화질 부분에서 선택했다.</p>' +
        '<p>워크 플로우를 정리하자면 다음과 같다.</p>' +
        '<ol>' +
        '<li>레퍼런스 이미지를 보내고 해당 스타일로 내가 원하는 테마의 사탕 프롬포트를 얻는다. (Ex) 마시멜로 분위기의 사탕)</li>' +
        '<li>프리픽에 해당 프롬포트를 보내고 원하는 이미지를 출력한다.</li>' +
        '<li>출력한 이미지를 가공하기 전 AI로 만든 이미지들(특히 픽셀)은 확대 해 보면 마감이 좋지가 않다.</li>' +
        '<li>3-1. Google AI Pixel Snapper Web을 제작 해 이미지를 넣고 픽셀을 최대한 깔끔하게 정리한다.</li>' +
        '<li>이미지를 얻은 후 해당 이미지의 배경을 유니티에 사용할 수 있도록 배경을 투명화한다.</li>' +
        '<li>투명화 한 배경을 Google AI Studio를 통해 제작한 스프라이트 자동 스플리터를 통해서 이미지를 자른다.</li>' +
        '</ol>' +
        '<p>위와 같은 과정을 통해서 필요한 사탕 에셋을 준비 했다.</p>' +
        '<br>' +
        '<p>아쉬웠던 점은 아직 픽셀 스냅퍼가 유료 서비스들에 비해 퀄리티가 떨어진다는 점이 아쉽다. 수정에 수정을 거듭했지만 한계가 뚜렸했다.</p>' +
        '<p>AI 이미지를 활용한 게임을 만들어 보고 싶어서 진행했던 프로젝트였다. 이미지의 퀄리티는 기술력의 한계로 인해 아쉬웠지만 AI를 어떻게 활용해야 하는지 워크플로우를 고민하고 실전에서 적용할 수 있는지 알 수 있었던 프로젝트였다.</p>',
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
        { label: '앱 다운로드 (APK)', class: 'btn-apk', url: 'https://github.com/tpgns3353-ctrl/tpgns3353-ctrl.github.io/releases/download/v1.0.0/todo-list.apk', external: true, download: true }
      ]
    },
    webnovel: {
      thumb: 'R',
      thumbClass: 'thumb-novel-lg',
      title: '붉은달의 밤',
      subtitle: 'Interactive Novel · Story · 9 Chapters',
      desc: 'AI 기반 인터랙티브 웹소설 시뮬레이터. 오빠의 죽음을 목격한 소녀 소라인이 복수를 위해 검사가 되었지만, 실종된 오빠를 찾는 여정 속에서 아버지가 흑마법으로 오빠의 몸을 조종하고 있음을 알게 되고, 복수와 가족애 사이에서 선택해야 하는 기로에 서는 이야기입니다.',
      flow: '제1장~제9장 · 선택지 분기 · 스탯 시스템 (체력/정신력/유대) · 다중 엔딩',
      tags: ['웹소설', '인터랙티브', '선택지 분기', '한국어', 'GitHub Pages'],
      features: [
        '총 9장 구성, 선택지에 따라 스토리 전개가 달라집니다',
        '체력·정신력·유대 스탯 시스템으로 플레이어의 선택이 반영됩니다',
        '붉은달의 밤 — "당신은 꿈을 위해 무엇까지 희생할 수 있는가?"',
        '로컬 저장 기능으로 이어서 읽기 가능'
      ],
      extraSections: [
        {
          label: 'GitHub',
          items: [
            '소스 코드: github.com/tpgns3353-ctrl/webnovel',
            '원본 프로젝트: AI 기반 CLI 시뮬레이터 (Maskweaver/OpenCode)'
          ]
        }
      ],
      retrospective: '<p>"붉은 달의 밤" 프로젝트는 AI 기반 채팅 시뮬레이션을 제작해 보자는 목표로 진행한 프로젝트였다. 전체 개발 과정에서 AI 도구를 적극적으로 활용했으며, 약 5시간 만에 프로토타입을 완성했다.</p>' +
        '<p>처음 프로젝트를 시작하며 가장 고민했던 부분은 다음과 같았다. "플레이어의 선택에 따라 대화 흐름과 스토리가 달라지는 AI 채팅 시뮬레이션을 어떻게 설계해야 할까?" 단순히 대사를 출력하는 수준이 아니라, 플레이어 선택에 따라 이야기 구조가 변화해야 했기 때문에 디자인과 기획 문서 설계에 많은 시간을 투자했다.</p>' +
        '<p>스토리를 관통하는 핵심 메시지는 <strong>"꿈을 위해 어디까지 할 수 있는가?"</strong>로 정했다. 베르세르크라는 작품을 보며 해당 주제를 게임으로 표현해 보고 싶다는 생각을 가지고 있었고, 이를 기반으로 세계관과 스토리를 구성했다.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">📋 OpenSpec 워크플로우</h5>' +
        '<p>방대한 스토리를 혼자 설계하는 것은 많은 시간이 필요했기 때문에 OpenSpec 워크플로우를 활용했다. OpenSpec은 <strong>기획 → 기획 문서 작성 → 적용 → 저장 → 수정</strong> 단계를 반복하며 프로젝트를 발전시키는 구조를 가지고 있었다.</p>' +
        '<p>초기 단계에서는 테마, 주인공, 기본 세계관, 스토리 배경 정도만 정의했고, 이후에는 워크플로우를 따라가며 내용을 구체화했다. 그 결과 세계관, 정치 체계, 지리와 역사, 주요 캐릭터 설정, 메인 스토리 흐름, 필수 장면 구성, 피하고 싶은 클리셰, 스토리를 자연스럽게 연결하는 조력자 캐릭터 등 내가 미처 고려하지 못했던 요소들까지 체계적으로 정리할 수 있었다.</p>' +
        '<p>특히 흥미로웠던 점은 선택지 분기 구조와 다중 엔딩, 그리고 체력·정신력·유대감 기반의 스탯 시스템까지 자연스럽게 설계 흐름에 포함되었다는 점이었다.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">🧪 테스트 과정 — Agent Session 시뮬레이터</h5>' +
        '<p>구현 이후 테스트는 Agent Session 기반 시뮬레이터를 제작해 진행했다. 기존 방식은 <strong>앱 빌드 → 테스트 → 오류 발견 → 수정 → 재빌드 → 재테스트</strong> 과정을 반복해야 했지만, Agent Session 기반 테스트 환경을 사용하면서 <strong>오류 발견 → 수정 → 즉시 재테스트 → 최종 빌드</strong> 형태로 개발 흐름을 단축할 수 있었다. 이를 통해 반복 빌드에 소모되는 시간과 비용을 크게 줄일 수 있었다.</p>' +
        '<h5 style="margin-top:1.2em;color:var(--accent-green);">📱 플랫폼별 입력 처리 문제</h5>' +
        '<p>앱 빌드 역시 AI와 협업하며 진행했다. 개발 과정에서 가장 어려웠던 부분 중 하나는 웹 환경과 APK(Android) 환경의 입력 방식 차이였다.</p>' +
        '<ul>' +
        '<li><strong>웹 버전:</strong> SpaceBar → 텍스트 스킵 / 다음 장면 진행, 숫자 키패드 → 선택지 선택</li>' +
        '<li><strong>APK 버전:</strong> 화면 터치 → 텍스트 스킵 / 다음 장면 진행 / 선택지 선택</li>' +
        '</ul>' +
        '<p>하지만 모바일 환경에서는 한 번의 터치 입력으로 텍스트 스킵과 다음 장면 이동이 동시에 실행되는 문제가 발생했다. 이를 해결하기 위해 터치 입력 이후 일정 시간 동안 추가 입력을 제한하는 입력 쿨다운(Input Cooldown) 구조를 적용했다.</p>' +
        '<br>' +
        '<p>이번 프로젝트를 통해 AI 도구를 활용한 빠른 프로토타이핑 역량을 키울 수 있었고, 기획부터 구현·테스트·배포까지의 전체 개발 흐름을 경험할 수 있었다. 또한 단순히 AI에게 결과물을 요청하는 것이 아니라, 문제를 정의하고 방향을 설계하며 AI와 협업하는 과정이 중요하다는 점을 배울 수 있었다.</p>',
      actions: [
        { label: '소설 읽기', class: 'btn-web', url: '/webnovel/', external: true },
        { label: '앱 다운로드 (APK)', class: 'btn-apk', url: 'https://github.com/tpgns3353-ctrl/tpgns3353-ctrl.github.io/releases/download/v1.0.0/red-moon-night.apk', external: true, download: true }
      ]
    },
    board: {
      thumb: 'B',
      thumbClass: 'thumb-board-lg',
      title: '게시판',
      subtitle: 'Web App · React · Supabase',
      desc: 'React + Supabase 기반 풀스택 게시판입니다. 회원가입/로그인, 게시글 CRUD, 대댓글, 카테고리 분류, 파일 첨부, 실시간 알림, 다크모드, 관리자 패널을 지원합니다.<br><br><em style="color: var(--accent-orange); font-size: 0.85rem;">※ Supabase 이메일 개수 제한으로 원활한 테스트를 위해 이메일 인증 기능은 비활성화 상태입니다.</em>',
      flow: '회원가입 → 로그인 → 게시글 작성(카테고리/파일첨부) → 댓글/대댓글 → 실시간 알림 수신 → 관리자는 전체 관리',
      tags: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind CSS 4', 'Supabase (PostgreSQL/Auth/Storage/Realtime)', 'Vercel'],
      features: [
        '인증 — 이메일 회원가입/로그인, 이메일 인증, 관리자·일반 사용자 권한 분리',
        '게시글 — CRUD, 카테고리 분류, 검색, 페이지네이션, 공지 고정, 파일 첨부(이미지 리사이징)',
        '댓글 — 대댓글(스레드) 지원, 작성자·관리자 삭제 가능',
        '실시간 알림 — 댓글/대댓글 작성 시 Supabase Realtime으로 즉시 푸시 (알림벨 + 토스트)',
        '사용자 설정 — 프로필 편집, 비밀번호 변경, 알림 on/off, 다크모드(계정별 DB 저장), 계정 탈퇴',
        '관리자 패널 — 대시보드 통계, 사용자 권한 관리, 게시글/댓글/카테고리 관리'
      ],
      extraSections: [
        {
          label: '아키텍처',
          items: [
            'SPA 구조 — React Router 기반 13개 라우트, ProtectedRoute로 접근 권한 제어',
            'Context API — AuthContext(인증), ThemeContext(테마), NotificationContext(알림) 전역 상태 관리',
            'Custom Hooks — usePosts, useComments, useCategories, useProfile로 DB 쿼리 캡슐화',
            'Supabase BaaS — 백엔드 서버 없이 PostgreSQL + Auth + Storage + Realtime 통합 활용'
          ]
        },
        {
          label: '보안',
          items: [
            'RLS (Row Level Security) — PostgreSQL 수준에서 테이블별 읽기/쓰기/삭제 권한 제어',
            'DB 트리거 — 회원가입 시 프로필 자동 생성, 댓글 작성 시 알림 자동 생성',
            'Soft Delete — 계정 탈퇴 시 닉네임을 "탈퇴한 사용자"로 변경, 게시글/댓글은 유지'
          ]
        }
      ],
      actions: [
        { label: '웹으로 방문', class: 'btn-web', url: 'https://bulletin-board-peach.vercel.app/', external: true }
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
      (project.retrospective ? (
        '<div class="detail-section retrospective-wrapper">' +
          '<button class="retrospective-toggle" onclick="this.nextElementSibling.classList.toggle(\'open\'); this.classList.toggle(\'active\');">' +
            '📝 프로젝트를 진행하며... <span class="toggle-arrow">▸</span>' +
          '</button>' +
          '<div class="retrospective-content">' + project.retrospective + '</div>' +
        '</div>'
      ) : '') +
    '</div>' +
    '<div class="detail-actions">' + actionsHTML + '</div>';
  }



  const GAME_EMBEDS = {

    jumprace: { src: '/games/jumprace/index.html', portrait: false },
    golgol: { src: 'https://itch.io/embed-upload/17035372?color=333333', portrait: false },
    pumpumkin: { src: 'https://itch.io/embed-upload/17699633?color=333333', portrait: true }
  };

  // ===== ACCORDION DETAIL =====
  const detailPanel = document.createElement('div');
  detailPanel.className = 'detail-panel';
  detailPanel.style.display = 'none';
  document.querySelector('.project-list').after(detailPanel);

  const iframeContainer = document.createElement('div');
  iframeContainer.className = 'iframe-container';
  iframeContainer.style.display = 'none';
  iframeContainer.innerHTML = '<iframe id="game-iframe" width="100%" height="700" frameborder="0" allowfullscreen></iframe><button class="iframe-close">✕ Close Game</button>';
  detailPanel.appendChild(iframeContainer);

  document.querySelector('.iframe-container .iframe-close').addEventListener('click', () => {
    iframeContainer.style.display = 'none';
    document.getElementById('game-iframe').src = '';
  });

  function openDetail(key) {
    const project = PROJECTS[key];
    if (!project) return;
    detailPanel.innerHTML = buildDetailHTML(project) +
      '<div class="iframe-container" style="display:none;"><iframe id="game-iframe" width="100%" height="700" frameborder="0" allowfullscreen></iframe><button class="iframe-close">✕ Close Game</button></div>' +
      '<button class="detail-close">← Back to Projects</button>';
    detailPanel.style.display = 'block';
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Re-bind close
    detailPanel.querySelector('.detail-close').addEventListener('click', () => {
      detailPanel.style.display = 'none';
      detailPanel.innerHTML = '';
    });

    // Re-bind iframe close
    const iframeWrap = detailPanel.querySelector('.iframe-container');
    const iframeBtn = detailPanel.querySelector('.iframe-close');
    if (iframeBtn) {
      iframeBtn.addEventListener('click', () => {
        iframeWrap.style.display = 'none';
        document.getElementById('game-iframe').src = '';
      });
    }

    // Bind demo button → iframe
    const demoBtn = detailPanel.querySelector('.btn-web');
    if (demoBtn && GAME_EMBEDS[key]) {
      const embed = GAME_EMBEDS[key];
      demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('game-iframe').src = embed.src;
        iframeWrap.style.display = 'block';
        iframeWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  document.querySelectorAll('.project-item[data-project]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const key = item.dataset.project;
      // If same panel already open, close it
      if (detailPanel.style.display === 'block' && detailPanel.dataset.current === key) {
        detailPanel.style.display = 'none';
        detailPanel.innerHTML = '';
        delete detailPanel.dataset.current;
        return;
      }
      detailPanel.dataset.current = key;
      openDetail(key);
    });
  });

});
