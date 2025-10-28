<?php

use App\Enums\FOIPriority;
use App\Enums\FOIRequestStatus;
use App\Enums\FOIRequestType;
use App\Models\User;
use App\Modules\USG\Models\FOIRequest;
use App\Modules\USG\Models\FOIResponse;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\patch;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->user = User::factory()->create();
    $this->admin = User::factory()->create();
    $this->admin->assignRole('usg-admin');
});

// FOI Request Submission Tests
it('allows authenticated users to submit an FOI request', function () {
    actingAs($this->user);

    $data = [
        'title' => 'Request for Budget Information',
        'description' => 'I would like to request information about the USG budget allocation for the current year.',
        'request_type' => 'information',
        'priority' => 'medium',
    ];

    $response = post(route('usg.foi.store'), $data);

    $response->assertRedirect();

    assertDatabaseHas('usg_foi_requests', [
        'user_id' => $this->user->id,
        'title' => 'Request for Budget Information',
        'status' => 'pending',
    ]);
});

it('requires title when submitting FOI request', function () {
    actingAs($this->user);

    $response = post(route('usg.foi.store'), [
        'description' => 'Some description',
        'request_type' => 'information',
    ]);

    $response->assertSessionHasErrors('title');
});

it('requires description when submitting FOI request', function () {
    actingAs($this->user);

    $response = post(route('usg.foi.store'), [
        'title' => 'Some title',
        'request_type' => 'information',
    ]);

    $response->assertSessionHasErrors('description');
});

it('requires valid request type', function () {
    actingAs($this->user);

    $response = post(route('usg.foi.store'), [
        'title' => 'Test',
        'description' => 'Description',
        'request_type' => 'invalid_type',
    ]);

    $response->assertSessionHasErrors('request_type');
});

it('sets submitted_at timestamp when creating request', function () {
    actingAs($this->user);

    $response = post(route('usg.foi.store'), [
        'title' => 'Test Request',
        'description' => 'Test Description',
        'request_type' => 'document',
    ]);

    $request = FOIRequest::latest()->first();

    expect($request->submitted_at)->not->toBeNull();
});

// User Access Tests
it('allows users to view their own FOI requests', function () {
    actingAs($this->user);

    $request = FOIRequest::factory()->create(['user_id' => $this->user->id]);

    $response = get(route('usg.foi.show', $request));

    $response->assertOk();
});

it('prevents users from viewing other users FOI requests', function () {
    $otherUser = User::factory()->create();
    actingAs($this->user);

    $request = FOIRequest::factory()->create(['user_id' => $otherUser->id]);

    $response = get(route('usg.foi.show', $request));

    $response->assertForbidden();
});

it('allows admins to view any FOI request', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->create(['user_id' => $this->user->id]);

    $response = get(route('usg.foi.show', $request));

    $response->assertOk();
});

// Status Update Tests
it('allows admins to update request status to under review', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->pending()->create();

    $response = patch(route('usg.admin.foi.update-status', $request), [
        'status' => 'under_review',
    ]);

    $response->assertRedirect();

    assertDatabaseHas('usg_foi_requests', [
        'id' => $request->id,
        'status' => 'under_review',
        'reviewer_id' => $this->admin->id,
    ]);

    expect($request->fresh()->reviewed_at)->not->toBeNull();
});

it('allows admins to complete a request', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();

    $response = patch(route('usg.admin.foi.update-status', $request), [
        'status' => 'completed',
    ]);

    $response->assertRedirect();

    assertDatabaseHas('usg_foi_requests', [
        'id' => $request->id,
        'status' => 'completed',
    ]);

    expect($request->fresh()->completed_at)->not->toBeNull();
});

it('allows admins to reject a request with reason', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();

    $response = patch(route('usg.admin.foi.update-status', $request), [
        'status' => 'rejected',
        'rejection_reason' => 'Information cannot be disclosed due to privacy concerns.',
    ]);

    $response->assertRedirect();

    assertDatabaseHas('usg_foi_requests', [
        'id' => $request->id,
        'status' => 'rejected',
        'rejection_reason' => 'Information cannot be disclosed due to privacy concerns.',
    ]);

    expect($request->fresh()->rejected_at)->not->toBeNull();
});

it('requires rejection reason when rejecting a request', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();

    $response = patch(route('usg.admin.foi.update-status', $request), [
        'status' => 'rejected',
    ]);

    $response->assertSessionHasErrors('rejection_reason');
});

it('prevents non-admins from updating request status', function () {
    actingAs($this->user);

    $request = FOIRequest::factory()->pending()->create(['user_id' => $this->user->id]);

    $response = patch(route('usg.admin.foi.update-status', $request), [
        'status' => 'under_review',
    ]);

    $response->assertForbidden();
});

// Response Tests
it('allows admins to add text response to request', function () {
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();

    $response = post(route('usg.admin.foi.add-response', $request), [
        'response_text' => 'Here is the information you requested.',
    ]);

    $response->assertRedirect();

    assertDatabaseHas('usg_foi_responses', [
        'foi_request_id' => $request->id,
        'response_text' => 'Here is the information you requested.',
        'responder_id' => $this->admin->id,
    ]);
});

