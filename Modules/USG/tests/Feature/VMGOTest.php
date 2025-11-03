<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\USG\Models\VMGO;

// ==================== VMGO Edit & Update Tests ====================

it('usg-admin can view VMGO edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    VMGO::factory()->create();

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.vmgo.edit'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/vmgo/edit')
        ->has('vmgo'));
});

it('non-usg-admin cannot access VMGO edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)
        ->get(route('usg.admin.vmgo.edit'));

    $response->assertForbidden();
});

it('VMGO can be updated with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $vmgo = VMGO::factory()->create([
        'vision' => 'Old Vision',
        'mission' => 'Old Mission',
    ]);

    $updateData = [
        'vision' => 'Updated Vision Statement',
        'mission' => 'Updated Mission Statement',
        'goals' => [
            'Goal 1: Excellence in Education',
            'Goal 2: Student Empowerment',
            'Goal 3: Community Engagement',
        ],
        'objectives' => [
            'Objective 1: Improve academic programs',
            'Objective 2: Enhance student services',
            'Objective 3: Foster leadership development',
            'Objective 4: Strengthen partnerships',
        ],
        'effective_date' => now()->format('Y-m-d'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.vmgo.update'), $updateData);

    $response->assertSessionHas('success');

    $vmgo->refresh();
    expect($vmgo->vision)->toBe('Updated Vision Statement');
    expect($vmgo->mission)->toBe('Updated Mission Statement');
    expect($vmgo->goals)->toHaveCount(3);
    expect($vmgo->objectives)->toHaveCount(4);
});

it('VMGO update validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    VMGO::factory()->create();

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.vmgo.update'), [
            'vision' => '',
            'mission' => '',
        ]);

    $response->assertSessionHasErrors(['vision', 'mission']);
});

// ==================== VMGO History Tests ====================

it('usg-admin can view VMGO history', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    // Create multiple VMGO versions
    VMGO::factory()->count(3)->create();

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.vmgo.history'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/vmgo/history')
        ->has('history')
        ->has('history.data')
        ->where('history.total', 3));
});

it('non-admin cannot access VMGO history', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)
        ->get(route('usg.admin.vmgo.history'));

    $response->assertForbidden();
});

// ==================== Public VMGO Access Tests ====================

it('public can view current VMGO', function () {
    VMGO::factory()->currentYear()->create([
        'vision' => 'Public Vision',
        'mission' => 'Public Mission',
    ]);

    $response = $this->get(route('usg.vmgo.show'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/vmgo')
        ->has('vmgo')
        ->where('vmgo.vision', 'Public Vision'));
});

// ==================== VMGO Service Tests ====================

it('getCurrent returns most recent effective VMGO', function () {
    // Create VMGOs with different effective dates
    $old = VMGO::factory()->create(['effective_date' => now()->subYear()]);
    $current = VMGO::factory()->create(['effective_date' => now()->subMonth()]);
    $future = VMGO::factory()->create(['effective_date' => now()->addMonth()]);

    $service = app(\Modules\USG\Services\VMGOService::class);
    $result = $service->getCurrent();

    expect($result->id)->toBe($current->id);
});

it('VMGO tracks updated_by user', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    VMGO::factory()->create();

    $updateData = [
        'vision' => 'Tracked Vision',
        'mission' => 'Tracked Mission',
        'goals' => ['Goal 1'],
        'objectives' => ['Objective 1'],
    ];

    $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.vmgo.update'), $updateData);

    $vmgo = VMGO::latest()->first();
    expect($vmgo->updated_by)->toBe($usgAdmin->id);
    expect($vmgo->updatedByUser)->not->toBeNull();
    expect($vmgo->updatedByUser->id)->toBe($usgAdmin->id);
});
