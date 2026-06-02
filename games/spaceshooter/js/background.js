// Space Shooter — Starfield Background
// 네온 글로우 패럴랙스 스크롤 (3레이어)

class Star {
    constructor(layer) {
        this.layer = layer;
        this.reset(true);
    }

    reset(initial = false) {
        // x: 화면 너비 내 랜덤 위치
        this.x = Math.random() * canvas.width;
        // y: 초기 생성 시 화면 전체에 분포, 이후 리셋은 상단에서
        this.y = initial ? Math.random() * canvas.height : -10;
        // 사이즈
        this.size = this.layer.minSize + Math.random() * (this.layer.maxSize - this.layer.minSize);
        // 밝기 (깜빡임 효과용)
        this.brightness = 0.3 + Math.random() * 0.7;
        this.twinkleSpeed = 0.5 + Math.random() * 2.0;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        // 네온 색상 (여러 색상 중 랜덤)
        const colors = [
            { r: 0, g: 255, b: 255 },   // cyan
            { r: 255, g: 0, b: 255 },   // magenta
            { r: 255, g: 255, b: 0 },   // yellow
            { r: 200, g: 200, b: 255 }, // soft blue
            { r: 255, g: 150, b: 255 }, // pink
            { r: 150, g: 255, b: 255 }, // light cyan
            { r: 255, g: 255, b: 255 }, // white
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.color = { r: color.r, g: color.g, b: color.b };
        // 일부 별은 특별히 밝게 (네온 효과 강조)
        this.isBright = Math.random() < 0.2;
    }

    update(dt) {
        // 아래로 스크롤 (드래곤 플라이트 스타일 - 위에서 아래로 이동)
        this.y += this.layer.speed * (dt || 1);

        // 화면 아래로 나가면 상단에서 재생성
        if (this.y > canvas.height + 10) {
            this.reset();
        }

        // 깜빡임 (twinkle)
        this.twinkle = Math.sin(Date.now() * 0.001 * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.7;
    }

    draw(ctx) {
        const alpha = this.brightness * this.twinkle;
        const { r, g, b } = this.color;

        ctx.save();

        // 메인 별 (원)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.isBright) {
            // 밝은 별: 강한 네온 글로우
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.8})`;
            ctx.shadowBlur = this.size * 4;
            ctx.fill();

            // 추가 글로우 레이어
            ctx.shadowBlur = this.size * 8;
            ctx.fill();

            // 십자 플레어 (큰 별만)
            if (this.size > 2) {
                ctx.shadowBlur = 0;
                ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.4})`;
                ctx.lineWidth = 0.5;
                const flareLen = this.size * 3;
                ctx.beginPath();
                ctx.moveTo(this.x - flareLen, this.y);
                ctx.lineTo(this.x + flareLen, this.y);
                ctx.moveTo(this.x, this.y - flareLen);
                ctx.lineTo(this.x, this.y + flareLen);
                ctx.stroke();
            }
        } else {
            // 일반 별: 가벼운 글로우
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.5})`;
            ctx.shadowBlur = this.size * 2;
            ctx.fill();
        }

        ctx.restore();
    }
}

class Starfield {
    constructor() {
        this.layers = [
            { name: 'far',  count: 80, speed: 0.5,  minSize: 0.3, maxSize: 1.0 },
            { name: 'mid',  count: 40, speed: 1.0,  minSize: 0.8, maxSize: 2.0 },
            { name: 'near', count: 15, speed: 1.8,  minSize: 1.5, maxSize: 3.5 },
        ];

        this.stars = [];
        for (const layer of this.layers) {
            for (let i = 0; i < layer.count; i++) {
                this.stars.push(new Star(layer));
            }
        }
    }

    update(dt) {
        for (const star of this.stars) {
            star.update(dt);
        }
    }

    draw(ctx) {
        for (const star of this.stars) {
            star.draw(ctx);
        }
    }
}

// 전역 인스턴스 (main.js에서 접근)
let starfield;
