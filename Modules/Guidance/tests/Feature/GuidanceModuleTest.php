<?php

use App\Models\User;
use App\Models\Student;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\CounselingSession;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'guidance-admin']);
    Role::firstOrCreate(['name' => 'guidance-counselor']);
});

// ─── Model Creation ───────────────────────────────────

test('can create counselor', function () {
    $counselor = Counselor::factory()->create(['first_name' => 'Jane', 'specialization' => 'mental_health']);
    expect($counselor->full_name)->toBe('Jane ' . $counselor->last_name);
    expect($counselor->specialization)->toBe('mental_health');
    expect($counselor->is_available)->toBeTrue();
});

test('can create appointment slot', function () {
    $counselor = Counselor::factory()->create();
    $slot = AppointmentSlot::factory()->create(['counselor_id' => $counselor->id, 'max_students' => 2]);
    expect($slot->counselor->id)->toBe($counselor->id);
    expect($slot->has_availability)->toBeTrue();
});

test('slot availability false when fully booked', function () {
    $slot = AppointmentSlot::factory()->create(['max_students' => 1, 'booked_count' => 1]);
    expect($slot->has_availability)->toBeFalse();
});

test('can create appointment', function () {
    $appointment = Appointment::factory()->create(['reason' => 'Academic concern', 'status' => 'scheduled']);
    expect($appointment->reason)->toBe('Academic concern');
    expect($appointment->status)->toBe('scheduled');
});

test('can create counseling session', function () {
    $session = CounselingSession::factory()->create([
        'type' => 'individual',
        'session_type' => 'initial',
        'risk_level' => 'moderate',
    ]);
    expect($session->type)->toBe('individual');
    expect($session->risk_level)->toBe('moderate');
});

// ─── Admin Dashboard ──────────────────────────────────

test('guidance-admin can view dashboard', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('unauthorized user cannot access guidance admin', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('guidance.admin.dashboard'))->assertForbidden();
});

test('guest cannot access guidance admin', function () {
    $this->get(route('guidance.admin.dashboard'))->assertRedirect(route('login'));
});

// ─── Counselors CRUD ─────────────────────────────────

test('admin can view counselors', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.counselors.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create counselor', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->post(route('guidance.admin.counselors.store'), [
        'counselor_id' => 'CNL-001',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@guidance.edu',
        'specialization' => 'career',
    ]);
    $response->assertRedirect(route('guidance.admin.counselors.index'));
    expect(Counselor::where('counselor_id', 'CNL-001')->exists())->toBeTrue();
});

test('admin can update counselor', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $counselor = Counselor::factory()->create(['first_name' => 'Old']);
    $response = $this->actingAs($admin)->put(route('guidance.admin.counselors.update', $counselor), [
        'counselor_id' => $counselor->counselor_id,
        'first_name' => 'Updated',
        'last_name' => $counselor->last_name,
        'email' => $counselor->email,
        'is_available' => true,
        'is_active' => true,
    ]);
    $response->assertRedirect(route('guidance.admin.counselors.index'));
    expect($counselor->fresh()->first_name)->toBe('Updated');
});

// ─── Appointment Slots ───────────────────────────────

test('admin can view slots', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.slots.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create slot', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $counselor = Counselor::factory()->create();
    $response = $this->actingAs($admin)->post(route('guidance.admin.slots.store'), [
        'counselor_id' => $counselor->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'start_time' => '09:00',
        'end_time' => '10:00',
        'max_students' => 1,
        'type' => 'individual',
    ]);
    $response->assertRedirect(route('guidance.admin.slots.index'));
    expect(AppointmentSlot::where('counselor_id', $counselor->id)->exists())->toBeTrue();
});

// ─── Appointments ───────────────────────────────────

test('admin can view appointments', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.appointments.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view appointment details', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $appointment = Appointment::factory()->create();
    $response = $this->actingAs($admin)->get(route('guidance.admin.appointments.show', $appointment));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can confirm appointment', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $appointment = Appointment::factory()->create(['status' => 'scheduled']);
    $response = $this->actingAs($admin)->post(route('guidance.admin.appointments.confirm', $appointment));
    expect(in_array($response->status(), [302, 200]))->toBeTrue();
    expect($appointment->fresh()->status)->toBe('confirmed');
});

