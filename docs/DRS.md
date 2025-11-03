# Mindoro State University (MinSU)
## Document Request System - Technical Documentation

**Version:** 1.0  
**Date:** October 2025  
**Status:** Development Phase (Laravel Boost + Shadcn UI)

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Payment Options](#payment-options)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [User Workflows](#user-workflows)
6. [API Specifications](#api-specifications)
7. [Security & Compliance](#security-compliance)
8. [Implementation Timeline](#implementation-timeline)

---

## 1. System Overview

### 1.1 Purpose
A web-based system to automate document request processing for MinSU Registrar's Office, enabling students to request, pay for, and track official documents online while maintaining physical document release for security.

### 1.2 Key Features
- Online document request submission
- Dual payment modes: Digital (PayMongo) and Cash (Pay-at-Counter)
- Real-time request tracking
- Integration with Registrar's existing document generation software
- SMS/Email notifications
- Physical claim with ID verification
- Admin dashboard for registrar staff

### 1.3 Document Types and Fees

| Document Type | Fee | Processing Time | Notes |
|---------------|-----|-----------------|-------|
| **Transcript of Record (TOR)** | ₱50.00 per page | 5-7 working days | 5th year students require special processing |
| **Certificate of Grades** | ₱40.00 | 5-7 working days | Standard certificate |
| **Certificate of Enrolment** | ₱40.00 | 5-7 working days | Available for provincial/municipal scholars, educational assistance, financial assistance, scholarship purposes, or other specified purposes |
| **Certificate of Graduation** | ₱40.00 | 5-7 working days | Standard certificate |
| **Certificate of GWA** | ₱40.00 | **1 day processing** | Fast-track available |
| **Certification, Authentication, and Verification (CAV)** | ₱40.00 | **1 day processing** | Fast-track available |
| **Mode of Instruction Certificate** | ₱40.00 | **1 day processing** | Fast-track available |
| **Certificate of Upper 25%** | ₱40.00 | **1 day processing** | Fast-track available |
| **Authentication / Certify True Copy** | ₱10.00 per page | **Immediate release** | Ready for immediate pickup |

**Important Notes:**
- All fees are in Philippine Pesos (₱)
- Standard processing: 5-7 working days (most documents)
- One-day processing available for: Certificate of GWA, CAV, Mode of Instruction Certificate, Certificate of Upper 25%
- Immediate release: Authentication / Certify True Copy
- Transcript of Record for 5th year students requires special processing (updated fee: ₱50.00 per page, 3 pages = ₱150.00)

### 1.4 Request Status Lifecycle

Document requests progress through the following statuses:

1. **Pending Payment** (`pending_payment`)
   - Initial status when request is submitted
   - Student must complete payment within 48 hours

2. **Payment Expired** (`payment_expired`)
   - Payment deadline has passed without payment
   - Request automatically cancelled

3. **Paid** (`paid`)
   - Payment successfully completed (digital or cash)
   - Request queued for processing

4. **Processing** (`processing`)
   - Registrar staff actively working on the document
   - Document being prepared/generated

5. **Ready for Claim** (`ready_for_claim`)
   - Document generated and ready for pickup
   - Student notified to claim document

6. **Claimed** (`claimed`)
   - Student has picked up the document
   - Intermediate status before final release

7. **Released** (`released`)
   - Document officially released to student or authorized representative
   - Final successful status

8. **Cancelled** (`cancelled`)
   - Request cancelled by student or system

9. **Rejected** (`rejected`)
   - Request rejected by registrar staff
   - Includes rejection reason

**System Features:**
- Scheduling system for document pickup
- Integrated payment processing (digital via PayMongo or cash at counter)
- Request numbering and tracking (REQ-YYYYMMDD-XXXX format)
- Real-time status updates and notifications

---

## 2. Payment Options

### 2.1 Digital Payment (PayMongo)

**Available Methods:**
- E-Wallets: GCash, Maya, GrabPay
- Credit/Debit Cards: Visa, Mastercard, JCB
- Online Banking: BPI, BDO, UnionBank, etc.
- Over-the-Counter: 7-Eleven, Cebuana Lhuillier, M Lhuillier

**Transaction Flow:**
1. Student submits request → System generates payment
2. Redirects to PayMongo checkout
3. Student completes payment
4. PayMongo webhook confirms payment
5. System updates status to "Paid - Processing"
6. Registrar notified to process document

**Fees:**
- E-wallets & Cards: 2.5% + ₱15 per transaction
- Over-the-counter: 3.5% + ₱15 per transaction

### 2.2 Cash Payment (Pay-at-Counter)

**Payment Flow:**
1. Student submits request online
2. System generates unique Payment Reference Number (PRN)
3. Student visits Cashier's Office within 48 hours
4. Cashier verifies PRN in system
5. Student pays cash → Cashier issues Official Receipt (OR)
6. Cashier marks payment as received in system
7. Request moves to registrar queue

**Advantages:**
- No transaction fees
- Familiar payment method for students
- Immediate receipt
- Accessible to students without bank accounts/e-wallets

**Payment Windows:**
- Monday-Friday: 8:00 AM - 5:00 PM
- Payment deadline: 48 hours from request submission
- Expired unpaid requests: Auto-cancelled

---

## 3. System Architecture

### 3.1 Technology Stack

**Frontend:**
- Framework: React.js v19.1.1 with TypeScript
- UI Library: Tailwind CSS v4.1.12 + Shadcn UI (@shadcn registry)
- State Management: Inertia.js v2.1.4
- Progressive Web App (PWA) capabilities
- Build Tool: Vite with @laravel/vite-plugin-wayfinder v0.1.3

**Backend:**
- Framework: PHP v8.2.12 + Laravel v12.32.5
- Authentication: Laravel Fortify v1.31.1
- API: Inertia.js v2.0.10 (server-driven SPA)
- Development Tools: Laravel Boost MCP Server v1.3
- Testing: Pest v3.8.4 + PHPUnit v11.5.33
- Code Quality: Laravel Pint v1.25.1

**Database:**
- Primary: MySQL
- ORM: Eloquent
- Caching: Laravel Cache (Redis optional)

**Key Packages & Versions:**
- **Inertia.js Ecosystem:**
  - inertiajs/inertia-laravel: v2.0.10
  - @inertiajs/react: v2.1.4
- **Laravel Ecosystem:**
  - laravel/framework: v12.32.5
  - laravel/fortify: v1.31.1
  - laravel/wayfinder: v0.1.12
  - laravel/prompts: v0.3.7
  - laravel/mcp: v0.2.1
- **Development & Testing:**
  - laravel/boost: v1.3 (dev)
  - pestphp/pest: v3.8.4
  - laravel/pint: v1.25.1
- **Frontend Tools:**
  - tailwindcss: v4.1.12
  - eslint: v9.33.0
  - prettier: v3.6.2

**Shadcn UI Components Available:**
- **Core UI Components:** Button, Card, Input, Label, Badge, Avatar, Separator
- **Form Components:** Form, Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Layout Components:** Sidebar, Sheet, Dialog, Dropdown Menu, Navigation Menu
- **Data Display:** Table, Badge, Avatar, Skeleton, Progress, Empty State
- **Feedback:** Alert, Alert Dialog, Toast (Sonner), Tooltip, Hover Card
- **Charts & Data Visualization:** Chart components with multiple chart types
- **Advanced Components:** Calendar, Date Picker, Command Palette, Combobox
- **Total Available:** 423+ components, examples, and blocks in @shadcn registry

**External Services:**
- Payment Gateway: PayMongo API
- SMS: Semaphore or M360
- Email: SendGrid or AWS SES
- File Storage: Local server or cloud storage

**Infrastructure:**
- Web Server: Nginx or Apache
- SSL Certificate: Let's Encrypt
- Hosting: Philippine-based hosting or AWS Singapore region

### 3.1.1 Development Environment & Tools

**Laravel Boost MCP Server Integration:**
- **Purpose:** Enhanced Laravel development with AI-powered assistance
- **Features:** Database querying, schema inspection, Tinker execution, documentation search
- **Version:** v1.3 (development dependency)
- **Capabilities:**
  - Real-time database schema inspection
  - Eloquent model analysis and querying
  - Artisan command execution and listing
  - Laravel documentation search with version-specific results
  - Application configuration inspection
  - Log file analysis and error debugging
  - Route listing and analysis

**Shadcn UI Development Workflow:**
- **Registry:** @shadcn with 423+ available components
- **Component Categories:**
  - UI Components (buttons, inputs, cards, etc.)
  - Layout Components (sidebar, navigation, grids)
  - Form Components (inputs, selects, checkboxes)
  - Data Display (tables, charts, calendars)
  - Feedback Components (alerts, toasts, tooltips)
  - Example Implementations (demos and templates)
- **Build System:** Integrated with Vite and TypeScript
- **Styling:** Tailwind CSS v4 with CSS variables and dark mode support

### 3.1.2 Current Application State

**Database Configuration:**
- **Engine:** MySQL (production) - configured in .env as minsu_drs
- **Models:** Currently no custom Eloquent models defined
- **Migrations:** Basic Laravel authentication tables (users, cache, jobs)
- **Seeders:** DatabaseSeeder configured

**Application Structure:**
- **Routes:** Authentication routes configured via Laravel Fortify
- **Controllers:** Basic structure with authentication controllers
- **Views:** Inertia.js React components in `resources/js/Pages/`
- **Assets:** Vite build system with TypeScript and React support
- **Testing:** Pest testing framework configured with Laravel integration

**Development Status:**
- ✅ Laravel v12.32.5 application scaffolded
- ✅ Inertia.js v2 integration configured
- ✅ React v19.1.1 with TypeScript setup
- ✅ Tailwind CSS v4 configured
- ✅ Shadcn UI registry available (423+ components)
- ✅ Laravel Boost MCP Server integrated
- ✅ Authentication system (Laravel Fortify) ready
- ✅ Database migrations for basic authentication
- ✅ MySQL database configuration updated
- 🔄 Document request functionality to be implemented
- 🔄 Payment integration (PayMongo) to be implemented
- 🔄 Admin dashboard to be developed

### 3.2 System Components

```
┌───────────────────┐
│  Student Portal   │
│  (React + Inertia)│
└────────┬──────────┘
         │
         ├──────────────────────┐
         │                      │
┌────────▼─────────┐   ┌────────▼─────────┐
│   Staff Portal   │   │  Cashier Portal  │
│   (React Admin)  │   │   (React Admin)  │
└────────┬─────────┘   └────────┬─────────┘
         │                      │
         └──────────┬───────────┘
                    │
         ┌──────────▼──────────┐
         │   Laravel Backend   │
         │   (Inertia.js v2)   │
         └──────────┬──────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼────┐   ┌──────▼──────┐   ┌────▼───────┐
│ MySQL  │   │  PayMongo   │   │  SMS/Email │
│   DB   │   │     API     │   │  Services  │
└────────┘   └─────────────┘   └────────────┘
```

### 3.3 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Student** | Submit requests, view own requests, make payments, track status |
| **Cashier** | View pending cash payments, confirm cash payments, issue OR |
| **Registrar Staff** | View all requests, process documents, approve/reject, mark ready for claim |
| **Registrar Admin** | All staff permissions + user management, system configuration |
| **System Admin** | Full system access, database management, reports |

---

## 4. Database Schema

### 4.1 Core Tables

#### `students`
```sql
CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    course VARCHAR(100),
    year_level INT,
    campus VARCHAR(50),
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `document_requests`
```sql
CREATE TABLE document_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_number VARCHAR(20) UNIQUE NOT NULL, -- Format: REQ-YYYYMMDD-XXXX
    student_id VARCHAR(20) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    quantity INT DEFAULT 1,
    purpose TEXT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('digital', 'cash') NOT NULL,
    status ENUM(
        'pending_payment',
        'payment_expired',
        'paid',
        'processing',
        'ready_for_claim',
        'claimed',
        'released',
        'cancelled',
        'rejected'
    ) DEFAULT 'pending_payment',
    payment_deadline TIMESTAMP NULL,
    processed_by INT NULL,
    released_by INT NULL,
    released_to VARCHAR(200) NULL, -- Name of person who claimed
    released_id_type VARCHAR(50) NULL, -- ID type presented
    released_at TIMESTAMP NULL,
    claimed_by_student BOOLEAN DEFAULT FALSE, -- Whether student claimed the document
    claimed_at TIMESTAMP NULL, -- When the student claimed the document
    claim_notes TEXT NULL, -- Notes from student when claiming
    rejection_reason TEXT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (processed_by) REFERENCES users(id),
    FOREIGN KEY (released_by) REFERENCES users(id)
);
```

#### `payments`
```sql
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT NOT NULL,
    payment_method ENUM('digital', 'cash') NOT NULL,
    
    -- Digital Payment (PayMongo) fields
    paymongo_checkout_id VARCHAR(100) NULL,
    paymongo_payment_intent_id VARCHAR(100) NULL,
    paymongo_payment_method VARCHAR(50) NULL, -- gcash, maya, card, etc.
    
    -- Cash Payment fields
    payment_reference_number VARCHAR(20) UNIQUE NULL, -- Format: PRN-YYYYMMDD-XXXX
    cashier_id INT NULL,
    official_receipt_number VARCHAR(50) NULL,
    
    -- Common fields
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'failed', 'expired', 'refunded') DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    receipt_url TEXT NULL,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES document_requests(id),
    FOREIGN KEY (cashier_id) REFERENCES users(id)
);
```

#### `users`
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role ENUM('student', 'cashier', 'registrar_staff', 'registrar_admin', 'system_admin') NOT NULL,
    student_id VARCHAR(20) NULL, -- Links to students table if role is student
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
```

#### `payment_webhooks`
```sql
CREATE TABLE payment_webhooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id VARCHAR(100) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `notifications`
```sql
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    type ENUM('sms', 'email', 'both') NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    sent_at TIMESTAMP NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES document_requests(id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
```

#### `audit_logs`
```sql
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g., 'request_created', 'payment_confirmed', 'document_released'
    entity_type VARCHAR(50) NOT NULL, -- e.g., 'document_request', 'payment'
    entity_id INT NOT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### `system_settings`
```sql
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT NULL,
    updated_by INT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Sample settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('processing_days', '5-7', 'Standard processing time in working days'),
('tor_price_per_page', '50', 'Transcript of Record price per page in PHP'),
('cog_price', '40', 'Certificate of Grades price in PHP'),
('coe_price', '40', 'Certificate of Enrolment price in PHP'),
('cav_price', '40', 'CAV price in PHP'),
('authentication_price_per_page', '10', 'Authentication/Certify True Copy price per page in PHP'),
('cash_payment_deadline_hours', '48', 'Hours before cash payment expires'),
('paymongo_public_key', 'pk_test_xxxxx', 'PayMongo public key'),
('paymongo_secret_key', 'sk_test_xxxxx', 'PayMongo secret key (encrypted)');
```

---

## 5. User Workflows

### 5.1 Student Workflow - Digital Payment

```
1. Login to Student Portal
   ↓
2. Click "Request Document"
   ↓
3. Fill Request Form:
   - Select document type
   - Enter quantity (if applicable)
   - Specify purpose
   - Review amount
   ↓
4. Select Payment Method: "Pay Online"
   ↓
5. Click "Proceed to Payment"
   ↓
6. Redirected to PayMongo → Choose payment method
   ↓
7. Complete payment → Redirected back with confirmation
   ↓
8. Receive SMS/Email: "Payment confirmed. Request #REQ-20251006-0001"
   ↓
9. Track status in Dashboard:
   - Paid → Processing → Ready for Claim
   ↓
10. Receive notification: "Document ready at Registrar Office"
    ↓
11. Visit Registrar → Present valid ID → Sign release form
    ↓
12. Receive sealed document
```

### 5.2 Student Workflow - Cash Payment

```
1. Login to Student Portal
   ↓
2. Click "Request Document"
   ↓
3. Fill Request Form (same as digital)
   ↓
4. Select Payment Method: "Pay Cash at Cashier"
   ↓
5. Click "Submit Request"
   ↓
6. System generates Payment Reference Number (PRN)
   ↓
7. View/Print Payment Slip with:
   - PRN: PRN-20251006-0001
   - Amount: ₱100.00
   - Payment Deadline: Oct 8, 2025 2:00 PM
   - Instructions: "Pay at Cashier's Office"
   ↓
8. Visit Cashier's Office within 48 hours
   ↓
9. Present PRN → Cashier verifies in system
   ↓
10. Pay cash → Receive Official Receipt (OR)
    ↓
11. Cashier confirms payment in system
    ↓
12. Receive SMS: "Payment received. Request #REQ-20251006-0001 is being processed"
    ↓
13. Track status → Ready for Claim
    ↓
14. Visit Registrar → Claim document
```

### 5.3 Cashier Workflow

```
1. Login to Cashier Portal
   ↓
2. View "Pending Cash Payments" queue
   ↓
3. Student presents PRN (verbal or printed)
   ↓
4. Search PRN in system: PRN-20251006-0001
   ↓
5. System displays:
   - Student: Juan Dela Cruz (2021-00001)
   - Document: Certificate of Enrollment
   - Amount: ₱100.00
   - Deadline: Oct 8, 2025 2:00 PM
   - Status: Pending Payment
   ↓
6. Verify student identity (optional: check ID)
   ↓
7. Accept cash payment
   ↓
8. Enter Official Receipt Number
   ↓
9. Click "Confirm Payment Received"
   ↓
10. System updates:
    - Payment status → Paid
    - Request status → Paid - Processing
    - Sends notification to student
    - Adds to Registrar queue
    ↓
11. Print/Issue OR to student
```

### 5.4 Registrar Staff Workflow

```
1. Login to Registrar Portal
   ↓
2. View "Processing Queue" (all paid requests)
   ↓
3. Select request from queue
   ↓
4. View request details:
   - Student info
   - Document type
   - Payment status (Paid ✓)
   - Processing type
   ↓
5. Click "Mark as Processing"
   ↓
6. Use Registrar's existing software to generate document
   ↓
7. Physically prepare and sign document with university seal
   ↓
8. Options in system:
   - [Mark as Ready] → Document prepared
   - [Reject] → Enter reason, triggers refund
   ↓
9. Click "Mark as Ready for Claim"
   ↓
10. System sends notification to student
    ↓
11. Student visits Registrar Office
    ↓
12. Verify student ID
    ↓
13. Student signs release log
    ↓
14. Click "Mark as Released"
    ↓
15. Enter:
    - Released to: Juan Dela Cruz
    - ID Type: Student ID
    - ID Number: 2021-00001
    ↓
16. Hand over document to student
```

---

## 6. API Specifications

### 6.1 Authentication Endpoints

#### POST `/api/auth/login`
**Request:**
```json
{
  "username": "2021-00001",
  "password": "student_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "2021-00001",
    "full_name": "Juan Dela Cruz",
    "role": "student",
    "student_id": "2021-00001"
  }
}
```

### 6.2 Document Request Endpoints

#### POST `/api/requests/create`
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "document_type": "Certificate of Enrolment",
  "quantity": 1,
  "purpose": "Employment requirement",
  "payment_method": "cash"
}
```

**Response:**
```json
{
  "success": true,
  "request": {
    "request_number": "REQ-20251006-0001",
    "amount": 100.00,
    "payment_method": "cash",
    "payment_reference_number": "PRN-20251006-0001",
    "payment_deadline": "2025-10-08T14:00:00Z",
    "status": "pending_payment"
  }
}
```

#### GET `/api/requests/my-requests`
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "requests": [
    {
      "request_number": "REQ-20251006-0001",
      "document_type": "Certificate of Enrolment",
      "amount": 40.00,
      "status": "paid",
      "payment_method": "cash",
      "created_at": "2025-10-06T10:00:00Z",
      "payment": {
        "payment_reference_number": "PRN-20251006-0001",
        "paid_at": "2025-10-06T11:30:00Z",
        "official_receipt_number": "OR-2025-001234"
      }
    }
  ]
}
```

### 6.3 Payment Endpoints (Digital)

#### POST `/api/payments/create-checkout`
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "request_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "checkout_url": "https://checkout.paymongo.com/cs_xxxxx"
}
```

#### POST `/api/webhooks/paymongo`
**PayMongo Webhook Handler**

### 6.4 Payment Endpoints (Cash)

#### GET `/api/payments/verify-prn/:prn`
**Headers:** `Authorization: Bearer {token}` (Cashier role)

**Response:**
```json
{
  "success": true,
  "payment": {
    "payment_reference_number": "PRN-20251006-0001",
    "request_number": "REQ-20251006-0001",
    "student": {
      "student_id": "2021-00001",
      "name": "Juan Dela Cruz",
      "course": "BSIT"
    },
    "document_type": "COE",
    "amount": 100.00,
    "status": "pending",
    "deadline": "2025-10-08T14:00:00Z",
    "is_expired": false
  }
}
```

#### POST `/api/payments/confirm-cash`
**Headers:** `Authorization: Bearer {token}` (Cashier role)

**Request:**
```json
{
  "payment_reference_number": "PRN-20251006-0001",
  "official_receipt_number": "OR-2025-001234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment confirmed successfully",
  "request": {
    "request_number": "REQ-20251006-0001",
    "status": "paid"
  }
}
```

### 6.5 Registrar Endpoints

#### GET `/api/registrar/queue`
**Headers:** `Authorization: Bearer {token}` (Registrar role)

**Query params:** `?status=paid`

**Response:**
```json
{
  "success": true,
  "queue": [
    {
      "request_number": "REQ-20251006-0001",
      "student": {
        "student_id": "2021-00001",
        "name": "Juan Dela Cruz",
        "course": "BSIT",
        "year_level": 3
      },
      "document_type": "Certificate of Enrolment",
      "quantity": 1,
      "amount": 40.00,
      "payment_method": "cash",
      "status": "paid",
      "paid_at": "2025-10-06T11:30:00Z",
      "created_at": "2025-10-06T10:00:00Z"
    }
  ],
  "total": 15
}
```

#### POST `/api/registrar/process/:requestNumber`
**Headers:** `Authorization: Bearer {token}` (Registrar role)

**Request:**
```json
{
  "action": "approve",
  "notes": "Document generated and printed"
}
```

**Response:**
```json
{
  "success": true,
  "request": {
    "request_number": "REQ-20251006-0001",
    "status": "processing"
  }
}
```

#### POST `/api/registrar/ready-for-claim/:requestNumber`
**Headers:** `Authorization: Bearer {token}` (Registrar role)

**Response:**
```json
{
  "success": true,
  "request": {
    "request_number": "REQ-20251006-0001",
    "status": "ready_for_claim"
  },
  "notification_sent": true
}
```

#### POST `/api/registrar/release/:requestNumber`
**Headers:** `Authorization: Bearer {token}` (Registrar role)

**Request:**
```json
{
  "released_to": "Juan Dela Cruz",
  "id_type": "Student ID",
  "id_number": "2021-00001",
  "signature": "base64_encoded_signature_image"
}
```

**Response:**
```json
{
  "success": true,
  "request": {
    "request_number": "REQ-20251006-0001",
    "status": "released",
    "released_at": "2025-10-08T14:30:00Z"
  }
}
```

---

## 7. Security & Compliance

### 7.1 Data Privacy Act (DPA) Compliance

**Requirements:**
- Register with National Privacy Commission (NPC)
- Privacy Policy and Terms of Service
- Student consent for data processing
- Data retention policy (7 years for education records)
- Right to access, correct, and delete data
- Breach notification procedures

**Implementation:**
- Encrypt sensitive data at rest and in transit
- HTTPS/SSL for all connections
- Password hashing (bcrypt)
- Regular security audits
- Access logs and audit trails

### 7.2 Payment Security

**Digital Payments (PayMongo):**
- PCI DSS compliant (handled by PayMongo)
- No credit card data stored in MinSU database
- Webhook signature verification
- HTTPS only for all payment endpoints

**Cash Payments:**
- Official Receipt required
- Dual verification (PRN + cashier confirmation)
- Audit trail of all cash transactions
- Daily reconciliation reports

### 7.3 Document Security

- QR code on each document for verification
- Unique document serial numbers
- Digital signatures from authorized officials
- Watermarks and security features
- Anti-tampering measures

### 7.4 Access Control

- Role-based permissions
- Session timeout (30 minutes inactivity)
- Failed login attempt lockout (5 attempts)
- Strong password requirements
- Two-factor authentication (optional, for staff)

---

## 8. Implementation Timeline

### Phase 1: Planning & Requirements (Weeks 1-2)
- [x] System documentation (current phase)
- [x] Laravel v12.32.5 + Inertia.js v2 setup
- [x] Shadcn UI component library integration
- [x] Laravel Boost MCP Server configuration
- [x] MySQL database configuration
- [ ] Meet with Registrar Office stakeholders
- [ ] Finalize document types and pricing
- [ ] Review existing student database structure
- [ ] Get university administration approval

### Phase 2: Design (Weeks 3-4)
- [ ] Database schema finalization
- [ ] UI/UX wireframes and mockups
- [ ] Document template designs
- [ ] API endpoint documentation
- [ ] Security architecture review

### Phase 3: Backend Development (Weeks 5-10)
- [ ] Database setup and migrations
- [ ] Authentication system
- [ ] Document request API
- [ ] PayMongo integration
- [ ] Cash payment system
- [ ] Notification system (SMS/Email)
- [ ] Integration with Registrar's existing document software
- [ ] Admin/staff APIs

### Phase 4: Frontend Development (Weeks 8-12)
- [ ] Student portal (React)
- [ ] Cashier portal
- [ ] Registrar staff portal
- [ ] Admin dashboard
- [ ] Mobile responsive design
- [ ] PWA setup

### Phase 5: Integration & Testing (Weeks 13-15)
- [ ] Integration testing
- [ ] PayMongo test transactions
- [ ] User acceptance testing (UAT)
- [ ] Security testing
- [ ] Performance testing
- [ ] Bug fixes

### Phase 6: Training & Documentation (Week 16)
- [ ] User manuals (students, cashier, registrar)
- [ ] Video tutorials
- [ ] Staff training sessions
- [ ] FAQ preparation

### Phase 7: Pilot Launch (Weeks 17-18)
- [ ] Deploy to production server
- [ ] Pilot with one college/department
- [ ] Monitor and gather feedback
- [ ] Quick fixes and adjustments

### Phase 8: Full Rollout (Week 19)
- [ ] University-wide launch announcement
- [ ] Student orientation/information campaign
- [ ] Full system activation
- [ ] Monitoring and support

### Phase 9: Post-Launch (Ongoing)
- [ ] Daily monitoring
- [ ] Weekly status reports
- [ ] Monthly analytics review
- [ ] Continuous improvements

---

## 9. Cost Estimates

### Development Costs
- Developers (4-5 months): ₱240,000 - ₱600,000
- UI/UX Designer: ₱40,000 - ₱80,000
- Project Manager: ₱60,000 - ₱100,000
- QA Tester: ₱40,000 - ₱60,000

**Total Development:** ₱380,000 - ₱840,000

### Operational Costs (Annual)
- Web Hosting: ₱24,000 - ₱120,000
- SSL Certificate: ₱5,000 - ₱15,000
- PayMongo Fees: 2.5-3.5% per transaction
- SMS Service: ₱20,000 - ₱50,000 (est. 40,000 SMS @ ₱0.50-1.00)
- Email Service: ₱6,000 - ₱12,000
- Maintenance & Support: ₱100,000 - ₱200,000
- Contingency (10%): ₱15,500 - ₱39,700

**Total Annual Operating:** ₱170,500 - ₱436,700

### Hardware/Infrastructure
- Network Printer with Seal: ₱30,000 - ₱80,000
- Backup Server (optional): ₱50,000 - ₱150,000

---

## 10. Success Metrics

### Key Performance Indicators (KPIs)

**Efficiency Metrics:**
- Average processing time: Target < 5 days (regular)
- Payment confirmation time: < 5 minutes (digital), < 1 day (cash)
- System uptime: > 99.5%

**User Satisfaction:**
- Student satisfaction rating: Target > 4.0/5.0
- Reduction in registrar counter queues: Target 60%
- Document accuracy: Target > 99%

**Financial:**
- Transaction success rate: > 95%
- Payment collection rate: > 90% within deadline
- Cost per transaction: < ₱50

**Volume:**
- Documents processed per month
- Digital vs cash payment ratio
- Peak period handling capacity

---

## Appendices

### A. Sample Payment Reference Number Format
```
PRN-YYYYMMDD-XXXX
Example: PRN-20251006-0001

