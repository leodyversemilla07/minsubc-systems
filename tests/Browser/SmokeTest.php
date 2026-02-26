<?php

/**
 * Browser Smoke Tests
 *
 * These tests ensure all main public pages load without JavaScript errors
 * and no console errors. This is the first line of defense for browser testing.
 */
describe('Public Pages Smoke Test', function () {
    it('loads the homepage without errors', function () {
        $page = visit('/');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the login page without errors', function () {
        $page = visit('/login');

        $page->assertSee('Log in')
            ->assertNoJavaScriptErrors();
    });

    it('loads the register page without errors', function () {
        $page = visit('/register');

        $page->assertSee('Create an account')
            ->assertNoJavaScriptErrors();
    });

    it('loads the forgot password page without errors', function () {
        $page = visit('/forgot-password');

        $page->assertSee('Forgot')
            ->assertNoJavaScriptErrors();
    });
});

describe('USG Public Pages Smoke Test', function () {
    it('loads the USG homepage without errors', function () {
        $page = visit('/usg');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG announcements page without errors', function () {
        $page = visit('/usg/announcements');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG events page without errors', function () {
        $page = visit('/usg/events');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG events calendar page without errors', function () {
        $page = visit('/usg/events/calendar');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG officers page without errors', function () {
        $page = visit('/usg/officers');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG resolutions page without errors', function () {
        $page = visit('/usg/resolutions');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG transparency page without errors', function () {
        $page = visit('/usg/transparency');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the USG VMGO page without errors', function () {
        $page = visit('/usg/vmgo');

        $page->assertNoJavaScriptErrors();
    });
});

describe('SAS Public Pages Smoke Test', function () {
    it('loads the SAS homepage without errors', function () {
        $page = visit('/sas');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the SAS scholarships page without errors', function () {
        $page = visit('/sas/scholarships');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the SAS activities page without errors', function () {
        $page = visit('/sas/activities');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the SAS organizations page without errors', function () {
        $page = visit('/sas/organizations');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the SAS activities calendar without errors', function () {
        $page = visit('/sas/activities/calendar');

        $page->assertNoJavaScriptErrors();
    });
});

describe('Voting System Public Pages Smoke Test', function () {
    it('loads the voting homepage without errors', function () {
        $page = visit('/voting');

        $page->assertNoJavaScriptErrors();
    });

    it('loads the voting login page without errors', function () {
        $page = visit('/voting/login');

        $page->assertNoJavaScriptErrors();
    });
});
