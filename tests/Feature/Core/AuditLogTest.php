<?php

use App\Models\AuditLog;
use App\Models\User;

test('log helper persists an audit entry', function () {
    $user = User::factory()->create();

    $log = AuditLog::log(
        action: 'user_login',
        userId: $user->id,
        description: 'User signed in'
    );

    expect($log->exists)->toBeTrue();
    expect($log->action)->toBe('user_login');
    expect($log->user_id)->toBe($user->id);
    expect($log->description)->toBe('User signed in');
});

test('log helper stores model reference and array payloads', function () {
    $user = User::factory()->create();

    $log = AuditLog::log(
        action: 'request_created',
        userId: $user->id,
        modelType: 'Modules\\Registrar\\Models\\DocumentRequest',
        modelId: 42,
        oldValues: ['status' => 'draft'],
        newValues: ['status' => 'submitted'],
        metadata: ['source' => 'test']
    );

    $log->refresh();

    expect($log->model_type)->toBe('Modules\\Registrar\\Models\\DocumentRequest');
    expect($log->model_id)->toBe(42);
    expect($log->old_values)->toBe(['status' => 'draft']);
    expect($log->new_values)->toBe(['status' => 'submitted']);
    expect($log->metadata)->toBe(['source' => 'test']);
});

test('domain helpers record the expected actions', function () {
    $user = User::factory()->create();

    $created = AuditLog::logDocumentRequestCreated($user->id, 1, ['type' => 'TOR']);
    $confirmed = AuditLog::logPaymentConfirmed($user->id, 2, ['amount' => 150]);
    $released = AuditLog::logDocumentReleased($user->id, 1, ['released_by' => 'staff']);

    expect($created->action)->toBe('request_created');
    expect($confirmed->action)->toBe('payment_confirmed');
    expect($released->action)->toBe('document_released');
});

test('scopes filter by action and user', function () {
    $alice = User::factory()->create();
    $bob = User::factory()->create();

    AuditLog::log(action: 'request_created', userId: $alice->id);
    AuditLog::log(action: 'payment_confirmed', userId: $alice->id);
    AuditLog::log(action: 'request_created', userId: $bob->id);

    expect(AuditLog::action('request_created')->count())->toBe(2);
    expect(AuditLog::byUser($alice->id)->count())->toBe(2);
    expect(AuditLog::action('request_created')->byUser($bob->id)->count())->toBe(1);
});

test('user relation resolves the actor', function () {
    $user = User::factory()->create();

    $log = AuditLog::log(action: 'user_login', userId: $user->id);

    expect($log->user->is($user))->toBeTrue();
});
