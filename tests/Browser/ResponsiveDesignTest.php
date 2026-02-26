<?php

declare(strict_types=1);

/**
 * Responsive Design Browser Tests
 *
 * Tests for responsive design across different devices and viewport sizes.
 */
describe('Mobile Responsiveness', function () {
    it('renders homepage correctly on mobile', function () {
        $page = visit('/')->on()->mobile();

        $page->assertNoJavaScriptErrors();
    });

    it('renders login page correctly on mobile', function () {
        $page = visit('/login')->on()->mobile();

        $page->assertSee('Log in')
            ->assertNoJavaScriptErrors();
    });

    it('renders USG portal correctly on mobile', function () {
        $page = visit('/usg')->on()->mobile();

        $page->assertNoJavaScriptErrors();
    });

    it('renders SAS portal correctly on mobile', function () {
        $page = visit('/sas')->on()->mobile();

        $page->assertNoJavaScriptErrors();
    });
});

describe('Dark Mode Support', function () {
    it('renders homepage in dark mode', function () {
        $page = visit('/')->inDarkMode();

        $page->assertNoJavaScriptErrors();
    });

    it('renders login page in dark mode', function () {
        $page = visit('/login')->inDarkMode();

        $page->assertSee('Log in')
            ->assertNoJavaScriptErrors();
    });

    it('renders USG portal in dark mode', function () {
        $page = visit('/usg')->inDarkMode();

        $page->assertNoJavaScriptErrors();
    });
});