Where:
- PRN: Prefix
- YYYYMMDD: Date of generation
- XXXX: Sequential number (resets daily)
```

### B. Sample Request Number Format
```
REQ-YYYYMMDD-XXXX
Example: REQ-20251006-0001
```

### C. Document Pricing and Processing Matrix

| Document Type | Fee | Processing Time | Special Notes |
|--------------|-----|-----------------|---------------|
| **Transcript of Record (TOR)** | ₱50.00 per page | 5-7 working days | 5th year students: special processing required (3 pages = ₱150.00) |
| **Certificate of Grades** | ₱40.00 | 5-7 working days | Standard processing |
| **Certificate of Enrolment** | ₱40.00 | 5-7 working days | Purpose: Provincial/municipal scholars, educational assistance, financial assistance, scholarship, or other |
| **Certificate of Graduation** | ₱40.00 | 5-7 working days | Standard processing |
| **Certificate of GWA** | ₱40.00 | **1 day** | Fast-track processing available |
| **Certification, Authentication, and Verification (CAV)** | ₱40.00 | **1 day** | Fast-track processing available |
| **Mode of Instruction Certificate** | ₱40.00 | **1 day** | Fast-track processing available |
| **Certificate of Upper 25%** | ₱40.00 | **1 day** | Fast-track processing available |
| **Authentication / Certify True Copy** | ₱10.00 per page | **Immediate** | Ready for immediate release |

**Processing Categories:**
- **Standard Processing:** 5-7 working days (TOR, COG, COE, Certificate of Graduation)
- **One-Day Processing:** Certificate of GWA, CAV, Mode of Instruction Certificate, Certificate of Upper 25%
- **Immediate Release:** Authentication / Certify True Copy

*Note: All prices are official university rates. Processing times may vary based on request volume and document complexity.*

### D. System Requirements

**Server Requirements:**
- **OS:** Ubuntu 20.04 LTS or CentOS 8+ (Linux recommended)
- **Web Server:** Nginx 1.20+ or Apache 2.4+ with mod_php
- **PHP:** 8.2 or higher
- **Database:** MySQL 8.0+ or MariaDB 10.6+
- **RAM:** 4GB minimum, 8GB recommended
- **Storage:** 50GB+ SSD for application and document storage
- **CPU:** 2+ cores

**PHP Extensions (Required):**
- php-mysql (or php-mysqli)
- php-xml
- php-curl
- php-zip
- php-mbstring
- php-gd (for image processing)
- php-intl
- php-bcmath

**Node.js Requirements (for frontend builds):**
- Node.js: 18+ LTS
- npm: 8+ or yarn: 1.22+

**Client Requirements (Students/Staff):**
- **Browser:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **OS:** Windows 10+, macOS 10.15+, Linux, Android 8+, iOS 12+
- **Internet:** Stable broadband connection (5 Mbps+ recommended)
- **Screen:** 1024x768 minimum resolution

**Development Environment:**
- **IDE:** VS Code with Laravel Boost MCP Server
- **Version Control:** Git
- **Package Manager:** Composer for PHP, npm/yarn for Node.js
- **Database Client:** phpMyAdmin, MySQL Workbench, or TablePlus

**Production Deployment:**
- **SSL Certificate:** Required (Let's Encrypt recommended)
- **Backup Storage:** External storage for database backups
- **Monitoring:** Server monitoring tools (optional but recommended)
- **CDN:** For static assets (optional)

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 2025 | Development Team | Initial documentation |

---

## 11. Cash Payment Detailed Specifications

### 11.1 Payment Reference Number (PRN) Generation

**Algorithm:**
```javascript
function generatePRN() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0,10).replace(/-/g, '');
    
    // Get daily sequence number from database
    const sequence = getDailySequence('PRN', dateStr);
    const sequenceStr = sequence.toString().padStart(4, '0');
    
    return `PRN-${dateStr}-${sequenceStr}`;
}

