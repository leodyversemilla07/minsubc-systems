# Software Requirements Specification (SRS)
## USG Information and Transparency Portal

**Version:** 1.0  
**Date:** October 11, 2025  
**Project:** MinSUBC Systems - USG Module

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the USG (University Student Government) Information and Transparency Portal. The system aims to promote transparency and facilitate information dissemination within the university community.

### 1.2 Scope
The USG Information and Transparency Portal is a web-based information system that provides centralized access to:
- Vision, Mission, Goals, and Objectives (VMGO)
- USG Officers and organizational structure
- Resolutions and official documents
- Announcements and news
- Calendar of events
- Transparency reports and public records

### 1.3 Intended Audience
- **Students:** View announcements, events, and USG information
- **USG Officers:** Manage content, post announcements, and publish resolutions
- **Faculty and Staff:** Access USG information and events
- **Administrators:** System configuration and user management
- **Public/Visitors:** View public information

### 1.4 Document Conventions
- **Must:** Indicates mandatory requirement
- **Should:** Indicates recommended requirement
- **May:** Indicates optional requirement

---

## 2. Overall Description

### 2.1 Product Perspective
The USG Information and Transparency Portal is a module within the MinSUBC Systems platform. It integrates with the existing authentication system and follows the modular architecture of the parent application.

### 2.2 Product Functions
The system provides the following core functions:
- **Information Display:** Public access to VMGO, officers, and organizational information
- **Content Management:** Create, update, and publish announcements and resolutions
- **Event Management:** Maintain and display calendar of events
- **Document Repository:** Store and retrieve official documents
- **Transparency Dashboard:** Display statistics and public records

### 2.3 User Classes and Characteristics

#### 2.3.1 Public Users (Visitors)
- **Access Level:** Read-only
- **Technical Expertise:** Minimal
- **Primary Activities:** View public information, announcements, events

#### 2.3.2 Authenticated Students
- **Access Level:** Read-only with enhanced features
- **Technical Expertise:** Basic
- **Primary Activities:** View all content, subscribe to notifications

#### 2.3.3 USG Officers
- **Access Level:** Create, read, update content
- **Technical Expertise:** Moderate
- **Primary Activities:** Publish announcements, manage events, upload documents

#### 2.3.4 USG Administrators
- **Access Level:** Full system access
- **Technical Expertise:** Advanced
- **Primary Activities:** Manage users, configure system, approve content

---

## 3. System Features and Requirements

### 3.1 Vision, Mission, Goals, and Objectives (VMGO)

#### 3.1.1 Description
Display the official VMGO of the USG organization.

#### 3.1.2 Functional Requirements
- **FR-VMGO-01:** System must display the current VMGO on a dedicated page
- **FR-VMGO-02:** USG Administrators must be able to update VMGO content
- **FR-VMGO-03:** System must maintain version history of VMGO changes
- **FR-VMGO-04:** VMGO must be accessible without authentication

### 3.2 Officers and Organizational Structure

#### 3.2.1 Description
Display current USG officers, their positions, and organizational hierarchy.

#### 3.2.2 Functional Requirements
- **FR-OFFICERS-01:** System must display list of current USG officers
- **FR-OFFICERS-02:** Each officer profile must include: name, position, photo, contact information
- **FR-OFFICERS-03:** System must support organizational chart visualization
- **FR-OFFICERS-04:** USG Administrators must be able to add, update, or remove officers
- **FR-OFFICERS-05:** System must support multiple terms/academic years
- **FR-OFFICERS-06:** Officer information must be publicly accessible

### 3.3 Resolutions

#### 3.3.1 Description
Manage and publish official USG resolutions and legislative documents.

#### 3.3.2 Functional Requirements
- **FR-RES-01:** System must allow creation of resolution records with: resolution number, title, date, description, file attachment
- **FR-RES-02:** USG Officers must be able to draft and submit resolutions
- **FR-RES-03:** USG Administrators must approve resolutions before publication
- **FR-RES-04:** System must support PDF document upload (max 10MB)
- **FR-RES-05:** Published resolutions must be searchable by: number, title, date, keywords
- **FR-RES-06:** System must display resolutions in chronological order
- **FR-RES-07:** Each resolution must have a unique identifier
- **FR-RES-08:** System must track resolution status: Draft, Under Review, Approved, Published

### 3.4 Announcements

#### 3.4.1 Description
Publish and manage announcements for the university community.

