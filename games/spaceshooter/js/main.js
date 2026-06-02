// Space Shooter — Main Game
// 탑뷰 2D 우주선 슈팅 (드래곤 플라이트 스타일)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 720;

// 게임 상태
const STATE = {
    MENU: 'menu',
    SHIP_SELECT: 'ship_select',
    PLAYING: 'playing',
    UPGRADE: 'upgrade',
    GAME_OVER: 'game_over',
};

let gameState = STATE.MENU;
let gameLoopId = null;
let lastTimestamp = 0;

// 플레이어
let player = null;
let selectedShipIndex = 0;

// 탄막
let bulletManager = null;
let fireCooldown = 0;

// 적
let enemyManager = null;

// 점수 / 웨이브
let score = 0;
let currentWave = 1;
let waveClearTimer = 0;

// 업그레이드
let upgradeOptions = [];
let selectedUpgradeIndex = 0;

// 키 상태
const keys = {};

// ========== 업그레이드 풀 ==========
const UPGRADE_POOL = [
    { id: 'atk_up',      name: 'ATK UP',       desc: '공격력 +5',           icon: '⚔️', apply: (p) => { p.bulletDmg += 5; } },
    { id: 'atk_up2',     name: 'ATK UP+',      desc: '공격력 +10',          icon: '💥', apply: (p) => { p.bulletDmg += 10; } },
    { id: 'fire_rate',   name: 'RAPID FIRE',   desc: '연사속도 20% 증가',   icon: '🔥', apply: (p) => { p.fireRate *= 0.8; } },
    { id: 'speed_up',    name: 'SPEED UP',     desc: '이동속도 +40',        icon: '💨', apply: (p) => { p.speed += 40; } },
    { id: 'hp_up',       name: 'HP MAX UP',    desc: '최대 체력 +20',       icon: '❤️', apply: (p) => { p.maxHp += 20; p.hp = Math.min(p.hp + 20, p.maxHp); } },
    { id: 'hp_restore',  name: 'REPAIR',       desc: '체력 완전 회복',      icon: '💚', apply: (p) => { p.hp = p.maxHp; } },
    { id: 'spread',      name: 'SPREAD SHOT',  desc: '3방향 확산탄',        icon: '✨', apply: (p) => { p.spreadShot = true; } },
    { id: 'shield',      name: 'SHIELD',       desc: '1회 피해 무효화',     icon: '🛡️', apply: (p) => { p.hasShield = true; } },
];

