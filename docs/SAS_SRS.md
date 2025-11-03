# Software Requirements Specification (SRS)
## Student Affairs and Services (SAS)

**Version:** 1.0  
**Date:** October 19, 2025  
**Project:** MinSUBC Systems - SAS Module

---

## Table of Contents
1. [System Overview](#1-system-overview)
2. [Overall Description](#2-overall-description)
3. [System Features and Requirements](#3-system-features-and-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Data Requirements](#5-data-requirements)
6. [User Interface Requirements](#6-user-interface-requirements)
7. [System Architecture](#7-system-architecture)
8. [User Workflows](#8-user-workflows)
9. [Implementation Phases](#9-implementation-phases)
10. [Acceptance Criteria](#10-acceptance-criteria)
11. [Appendices](#11-appendices)

---

## 1. System Overview

### 1.1 Purpose
This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the Student Affairs and Services (SAS). The system aims to digitalize and streamline student affairs operations including scholarship management, insurance tracking, organizational records, calendar of activities, and document digitalization.

### 1.2 Scope
The Student Affairs and Services (SAS) is a comprehensive web-based management system that provides:
- **Scholarship Management:** Track students with various scholarships (TES, TDP, etc.)
- **Insurance Management:** Digitalize and manage student insurance forms and records
- **Organizational Records:** Manage 11 minor and 12 major student organizations
- **Calendar of Activities:** Schedule and track student affairs events and activities
- **Document Digitalization:** Convert physical records to digital format with centralized storage

### 1.3 Intended Audience
- **Students:** View scholarship status, submit insurance forms, view organization information
- **SAS Officers:** Manage scholarships, insurance records, organizational data, and activities
- **Organization Advisers:** Manage their respective organization records
- **SAS Administrators:** Full system access, user management, and system configuration
- **University Administration:** Access reports and analytics

### 1.4 Document Conventions
- **Must:** Indicates mandatory requirement
- **Should:** Indicates recommended requirement
- **May:** Indicates optional requirement

---

## 2. Overall Description

### 2.1 Product Perspective
The Student Affairs and Services (SAS) is a module within the MinSUBC Systems platform. It integrates with the existing authentication system and follows the modular architecture of the parent application.

### 2.2 Product Functions
The system provides the following core functions:
- **Scholarship Tracking:** Maintain comprehensive records of scholarship recipients
- **Insurance Documentation:** Digital storage and management of insurance forms
- **Organization Management:** Track organizational structure, officers, and members
- **Activity Scheduling:** Calendar-based event planning and reminders
- **Document Repository:** Centralized digital archive for all SAS records
- **Reporting & Analytics:** Generate reports on scholarships, organizations, and activities

### 2.3 User Classes and Characteristics

#### 2.3.1 Students
- **Access Level:** Read-only for personal records, submit forms
- **Technical Expertise:** Basic
- **Primary Activities:** View scholarship status, submit insurance forms, view organization info

#### 2.3.2 SAS Officers
- **Access Level:** Create, read, update scholarship and insurance records
- **Technical Expertise:** Moderate
- **Primary Activities:** Manage scholarships, process insurance forms, schedule activities

#### 2.3.3 Organization Advisers
- **Access Level:** Manage assigned organization records
- **Technical Expertise:** Basic to Moderate
- **Primary Activities:** Update organization information, upload documents, manage members

#### 2.3.4 SAS Administrators
- **Access Level:** Full system access
- **Technical Expertise:** Advanced
- **Primary Activities:** User management, system configuration, approve records, generate reports

---

## 3. System Features and Requirements

### 3.1 Scholarship Management

#### 3.1.1 Description
Comprehensive tracking and management of student scholarships including TES (Tertiary Education Subsidy), TDP (Tulong Dunong Program), and other scholarship programs.

#### 3.1.2 Functional Requirements

**FR-SCHOL-01:** System must support multiple scholarship types
- TES (Tertiary Education Subsidy)
- TDP (Tulong Dunong Program)
- CHED Merit Scholarships
- Private Scholarships
- University Scholarships
- Other scholarship programs

**FR-SCHOL-02:** System must allow adding new scholarship records with:
- Student information (ID, name, course, year level)
- Scholarship type and name
- Academic year/semester
- Amount/grant value
- Status (Active, Suspended, Completed, Cancelled)
- Requirements submitted
- Date awarded
- Expiration date
- Remarks/notes

**FR-SCHOL-03:** System must allow updating existing scholarship records
- Update status
- Modify grant amounts
- Extend or terminate scholarships
- Track renewal status
- Update requirements compliance

**FR-SCHOL-04:** System must provide scholarship viewing capabilities
- List all scholarship recipients
- Filter by: scholarship type, academic year, status, course
- Search by student name or ID
- Sort by various fields
- View individual scholarship details
- View scholarship history per student

**FR-SCHOL-05:** System must track scholarship requirements
- Maintain checklist of required documents
- Track submission status
- Upload supporting documents
- Set deadline reminders
- Flag incomplete requirements

**FR-SCHOL-06:** System must generate scholarship reports
- Total scholars per program
- Scholarship disbursement summary
- Scholars by college/course
- Active vs. inactive scholars
- Scholarship renewal rates
- Export to PDF/Excel

**FR-SCHOL-07:** System must send notifications
- Renewal reminders
- Requirement deadlines
- Status changes
- Important announcements

### 3.2 Insurance Management

#### 3.2.1 Description
Digitalize and manage student insurance forms, policies, and claims to replace paper-based processes.

#### 3.2.2 Functional Requirements

**FR-INS-01:** System must allow students to submit insurance forms digitally
- Upload insurance policy documents (PDF, images)
- Fill out digital insurance form
- Specify insurance provider
- Enter policy number and coverage details
- Set policy effective dates
- Submit beneficiary information

**FR-INS-02:** System must validate insurance submissions
- Check required fields
- Validate file formats and sizes
- Verify policy dates
- Check for duplicate submissions

**FR-INS-03:** System must allow SAS officers to review insurance forms
- View pending submissions
- Approve or reject submissions
- Request additional information
- Add officer notes/remarks

**FR-INS-04:** System must track insurance status
- Pending Review
- Approved
- Rejected
- Expired
- Renewed

**FR-INS-05:** System must provide insurance record viewing
- List all students with insurance
- Filter by: status, insurance provider, academic year
- Search by student name/ID
- View insurance policy details
- View uploaded documents

**FR-INS-06:** System must send insurance notifications
- Submission confirmation
- Approval/rejection notifications
- Policy expiration reminders
- Renewal reminders

**FR-INS-07:** System must generate insurance reports
- Total insured students
- Insurance coverage by type
- Provider distribution
- Expiring policies
- Export capabilities

### 3.3 Organizational Records

#### 3.3.1 Description
Manage records for 11 minor organizations and 12 major organizations, including organizational information, officers, members, and activities.

#### 3.3.2 Functional Requirements

**FR-ORG-01:** System must maintain organization profiles
- Organization name
- Organization type (Major/Minor)
- Organization category (Academic, Cultural, Sports, etc.)
- Mission and vision
- Establishment date
- Adviser information
- Contact details
- Logo/emblem
- Status (Active/Inactive)

**FR-ORG-02:** System must track organization officers
- Position/title
- Student name and ID
- Term start and end dates
- Contact information
- Photo
- Responsibilities

**FR-ORG-03:** System must manage organization membership
- Add/remove members
- Member status (Active/Alumni)
- Membership date
- Position history
- Member contributions

**FR-ORG-04:** System must store organizational documents
- Constitution and by-laws
- Activity reports
- Financial reports
- Meeting minutes
- Accomplishment reports
- Recognition/awards
- Event photos

**FR-ORG-05:** System must track organizational activities
- Activity name and description
- Date and venue
- Participants count
- Budget and expenses
- Activity photos/documentation
- Accomplishment report

**FR-ORG-06:** System must provide organization viewing capabilities
- List all organizations
- Filter by type (Major/Minor) and category
- Search by organization name
- View organization profile
- View organization documents
- View activity history

**FR-ORG-07:** System must allow organization advisers to update records
- Update organization information
- Manage officers and members
- Upload documents
- Submit activity reports

**FR-ORG-08:** System must generate organizational reports
- Active organizations summary
- Officer listings
- Membership statistics
- Activity participation rates
- Document compliance status
- Export to PDF/Excel

### 3.4 Calendar of Activities

#### 3.4.1 Description
Maintain a centralized calendar for student affairs activities with scheduling, reminders, and notifications.

#### 3.4.2 Functional Requirements

**FR-CAL-01:** System must display activities in calendar view
- Month view
- Week view
- Day view
- List view
- Agenda view

**FR-CAL-02:** System must allow creating scheduled activities
- Activity title
- Description
- Date and time (start/end)
- Location/venue
- Category (Meeting, Event, Training, etc.)
- Organizer (Office/Organization)
- Target participants
- Attached documents
- Color coding by category

**FR-CAL-03:** System must support recurring activities
- Daily, weekly, monthly patterns
- Custom recurrence rules
- End date or occurrence count

**FR-CAL-04:** System must provide activity reminders
- Email notifications
- SMS notifications (optional)
- Configurable reminder timing (1 day, 1 week before)
- Reminder for upcoming today's activities

**FR-CAL-05:** System must highlight scheduled events
- Mark today's activities
- Highlight upcoming events (next 7 days)
- Color-code by priority or category
- Badge for new activities

**FR-CAL-06:** System must allow activity updates
- Reschedule activities
- Cancel activities
- Modify details
- Notify affected participants

**FR-CAL-07:** System must provide activity search and filter
- Search by title or description
- Filter by date range
- Filter by category
- Filter by organizer

**FR-CAL-08:** System must support calendar export
- Export to iCal format
- Export to Google Calendar
- Print calendar view
- PDF export

**FR-CAL-09:** System must track activity completion
- Mark as completed
- Upload post-activity report
- Attach photos/documentation
- Record attendance

### 3.5 Document Digitalization

#### 3.5.1 Description
Centralized system for converting physical records to digital format, enabling proper storage and eventual disposal of physical documents.

#### 3.5.2 Functional Requirements

**FR-DOC-01:** System must support document upload
- Scan and upload documents
- Support multiple file formats (PDF, JPG, PNG)
- Batch upload capability
- Maximum file size: 10MB per file
- Maximum total upload: 100MB per batch

**FR-DOC-02:** System must categorize documents
- Scholarship documents
- Insurance forms
- Organizational records
- Activity reports
- Administrative documents
- Other categories

**FR-DOC-03:** System must capture document metadata
- Document title
- Document type/category
- Original document reference number
- Date of original document
- Date digitalized
- Uploaded by (user)
- Related entity (student, organization, etc.)
- Academic year
- Physical storage location (before disposal)
- Disposal status

**FR-DOC-04:** System must track disposal status
- Physical copy exists
- Pending disposal approval
- Approved for disposal
- Disposed (with date)
- Permit reference number

**FR-DOC-05:** System must provide document search
- Search by title, category, reference number
- Filter by date range
- Filter by disposal status
- Filter by uploader
- Full-text search in PDF (if supported)

**FR-DOC-06:** System must support document viewing
- Online PDF viewer
- Image preview
- Download original file
- Print capability
- Share via link (with permissions)

**FR-DOC-07:** System must implement version control
- Track document updates
- Maintain version history
- Compare versions
- Restore previous versions

**FR-DOC-08:** System must enforce access control
- Public documents (viewable by all)
- Restricted documents (by role)
- Private documents (specific users only)
- Document-level permissions

**FR-DOC-09:** System must generate digitalization reports
- Total documents digitalized
- Documents by category
- Disposal readiness report
- Storage statistics
- Upload activity log
- Export to Excel/PDF

**FR-DOC-10:** System must provide bulk operations
- Bulk categorization
- Bulk disposal status update
- Bulk permission changes
- Bulk download (as ZIP)

### 3.6 Dashboard and Analytics

#### 3.6.1 Description
Centralized dashboard providing overview and analytics for SAS operations.

#### 3.6.2 Functional Requirements

**FR-DASH-01:** System must display scholarship statistics
- Total active scholars
- Scholars by program
- Scholarship distribution chart
- Recent scholarship updates

**FR-DASH-02:** System must display insurance statistics
- Total insured students
- Insurance coverage percentage
- Expiring policies count
- Recent submissions

**FR-DASH-03:** System must display organization statistics
- Total active organizations
- Major vs. minor breakdown
- Recent organizational activities
- Document compliance rate

**FR-DASH-04:** System must display calendar summary
- Today's activities
- Upcoming events (next 7 days)
- Activities this month
- Recent completed activities

**FR-DASH-05:** System must display digitalization metrics
- Total documents digitalized
- Documents pending disposal
- Recent uploads
- Storage utilization

**FR-DASH-06:** System must provide quick actions
- Add new scholarship
- Upload insurance form
- Create activity
- Upload document
- Quick search

### 3.7 User Management

#### 3.7.1 Description
Manage system users, roles, and permissions specific to SAS module.

#### 3.7.2 Functional Requirements

**FR-USER-01:** System must support role-based access control
- SAS Administrator
- SAS Officer
- Organization Adviser
- Student
- View-only roles

**FR-USER-02:** System must allow user management
- Add/remove users
- Assign roles
- Set permissions
- Deactivate accounts
- Reset passwords

**FR-USER-03:** System must track user activities
- Login history
- Activity logs
- Document access logs
- Modification history

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **NFR-PERF-01:** Dashboard must load within 3 seconds on standard broadband
- **NFR-PERF-02:** Document search results must appear within 2 seconds
- **NFR-PERF-03:** System must support at least 300 concurrent users
- **NFR-PERF-04:** File uploads must complete within 60 seconds for maximum file size
- **NFR-PERF-05:** Calendar view must render within 2 seconds for monthly data
- **NFR-PERF-06:** Reports must generate within 10 seconds for standard date ranges

### 4.2 Security Requirements
- **NFR-SEC-01:** System must use HTTPS for all communications
- **NFR-SEC-02:** System must implement role-based access control (RBAC)
- **NFR-SEC-03:** Passwords must be hashed using bcrypt or similar algorithms
- **NFR-SEC-04:** System must prevent SQL injection and XSS attacks
- **NFR-SEC-05:** Uploaded files must be validated and scanned for malware
- **NFR-SEC-06:** System must log all security-relevant events
- **NFR-SEC-07:** Session timeout must be set to 30 minutes of inactivity
- **NFR-SEC-08:** Sensitive documents must be encrypted at rest
- **NFR-SEC-09:** System must implement audit trail for document disposal

### 4.3 Usability Requirements
- **NFR-USE-01:** Interface must be intuitive and require minimal training
- **NFR-USE-02:** System must be accessible on desktop, tablet, and mobile devices
- **NFR-USE-03:** System should follow WCAG 2.1 Level AA accessibility standards
- **NFR-USE-04:** Error messages must be clear and actionable
- **NFR-USE-05:** System must provide contextual help and documentation
- **NFR-USE-06:** Forms must include field validation with immediate feedback
- **NFR-USE-07:** Calendar must support drag-and-drop for rescheduling

### 4.4 Reliability Requirements
- **NFR-REL-01:** System must have 99.5% uptime during business hours
- **NFR-REL-02:** System must perform daily automated backups
- **NFR-REL-03:** Data must be recoverable within 4 hours of failure
- **NFR-REL-04:** System must gracefully handle errors without data loss
- **NFR-REL-05:** File uploads must be resumable after connection failure

### 4.5 Maintainability Requirements
- **NFR-MAINT-01:** Code must follow Laravel best practices and PSR standards
- **NFR-MAINT-02:** System must include inline documentation
- **NFR-MAINT-03:** Database schema must be version-controlled via migrations
- **NFR-MAINT-04:** System must support easy content updates without developer intervention
- **NFR-MAINT-05:** All features must have unit and feature tests

### 4.6 Compatibility Requirements
- **NFR-COMP-01:** System must support modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **NFR-COMP-02:** System must be responsive and mobile-friendly
- **NFR-COMP-03:** System must integrate with existing MinSUBC authentication system
- **NFR-COMP-04:** System must support PDF viewing without external plugins

### 4.7 Data Privacy and Compliance
- **NFR-PRIV-01:** System must comply with Data Privacy Act (DPA) of 2012
- **NFR-PRIV-02:** System must obtain student consent for data processing
- **NFR-PRIV-03:** Students must have right to access, correct, and delete their data
- **NFR-PRIV-04:** System must implement data retention policy (7 years for education records)
- **NFR-PRIV-05:** System must support data export for portability
- **NFR-PRIV-06:** Breach notification procedures must be in place

---

## 5. Data Requirements

### 5.1 Database Entities

#### 5.1.1 Scholarships
```sql
CREATE TABLE scholarships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    scholarship_code VARCHAR(50) UNIQUE,
    scholarship_name VARCHAR(255) NOT NULL,
    scholarship_type ENUM('TES', 'TDP', 'CHED Merit', 'Private', 'University', 'Other') NOT NULL,
    description TEXT,
    provider VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE scholarship_recipients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    scholarship_id INT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester ENUM('1st', '2nd', 'Summer') NOT NULL,
    amount DECIMAL(10, 2),
    status ENUM('Active', 'Suspended', 'Completed', 'Cancelled') DEFAULT 'Active',
    date_awarded DATE,
    expiration_date DATE,
    renewal_status ENUM('Not Applicable', 'Pending', 'Approved', 'Denied'),
    remarks TEXT,
    requirements_complete BOOLEAN DEFAULT FALSE,
    created_by INT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE TABLE scholarship_requirements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipient_id INT NOT NULL,
    requirement_name VARCHAR(255) NOT NULL,
    is_submitted BOOLEAN DEFAULT FALSE,
    submission_date DATE,
    file_path VARCHAR(500),
    deadline DATE,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES scholarship_recipients(id) ON DELETE CASCADE
);
```

#### 5.1.2 Insurance
```sql
CREATE TABLE insurance_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    insurance_provider VARCHAR(255) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    policy_type VARCHAR(100),
    coverage_amount DECIMAL(12, 2),
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    status ENUM('Pending Review', 'Approved', 'Rejected', 'Expired', 'Renewed') DEFAULT 'Pending Review',
    beneficiary_name VARCHAR(255),
    beneficiary_relationship VARCHAR(100),
    policy_document_path VARCHAR(500),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    reviewed_at TIMESTAMP NULL,
    review_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

CREATE TABLE insurance_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    insurance_id INT NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (insurance_id) REFERENCES insurance_records(id) ON DELETE CASCADE
);
```

#### 5.1.3 Organizations
```sql
CREATE TABLE organizations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_code VARCHAR(50) UNIQUE NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_type ENUM('Major', 'Minor') NOT NULL,
    category VARCHAR(100),
    mission TEXT,
    vision TEXT,
    establishment_date DATE,
    logo_path VARCHAR(500),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    adviser_id INT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adviser_id) REFERENCES users(id)
);

CREATE TABLE organization_officers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_id INT NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    position VARCHAR(100) NOT NULL,
    term_start DATE NOT NULL,
    term_end DATE,
    responsibilities TEXT,
    photo_path VARCHAR(500),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE organization_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_id INT NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    membership_date DATE NOT NULL,
    status ENUM('Active', 'Alumni', 'Inactive') DEFAULT 'Active',
    membership_end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    UNIQUE KEY unique_membership (organization_id, student_id)
);

CREATE TABLE organization_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_id INT NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    description TEXT,
    activity_date DATE NOT NULL,
    venue VARCHAR(255),
    participants_count INT,
    budget DECIMAL(10, 2),
    expenses DECIMAL(10, 2),
    accomplishment_report TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE organization_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_id INT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    academic_year VARCHAR(20),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
```

#### 5.1.4 Calendar of Activities
```sql
CREATE TABLE sas_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    all_day BOOLEAN DEFAULT FALSE,
    location VARCHAR(255),
    category VARCHAR(100),
    organizer VARCHAR(255),
    organization_id INT NULL,
    color VARCHAR(50),
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_rule VARCHAR(500),
    status ENUM('Scheduled', 'Ongoing', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    target_participants TEXT,
    actual_participants INT,
    completion_report TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE activity_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_id INT NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES sas_activities(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE activity_reminders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_id INT NOT NULL,
    reminder_date DATETIME NOT NULL,
    reminder_type ENUM('Email', 'SMS', 'Both') DEFAULT 'Email',
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES sas_activities(id) ON DELETE CASCADE
);
```

#### 5.1.5 Document Digitalization
```sql
CREATE TABLE digitalized_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_title VARCHAR(255) NOT NULL,
    document_category ENUM('Scholarship', 'Insurance', 'Organization', 'Activity', 'Administrative', 'Other') NOT NULL,
    document_type VARCHAR(100),
    reference_number VARCHAR(100),
    original_date DATE,
    digitalized_date DATE NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20),
    related_entity_type VARCHAR(50),
    related_entity_id INT,
    physical_location VARCHAR(255),
    disposal_status ENUM('Physical Copy Exists', 'Pending Disposal Approval', 'Approved for Disposal', 'Disposed') DEFAULT 'Physical Copy Exists',
    disposal_permit_number VARCHAR(100),
    disposal_date DATE,
    is_public BOOLEAN DEFAULT FALSE,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE document_versions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_id INT NOT NULL,
    version_number INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    change_description TEXT,
    uploaded_by INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES digitalized_documents(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE document_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_id INT NOT NULL,
    user_id INT NULL,
    role VARCHAR(50) NULL,
    permission_type ENUM('View', 'Download', 'Edit', 'Delete') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES digitalized_documents(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (user_id IS NOT NULL OR role IS NOT NULL)
);
```

#### 5.1.6 Notifications
```sql
CREATE TABLE sas_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    student_id VARCHAR(20),
    notification_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    sent_via ENUM('System', 'Email', 'SMS', 'All') DEFAULT 'System',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
```

### 5.2 File Storage Requirements

**Storage Organization:**
```
storage/app/sas/
├── scholarships/
│   ├── requirements/
│   │   └── {year}/{month}/{filename}
│   └── documents/
│       └── {year}/{month}/{filename}
├── insurance/
│   └── policies/
│       └── {year}/{month}/{filename}
├── organizations/
│   ├── {org_code}/
│   │   ├── documents/
│   │   ├── logos/
│   │   └── photos/
│   └── activities/
│       └── {year}/{month}/{filename}
├── activities/
│   └── documents/
│       └── {year}/{month}/{filename}
└── digitalized/
    ├── scholarship/
    ├── insurance/
    ├── organization/
    ├── activity/
    └── administrative/
```

**File Type Support:**
- **Documents:** PDF, DOCX, DOC, XLSX, XLS (max 10MB)
- **Images:** JPEG, PNG, WebP (max 5MB)
- **Archives:** ZIP (max 50MB)

**Naming Convention:**
- `{type}_{reference}_{timestamp}_{original_name}`
- Example: `schol_TES001_20251019143000_requirements.pdf`

---

## 6. User Interface Requirements

### 6.1 Student Interface

#### 6.1.1 Student Dashboard
- My Scholarships widget
- My Insurance Status widget
- My Organizations widget
- Upcoming Activities widget
- Recent Notifications

#### 6.1.2 Scholarship Page
- View my scholarship details
- Download scholarship certificate
- View requirements checklist
- Upload required documents
- Scholarship history

#### 6.1.3 Insurance Page
- Submit insurance form
- View insurance status
- Upload insurance policy documents
- View expiration alerts

#### 6.1.4 Organizations Page
- View organizations I belong to
- View organization details
- Access organization documents
- View organization activities

### 6.2 SAS Officer Interface

#### 6.2.1 Dashboard
- Statistics overview
- Pending tasks
- Recent activities
- Quick actions

#### 6.2.2 Scholarship Management
- List all scholarships
- Add/edit scholarship programs
- Manage scholarship recipients
- Review requirements
- Generate reports

#### 6.2.3 Insurance Management
- Pending insurance submissions
- Review insurance forms
- Approve/reject submissions
- Track expiring policies
- Generate reports

#### 6.2.4 Organization Management
- List all organizations
- Edit organization details
- View organization documents
- Monitor compliance
- Generate reports

#### 6.2.5 Calendar Management
- Calendar view
- Create/edit activities
- Manage reminders
- Mark activities as completed
- View activity reports

#### 6.2.6 Document Management
- Upload documents
- Batch upload
- Categorize documents
- Track disposal status
- Search and filter
- Generate reports

### 6.3 Organization Adviser Interface

#### 6.3.1 My Organization Dashboard
- Organization overview
- Officers and members list
- Recent activities
- Document repository
- Pending tasks

#### 6.3.2 Organization Management
- Update organization information
- Manage officers
- Manage members
- Upload documents
- Submit activity reports

### 6.4 Administrator Interface

#### 6.4.1 Admin Dashboard
- System-wide statistics
- User activity logs
- System health
- Quick administration tasks

#### 6.4.2 User Management
- Manage users
- Assign roles
- Set permissions
- View activity logs

#### 6.4.3 System Configuration
- Scholarship types
- Organization categories
- Activity categories
- Document categories
- Notification templates
- System settings

#### 6.4.4 Reports and Analytics
- Comprehensive reports
- Data export
- Custom report builder
- Analytics dashboard

---

## 7. System Architecture

### 7.1 Technology Stack

**Frontend:**
- Framework: React v19.1.1 with TypeScript
- UI Library: Tailwind CSS v4.1.12 + Shadcn UI (@shadcn registry)
- State Management: Inertia.js v2.1.4
- Calendar Library: FullCalendar or React Big Calendar
- File Upload: React Dropzone
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
- Migrations: Laravel Migrations

**File Storage:**
- Local: Laravel Storage
- Cloud: AWS S3 or similar (optional)

**Notifications:**
- Email: Laravel Mail
- SMS: Semaphore or similar provider (optional)

**Key Packages & Versions:**
- **Inertia.js Ecosystem:**
  - inertiajs/inertia-laravel: v2.0.10
  - @inertiajs/react: v2.1.4
- **Laravel Ecosystem:**
  - laravel/framework: v12.32.5
  - laravel/fortify: v1.31.1
  - laravel/mcp: v0.2.1
- **Development & Testing:**
  - laravel/boost: v1.3 (dev)
  - laravel/pint: v1.25.1
  - pestphp/pest: v3.8.4
- **Frontend Tools:**
  - tailwindcss: v4.1.12
  - prettier: v3.6.2

**Shadcn UI Components Available:**
- Core UI Components: Button, Card, Input, Label, Badge, Avatar
- Form Components: Form, Select, Checkbox, Radio, Switch, Textarea
- Layout Components: Sidebar, Sheet, Dialog, Tabs
- Data Display: Table, Badge, Calendar, Data Table
- Feedback: Alert, Toast, Tooltip
- Advanced: Command Palette, Combobox, Date Picker

### 7.2 Module Structure

```
app/Modules/SAS/
├── Http/
│   ├── Controllers/
│   │   ├── ScholarshipController.php
│   │   ├── InsuranceController.php
│   │   ├── OrganizationController.php
│   │   ├── ActivityController.php
│   │   ├── DocumentController.php
│   │   └── DashboardController.php
│   ├── Middleware/
│   │   └── CheckSASRole.php
│   └── Requests/
│       ├── StoreScholarshipRequest.php
│       ├── UpdateScholarshipRequest.php
│       ├── StoreInsuranceRequest.php
│       ├── StoreOrganizationRequest.php
│       ├── StoreActivityRequest.php
│       └── UploadDocumentRequest.php
├── Models/
│   ├── Scholarship.php
│   ├── ScholarshipRecipient.php
│   ├── InsuranceRecord.php
│   ├── Organization.php
│   ├── OrganizationOfficer.php
│   ├── OrganizationMember.php
│   ├── SASActivity.php
│   ├── DigitalizedDocument.php
│   └── SASNotification.php
├── Services/
│   ├── ScholarshipService.php
│   ├── InsuranceService.php
│   ├── OrganizationService.php
│   ├── ActivityService.php
│   ├── DocumentService.php
│   └── NotificationService.php
├── Observers/
│   ├── ScholarshipObserver.php
│   └── ActivityObserver.php
└── routes.php
```

### 7.3 System Components Diagram

```
┌─────────────────────────────────────────────────┐
│           Student Interface (React)             │
│  (Scholarships, Insurance, Orgs, Activities)    │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────┐
│                                                 │
┌────────▼──────────┐      ┌──────────▼─────────┐
│  SAS Officer      │      │  Org Adviser       │
│  Portal           │      │  Portal            │
└────────┬──────────┘      └──────────┬─────────┘
         │                            │
         └──────────┬─────────────────┘
                    │
         ┌──────────▼──────────┐
         │  Admin Portal       │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────────────────────┐
         │  Laravel Backend (Inertia.js API)   │
         │  ─────────────────────────────────  │
         │  • Scholarship Service              │
         │  • Insurance Service                │
         │  • Organization Service             │
         │  • Activity Service                 │
         │  • Document Service                 │
         │  • Notification Service             │
         └──────────┬──────────────────────────┘
                    │
         ┌──────────▼──────────────────────────┐
         │        MySQL Database               │
         │  • Scholarships                     │
         │  • Insurance                        │
         │  • Organizations                    │
         │  • Activities                       │
         │  • Documents                        │
         └─────────────────────────────────────┘
```

---

## 8. User Workflows

### 8.1 Scholarship Management Workflow

#### 8.1.1 Add New Scholarship Recipient
```
1. SAS Officer logs in
   ↓
2. Navigate to Scholarships → Add Recipient
   ↓
3. Search and select student
   ↓
4. Fill scholarship details:
   - Select scholarship program
   - Enter academic year/semester
   - Enter amount
   - Set dates
   ↓
5. Add requirements checklist
   ↓
6. Submit
   ↓
7. System creates record
   ↓
8. Student receives notification
   ↓
9. Student can view scholarship in their dashboard
```

#### 8.1.2 Update Scholarship Status
```
1. SAS Officer views scholarship list
   ↓
2. Search/filter to find recipient
   ↓
3. Click on scholarship record
   ↓
4. Update status (Active → Suspended/Completed)
   ↓
5. Add remarks/notes
   ↓
6. Save changes
   ↓
7. System logs update
   ↓
8. Student receives notification
```

### 8.2 Insurance Submission Workflow

#### 8.2.1 Student Submits Insurance
```
1. Student logs in
   ↓
2. Navigate to Insurance → Submit Form
   ↓
3. Fill insurance details:
   - Provider
   - Policy number
   - Coverage details
   - Effective dates
   - Beneficiary info
   ↓
4. Upload policy document (PDF/image)
   ↓
5. Review and submit
   ↓
6. Receive confirmation
   ↓
7. Status: "Pending Review"
```

#### 8.2.2 SAS Officer Reviews Insurance
```
1. SAS Officer logs in
   ↓
2. View "Pending Insurance Submissions"
   ↓
3. Click on submission
   ↓
4. Review details and documents
   ↓
5. Verify information
   ↓
6. Decision:
   - Approve → Status: "Approved"
   - Reject → Add reason, Status: "Rejected"
   - Request more info
   ↓
7. Save decision
   ↓
8. Student receives notification
```

### 8.3 Organization Management Workflow

#### 8.3.1 Organization Adviser Updates Organization
```
1. Adviser logs in
   ↓
2. Navigate to My Organization
   ↓
3. Update organization details
   ↓
4. Manage officers:
   - Add new officer
   - Update positions
   - Set term dates
   ↓
5. Manage members:
   - Add new members
   - Update status
   ↓
6. Upload documents:
   - Constitution
   - Activity reports
   - Photos
   ↓
7. Save changes
   ↓
8. SAS Officer can review updates
```

### 8.4 Activity Scheduling Workflow

#### 8.4.1 Create Activity
```
1. SAS Officer/Adviser logs in
   ↓
2. Navigate to Calendar → Create Activity
   ↓
3. Fill activity details:
   - Title and description
   - Date and time
   - Location
   - Category
   - Organizer
   - Target participants
   ↓
4. Set reminders
   ↓
5. Attach documents (optional)
   ↓
6. Save activity
   ↓
7. Activity appears on calendar
   ↓
8. System schedules reminders
   ↓
9. Participants receive notifications
```

#### 8.4.2 Complete Activity
```
1. After activity is done
   ↓
2. SAS Officer/Adviser opens activity
   ↓
3. Click "Mark as Completed"
   ↓
4. Upload:
   - Accomplishment report
   - Photos
   - Attendance
   - Actual participant count
   ↓
5. Save completion data
   ↓
6. Status: "Completed"
```

### 8.5 Document Digitalization Workflow

#### 8.5.1 Upload Documents
```
1. SAS Officer logs in
   ↓
2. Navigate to Documents → Upload
   ↓
3. Select files or drag-and-drop
   ↓
4. For each document:
   - Enter title
   - Select category
   - Enter reference number
   - Set original date
   - Link to entity (student/org)
   - Enter physical location
   ↓
5. Upload (single or batch)
   ↓
6. System validates files
   ↓
7. Documents stored with metadata
   ↓
8. Available in document repository
```

#### 8.5.2 Mark for Disposal
```
1. SAS Officer/Admin logs in
   ↓
2. Navigate to Documents → Disposal Management
   ↓
3. Filter: "Physical Copy Exists"
   ↓
4. Select documents for disposal
   ↓
5. Bulk update status → "Pending Disposal Approval"
   ↓
6. Add disposal permit number (when obtained)
   ↓
7. Update status → "Approved for Disposal"
   ↓
8. After physical disposal:
   - Update status → "Disposed"
   - Enter disposal date
   ↓
9. Generate disposal report
```

---

## 9. Implementation Phases

### Phase 1: Planning and Setup (Weeks 1-2)
- [x] System documentation (current phase)
- [x] Laravel v12 + Inertia.js v2 setup
- [x] Shadcn UI integration
- [x] MySQL database configuration
- [ ] Stakeholder meetings (SAS Office)
- [ ] Finalize scholarship types and requirements
- [ ] Review existing organizational records
- [ ] Get university approval

### Phase 2: Database and Models (Weeks 3-4)
- [ ] Create database migrations
- [ ] Create Eloquent models
- [ ] Set up model relationships
- [ ] Create seeders for testing
- [ ] Database testing

### Phase 3: Backend Development (Weeks 5-9)
- [ ] Authentication and authorization
- [ ] Scholarship management API
- [ ] Insurance management API
- [ ] Organization management API
- [ ] Activity calendar API
- [ ] Document management API
- [ ] Notification system
- [ ] File upload handling
- [ ] Report generation

### Phase 4: Frontend Development (Weeks 7-12)
- [ ] Student interface
  - Dashboard
  - Scholarship view
  - Insurance submission
  - Organization view
- [ ] SAS Officer interface
  - Dashboard
  - Scholarship management
  - Insurance review
  - Organization management
  - Calendar management
  - Document management
- [ ] Organization Adviser interface
  - Organization dashboard
  - Document uploads
- [ ] Admin interface
  - User management
  - System configuration
  - Reports and analytics

### Phase 5: Integration and Testing (Weeks 13-15)
- [ ] Integration testing
- [ ] User acceptance testing (UAT)
- [ ] Performance testing
- [ ] Security testing
- [ ] Bug fixes and refinements
- [ ] Accessibility testing

### Phase 6: Training and Documentation (Week 16)
- [ ] User manuals (students, officers, advisers)
- [ ] Video tutorials
- [ ] Training sessions for SAS staff
- [ ] Training for organization advisers
- [ ] FAQ preparation

### Phase 7: Pilot Launch (Weeks 17-18)
- [ ] Deploy to production
- [ ] Pilot with selected organizations
- [ ] Migrate sample existing data
- [ ] Monitor and gather feedback
- [ ] Quick fixes

### Phase 8: Full Rollout (Week 19)
- [ ] University-wide announcement
- [ ] Data migration (scholarships, organizations)
- [ ] Full system activation
- [ ] Ongoing support

### Phase 9: Post-Launch (Ongoing)
- [ ] Daily monitoring
- [ ] Weekly status reports
- [ ] Monthly analytics review
- [ ] Feature enhancements
- [ ] Continuous improvement

---

## 10. Acceptance Criteria

### 10.1 Functional Acceptance

**Scholarship Management:**
- ✓ Can add, update, view scholarship recipients
- ✓ Can track multiple scholarship types
- ✓ Requirements checklist works correctly
- ✓ Reports generate accurately
- ✓ Notifications sent properly

**Insurance Management:**
- ✓ Students can submit insurance forms
- ✓ Officers can review and approve/reject
- ✓ Documents upload successfully
- ✓ Expiration reminders work
- ✓ Reports generate correctly

**Organization Management:**
- ✓ Can manage 23 organizations (11 minor, 12 major)
- ✓ Officer and member management works
- ✓ Documents upload and organize properly
- ✓ Activity tracking functions correctly
- ✓ Advisers can update their organizations

**Calendar of Activities:**
- ✓ Calendar displays correctly (all views)
- ✓ Can create and schedule activities
- ✓ Reminders send on time
- ✓ Can mark activities as completed
- ✓ Export to iCal works

**Document Digitalization:**
- ✓ Single and batch upload work
- ✓ Document search and filter accurate
- ✓ Disposal tracking functions properly
- ✓ Access control enforced
- ✓ Version control works

### 10.2 Quality Acceptance
- ✓ All pages load within performance requirements
- ✓ System is responsive on mobile devices
- ✓ No critical security vulnerabilities
- ✓ Code passes Laravel Pint standards
- ✓ 80%+ test coverage
- ✓ All forms have validation
- ✓ Error handling is robust

### 10.3 User Acceptance
- ✓ Interface is intuitive for students
- ✓ SAS officers can perform tasks without developer help
- ✓ Organization advisers can update records easily
- ✓ Help documentation is clear
- ✓ Training materials are comprehensive

---

## 11. Appendices

### Appendix A: User Roles and Permissions

| Feature | Student | Org Adviser | SAS Officer | SAS Admin |
|---------|---------|-------------|-------------|-----------|
| **Scholarships** |
| View own scholarship | ✓ | ✗ | ✓ | ✓ |
| View all scholarships | ✗ | ✗ | ✓ | ✓ |
| Add scholarship recipient | ✗ | ✗ | ✓ | ✓ |
| Update scholarship | ✗ | ✗ | ✓ | ✓ |
| Generate reports | ✗ | ✗ | ✓ | ✓ |
| **Insurance** |
| Submit insurance form | ✓ | ✗ | ✓ | ✓ |
| View own insurance | ✓ | ✗ | ✓ | ✓ |
| Review insurance | ✗ | ✗ | ✓ | ✓ |
| Approve/reject | ✗ | ✗ | ✓ | ✓ |
| **Organizations** |
| View organizations | ✓ | ✓ | ✓ | ✓ |
| Update organization | ✗ | ✓ (own) | ✓ | ✓ |
| Manage officers | ✗ | ✓ (own) | ✓ | ✓ |
| Manage members | ✗ | ✓ (own) | ✓ | ✓ |
| Upload documents | ✗ | ✓ (own) | ✓ | ✓ |
| **Activities** |
| View calendar | ✓ | ✓ | ✓ | ✓ |
| Create activity | ✗ | ✓ | ✓ | ✓ |
| Update activity | ✗ | ✓ (own) | ✓ | ✓ |
| Mark completed | ✗ | ✓ (own) | ✓ | ✓ |
| **Documents** |
| View public docs | ✓ | ✓ | ✓ | ✓ |
| Upload documents | ✗ | ✓ (org docs) | ✓ | ✓ |
| Manage disposal | ✗ | ✗ | ✓ | ✓ |
| Set permissions | ✗ | ✗ | ✗ | ✓ |
| **Administration** |
| User management | ✗ | ✗ | ✗ | ✓ |
| System config | ✗ | ✗ | ✗ | ✓ |
| All reports | ✗ | ✗ | ✓ | ✓ |

### Appendix B: Scholarship Types

| Scholarship Code | Scholarship Name | Type | Typical Amount |
|-----------------|------------------|------|----------------|
| TES | Tertiary Education Subsidy | Government | Varies |
| TDP | Tulong Dunong Program | Government | Varies |
| CHED-MERIT | CHED Merit Scholarship | Government | Full tuition |
| UNIV-ACAD | University Academic Scholarship | University | 50-100% tuition |
| UNIV-SPORT | University Sports Scholarship | University | Varies |
| PRIV-* | Private Scholarships | Private | Varies |

### Appendix C: Organization Categories

**Major Organizations (12):**
1. Supreme Student Council
2. College Student Councils (per college)
3. Major discipline-specific organizations

**Minor Organizations (11):**
1. Cultural organizations
2. Special interest groups
3. Departmental organizations

### Appendix D: Document Categories and Types

**Scholarship Documents:**
- Application forms
- Grade reports
- Compliance documents
- Certificates

**Insurance Documents:**
- Policy documents
- Claim forms
- Medical certificates
- Beneficiary forms

**Organization Documents:**
- Constitution and by-laws
- Activity reports
- Financial reports
- Meeting minutes
- Recognition letters
- Accomplishment reports

**Administrative Documents:**
- Permits
- Memorandums
- Correspondence
- Policies

### Appendix E: Sample Reports

**Scholarship Reports:**
- Active Scholars Summary
- Scholarship Distribution by Type
- Scholars by College/Course
- Scholarship Disbursement Report
- Renewal Status Report
- Requirements Compliance Report

**Insurance Reports:**
- Insured Students Summary
- Insurance Provider Distribution
- Expiring Policies Report
- Submission Status Report

**Organization Reports:**
- Active Organizations List
- Organization Compliance Report
- Officer Directory
- Membership Statistics
- Activity Participation Report

**Document Reports:**
- Documents Digitalized by Category
- Disposal Readiness Report
- Storage Utilization Report
- Upload Activity Log

**Activity Reports:**
- Monthly Activities Calendar
- Completed Activities Report
- Participation Statistics
- Organization Activity Summary

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | October 19, 2025 | Development Team | Initial SRS documentation |

---

**Document End**

*This SRS document should be reviewed and approved by Student Affairs Office stakeholders before development begins. Updates to requirements should be documented with version control.*