// Example output: PRN-20251006-0001
```

**Storage:**
```sql
CREATE TABLE sequence_counters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prefix VARCHAR(10) NOT NULL,
    date VARCHAR(8) NOT NULL,
    current_value INT DEFAULT 0,
    UNIQUE KEY unique_sequence (prefix, date)
);
```

### 11.2 Payment Slip Design

**Information Displayed:**
```
╔════════════════════════════════════════╗
║   MINDORO STATE UNIVERSITY             ║
║   REGISTRAR'S OFFICE                   ║
║   DOCUMENT REQUEST PAYMENT SLIP        ║
╠════════════════════════════════════════╣
║                                        ║
║   Payment Reference Number:            ║
║   PRN-20251006-0001                    ║
║                                        ║
║   Request Number: REQ-20251006-0001    ║
║   Student ID: 2021-00001               ║
║   Name: JUAN DELA CRUZ                 ║
║                                        ║
║   Document: Certificate of Enrolment   ║
║   Processing: Standard (5-7 days)      ║
║   Quantity: 1                          ║
║                                        ║
║   AMOUNT TO PAY: ₱40.00                ║
║                                        ║
║   Payment Deadline:                    ║
║   October 8, 2025 - 5:00 PM            ║
║                                        ║
║   PAY AT: Cashier's Office             ║
║   Hours: Mon-Fri, 8:00 AM - 5:00 PM    ║
║                                        ║
║   [QR CODE]                            ║
║                                        ║
║   Note: Present this slip or PRN       ║
║   when paying at the cashier.          ║
║   Late payments will be cancelled.     ║
╚════════════════════════════════════════╝

