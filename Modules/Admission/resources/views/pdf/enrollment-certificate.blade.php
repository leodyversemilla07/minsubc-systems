<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Enrollment</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.6;
            text-align: center;
            padding: 40px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            border: 3px double #000;
            padding: 40px;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 18px;
            margin-bottom: 5px;
        }
        
        .header p {
            font-size: 12px;
            margin-bottom: 30px;
        }
        
        .certificate-title {
            font-size: 20px;
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 30px;
        }
        
        .content {
            text-align: left;
            margin-bottom: 30px;
        }
        
        .content p {
            margin-bottom: 15px;
        }
        
        .student-name {
            font-size: 18px;
            font-weight: bold;
            font-style: italic;
            text-decoration: underline;
        }
        
        .info-table {
            width: 100%;
            margin: 20px 0;
        }
        
        .info-table td {
            padding: 5px 10px;
        }
        
        .info-table .label {
            font-weight: bold;
            width: 40%;
        }
        
        .subjects-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .subjects-table th,
        .subjects-table td {
            border: 1px solid #000;
            padding: 5px 10px;
            text-align: left;
        }
        
        .subjects-table th {
            background: #f0f0f0;
            font-weight: bold;
        }
        
        .total {
            font-weight: bold;
            text-align: right;
            margin-top: 10px;
        }
        
        .signature-block {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
        }
        
        .signature-box {
            width: 200px;
            text-align: center;
        }
        
        .signature-line {
            border-top: 1px solid #000;
            margin-bottom: 5px;
            padding-top: 5px;
        }
        
        .footer {
            margin-top: 30px;
            font-size: 10px;
            text-align: center;
        }
        
        .cert-stamp {
            position: absolute;
            bottom: 50px;
            right: 50px;
            width: 100px;
            height: 100px;
            border: 3px solid #c00;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #c00;
            font-size: 12px;
            transform: rotate(-15deg);
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container" style="position: relative;">
        <div class="header">
            <h1>MINESU BC SYSTEMS</h1>
            <h2>Bongabong Campus</h2>
            <p>Bongabong, Oriental Mindoro</p>
        </div>
        
        <div class="certificate-title">CERTIFICATE OF ENROLLMENT</div>
        
        <div class="content">
            <p>This is to certify that <span class="student-name">{{ $student['name'] }}</span>, 
            student number <strong>{{ $student['id'] }}</strong>, is officially enrolled in the 
            <strong>{{ $student['course'] }}</strong> program for Academic Year 
            <strong>{{ $enrollment['academic_year'] }}</strong>, 
            <strong>{{ $enrollment['semester'] }} Semester</strong>.</p>
        </div>
        
        <table class="info-table">
            <tr>
                <td class="label">Year Level:</td>
                <td>{{ $enrollment['year_level'] }}</td>
            </tr>
            <tr>
                <td class="label">Section:</td>
                <td>{{ $enrollment['section'] }}</td>
            </tr>
            <tr>
                <td class="label">Enrollment Date:</td>
                <td>{{ $enrollment['enrolled_at'] }}</td>
            </tr>
            <tr>
                <td class="label">Total Units:</td>
                <td>{{ $total_units }}</td>
            </tr>
        </table>
        
        <h4 style="margin-top: 20px; text-align: left;">Subjects Enrolled:</h4>
        
        <table class="subjects-table">
            <thead>
                <tr>
                    <th style="width: 80px;">Code</th>
                    <th>Subject Title</th>
                    <th style="width: 50px;">Units</th>
                </tr>
            </thead>
            <tbody>
                @foreach($subjects as $subject)
                    <tr>
                        <td>{{ $subject['code'] }}</td>
                        <td>{{ $subject['name'] }}</td>
                        <td style="text-align: center;">{{ $subject['units'] }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" class="total">Total Units:</td>
                    <td style="text-align: center; font-weight: bold;">{{ $total_units }}</td>
                </tr>
            </tfoot>
        </table>
        
        <div class="signature-block">
            <div class="signature-box">
                <div class="signature-line"></div>
                <p>University Registrar</p>
            </div>
            <div class="signature-box">
                <div class="signature-line"></div>
                <p>Dean / Program Head</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Issued on: {{ $issued_at }}</p>
            <p style="font-size: 9px; margin-top: 10px;">
                This certificate is valid for the duration of the semester.<br>
                Any alteration renders this document invalid.
            </p>
        </div>
        
        <div class="cert-stamp">CERTIFIED</div>
    </div>
</body>
</html>