// ========== 초기화 ==========
function init() {
    console.log('Space Shooter initialized');
    starfield = new Starfield();
    gameState = STATE.MENU;
    lastTimestamp = performance.now();
    if (!gameLoopId) {
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

// ========== 게임 루프 ==========
function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starfield.update(dt);
    starfield.draw(ctx);

    switch (gameState) {
        case STATE.MENU:       drawMenu(); break;
        case STATE.SHIP_SELECT: drawShipSelect(); break;
        case STATE.PLAYING:     updatePlaying(dt); drawPlaying(); break;
        case STATE.UPGRADE:     drawUpgrade(); break;
        case STATE.GAME_OVER:   drawGameOver(); break;
    }

    gameLoopId = requestAnimationFrame(gameLoop);
}

// ========== 메뉴 ==========
function drawMenu() {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '32px "Courier New", monospace';
    ctx.fillStyle = '#00ffff';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 20;
    ctx.fillText('SPACE SHOOTER', canvas.width / 2, 280);

    ctx.font = '16px "Courier New", monospace';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Press ENTER to Start', canvas.width / 2, 400);
    ctx.shadowBlur = 0;

    const highScore = localStorage.getItem('spaceShooter_highScore') || 0;
    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 5;
    ctx.fillText(`HIGH SCORE: ${highScore}`, canvas.width / 2, 460);

    ctx.font = '11px "Courier New", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('← → to move  |  Auto Fire', canvas.width / 2, 520);
    ctx.shadowBlur = 0;
    ctx.restore();
}

// ========== 우주선 선택 ==========
function drawShipSelect() {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillStyle = '#00ffff';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.fillText('SELECT YOUR SHIP', canvas.width / 2, 80);
    ctx.shadowBlur = 0;

    const shipTypeKeys = Object.keys(SHIP_TYPES);
    const shipWidth = 90;
    const startX = canvas.width / 2 - (shipTypeKeys.length * shipWidth) / 2 + shipWidth / 2;

    for (let i = 0; i < shipTypeKeys.length; i++) {
        const type = SHIP_TYPES[shipTypeKeys[i]];
        const sx = startX + i * shipWidth;
        const sy = 200;
        const isSelected = i === selectedShipIndex;

        ctx.fillStyle = isSelected ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255,255,255,0.03)';
        ctx.strokeStyle = isSelected ? '#00ffff' : 'rgba(255,255,255,0.2)';
        ctx.shadowColor = isSelected ? '#00ffff' : 'transparent';
        ctx.shadowBlur = isSelected ? 15 : 0;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(sx - 40, sy - 70, 80, 140, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(0.6, 0.6);
        drawShipPreview(type);
        ctx.restore();

        ctx.font = '11px "Courier New", monospace';
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)';
        ctx.fillText(type.label, sx, sy + 55);
        ctx.font = '8px "Courier New", monospace';
        ctx.fillStyle = isSelected ? `rgba(${type.color.r},${type.color.g},${type.color.b},1)` : 'rgba(255,255,255,0.3)';
        ctx.fillText(type.desc, sx, sy + 72);
    }

    const selectedType = SHIP_TYPES[shipTypeKeys[selectedShipIndex]];
    ctx.font = '11px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('STATS', canvas.width / 2, 345);
    ctx.font = '10px "Courier New", monospace';
    const stats = [
        { label: 'SPD', value: selectedType.speed, color: '#ffff00' },
        { label: 'HP', value: selectedType.hp, color: '#00ff64' },
        { label: 'ATK', value: selectedType.bulletDmg, color: '#ff3250' },
        { label: 'RATE', value: (1 / selectedType.fireRate).toFixed(1) + '/s', color: '#00ffff' },
    ];
    stats.forEach((stat, idx) => {
        ctx.fillStyle = stat.color;
        ctx.fillText(`${stat.label}: ${stat.value}`, startX + idx * shipWidth, 370);
    });

    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.fillText('← → to choose  |  ENTER to confirm', canvas.width / 2, 450);
    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawShipPreview(type) {
    const s = type.size;
    const r = type.color.r, g = type.color.g, b = type.color.b;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.7, s * 0.5);
    ctx.lineTo(s * 0.5, s * 0.7);
    ctx.lineTo(s * 0.35, s * 0.8);
    ctx.lineTo(0, s * 0.65);
    ctx.lineTo(-s * 0.35, s * 0.8);
    ctx.lineTo(-s * 0.5, s * 0.7);
    ctx.lineTo(-s * 0.7, s * 0.5);
    ctx.closePath();
    const bodyGrad = ctx.createLinearGradient(0, -s, 0, s);
    bodyGrad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
    bodyGrad.addColorStop(1, `rgba(${Math.floor(r*0.4)},${Math.floor(g*0.4)},${Math.floor(b*0.4)},0.6)`);
    ctx.fillStyle = bodyGrad;
    ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `rgba(${r},${g},${b},0.8)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.3, s * 0.7);
    ctx.lineTo(0, s * 1.0);
    ctx.lineTo(s * 0.3, s * 0.7);
    ctx.closePath();
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`;
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.shadowBlur = 0;
}

// ========== 플레이 중 ==========
function updatePlaying(dt) {
    if (!player) return;

    player.update(dt, keys);

    // 오토샷
    fireCooldown -= dt;
    if (fireCooldown <= 0 && bulletManager) {
        bulletManager.fire(player.x, player.y - player.size, player.bulletDmg, player.color);
        // 확산탄
        if (player.spreadShot) {
            bulletManager.fire(player.x - 8, player.y - player.size + 5, player.bulletDmg * 0.7, player.color);
            bulletManager.fire(player.x + 8, player.y - player.size + 5, player.bulletDmg * 0.7, player.color);
        }
        fireCooldown = player.fireRate;
    }

    if (bulletManager) bulletManager.update(dt);
    if (enemyManager) enemyManager.update(dt, player.x);

    // 충돌: 총알 vs 적
    if (bulletManager && enemyManager) {
        const gained = processBulletEnemyCollisions(bulletManager, enemyManager);
        if (gained > 0) {
            score += gained;
            document.getElementById('score').textContent = score;
        }
    }

    // 충돌: 적 vs 플레이어
    if (enemyManager && player) {
        const isDead = processEnemyPlayerCollisions(enemyManager, player);
        if (isDead) {
            saveHighScore();
            gameState = STATE.GAME_OVER;
            return;
        }
    }

    // 웨이브 클리어 체크
    if (enemyManager && enemyManager.getEnemies().length === 0 && enemyManager.allSpawned()) {
        waveClearTimer += dt;
        if (waveClearTimer > 1.0) {
            // 웨이브 클리어! → 업그레이드 화면으로
            generateUpgrades();
            gameState = STATE.UPGRADE;
            waveClearTimer = 0;
        }
    } else {
        waveClearTimer = 0;
    }

    document.getElementById('hp').textContent = player.hp;
    document.getElementById('stage').textContent = currentWave;
}

