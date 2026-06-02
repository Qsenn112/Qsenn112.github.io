// Space Shooter — Player Ship
// 4종 우주선 (밸런스/공격/속도/방어) + 네온 글로우 디자인

const SHIP_TYPES = {
    BALANCED: {
        name: 'BALANCED',
        label: '밸런스',
        color: { r: 0, g: 255, b: 255 },   // cyan
        speed: 300,   // px/s
        hp: 100,
        fireRate: 0.3, // sec between shots
        bulletDmg: 10,
        size: 20,      // ship half-height
        desc: '균형 잡힌 만능형',
    },
    ATTACK: {
        name: 'ATTACK',
        label: '공격',
        color: { r: 255, g: 50, b: 100 },  // red-pink
        speed: 250,
        hp: 80,
        fireRate: 0.2,
        bulletDmg: 18,
        size: 22,
        desc: '강력한 화력',
    },
    SPEED: {
        name: 'SPEED',
        label: '속도',
        color: { r: 255, g: 255, b: 0 },   // yellow
        speed: 420,
        hp: 65,
        fireRate: 0.25,
        bulletDmg: 8,
        size: 16,
        desc: '빠른 기동성',
    },
    DEFENSE: {
        name: 'DEFENSE',
        label: '방어',
        color: { r: 0, g: 255, b: 100 },   // green
        speed: 240,
        hp: 150,
        fireRate: 0.35,
        bulletDmg: 9,
        size: 24,
        desc: '높은 생존력',
    },
};

class PlayerShip {
    constructor(shipType = SHIP_TYPES.BALANCED) {
        this.setType(shipType);
        this.x = canvas.width / 2;
        this.y = canvas.height - 120; // 하단 고정 위치
        this.width = 40;
        this.height = 48;
        this.engineFlicker = 0;
        this.invincible = false; // 무적 상태 (피격 후 잠시)
        this.invincibleTimer = 0;
        this.shieldEffect = 0; // 실드 시각효과
    }

    setType(shipType) {
        this.type = shipType;
        this.speed = shipType.speed;
        this.maxHp = shipType.hp;
        this.hp = shipType.hp;
        this.fireRate = shipType.fireRate;
        this.bulletDmg = shipType.bulletDmg;
        this.size = shipType.size;
        this.color = shipType.color;
    }

    update(dt, keys) {
        // 좌우 이동
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.x -= this.speed * dt;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.x += this.speed * dt;
        }

        // 화면 경계 제한
        const margin = this.size + 10;
        if (this.x < margin) this.x = margin;
        if (this.x > canvas.width - margin) this.x = canvas.width - margin;

        // 엔진 깜빡임
        this.engineFlicker += dt * 15;

        // 무적 타이머
        if (this.invincible) {
            this.invincibleTimer -= dt;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }

        // 실드 효과
        this.shieldEffect = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 무적 상태일 때 깜빡임
        if (this.invincible && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
            ctx.globalAlpha = 0.4;
        }

        const { r, g, b } = this.color;
        const s = this.size;

        // === 엔진 불꽃 (뒤쪽) ===
        const flameLen = s * (0.6 + Math.abs(Math.sin(this.engineFlicker)) * 0.5);
        ctx.beginPath();
        ctx.moveTo(-s * 0.35, s * 0.8);
        ctx.lineTo(0, s * 0.8 + flameLen);
        ctx.lineTo(s * 0.35, s * 0.8);
        ctx.closePath();
        const flameGrad = ctx.createLinearGradient(0, s * 0.8, 0, s * 0.8 + flameLen);
        flameGrad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
        flameGrad.addColorStop(0.5, `rgba(255,150,200,0.6)`);
        flameGrad.addColorStop(1, `rgba(255,100,150,0)`);
        ctx.fillStyle = flameGrad;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // 작은 엔진 불꽃 (왼쪽)
        const smallFlame = s * (0.3 + Math.abs(Math.cos(this.engineFlicker * 1.3)) * 0.3);
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, s * 0.7);
        ctx.lineTo(-s * 0.35, s * 0.7 + smallFlame);
        ctx.lineTo(-s * 0.2, s * 0.7);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,200,100,0.6)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // 작은 엔진 불꽃 (오른쪽)
        ctx.beginPath();
        ctx.moveTo(s * 0.2, s * 0.7);
        ctx.lineTo(s * 0.35, s * 0.7 + smallFlame);
        ctx.lineTo(s * 0.5, s * 0.7);
        ctx.closePath();
        ctx.fill();

        // === 우주선 본체 (날렵한 다이아몬드 형태) ===
        ctx.beginPath();
        // 앞쪽 (뾰족)
        ctx.moveTo(0, -s);
        // 오른쪽 날개
        ctx.lineTo(s * 0.7, s * 0.5);
        ctx.lineTo(s * 0.5, s * 0.7);
        // 오른쪽 아래
        ctx.lineTo(s * 0.35, s * 0.8);
        // 중앙 아래
        ctx.lineTo(0, s * 0.65);
        // 왼쪽 아래
        ctx.lineTo(-s * 0.35, s * 0.8);
        // 왼쪽 날개
        ctx.lineTo(-s * 0.5, s * 0.7);
        ctx.lineTo(-s * 0.7, s * 0.5);
        ctx.closePath();

        // 본체 그라데이션
        const bodyGrad = ctx.createLinearGradient(0, -s, 0, s);
        bodyGrad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
        bodyGrad.addColorStop(0.5, `rgba(${Math.floor(r*0.7)},${Math.floor(g*0.7)},${Math.floor(b*0.7)},0.8)`);
        bodyGrad.addColorStop(1, `rgba(${Math.floor(r*0.4)},${Math.floor(g*0.4)},${Math.floor(b*0.4)},0.7)`);
        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();

        // 테두리 (네온 라인)
        ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // === 중앙 콕핏 라인 (하이라이트) ===
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.6);
        ctx.lineTo(0, s * 0.1);
        ctx.strokeStyle = `rgba(255,255,255,0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // === 방어 타입: 실드 효과 ===
        if (this.type === SHIP_TYPES.DEFENSE) {
            ctx.beginPath();
            ctx.arc(0, -s * 0.1, s * 1.3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r},${g},${b},${this.shieldEffect * 0.4})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }

    // 충돌 박스 (AABB) — 폴리곤 실제 크기와 동일하게
    getBounds() {
        const s = this.size;
        return {
            x: this.x - s * 0.5,
            y: this.y - s,
            width: s * 1.0,
            height: s * 1.8,
        };
    }

    takeDamage(amount) {
        if (this.invincible) return false;
        this.hp -= amount;
        this.invincible = true;
        this.invincibleTimer = 1.5; // 1.5초 무적
        return this.hp <= 0;
    }
}