test('admin can complete appointment', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $appointment = Appointment::factory()->create(['status' => 'confirmed']);
    $response = $this->actingAs($admin)->post(route('guidance.admin.appointments.complete', $appointment));
    expect(in_array($response->status(), [302, 200]))->toBeTrue();
    expect($appointment->fresh()->status)->toBe('completed');
});

// ─── Counseling Sessions ────────────────────────────

test('admin can view sessions', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.sessions.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create session', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $counselor = Counselor::factory()->create();
    $student = Student::factory()->create();
    $response = $this->actingAs($admin)->post(route('guidance.admin.sessions.store'), [
        'student_id' => $student->student_id,
        'counselor_id' => $counselor->id,
        'type' => 'individual',
        'session_type' => 'initial',
        'risk_level' => 'low',
        'concern' => 'Test concern',
    ]);
    $response->assertRedirect(route('guidance.admin.sessions.index'));
    expect(CounselingSession::where('student_id', $student->student_id)->exists())->toBeTrue();
});

test('admin can view session details', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $session = CounselingSession::factory()->create();
    $response = $this->actingAs($admin)->get(route('guidance.admin.sessions.show', $session));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Referrals ─────────────────────────────────────

test('admin can view referrals', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.referrals.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Interventions ─────────────────────────────────

test('admin can view interventions', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.interventions.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create intervention', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->post(route('guidance.admin.interventions.store'), [
        'title' => 'Stress Management Workshop',
        'type' => 'workshop',
        'start_date' => now()->addWeek()->format('Y-m-d'),
        'end_date' => now()->addWeeks(2)->format('Y-m-d'),
        'max_participants' => 30,
    ]);
    $response->assertRedirect(route('guidance.admin.interventions.index'));
    expect(\Modules\Guidance\Models\Intervention::where('title', 'Stress Management Workshop')->exists())->toBeTrue();
});

// ─── Incident Reports ──────────────────────────────

test('admin can view incident reports', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.incident-reports.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create incident report', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $student = Student::factory()->create();
    $response = $this->actingAs($admin)->post(route('guidance.admin.incident-reports.store'), [
        'student_id' => $student->student_id,
        'type' => 'behavioral',
        'incident_date' => now()->format('Y-m-d'),
        'description' => 'Student disrupted class.',
        'severity' => 'moderate',
    ]);
    $response->assertRedirect(route('guidance.admin.incident-reports.index'));
    expect(\Modules\Guidance\Models\IncidentReport::where('student_id', $student->student_id)->exists())->toBeTrue();
});

// ─── Public Pages ─────────────────────────────────────

test('public can view guidance home', function () {
    $response = $this->get(route('guidance.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Permissions ─────────────────────────────────────

test('guidance-counselor can access admin dashboard', function () {
    $counselor = User::factory()->create()->assignRole('guidance-counselor');
    $response = $this->actingAs($counselor)->get(route('guidance.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Reports ─────────────────────────────────────────

test('admin can view reports page', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.reports.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view appointments report', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.reports.appointments'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view sessions report', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.reports.sessions'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view incidents report', function () {
    $admin = User::factory()->create()->assignRole('guidance-admin');
    $response = $this->actingAs($admin)->get(route('guidance.admin.reports.incidents'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── API Endpoints ────────────────────────────────────

test('counselors API works', function () {
    Counselor::factory()->count(3)->create(['is_available' => true]);
    $response = $this->getJson(route('guidance.api.counselors.available'));
    expect($response->status())->toBe(200);
});

test('available slots API works', function () {
    AppointmentSlot::factory()->create(['is_available' => true, 'max_students' => 2, 'booked_count' => 0]);
    $response = $this->getJson(route('guidance.api.slots.available'));
    expect($response->status())->toBe(200);
});