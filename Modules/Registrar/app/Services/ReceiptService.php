<?php

namespace Modules\Registrar\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Collection;
use Modules\Registrar\Models\Payment;
use Symfony\Component\HttpFoundation\Response;

class ReceiptService
{
    /**
     * Generate PDF receipt for a payment.
     */
    public function generateReceipt(Payment $payment): Response
    {
        $payment->load(['documentRequest.student.user', 'cashier']);

        $html = $this->generateReceiptHtml($payment);

        return Pdf::loadHTML($html)
            ->setPaper('a5', 'portrait')
            ->stream("Receipt-{$payment->official_receipt_number}.pdf");
    }

    /**
     * Download PDF receipt for a payment.
     */
    public function downloadReceipt(Payment $payment): Response
    {
        $payment->load(['documentRequest.student.user', 'cashier']);

        $html = $this->generateReceiptHtml($payment);

        return Pdf::loadHTML($html)
            ->setPaper('a5', 'portrait')
            ->download("Receipt-{$payment->official_receipt_number}.pdf");
    }

    /**
     * Generate daily collection report PDF.
     */
    public function generateDailyCollectionReport(string $date): Response
    {
        $payments = Payment::query()
            ->where('status', 'paid')
            ->whereDate('paid_at', $date)
            ->with(['documentRequest.student.user', 'cashier'])
            ->orderBy('paid_at')
            ->get();

        $html = $this->generateDailyCollectionHtml($payments, $date);

        return Pdf::loadHTML($html)
            ->setPaper('a4', 'portrait')
            ->stream("Daily-Collection-Report-{$date}.pdf");
    }

