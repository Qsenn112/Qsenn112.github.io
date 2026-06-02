// Space Shooter — Enemy System
// 일반 적기 + 운석 + EnemyManager

// ========== 기본 Enemy 클래스 ==========
class Enemy {
    constructor(x, y, hp, speed, color, size) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.maxHp = hp;
        this.speed = speed;
        this.color = color;
        this.size = size || 15;
        this.alive = true;
        this.scoreValue = 10;
    }

    update(dt) {
        this.y += this.speed * dt;
        if (this.y > canvas.height + 50) {
            this.alive = false;
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.alive = false;
            return true; // destroyed
        }
        return false;
    }

    getBounds() {
        return {
            x: this.x - this.size,
            y: this.y - this.size,
            width: this.size * 2,
            height: this.size * 2,
        };
    }
}

// ========== 일반 적기 ==========
class EnemyShip extends Enemy {
    constructor(x, y, pattern = 'straight') {
        // 적기 색상 (레드/오렌지/퍼플 계열)
        const colors = [
            { r: 255, g: 50, b: 80 },    // red
            { r: 255, g: 120, b: 30 },   // orange
            { r: 200, g: 50, b: 200 },   // purple
            { r: 255, g: 200, b: 50 },   // gold
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const hp = 1;
        const speed = 80 + Math.random() * 120;
        const size = 14;

        super(x, y, hp, speed, color, size);

        this.pattern = pattern;
        this.wobbleAmp = pattern === 'zigzag' ? 80 + Math.random() * 60 : 0;
        this.wobbleFreq = 2 + Math.random() * 3;
        this.wobbleOffset = Math.random() * Math.PI * 2;
        this.timeAlive = 0;
        this.startX = x;

        // 점수
        this.scoreValue = 25;
        this.fireTimer = 0;
        this.fireInterval = 2.0; // 2초마다 발사
    }

    update(dt, playerX, playerY, manager) {
        this.timeAlive += dt;

        // 아래로 이동
        this.y += this.speed * dt;

        // 패턴 이동
        if (this.pattern === 'zigzag') {
            this.x = this.startX + Math.sin(this.timeAlive * this.wobbleFreq + this.wobbleOffset) * this.wobbleAmp;
        } else if (this.pattern === 'diagonal') {
            this.x += Math.sin(this.wobbleOffset) * 30 * dt;
        }

        // 화면 경계
        if (this.x < this.size) this.x = this.size;
        if (this.x > canvas.width - this.size) this.x = canvas.width - this.size;

        // 에너지탄 발사 (2초마다 방사형)
        this.fireTimer -= dt;
        if (this.fireTimer <= 0 && playerY !== undefined) {
            this.fireTimer = this.fireInterval;
            // 플레이어 방향으로 3방향 방사형 발사
            const baseAngle = Math.atan2(playerY - this.y, playerX - this.x);
            const spread = Math.PI / 6; // 30도 간격
            manager.addEnemyBullet(this.x, this.y, baseAngle);
            manager.addEnemyBullet(this.x, this.y, baseAngle - spread);
            manager.addEnemyBullet(this.x, this.y, baseAngle + spread);
        }

        // 화면 아래로 나감
        if (this.y > canvas.height + 50) {
            this.alive = false;
        }
    }

    draw(ctx) {
        const { r, g, b } = this.color;
        const s = this.size;

        ctx.save();
        ctx.translate(this.x, this.y);

        // 적기 본체 (역삼각형 — 아래로 향함)
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.lineTo(-s * 0.8, -s * 0.3);
        ctx.lineTo(-s * 0.5, -s * 0.6);
        ctx.lineTo(0, -s * 0.4);
        ctx.lineTo(s * 0.5, -s * 0.6);
        ctx.lineTo(s * 0.8, -s * 0.3);
        ctx.closePath();

        const bodyGrad = ctx.createLinearGradient(0, s, 0, -s);
        bodyGrad.addColorStop(0, `rgba(${r},${g},${b},0.8)`);
        bodyGrad.addColorStop(1, `rgba(${Math.floor(r*0.5)},${Math.floor(g*0.3)},${Math.floor(b*0.3)},0.6)`);
        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 체력이 2 이상이면 추가 표시
        if (this.maxHp >= 2) {
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = `rgba(${r},${g},${b},0.3)`;
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }
}

// ========== 운석 ==========
class Asteroid extends Enemy {
    constructor(x, y, size) {
        // 운석 색상 (암석 계열 + 네온 터치)
        const colors = [
            { r: 120, g: 100, b: 140 },  // purple-gray
            { r: 140, g: 100, b: 60 },   // brown
            { r: 100, g: 120, b: 140 },  // blue-gray
            { r: 160, g: 80, b: 80 },    // reddish
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const hp = size > 25 ? 3 : size > 18 ? 2 : 1;
        const speed = 50 + Math.random() * 100;
        const s = size || (12 + Math.random() * 22);

        super(x, y, hp, speed, color, s);

        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 2; // rad/s
        this.scoreValue = size > 25 ? 50 : size > 18 ? 30 : 15;

        // 울퉁불퉁한 표면을 위한 꼭짓점들
        this.vertices = [];
        const numVerts = 7 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numVerts; i++) {
            const angle = (i / numVerts) * Math.PI * 2;
            const dist = s * (0.7 + Math.random() * 0.3);
            this.vertices.push({ angle, dist });
        }
    }

    update(dt, playerX, playerY, manager) {
        this.y += this.speed * dt;
        this.rotation += this.rotSpeed * dt;

        if (this.y > canvas.height + 50) {
            this.alive = false;
        }
    }

    draw(ctx) {
        const { r, g, b } = this.color;
        const s = this.size;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // 울퉁불퉁한 운석
        ctx.beginPath();
        for (let i = 0; i < this.vertices.length; i++) {
            const { angle, dist } = this.vertices[i];
            const vx = Math.cos(angle) * dist;
            const vy = Math.sin(angle) * dist;
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
        }
        ctx.closePath();

        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.shadowColor = `rgba(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)},0.4)`;
        ctx.shadowBlur = 6;
        ctx.fill();

        // 표면 크레이터 (작은 원들)
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(0,0,0,0.3)`;
        for (let i = 0; i < 3; i++) {
            const ca = Math.random() * Math.PI * 2;
            const cd = Math.random() * s * 0.4;
            const cr = 2 + Math.random() * 4;
            ctx.beginPath();
            ctx.arc(Math.cos(ca) * cd, Math.sin(ca) * cd, cr, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    getBounds() {
        // 원형 충돌 박스 근사
        return {
            x: this.x - this.size * 0.75,
            y: this.y - this.size * 0.75,
            width: this.size * 1.5,
            height: this.size * 1.5,
        };
    }
}

// ========== 보스 ==========
class Boss extends Enemy {
    constructor(x, y, wave) {
        const hp = 20 + wave * 10;
        const speed = 30;
        const size = 45;
        const color = { r: 255, g: 80, b: 30 }; // 오렌지-레드

        super(x, y, hp, speed, color, size);

        this.scoreValue = 200 + wave * 50;
        this.targetY = 100; // 보스는 화면 상단에 고정
        this.entered = false;
        this.shootTimer = 0;
        this.shootInterval = 1.5;
        this.moveTimer = 0;
    }

    update(dt, playerX, playerY, manager) {
        // 진입 애니메이션
        if (!this.entered) {
            this.y += this.speed * dt;
            if (this.y >= this.targetY) {
                this.y = this.targetY;
                this.entered = true;
            }
            return;
        }

        // 좌우 이동
        this.moveTimer += dt;
        this.x = canvas.width / 2 + Math.sin(this.moveTimer * 0.8) * (canvas.width / 2 - this.size - 20);

        // 보스 탄막 발사 (아래로)
        this.shootTimer -= dt;
        if (this.shootTimer <= 0) {
            this.shootTimer = this.shootInterval;
            this.spreadShot();
        }
    }

    spreadShot() {
        // 보스 전용 확산탄 — 적 탄막은 bulletManager와 별도로 관리해야 함
        // 지금은 시각적 이펙트만 (적 탄막 시스템은 추후 추가)
        // 보스는 충돌 시 큰 데미지를 주는 걸로
    }

    draw(ctx) {
        const { r, g, b } = this.color;
        const s = this.size;

        ctx.save();
        ctx.translate(this.x, this.y);

        // 보스 본체 (큰 육각형)
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const vx = Math.cos(angle) * s;
            const vy = Math.sin(angle) * s;
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
        }
        ctx.closePath();

        const bodyGrad = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, s);
        bodyGrad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        bodyGrad.addColorStop(0.5, `rgba(${Math.floor(r*0.6)},${Math.floor(g*0.3)},${Math.floor(b*0.2)},0.9)`);
        bodyGrad.addColorStop(1, `rgba(${Math.floor(r*0.3)},${Math.floor(g*0.1)},${Math.floor(b*0.1)},0.7)`);
        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowBlur = 25;
        ctx.fill();

        ctx.strokeStyle = `rgba(255,200,50,0.8)`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 중앙 눈/코어
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.3);
        coreGrad.addColorStop(0, 'rgba(255,255,255,1)');
        coreGrad.addColorStop(0.5, 'rgba(255,200,50,0.8)');
        coreGrad.addColorStop(1, 'rgba(255,80,30,0)');
        ctx.fillStyle = coreGrad;
        ctx.shadowColor = 'rgba(255,255,200,0.8)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // HP 바
        const hpPct = this.hp / this.maxHp;
        const barWidth = s * 2;
        const barHeight = 6;
        const barY = -s - 15;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(-barWidth / 2, barY, barWidth, barHeight);
        ctx.fillStyle = hpPct > 0.5 ? '#00ff00' : hpPct > 0.25 ? '#ffff00' : '#ff0000';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 5;
        ctx.fillRect(-barWidth / 2, barY, barWidth * hpPct, barHeight);
        ctx.shadowBlur = 0;

        // 보스 이름
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`BOSS  WAVE ${Math.ceil(this.scoreValue / 50 - 4)}`, 0, barY - 8);

        ctx.restore();
    }

    getBounds() {
        const s = this.size;
        return {
            x: this.x - s * 0.7,
            y: this.y - s * 0.7,
            width: s * 1.4,
            height: s * 1.4,
        };
    }
}

// ========== 적 탄막 (EnemyBullet) ==========
class EnemyBullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.speed = 180; // px/s
        this.angle = angle; // radians (0=down, PI=up)
        this.radius = 5;
        this.damage = 12;
        this.alive = true;
    }

    update(dt) {
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        if (this.y > canvas.height + 20 || this.y < -20 ||
            this.x < -20 || this.x > canvas.width + 20) {
            this.alive = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 주황색 구체
        const grad = ctx.createRadialGradient(0, 0, this.radius * 0.2, 0, 0, this.radius);
        grad.addColorStop(0, 'rgba(255,255,200,1)');
        grad.addColorStop(0.4, 'rgba(255,160,40,0.9)');
        grad.addColorStop(1, 'rgba(255,80,20,0)');
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(255,140,20,0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
        };
    }
}

// ========== Enemy Manager ==========
class EnemyManager {
    constructor() {
        this.enemies = [];
        this.enemyBullets = [];
        this.spawnTimer = 0;
        this.spawnInterval = 2.0;
        this.wave = 1;
        this.bossActive = false;
    }

    update(dt, playerX, playerY) {
        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            // 보스 웨이브 (5의 배수)
            if (this.wave % 5 === 0 && !this.bossActive) {
                this.spawnBoss();
                this.bossActive = true;
                this.spawnTimer = 999; // 보스전 중에는 일반 적 스폰 안 함
            } else if (!this.bossActive) {
                this.spawnWave();
                this.spawnTimer = this.spawnInterval;
            }
        }

        for (const enemy of this.enemies) {
            enemy.update(dt, playerX, playerY, this);
        }

        // 적 탄막 업데이트
        for (const bullet of this.enemyBullets) {
            bullet.update(dt);
        }
        this.enemyBullets = this.enemyBullets.filter(b => b.alive);

        this.enemies = this.enemies.filter(e => e.alive);

        // 보스가 죽었으면 다음 웨이브 준비
        if (this.bossActive && this.enemies.length === 0) {
            this.bossActive = false;
            this.spawnTimer = 1.0;
        }
    }

    spawnWave() {
        const numEnemies = 1 + Math.floor(this.wave / 2);
        const numAsteroids = Math.floor(Math.random() * 3);

        for (let i = 0; i < numEnemies; i++) {
            const x = 60 + Math.random() * (canvas.width - 120);
            const y = -30 - Math.random() * 80;
            const patterns = ['straight', 'straight', 'zigzag', 'diagonal'];
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            this.enemies.push(new EnemyShip(x, y, pattern));
        }

        for (let i = 0; i < numAsteroids; i++) {
            const x = Math.random() * canvas.width;
            const y = -20 - Math.random() * 60;
            this.enemies.push(new Asteroid(x, y));
        }
    }

    spawnBoss() {
        const boss = new Boss(canvas.width / 2, -50, this.wave);
        this.enemies.push(boss);
    }

    addEnemyBullet(x, y, angle) {
        this.enemyBullets.push(new EnemyBullet(x, y, angle));
    }

    draw(ctx) {
        for (const enemy of this.enemies) {
            enemy.draw(ctx);
        }
        // 적 탄막 그리기
        for (const bullet of this.enemyBullets) {
            bullet.draw(ctx);
        }
    }

    getEnemies() {
        return this.enemies;
    }

    getEnemyBullets() {
        return this.enemyBullets;
    }

    allSpawned() {
        return this.spawnTimer > 0 || this.bossActive;
    }

    setWave(wave) {
        this.wave = wave;
        this.spawnInterval = Math.max(0.6, 2.0 - wave * 0.1);
        this.bossActive = false;
        this.spawnTimer = 0.5; // 웨이브 시작 시 빠르게 스폰
    }
}
