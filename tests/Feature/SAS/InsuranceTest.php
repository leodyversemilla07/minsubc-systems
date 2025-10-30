<?php

use App\Models\User;
use App\Modules\SAS\Models\InsuranceRecord;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

// TODO: Enable this test when SAS routes are fully implemented in Phase 1.18-1.20
it('allows authenticated student to view their insurance records', function () {
    $user = User::factory()->create();
    $user->assignRole('student');

    InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'insurance_provider' => 'Test Provider',
        'policy_number' => 'TEST123',
        'effective_date' => now(),
        'expiration_date' => now()->addYear(),
    ]);

    actingAs($user);

    $response = get('/sas/student/insurance');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/student/insurance/index')
        ->has('insuranceRecords')
    );
})->skip('SAS insurance routes not yet implemented');