function drawPlaying() {
    if (bulletManager) bulletManager.draw(ctx);
    if (enemyManager) enemyManager.draw(ctx);
    if (player) player.draw(ctx);

    // 웨이브 클리어 임박 표시
    if (waveClearTimer > 0.3) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '18px "Courier New", monospace';
        ctx.fillStyle = '#00ff00';
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        ctx.fillText('WAVE CLEAR!', canvas.width / 2, canvas.height / 2 - 40);
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

// ========== 업그레이드 화면 ==========
function generateUpgrades() {
    const pool = [...UPGRADE_POOL];
    // 셔플 후 3개 선택
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    upgradeOptions = pool.slice(0, 3);
    selectedUpgradeIndex = 0;
}

function drawUpgrade() {
    ctx.save();
    ctx.textAlign = 'center';

    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 15;
    ctx.fillText('⚡ UPGRADE ⚡', canvas.width / 2, 90);
    ctx.shadowBlur = 0;

    ctx.font = '15px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Choose one upgrade (1 / 2 / 3)', canvas.width / 2, 125);

    const cardH = 170;
    const cardW = 145;
    const gap = 15;
    const totalW = upgradeOptions.length * cardW + (upgradeOptions.length - 1) * gap;
    const startX = canvas.width / 2 - totalW / 2 + cardW / 2;
    const cardY = 300;

    for (let i = 0; i < upgradeOptions.length; i++) {
        const opt = upgradeOptions[i];
        const sx = startX + i * (cardW + gap);
        const isSelected = i === selectedUpgradeIndex;

        ctx.fillStyle = isSelected ? 'rgba(0, 255, 255, 0.12)' : 'rgba(255,255,255,0.04)';
        ctx.strokeStyle = isSelected ? '#00ffff' : 'rgba(255,255,255,0.2)';
        ctx.shadowColor = isSelected ? '#00ffff' : 'transparent';
        ctx.shadowBlur = isSelected ? 15 : 0;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(sx - cardW/2, cardY - cardH/2, cardW, cardH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 아이콘
        ctx.font = '38px serif';
        ctx.fillText(opt.icon, sx, cardY - 40);

        // 이름
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(opt.name, sx, cardY + 15);

        // 설명
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText(opt.desc, sx, cardY + 40);

        // 키 힌트
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillStyle = isSelected ? '#00ffff' : 'rgba(255,255,255,0.3)';
        ctx.fillText(`[${i + 1}]`, sx, cardY + 65);
    }

    ctx.restore();
}

function applyUpgrade(index) {
    if (index >= 0 && index < upgradeOptions.length) {
        upgradeOptions[index].apply(player);
    }
    // HP UI 갱신
    document.getElementById('hp').textContent = player.hp;

    // 다음 웨이브
    currentWave++;
    enemyManager.setWave(currentWave);
    waveClearTimer = 0;
    gameState = STATE.PLAYING;
}

// ========== 게임 오버 ==========
function drawGameOver() {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '28px "Courier New", monospace';
    ctx.fillStyle = '#ff0055';
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 20;
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = '16px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(`Wave: ${currentWave}`, canvas.width / 2, canvas.height / 2 + 35);

    ctx.font = '12px "Courier New", monospace';
    ctx.fillText('Press ENTER to Restart', canvas.width / 2, canvas.height / 2 + 75);
    ctx.shadowBlur = 0;
    ctx.restore();
}

function saveHighScore() {
    const prev = parseInt(localStorage.getItem('spaceShooter_highScore') || '0');
    if (score > prev) {
        localStorage.setItem('spaceShooter_highScore', score);
    }
}

// ========== 게임 시작 ==========
function startGame() {
    const shipTypeKeys = Object.keys(SHIP_TYPES);
    const selectedType = SHIP_TYPES[shipTypeKeys[selectedShipIndex]];
    player = new PlayerShip(selectedType);
    bulletManager = new BulletManager();
    enemyManager = new EnemyManager();
    fireCooldown = 0;
    score = 0;
    currentWave = 1;
    waveClearTimer = 0;
    enemyManager.setWave(1);
    document.getElementById('hp').textContent = player.hp;
    document.getElementById('score').textContent = '0';
    document.getElementById('stage').textContent = '1';
    gameState = STATE.PLAYING;
}

// ========== 키 입력 ==========
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    switch (gameState) {
        case STATE.MENU:
            if (e.key === 'Enter') gameState = STATE.SHIP_SELECT;
            break;

        case STATE.SHIP_SELECT:
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')
                selectedShipIndex = (selectedShipIndex - 1 + Object.keys(SHIP_TYPES).length) % Object.keys(SHIP_TYPES).length;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')
                selectedShipIndex = (selectedShipIndex + 1) % Object.keys(SHIP_TYPES).length;
            if (e.key === 'Enter') startGame();
            break;

        case STATE.UPGRADE:
            if (e.key === '1') applyUpgrade(0);
            if (e.key === '2') applyUpgrade(1);
            if (e.key === '3') applyUpgrade(2);
            if (e.key === 'ArrowLeft') selectedUpgradeIndex = (selectedUpgradeIndex - 1 + 3) % 3;
            if (e.key === 'ArrowRight') selectedUpgradeIndex = (selectedUpgradeIndex + 1) % 3;
            if (e.key === 'Enter') applyUpgrade(selectedUpgradeIndex);
            break;

        case STATE.GAME_OVER:
            if (e.key === 'Enter') {
                gameState = STATE.MENU;
                player = null;
            }
            break;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

init();