Generated: October 6, 2025 10:00 AM
```

### 11.3 Cashier Portal Interface Specifications

**Main Dashboard View:**
```
┌─────────────────────────────────────────────────────┐
│ MinSU Cashier Portal                    [Logout]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👤 Cashier: Maria Santos                           │
│  📅 Today: October 6, 2025                          │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  PENDING CASH PAYMENTS         [Refresh]    │    │
│  ├─────────────────────────────────────────────┤    │
│  │                                             │    │
│  │  Search PRN: [________________] [Search]    │    │
│  │                                             │    │
│  │  Showing 15 pending payments                │    │
│  │                                             │    │
│  │  PRN              Student         Amount    │    │
│  │  ───────────────────────────────────────    │    │
│  │  PRN-20251006-0001 Juan D.       ₱40.00     │    │
│  │  [View Details] [Confirm Payment]           │    │
│  │                                             │    │
│  │  PRN-20251006-0002 Maria C.      ₱50.00     │    │
│  │  [View Details] [Confirm Payment]           │    │
│  │                                             │    │
│  │  ...                                        │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  TODAY'S STATISTICS                         │    │
│  ├─────────────────────────────────────────────┤    │
│  │  Payments Received: 23                      │    │
│  │  Total Amount: ₱3,450.00                    │    │
│  │  Pending: 15                                │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Payment Confirmation Dialog:**
```
┌──────────────────────────────────────────┐
│  CONFIRM CASH PAYMENT                    │
├──────────────────────────────────────────┤
│                                          │
│  PRN: PRN-20251006-0001                  │
│  Request: REQ-20251006-0001              │
│                                          │
│  Student Information:                    │
│  ├─ ID: 2021-00001                       │
│  ├─ Name: Juan Dela Cruz                 │
│  ├─ Course: BSIT 3                       │
│  └─ Contact: 0912-345-6789               │
│                                          │
│  Document Details:                       │
│  ├─ Type: Certificate of Enrolment       │
│  ├─ Processing: Standard (5-7 days)      │
│  └─ Quantity: 1                          │
│                                          │
│  Payment Information:                    │
│  ├─ Amount: ₱40.00                       │
│  ├─ Requested: Oct 6, 2025 10:00 AM      │
│  └─ Deadline: Oct 8, 2025 5:00 PM        │
│                                          │
│  Status: ⚠️ PENDING PAYMENT              │
│                                          │
│  ───────────────────────────────────     │
│                                          │
│  Official Receipt Number:                │
│  [OR-2025-______]  (Required)            │
│                                          │
│  Amount Received: ₱[_______]             │
│                                          │
│  Notes (Optional):                       │
│  [_________________________________]     │
│  [_________________________________]     │
│                                          │
│  [Cancel]              [Confirm Payment] │
│                                          │
└──────────────────────────────────────────┘
```

