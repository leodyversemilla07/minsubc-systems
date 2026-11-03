import { type Page, expect } from '@playwright/test';

export const STAFF = {
    email: 'registrar@minsubc.edu.ph',
    password: 'password',
    name: 'Maria Santos',
    role: 'registrar-admin',
};

export const SUPER_ADMIN = {
    email: 'admin@minsubc.edu.ph',
    password: 'password',
    name: 'System Admin',
};

export async function login(page: Page, email: string, password: string) {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    // Log the login page title for debugging
    console.log('Login page title:', await page.title());
    console.log('Login page URL:', page.url());
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('After login URL:', page.url());
}

export async function assertPageLoaded(page: Page, urlPattern: RegExp) {
    await expect(page).toHaveURL(urlPattern, { timeout: 10000 });
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
}

export async function waitForInertia(page: Page) {
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
}

export async function getCsrfToken(page: Page): Promise<string> {
    return page.evaluate(() => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta?.getAttribute('content') || '';
    });
}

export async function navigateTo(page: Page, url: string) {
    await page.goto(url);
    await waitForInertia(page);
}