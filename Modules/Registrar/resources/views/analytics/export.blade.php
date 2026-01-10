<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registrar Analytics Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #3b82f6;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #1e40af;
        }
        .header p {
            margin: 5px 0 0;
            color: #6b7280;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        .stat-card {
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            background-color: #f9fafb;
        }
        .stat-card .label {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 5px;
        }
        .stat-card .value {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
        }
        .stat-card.green { background-color: #ecfdf5; }
        .stat-card.blue { background-color: #eff6ff; }
        .stat-card.amber { background-color: #fffbeb; }
        .stat-card.red { background-color: #fef2f2; }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .table th,
        .table td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        .table th {
            background-color: #f3f4f6;
            font-weight: 600;
        }
        .table tr:nth-child(even) {
            background-color: #f9fafb;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 10px;
            color: #9ca3af;
        }
        .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Registrar Analytics Report</h1>
        <p>Mindoro State University - Bongabong Campus</p>
        <p>Period: {{ ucfirst(str_replace(['days', 'year'], [' Days', ' Year'], $period)) }} | Generated: {{ $generatedAt }}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Overview Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Total Requests</div>
                <div class="value">{{ number_format($stats['total_requests']) }}</div>
            </div>
            <div class="stat-card amber">
                <div class="label">Pending Requests</div>
                <div class="value">{{ number_format($stats['pending_requests']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Completed Requests</div>
                <div class="value">{{ number_format($stats['completed_requests']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Completion Rate</div>
                <div class="value">{{ number_format($stats['completion_rate'], 1) }}%</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Revenue Summary</h2>
        <div class="stats-grid">
            <div class="stat-card green">
                <div class="label">Total Revenue</div>
                <div class="value">₱{{ number_format($revenueStats['total_revenue'], 2) }}</div>
            </div>
            <div class="stat-card amber">
                <div class="label">Pending Revenue</div>
                <div class="value">₱{{ number_format($revenueStats['pending_revenue'], 2) }}</div>
            </div>
            <div class="stat-card blue">
                <div class="label">Paid Requests</div>
                <div class="value">{{ number_format($revenueStats['paid_requests']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Avg Processing Time</div>
                <div class="value">{{ number_format($stats['average_processing_time'], 1) }}h</div>
            </div>
        </div>
    </div>

    <div class="section two-col">
        <div>
            <h2 class="section-title">Requests by Document Type</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Document Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($stats['requests_by_type'] as $item)
                    <tr>
                        <td>{{ $item->document_type }}</td>
                        <td>{{ number_format($item->count) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div>
            <h2 class="section-title">Requests by Status</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($stats['requests_by_status'] as $item)
                    <tr>
                        <td>{{ ucwords(str_replace('_', ' ', $item->status)) }}</td>
                        <td>{{ number_format($item->count) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Top Requested Documents</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Document Type</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($stats['top_requested_documents'] as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->document_type }}</td>
                    <td>{{ number_format($item->count) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>This report was automatically generated by MinSU BC Systems Platform.</p>
        <p>Generated on {{ $generatedAt }}</p>
    </div>
</body>
</html>
