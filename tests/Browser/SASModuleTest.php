<?php

declare(strict_types=1);

/**
 * SAS Module Browser Tests
 *
 * Tests for the Student Affairs and Services public portal pages.
 */

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('SAS Portal Pages', function () {
    it('displays SAS homepage correctly', function () {
        $page = visit('/sas');

        $page->assertNoJavaScriptErrors();
    });

    it('displays scholarships page correctly', function () {
        $page = visit('/sas/scholarships');

        $page->assertSee('Scholarships')
            ->assertNoJavaScriptErrors();
    });

    it('displays organizations page correctly', function () {
        $page = visit('/sas/organizations');

        $page->assertSee('Organization')
            ->assertNoJavaScriptErrors();
    });

});

describe('SAS Navigation', function () {
    it('has navigation links on homepage', function () {
        $page = visit('/sas');

        $page->assertSee('Scholarships')
            ->assertSee('Organizations')
            ->assertNoJavaScriptErrors();
    });
});