### 11.4 Cash Payment Expiration Logic

**Automatic Expiration System:**

```javascript
// Cron job runs every hour
async function expirePendingCashPayments() {
    const now = new Date();
    
    // Find all pending cash payments past deadline
    const expiredPayments = await db.query(`
        SELECT p.*, dr.request_number, dr.student_id
        FROM payments p
        JOIN document_requests dr ON p.request_id = dr.id
        WHERE p.payment_method = 'cash'
        AND p.status = 'pending'
        AND dr.payment_deadline < ?
    `, [now]);
    
    for (const payment of expiredPayments) {
        // Update payment status
        await db.query(`
            UPDATE payments 
            SET status = 'expired' 
            WHERE id = ?
        `, [payment.id]);
        
        // Update request status
        await db.query(`
            UPDATE document_requests 
            SET status = 'payment_expired' 
            WHERE id = ?
        `, [payment.request_id]);
        
        // Send notification
        await sendNotification({
            student_id: payment.student_id,
            type: 'both', // SMS and Email
            message: `Your payment for request ${payment.request_number} has expired. Please submit a new request if you still need the document.`
        });
        
        // Log action
        await auditLog({
            action: 'payment_expired',
            entity_type: 'payment',
            entity_id: payment.id,
            notes: 'Automatic expiration after deadline'
        });
    }
}
```

