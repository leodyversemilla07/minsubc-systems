# Document Request Types and Fees

## Standard Fees

| Request Type | Fee |
|---|---|
| Transcript of Record | ₱50.00 per page |
| Certificate of Grades | ₱40.00 |
| Certificate of Enrolment | ₱40.00 |
| Certificate of Graduation | ₱40.00 |
| Certificate of GWA | ₱40.00 |
| Certification, Authentication, and Verification (CAV) | ₱40.00 |
| Mode of Instruction Certificate | ₱40.00 |
| Certificate of Upper 25% | ₱40.00 |
| Authentication / Certify True Copy | ₱10.00 per page |

## Processing Notes

### Transcript of Record
- **5th year students**: Special processing required
- **Updated fee**: ₱50.00 per page in 3. ₱150.00

### Certificate of Enrolment
Available for the following purposes:
- Provincial scholars
- Municipal scholars
- Educational assistance
- Financial assistance
- Scholarship purpose
- Other (please specify)

### One-Day Processing Available
The following certificates can be processed within one day:
- Certificate of GWA
- Certification, Authentication, and Verification (CAV)
- Mode of Instruction Certificate
- Certificate of Upper 25%

### Ready for Immediate Release
- Authentication / Certify True Copy

## System Features

### Request Status Tracking
Document requests can have the following statuses throughout their lifecycle:

1. **Pending Payment** (`pending_payment`)
   - Initial status when request is submitted
   - Student must complete payment within 48 hours (payment deadline)
   
2. **Payment Expired** (`payment_expired`)
   - Payment deadline has passed without payment
   - Request is no longer active

3. **Paid** (`paid`)
   - Payment has been successfully completed (digital or cash)
   - Request is queued for processing

4. **Processing** (`processing`)
   - Registrar staff is currently working on the document
   - Document is being prepared/generated

5. **Ready for Claim** (`ready_for_claim`)
   - Document has been generated and is ready
   - Student can schedule pickup or claim the document

6. **Claimed** (`claimed`)
   - Student has picked up the document
   - Intermediate status before final release

7. **Released** (`released`)
   - Document has been officially released to the student or authorized representative
   - Final successful status

8. **Cancelled** (`cancelled`)
   - Request was cancelled by the student or system

9. **Rejected** (`rejected`)
   - Request was rejected by registrar staff
   - Includes rejection reason

### System Capabilities
- Scheduling system for document pickup
- Integrated payment processing
- Request numbering and tracking

### Removed Features
- ~~Processing type selection~~ (removed from system)
- ~~H.D. Transfer credential~~ (removed from available documents)

## Notes
- All fees are in Philippine Pesos (₱)
- Cert = Certificate
- TOR = Transcript of Record
- Processing may vary based on document type and student status

