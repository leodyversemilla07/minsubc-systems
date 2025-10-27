<?php

use App\Models\User;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;

describe('Payment E2E Flow', function () {
    beforeEach(function () {
        $this->seed(RolesAndPermissionsSeeder::class);
    });

    it('student can select cash payment method', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
            'total_amount' => 150.00,
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Select Payment Method')
            ->assertSee('Cash Payment')
            ->assertSee('Pay at Cashier')
            ->assertSee('Online Payment')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Click on cash payment option
        $page->click('Cash Payment')
            ->wait(1000)
            ->assertSee('Cash Payment Reference')
            ->assertNoJavascriptErrors();
    });

    it('student can generate cash payment reference', function () {
        Event::fake();

        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
            'total_amount' => 200.00,
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->desktop();

        $page->click('Cash Payment')
            ->wait(1000)
            ->click('Generate Reference')
            ->wait(2000)
            ->assertSee('Payment Reference Generated')
            ->assertSee('Reference Number')
            ->assertNoJavascriptErrors();

        // Verify payment record was created
        $payment = Payment::where('document_request_id', $request->id)->first();
        expect($payment)->not->toBeNull()
            ->and($payment->payment_method)->toBe('cash')
            ->and($payment->status)->toBe('pending');
    });

    it('cashier can verify payment reference', function () {
        $cashier = User::factory()->create();
        $cashier->assignRole('cashier');

        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
        ]);

        $payment = Payment::factory()->create([
            'document_request_id' => $request->id,
            'payment_method' => 'cash',
            'status' => 'pending',
            'reference_number' => 'CASH-2025-001',
        ]);

        actingAs($cashier);

        $page = visit('/cashier/dashboard')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Cashier Dashboard')
            ->assertSee('Pending Cash Payments')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Search for payment reference
        $page->fill('search', 'CASH-2025-001')
            ->wait(1000)
            ->assertSee('CASH-2025-001')
            ->assertNoJavascriptErrors();
    });

    it('cashier can confirm cash payment with OR number', function () {
        Event::fake();

        $cashier = User::factory()->create();
        $cashier->assignRole('cashier');

        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
            'total_amount' => 150.00,
        ]);

        $payment = Payment::factory()->create([
            'document_request_id' => $request->id,
            'payment_method' => 'cash',
            'status' => 'pending',
            'amount' => 150.00,
        ]);

        actingAs($cashier);

        $page = visit("/cashier/payments/{$payment->id}/confirm")
            ->on()->desktop();

        $page->assertSee('Confirm Payment')
            ->assertSee('Official Receipt Number')
            ->assertSee($payment->reference_number)
            ->fill('or_number', 'OR-2025-12345')
            ->assertNoJavascriptErrors();

        $page->click('Confirm Payment')
            ->wait(2000)
            ->assertSee('Payment confirmed successfully')
            ->assertNoJavascriptErrors();

        // Verify payment was confirmed
        $payment->refresh();
        expect($payment->status)->toBe('confirmed')
            ->and($payment->or_number)->toBe('OR-2025-12345');

        // Verify request status updated
        $request->refresh();
        expect($request->status)->toBe('paid');
    });

    it('student can initiate online payment', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
            'total_amount' => 300.00,
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->desktop();

        $page->click('Online Payment')
            ->wait(1000)
            ->assertSee('Online Payment')
            ->assertSee('Payment Gateway')
            ->assertNoJavascriptErrors();

        $page->click('Proceed to Payment')
            ->wait(1000)
            ->assertNoJavascriptErrors();
    });

    it('complete cash payment flow: student to cashier', function () {
        Event::fake();

        // Step 1: Student generates cash payment reference
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
            'total_amount' => 250.00,
        ]);

        actingAs($student);

        $studentPage = visit("/document-requests/{$request->id}/payment/method");

        $studentPage->click('Cash Payment')
            ->wait(1000)
            ->click('Generate Reference')
            ->wait(2000)
            ->assertSee('Reference Number');

        $payment = Payment::where('document_request_id', $request->id)->first();
        $referenceNumber = $payment->reference_number;

        // Step 2: Cashier confirms payment
        $cashier = User::factory()->create();
        $cashier->assignRole('cashier');

        actingAs($cashier);

        $cashierPage = visit('/cashier/dashboard');

        $cashierPage->fill('search', $referenceNumber)
            ->wait(1000)
            ->assertSee($referenceNumber)
            ->click('Confirm Payment')
            ->wait(1000)
            ->fill('or_number', 'OR-2025-54321')
            ->click('Confirm Payment')
            ->wait(2000)
            ->assertSee('Payment confirmed successfully')
            ->assertNoJavascriptErrors();

        // Verify final state
        $payment->refresh();
        $request->refresh();

        expect($payment->status)->toBe('confirmed')
            ->and($request->status)->toBe('paid');
    });

    it('mobile: student can select payment method on mobile', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->mobile()
            ->inLightMode();

        $page->assertSee('Select Payment Method')
            ->assertSee('Cash Payment')
            ->assertSee('Online Payment')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('dark mode: payment selection works in dark mode', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->desktop()
            ->inDarkMode();

        $page->assertSee('Select Payment Method')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('student can view payment status after payment', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'paid',
        ]);

        $payment = Payment::factory()->create([
            'document_request_id' => $request->id,
            'status' => 'confirmed',
            'or_number' => 'OR-2025-11111',
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/status")
            ->on()->desktop();

        $page->assertSee('Payment Status')
            ->assertSee('Confirmed')
            ->assertSee('OR-2025-11111')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });
});