**Manual Deadline Extension:**
```javascript
// Staff can extend deadline in special cases
async function extendPaymentDeadline(requestId, additionalHours) {
    await db.query(`
        UPDATE document_requests 
        SET payment_deadline = DATE_ADD(payment_deadline, INTERVAL ? HOUR)
        WHERE id = ?
    `, [additionalHours, requestId]);
    
    // Notify student
    await sendNotification({
        message: `Your payment deadline has been extended.`
    });
}
```

### 11.5 Cash Payment Reconciliation

**Daily Reconciliation Report:**

```sql
-- Generate daily cash collection report
SELECT 
    DATE(p.paid_at) as payment_date,
    u.full_name as cashier_name,
    COUNT(*) as total_transactions,
    SUM(p.amount) as total_amount,
    p.official_receipt_number
FROM payments p
JOIN users u ON p.cashier_id = u.id
WHERE p.payment_method = 'cash'
AND p.status = 'paid'
AND DATE(p.paid_at) = CURDATE()
GROUP BY DATE(p.paid_at), u.id, p.official_receipt_number
ORDER BY p.paid_at DESC;
```

**Report Format:**
```
═══════════════════════════════════════════════════════
    MINDORO STATE UNIVERSITY
    DAILY CASH COLLECTION REPORT
═══════════════════════════════════════════════════════

Date: October 6, 2025
Generated: October 6, 2025 5:30 PM

Cashier: Maria Santos (ID: C-001)
───────────────────────────────────────────────────────

OR Number         Time      Request No.       Amount
─────────────────────────────────────────────────────
OR-2025-001234   09:15 AM  REQ-20251006-0001  ₱100.00
OR-2025-001235   09:45 AM  REQ-20251006-0003  ₱200.00
OR-2025-001236   10:30 AM  REQ-20251006-0005  ₱100.00
OR-2025-001237   11:15 AM  REQ-20251006-0008  ₱150.00
...
─────────────────────────────────────────────────────
Total Transactions: 23
Total Amount: ₱3,450.00

═══════════════════════════════════════════════════════
Prepared by: _____________________
Verified by: _____________________
═══════════════════════════════════════════════════════
```

---

## 12. Notification System Specifications

### 12.1 SMS Templates

**Template 1: Request Submitted (Cash Payment)**
```
MinSU Registrar: Your document request #REQ-20251006-0001 has been submitted. 
Pay ₱40.00 at Cashier's Office using PRN-20251006-0001 before Oct 8, 5PM. 
Track: minsu.edu.ph/track
```

**Template 2: Payment Confirmed**
```
MinSU Registrar: Payment confirmed for request #REQ-20251006-0001. 
Your Certificate of Enrolment is now being processed. 
Estimated completion: 5-7 working days.
```

**Template 3: Ready for Claim**
```
MinSU Registrar: Your document (REQ-20251006-0001) is ready! 
Please claim at Registrar's Office (Mon-Fri, 8AM-5PM) with valid ID. 
Bring this SMS or request number.
```

**Template 4: Payment Expired**
```
MinSU Registrar: Payment deadline for request #REQ-20251006-0001 has expired. 
Request cancelled. Please submit a new request if needed. 
Visit: minsu.edu.ph
```

**Template 5: Document Released**
```
MinSU Registrar: Document #REQ-20251006-0001 has been released to you. 
Thank you for using our online service! 
Rate your experience: minsu.edu.ph/feedback
```

### 12.2 Email Templates

