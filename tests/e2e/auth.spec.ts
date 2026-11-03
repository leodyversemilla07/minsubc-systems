import { test, expect } from '@playwright/test';
import { login, STAFF, SUPER_ADMIN } from './helpers';

test.describe('Authentication', () => {
    test('shows login page', async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: /sign in|log in|welcome back/i })).toBeVisible({ timeout: 10000 });
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
    });

    test('logs in with valid credentials', async ({ page }) => {
        await login(page, STAFF.email, STAFF.password);
        // Check that we navigated away from login page
        expect(page.url()).not.toContain('/login');
        expect(page.url()).not.toContain('two-factor');
    });

    test('shows error with invalid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="email"]', 'wrong@email.com');
        await page.fill('input[name="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');
        await page.waitForLoadState('networkidle');
        // The error message appears as an Inertia validation error
        await expect(page.locator('p.text-red-600').first()).toBeVisible({ timeout: 10000 });
    });

    test('redirects authenticated users away from login', async ({ page }) => {
        await login(page, STAFF.email, STAFF.password);
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        // Should be redirected away from login
        expect(page.url()).not.toContain('/login');
    });
});

test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, SUPER_ADMIN.email, SUPER_ADMIN.password);
    });

    test('super admin can access analytics dashboard', async ({ page }) => {
        await page.goto('/admin/analytics/dashboard');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
    });

    test('sidebar navigation is visible', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        const sidebar = page.locator('[class*="sidebar"], nav').first();
        await expect(sidebar).toBeVisible({ timeout: 10000 });
    });
});