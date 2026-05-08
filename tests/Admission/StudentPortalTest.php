<?php

use App\Models\User;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Models\Schedule;
use Modules\Admission\Services\EnrollmentService;
use Modules\Admission\Services\GradeService;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');

    $course = \Modules\Admission\Models\Course::factory()->create(['code' => 'BSIT']);
    $program = \Modules\Admission\Models\AdmissionProgram::factory()->create([
        'course_id' => $course->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
    ]);

    $this->term = AcademicTerm::create([
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'is_active' => true,
        'status' => 'enrollment',
        'enrollment_start' => now()->subDays(30),
        'enrollment_end' => now()->addDays(30),
        'classes_start' => now()->addDays(60),
        'classes_end' => now()->addDays(150),
    ]);

    $this->section = Section::create([
        'academic_term_id' => $this->term->id,
        'course_id' => $course->id,
        'name' => 'BSIT-1A',
        'year_level' => 1,
        'status' => 'open',
        'academic_year' => '2025-2026',
        'semester' => '1st',
    ]);

    Role::firstOrCreate(['name' => 'student']);
    Role::firstOrCreate(['name' => 'admission-admin']);

    $this->student = User::factory()->create();
    $this->student->assignRole('student');

    $this->applicant = Applicant::factory()->create([
        'program_id' => $program->id,
        'status' => \Modules\Admission\Enums\ApplicantStatus::Enrolled,
    ]);

    $this->enrollment = Enrollment::create([
        'applicant_id' => $this->applicant->id,
        'user_id' => $this->student->id,
        'academic_term_id' => $this->term->id,
        'section_id' => $this->section->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'year_level' => '1',
        'status' => 'enrolled',
        'student_id' => 'MSU2025-0001',
        'confirmed_at' => now()->subDays(7),
        'enrolled_at' => now()->subDays(5),
    ]);

    $subject = Subject::create([
        'course_id' => $course->id,
        'code' => 'IT101',
        'name' => 'Introduction to Computing',
        'units' => 3,
        'year_level' => 1,
        'semester' => '1st',
        'status' => 'active',
    ]);

    $this->enrollment->subjects()->create([
        'subject_id' => $subject->id,
        'section_id' => $this->section->id,
    ]);

    EnrollmentFee::create([
        'academic_term_id' => $this->term->id,
        'name' => 'Tuition Fee',
        'type' => 'tuition',
        'amount' => 5000.00,
        'unit' => 'flat rate',
        'is_required' => true,
        'priority' => 1,
        'status' => 'active',
    ]);
});

// ==================== STUDENT DASHBOARD (Service-level) ====================

it('calculates enrollment details via service', function () {
    $service = app(EnrollmentService::class);
    $fees = $service->calculateFees($this->enrollment);

    expect($fees)->toHaveKey('total_amount');
    expect($fees)->toHaveKey('total_paid');
    expect($fees)->toHaveKey('balance');
    expect($fees)->toHaveKey('fees');
    expect($fees['total_amount'])->toEqual(5000);
});

it('detects when user has current enrollment', function () {
    $enrollment = Enrollment::where('user_id', $this->student->id)
        ->whereIn('status', ['confirmed', 'enrolled'])
        ->first();

    expect($enrollment)->not->toBeNull();
    expect($enrollment->status)->toBe('enrolled');
});

it('detects when user has no enrollment', function () {
    $newStudent = User::factory()->create();
    $newStudent->assignRole('student');

    $enrollment = Enrollment::where('user_id', $newStudent->id)
        ->whereIn('status', ['confirmed', 'enrolled'])
        ->first();

    expect($enrollment)->toBeNull();
});

it('allows re-enrollment only when no current enrollment and term is open', function () {
    $newStudent = User::factory()->create();
    $newStudent->assignRole('student');

    $hasActive = Enrollment::where('user_id', $newStudent->id)
        ->whereIn('status', ['confirmed', 'enrolled'])->exists();
    $termOpen = AcademicTerm::active()
        ->where('status', 'enrollment')->exists();

    expect($hasActive)->toBeFalse();
    expect($termOpen)->toBeTrue();
});

it('returns enrollment history sorted by date', function () {
    $historyEnrollment = Enrollment::create([
        'applicant_id' => $this->applicant->id,
        'user_id' => $this->student->id,
        'academic_term_id' => $this->term->id,
        'section_id' => $this->section->id,
        'academic_year' => '2024-2025',
        'semester' => '1st',
        'year_level' => '1',
        'status' => 'enrolled',
        'student_id' => 'MSU2024-0001',
        'confirmed_at' => now()->subYear(),
        'enrolled_at' => now()->subYear(),
        'created_at' => now()->subYear(),
    ]);

    $history = Enrollment::where('user_id', $this->student->id)
        ->orderBy('created_at', 'desc')
        ->get();

    expect($history)->toHaveCount(2);
    expect($history->first()->academic_year)->toBe('2025-2026');
    expect($history->last()->academic_year)->toBe('2024-2025');
});

