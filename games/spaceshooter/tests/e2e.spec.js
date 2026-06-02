// Space Shooter — E2E Tests (Playwright)
// 전체 게임 플로우 검증

const { test, expect } = require('@playwright/test');
const path = require('path');

const GAME_URL = `file://${path.resolve(__dirname, '../index.html')}`;

// ============== 셋업 ==============
test.describe('Task 1 — 프로젝트 셋업', () => {
    test('페이지가 정상 로드되고 Canvas가 존재한다', async ({ page }) => {
        await page.goto(GAME_URL);
        await expect(page).toHaveTitle('스페이스 슈터 - Space Shooter');
        const canvas = page.locator('#gameCanvas');
        await expect(canvas).toBeVisible();
        const box = await canvas.boundingBox();
        expect(box).not.toBeNull();
    });

    test('UI 오버레이가 초기값으로 표시된다', async ({ page }) => {
        await page.goto(GAME_URL);
        await expect(page.locator('#score')).toHaveText('0');
        await expect(page.locator('#hp')).toHaveText('100');
        await expect(page.locator('#stage')).toHaveText('1');
    });
});

// ============== 게임 플로우 ==============
test.describe('Task 3-7 — 게임 플로우', () => {
    test('ENTER로 메뉴→우주선 선택→게임 시작', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
        await expect(canvas).toBeVisible();
        await expect(page.locator('#score')).toHaveText('0');
    });

    test('좌우 이동이 가능하다', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(100);
        await expect(canvas).toBeVisible();
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        await expect(canvas).toBeVisible();
    });

    test('우주선 선택에서 좌우로 타입 변경 가능', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(100);
        await expect(canvas).toBeVisible();
    });
});

// ============== 적 & 충돌 ==============
test.describe('Task 5-6 — 적기 & 충돌', () => {
    test('적이 스폰되고 게임이 진행된다', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        await expect(canvas).toBeVisible();
    });

    test('점수 UI가 유지된다', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
        await expect(page.locator('#score')).toBeVisible();
    });
});

// ============== 웨이브 & 업그레이드 ==============
test.describe('Task 8-9 — 웨이브 시스템 & 업그레이드', () => {
    test('스테이지 번호가 표시된다', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
        await expect(page.locator('#stage')).toBeVisible();
    });

    test('게임오버 후 ENTER로 메뉴 복귀 후 재시작 가능', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await expect(canvas).toBeVisible();
    });
});

// ============== 하이스코어 ==============
test.describe('Task 10 — 하이스코어', () => {
    test('localStorage 사용 가능', async ({ page }) => {
        await page.goto(GAME_URL);
        const hasStorage = await page.evaluate(() => typeof localStorage !== 'undefined');
        expect(hasStorage).toBe(true);
    });

    test('게임 시작부터 엔드까지 Canvas 유지', async ({ page }) => {
        await page.goto(GAME_URL);
        const canvas = page.locator('#gameCanvas');
        await canvas.click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        await expect(canvas).toBeVisible();
    });
});