#### 3.4.2 Functional Requirements
- **FR-ANN-01:** System must allow creation of announcements with: title, content, category, priority, publish date, expiry date
- **FR-ANN-02:** USG Officers must be able to create and submit announcements
- **FR-ANN-03:** System must support rich text formatting for announcements
- **FR-ANN-04:** System must support image uploads (max 5MB per image)
- **FR-ANN-05:** Announcements must be categorizable: General, Event, Academic, Emergency
- **FR-ANN-06:** System must support priority levels: Normal, Important, Urgent
- **FR-ANN-07:** Urgent announcements must be highlighted on the homepage
- **FR-ANN-08:** System must display announcements in reverse chronological order
- **FR-ANN-09:** Expired announcements should be automatically archived
- **FR-ANN-10:** System must support announcement search and filtering

### 3.5 Calendar of Events

#### 3.5.1 Description
Display and manage USG events and activities.

#### 3.5.2 Functional Requirements
- **FR-EVENT-01:** System must display events in calendar view (month, week, day)
- **FR-EVENT-02:** Each event must include: title, description, date/time, location, category, organizer
- **FR-EVENT-03:** USG Officers must be able to create, update, and delete events
- **FR-EVENT-04:** System must support recurring events
- **FR-EVENT-05:** System must highlight upcoming events on the homepage
- **FR-EVENT-06:** Events must be color-coded by category
- **FR-EVENT-07:** System must allow event export to iCal/Google Calendar format
- **FR-EVENT-08:** System must send reminders for upcoming events (optional)
- **FR-EVENT-09:** Past events should be archived but remain viewable

### 3.6 Transparency Dashboard

#### 3.6.1 Description
Provide transparency through statistics and public records.

#### 3.6.2 Functional Requirements
- **FR-TRANS-01:** System must display statistics: total resolutions, active projects, upcoming events
- **FR-TRANS-02:** System must provide budget transparency section (if applicable)
- **FR-TRANS-03:** System must display recent activities timeline
- **FR-TRANS-04:** Dashboard must be accessible to public users
- **FR-TRANS-05:** System must support document repository for public records

### 3.7 Content Management

#### 3.7.1 Description
Backend interface for managing all portal content.

#### 3.7.2 Functional Requirements
- **FR-CMS-01:** System must provide admin dashboard for USG Officers and Administrators
- **FR-CMS-02:** System must implement role-based access control
- **FR-CMS-03:** System must log all content changes with user and timestamp
- **FR-CMS-04:** System must support content preview before publication
- **FR-CMS-05:** System must implement content approval workflow
- **FR-CMS-06:** System must allow bulk operations (delete, archive)

### 3.8 Search and Navigation

#### 3.8.1 Description
Enable users to find information quickly and efficiently.

#### 3.8.2 Functional Requirements
- **FR-SEARCH-01:** System must provide global search functionality
- **FR-SEARCH-02:** Search must cover: announcements, resolutions, events, officers
- **FR-SEARCH-03:** System must support filters by: date range, category, type
- **FR-SEARCH-04:** System must display search results with relevance ranking
- **FR-SEARCH-05:** System must provide breadcrumb navigation
- **FR-SEARCH-06:** System must include intuitive main navigation menu

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **NFR-PERF-01:** Homepage must load within 3 seconds on standard broadband
- **NFR-PERF-02:** Search results must appear within 2 seconds
- **NFR-PERF-03:** System must support at least 500 concurrent users
- **NFR-PERF-04:** File uploads must complete within 30 seconds for maximum file size

### 4.2 Security Requirements
- **NFR-SEC-01:** System must use HTTPS for all communications
- **NFR-SEC-02:** System must implement role-based access control (RBAC)
- **NFR-SEC-03:** Passwords must be hashed using industry-standard algorithms
- **NFR-SEC-04:** System must prevent SQL injection and XSS attacks
- **NFR-SEC-05:** File uploads must be validated and scanned
- **NFR-SEC-06:** System must log security-relevant events
- **NFR-SEC-07:** Session timeout must be set to 30 minutes of inactivity

### 4.3 Usability Requirements
- **NFR-USE-01:** Interface must be intuitive and require minimal training
- **NFR-USE-02:** System must be accessible on desktop, tablet, and mobile devices
- **NFR-USE-03:** System must follow WCAG 2.1 Level AA accessibility standards
- **NFR-USE-04:** Error messages must be clear and actionable
- **NFR-USE-05:** System must provide help documentation

### 4.4 Reliability Requirements
- **NFR-REL-01:** System must have 99.5% uptime during business hours
- **NFR-REL-02:** System must perform daily automated backups
- **NFR-REL-03:** Data must be recoverable within 4 hours of failure
- **NFR-REL-04:** System must gracefully handle errors without data loss

### 4.5 Maintainability Requirements
- **NFR-MAINT-01:** Code must follow Laravel best practices and PSR standards
- **NFR-MAINT-02:** System must include inline documentation
- **NFR-MAINT-03:** Database schema must be version-controlled via migrations
- **NFR-MAINT-04:** System must support easy content updates without developer intervention

