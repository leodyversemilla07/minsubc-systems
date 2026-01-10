<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Voting System Analytics Report</title>
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
            border-bottom: 2px solid #f59e0b;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #d97706;
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
            color: #d97706;
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
        .stat-card.purple { background-color: #f5f3ff; }
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
        <h1>Voting System Analytics Report</h1>
        <p>Mindoro State University - Bongabong Campus</p>
        <p>Period: {{ ucfirst(str_replace(['days', 'year'], [' Days', ' Year'], $period)) }} | Generated: {{ $generatedAt }}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Elections Overview</h2>
        <div class="stats-grid">
            <div class="stat-card amber">
                <div class="label">Total Elections</div>
                <div class="value">{{ number_format($stats['total_elections']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Active Elections</div>
                <div class="value">{{ number_format($stats['active_elections']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Completed</div>
                <div class="value">{{ number_format($stats['completed_elections']) }}</div>
            </div>
            <div class="stat-card purple">
                <div class="label">Total Candidates</div>
                <div class="value">{{ number_format($stats['total_candidates']) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Voter Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Total Voters</div>
                <div class="value">{{ number_format($stats['total_voters']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Voters Who Voted</div>
                <div class="value">{{ number_format($stats['voters_who_voted']) }}</div>
            </div>
            <div class="stat-card amber">
                <div class="label">Voter Turnout</div>
                <div class="value">{{ number_format($stats['voter_turnout'], 1) }}%</div>
            </div>
            <div class="stat-card purple">
                <div class="label">Total Votes Cast</div>
                <div class="value">{{ number_format($stats['total_votes']) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">System Overview</h2>
        <div class="stats-grid">
            <div class="stat-card blue">
                <div class="label">Positions</div>
                <div class="value">{{ number_format($stats['total_positions']) }}</div>
            </div>
            <div class="stat-card green">
                <div class="label">Partylists</div>
                <div class="value">{{ number_format($stats['total_partylists']) }}</div>
            </div>
            <div class="stat-card purple">
                <div class="label">Feedback Received</div>
                <div class="value">{{ number_format($stats['feedback_count']) }}</div>
            </div>
            <div class="stat-card">
                <div class="label">Avg Rating</div>
                <div class="value">{{ $stats['avg_rating'] > 0 ? number_format($stats['avg_rating'], 1) . '/5' : 'N/A' }}</div>
            </div>
        </div>
    </div>

    <div class="section two-col">
        <div>
            <h2 class="section-title">Votes by Election</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Election</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($trends['votes_by_election'] as $item)
                    <tr>
                        <td>{{ $item['name'] }}</td>
                        <td>{{ number_format($item['count']) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div>
            <h2 class="section-title">Candidates by Position</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Candidates</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($trends['candidates_by_position'] as $item)
                    <tr>
                        <td>{{ $item['name'] }}</td>
                        <td>{{ number_format($item['count']) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Voter Turnout by Election</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Election</th>
                    <th>Total Voters</th>
                    <th>Voted</th>
                    <th>Turnout</th>
                </tr>
            </thead>
            <tbody>
                @foreach($trends['voter_turnout_trend'] as $item)
                <tr>
                    <td>{{ $item['name'] }}</td>
                    <td>{{ number_format($item['total']) }}</td>
                    <td>{{ number_format($item['voted']) }}</td>
                    <td>{{ number_format($item['turnout'], 1) }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">Feedback Distribution</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Rating</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($trends['feedback_distribution'] as $item)
                <tr>
                    <td>{{ $item->rating }} Stars</td>
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
