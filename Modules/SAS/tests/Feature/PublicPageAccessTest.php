<?php

use App\Models\User;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\SASActivity;

test('public can access SAS homepage without authentication', function () {
    $response = $this->get(route('sas.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/index')
        ->has('featuredOrganizations')
        ->has('upcomingActivities')
    );
});

test('public can access organizations page without authentication', function () {
    $response = $this->get(route('sas.organizations.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/organizations/index')
        ->has('organizations')
    );
});

test('public can access specific organization without authentication', function () {
    $organization = Organization::factory()->create([
        'status' => 'Active',
        'organization_code' => 'TEST-ORG',
    ]);

    $response = $this->get(route('sas.organizations.show', $organization->organization_code));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/organizations/show')
        ->has('organization')
    );
});

test('public can access activities page without authentication', function () {
    $response = $this->get(route('sas.activities.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/activities/index')
        ->has('activities')
    );
});

test('public can access activities calendar without authentication', function () {
    $response = $this->get(route('sas.activities.calendar'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/activities/calendar')
        ->has('activities')
    );
});

test('public can access specific activity without authentication', function () {
    $user = User::factory()->create();
    $organization = Organization::factory()->create();

    $activity = SASActivity::factory()->create([
        'slug' => 'test-activity',
        'organization_id' => $organization->id,
        'created_by' => $user->id,
        'status' => 'Scheduled',
    ]);

    $response = $this->get(route('sas.activities.show', $activity->slug));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/activities/show')
        ->has('activity')
    );
});

test('public can access scholarships page without authentication', function () {
    $response = $this->get(route('sas.scholarships.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/scholarships/index')
        ->has('scholarships')
    );
});
