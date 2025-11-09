<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote Receipt - {{ $election->name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }

        .receipt-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }

        .receipt-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .receipt-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .receipt-header p {
            font-size: 16px;
            opacity: 0.95;
        }

        .receipt-body {
            padding: 30px;
        }

        .receipt-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .info-item {
            margin-bottom: 0;
        }

        .info-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
        }

        .info-value.reference {
            font-family: 'Courier New', monospace;
            color: #059669;
        }

        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 25px 0;
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: #10b981;
            border-radius: 2px;
        }

        .votes-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .vote-item {
            display: flex;
            gap: 15px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            align-items: flex-start;
        }

        .vote-number {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
        }

        .vote-details {
            flex: 1;
        }

        .vote-position {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .vote-candidate {
            font-size: 16px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 4px;
        }

        .vote-partylist {
            font-size: 13px;
            color: #059669;
            font-weight: 500;
        }

        .security-note {
            margin-top: 30px;
            padding: 20px;
            background: #ecfdf5;
            border: 1px solid #d1fae5;
            border-radius: 6px;
            text-align: center;
        }

        .security-note p {
            font-size: 13px;
            color: #065f46;
            margin-bottom: 8px;
        }

        .security-note p.important {
            font-weight: 700;
            font-size: 14px;
            color: #047857;
        }

        .receipt-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px dashed #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }

        .receipt-footer p {
            margin-bottom: 5px;
        }

        .logo {
            width: 80px;
            height: auto;
            margin: 0 auto 15px;
            display: block;
        }

        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }

            .receipt-container {
                border: none;
                box-shadow: none;
                max-width: 100%;
            }

            .no-print {
                display: none !important;
            }
        }

        /* Print Button */
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
            z-index: 1000;
        }

        .print-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .print-button svg {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            width: 16px;
            height: 16px;
        }
    </style>
</head>
<body>
    <button onclick="window.print()" class="print-button no-print">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print Receipt
    </button>

    <div class="receipt-container">
        <!-- Header -->
        <div class="receipt-header">
            @if(file_exists(public_path('votesys-logo.png')))
                <img src="{{ asset('votesys-logo.png') }}" alt="VoteSys Logo" class="logo">
            @endif
            <h1>Vote Confirmation Receipt</h1>
            <p>{{ $election->name }}</p>
        </div>

        <!-- Body -->
        <div class="receipt-body">
            <!-- Receipt Information -->
            <div class="receipt-info">
                <div class="info-item">
                    <div class="info-label">Reference ID</div>
                    <div class="info-value reference">{{ $referenceId }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Submitted At</div>
                    <div class="info-value">{{ \Carbon\Carbon::parse($timestamp)->format('M d, Y h:i A') }}</div>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Votes -->
            <div class="section-title">Your Selections</div>
            <div class="votes-list">
                @foreach($votes as $index => $vote)
                    <div class="vote-item">
                        <div class="vote-number">{{ $index + 1 }}</div>
                        <div class="vote-details">
                            <div class="vote-position">{{ $vote['position'] }}</div>
                            <div class="vote-candidate">{{ $vote['candidate'] }}</div>
                            @if(!empty($vote['partylist']))
                                <div class="vote-partylist">{{ $vote['partylist'] }}</div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Security Note -->
            <div class="security-note">
                <p>🔒 This is your official vote confirmation receipt.</p>
                <p class="important">Your vote has been securely recorded and cannot be changed.</p>
                <p>Keep this receipt for your records.</p>
            </div>

            <!-- Footer -->
            <div class="receipt-footer">
                <p><strong>Electronic Voting System</strong></p>
                <p>Secure • Transparent • Reliable</p>
                <p>Generated on {{ now()->format('M d, Y h:i A') }}</p>
            </div>
        </div>
    </div>

    <script>
        // Auto-trigger print dialog on load (optional)
        // window.onload = function() {
        //     window.print();
        // };
    </script>
</body>
</html>
