<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Transcript of Records - {{ $request->request_number }}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.4;
            margin: 0;
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .university-name {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .document-title {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .student-info {
            margin: 15px 0;
            font-size: 10pt;
        }
        .student-info table {
            width: 100%;
            border-collapse: collapse;
        }
        .student-info td {
            padding: 2px 5px;
        }
        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 9pt;
        }
        .grades-table th, .grades-table td {
            border: 1px solid #000;
            padding: 4px;
            text-align: center;
        }
        .grades-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            width: 180px;
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 30px;
            padding-top: 3px;
            font-size: 9pt;
        }
        .qr-code {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
        }
        .footer {
            margin-top: 20px;
            font-size: 8pt;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="qr-code">
        <img src="{{ $qr_code }}" alt="QR Code" style="width: 100%; height: 100%;">
    </div>

    <div class="header">
        <div class="university-name">MINZU UNIVERSITY</div>
        <div>Registrar's Office</div>
        <div class="document-title">TRANSCRIPT OF RECORDS</div>
    </div>

    <div class="student-info">
        <table>
            <tr>
                <td width="15%"><strong>Name:</strong></td>
                <td width="35%">{{ $student->user->full_name }}</td>
                <td width="15%"><strong>Student ID:</strong></td>
                <td width="35%">{{ $student->student_id }}</td>
            </tr>
            <tr>
                <td><strong>Course:</strong></td>
                <td>{{ $student->course }}</td>
                <td><strong>Year Level:</strong></td>
                <td>{{ $student->year_level }}</td>
            </tr>
        </table>
    </div>

    <table class="grades-table">
        <thead>
            <tr>
                <th width="10%">Code</th>
                <th width="40%">Subject</th>
                <th width="10%">Units</th>
                <th width="10%">Grade</th>
                <th width="15%">Remarks</th>
                <th width="15%">Semester</th>
            </tr>
        </thead>
        <tbody>
            @foreach($academic_records as $record)
            <tr>
                <td>{{ $record['code'] ?? 'N/A' }}</td>
                <td>{{ $record['subject'] }}</td>
                <td>{{ $record['units'] }}</td>
                <td>{{ $record['grade'] }}</td>
                <td>{{ $record['grade'] <= 3.0 ? 'Passed' : 'Failed' }}</td>
                <td>{{ $record['semester'] ?? 'Current' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div style="margin: 20px 0; font-size: 10pt;">
        <p><strong>GWA (General Weighted Average):</strong> {{ number_format(1.45, 2) }}</p>
        <p><strong>Academic Status:</strong> {{ $student->year_level >= 3 ? 'Good Standing' : 'Regular' }}</p>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line">
                Registrar
            </div>
        </div>
        <div class="signature-box">
            <div class="signature-line">
                Student
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Request Number: {{ $request->request_number }} | Generated: {{ now()->format('M j, Y g:i A') }}</p>
        <p>This transcript is electronically generated and valid when verified through the QR code.</p>
    </div>
</body>
</html>