### 4.6 Compatibility Requirements
- **NFR-COMP-01:** System must support modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **NFR-COMP-02:** System must be responsive and mobile-friendly
- **NFR-COMP-03:** System must integrate with existing MinSUBC authentication system

---

## 5. Data Requirements

### 5.1 Database Entities

#### 5.1.1 VMGO
- `id` (Primary Key)
- `vision` (Text)
- `mission` (Text)
- `goals` (Text)
- `objectives` (Text)
- `effective_date` (Date)
- `updated_by` (Foreign Key: Users)
- `created_at`, `updated_at` (Timestamps)

#### 5.1.2 Officers
- `id` (Primary Key)
- `user_id` (Foreign Key: Users, nullable)
- `name` (String)
- `position` (String)
- `department` (String, nullable)
- `email` (String)
- `phone` (String, nullable)
- `photo` (String, nullable)
- `bio` (Text, nullable)
- `term_start` (Date)
- `term_end` (Date, nullable)
- `order` (Integer)
- `is_active` (Boolean)
- `created_at`, `updated_at` (Timestamps)

#### 5.1.3 Resolutions
- `id` (Primary Key)
- `resolution_number` (String, Unique)
- `title` (String)
- `description` (Text)
- `content` (Text, nullable)
- `category` (String, nullable)
- `file_path` (String, nullable)
- `status` (Enum: draft, under_review, approved, published)
- `resolution_date` (Date)
- `submitted_by` (Foreign Key: Users)
- `approved_by` (Foreign Key: Users, nullable)
- `approved_at` (Timestamp, nullable)
- `published_at` (Timestamp, nullable)
- `created_at`, `updated_at` (Timestamps)

