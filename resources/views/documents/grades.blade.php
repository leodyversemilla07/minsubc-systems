<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Certificate of Grades - {{ $request->request_number }}</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        .a4-page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0 auto;
            background: white;
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .university-name {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .certificate-title {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .content {
            margin: 20px 0;
            text-align: justify;
        }

        .student-info {
            margin: 20px 0;
            padding-left: 40px;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .grades-table th,
        .grades-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        .grades-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }

        .signature-section {
            margin-top: 50px;
            text-align: left;
        }

        .signature-box {
            width: 200px;
            display: inline-block;
            text-align: center;
        }

        .signature-line {
            border-top: 1px solid #000;
            margin-top: 40px;
            padding-top: 5px;
        }

        .footer {
            margin-top: 30px;
            font-size: 10pt;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            position: relative;
        }

        .qr-verification {
            position: absolute;
            bottom: 10px;
            right: 0;
            text-align: center;
            width: 2cm;
        }

        .qr-code {
            width: 2cm;
            height: 2cm;
            border: 2px solid #000;
            padding: 2mm;
            background: white;
            box-sizing: border-box;
        }

        .qr-code img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .qr-label {
            font-size: 8pt;
            font-weight: bold;
            margin-top: 2mm;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>

<body>
    <div class="a4-page">

        <div class="header">
            <div class="university-name">MINDORO STATE UNIVERSITY</div>
            <div>Registrar's Office</div>
            <div class="certificate-title">CERTIFICATE OF GRADES</div>
        </div>

        <div class="content">
            <p>This is to certify that</p>

            <div class="student-info">
                <strong>{{ $student->user->full_name }}</strong><br>
                Student ID: {{ $student->student_id }}<br>
                Course: {{ $student->course }}<br>
                Year Level: {{ $student->year_level }}
            </div>

            <p>has completed the following subjects with the corresponding grades:</p>
        </div>

        <table class="grades-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Semester</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($grades as $grade)
                    <tr>
                        <td>{{ $grade['subject'] }}</td>
                        <td>{{ $grade['grade'] }}</td>
                        <td>{{ $grade['semester'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div style="margin: 20px 0;">
            <p>This certificate is issued upon the student's request and is valid for academic purposes.</p>
            <p>Issued this <strong>{{ $issued_date }}</strong> at Mindoro State University, Philippines.</p>
        </div>

        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-line">
                    Registrar
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Request Number: {{ $request->request_number }} | Generated: {{ now()->format('M j, Y g:i A') }}</p>
            <p>This document is electronically generated and valid when verified through the QR code.</p>

            <div class="qr-verification">
                <div class="qr-code">
                    <img src="{{ $qr_code }}" alt="QR Code for Verification">
                </div>
                <div class="qr-label">Scan to Verify</div>
            </div>
        </div>
    </div>
</body>

</html>
