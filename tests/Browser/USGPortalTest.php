<?php

declare(strict_types=1);

/**
 * USG Portal Browser Tests
 *
 * Tests for the University Student Government public portal pages.
 */

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('USG Portal Pages', function () {
    it('displays announcements page correctly', function () {
        $page = visit('/usg/announcements');

        $page->assertSee('Announcements')
            ->assertNoJavaScriptErrors();
    });

    it('displays events page correctly', function () {
        $page = visit('/usg/events');

        $page->assertSee('Events')
            ->assertNoJavaScriptErrors();
    });

    it('displays officers page correctly', function () {
        $page = visit('/usg/officers');

        $page->assertSee('Officers')
            ->assertNoJavaScriptErrors();
    });

    it('displays resolutions page correctly', function () {
        $page = visit('/usg/resolutions');

        $page->assertSee('Resolutions')
            ->assertNoJavaScriptErrors();
    });

});

describe('USG Navigation', function () {
    it('has navigation links on homepage', function () {
        $page = visit('/usg');

        $page->assertSee('Announcements')
            ->assertSee('Events')
            ->assertSee('Officers')
            ->assertNoJavaScriptErrors();
    });
});