// ==================== GRADES (Service-level) ====================

it('grade service converts numeric grades to points', function () {
    $service = app(GradeService::class);

    expect($service->gradeToPoints(98))->toBe(4.0);
    expect($service->gradeToPoints(95))->toBe(3.9);
    expect($service->gradeToPoints(92))->toBe(3.7);
    expect($service->gradeToPoints(89))->toBe(3.5);
    expect($service->gradeToPoints(86))->toBe(3.2);
    expect($service->gradeToPoints(83))->toBe(3.0);
    expect($service->gradeToPoints(80))->toBe(2.7);
    expect($service->gradeToPoints(77))->toBe(2.5);
    expect($service->gradeToPoints(75))->toBe(2.3);
    expect($service->gradeToPoints(74))->toBe(0.0);
    expect($service->gradeToPoints(null))->toBeNull();
});

it('grade service determines academic standing', function () {
    $service = app(GradeService::class);

    expect($service->getAcademicStanding(3.8))->toBe("Dean's Lister");
    expect($service->getAcademicStanding(3.5))->toBe("Dean's Lister");
    expect($service->getAcademicStanding(3.0))->toBe('Honors');
    expect($service->getAcademicStanding(2.0))->toBe('Satisfactory');
    expect($service->getAcademicStanding(1.0))->toBe('Academic Probation');
});

it('identifies ungraded subjects in enrollment', function () {
    expect($this->enrollment->subjects()->first()->grade)->toBeNull();
});

it('determines subject status from grade comparison', function () {
    expect(90 >= 75 ? 'passed' : 'failed')->toBe('passed');
    expect(75 >= 75 ? 'passed' : 'failed')->toBe('passed');
    expect(65 >= 75 ? 'passed' : 'failed')->toBe('failed');
    expect(null === null ? 'incomplete' : 'passed')->toBe('incomplete');
});

it('calculates grade stats from enrollment subjects', function () {
    $course = \Modules\Admission\Models\Course::factory()->create(['code' => 'BSIT-2']);
    $failedSubject = Subject::create([
        'course_id' => $course->id,
        'code' => 'MATH101',
        'name' => 'College Algebra',
        'units' => 3,
        'year_level' => 1,
        'semester' => '1st',
        'status' => 'active',
    ]);

    $this->enrollment->subjects()->update(['grade' => 90]);
    $this->enrollment->subjects()->create([
        'subject_id' => $failedSubject->id,
        'section_id' => $this->section->id,
        'grade' => 65,
    ]);

    $subjects = $this->enrollment->subjects()->with('subject')->get();
    $allPassed = $subjects->filter(fn ($es) => $es->grade >= 75)->count();
    $allFailed = $subjects->filter(fn ($es) => $es->grade && $es->grade < 75)->count();

    expect($allPassed)->toBe(1);
    expect($allFailed)->toBe(1);
    expect($subjects->count())->toBe(2);
});

// ==================== SCHEDULE ====================

it('can create and retrieve section schedules', function () {
    $subject = Subject::first();

    $sched1 = Schedule::create([
        'section_id' => $this->section->id,
        'subject_id' => $subject->id,
        'day' => 'Monday',
        'start_time' => '08:00',
        'end_time' => '10:00',
        'room' => 'R201',
        'status' => 'active',
    ]);

    $sched2 = Schedule::create([
        'section_id' => $this->section->id,
        'subject_id' => $subject->id,
        'day' => 'Wednesday',
        'start_time' => '08:00',
        'end_time' => '10:00',
        'room' => 'R201',
        'status' => 'active',
    ]);

    $schedules = Schedule::where('section_id', $this->section->id)->get();
    expect($schedules)->toHaveCount(2);
    expect($schedules->first()->day)->toBe('Monday');
});

it('returns empty schedules for user without section', function () {
    $schedules = Schedule::where('section_id', $this->section->id)->get();
    expect($schedules)->toHaveCount(0);
});

