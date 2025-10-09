<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate of Enrollment - {{ $request->request_number }}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
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
        .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            width: 200px;
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 40px;
            padding-top: 5px;
        }
        .qr-code {
            position: absolute;
            top: 40px;
            right: 40px;
            width: 80px;
            height: 80px;
        }
        .footer {
            margin-top: 30px;
            font-size: 10pt;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 10px;
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
        <div class="certificate-title">CERTIFICATE OF ENROLLMENT</div>
    </div>

    <div class="content">
        <p>This is to certify that</p>

        <div class="student-info">
            <strong>{{ $student->user->full_name }}</strong><br>
            Student ID: {{ $student->student_id }}<br>
            Course: {{ $student->course }}<br>
            Year Level: {{ $student->year_level }}
        </div>

        <p>is currently enrolled as a regular student of Minzu University for the current semester.</p>

        <p>This certificate is issued upon the student's request for <strong>{{ $request->purpose ?? 'personal purposes' }}</strong> and is valid until <strong>{{ $valid_until }}</strong>.</p>

        <p>Issued this <strong>{{ $issued_date }}</strong> at Minzu University, Philippines.</p>
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
        <p>This document is electronically generated and valid when verified through the QR code.</p>
    </div>
</body>
</html>