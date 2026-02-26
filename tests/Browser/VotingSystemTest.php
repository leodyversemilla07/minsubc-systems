<?php

declare(strict_types=1);

/**
 * Voting System Browser Tests
 *
 * Tests for the voting system public pages.
 */

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Voting System Pages', function () {
    it('displays voting homepage correctly', function () {
        $page = visit('/voting');

        $page->assertNoJavaScriptErrors();
    });

    it('displays voter login page correctly', function () {
        $page = visit('/voting/login');

        $page->assertSee('Voter')
            ->assertNoJavaScriptErrors();
    });

});
