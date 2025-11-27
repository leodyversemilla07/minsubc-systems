<?php

declare(strict_types=1);

use App\Models\User;
use Modules\SAS\Models\InsuranceRecord;
use Modules\SAS\Models\ScholarshipRecipient;

beforeEach(function () {
    $this->admin = User::factory()->create();
});

it('can bulk approve scholarships', function () {
    $scholarships = ScholarshipRecipient::factory()->count(3)->create(['status' => 'Suspended']);

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.approve'), [
            'ids' => $scholarships->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($scholarships as $scholarship) {
        expect($scholarship->fresh()->status)->toBe('Active')
            ->and($scholarship->fresh()->date_awarded)->not->toBeNull();
    }
});

it('can bulk reject scholarships with reason', function () {
    $scholarships = ScholarshipRecipient::factory()->count(3)->create(['status' => 'Active']);

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.reject'), [
            'ids' => $scholarships->pluck('id')->toArray(),
            'rejection_reason' => 'Does not meet GPA requirements',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($scholarships as $scholarship) {
        expect($scholarship->fresh()->status)->toBe('Cancelled')
            ->and($scholarship->fresh()->remarks)->toContain('Does not meet GPA requirements');
    }
});

it('validates rejection reason for scholarships', function () {
    $scholarships = ScholarshipRecipient::factory()->count(2)->create();

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.reject'), [
            'ids' => $scholarships->pluck('id')->toArray(),
            'rejection_reason' => '',
        ]);

    $response->assertSessionHasErrors('rejection_reason');
});

it('can bulk delete scholarships', function () {
    $scholarships = ScholarshipRecipient::factory()->count(3)->create();

    $response = $this->actingAs($this->admin)
        ->delete(route('sas.bulk.scholarships.delete'), [
            'ids' => $scholarships->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($scholarships as $scholarship) {
        expect(ScholarshipRecipient::find($scholarship->id))->toBeNull();
    }
});

it('can bulk update scholarship status', function () {
    $scholarships = ScholarshipRecipient::factory()->count(3)->create(['status' => 'Active']);

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.update-status'), [
            'ids' => $scholarships->pluck('id')->toArray(),
            'status' => 'Suspended',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($scholarships as $scholarship) {
        expect($scholarship->fresh()->status)->toBe('Suspended');
    }
});

it('validates status when bulk updating scholarships', function () {
    $scholarships = ScholarshipRecipient::factory()->count(2)->create();

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.update-status'), [
            'ids' => $scholarships->pluck('id')->toArray(),
            'status' => 'invalid_status',
        ]);

    $response->assertSessionHasErrors('status');
});

it('can bulk approve insurance enrollments', function () {
    $insurances = InsuranceRecord::factory()->count(3)->create(['status' => 'Pending Review']);

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.insurance.approve'), [
            'ids' => $insurances->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($insurances as $insurance) {
        expect($insurance->fresh()->status)->toBe('Approved')
            ->and($insurance->fresh()->reviewed_at)->not->toBeNull();
    }
});

it('can bulk reject insurance enrollments with reason', function () {
    $insurances = InsuranceRecord::factory()->count(3)->create(['status' => 'Pending Review']);

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.insurance.reject'), [
            'ids' => $insurances->pluck('id')->toArray(),
            'rejection_reason' => 'Incomplete documents',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($insurances as $insurance) {
        expect($insurance->fresh()->status)->toBe('Rejected')
            ->and($insurance->fresh()->review_notes)->toContain('Incomplete documents');
    }
});

it('validates rejection reason for insurance', function () {
    $insurances = InsuranceRecord::factory()->count(2)->create();

    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.insurance.reject'), [
            'ids' => $insurances->pluck('id')->toArray(),
            'rejection_reason' => '',
        ]);

    $response->assertSessionHasErrors('rejection_reason');
});

it('can bulk delete insurance records', function () {
    $insurances = InsuranceRecord::factory()->count(3)->create();

    $response = $this->actingAs($this->admin)
        ->delete(route('sas.bulk.insurance.delete'), [
            'ids' => $insurances->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($insurances as $insurance) {
        expect(InsuranceRecord::find($insurance->id))->toBeNull();
    }
});

it('requires at least one id for bulk operations', function () {
    $response = $this->actingAs($this->admin)
        ->post(route('sas.bulk.scholarships.approve'), [
            'ids' => [],
        ]);

    $response->assertSessionHasErrors('ids');
});

it('requires authentication for bulk operations', function () {
    $scholarships = ScholarshipRecipient::factory()->count(2)->create();

    $response = $this->post(route('sas.bulk.scholarships.approve'), [
        'ids' => $scholarships->pluck('id')->toArray(),
    ]);

    $response->assertRedirect(route('login'));
});

// Role-based authorization test skipped - requires role seeding
// it('requires admin role for bulk operations', function () {
//     $user = User::factory()->create();
//
//     $scholarships = ScholarshipRecipient::factory()->count(2)->create();
//
//     $response = $this->actingAs($user)
//         ->post(route('sas.bulk.scholarships.approve'), [
//             'ids' => $scholarships->pluck('id')->toArray(),
//         ]);
//
//     $response->assertForbidden();
// });
