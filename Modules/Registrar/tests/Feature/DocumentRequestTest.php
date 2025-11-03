<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Registrar\Models\Payment;
use Modules\Registrar\Models\Student;

test('student can create document request', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);

    // Assign the student role and permissions
    $user->assignRole('student');

    // Act as the user
    $response = $this->actingAs($user)->get(route('registrar.document-requests.create'));

    // Assert the page loads
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('registrar/document-requests/create'));
});

test('document request can be stored', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);

    // Assign the student role and permissions
    $user->assignRole('student');

    $requestData = [
        'document_type' => 'Certificate of Enrolment',
        'quantity' => 1,
        'purpose' => 'Scholarship',
    ];

    // Act as the user and submit the form
    $response = $this->actingAs($user)->post(route('registrar.document-requests.store'), $requestData);

    // Assert redirect and success message
    $response->assertRedirect(route('registrar.document-requests.index'));
    $response->assertSessionHas('success');

    // Assert the document request was created
    $this->assertDatabaseHas('document_requests', [
        'student_id' => $student->student_id,
        'document_type' => 'Certificate of Enrolment',
        'quantity' => 1,
        'purpose' => 'Scholarship',
        'status' => 'pending_payment',
    ]);
});

test('student can select payment method for pending request', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);
    $user->assignRole('student');

    // Create a document request
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
    ]);

    // Act as the user and visit payment method selection
    $response = $this->actingAs($user)->get(route('registrar.payments.method', $request));

    // Assert the page loads
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('registrar/payments/method'));
});

test('student can generate cash payment reference', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);
    $user->assignRole('student');

    // Create a document request
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
        'amount' => 100.00,
    ]);

    // Debug: check permissions
    expect($user->hasPermissionTo('make_payments'))->toBeTrue();

    // Act as the user and generate cash payment
    $response = $this->actingAs($user)->post(route('registrar.payments.cash', $request));

    // Assert redirect to cash reference page
    $response->assertRedirect();

    // Get the payment that was created
    $payment = Modules\Registrar\Models\Payment::where('request_id', $request->id)
        ->where('payment_method', 'cash')
        ->latest()
        ->first();

    expect($payment)->not->toBeNull();
    expect($payment->payment_reference_number)->toStartWith('PRN-');
    expect($payment->amount)->toBe(100.00);
    expect($payment->status)->toBe('pending');

    // Assert redirect URL contains the payment ID
    $response->assertRedirect(route('registrar.payments.cash-reference', $payment));

    // Refresh request and assert status unchanged (still pending payment)
    $request->refresh();
    expect($request->status->value)->toBe('pending_payment');
});

test('student can confirm document claim when ready', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);
    $user->assignRole('student');

    // Create a document request that's ready for claim
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'ready_for_claim',
    ]);

    // Act as the user and confirm claim
    $response = $this->actingAs($user)->post(route('registrar.document-requests.confirm-claim', $request), [
        'confirmation' => '1',
        'claim_notes' => 'Will collect tomorrow morning',
    ]);

    // Assert redirect back with success
    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Assert request status updated
    $request->refresh();
    expect($request->status->value)->toBe('claimed');
    expect($request->claimed_by_student)->toBe(true);
    expect($request->claim_notes)->toBe('Will collect tomorrow morning');
});

test('student cannot confirm claim for requests not ready', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);
    $user->assignRole('student');

    // Create a document request that's still processing
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'processing',
    ]);

    // Act as the user and try to confirm claim
    $response = $this->actingAs($user)->post(route('registrar.document-requests.confirm-claim', $request), [
        'confirmation' => '1',
    ]);

    // Assert redirect back with error
    $response->assertRedirect();
    $response->assertSessionHasErrors('claim');

    // Assert status unchanged
    $request->refresh();
    expect($request->status->value)->toBe('processing');
});

test('student cannot access other students requests', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create two users and students
    $user1 = User::factory()->create();
    $student1 = Student::factory()->create(['user_id' => $user1->id]);
    $user1->assignRole('student');

    $user2 = User::factory()->create();
    $student2 = Student::factory()->create(['user_id' => $user2->id]);
    $user2->assignRole('student');

    // Create a document request for student1
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student1->student_id,
        'status' => 'ready_for_claim',
    ]);

    // Act as user2 and try to confirm claim for user1's request
    $response = $this->actingAs($user2)->post(route('registrar.document-requests.confirm-claim', $request), [
        'confirmation' => '1',
    ]);

    // Assert forbidden
    $response->assertForbidden();

    // Assert status unchanged
    $request->refresh();
    expect($request->status->value)->toBe('ready_for_claim');
});

test('cashier can access cashier dashboard', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Act as cashier and access dashboard
    $response = $this->actingAs($cashier)->get(route('registrar.cashier.dashboard'));

    // Assert access granted
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('registrar/cashier/dashboard'));
});

test('non-cashier cannot access cashier dashboard', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a student user
    $student = User::factory()->create();
    $student->assignRole('student');

    // Act as student and try to access cashier dashboard
    $response = $this->actingAs($student)->get(route('registrar.cashier.dashboard'));

    // Assert access denied
    $response->assertForbidden();
});

