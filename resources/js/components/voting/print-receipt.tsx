import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface Vote {
    position: string;
    candidate: string;
    partylist?: string;
}

interface PrintReceiptProps {
    votes: Vote[];
    electionName: string;
    timestamp: string;
    referenceId: string;
}

export function PrintReceipt({
    votes,
    electionName,
    timestamp,
    referenceId,
}: PrintReceiptProps) {
    const handlePrint = () => {
        // Create a print-friendly version
        const printWindow = window.open('', '', 'width=800,height=600');
        if (!printWindow) return;

        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vote Receipt - ${electionName}</title>
                <style>
                    @media print {
                        @page { margin: 2cm; }
                        body { margin: 0; }
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px 20px;
                        color: #1f2937;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px solid #059669;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .logo {
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 20px;
                    }
                    h1 {
                        color: #059669;
                        margin: 0;
                        font-size: 28px;
                    }
                    .subtitle {
                        color: #6b7280;
                        font-size: 14px;
                        margin-top: 8px;
                    }
                    .info-box {
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 30px;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #374151;
                    }
                    .info-value {
                        color: #6b7280;
                    }
                    .votes-section {
                        margin-bottom: 30px;
                    }
                    .vote-item {
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        background: white;
                    }
                    .position-name {
                        font-weight: 700;
                        color: #059669;
                        font-size: 16px;
                        margin-bottom: 8px;
                    }
                    .candidate-name {
                        font-size: 18px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 4px;
                    }
                    .partylist {
                        color: #6b7280;
                        font-size: 14px;
                        font-style: italic;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 30px;
                        border-top: 2px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 12px;
                    }
                    .security-notice {
                        background: #fef3c7;
                        border: 1px solid #fde68a;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                        font-size: 13px;
                        color: #78350f;
                    }
                    .watermark {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 120px;
                        color: rgba(5, 150, 105, 0.05);
                        font-weight: bold;
                        z-index: -1;
                        pointer-events: none;
                    }
                </style>
            </head>
            <body>
                <div class="watermark">OFFICIAL</div>
                
                <div class="header">
                    <div class="logo">
                        <svg viewBox="0 0 100 100" fill="#059669">
                            <circle cx="50" cy="50" r="45" />
                            <path d="M 30 50 L 45 65 L 70 35" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h1>Official Vote Receipt</h1>
                    <div class="subtitle">${electionName}</div>
                </div>

                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Reference ID:</span>
                        <span class="info-value"><strong>${referenceId}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date & Time:</span>
                        <span class="info-value">${new Date(timestamp).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Total Votes Cast:</span>
                        <span class="info-value">${votes.length} position${votes.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>

                <div class="security-notice">
                    <strong>⚠️ Security Notice:</strong> Your vote has been encrypted and anonymized. 
                    This receipt is for your records only and cannot be used to verify or change your vote.
                </div>

                <div class="votes-section">
                    <h2 style="color: #059669; margin-bottom: 20px;">Your Selections</h2>
                    ${votes
                        .map(
                            (vote) => `
                        <div class="vote-item">
                            <div class="position-name">${vote.position}</div>
                            <div class="candidate-name">${vote.candidate}</div>
                            ${vote.partylist ? `<div class="partylist">${vote.partylist}</div>` : ''}
                        </div>
                    `,
                        )
                        .join('')}
                </div>

                <div class="footer">
                    <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
                    <p style="margin-top: 15px;">This is an official computer-generated receipt. No signature is required.</p>
                    <p style="margin-top: 5px;">For inquiries, please contact the election administrator.</p>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();

        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    return (
        <Button onClick={handlePrint} variant="outline" className="border-2">
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
        </Button>
    );
}
