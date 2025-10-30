<?php

use App\Models\User;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\SASActivity;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    $this->admin = User::factory()->create();
    $this->admin->assignRole('admin');
});

describe('Public Activity Viewing', function () {
    it('displays list of all activities', function () {
        SASActivity::factory()->count(10)->create(['status' => 'Scheduled']);

        $response = get(route('sas.activities.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('SAS/public/activities/index')
            ->has('activities')
        );
    });

    it('displays activity calendar view', function () {
        SASActivity::factory()->count(5)->create([
            'status' => 'Scheduled',
            'start_date' => now(),
        ]);

        $response = get(route('sas.activities.calendar'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('SAS/public/activities/calendar')
        );
    });

    it('displays single activity details', function () {
        $activity = SASActivity::factory()->create([
            'status' => 'Scheduled',
            'slug' => 'test-activity',
        ]);

        $response = get(route('sas.activities.show', $activity->slug));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('SAS/public/activities/show')
            ->has('activity')
        );
    });

    it('filters activities by category', function () {
        SASActivity::factory()->create(['category' => 'Academic', 'status' => 'Scheduled']);
        SASActivity::factory()->create(['category' => 'Sports', 'status' => 'Scheduled']);

        $response = get(route('sas.activities.index', ['category' => 'Academic']));

        $response->assertSuccessful();
    });
});

describe('Admin Activity Management', function () {
    it('allows admin to view all activities', function () {
        actingAs($this->admin);

        SASActivity::factory()->count(5)->create();

        $response = get(route('sas.admin.activities.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('SAS/admin/activities/index')
            ->has('activities')
        );
    });

    it('displays activity creation form', function () {
        actingAs($this->admin);

        $response = get(route('sas.admin.activities.create'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('SAS/admin/activities/create')
        );
    });

    it('creates a new activity with valid data', function () {
        actingAs($this->admin);

        $organization = Organization::factory()->create();

        $activityData = [
            'activity_title' => 'Test Activity',
            'description' => 'Test description',
            'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(7)->addHours(3)->format('Y-m-d H:i:s'),
            'location' => 'University Gymnasium',
            'category' => 'Academic',
            'organizer' => 'SAS Office',
            'organization_id' => $organization->id,
            'status' => 'Scheduled',
            'target_participants' => 100,
        ];

        $response = post(route('sas.admin.activities.store'), $activityData);

        $response->assertRedirect(route('sas.admin.activities.index'));

        assertDatabaseHas('sas_activities', [
            'activity_title' => 'Test Activity',
            'category' => 'Academic',
        ]);
    });

    it('validates required fields when creating activity', function () {
        actingAs($this->admin);

        $response = post(route('sas.admin.activities.store'), []);

        $response->assertSessionHasErrors([
            'activity_title',
            'start_date',
            'end_date',
        ]);
    });

    it('automatically generates slug from title', function () {
        $activity = SASActivity::factory()->create([
            'activity_title' => 'Test Activity Title',
            'slug' => null,
        ]);

        expect($activity->slug)->toContain('test-activity-title');
    });

    it('allows admin to update activity', function () {
        actingAs($this->admin);

        $activity = SASActivity::factory()->create([
            'activity_title' => 'Original Title',
        ]);

        $response = put(route('sas.admin.activities.update', $activity->id), [
            'activity_title' => 'Updated Title',
            'description' => $activity->description,
            'start_date' => $activity->start_date->format('Y-m-d H:i:s'),
            'end_date' => $activity->end_date->format('Y-m-d H:i:s'),
            'location' => $activity->location,
            'category' => $activity->category,
            'status' => 'Scheduled',
        ]);

        $response->assertRedirect(route('sas.admin.activities.index'));

        assertDatabaseHas('sas_activities', [
            'id' => $activity->id,
            'activity_title' => 'Updated Title',
        ]);
    });

    it('allows admin to mark activity as completed', function () {
        actingAs($this->admin);

        $activity = SASActivity::factory()->create(['status' => 'Scheduled']);

        $response = post(route('sas.admin.activities.complete', $activity->id), [
            'actual_participants' => 85,
            'completion_report' => 'Activity completed successfully',
        ]);

        $response->assertRedirect();

        assertDatabaseHas('sas_activities', [
            'id' => $activity->id,
            'status' => 'Completed',
            'actual_participants' => 85,
        ]);
    });

    it('allows admin to cancel activity', function () {
        actingAs($this->admin);

        $activity = SASActivity::factory()->create(['status' => 'Scheduled']);

        $response = post(route('sas.admin.activities.cancel', $activity->id));

        $response->assertRedirect();

        assertDatabaseHas('sas_activities', [
            'id' => $activity->id,
            'status' => 'Cancelled',
        ]);
    });

    it('allows admin to delete activity', function () {
        actingAs($this->admin);

        $activity = SASActivity::factory()->create();

        $response = delete(route('sas.admin.activities.destroy', $activity->id));

        $response->assertRedirect(route('sas.admin.activities.index'));

        assertDatabaseMissing('sas_activities', ['id' => $activity->id]);
    });
});

describe('Activity Model Scopes and Methods', function () {
    it('filters activities by status', function () {
        SASActivity::factory()->count(3)->create(['status' => 'Scheduled']);
        SASActivity::factory()->count(2)->create(['status' => 'Completed']);

        $published = SASActivity::where('status', 'Scheduled')->get();

        expect($published)->toHaveCount(3);
    });

    it('filters upcoming activities', function () {
        SASActivity::factory()->create([
            'start_date' => now()->addDays(5),
            'status' => 'Scheduled',
        ]);
        SASActivity::factory()->create([
            'start_date' => now()->subDays(5),
            'status' => 'Scheduled',
        ]);

        $upcoming = SASActivity::where('start_date', '>', now())->get();

        expect($upcoming)->toHaveCount(1);
    });

    it('filters activities by category', function () {
        SASActivity::factory()->count(4)->create(['category' => 'Academic']);
        SASActivity::factory()->count(2)->create(['category' => 'Sports']);

        $academic = SASActivity::where('category', 'Academic')->get();

        expect($academic)->toHaveCount(4);
    });

    it('loads activity with organization relationship', function () {
        $organization = Organization::factory()->create();
        $activity = SASActivity::factory()->create(['organization_id' => $organization->id]);

        $loaded = SASActivity::with('organization')->find($activity->id);

        expect($loaded->organization)->not->toBeNull();
        expect($loaded->organization->id)->toBe($organization->id);
    });

    it('handles all-day activities correctly', function () {
        $activity = SASActivity::factory()->create(['all_day' => true]);

        expect($activity->all_day)->toBeTrue();
    });

    it('handles recurring activities', function () {
        $activity = SASActivity::factory()->create([
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;BYDAY=MO,WE,FR',
        ]);

        expect($activity->is_recurring)->toBeTrue();
        expect($activity->recurrence_rule)->not->toBeNull();
    });
});
