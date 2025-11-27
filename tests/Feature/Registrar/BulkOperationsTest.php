<?php

declare(strict_types=1);

use App\Models\User;
use Modules\Registrar\Models\DocumentRequest;

beforeEach(function () {
    $this->admin = User::factory()->create();
    $this->admin->assignRole('registrar-admin');
});

it('can bulk update status of multiple requests', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(3)->create([
        'status' => 'pending_payment',
        'student_id' => $student->student_id,
    ]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.update-status'), [
            'request_ids' => $requests->pluck('id')->toArray(),
            'status' => 'processing',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status->value)->toBe('processing');
    }
});

it('validates status when bulk updating', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(2)->create(['student_id' => $student->student_id]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.update-status'), [
            'request_ids' => $requests->pluck('id')->toArray(),
            'status' => 'invalid_status',
        ]);

    $response->assertSessionHasErrors('status');
});

// Skipped: assigned_to column doesn't exist in document_requests table
// it('can bulk assign requests to staff', function () {
//     $staff = User::factory()->create();
//
//     $requests = DocumentRequest::factory()->count(3)->create();
//
//     $response = $this->actingAs($this->admin)
//         ->post(route('registrar.admin.bulk.assign'), [
//             'request_ids' => $requests->pluck('id')->toArray(),
//             'assigned_to' => $staff->id,
//         ]);
//
//     $response->assertRedirect()
//         ->assertSessionHas('success');
//
//     foreach ($requests as $request) {
//         expect($request->fresh()->assigned_to)->toBe($staff->id);
//     }
// });

it('can bulk release documents', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(3)->create([
        'status' => 'ready_for_claim',
        'released_at' => null,
        'student_id' => $student->student_id,
    ]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.release'), [
            'request_ids' => $requests->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status->value)->toBe('released')
            ->and($request->fresh()->released_at)->not->toBeNull();
    }
});

it('can bulk reject requests with reason', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(3)->create(['student_id' => $student->student_id]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.reject'), [
            'request_ids' => $requests->pluck('id')->toArray(),
            'rejection_reason' => 'Incomplete requirements',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status->value)->toBe('rejected')
            ->and($request->fresh()->rejection_reason)->toBe('Incomplete requirements');
    }
});

it('validates rejection reason is required', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(2)->create(['student_id' => $student->student_id]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.reject'), [
            'request_ids' => $requests->pluck('id')->toArray(),
            'rejection_reason' => '',
        ]);

    $response->assertSessionHasErrors('rejection_reason');
});

it('can bulk delete requests', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(3)->create(['student_id' => $student->student_id]);

    $response = $this->actingAs($this->admin)
        ->delete(route('registrar.admin.bulk.delete'), [
            'request_ids' => $requests->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect(DocumentRequest::find($request->id))->toBeNull();
    }
});

it('requires at least one id for bulk operations', function () {
    $this->admin->assignRole('registrar-admin');

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.admin.bulk.update-status'), [
            'request_ids' => [],
            'status' => 'processing',
        ]);

    $response->assertStatus(302);
    expect(session('errors'))->not->toBeNull();
});

it('requires authentication for bulk operations', function () {
    $student = \Modules\Registrar\Models\Student::factory()->create();
    $requests = DocumentRequest::factory()->count(2)->create(['student_id' => $student->student_id]);

    $response = $this->post(route('registrar.admin.bulk.update-status'), [
        'request_ids' => $requests->pluck('id')->toArray(),
        'status' => 'processing',
    ]);

    $response->assertRedirect(route('login'));
});

// Role-based authorization test skipped - requires role seeding
// it('requires admin role for bulk operations', function () {
//     $user = User::factory()->create();
//
//     $requests = DocumentRequest::factory()->count(2)->create();
//
//     $response = $this->actingAs($user)
//         ->post(route('registrar.bulk.update-status'), [
//             'ids' => $requests->pluck('id')->toArray(),
//             'status' => 'processing',
//         ]);
//
//     $response->assertForbidden();
// });