#### 5.1.4 Announcements
- `id` (Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `content` (Text)
- `excerpt` (String, nullable)
- `category` (Enum: general, event, academic, emergency)
- `priority` (Enum: normal, important, urgent)
- `featured_image` (String, nullable)
- `status` (Enum: draft, published, archived)
- `publish_date` (Timestamp)
- `expiry_date` (Timestamp, nullable)
- `author_id` (Foreign Key: Users)
- `views_count` (Integer, default: 0)
- `created_at`, `updated_at` (Timestamps)

#### 5.1.5 Events
- `id` (Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `description` (Text)
- `location` (String)
- `start_date` (Timestamp)
- `end_date` (Timestamp)
- `all_day` (Boolean, default: false)
- `category` (String)
- `color` (String, nullable)
- `organizer` (String)
- `is_recurring` (Boolean, default: false)
- `recurrence_rule` (String, nullable)
- `status` (Enum: scheduled, ongoing, completed, cancelled)
- `created_by` (Foreign Key: Users)
- `created_at`, `updated_at` (Timestamps)

#### 5.1.6 Documents
- `id` (Primary Key)
- `title` (String)
- `description` (Text, nullable)
- `file_path` (String)
- `file_name` (String)
- `file_size` (Integer)
- `mime_type` (String)
- `category` (String)
- `is_public` (Boolean, default: true)
- `uploaded_by` (Foreign Key: Users)
- `download_count` (Integer, default: 0)
- `created_at`, `updated_at` (Timestamps)

### 5.2 File Storage Requirements
- **Images:** JPEG, PNG, WebP (max 5MB)
- **Documents:** PDF, DOCX (max 10MB)
- **Storage Location:** Laravel storage/app/public/usg/
- **Naming Convention:** `{type}/{year}/{month}/{timestamp}_{original_name}`

---

## 6. User Interface Requirements

### 6.1 Public Pages
1. **Homepage**
   - Featured/urgent announcements
   - Upcoming events (next 5)
   - Quick links to VMGO, Officers, Resolutions
   - Transparency statistics

2. **VMGO Page**
   - Vision statement
   - Mission statement
   - Goals list
   - Objectives list

3. **Officers Page**
   - Organization chart
   - Officer cards with photos and contact info
   - Filter by department/position

4. **Resolutions Page**
   - List view with search and filter
   - Detail view with download option

5. **Announcements Page**
   - Grid/list view
   - Filter by category
   - Detail view

6. **Events Calendar**
   - Calendar view (month/week/day)
   - List view of upcoming events
   - Event detail page

### 6.2 Admin Interface
1. **Dashboard**
   - Content statistics
   - Recent activities
   - Quick actions

2. **Content Management**
   - Create/Edit forms for all content types
   - Rich text editor
   - File upload interface
   - Preview functionality

3. **User Management**
   - List officers
   - Assign roles
   - Manage permissions

---

## 7. System Architecture

### 7.1 Technology Stack
- **Backend:** Laravel 11.x (PHP 8.2+)
- **Frontend:** React with Inertia.js
- **UI Framework:** Tailwind CSS with shadcn/ui components
- **Database:** MySQL/SQLite
- **Authentication:** Laravel Fortify

### 7.2 Module Structure
```
app/Modules/USG/
├── Http/
│   ├── Controllers/
│   │   ├── VMGOController.php
│   │   ├── OfficerController.php
│   │   ├── ResolutionController.php
│   │   ├── AnnouncementController.php
│   │   ├── EventController.php
│   │   └── DashboardController.php
│   ├── Middleware/
│   │   └── CheckUSGRole.php
│   └── Requests/
│       ├── StoreAnnouncementRequest.php
│       ├── UpdateAnnouncementRequest.php
│       ├── StoreResolutionRequest.php
│       └── StoreEventRequest.php
├── Models/
│   ├── VMGO.php
│   ├── Officer.php
│   ├── Resolution.php
│   ├── Announcement.php
│   ├── Event.php
│   └── Document.php
├── Services/
│   ├── VMGOService.php
│   ├── OfficerService.php
│   ├── ResolutionService.php
│   ├── AnnouncementService.php
│   └── EventService.php
└── routes.php
```

---

## 8. Implementation Phases

### Phase 1: Core Setup (Week 1)
- Database migrations
- Model creation
- Basic routing

### Phase 2: Public Pages (Week 2-3)
- VMGO display
- Officers listing
- Announcements listing
- Events calendar

### Phase 3: Admin Interface (Week 4-5)
- Admin dashboard
- Content management forms
- File upload handling

### Phase 4: Advanced Features (Week 6)
- Search functionality
- Approval workflow
- Notifications

### Phase 5: Testing & Deployment (Week 7-8)
- Unit testing
- Integration testing
- User acceptance testing
- Production deployment

---

## 9. Acceptance Criteria

### 9.1 Functional Acceptance
- ✓ All functional requirements implemented
- ✓ Public users can view all information
- ✓ USG Officers can create and manage content
- ✓ Administrators can approve and configure system
- ✓ Search returns accurate results
- ✓ File uploads work correctly

### 9.2 Quality Acceptance
- ✓ All pages load within performance requirements
- ✓ System is responsive on mobile devices
- ✓ No critical security vulnerabilities
- ✓ Code passes linting standards
- ✓ 80% code coverage in tests

### 9.3 User Acceptance
- ✓ Interface is intuitive for non-technical users
- ✓ Content can be updated without developer assistance
- ✓ Help documentation is clear and complete

---

## 10. Assumptions and Constraints

### 10.1 Assumptions
- Users have access to modern web browsers
- University has reliable internet connectivity
- Content will be primarily in English
- USG Officers have basic computer literacy

### 10.2 Constraints
- Must integrate with existing MinSUBC authentication
- Must follow university branding guidelines
- Must comply with data privacy regulations
- Development timeline: 8 weeks
- Budget: Limited to existing infrastructure

---

## 11. Glossary

- **VMGO:** Vision, Mission, Goals, and Objectives
- **USG:** University Student Government
- **SRS:** Software Requirements Specification
- **RBAC:** Role-Based Access Control
- **WCAG:** Web Content Accessibility Guidelines

---

## 12. Appendices

### Appendix A: User Roles and Permissions

| Feature | Public | Student | USG Officer | USG Admin |
|---------|--------|---------|-------------|-----------|
| View VMGO | ✓ | ✓ | ✓ | ✓ |
| View Officers | ✓ | ✓ | ✓ | ✓ |
| View Announcements | ✓ | ✓ | ✓ | ✓ |
| View Events | ✓ | ✓ | ✓ | ✓ |
| View Resolutions | ✓ | ✓ | ✓ | ✓ |
| Create Announcements | ✗ | ✗ | ✓ | ✓ |
| Create Events | ✗ | ✗ | ✓ | ✓ |
| Create Resolutions | ✗ | ✗ | ✓ | ✓ |
| Approve Content | ✗ | ✗ | ✗ | ✓ |
| Manage Officers | ✗ | ✗ | ✗ | ✓ |
| Update VMGO | ✗ | ✗ | ✗ | ✓ |
| System Configuration | ✗ | ✗ | ✗ | ✓ |

### Appendix B: Sample Workflows

#### B.1 Publishing an Announcement
1. USG Officer logs in
2. Navigates to Announcements → Create New
3. Fills in title, content, category, priority
4. Optionally uploads image
5. Sets publish date
6. Submits for review (if approval required)
7. USG Admin reviews and approves
8. Announcement becomes visible to public

#### B.2 Adding a Resolution
1. USG Officer logs in
2. Navigates to Resolutions → Add New
3. Enters resolution number, title, description
4. Uploads PDF document
5. Sets resolution date
6. Submits for approval
7. USG Admin reviews and publishes
8. Resolution appears in public list

---

**Document End**

*This SRS document should be reviewed and approved by stakeholders before development begins. Updates to requirements should be documented with version control.*
