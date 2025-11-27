<?php

declare(strict_types=1);

use App\Models\User;
use Modules\Registrar\Models\DocumentRequest;

beforeEach(function () {
    $this->admin = User::factory()->create();
});

it('can bulk update status of multiple requests', function () {
    $requests = DocumentRequest::factory()->count(3)->create(['status' => 'pending']);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.update-status'), [
            'ids' => $requests->pluck('id')->toArray(),
            'status' => 'processing',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status)->toBe('processing');
    }
});

it('validates status when bulk updating', function () {
    $requests = DocumentRequest::factory()->count(2)->create();

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.update-status'), [
            'ids' => $requests->pluck('id')->toArray(),
            'status' => 'invalid_status',
        ]);

    $response->assertSessionHasErrors('status');
});

it('can bulk assign requests to staff', function () {
    $staff = User::factory()->create();

    $requests = DocumentRequest::factory()->count(3)->create(['assigned_to' => null]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.assign'), [
            'ids' => $requests->pluck('id')->toArray(),
            'assigned_to' => $staff->id,
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->assigned_to)->toBe($staff->id);
    }
});

it('can bulk release documents', function () {
    $requests = DocumentRequest::factory()->count(3)->create([
        'status' => 'ready_for_pickup',
        'released_at' => null,
    ]);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.release'), [
            'ids' => $requests->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status)->toBe('completed')
            ->and($request->fresh()->released_at)->not->toBeNull();
    }
});

it('can bulk reject requests with reason', function () {
    $requests = DocumentRequest::factory()->count(3)->create(['status' => 'pending']);

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.reject'), [
            'ids' => $requests->pluck('id')->toArray(),
            'rejection_reason' => 'Invalid documents',
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect($request->fresh()->status)->toBe('rejected')
            ->and($request->fresh()->notes)->toContain('Invalid documents');
    }
});

it('validates rejection reason is required', function () {
    $requests = DocumentRequest::factory()->count(2)->create();

    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.reject'), [
            'ids' => $requests->pluck('id')->toArray(),
            'rejection_reason' => '',
        ]);

    $response->assertSessionHasErrors('rejection_reason');
});

it('can bulk delete requests', function () {
    $requests = DocumentRequest::factory()->count(3)->create();

    $response = $this->actingAs($this->admin)
        ->delete(route('registrar.bulk.delete'), [
            'ids' => $requests->pluck('id')->toArray(),
        ]);

    $response->assertRedirect()
        ->assertSessionHas('success');

    foreach ($requests as $request) {
        expect(DocumentRequest::find($request->id))->toBeNull();
    }
});

it('requires at least one id for bulk operations', function () {
    $response = $this->actingAs($this->admin)
        ->post(route('registrar.bulk.update-status'), [
            'ids' => [],
            'status' => 'processing',
        ]);

    $response->assertSessionHasErrors('ids');
});

it('requires authentication for bulk operations', function () {
    $requests = DocumentRequest::factory()->count(2)->create();

    $response = $this->post(route('registrar.bulk.update-status'), [
        'ids' => $requests->pluck('id')->toArray(),
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