test('cashier can verify payment reference', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Create a student and document request with cash payment
    $student = Student::factory()->create(['user_id' => User::factory()->create()->id]);
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'pending',
        'payment_reference_number' => 'PRN-20251008-0001',
    ]);

    // Act as cashier and verify payment reference
    $response = $this->actingAs($cashier)->post(route('registrar.cashier.verify-payment'), [
        'payment_reference' => $payment->payment_reference_number,
    ]);

    // Assert successful verification
    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'payment' => [
            'reference' => $payment->payment_reference_number,
            'amount' => 100.00,
            'request_number' => $request->request_number,
            'student_name' => $student->user->full_name,
            'student_id' => $student->student_id,
        ],
    ]);
});

test('cashier cannot verify invalid payment reference', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Act as cashier and try to verify invalid payment reference
    $response = $this->actingAs($cashier)->post(route('registrar.cashier.verify-payment'), [
        'payment_reference' => 'INVALID-PRN',
    ]);

    // Assert verification fails
    $response->assertStatus(404);
    $response->assertJson([
        'success' => false,
        'message' => 'Payment reference not found or already processed.',
    ]);
});

test('cashier can confirm cash payment with OR number', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Create a student and document request with cash payment
    $student = Student::factory()->create(['user_id' => User::factory()->create()->id]);
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'pending',
        'payment_reference_number' => 'PRN-20251008-0001',
    ]);

    // Act as cashier and confirm payment with OR number
    $response = $this->actingAs($cashier)->post(route('registrar.cashier.confirm-payment'), [
        'payment_reference_number' => 'PRN-20251008-0001',
        'official_receipt_number' => 'OR-2025-001234',
    ]);

    // Assert successful confirmation
    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'message' => 'Payment confirmed successfully',
        'request' => [
            'request_number' => $request->request_number,
            'status' => 'paid',
        ],
    ]);

    // Assert payment updated
    $payment->refresh();
    expect($payment->status)->toBe('paid');
    expect($payment->cashier_id)->toBe($cashier->id);
    expect($payment->official_receipt_number)->toBe('OR-2025-001234');
    expect($payment->paid_at)->not->toBeNull();

    // Assert document request status updated
    $request->refresh();
    expect($request->status->value)->toBe('paid');
    expect($request->payment_method)->toBe('cash');
});

test('cashier cannot confirm payment without OR number', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Create a student and document request with cash payment
    $student = Student::factory()->create(['user_id' => User::factory()->create()->id]);
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'pending',
        'payment_reference_number' => 'PRN-20251008-0001',
    ]);

    // Act as cashier and try to confirm payment without OR number
    $response = $this->actingAs($cashier)->postJson(route('registrar.cashier.confirm-payment'), [
        'payment_reference_number' => 'PRN-20251008-0001',
        // Missing official_receipt_number
    ]);

    // Assert validation fails
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['official_receipt_number']);
});

test('cashier can print official receipt', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Create a student and document request with confirmed cash payment
    $student = Student::factory()->create(['user_id' => User::factory()->create()->id]);
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'paid',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'paid',
        'cashier_id' => $cashier->id,
        'official_receipt_number' => 'OR-2025-001234',
        'paid_at' => now(),
    ]);

    // Act as cashier and access receipt data
    $response = $this->actingAs($cashier)->get(route('registrar.cashier.receipt', $payment));

    // Assert JSON response with receipt data (for integration with registrar's existing software)
    $response->assertStatus(200)
        ->assertJson([
            'official_receipt_number' => 'OR-2025-001234',
            'payment' => [
                'amount' => 100.00,
                'status' => 'paid',
            ],
        ]);
});

test('cashier cannot print receipt for unconfirmed payment', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a cashier user
    $cashier = User::factory()->create();
    $cashier->assignRole('cashier');

    // Create a student and document request with pending cash payment
    $student = Student::factory()->create();
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'pending_payment',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'pending', // Not paid yet
        'payment_reference_number' => 'PRN-20251008-0001',
    ]);

    // Act as cashier and try to print receipt
    $response = $this->actingAs($cashier)->get(route('registrar.cashier.receipt', $payment));

    // Assert access denied
    $response->assertStatus(404);
});

test('non-cashier cannot print official receipt', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a student user
    $studentUser = User::factory()->create();
    $studentUser->assignRole('student');

    // Create a student and document request with confirmed cash payment
    $student = Student::factory()->create(['user_id' => User::factory()->create()->id]);
    $request = Modules\Registrar\Models\DocumentRequest::factory()->create([
        'student_id' => $student->student_id,
        'status' => 'paid',
        'amount' => 100.00,
    ]);

    $payment = Modules\Registrar\Models\Payment::factory()->create([
        'request_id' => $request->id,
        'payment_method' => 'cash',
        'amount' => 100.00,
        'status' => 'paid',
        'official_receipt_number' => 'OR-2025-001234',
        'paid_at' => now(),
    ]);

    // Act as student and try to print receipt
    $response = $this->actingAs($studentUser)->get(route('registrar.cashier.receipt', $payment));

    // Assert access denied
    $response->assertForbidden();
});
