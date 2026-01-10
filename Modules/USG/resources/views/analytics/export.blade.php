<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>USG Analytics Report</title>
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
            border-bottom: 2px solid #10b981;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #059669;
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
            color: #059669;
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
        .stat-card.purple { background-color: #f5f3ff; }
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
        <h1>USG Analytics Report</h1>
        <p>Mindoro State University - Bongabong Campus</p>
        <p>Period: {{ ucfirst(str_replace(['days', 'year'], [' Days', ' Year'], $period)) }} | Generated: {{ $generatedAt }}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Announcements Overview</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Total Announcements</div>
                <div class="value">{{ number_format($stats['total_announcements']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Published</div>
                <div class="value">{{ number_format($stats['published_announcements']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Drafts</div>
                <div class="value">{{ number_format($stats['draft_announcements']) }}</div>
            </div>
            <div class="stat-card purple">
                <div class="label">New This Period</div>
                <div class="value">{{ number_format($stats['announcements_in_period']) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Events Overview</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Total Events</div>
                <div class="value">{{ number_format($stats['total_events']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Upcoming</div>
                <div class="value">{{ number_format($stats['upcoming_events']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Past Events</div>
                <div class="value">{{ number_format($stats['past_events']) }}</div>
            </div>
            <div class="stat-card purple">
                <div class="label">Event Registrations</div>
                <div class="value">{{ number_format($stats['total_registrations']) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Officers & Resolutions</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Total Officers</div>
                <div class="value">{{ number_format($stats['total_officers']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Active Officers</div>
                <div class="value">{{ number_format($stats['active_officers']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Total Resolutions</div>
                <div class="value">{{ number_format($stats['total_resolutions']) }}</div>
            </div>
            <div class="stat-card purple">
                <div class="label">Published Resolutions</div>
                <div class="value">{{ number_format($stats['published_resolutions']) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Announcements by Category</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($trends['announcements_by_category'] as $item)
                <tr>
                    <td>{{ $item->category }}</td>
                    <td>{{ number_format($item->count) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">Events by Month</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($trends['events_by_month'] as $item)
                <tr>
                    <td>{{ date('F', mktime(0, 0, 0, $item->month, 1)) }}</td>
                    <td>{{ $item->year }}</td>
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
