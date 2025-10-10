<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document Preview - Mindoro State University</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            min-height: 100vh;
            padding: 40px 20px;
            color: #1a1a1a;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
        }

        .header h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #1a1a1a;
        }

        .header p {
            font-size: 0.9rem;
            color: #666;
        }

        .preview-list {
            list-style: none;
        }

        .preview-list li {
            margin-bottom: 12px;
        }

        .preview-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            background: #ffffff;
            color: #1a1a1a;
            text-decoration: none;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            transition: all 0.2s ease;
        }

        .preview-link:hover {
            border-color: #1a1a1a;
            background: #fafafa;
        }

        .preview-link-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .preview-link h3 {
            font-size: 0.95rem;
            font-weight: 500;
        }

        .preview-link p {
            font-size: 0.8rem;
            color: #999;
        }

        .arrow {
            font-size: 1.2rem;
            color: #999;
        }

        .note {
            margin-top: 40px;
            padding: 20px;
            background: #fafafa;
            border-radius: 6px;
        }

        .note h4 {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1a1a1a;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .note ul {
            margin-left: 20px;
            color: #666;
            line-height: 1.7;
            font-size: 0.85rem;
        }

        .note ul li {
            margin-bottom: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Document Preview</h1>
            <p>Mindoro State University - Registrar's Office</p>
        </div>

        <ul class="preview-list">
            <li>
                <a href="{{ url('/preview/coe') }}" class="preview-link" target="_blank">
                    <div class="preview-link-content">
                        <div>
                            <h3>Certificate of Enrollment</h3>
                            <p>COE</p>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </a>
            </li>

            <li>
                <a href="{{ url('/preview/grades') }}" class="preview-link" target="_blank">
                    <div class="preview-link-content">
                        <div>
                            <h3>Certificate of Grades</h3>
                            <p>COG</p>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </a>
            </li>

            <li>
                <a href="{{ url('/preview/good-moral') }}" class="preview-link" target="_blank">
                    <div class="preview-link-content">
                        <div>
                            <h3>Certificate of Good Moral Character</h3>
                            <p>GMC</p>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </a>
            </li>

            <li>
                <a href="{{ url('/preview/tor') }}" class="preview-link" target="_blank">
                    <div class="preview-link-content">
                        <div>
                            <h3>Transcript of Records</h3>
                            <p>TOR</p>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </a>
            </li>
        </ul>

        <div class="note">
            <h4>Information</h4>
            <ul>
                <li>All documents are formatted for A4 paper (210mm × 297mm)</li>
                <li>QR codes positioned at bottom-right with "Scan to Verify" label</li>
                <li>Documents display "Mindoro State University" branding</li>
                <li>Previews use mock data for demonstration purposes</li>
            </ul>
        </div>
    </div>
</body>
</html>
