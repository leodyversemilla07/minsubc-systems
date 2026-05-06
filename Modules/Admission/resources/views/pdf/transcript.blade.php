<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcript of Records</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            line-height: 1.4;
            color: #000;
        }
        
        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        
        .header img {
            max-width: 80px;
            margin-bottom: 10px;
        }
        
        .header h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 14px;
            font-weight: bold;
        }
        
        .header p {
            font-size: 10px;
        }
        
        .student-info {
            margin-bottom: 20px;
        }
        
        .student-info h3 {
            font-size: 12px;
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px 20px;
        }
        
        .info-item {
            display: flex;
        }
        
        .info-label {
            font-weight: bold;
            min-width: 100px;
        }
        
        .academic-record {
            margin-bottom: 20px;
        }
        
        .academic-record h3 {
            font-size: 12px;
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 4px 6px;
            text-align: left;
            font-size: 10px;
        }
        
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-right {
            text-align: right;
        }
        
        .semester-header {
            background-color: #e0e0e0;
            font-weight: bold;
            font-size: 11px;
        }
        
        .grade-passed {
            color: #000;
        }
        
        .grade-failed {
            color: #c00;
        }
        
        .grade-incomplete {
            color: #666;
            font-style: italic;
        }
        
        .summary {
            margin-top: 20px;
            border-top: 2px solid #000;
            padding-top: 15px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .summary-item {
            text-align: center;
            border: 1px solid #000;
            padding: 10px;
        }
        
        .summary-value {
            font-size: 18px;
            font-weight: bold;
        }
        
        .summary-label {
            font-size: 9px;
            text-transform: uppercase;
        }
        
        .gwa-box {
            background-color: #f9f9f9;
            border: 2px solid #000;
            padding: 15px;
            text-align: center;
            margin-top: 15px;
        }
        
        .gwa-value {
            font-size: 28px;
            font-weight: bold;
        }
        
        .gwa-label {
            font-size: 12px;
            font-weight: bold;
        }
        
        .footer {
            margin-top: 30px;
            font-size: 9px;
            border-top: 1px solid #000;
            padding-top: 10px;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
        }
        
        .signature-block {
            text-align: center;
            border-top: 1px solid #000;
            padding-top: 5px;
            margin-top: 30px;
        }
        
        .signature-line {
            width: 200px;
            border-bottom: 1px solid #000;
            margin: 0 auto 5px;
        }
        
        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            color: rgba(0,0,0,0.05);
            pointer-events: none;
            z-index: -1;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        @media print {
            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>MINESU BC SYSTEMS</h1>
            <h2>OFFICIAL TRANSCRIPT OF RECORDS</h2>
            <p>Bongabong Campus • Mindoro, Philippines</p>
        </div>
        
        <!-- Student Information -->
        <div class="student-info">
            <h3>STUDENT INFORMATION</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Student No.:</span>
                    <span>{{ $student['id'] }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date Issued:</span>
                    <span>{{ $generated_at }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span>{{ $student['last_name'] }}, {{ $student['first_name'] }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Purpose:</span>
                    <span>{{ $purpose }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Course:</span>
                    <span>{{ $student['course'] }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Issued By:</span>
                    <span>{{ $issued_by }}</span>
                </div>
            </div>
        </div>
        
        <!-- Academic Record -->
        <div class="academic-record">
            <h3>ACADEMIC RECORD</h3>
            
            @foreach($enrollments as $enrollment)
                <div style="margin-bottom: 15px;">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="6" class="semester-header">
                                    {{ $enrollment['academic_year'] }} - {{ $enrollment['semester'] }} Semester
                                    @if(isset($enrollment['section'])) 
                                        | Section: {{ $enrollment['section'] }} 
                                    @endif
                                    | Year Level: {{ $enrollment['year_level'] }}
                                </th>
                            </tr>
                            <tr>
                                <th style="width: 60px;">Code</th>
                                <th>Descriptive Title</th>
                                <th style="width: 40px;">Units</th>
                                <th style="width: 50px;">Grade</th>
                                <th style="width: 60px;">Points</th>
                                <th style="width: 60px;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($enrollment['subjects'] as $subject)
                                <tr>
                                    <td class="text-center">{{ $subject['code'] }}</td>
                                    <td>{{ $subject['name'] }}</td>
                                    <td class="text-center">{{ $subject['units'] }}</td>
                                    <td class="text-center @if($subject['grade'] >= 75) grade-passed @elseif($subject['grade']) grade-failed @else grade-incomplete @endif">
                                        {{ $subject['grade_display'] }}
                                    </td>
                                    <td class="text-center">{{ $subject['grade_points'] !== null ? number_format($subject['grade_points'], 1) : '-' }}</td>
                                    <td class="text-center">
                                        @if($subject['status'] === 'passed')
                                            P
                                        @elseif($subject['status'] === 'failed')
                                            F
                                        @elseif($subject['status'] === 'dropped')
                                            DR
                                        @elseif($subject['status'] === 'incomplete')
                                            INC
                                        @elseif($subject['status'] === 'enrolled')
                                            —
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="text-right"><strong>Semester Units:</strong></td>
                                <td class="text-center"><strong>{{ $enrollment['semester_units'] }}</strong></td>
                                <td colspan="2" class="text-right"><strong>Semester Average:</strong></td>
                                <td class="text-center">
                                    {{ $enrollment['semester_average'] !== null ? number_format($enrollment['semester_average'], 2) : 'N/A' }}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            @endforeach
        </div>
        
        <!-- Summary -->
        <div class="summary">
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-value">{{ $summary['total_subjects'] }}</div>
                    <div class="summary-label">Total Subjects</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">{{ $summary['total_units'] }}</div>
                    <div class="summary-label">Total Units</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">{{ $summary['passed_subjects'] }}</div>
                    <div class="summary-label">Passed</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">{{ $summary['failed_subjects'] }}</div>
                    <div class="summary-label">Failed</div>
                </div>
            </div>
            
            <div class="gwa-box">
                <div class="gwa-label">GENERAL WEIGHTED AVERAGE (GWA)</div>
                <div class="gwa-value">{{ $summary['gwa_display'] }}</div>
            </div>
        </div>
        
        <!-- Signature Block -->
        <div class="signature-block">
            <div class="signature-line"></div>
            <p style="font-weight: bold;">{{ $issued_by }}</p>
            <p style="font-size: 9px;">University Registrar</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-grid">
                <div>
                    <p><strong>Legend:</strong></p>
                    <p>P - Passed | F - Failed | DR - Dropped | INC - Incomplete</p>
                    <p>Grades below 75 are failing grades</p>
                </div>
                <div>
                    <p><strong>Grade Scale:</strong></p>
                    <p>98-100 = 4.0 | 95-97 = 3.9 | 92-94 = 3.7 | 89-91 = 3.5</p>
                    <p>86-88 = 3.2 | 83-85 = 3.0 | 80-82 = 2.7 | 77-79 = 2.5</p>
                    <p>75-76 = 2.3 | Below 75 = 0.0</p>
                </div>
                <div>
                    <p><strong>Remarks:</strong></p>
                    <p>This is an official document. Any alteration or erasure renders this invalid.</p>
                    <p style="font-size: 8px; margin-top: 5px;">Generated: {{ $generated_at }}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>