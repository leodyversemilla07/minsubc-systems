# Task 1: Registrar DRS - Missing Features Implementation

**Assigned To:** Backend/Full-Stack Developer  
**Module:** Registrar (Document Request System)  
**Timeline:** 2-3 weeks  
**Complexity:** Medium  
**Priority:** High (Production Blocker)  
**Reference:** [`Missing-Features-Audit.md`](./Missing-Features-Audit.md)

---

## 📋 Overview

The Registrar DRS module is **~85% complete** with all core functionality working. This task focuses on implementing the **missing 15%** to make it production-ready.

**Current Status:**
- ✅ 44/44 tests passing
- ✅ Core document request workflow complete
- ✅ Payment system (cash with PRN/OR) working
- ✅ Notifications service exists
- ❌ Receipt printing not implemented
- ❌ Advanced reports missing

---

## 🎯 Task Breakdown

### Task 1.1: Official Receipt (OR) Printing System
**Priority:** 🔴 Critical  
**Effort:** 2-3 days  
**Status:** Not Started

#### Requirements
- Generate printable Official Receipt after cashier confirms payment
- Include all required OR fields (OR number, student info, amount, document type)
- Professional PDF format with MinSU branding
- Print-friendly browser layout
- Store receipt URL in database

#### Implementation

**Step 1: Create Receipt Service**

```php
<?php
// Modules/Registrar/app/Services/ReceiptService.php

namespace Modules\Registrar\Services;

use Modules\Registrar\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptService
{
    /**
     * Generate Official Receipt PDF
     */
    public function generateReceipt(Payment $payment): string
    {
        $request = $payment->documentRequest;
        $student = $request->student;
        
        $data = [
            'or_number' => $payment->official_receipt_number,
            'date' => $payment->paid_at->format('F d, Y'),
            'student_name' => $student->user->full_name,
            'student_id' => $student->student_id,
            'document_type' => $request->document_type,
            'quantity' => $request->quantity,
            'amount' => $payment->amount,
            'payment_method' => 'Cash',
            'cashier' => $payment->cashier->name ?? 'N/A',
        ];

        $pdf = Pdf::loadView('registrar::receipts.official-receipt', $data);
        
        // Save PDF
        $filename = "OR-{$payment->official_receipt_number}.pdf";
        $path = "receipts/registrar/{$filename}";
        Storage::disk('public')->put($path, $pdf->output());
        
        // Update payment record
        $payment->update([
            'receipt_url' => Storage::url($path),
        ]);

        return $path;
    }

    /**
     * View receipt (returns PDF response)
     */
    public function viewReceipt(Payment $payment)
    {
        $request = $payment->documentRequest;
        $student = $request->student;
        
        $data = [
            'or_number' => $payment->official_receipt_number,
            'date' => $payment->paid_at->format('F d, Y'),
            'student_name' => $student->user->full_name,
            'student_id' => $student->student_id,
            'document_type' => $request->document_type,
            'quantity' => $request->quantity,
            'amount' => $payment->amount,
            'payment_method' => 'Cash',
            'cashier' => $payment->cashier->name ?? 'N/A',
        ];

        return Pdf::loadView('registrar::receipts.official-receipt', $data)
                   ->setPaper('a4')
                   ->stream("OR-{$payment->official_receipt_number}.pdf");
    }
}
```

**Step 2: Create Blade Template**

```blade
{{-- Modules/Registrar/resources/views/receipts/official-receipt.blade.php --}}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Official Receipt - {{ $or_number }}</title>
    <style>
        @page { margin: 1cm; }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        .logo {
            width: 80px;
            height: 80px;
        }
        .university-name {
            font-size: 18px;
            font-weight: bold;
            margin: 5px 0;
        }
        .receipt-title {
            font-size: 24px;
            font-weight: bold;
            margin-top: 15px;
        }
        .receipt-number {
            font-size: 16px;
            color: #666;
        }
        .content {
            margin: 30px 0;
        }
        .row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .label {
            font-weight: bold;
            width: 40%;
        }
        .value {
            width: 60%;
        }
        .amount-section {
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            border: 2px solid #000;
        }
        .amount-label {
            font-size: 14px;
            color: #666;
        }
        .amount-value {
            font-size: 28px;
            font-weight: bold;
            margin: 10px 0;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #000;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-box {
            width: 45%;
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 50px;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">MINDORO STATE UNIVERSITY</div>
        <div>Bongabong Campus</div>
        <div class="receipt-title">OFFICIAL RECEIPT</div>
        <div class="receipt-number">No. {{ $or_number }}</div>
    </div>

    <div class="content">
        <div class="row">
            <span class="label">Date:</span>
            <span class="value">{{ $date }}</span>
        </div>
        <div class="row">
            <span class="label">Student Name:</span>
            <span class="value">{{ $student_name }}</span>
        </div>
        <div class="row">
            <span class="label">Student ID:</span>
            <span class="value">{{ $student_id }}</span>
        </div>
        <div class="row">
            <span class="label">Document Type:</span>
            <span class="value">{{ $document_type }}</span>
        </div>
        <div class="row">
            <span class="label">Quantity:</span>
            <span class="value">{{ $quantity }}</span>
        </div>
        <div class="row">
            <span class="label">Payment Method:</span>
            <span class="value">{{ $payment_method }}</span>
        </div>
    </div>

    <div class="amount-section">
        <div class="amount-label">AMOUNT PAID</div>
        <div class="amount-value">₱{{ number_format($amount, 2) }}</div>
        <div style="font-size: 12px; margin-top: 10px;">
            Amount in Words: {{ ucwords(\Illuminate\Support\Str::studly(\NumberFormatter::create('en', \NumberFormatter::SPELLOUT)->format($amount))) }} Pesos Only
        </div>
    </div>

    <div class="footer">
        <div class="row">
            <span class="label">Processed By:</span>
            <span class="value">{{ $cashier }}</span>
        </div>
        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-line">Student Signature</div>
            </div>
            <div class="signature-box">
                <div class="signature-line">Cashier Signature</div>
            </div>
        </div>
    </div>

    <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #999;">
        This is an official receipt from Mindoro State University - Bongabong Campus<br>
        For verification, please contact the Registrar's Office
    </div>
</body>
</html>
```