    /**
     * Generate HTML for receipt.
     */
    private function generateReceiptHtml(Payment $payment): string
    {
        $documentTypes = [
            'coe' => 'Certificate of Enrollment',
            'cog' => 'Certificate of Grades',
            'tor' => 'Transcript of Records',
            'honorable_dismissal' => 'Honorable Dismissal',
            'certificate_good_moral' => 'Certificate of Good Moral Character',
            'cav' => 'Certificate of Authentication and Verification',
            'diploma' => 'Diploma (Certified True Copy)',
            'so' => 'Special Order',
            'form_137' => 'Form 137',
        ];

        $documentType = $documentTypes[$payment->documentRequest->document_type] ?? $payment->documentRequest->document_type;
        $studentName = $payment->documentRequest->student->user->full_name;
        $studentId = $payment->documentRequest->student->student_id;
        $requestNumber = $payment->documentRequest->request_number;
        $purpose = $payment->documentRequest->purpose;
        $paymentRef = $payment->payment_reference_number;
        $amount = $this->formatMoney($payment->amount);
        $dateFormatted = $payment->paid_at->format('F d, Y');
        $timeFormatted = $payment->paid_at->format('h:i A');
        $cashierName = $payment->cashier->full_name ?? 'N/A';
        $orNumber = $payment->official_receipt_number;
        $timestampFormatted = $payment->paid_at->format('F d, Y h:i A');

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Official Receipt - {$payment->official_receipt_number}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 15px;
        }
        .logo-section {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }
        .university-name {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            text-transform: uppercase;
        }
        .university-address {
            font-size: 10px;
            color: #666;
            margin-top: 5px;
        }
        .receipt-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .receipt-number {
            font-size: 12px;
            color: #dc2626;
            font-weight: bold;
            margin-top: 5px;
        }
        .details-section {
            margin: 20px 0;
            padding: 15px;
            background: #f8fafc;
            border-radius: 5px;
        }
        .detail-row {
            display: flex;
            margin-bottom: 8px;
        }
        .detail-label {
            font-weight: bold;
            width: 140px;
            color: #374151;
        }
        .detail-value {
            flex: 1;
        }
        .amount-section {
            background: #1e40af;
            color: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
        }
        .amount-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .amount-value {
            font-size: 24px;
            font-weight: bold;
            margin-top: 5px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px dashed #ccc;
            text-align: center;
            font-size: 9px;
            color: #666;
        }
        .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            border-top: 1px solid #333;
            padding-top: 5px;
            margin-top: 30px;
        }
        .timestamp {
            font-size: 10px;
            color: #666;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">Mindoro State University</div>
        <div class="university-address">Bongabong Campus, Oriental Mindoro</div>
        <div class="receipt-title">Official Receipt</div>
        <div class="receipt-number">OR No: {$orNumber}</div>
    </div>

    <div class="details-section">
        <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">{$dateFormatted}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Time:</span>
            <span class="detail-value">{$timeFormatted}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Student Name:</span>
            <span class="detail-value">{$studentName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Student ID:</span>
            <span class="detail-value">{$studentId}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Request Number:</span>
            <span class="detail-value">{$requestNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Document Type:</span>
            <span class="detail-value">{$documentType}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Purpose:</span>
            <span class="detail-value">{$purpose}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Payment Method:</span>
            <span class="detail-value">Cash</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Reference Number:</span>
            <span class="detail-value">{$paymentRef}</span>
        </div>
    </div>

    <div class="amount-section">
        <div class="amount-label">Amount Paid</div>
        <div class="amount-value">₱ {$amount}</div>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line">Received From</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">Cashier: {$cashierName}</div>
        </div>
    </div>

    <div class="footer">
        <p>This is an official receipt. Please keep this for your records.</p>
        <p class="timestamp">Generated on: {$timestampFormatted}</p>
        <p>MinSU Document Request System</p>
    </div>
</body>
</html>
HTML;
    }

    /**
     * Generate HTML for daily collection report.
     */
    private function generateDailyCollectionHtml(Collection $payments, string $date): string
    {
        $totalAmount = $payments->sum('amount');
        $totalCount = $payments->count();
        $formattedDate = \Carbon\Carbon::parse($date)->format('F d, Y');

        $tableRows = '';
        $counter = 1;
        foreach ($payments as $payment) {
            $orNumber = $payment->official_receipt_number;
            $prn = $payment->payment_reference_number;
            $studentId = $payment->documentRequest->student->student_id;
            $studentName = $payment->documentRequest->student->user->full_name;
            $docType = $payment->documentRequest->document_type;
            $amountFormatted = $this->formatMoney($payment->amount);
            $timeFormatted = $payment->paid_at->format('h:i A');
            $cashierName = $payment->cashier->full_name ?? 'N/A';

            $tableRows .= <<<HTML
            <tr>
                <td style="text-align: center;">{$counter}</td>
                <td>{$orNumber}</td>
                <td>{$prn}</td>
                <td>{$studentId}</td>
                <td>{$studentName}</td>
                <td>{$docType}</td>
                <td style="text-align: right;">₱ {$amountFormatted}</td>
                <td>{$timeFormatted}</td>
                <td>{$cashierName}</td>
            </tr>
HTML;
            $counter++;
        }

        if ($payments->isEmpty()) {
            $tableRows = '<tr><td colspan="9" style="text-align: center; padding: 20px;">No payments recorded for this date.</td></tr>';
        }

        $totalAmountFormatted = $this->formatMoney($totalAmount);
        $generatedAt = now()->format('F d, Y h:i A');

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Daily Collection Report - {$formattedDate}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 10px;
            line-height: 1.4;
            color: #333;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 15px;
        }
        .university-name {
            font-size: 14px;
            font-weight: bold;
            color: #1e40af;
            text-transform: uppercase;
        }
        .university-address {
            font-size: 10px;
            color: #666;
            margin-top: 5px;
        }
        .report-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            margin-top: 15px;
            text-transform: uppercase;
        }
        .report-date {
            font-size: 12px;
            color: #374151;
            margin-top: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background: #1e40af;
            color: white;
            padding: 8px 5px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
        }
        td {
            border-bottom: 1px solid #e5e7eb;
            padding: 6px 5px;
            font-size: 9px;
        }
        tr:nth-child(even) {
            background: #f8fafc;
        }
        .summary {
            margin-top: 20px;
            padding: 15px;
            background: #f0f9ff;
            border: 1px solid #1e40af;
            border-radius: 5px;
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        .summary-label {
            font-weight: bold;
        }
        .total-amount {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-box {
            text-align: center;
            width: 30%;
        }
        .signature-line {
            border-top: 1px solid #333;
            padding-top: 5px;
            margin-top: 40px;
            font-size: 9px;
        }
        .timestamp {
            font-size: 8px;
            color: #666;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">Mindoro State University - Bongabong Campus</div>
        <div class="university-address">Office of the University Registrar</div>
        <div class="report-title">Daily Collection Report</div>
        <div class="report-date">{$formattedDate}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 30px;">#</th>
                <th style="width: 80px;">OR Number</th>
                <th style="width: 100px;">PRN</th>
                <th style="width: 80px;">Student ID</th>
                <th>Student Name</th>
                <th style="width: 60px;">Document</th>
                <th style="width: 70px; text-align: right;">Amount</th>
                <th style="width: 50px;">Time</th>
                <th style="width: 80px;">Cashier</th>
            </tr>
        </thead>
        <tbody>
            {$tableRows}
        </tbody>
    </table>

    <div class="summary">
        <div class="summary-row">
            <span class="summary-label">Total Transactions:</span>
            <span>{$totalCount}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Total Collection:</span>
            <span class="total-amount">₱ {$totalAmountFormatted}</span>
        </div>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line">Prepared By</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">Verified By</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">Approved By</div>
        </div>
    </div>

    <div class="timestamp">
        Generated on: {$generatedAt} | MinSU Document Request System
    </div>
</body>
</html>
HTML;
    }

    /**
     * Format money value.
     */
    private function formatMoney(float $amount): string
    {
        return number_format($amount, 2);
    }
}
