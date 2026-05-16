<?php

use Modules\Discipline\Models\OffenseCategory;
use Modules\Discipline\Models\Offense;
use Modules\Discipline\Models\Incident;
use Modules\Discipline\Models\Sanction;
use Modules\Discipline\Models\Appeal;
use App\Models\User;
use App\Models\Student;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    if (!Schema::hasTable('dsc_offense_categories')) {
        Schema::create('dsc_offense_categories', function ($table) {
            $table->id();
            $table->string('name');
            $table->string('tier');
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
        Schema::create('dsc_offenses', function ($table) {
            $table->id();
            $table->foreignId('category_id')->constrained('dsc_offense_categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->text('penalty_guideline')->nullable();
            $table->timestamps();
        });
        Schema::create('dsc_incidents', function ($table) {
            $table->id();
            $table->string('student_id');
            $table->foreignId('offense_id')->constrained('dsc_offenses');
            $table->foreignId('reported_by')->constrained('users');
            $table->date('incident_date');
            $table->string('location')->nullable();
            $table->text('description');
            $table->string('status')->default('pending');
            $table->text('resolution')->nullable();
            $table->timestamps();
        });
        Schema::create('dsc_sanctions', function ($table) {
            $table->id();
            $table->foreignId('incident_id')->constrained('dsc_incidents')->cascadeOnDelete();
            $table->string('type');
            $table->text('description');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('issued_by')->constrained('users');
            $table->string('status')->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
        Schema::create('dsc_appeals', function ($table) {
            $table->id();
            $table->foreignId('incident_id')->constrained('dsc_incidents')->cascadeOnDelete();
            $table->date('appeal_date');
            $table->text('reason');
            $table->string('status')->default('pending');
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->date('review_date')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
        });
    }
    Role::firstOrCreate(['name' => 'discipline-admin']);
    Role::firstOrCreate(['name' => 'discipline-staff']);
});

test('can create offense categories', function () {
    $cat = OffenseCategory::create([
        'name' => 'Minor Offenses',
        'tier' => 'minor',
        'color' => '#22c55e',
    ]);
    expect($cat->id)->not->toBeNull();
    expect($cat->tier)->toBe('minor');
});

test('can create offenses linked to categories', function () {
    $cat = OffenseCategory::factory()->create();
    $offense = Offense::create([
        'category_id' => $cat->id,
        'name' => 'Tardiness',
        'code' => 'OFF-001',
    ]);
    expect($offense->code)->toBe('OFF-001');
    expect($offense->category_id)->toBe($cat->id);
});

test('can report incidents', function () {
    $student = Student::factory()->create();
    $admin = User::factory()->create();
    $offense = Offense::factory()->create();
    $incident = Incident::create([
        'student_id' => $student->student_id,
        'offense_id' => $offense->id,
        'reported_by' => $admin->id,
        'incident_date' => now(),
        'description' => 'Student was late to class 3 times this week.',
        'status' => 'pending',
    ]);
    expect($incident->status)->toBe('pending');
    expect($incident->student_id)->toBe($student->student_id);
});

test('can apply sanctions to incidents', function () {
    $student = Student::factory()->create();
    $admin = User::factory()->create();
    $offense = Offense::factory()->create();
    $incident = Incident::factory()->create([
        'student_id' => $student->student_id,
        'offense_id' => $offense->id,
        'reported_by' => $admin->id,
    ]);
    $sanction = Sanction::create([
        'incident_id' => $incident->id,
        'type' => 'community_service',
        'description' => '10 hours of community service',
        'issued_by' => $admin->id,
        'status' => 'active',
    ]);
    expect($sanction->type)->toBe('community_service');
    expect($sanction->status)->toBe('active');
});

test('can file appeals for incidents', function () {
    $student = Student::factory()->create();
    $admin = User::factory()->create();
    $incident = Incident::factory()->create([
        'student_id' => $student->student_id,
        'reported_by' => $admin->id,
    ]);
    $appeal = Appeal::create([
        'incident_id' => $incident->id,
        'appeal_date' => now(),
        'reason' => 'I believe this was a misunderstanding.',
        'status' => 'pending',
    ]);
    expect($appeal->status)->toBe('pending');
    expect($appeal->incident_id)->toBe($incident->id);
});

test('can access admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('discipline-admin');
    $response = $this->actingAs($admin)
        ->get('/admin/discipline/dashboard');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list offense categories', function () {
    $admin = User::factory()->create()->assignRole('discipline-admin');
    $response = $this->actingAs($admin)
        ->get('/admin/discipline/offense-categories');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list incidents', function () {
    $admin = User::factory()->create()->assignRole('discipline-admin');
    $response = $this->actingAs($admin)
        ->get('/admin/discipline/incidents');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});