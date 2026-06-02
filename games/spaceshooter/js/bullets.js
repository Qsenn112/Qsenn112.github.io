// Space Shooter — Bullet System
// 오토샷 탄막 + 네온 글로우 이펙트

class Bullet {
    constructor(x, y, damage, color) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.color = color; // { r, g, b }
        this.speed = 500; // px/s (위쪽으로)
        this.width = 4;
        this.height = 12;
        this.alive = true;
    }

    update(dt) {
        this.y -= this.speed * dt;
        if (this.y < -20) {
            this.alive = false;
        }
    }

    draw(ctx) {
        const { r, g, b } = this.color;

        ctx.save();
        ctx.translate(this.x, this.y);

        // 총알 몸체 (세로 라인)
        const grad = ctx.createLinearGradient(0, this.height / 2, 0, -this.height / 2);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.9)`);
        grad.addColorStop(1, `rgba(255,255,255,0.9)`);

        ctx.fillStyle = grad;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowBlur = 6;

        // 라운드된 사각형 (캡슐 형태)
        const hw = this.width / 2;
        const hh = this.height / 2;
        ctx.beginPath();
        ctx.moveTo(-hw, hh);
        ctx.lineTo(-hw, -hh + hw);
        ctx.arc(0, -hh + hw, hw, Math.PI, 0);
        ctx.lineTo(hw, hh);
        ctx.arc(0, hh - hw, hw, 0, Math.PI);
        ctx.closePath();
        ctx.fill();

        // 중심 하이라이트
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillRect(-1, -hh + 2, 2, hh * 2 - 4);

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height,
        };
    }
}

class BulletManager {
    constructor() {
        this.bullets = [];
    }

    fire(x, y, damage, color) {
        this.bullets.push(new Bullet(x, y, damage, color));
    }

    update(dt) {
        for (const bullet of this.bullets) {
            bullet.update(dt);
        }
        // 죽은 총알 제거
        this.bullets = this.bullets.filter(b => b.alive);
    }

    draw(ctx) {
        for (const bullet of this.bullets) {
            bullet.draw(ctx);
        }
    }

    getBullets() {
        return this.bullets;
    }
}
