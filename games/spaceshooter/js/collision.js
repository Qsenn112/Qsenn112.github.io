// Space Shooter — Collision Detection
// AABB 충돌 감지 (정확한 크기)

/**
 * AABB (Axis-Aligned Bounding Box) 충돌 검사
 * 각 객체의 getBounds()가 반환하는 {x, y, width, height} 사용
 */
function checkAABB(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

/**
 * 원형 충돌 검사 (운석 등에 사용 가능)
 */
function checkCircle(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < (a.radius + b.radius);
}

/**
 * 충돌 처리 — 플레이어 총알 vs 적
 * @returns {number} 획득한 점수
 */
function processBulletEnemyCollisions(bulletManager, enemyManager) {
    let scoreGained = 0;
    const bullets = bulletManager.getBullets();
    const enemies = enemyManager.getEnemies();

    for (const bullet of bullets) {
        if (!bullet.alive) continue;
        for (const enemy of enemies) {
            if (!enemy.alive) continue;
            if (checkAABB(bullet.getBounds(), enemy.getBounds())) {
                bullet.alive = false;
                const destroyed = enemy.takeDamage(bullet.damage);
                if (destroyed) {
                    scoreGained += enemy.scoreValue;
                }
                break; // 한 총알은 하나의 적만 맞춤
            }
        }
    }

    return scoreGained;
}

/**
 * 충돌 처리 — 적 vs 플레이어
 * @returns {boolean} 플레이어 사망 여부
 */
function processEnemyPlayerCollisions(enemyManager, player) {
    const enemies = enemyManager.getEnemies();
    const playerBounds = player.getBounds();

    for (const enemy of enemies) {
        if (!enemy.alive) continue;
        if (checkAABB(enemy.getBounds(), playerBounds)) {
            enemy.alive = false; // 적도 충돌 시 파괴
            const dead = player.takeDamage(15); // 충돌 데미지
            if (dead) {
                return true;
            }
        }
    }

    return false;
}