**Step 3: Add Controller Endpoint**

```php
// In Modules/Registrar/app/Http/Controllers/PaymentController.php

use Modules\Registrar\Services\ReceiptService;

public function __construct(
    protected ReceiptService $receiptService
) {}

/**
 * GET /registrar/payments/{payment}/receipt
 * View/Download receipt
 */
public function viewReceipt(Payment $payment)
{
    // Authorize
    $this->authorize('viewReceipt', $payment);
    
    return $this->receiptService->viewReceipt($payment);
}

/**
 * POST /registrar/payments/{payment}/generate-receipt
 * Generate receipt after payment confirmation
 */
public function generateReceipt(Payment $payment)
{
    $this->authorize('generateReceipt', $payment);
    
    $path = $this->receiptService->generateReceipt($payment);
    
    return back()->with('success', 'Receipt generated successfully');
}
```

**Step 4: Add Frontend Print Button**

```tsx
// In resources/js/pages/registrar/cashier/dashboard.tsx

{payment.status === 'paid' && payment.receipt_url && (
    <div className="flex gap-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`/registrar/payments/${payment.id}/receipt`, '_blank')}
        >
            <Printer className="h-4 w-4 mr-2" />
            View Receipt
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => {
                const link = document.createElement('a');
                link.href = payment.receipt_url;
                link.download = `OR-${payment.official_receipt_number}.pdf`;
                link.click();
            }}
        >
            <Download className="h-4 w-4 mr-2" />
            Download
        </Button>
    </div>
)}
```

#### Testing

```php
// tests/Feature/Registrar/ReceiptGenerationTest.php

it('generates official receipt after payment confirmation', function () {
    $payment = Payment::factory()->paid()->create();
    
    $service = app(ReceiptService::class);
    $path = $service->generateReceipt($payment);
    
    expect(Storage::disk('public')->exists($path))->toBeTrue();
    expect($payment->fresh()->receipt_url)->not->toBeNull();
});

it('cashier can view receipt', function () {
    $cashier = User::factory()->cashier()->create();
    $payment = Payment::factory()->paid()->create();
    
    $response = $this->actingAs($cashier)
        ->get("/registrar/payments/{$payment->id}/receipt");
    
    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

it('student can download their receipt', function () {
    $student = Student::factory()->create();
    $payment = Payment::factory()->forStudent($student)->paid()->create();
    
    $response = $this->actingAs($student->user)
        ->get("/registrar/payments/{$payment->id}/receipt");
    
    $response->assertSuccessful();
});
```

---

### Task 1.2: Daily Collection Reports
**Priority:** 🔴 Critical  
**Effort:** 2 days  
**Status:** Not Started

#### Requirements
- Generate daily cashier collection summary
- Show all payments collected by each cashier
- Total collections by payment method
- Downloadable PDF format
- Filter by date range

#### Implementation

```php
// Modules/Registrar/app/Services/ReportService.php

namespace Modules\Registrar\Services;

use Modules\Registrar\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function generateDailyCollectionReport(\Carbon\Carbon $date)
    {
        $collections = Payment::query()
            ->where('status', 'paid')
            ->whereDate('paid_at', $date)
            ->with(['cashier', 'documentRequest'])
            ->get()
            ->groupBy('cashier_id');

        $data = [
            'date' => $date->format('F d, Y'),
            'collections' => $collections,
            'total' => Payment::whereDate('paid_at', $date)->sum('amount'),
        ];

        return Pdf::loadView('registrar::reports.daily-collection', $data)
                   ->setPaper('a4', 'landscape')
                   ->stream("DailyCollection-{$date->format('Y-m-d')}.pdf");
    }
}
```

---

### Task 1.3: Email Template Design
**Priority:** 🟡 Medium  
**Effort:** 1 day  
**Status:** Not Started

Create branded HTML email templates instead of plain text.

---

## 📦 Dependencies

**Required Packages:**
```bash
composer require barryvdh/laravel-dompdf
```

**Configuration:**
```php
// config/services.php
'registrar' => [
    'notification_email' => env('REGISTRAR_NOTIFICATION_EMAIL', 'registrar@minsubc.edu.ph'),
    'or_prefix' => env('OR_NUMBER_PREFIX', 'OR'),
],
```

---

## ✅ Acceptance Criteria

- [ ] Cashier can print Official Receipt after confirming payment
- [ ] Receipt includes all required fields (OR#, student info, amount)
- [ ] Receipt is stored in database and accessible later
- [ ] Student can download their receipt from dashboard
- [ ] Daily collection report can be generated by admin
- [ ] All new features have passing tests

---

## 📝 Notes

- Existing `RegistrarNotificationService` already handles SMS/Email
- `ExpireUnpaidDocumentRequests` command exists for payment expiration
- Focus on receipt generation as #1 priority

**Estimated Total Effort:** 4-5 days