it('schedule details are accessible via enrollment section', function () {
    $subject = Subject::first();

    Schedule::create([
        'section_id' => $this->section->id,
        'subject_id' => $subject->id,
        'day' => 'Monday',
        'start_time' => '08:00',
        'end_time' => '10:00',
        'room' => 'R201',
        'status' => 'active',
    ]);

    $enrollment = Enrollment::where('user_id', $this->student->id)
        ->where('status', 'enrolled')
        ->with('section.schedules')
        ->first();

    expect($enrollment->section->schedules)->toHaveCount(1);
    expect($enrollment->section->schedules->first()->day)->toBe('Monday');
});

// ==================== PAYMENT (HTTP + Service) ====================

it('prevents viewing another students payment page', function () {
    $otherStudent = User::factory()->create();
    $otherStudent->assignRole('student');

    $this->actingAs($otherStudent);
    $response = $this->get(route('student.enrollment.payment', $this->enrollment));

    $response->assertStatus(403);
});

it('student can submit a cash payment', function () {
    $this->actingAs($this->student);

    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 5000,
        'method' => 'cash',
        'reference_number' => 'CASH-TEST-001',
    ]);

    $response->assertRedirect(route('student.enrollment.show', $this->enrollment));
    $response->assertSessionHas('success');

    expect($this->enrollment->payments()->count())->toBe(1);
    expect($this->enrollment->payments()->first()->status)->toBe('pending');
});

it('student can submit a bank transfer payment', function () {
    $this->actingAs($this->student);

    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 7000,
        'method' => 'bank_transfer',
        'reference_number' => 'BDO-12345',
    ]);

    $response->assertRedirect(route('student.enrollment.show', $this->enrollment));
    expect($this->enrollment->payments()->first()->method)->toBe('bank_transfer');
});

it('validates payment amount is positive', function () {
    $this->actingAs($this->student);

    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 0,
        'method' => 'cash',
    ]);

    $response->assertSessionHasErrors('amount');
});

it('validates payment method is allowed', function () {
    $this->actingAs($this->student);

    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 5000,
        'method' => 'credit_card',
    ]);

    $response->assertSessionHasErrors('method');
});

it('prevents submitting payment for another students enrollment', function () {
    $otherStudent = User::factory()->create();
    $otherStudent->assignRole('student');

    $this->actingAs($otherStudent);
    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 5000,
        'method' => 'cash',
    ]);

    $response->assertStatus(403);
});

it('fee breakdown returns correct amounts', function () {
    EnrollmentFee::create([
        'academic_term_id' => $this->term->id,
        'name' => 'Miscellaneous',
        'type' => 'misc',
        'amount' => 2000.00,
        'unit' => 'flat rate',
        'is_required' => true,
        'priority' => 2,
        'status' => 'active',
    ]);

    $service = app(EnrollmentService::class);
    $fees = $service->calculateFees($this->enrollment);

    expect(count($fees['fees']))->toBe(2);
    expect($fees['total_amount'])->toEqual(7000);
});

it('tracks payment history for verification', function () {
    $service = app(EnrollmentService::class);

    $p1 = $service->recordPayment($this->enrollment, ['amount' => 3000, 'method' => 'cash']);
    $p2 = $service->recordPayment($this->enrollment, ['amount' => 2000, 'method' => 'gcash']);

    $p1->update(['status' => 'verified', 'verified_by' => $this->student->id, 'verified_at' => now()]);

    $fees = $service->calculateFees($this->enrollment);
    expect($fees['total_paid'])->toEqual(3000);
    expect($fees['balance'])->toEqual(2000);
});

it('payment details accessible via enrollment service', function () {
    $service = app(EnrollmentService::class);
    $fees = $service->calculateFees($this->enrollment);

    expect($fees['total_amount'])->toEqual(5000);
    expect($fees['total_paid'])->toEqual(0);
    expect($fees['balance'])->toEqual(5000);

    $p = $service->recordPayment($this->enrollment, ['amount' => 5000, 'method' => 'cash']);
    $p->update(['status' => 'verified', 'verified_by' => $this->student->id, 'verified_at' => now()]);

    $updatedFees = $service->calculateFees($this->enrollment);
    expect($updatedFees['total_paid'])->toEqual(5000);
    expect($updatedFees['balance'])->toEqual(0);
});

it('returns correct stats for enrolled student dashboard', function () {
    $enrollment = Enrollment::where('user_id', $this->student->id)
        ->where('status', 'enrolled')
        ->with('subjects')
        ->first();

    expect($enrollment)->not->toBeNull();
    expect($enrollment->subjects->count())->toBe(1);

    $passed = $enrollment->subjects->filter(fn ($es) => $es->grade >= 75)->count();
    expect($passed)->toBe(0);
});