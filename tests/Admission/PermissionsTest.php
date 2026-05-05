<?php

use App\Models\User;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Course;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');
    Role::firstOrCreate(['name' => 'super-admin']);
});

it('has admission permissions registered', function () {
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);

    $permissions = [
        'admission_view_dashboard',
        'admission_view_applications',
        'admission_process_applications',
        'admission_evaluate_applications',
        'admission_approve_applications',
        'admission_reject_applications',
        'admission_manage_enrollments',
        'admission_manage_programs',
        'admission_view_reports',
    ];

    foreach ($permissions as $permission) {
        expect(Permission::where('name', $permission)->exists())->toBeTrue();
    }
});

it('has admission-staff role with correct permissions', function () {
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);

    $role = Role::where('name', 'admission-staff')->first();
    expect($role)->not->toBeNull();
    expect($role->hasPermissionTo('admission_view_applications'))->toBeTrue();
    expect($role->hasPermissionTo('admission_manage_enrollments'))->toBeFalse();
});

it('has admission-admin role with all permissions', function () {
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);

    $role = Role::where('name', 'admission-admin')->first();
    expect($role)->not->toBeNull();
    expect($role->hasPermissionTo('admission_evaluate_applications'))->toBeTrue();
    expect($role->hasPermissionTo('admission_manage_enrollments'))->toBeTrue();
    expect($role->hasPermissionTo('admission_manage_programs'))->toBeTrue();
});

it('super-admin has all admission permissions', function () {
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);

    $superAdmin = Role::where('name', 'super-admin')->first();
    expect($superAdmin)->not->toBeNull();
    expect($superAdmin->hasPermissionTo('admission_view_dashboard'))->toBeTrue();
});

it('seeds courses correctly', function () {
    $this->artisan('migrate:fresh', [
        '--path' => 'Modules/Admission/database/migrations',
        '--realpath' => true,
    ]);
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\CourseSeeder']);

    expect(Course::count())->toBe(10);
    expect(Course::where('code', 'BSIT')->exists())->toBeTrue();
    expect(Course::where('code', 'BSBA')->exists())->toBeTrue();
    expect(Course::where('code', 'BSCrim')->exists())->toBeTrue();
});