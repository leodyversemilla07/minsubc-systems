<?php

use Modules\Accounting\Models\FeeItem;
use Modules\Accounting\Models\Assessment as AccountingAssessment;
use Modules\Curriculum\Models\Program;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Curriculum;
use Modules\Curriculum\Models\CurriculumCourse;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\AppointmentSlot;

beforeEach(function () {
    collect(['registrar-admin', 'accounting-admin', 'guidance-admin', 'curriculum-admin', 'student'])
        ->each(fn ($role) => \Spatie\Permission\Models\Role::firstOrCreate(['name' => $role]));
});

test('accounting assessment references registrar student', function () {
    $student = \App\Models\Student::factory()->create();
    $acctAdmin = \App\Models\User::factory()->create()->assignRole('accounting-admin');
    $feeItem = FeeItem::factory()->create(['amount' => 5000]);

    $response = $this->actingAs($acctAdmin)->post(route('accounting.admin.assessments.store'), [
        'assessable_type' => 'student',
        'assessable_id' => $student->id,
        'lines' => [['fee_item_id' => $feeItem->id, 'amount' => 5000]],
    ]);

    $response->assertSessionDoesntHaveErrors();
    expect(AccountingAssessment::where('assessable_id', $student->id)->exists())->toBeTrue();
});

test('counseling session references registrar student', function () {
    $student = \App\Models\Student::factory()->create();
    $counselor = Counselor::factory()->create();
    $slot = AppointmentSlot::factory()->create([
        'counselor_id' => $counselor->id,
        'is_available' => true,
        'date' => now()->format('Y-m-d'),
    ]);

    $appointment = Appointment::create([
        'appointment_code' => 'APT-INT-' . uniqid(),
        'slot_id' => $slot->id,
        'student_id' => $student->student_id,
        'counselor_id' => $counselor->id,
        'reason' => 'Academic concern',
        'status' => 'scheduled',
    ]);

    $session = CounselingSession::create([
        'student_id' => $student->student_id,
        'counselor_id' => $counselor->id,
        'appointment_id' => $appointment->id,
        'session_code' => 'CS-INT-' . uniqid(),
        'type' => 'individual',
        'session_type' => 'initial',
        'status' => 'completed',
        'risk_level' => 'low',
        'concern' => 'Academic performance',
        'recommendations' => 'Study strategies',
    ]);

    expect($session->exists)->toBeTrue();
    expect($appointment->student_id)->toBe($student->student_id);
});

test('curriculum structure provides context for guidance', function () {
    $program = Program::factory()->create(['code' => 'BSIT']);
    $curriculum = Curriculum::factory()->create(['program_id' => $program->id]);
    $course = Course::factory()->create(['code' => 'IT 101']);
    CurriculumCourse::create(['curriculum_id' => $curriculum->id, 'course_id' => $course->id, 'year_level' => 1, 'semester' => '1st']);

    expect($curriculum->courses()->count())->toBe(1);
    expect($program->curricula()->count())->toBe(1);
});

test('multi-module student onboarding creates assessment and appointment', function () {
    $student = \App\Models\Student::factory()->create();
    $acctAdmin = \App\Models\User::factory()->create()->assignRole('accounting-admin');
    $feeItem = FeeItem::factory()->create(['amount' => 5000]);

    $this->actingAs($acctAdmin)->post(route('accounting.admin.assessments.store'), [
        'assessable_type' => 'student',
        'assessable_id' => $student->id,
        'lines' => [['fee_item_id' => $feeItem->id, 'amount' => 5000]],
    ]);
    expect(AccountingAssessment::where('assessable_id', $student->id)->exists())->toBeTrue();

    $counselor = Counselor::factory()->create();
    $slot = AppointmentSlot::factory()->create([
        'counselor_id' => $counselor->id,
        'is_available' => true,
        'date' => now()->addDay()->format('Y-m-d'),
    ]);
    $appointment = Appointment::create([
        'appointment_code' => 'APT-INT-' . uniqid(),
        'slot_id' => $slot->id,
        'student_id' => $student->student_id,
        'counselor_id' => $counselor->id,
        'reason' => 'Onboarding check-in',
        'status' => 'scheduled',
    ]);
    expect($appointment->exists)->toBeTrue();
});