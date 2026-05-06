<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grade Sheet - {{ $section->name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            line-height: 1.3;
            color: #000;
        }
        
        .container {
            max-width: 11in;
            margin: 0 auto;
            padding: 0.5in;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        
        .header h1 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 14px;
            font-weight: bold;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
            font-size: 10px;
        }
        
        .info-item {
            border: 1px solid #000;
            padding: 8px;
        }
        
        .info-label {
            font-weight: bold;
            text-transform: uppercase;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 5px 8px;
            font-size: 9px;
        }
        
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }
        
        .student-info {
            text-align: left;
        }
        
        .student-info td:first-child {
            width: 30px;
            text-align: center;
        }
        
        .text-center {
            text-align: center;
        }
        
        .grade-input {
            width: 40px;
            border: none;
            border-bottom: 1px solid #000;
            text-align: center;
        }
        
        .signature-area {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        
        .signature-block {
            width: 250px;
            text-align: center;
        }
        
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 40px;
            padding-top: 5px;
        }
        
        .footer {
            margin-top: 30px;
            font-size: 8px;
            text-align: center;
            border-top: 1px solid #000;
            padding-top: 10px;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        @media print {
            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MINESU BC SYSTEMS</h1>
            <h2>OFFICIAL GRADE SHEET</h2>
            <p>Bongabong Campus • Mindoro, Philippines</p>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Section:</span> {{ $section->name }}
            </div>
            <div class="info-item">
                <span class="info-label">Course:</span> {{ $section->course?->name ?? 'N/A' }}
            </div>
            <div class="info-item">
                <span class="info-label">Academic Year:</span> {{ $section->academic_year }}
            </div>
            <div class="info-item">
                <span class="info-label">Semester:</span> {{ $section->semester }}
            </div>
            <div class="info-item">
                <span class="info-label">Year Level:</span> {{ $section->year_level }}
            </div>
            <div class="info-item">
                <span class="info-label">Adviser:</span> {{ $section->adviser?->full_name ?? 'TBA' }}
            </div>
            <div class="info-item">
                <span class="info-label">Date:</span> {{ date('F d, Y') }}
            </div>
            <div class="info-item">
                <span class="info-label">Page:</span> 1 of 1
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th style="width: 30px;">#</th>
                    <th style="width: 80px;">Student ID</th>
                    <th class="student-info">Student Name</th>
                    @foreach($subjects as $subject)
                        <th style="width: 60px;" class="text-center">
                            {{ $subject->code }}<br>
                            <span style="font-size: 8px; font-weight: normal;">({{ $subject->units }})</span>
                        </th>
                    @endforeach
                    <th style="width: 50px;">GPA</th>
                </tr>
            </thead>
            <tbody>
                @php $num = 1; @endphp
                @forelse($enrollments as $enrollment)
                    <tr>
                        <td class="text-center">{{ $num++ }}</td>
                        <td class="text-center">{{ $enrollment->student_id ?? 'N/A' }}</td>
                        <td class="student-info">{{ $enrollment->full_name }}</td>
                        @foreach($subjects as $subject)
                            @php
                                $es = $enrollment->subjects->firstWhere('subject_id', $subject->id);
                                $grade = $es?->grade;
                            @endphp
                            <td class="text-center {{ $grade !== null && $grade < 75 ? 'bg-red-100' : '' }}">
                                {{ $grade !== null ? number_format($grade, 0) : '' }}
                            </td>
                        @endforeach
                        <td class="text-center font-bold">
                            {{ $enrollment->gpa ? number_format($enrollment->gpa, 2) : '' }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="{{ $subjects->count() + 4 }}" class="text-center py-8">
                            No students enrolled in this section.
                        </td>
                    </tr>
                @endforelse
                
                <!-- Empty rows for manual entry -->
                @for($i = $enrollments->count(); $i < 15; $i++)
                    <tr style="height: 25px;">
                        <td class="text-center">{{ $num++ }}</td>
                        <td></td>
                        <td></td>
                        @foreach($subjects as $subject)
                            <td></td>
                        @endforeach
                        <td></td>
                    </tr>
                @endfor
            </tbody>
        </table>
        
        <div class="signature-area">
            <div class="signature-block">
                <div class="signature-line">
                    <p><strong>Subject Instructors</strong></p>
                </div>
            </div>
            <div class="signature-block">
                <div class="signature-line">
                    <p><strong>Section Adviser</strong></p>
                    <p style="font-size: 8px;">{{ $section->adviser?->full_name ?? '' }}</p>
                </div>
            </div>
            <div class="signature-block">
                <div class="signature-line">
                    <p><strong>Dean / Program Head</strong></p>
                </div>
            </div>
            <div class="signature-block">
                <div class="signature-line">
                    <p><strong>University Registrar</strong></p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Legend:</strong> Grade below 75 = Failed (F) | Blank = No Grade Yet | (x) = Units</p>
            <p>Generated: {{ date('F d, Y H:i:s') }} | MinSU BC Systems</p>
        </div>
    </div>
    
    <script>
        window.onload = function() {
            // Auto-print when opened
            // window.print();
        }
    </script>
</body>
</html>