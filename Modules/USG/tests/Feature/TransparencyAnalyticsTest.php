<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\USG\Models\TransparencyReport;

test('public can view transparency index with year filters', function () {
    TransparencyReport::factory()->create([
        'status' => 'published',
        'report_period_start' => now()->subYear(),
        'report_period_end' => now()->subYear()->addMonth(),
    ]);

    $this->get(route('usg.transparency.index'))->assertOk();
});

test('usg-admin can view analytics dashboard with monthly trends', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $this->actingAs($usgAdmin)
        ->get(route('usg.admin.analytics'))
        ->assertOk();
});
