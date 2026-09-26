<?php

use App\Models\User;

it('denies ordinary users access to module administration', function (string $path) {
    $this->actingAs(User::factory()->create())
        ->get($path)
        ->assertForbidden();
})->with([
    '/admin/analytics/dashboard',
    '/admin/discipline/dashboard',
    '/admin/dormitory/dashboard',
    '/admin/facilities/dashboard',
    '/admin/helpdesk/dashboard',
    '/admin/scheduling/dashboard',
]);

it('does not serialize two-factor secrets with users', function () {
    $user = User::factory()->create();
    $user->forceFill([
        'two_factor_secret' => encrypt('secret'),
        'two_factor_recovery_codes' => encrypt('codes'),
    ])->save();

    expect($user->fresh()->toArray())
        ->not->toHaveKey('two_factor_secret')
        ->not->toHaveKey('two_factor_recovery_codes');
});
