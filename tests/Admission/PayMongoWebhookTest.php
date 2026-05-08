<?php

use App\Models\User;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\Section;
use Modules\Admission\Services\EnrollmentService;
use Modules\Admission\Services\PayMongoService;
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

    $term = AcademicTerm::create([
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'is_active' => true,
        'status' => 'enrollment',
        'enrollment_start' => now()->subDays(30),
        'enrollment_end' => now()->addDays(30),
        'classes_start' => now()->addDays(60),
        'classes_end' => now()->addDays(150),
    ]);

    $section = Section::create([
        'academic_term_id' => $term->id,
        'course_id' => $course->id,
        'name' => 'BSIT-1A',
        'year_level' => 1,
        'status' => 'open',
        'academic_year' => '2025-2026',
        'semester' => '1st',
    ]);

    Role::firstOrCreate(['name' => 'student']);
    $student = User::factory()->create();
    $student->assignRole('student');

    $applicant = \Modules\Admission\Models\Applicant::factory()->create([
        'program_id' => $program->id,
        'status' => \Modules\Admission\Enums\ApplicantStatus::Enrolled,
    ]);

    $this->enrollment = Enrollment::create([
        'applicant_id' => $applicant->id,
        'user_id' => $student->id,
        'academic_term_id' => $term->id,
        'section_id' => $section->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'year_level' => '1',
        'status' => 'enrolled',
        'student_id' => 'MSU2025-0001',
        'confirmed_at' => now()->subDays(7),
        'enrolled_at' => now()->subDays(5),
    ]);

    $this->service = app(PayMongoService::class);
    EnrollmentFee::create([
        'academic_term_id' => $term->id,
        'name' => 'Tuition Fee',
        'type' => 'tuition',
        'amount' => 5000.00,
        'unit' => 'flat rate',
        'is_required' => true,
        'priority' => 1,
        'status' => 'active',
    ]);
});

// ---------- payment_intent.succeeded ----------

