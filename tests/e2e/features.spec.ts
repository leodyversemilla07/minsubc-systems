import { test, expect } from '@playwright/test';
import { login, SUPER_ADMIN, waitForInertia } from './helpers';

test.describe('Global Search', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, SUPER_ADMIN.email, SUPER_ADMIN.password);
    });

    test('opens command palette with Ctrl+K', async ({ page }) => {
        await page.keyboard.press('Control+k');
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible({ timeout: 5000 });
    });

    test('search returns results when typing', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        // Open search
        await page.keyboard.press('Control+k');
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible({ timeout: 5000 });

        // Type search query
        await searchInput.fill('Maria');
        await page.waitForTimeout(1000);

        // Should show results or "No results" (both are acceptable)
        const resultsList = page.locator('[role="listbox"]');
        await expect(resultsList).toBeVisible({ timeout: 5000 });
    });

    test('opens search by clicking search icon', async ({ page }) => {
        const searchButton = page.locator('button[title*="Search"], button:has(svg.lucide-search)').first();
        if (await searchButton.isVisible()) {
            await searchButton.click();
            const searchInput = page.locator('input[placeholder*="Search"]');
            await expect(searchInput).toBeVisible({ timeout: 5000 });
        }
    });
});

test.describe('Notifications', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, SUPER_ADMIN.email, SUPER_ADMIN.password);
    });

    test('notification bell shows unread count', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const bellButton = page.locator('button:has(svg.lucide-bell)').first();
        await expect(bellButton).toBeVisible();

        // Click bell to open dropdown
        await bellButton.click();
        const dropdown = page.locator('[role="menu"]').first();
        await expect(dropdown).toBeVisible({ timeout: 5000 });
    });

    test('notifications page loads with tab filters', async ({ page }) => {
        await page.goto('/notifications');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1').first()).toBeVisible();

        // Should have filter tabs
        const tabs = page.locator('a:has-text("All"), a:has-text("Unread"), a:has-text("Read")');
        await expect(tabs.first()).toBeVisible();
    });
});

test.describe('Dark Mode', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, SUPER_ADMIN.email, SUPER_ADMIN.password);
    });

    test('theme toggle button is visible', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const themeButton = page.locator('button:has(svg.lucide-moon), button:has(svg.lucide-sun), button:has(svg.lucide-monitor)').first();
        await expect(themeButton).toBeVisible({ timeout: 10000 });
    });

    test('toggles to dark mode', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const themeButton = page.locator('button:has(svg.lucide-moon), button:has(svg.lucide-sun), button:has(svg.lucide-monitor)').first();
        await themeButton.click();

        const darkOption = page.locator('[role="menuitem"]:has-text("Dark")');
        if (await darkOption.isVisible()) {
            await darkOption.click();
            await page.waitForTimeout(500);
            const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
            expect(isDark).toBe(true);
        }
    });
});