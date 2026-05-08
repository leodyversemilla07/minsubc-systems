<?php

use App\Models\User;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\EnrollmentService;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');

    $this->course = \Modules\Admission\Models\Course::factory()->create(['code' => 'BSIT']);
    $this->program = \Modules\Admission\Models\AdmissionProgram::factory()->create([
        'course_id' => $this->course->id,
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
        'course_id' => $this->course->id,
        'name' => 'BSIT-1A',
        'year_level' => 1,
        'status' => 'open',
        'academic_year' => '2025-2026',
        'semester' => '1st',
    ]);

    $this->subject = Subject::create([
        'course_id' => $this->course->id,
        'code' => 'IT101',
        'name' => 'Introduction to Computing',
        'units' => 3,
        'year_level' => 1,
        'semester' => '1st',
        'status' => 'active',
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

    Role::firstOrCreate(['name' => 'admission-admin']);
    $this->admin = User::factory()->create();
    $this->admin->assignRole('admission-admin');

    Role::firstOrCreate(['name' => 'student']);
    $this->student = User::factory()->create();
    $this->student->assignRole('student');

    $this->applicant = \Modules\Admission\Models\Applicant::factory()->create([
        'program_id' => $this->program->id,
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

    $this->actingAs($this->admin);
});

it('can record a cash payment and verify it', function () {
    $service = app(EnrollmentService::class);
    $payment = $service->recordPayment($this->enrollment, [
        'amount' => 5000.00,
        'method' => 'cash',
        'reference_number' => 'CASH-001',
    ]);

    expect($payment)->toBeInstanceOf(EnrollmentPayment::class);
    expect((float) $payment->amount)->toBe(5000.00);
    expect($payment->method)->toBe('cash');
    expect($payment->status)->toBe('pending');

    $payment->update([
        'status' => 'verified',
        'verified_by' => $this->admin->id,
        'verified_at' => now(),
    ]);

    expect($payment->fresh()->status)->toBe('verified');
});

it('can record bank transfer payment', function () {
    $service = app(EnrollmentService::class);
    $payment = $service->recordPayment($this->enrollment, [
        'amount' => 7000.00,
        'method' => 'bank_transfer',
        'reference_number' => 'BDO-REF-12345',
    ]);

    expect((float) $payment->amount)->toBe(7000.00);
    expect($payment->method)->toBe('bank_transfer');
    expect($payment->reference_number)->toBe('BDO-REF-12345');
    expect($payment->status)->toBe('pending');
});

it('rejects payment with invalid amount', function () {
    $this->actingAs($this->student);
    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => -100,
        'method' => 'gcash',
    ]);
    $response->assertSessionHasErrors('amount');
});

it('rejects payment with invalid method', function () {
    $this->actingAs($this->student);
    $response = $this->post(route('student.enrollment.payment.submit', $this->enrollment), [
        'amount' => 5000,
        'method' => 'bitcoin',
    ]);
    $response->assertSessionHasErrors('method');
});

it('can get enrollment fee breakdown', function () {
    $service = app(EnrollmentService::class);
    $fees = $service->calculateFees($this->enrollment);

    expect($fees)->toHaveKey('fees');
    expect($fees)->toHaveKey('total_amount');
    expect($fees)->toHaveKey('balance');
    expect($fees["total_amount"])->toEqual(7000);
    expect($fees['total_amount']);
    expect(count($fees['fees']))->toBe(2);
});

it('can process full payment', function () {
    $service = app(EnrollmentService::class);
    $fees = $service->calculateFees($this->enrollment);

    $payment = $service->recordPayment($this->enrollment, [
        'amount' => $fees['total_amount'],
        'method' => 'gcash',
        'reference_number' => 'GCASH-FULL-001',
    ]);
    $payment->update(['status' => 'verified', 'verified_by' => $this->admin->id, 'verified_at' => now()]);

    $updatedFees = $service->calculateFees($this->enrollment);

    expect($updatedFees['total_paid']);
    expect((float) $updatedFees["total_paid"])->toBe((float) $fees["total_amount"]);
    expect($updatedFees["balance"])->toEqual(0);
});

it('can process partial payment with remaining balance', function () {
    $service = app(EnrollmentService::class);

    $payment = $service->recordPayment($this->enrollment, [
        'amount' => 3000.00,
        'method' => 'cash',
        'reference_number' => 'PARTIAL-001',
    ]);
    $payment->update(['status' => 'verified', 'verified_by' => $this->admin->id, 'verified_at' => now()]);

    $fees = $service->calculateFees($this->enrollment);

    expect($fees['total_paid']);
    expect($fees["total_paid"])->toEqual(3000);
    expect($fees["balance"])->toEqual(4000);
});

it('correctly aggregates multiple payments', function () {
    $service = app(EnrollmentService::class);

    $p1 = $service->recordPayment($this->enrollment, ['amount' => 2000, 'method' => 'cash', 'reference_number' => 'MULTI-1']);
    $p2 = $service->recordPayment($this->enrollment, ['amount' => 3000, 'method' => 'gcash', 'reference_number' => 'MULTI-2']);
    $p3 = $service->recordPayment($this->enrollment, ['amount' => 2000, 'method' => 'bank_transfer', 'reference_number' => 'MULTI-3']);

    foreach ([$p1, $p2, $p3] as $p) {
        $p->update(['status' => 'verified', 'verified_by' => $this->admin->id, 'verified_at' => now()]);
    }

    $fees = $service->calculateFees($this->enrollment);

    expect($this->enrollment->payments()->count())->toBe(3);
    expect($fees['total_paid']);
    expect($fees["total_paid"])->toEqual(7000);
    expect($fees['balance'])->toBe(0);
});

it('generates payment number on record', function () {
    $service = app(EnrollmentService::class);
    $payment = $service->recordPayment($this->enrollment, [
        'amount' => 5000,
        'method' => 'bank_transfer',
        'reference_number' => 'BANK-GEN-001',
    ]);

    expect($payment->payment_number)->not->toBeNull();
    expect($payment->payment_number)->toContain('EP-');
    expect($payment->enrollment_id)->toBe($this->enrollment->id);
});

it('allows admin to reject a payment', function () {
    $service = app(EnrollmentService::class);
    $payment = $service->recordPayment($this->enrollment, [
        'amount' => 5000.00,
        'method' => 'cash',
        'reference_number' => 'REJECT-ME',
    ]);

    // Reject via service directly
    $service->rejectPayment($payment, $this->admin, 'Invalid reference number');

    expect($payment->status)->toBe('rejected');
    expect($payment->notes)->toBe('Invalid reference number');
});