**Subject: Document Request Submitted - Action Required**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003d82; color: white; padding: 20px; text-align: center; }
        .content { background: #f5f5f5; padding: 20px; }
        .payment-box { background: white; border: 2px solid #003d82; padding: 15px; margin: 20px 0; }
        .amount { font-size: 24px; font-weight: bold; color: #003d82; }
        .button { background: #003d82; color: white; padding: 12px 30px; text-decoration: none; display: inline-block; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Mindoro State University</h2>
            <p>Registrar's Office - Document Request System</p>
        </div>
        
        <div class="content">
            <h3>Document Request Submitted</h3>
            
            <p>Dear Juan Dela Cruz,</p>
            
            <p>Your document request has been successfully submitted.</p>
            
            <div class="payment-box">
                <h4>Payment Information</h4>
                <p><strong>Request Number:</strong> REQ-20251006-0001</p>
                <p><strong>Payment Reference:</strong> PRN-20251006-0001</p>
                <p><strong>Document:</strong> Certificate of Enrolment</p>
                <p><strong>Processing Time:</strong> Standard (5-7 working days)</p>
                <p class="amount">Amount to Pay: ₱40.00</p>
                <p><strong>Payment Deadline:</strong> October 8, 2025 - 5:00 PM</p>
            </div>
            
            <h4>How to Pay:</h4>
            <ol>
                <li>Visit the Cashier's Office at MinSU Main Campus</li>
                <li>Present your Payment Reference Number (PRN): <strong>PRN-20251006-0001</strong></li>
                <li>Pay the amount of ₱100.00</li>
                <li>Keep your Official Receipt</li>
            </ol>
            
            <p><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</p>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://minsu.edu.ph/track/REQ-20251006-0001" class="button">
                    Track Your Request
                </a>
            </p>
            
            <p><strong>Important:</strong> Your request will be automatically cancelled if payment is not received by the deadline.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>For inquiries, contact the Registrar's Office at registrar@minsu.edu.ph</p>
            <p>© 2025 Mindoro State University. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### 12.3 Notification Queue System

```sql
-- Notification queue for retry mechanism
CREATE TABLE notification_queue (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notification_id INT NOT NULL,
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    next_retry_at TIMESTAMP NULL,
    last_error TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (notification_id) REFERENCES notifications(id)
);
```

**Retry Logic:**
```javascript
async function processNotificationQueue() {
    const pendingNotifications = await db.query(`
        SELECT n.*, nq.retry_count, nq.max_retries
        FROM notifications n
        JOIN notification_queue nq ON n.id = nq.notification_id
        WHERE n.status = 'failed'
        AND nq.retry_count < nq.max_retries
        AND (nq.next_retry_at IS NULL OR nq.next_retry_at <= NOW())
    `);
    
    for (const notification of pendingNotifications) {
        try {
            if (notification.type === 'sms' || notification.type === 'both') {
                await sendSMS(notification.student_id, notification.message);
            }
            
            if (notification.type === 'email' || notification.type === 'both') {
                await sendEmail(notification.student_id, notification.message);
            }
            
            // Mark as sent
            await db.query(`
                UPDATE notifications 
                SET status = 'sent', sent_at = NOW() 
                WHERE id = ?
            `, [notification.id]);
            
        } catch (error) {
            // Increment retry count and schedule next retry
            const nextRetry = new Date();
            nextRetry.setMinutes(nextRetry.getMinutes() + (5 * (notification.retry_count + 1))); // Exponential backoff
            
            await db.query(`
                UPDATE notification_queue 
                SET retry_count = retry_count + 1,
                    next_retry_at = ?,
                    last_error = ?
                WHERE notification_id = ?
            `, [nextRetry, error.message, notification.id]);
        }
    }
}

// Run every 5 minutes
setInterval(processNotificationQueue, 5 * 60 * 1000);
```

---

## 13. Document Generation System

> **⚠️ DEPRECATED:** This section is kept for historical reference only.  
> **Current Implementation:** The system now integrates with the Registrar's existing document generation software instead of generating PDFs internally. The workflow tracks document requests through all stages (payment, processing, ready for claim, release) without generating documents in the system.

### 13.1 Legacy Template Engine (Deprecated)

**Certificate of Enrollment Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        @page { size: A4; margin: 1in; }
        body { font-family: 'Times New Roman', serif; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { width: 100px; }
        .title { font-size: 24px; font-weight: bold; margin: 20px 0; }
        .content { text-align: justify; line-height: 1.8; font-size: 14px; }
        .signature { margin-top: 80px; }
        .qr-code { position: absolute; bottom: 50px; right: 50px; }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{UNIVERSITY_SEAL}}" class="logo" />
        <h1>MINDORO STATE UNIVERSITY</h1>
        <p>Calapan City, Oriental Mindoro</p>
        <p>OFFICE OF THE UNIVERSITY REGISTRAR</p>
        <div class="title">CERTIFICATE OF ENROLLMENT</div>
    </div>
    
    <div class="content">
        <p><strong>Document No.:</strong> {{DOCUMENT_NUMBER}}</p>
        <p><strong>Date Issued:</strong> {{DATE_ISSUED}}</p>
        
        <p style="margin-top: 40px;">TO WHOM IT MAY CONCERN:</p>
        
        <p>This is to certify that <strong>{{STUDENT_NAME}}</strong>, 
        with Student Number <strong>{{STUDENT_ID}}</strong>, is officially enrolled in 
        <strong>{{COURSE}}</strong>, <strong>{{YEAR_LEVEL}}</strong>, 
        for the <strong>{{SEMESTER}}</strong> of Academic Year <strong>{{ACADEMIC_YEAR}}</strong>.</p>
        
        <p>This certification is issued upon the request of the above-named student 
        for <strong>{{PURPOSE}}</strong>.</p>
        
        <p>Issued this <strong>{{DAY}}</strong> day of <strong>{{MONTH}}</strong>, <strong>{{YEAR}}</strong> 
        at Mindoro State University, Calapan City, Oriental Mindoro, Philippines.</p>
    </div>
    
    <div class="signature">
        <p>_________________________________</p>
        <p><strong>{{REGISTRAR_NAME}}</strong></p>
        <p>University Registrar</p>
    </div>
    
    <div class="qr-code">
        <img src="{{QR_CODE}}" width="100" />
        <p style="font-size: 10px; text-align: center;">Verify at minsu.edu.ph/verify</p>
    </div>
    
    <div style="font-size: 10px; color: #666; margin-top: 40px;">
        <p>Not valid without university seal.</p>
        <p>Serial No: {{SERIAL_NUMBER}}</p>
    </div>
</body>
</html>
```

### 13.2 Document Generation API

```php
<?php

namespace App\Services;

use App\Models\DocumentRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class DocumentGenerator
{
    public function generateDocument(int $requestId): string
    {
        // Fetch request and student data
        $request = DocumentRequest::with('student')->findOrFail($requestId);
        
        // Generate QR code for verification
        $verificationUrl = config('app.url') . "/verify/{$request->request_number}";
        $qrCode = QrCode::size(100)->generate($verificationUrl);
        
        // Generate serial number
        $serialNumber = $this->generateSerialNumber($request->document_type);
        
        // Prepare template data
        $templateData = [
            'university_seal' => asset('images/minsu-seal.png'),
            'document_number' => $request->request_number,
            'date_issued' => now()->format('F j, Y'),
            'student_name' => strtoupper($request->student->full_name),
            'student_id' => $request->student->student_id,
            'course' => $request->student->course,
            'year_level' => $this->getYearLevelText($request->student->year_level),
            'semester' => $this->getCurrentSemester(),
            'academic_year' => $this->getAcademicYear(),
            'purpose' => $request->purpose,
            'day' => now()->day,
            'month' => now()->format('F'),
            'year' => now()->year,
            'registrar_name' => 'Dr. Maria C. Santos',
            'qr_code' => 'data:image/png;base64,' . base64_encode($qrCode),
            'serial_number' => $serialNumber
        ];
        
        // Load and populate template
        $pdf = Pdf::loadView("documents.{$request->document_type}", $templateData);
        
        // Generate filename and save
        $filename = "{$request->request_number}_{$request->document_type}.pdf";
        $filepath = "documents/{$filename}";
        Storage::put($filepath, $pdf->output());
        
        // Update database
        $request->update([
            'document_path' => $filepath,
            'serial_number' => $serialNumber
        ]);
        
        return $filepath;
    }
    
    private function generateSerialNumber(string $documentType): string
    {
        // Implementation for generating unique serial numbers
        return 'MSU-' . date('Y') . '-' . strtoupper(substr($documentType, 0, 3)) . '-' . rand(10000, 99999);
    }
    
    private function getYearLevelText(int $yearLevel): string
    {
        return ['First', 'Second', 'Third', 'Fourth'][$yearLevel - 1] ?? 'Graduate';
    }
    
    private function getCurrentSemester(): string
    {
        $month = now()->month;
        if ($month >= 8 && $month <= 12) return 'First Semester';
        if ($month >= 1 && $month <= 5) return 'Second Semester';
        return 'Summer';
    }
    
    private function getAcademicYear(): string
    {
        $year = now()->year;
        return now()->month >= 8 ? "{$year}-" . ($year + 1) : ($year - 1) . "-{$year}";
    }
}
```

---

## 14. System Monitoring & Maintenance

### 14.1 Health Check Endpoints

**Laravel Health Check Route:**
```php
<?php

// routes/web.php or routes/api.php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

Route::get('/api/health', function () {
    $checks = [
        'database' => checkDatabase(),
        'cache' => checkCache(),
        'storage' => checkStorage(),
        'queue' => checkQueue(),
        'uptime' => app()->uptime(),
        'memory_usage' => memory_get_peak_usage(true),
    ];

    $allHealthy = collect($checks)->every(fn($check) => $check['status'] === 'ok');

    return response()->json([
        'status' => $allHealthy ? 'healthy' : 'degraded',
        'timestamp' => now()->toISOString(),
        'checks' => $checks
    ], $allHealthy ? 200 : 503);
});

function checkDatabase(): array
{
    try {
        DB::connection()->getPdo();
        // Test a simple query
        DB::select('SELECT 1');
        return ['status' => 'ok', 'response_time' => microtime(true) - LARAVEL_START];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}

function checkCache(): array
{
    try {
        $testKey = 'health_check_' . time();
        Cache::put($testKey, 'test', 10);
        $value = Cache::get($testKey);
        Cache::forget($testKey);

        return $value === 'test'
            ? ['status' => 'ok']
            : ['status' => 'error', 'message' => 'Cache read/write failed'];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}

function checkStorage(): array
{
    try {
        $testFile = 'health_check_' . time() . '.txt';
        Storage::put($testFile, 'test content');
        $content = Storage::get($testFile);
        Storage::delete($testFile);

        return $content === 'test content'
            ? ['status' => 'ok']
            : ['status' => 'error', 'message' => 'Storage read/write failed'];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}

function checkQueue(): array
{
    try {
        // Check if queue is running (this is a simple check)
        $pendingJobs = DB::table('jobs')->count();
        return [
            'status' => 'ok',
            'pending_jobs' => $pendingJobs
        ];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}
```

**Laravel Telescope Integration (Optional):**
```php
// For advanced monitoring, consider installing Laravel Telescope
// composer require laravel/telescope
// php artisan telescope:install
// php artisan migrate

// Telescope provides:
// - Request monitoring
// - Command monitoring
// - Job monitoring
// - Cache monitoring
// - Query monitoring
// - Exception tracking
```

### 14.2 Automated Backup System

**Laravel Artisan Command for Database Backup:**
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BackupDatabase extends Command
{
    protected $signature = 'db:backup {--cleanup : Remove old backups}';
    protected $description = 'Create a backup of the database';

    public function handle()
    {
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $filename = "backup_{$timestamp}.sql.gz";
        $path = storage_path("backups/{$filename}");

        $this->info('Starting database backup...');

        // Create backup directory if it doesn't exist
        $backupDir = dirname($path);
        if (!is_dir($backupDir)) {
            mkdir($backupDir, 0755, true);
        }

        // Execute mysqldump
        $command = sprintf(
            'mysqldump -u%s -p%s %s | gzip > %s',
            config('database.connections.mysql.username'),
            config('database.connections.mysql.password'),
            config('database.connections.mysql.database'),
            $path
        );

        $returnCode = null;
        $output = [];
        exec($command, $output, $returnCode);

        if ($returnCode === 0) {
            $this->info("Backup created successfully: {$filename}");

            // Optional: Upload to cloud storage
            if (config('backup.upload_to_cloud')) {
                $this->uploadToCloud($path, $filename);
            }

            // Cleanup old backups
            if ($this->option('cleanup')) {
                $this->cleanupOldBackups();
            }
        } else {
            $this->error('Backup failed!');
            return 1;
        }

        return 0;
    }

    private function uploadToCloud($localPath, $filename)
    {
        // Upload to AWS S3, Google Cloud, etc.
        // Storage::disk('s3')->put("backups/{$filename}", file_get_contents($localPath));
        $this->info("Uploaded to cloud: {$filename}");
    }

    private function cleanupOldBackups()
    {
        $files = glob(storage_path('backups/backup_*.sql.gz'));
        $keepDays = config('backup.keep_days', 30);

        foreach ($files as $file) {
            if (filemtime($file) < Carbon::now()->subDays($keepDays)->timestamp) {
                unlink($file);
                $this->info('Removed old backup: ' . basename($file));
            }
        }
    }
}
```

**Schedule the backup (app/Console/Kernel.php):**
```php
<?php

protected function schedule(Schedule $schedule)
{
    // Daily backup at 2 AM
    $schedule->command('db:backup --cleanup')
             ->dailyAt('02:00')
             ->withoutOverlapping()
             ->runInBackground();
}
```

### 14.3 Error Monitoring

```php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use App\Services\AlertService;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        // List exceptions that should not be reported
    ];

    public function report(Throwable $exception)
    {
        // Log error with context
        Log::error('Application Error', [
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
            'url' => request()->fullUrl(),
            'method' => request()->method(),
            'user_id' => auth()->id(),
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        // Send alert for critical errors
        if ($this->isCritical($exception)) {
            app(AlertService::class)->sendAlert($exception);
        }

        parent::report($exception);
    }

    public function render($request, Throwable $exception)
    {
        // Custom error responses for API
        if ($request->is('api/*')) {
            return response()->json([
                'error' => app()->environment('production')
                    ? 'An error occurred'
                    : $exception->getMessage()
            ], 500);
        }

        return parent::render($request, $exception);
    }

    private function isCritical(Throwable $exception): bool
    {
        return $exception instanceof \PDOException ||
               $exception instanceof \Illuminate\Database\QueryException ||
               str_contains($exception->getMessage(), 'PayMongo') ||
               $exception->getCode() >= 500;
    }
}
```

**Laravel Health Check Route:**
```php
<?php

// routes/web.php
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'checks' => [
            'database' => $this->checkDatabase(),
            'cache' => $this->checkCache(),
            'storage' => $this->checkStorage(),
            'uptime' => app()->uptime()
        ]
    ]);
});

private function checkDatabase(): array
{
    try {
        DB::connection()->getPdo();
        return ['status' => 'ok'];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}
```

---

## 15. User Training Materials

### 15.1 Quick Start Guide for Students

**How to Request a Document in 5 Easy Steps:**

1. **Login** to minsu.edu.ph/registrar with your student credentials
2. **Click** "Request Document" and fill out the form
3. **Choose** payment method: Pay Online or Pay Cash at Cashier
4. **Pay** within 48 hours (for cash option)
5. **Claim** your document at the Registrar's Office when notified

### 15.2 Cashier Training Checklist

- [ ] System login and navigation
- [ ] Searching for payment reference numbers
- [ ] Verifying student information
- [ ] Confirming cash payments
- [ ] Entering official receipt numbers
- [ ] Handling payment corrections
- [ ] Generating daily reports
- [ ] Troubleshooting common issues

### 15.3 Registrar Staff Training Checklist

- [ ] Accessing the processing queue
- [ ] Reviewing document requests
- [ ] Generating documents from templates
- [ ] Approving and rejecting requests
- [ ] Marking documents as ready for claim
- [ ] Processing document release
- [ ] Handling refunds
- [ ] Using the admin dashboard

---

**END OF DOCUMENTATION**

*This document will be updated as the project progresses through development phases.*

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 2025 | Development Team | Initial documentation with Laravel Boost + Shadcn UI stack |
| 1.1 | Oct 2025 | Development Team | Updated technology stack, Laravel-specific implementations, MySQL configuration |

---