it('marks existing pending payment as verified on payment_intent.succeeded', function () {
    $payment = EnrollmentPayment::create([
        'enrollment_id' => $this->enrollment->id,
        'payment_number' => 'EP-TEST-000001',
        'type' => 'full',
        'amount' => 7000.00,
        'method' => 'gcash',
        'reference_number' => 'pi_abc123',
        'status' => 'pending',
        'paid_at' => now(),
    ]);

    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.succeeded',
                'data' => [
                    'id' => 'pi_abc123',
                    'attributes' => [
                        'amount' => 700000,
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('Payment processed successfully');
    expect($payment->fresh()->status)->toBe('verified');
    expect($payment->fresh()->verified_at)->not->toBeNull();
});

it('creates new verified payment when no pending payment exists for succeeded intent', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.succeeded',
                'data' => [
                    'id' => 'pi_new_001',
                    'attributes' => [
                        'amount' => 500000,
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('Payment processed successfully');

    $payment = EnrollmentPayment::where('enrollment_id', $this->enrollment->id)->first();
    expect($payment)->not->toBeNull();
    expect($payment->status)->toBe('verified');
    expect($payment->amount)->toEqual(5000.0);
    expect($payment->method)->toBe('online');
    expect($payment->reference_number)->toBe('pi_new_001');
});

it('returns not-found when payment_intent.succeeded has no enrollment metadata', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.succeeded',
                'data' => [
                    'id' => 'pi_no_meta',
                    'attributes' => [
                        'amount' => 500000,
                        'metadata' => [],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('No enrollment found');
});

it('returns not-found when enrollment does not exist', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.succeeded',
                'data' => [
                    'id' => 'pi_bad_id',
                    'attributes' => [
                        'amount' => 500000,
                        'metadata' => [
                            'enrollment_id' => 99999,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('Enrollment not found');
});

// ---------- payment_intent.payment_failed ----------

it('marks pending payment as rejected on payment_intent.payment_failed', function () {
    $payment = EnrollmentPayment::create([
        'enrollment_id' => $this->enrollment->id,
        'payment_number' => 'EP-TEST-000002',
        'type' => 'full',
        'amount' => 7000.00,
        'method' => 'gcash',
        'reference_number' => 'pi_fail_001',
        'status' => 'pending',
        'paid_at' => now(),
    ]);

    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.payment_failed',
                'data' => [
                    'id' => 'pi_fail_001',
                    'attributes' => [
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('Payment failure recorded');
    expect($payment->fresh()->status)->toBe('rejected');
    expect($payment->fresh()->notes)->toBe('Payment failed on PayMongo');
});

it('returns not-found on payment_failed when no enrollment metadata', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.payment_failed',
                'data' => [
                    'id' => 'pi_fail_no_meta',
                    'attributes' => [
                        'metadata' => [],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('No enrollment found');
});

// ---------- payment_link.paid ----------

it('creates verified payment on payment_link.paid', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_link.paid',
                'data' => [
                    'id' => 'link_001',
                    'attributes' => [
                        'amount' => 700000,
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('Payment link paid');

    $payment = EnrollmentPayment::where('enrollment_id', $this->enrollment->id)->first();
    expect($payment)->not->toBeNull();
    expect($payment->status)->toBe('verified');
    expect($payment->method)->toBe('online');
    expect($payment->reference_number)->toBe('link_001');
});

it('updates existing payment on payment_link.paid rather than creating duplicate', function () {
    EnrollmentPayment::create([
        'enrollment_id' => $this->enrollment->id,
        'payment_number' => 'EP-TEST-000003',
        'type' => 'full',
        'amount' => 7000.00,
        'method' => 'online',
        'reference_number' => 'link_002',
        'status' => 'pending',
        'paid_at' => now(),
    ]);

    $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_link.paid',
                'data' => [
                    'id' => 'link_002',
                    'attributes' => [
                        'amount' => 700000,
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    $payments = EnrollmentPayment::where('enrollment_id', $this->enrollment->id)->get();
    expect($payments)->toHaveCount(1);
    expect($payments->first()->status)->toBe('verified');
});

it('returns not-found on link_paid when no enrollment metadata', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'payment_link.paid',
                'data' => [
                    'id' => 'link_no_meta',
                    'attributes' => [
                        'amount' => 700000,
                        'metadata' => [],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBe('No enrollment found');
});

// ---------- unknown events ----------

it('returns null for unknown webhook event type', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'type' => 'source.chargeable',
                'data' => [
                    'id' => 'src_001',
                    'attributes' => [
                        'amount' => 500000,
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ]);

    expect($result)->toBeNull();
});

it('returns null when payload has no event type', function () {
    $result = $this->service->handleWebhook([
        'data' => [
            'attributes' => [
                'data' => [
                    'id' => 'no_event',
                    'attributes' => [],
                ],
            ],
        ],
    ]);

    expect($result)->toBeNull();
});

// ---------- PayMongoController HTTP layer ----------

it('returns 401 when webhook request has no signature header', function () {
    $response = $this->postJson(route('admission.webhook.paymongo'), [
        'data' => ['attributes' => ['type' => 'payment_intent.succeeded']],
    ]);

    $response->assertStatus(401);
    $response->assertJson(['error' => 'Missing signature']);
});

it('returns 200 when webhook signature is provided', function () {
    // The controller uses config services.paymongo.webhook_secret
    // which is likely null in test environment, skipping signature check
    config(['services.paymongo.webhook_secret' => 'test_secret']);

    $payload = [
        'data' => [
            'attributes' => [
                'type' => 'payment_intent.payment_failed',
                'data' => [
                    'id' => 'pi_test_sig',
                    'attributes' => [
                        'metadata' => [
                            'enrollment_id' => $this->enrollment->id,
                        ],
                    ],
                ],
            ],
        ],
    ];

    $body = json_encode($payload);
    $timestamp = (string) time();
    $expectedSig = hash_hmac('sha256', "{$timestamp}.{$body}", 'test_secret');
    $signature = "t={$timestamp},v1={$expectedSig}";

    $response = $this->postJson(
        route('admission.webhook.paymongo'),
        $payload,
        ['Paymongo-Signature' => $signature],
    );

    $response->assertStatus(200);
    $response->assertJson(['received' => true]);
});

it('returns 401 when webhook signature is invalid', function () {
    config(['services.paymongo.webhook_secret' => 'test_secret']);

    $payload = ['data' => ['attributes' => ['type' => 'payment_intent.succeeded']]];

    $response = $this->postJson(
        route('admission.webhook.paymongo'),
        $payload,
        ['Paymongo-Signature' => 't=123,v1=invalid_signature'],
    );

    $response->assertStatus(401);
    $response->assertJson(['error' => 'Invalid signature']);
});