it('allows admins to add document response to request', function () {
    Storage::fake('public');
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();
    $file = UploadedFile::fake()->create('response.pdf', 100);

    $response = post(route('usg.admin.foi.add-response', $request), [
        'document' => $file,
    ]);

    $response->assertRedirect();

    $foiResponse = FOIResponse::where('foi_request_id', $request->id)->first();

    expect($foiResponse->document_path)->not->toBeNull();
    Storage::disk('public')->assertExists($foiResponse->document_path);
});

it('allows admins to add both text and document response', function () {
    Storage::fake('public');
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();
    $file = UploadedFile::fake()->create('budget.pdf', 100);

    $response = post(route('usg.admin.foi.add-response', $request), [
        'response_text' => 'Please see the attached budget document.',
        'document' => $file,
    ]);

    $response->assertRedirect();

    $foiResponse = FOIResponse::where('foi_request_id', $request->id)->first();

    expect($foiResponse->response_text)->toBe('Please see the attached budget document.');
    expect($foiResponse->document_path)->not->toBeNull();
});

it('validates document file type', function () {
    Storage::fake('public');
    actingAs($this->admin);

    $request = FOIRequest::factory()->underReview()->create();
    $file = UploadedFile::fake()->create('response.exe', 100);

    $response = post(route('usg.admin.foi.add-response', $request), [
        'document' => $file,
    ]);

    $response->assertSessionHasErrors('document');
});

// Model Tests
it('has correct relationships', function () {
    $request = FOIRequest::factory()->create();

    expect($request->user)->toBeInstanceOf(User::class);
    expect($request->responses)->toBeInstanceOf(\Illuminate\Database\Eloquent\Collection::class);
});

it('has status helper methods', function () {
    $pending = FOIRequest::factory()->pending()->create();
    $underReview = FOIRequest::factory()->underReview()->create();
    $completed = FOIRequest::factory()->completed()->create();
    $rejected = FOIRequest::factory()->rejected()->create();

    expect($pending->isPending())->toBeTrue();
    expect($underReview->isUnderReview())->toBeTrue();
    expect($completed->isCompleted())->toBeTrue();
    expect($rejected->isRejected())->toBeTrue();
});

it('has working status scopes', function () {
    FOIRequest::factory()->pending()->count(3)->create();
    FOIRequest::factory()->underReview()->count(2)->create();
    FOIRequest::factory()->completed()->count(1)->create();

    expect(FOIRequest::pending()->count())->toBe(3);
    expect(FOIRequest::underReview()->count())->toBe(2);
    expect(FOIRequest::completed()->count())->toBe(1);
});

it('has user scope', function () {
    FOIRequest::factory()->count(3)->create(['user_id' => $this->user->id]);
    FOIRequest::factory()->count(2)->create();

    expect(FOIRequest::forUser($this->user->id)->count())->toBe(3);
});

it('casts enums correctly', function () {
    $request = FOIRequest::factory()->create([
        'request_type' => 'document',
        'status' => 'pending',
        'priority' => 'high',
    ]);

    expect($request->request_type)->toBeInstanceOf(FOIRequestType::class);
    expect($request->status)->toBeInstanceOf(FOIRequestStatus::class);
    expect($request->priority)->toBeInstanceOf(FOIPriority::class);
});

// Service Tests
it('service creates request with correct defaults', function () {
    $service = app(\App\Modules\USG\Services\FOIService::class);

    $request = $service->submitRequest($this->user->id, [
        'title' => 'Test Request',
        'description' => 'Test Description',
        'request_type' => 'information',
    ]);

    expect($request->status)->toBe(FOIRequestStatus::Pending);
    expect($request->submitted_at)->not->toBeNull();
    expect($request->priority->value)->toBe('medium');
});

it('service updates status with timestamps', function () {
    $service = app(\App\Modules\USG\Services\FOIService::class);
    $request = FOIRequest::factory()->pending()->create();

    $service->updateStatus($request->id, FOIRequestStatus::UnderReview, $this->admin->id);

    $request->refresh();

    expect($request->status)->toBe(FOIRequestStatus::UnderReview);
    expect($request->reviewer_id)->toBe($this->admin->id);
    expect($request->reviewed_at)->not->toBeNull();
});

it('service adds internal notes', function () {
    $service = app(\App\Modules\USG\Services\FOIService::class);
    $request = FOIRequest::factory()->create();

    $service->addInternalNote($request->id, 'This request needs additional review.');

    $request->refresh();

    expect($request->internal_notes)->toBe('This request needs additional review.');
});

// Admin Dashboard Tests
it('shows all requests to admin', function () {
    actingAs($this->admin);

    FOIRequest::factory()->count(5)->create();

    $response = get(route('usg.admin.foi.index'));

    $response->assertOk();
});

it('can filter requests by status', function () {
    actingAs($this->admin);

    FOIRequest::factory()->pending()->count(3)->create();
    FOIRequest::factory()->completed()->count(2)->create();

    $response = get(route('usg.admin.foi.index', ['status' => 'pending']));

    $response->assertOk();
});
