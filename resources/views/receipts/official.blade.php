<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Official Receipt - {{ $payment->official_receipt_number }}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .university-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .receipt-title {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
        }
        .receipt-number {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
        }
        .details {
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            padding: 2px 0;
        }
        .detail-label {
            font-weight: bold;
            min-width: 120px;
        }
        .amount-section {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 10px 0;
            margin: 20px 0;
            text-align: center;
        }
        .amount {
            font-size: 16px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
        }
        .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            width: 45%;
            text-align: center;
            border-top: 1px solid #000;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">{{ $university['name'] }}</div>
        <div>{{ $university['address'] }}</div>
        <div>{{ $university['contact'] }}</div>
    </div>

    <div class="receipt-title">OFFICIAL RECEIPT</div>
    <div class="receipt-number">No. {{ $payment->official_receipt_number }}</div>

    <div class="details">
        <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span>{{ $payment->paid_at ? $payment->paid_at->format('M d, Y') : now()->format('M d, Y') }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Received from:</span>
            <span>{{ $payment->documentRequest->student->user->full_name }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Student ID:</span>
            <span>{{ $payment->documentRequest->student->student_id }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Request Number:</span>
            <span>{{ $payment->documentRequest->request_number }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Document Type:</span>
            <span>{{ ucfirst($payment->documentRequest->document_type) }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Payment Method:</span>
            <span>Cash</span>
        </div>
    </div>

    <div class="amount-section">
        <div class="amount">₱{{ number_format($payment->amount, 2) }}</div>
        <div>({{ ucwords($payment->amount == 1 ? 'peso' : 'pesos') }} only)</div>
    </div>

    <div class="details">
        <div class="detail-row">
            <span class="detail-label">For:</span>
            <span>{{ ucfirst($payment->documentRequest->document_type) }} Processing Fee</span>
        </div>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div>Received by:</div>
            <div style="margin-top: 30px;">{{ $payment->cashier->name ?? 'Cashier' }}</div>
            <div>Cashier</div>
        </div>
        <div class="signature-box">
            <div>Approved by:</div>
            <div style="margin-top: 30px;">_______________________</div>
            <div>Registrar</div>
        </div>
    </div>

    <div class="footer">
        <p>This is a system-generated receipt. No signature required.</p>
        <p>Generated on: {{ now()->format('M d, Y h:i A') }}</p>
    </div>
</body>
</html>