# Task Delegation: Student Affairs and Services (SAS)
**Module:** Student Affairs and Services (SAS)  
**Developer:** John Paul Leido  
**Start Date:** October 28, 2025  
**Target Completion:** 12 weeks (January 20, 2026)

---

## Overview
The Student Affairs and Services (SAS) is a comprehensive full-stack system for managing all student affairs operations at MinSUBC. You will build the complete system from database migrations through backend services to frontend interfaces, including:
- ✅ **Scholarship Management** - Track TES, TDP, and various scholarship programs
- ✅ **Insurance Management** - Digitalize student insurance forms and records
- ✅ **Organizational Records** - Manage 11 minor and 12 major student organizations
- ✅ **Calendar of Activities** - Schedule and track student affairs events
- ✅ **Document Digitalization** - Convert physical records to digital format

## Reference Documentation
- **Requirements:** `SAS_SRS.md` (Complete Software Requirements Specification)
- **Architecture:** `MODULAR_ARCHITECTURE.md`
- **Directory Structure:** `DIRECTORY_STRUCTURE.md`
- **Project Guidelines:** `.github/copilot-instructions.md`

---

## Technology Stack (Already Configured)
- **Backend:** Laravel 12 with PHP 8.3
- **Frontend:** React 19 with Inertia.js v2
- **UI:** Tailwind CSS v4 with shadcn/ui components
- **Testing:** Pest v4
- **Database:** MySQL

---

# 🎯 Full-Stack Development Plan
**Developer:** John Paul Leido  
**Complete System:** All SAS Features  
**Timeline:** 12 weeks

---

## System Components

You will build the complete Student Affairs and Services covering:

### Part A: Scholarship Management
- ✅ Track multiple scholarship types (TES, TDP, CHED Merit, Private, University)
- ✅ Manage scholarship recipients and requirements
- ✅ Monitor compliance and renewal status
- ✅ Generate comprehensive reports

### Part B: Insurance Management
- ✅ Digital insurance form submission
- ✅ Policy document management
- ✅ Approval workflow
- ✅ Expiration tracking and reminders

### Part C: Organizational Records
- ✅ Manage 23 organizations (11 minor, 12 major)
- ✅ Track officers, members, and activities
- ✅ Store organizational documents
- ✅ Monitor compliance

### Part D: Calendar of Activities
- ✅ Visual calendar interface
- ✅ Event scheduling and management
- ✅ Automated reminders
- ✅ Activity completion tracking

### Part E: Document Digitalization
- ✅ Centralized document repository
- ✅ Batch upload capabilities
- ✅ Version control
- ✅ Disposal tracking for physical documents

---

## Week 1-2: Database & Backend Foundation - Scholarships & Insurance

### Phase 1.1: Create Scholarship Migrations
Create migrations in `database/migrations/`:

- [ ] `create_scholarships_table.php`
  - Fields: id, scholarship_code (unique), scholarship_name, scholarship_type (enum: TES/TDP/CHED Merit/Private/University/Other), description, provider, is_active, timestamps

- [ ] `create_scholarship_recipients_table.php`
  - Fields: id, student_id (FK to users), scholarship_id (FK), academic_year, semester (enum: 1st/2nd/Summer), amount, status (enum: Active/Suspended/Completed/Cancelled), date_awarded, expiration_date, renewal_status (enum: Not Applicable/Pending/Approved/Denied), remarks, requirements_complete (boolean), created_by, updated_by, timestamps

- [ ] `create_scholarship_requirements_table.php`
  - Fields: id, recipient_id (FK, cascade delete), requirement_name, is_submitted (boolean), submission_date, file_path, deadline, remarks, timestamps

**Commands:**
```powershell
php artisan make:migration create_scholarships_table --no-interaction
php artisan make:migration create_scholarship_recipients_table --no-interaction
php artisan make:migration create_scholarship_requirements_table --no-interaction
```

### Phase 1.2: Create Insurance Migrations
- [ ] `create_insurance_records_table.php`
  - Fields: id, student_id (FK), insurance_provider, policy_number, policy_type, coverage_amount, effective_date, expiration_date, status (enum: Pending Review/Approved/Rejected/Expired/Renewed), beneficiary_name, beneficiary_relationship, policy_document_path, submission_date, reviewed_by, reviewed_at, review_notes, timestamps

- [ ] `create_insurance_documents_table.php`
  - Fields: id, insurance_id (FK, cascade delete), document_name, file_path, file_size, uploaded_at

**Commands:**
```powershell
php artisan make:migration create_insurance_records_table --no-interaction
php artisan make:migration create_insurance_documents_table --no-interaction
php artisan migrate
```

### Phase 1.3: Create Scholarship Models
Create models in `app/Modules/SAS/Models/`:

- [ ] `Scholarship.php`
  - Casts: scholarship_type to enum, is_active to boolean
  - Relationships: hasMany(ScholarshipRecipient)
  - Scopes: active()

- [ ] `ScholarshipRecipient.php`
  - Casts: date_awarded, expiration_date to datetime; status, semester, renewal_status to enums; requirements_complete to boolean
  - Relationships: belongsTo(User, 'student_id'), belongsTo(Scholarship), hasMany(ScholarshipRequirement), belongsTo(User, 'created_by'), belongsTo(User, 'updated_by')
  - Scopes: active(), byScholarshipType($type), byStatus($status), requirementsIncomplete()

- [ ] `ScholarshipRequirement.php`
  - Casts: is_submitted to boolean, submission_date, deadline to datetime
  - Relationships: belongsTo(ScholarshipRecipient, 'recipient_id')
  - Scopes: pending(), overdue()

**Commands:**
```powershell
php artisan make:model Modules/SAS/Models/Scholarship --no-interaction
php artisan make:model Modules/SAS/Models/ScholarshipRecipient --no-interaction
php artisan make:model Modules/SAS/Models/ScholarshipRequirement --no-interaction
```

### Phase 1.4: Create Insurance Models
- [ ] `InsuranceRecord.php`
  - Casts: effective_date, expiration_date, submission_date, reviewed_at to datetime; status to enum; coverage_amount to decimal
  - Relationships: belongsTo(User, 'student_id'), hasMany(InsuranceDocument), belongsTo(User, 'reviewed_by')
  - Scopes: pending(), approved(), expiringSoon($days = 30), byStatus($status)
  - Methods: isExpired(), daysUntilExpiration()

- [ ] `InsuranceDocument.php`
  - Casts: uploaded_at to datetime
  - Relationships: belongsTo(InsuranceRecord, 'insurance_id')

**Commands:**
```powershell
php artisan make:model Modules/SAS/Models/InsuranceRecord --no-interaction
php artisan make:model Modules/SAS/Models/InsuranceDocument --no-interaction
```

### Phase 1.5: Create Factories & Seeders
- [ ] Create `ScholarshipFactory.php` - Generate 5-6 scholarship programs (TES, TDP, CHED Merit, Private, University)
- [ ] Create `ScholarshipRecipientFactory.php` - Generate 50-100 recipients across different scholarships
- [ ] Create `ScholarshipRequirementFactory.php` - Generate requirements for recipients
- [ ] Create `InsuranceRecordFactory.php` - Generate 30-50 insurance records with different statuses
- [ ] Create `SASModuleSeeder.php` - Seed all models in proper order

**Commands:**
```powershell
php artisan make:factory Modules/SAS/ScholarshipFactory --model=Modules/SAS/Models/Scholarship --no-interaction
php artisan make:factory Modules/SAS/ScholarshipRecipientFactory --model=Modules/SAS/Models/ScholarshipRecipient --no-interaction
php artisan make:factory Modules/SAS/ScholarshipRequirementFactory --model=Modules/SAS/Models/ScholarshipRequirement --no-interaction
php artisan make:factory Modules/SAS/InsuranceRecordFactory --model=Modules/SAS/Models/InsuranceRecord --no-interaction
php artisan db:seed --class=SASModuleSeeder
```

---

## Week 3-4: Database & Backend Foundation - Organizations, Activities & Documents

### Phase 1.6: Create Organization Migrations
- [ ] `create_organizations_table.php`
  - Fields: id, organization_code (unique), organization_name, organization_type (enum: Major/Minor), category, mission, vision, establishment_date, logo_path, status (enum: Active/Inactive), adviser_id (FK to users), contact_email, contact_phone, timestamps

- [ ] `create_organization_officers_table.php`
  - Fields: id, organization_id (FK, cascade delete), student_id (FK to users), position, term_start, term_end, responsibilities, photo_path, contact_email, contact_phone, is_current (boolean), timestamps

- [ ] `create_organization_members_table.php`
  - Fields: id, organization_id (FK, cascade delete), student_id (FK to users), membership_date, status (enum: Active/Alumni/Inactive), membership_end_date, timestamps
  - Unique constraint: (organization_id, student_id)

- [ ] `create_organization_activities_table.php`
  - Fields: id, organization_id (FK, cascade delete), activity_name, description, activity_date, venue, participants_count, budget, expenses, accomplishment_report, created_by, timestamps

- [ ] `create_organization_documents_table.php`
  - Fields: id, organization_id (FK, cascade delete), document_type, document_name, file_path, file_size, academic_year, uploaded_by, uploaded_at

**Commands:**
```powershell
php artisan make:migration create_organizations_table --no-interaction
php artisan make:migration create_organization_officers_table --no-interaction
php artisan make:migration create_organization_members_table --no-interaction
php artisan make:migration create_organization_activities_table --no-interaction
php artisan make:migration create_organization_documents_table --no-interaction
```

### Phase 1.7: Create Calendar Migrations
- [ ] `create_sas_activities_table.php`
  - Fields: id, activity_title, slug (unique), description, start_date, end_date, all_day (boolean), location, category, organizer, organization_id (FK, nullable, set null), color, is_recurring (boolean), recurrence_rule, status (enum: Scheduled/Ongoing/Completed/Cancelled), target_participants, actual_participants, completion_report, created_by, timestamps

- [ ] `create_activity_documents_table.php`
  - Fields: id, activity_id (FK, cascade delete), document_name, file_path, file_size, uploaded_by, uploaded_at

- [ ] `create_activity_reminders_table.php`
  - Fields: id, activity_id (FK, cascade delete), reminder_date, reminder_type (enum: Email/SMS/Both), sent (boolean), sent_at, created_at

**Commands:**
```powershell
php artisan make:migration create_sas_activities_table --no-interaction
php artisan make:migration create_activity_documents_table --no-interaction
php artisan make:migration create_activity_reminders_table --no-interaction
```

### Phase 1.8: Create Document Digitalization Migrations
- [ ] `create_digitalized_documents_table.php`
  - Fields: id, document_title, document_category (enum: Scholarship/Insurance/Organization/Activity/Administrative/Other), document_type, reference_number, original_date, digitalized_date, file_path, file_name, file_size, mime_type, academic_year, related_entity_type, related_entity_id, physical_location, disposal_status (enum: Physical Copy Exists/Pending Disposal Approval/Approved for Disposal/Disposed), disposal_permit_number, disposal_date, is_public (boolean), uploaded_by, timestamps

- [ ] `create_document_versions_table.php`
  - Fields: id, document_id (FK, cascade delete), version_number, file_path, file_size, change_description, uploaded_by, uploaded_at

- [ ] `create_document_permissions_table.php`
  - Fields: id, document_id (FK, cascade delete), user_id (FK, nullable, cascade delete), role (nullable), permission_type (enum: View/Download/Edit/Delete), created_at
  - Check constraint: user_id IS NOT NULL OR role IS NOT NULL

- [ ] `create_sas_notifications_table.php`
  - Fields: id, user_id (FK, nullable), student_id (FK to users, nullable), notification_type, title, message, action_url, is_read (boolean), read_at, sent_via (enum: System/Email/SMS/All), created_at

**Commands:**
```powershell
php artisan make:migration create_digitalized_documents_table --no-interaction
php artisan make:migration create_document_versions_table --no-interaction
php artisan make:migration create_document_permissions_table --no-interaction
php artisan make:migration create_sas_notifications_table --no-interaction
php artisan migrate
```

### Phase 1.9: Create Organization Models
- [ ] `Organization.php`
  - Casts: establishment_date to datetime; organization_type, status to enums
  - Relationships: belongsTo(User, 'adviser_id'), hasMany(OrganizationOfficer), hasMany(OrganizationMember), hasMany(OrganizationActivity), hasMany(OrganizationDocument)
  - Scopes: active(), byType($type), major(), minor()
  - Accessor: getLogoUrlAttribute()

- [ ] `OrganizationOfficer.php`
  - Casts: term_start, term_end to datetime; is_current to boolean
  - Relationships: belongsTo(Organization), belongsTo(User, 'student_id')
  - Scopes: current(), byOrganization($orgId)

- [ ] `OrganizationMember.php`
  - Casts: membership_date, membership_end_date to datetime; status to enum
  - Relationships: belongsTo(Organization), belongsTo(User, 'student_id')
  - Scopes: active(), byOrganization($orgId)

- [ ] `OrganizationActivity.php`
  - Casts: activity_date to datetime; budget, expenses to decimal
  - Relationships: belongsTo(Organization), belongsTo(User, 'created_by')

- [ ] `OrganizationDocument.php`
  - Casts: uploaded_at to datetime
  - Relationships: belongsTo(Organization), belongsTo(User, 'uploaded_by')

**Commands:**
```powershell
php artisan make:model Modules/SAS/Models/Organization --no-interaction
php artisan make:model Modules/SAS/Models/OrganizationOfficer --no-interaction
php artisan make:model Modules/SAS/Models/OrganizationMember --no-interaction
php artisan make:model Modules/SAS/Models/OrganizationActivity --no-interaction
php artisan make:model Modules/SAS/Models/OrganizationDocument --no-interaction
```

### Phase 1.10: Create Calendar & Document Models
- [ ] `SASActivity.php`
  - Casts: start_date, end_date to datetime; all_day, is_recurring to boolean; status to enum
  - Relationships: belongsTo(Organization, 'organization_id'), belongsTo(User, 'created_by'), hasMany(ActivityDocument), hasMany(ActivityReminder)
  - Scopes: scheduled(), upcoming(), completed(), byDateRange($start, $end), byCategory($category)
  - Slug generation on save
  - Methods: isToday(), isUpcoming()

- [ ] `ActivityDocument.php`
  - Casts: uploaded_at to datetime
  - Relationships: belongsTo(SASActivity, 'activity_id'), belongsTo(User, 'uploaded_by')

- [ ] `ActivityReminder.php`
  - Casts: reminder_date, sent_at to datetime; sent to boolean; reminder_type to enum
  - Relationships: belongsTo(SASActivity, 'activity_id')
  - Scopes: pending(), sent()

- [ ] `DigitalizedDocument.php`
  - Casts: original_date, digitalized_date, disposal_date to datetime; document_category, disposal_status to enums; is_public to boolean
  - Relationships: belongsTo(User, 'uploaded_by'), hasMany(DocumentVersion), hasMany(DocumentPermission)
  - Scopes: byCategory($category), pendingDisposal(), public()
  - Methods: getFileUrlAttribute(), canBeDisposed()

- [ ] `DocumentVersion.php`
  - Casts: uploaded_at to datetime
  - Relationships: belongsTo(DigitalizedDocument, 'document_id'), belongsTo(User, 'uploaded_by')

- [ ] `DocumentPermission.php`
  - Casts: permission_type to enum
  - Relationships: belongsTo(DigitalizedDocument, 'document_id'), belongsTo(User, 'user_id')

- [ ] `SASNotification.php`
  - Casts: is_read to boolean; read_at, created_at to datetime; sent_via to enum
  - Relationships: belongsTo(User, 'user_id'), belongsTo(User, 'student_id')
  - Scopes: unread(), byUser($userId)

**Commands:**
```powershell
php artisan make:model Modules/SAS/Models/SASActivity --no-interaction
php artisan make:model Modules/SAS/Models/ActivityDocument --no-interaction
php artisan make:model Modules/SAS/Models/ActivityReminder --no-interaction
php artisan make:model Modules/SAS/Models/DigitalizedDocument --no-interaction
php artisan make:model Modules/SAS/Models/DocumentVersion --no-interaction
php artisan make:model Modules/SAS/Models/DocumentPermission --no-interaction
php artisan make:model Modules/SAS/Models/SASNotification --no-interaction
```

### Phase 1.11: Create Additional Factories
- [ ] Create `OrganizationFactory.php` - Generate 23 organizations (11 minor, 12 major)
- [ ] Create `OrganizationOfficerFactory.php` - Generate officers for each organization
- [ ] Create `OrganizationMemberFactory.php` - Generate members
- [ ] Create `SASActivityFactory.php` - Generate 40-60 activities (past and future)
- [ ] Create `DigitalizedDocumentFactory.php` - Generate 50-100 documents
- [ ] Update `SASModuleSeeder.php` - Include all new models

**Commands:**
```powershell
php artisan make:factory Modules/SAS/OrganizationFactory --model=Modules/SAS/Models/Organization --no-interaction
php artisan make:factory Modules/SAS/OrganizationOfficerFactory --model=Modules/SAS/Models/OrganizationOfficer --no-interaction
php artisan make:factory Modules/SAS/SASActivityFactory --model=Modules/SAS/Models/SASActivity --no-interaction
php artisan make:factory Modules/SAS/DigitalizedDocumentFactory --model=Modules/SAS/Models/DigitalizedDocument --no-interaction
php artisan db:seed --class=SASModuleSeeder
```

---

## Week 5-6: Backend Services & Form Requests

### Phase 1.12: Create Scholarship Form Requests
Create Form Requests in `app/Modules/SAS/Http/Requests/`:

- [ ] `StoreScholarshipRequest.php`
  - Validate: scholarship_name (required, max:255), scholarship_type (required, enum), description, provider, scholarship_code (unique)

- [ ] `UpdateScholarshipRequest.php`
  - Same as store + is_active validation

- [ ] `StoreScholarshipRecipientRequest.php`
  - Validate: student_id (required, exists:users), scholarship_id (required, exists:scholarships), academic_year (required), semester (required, enum), amount (numeric), date_awarded (date), expiration_date (date, after:date_awarded), status (enum)

- [ ] `UpdateScholarshipRecipientRequest.php`
  - Same as store + renewal_status, requirements_complete

**Commands:**
```powershell
php artisan make:request Modules/SAS/Http/Requests/StoreScholarshipRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateScholarshipRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/StoreScholarshipRecipientRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateScholarshipRecipientRequest --no-interaction
```

### Phase 1.13: Create Insurance Form Requests
- [ ] `StoreInsuranceRequest.php`
  - Validate: student_id (required, exists:users), insurance_provider (required), policy_number (required), effective_date (required, date), expiration_date (required, date, after:effective_date), policy_type, coverage_amount (numeric), beneficiary_name, policy_document (file, mimes:pdf,jpg,png, max:10240)

- [ ] `UpdateInsuranceRequest.php`
  - Same as store + status, review_notes

**Commands:**
```powershell
php artisan make:request Modules/SAS/Http/Requests/StoreInsuranceRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateInsuranceRequest --no-interaction
```

### Phase 1.14: Create Organization Form Requests
- [ ] `StoreOrganizationRequest.php`
  - Validate: organization_name (required, max:255), organization_code (required, unique), organization_type (required, enum: Major/Minor), category, mission, vision, establishment_date (date), logo (image, max:5120), adviser_id (exists:users), contact_email (email), contact_phone

- [ ] `UpdateOrganizationRequest.php`
  - Same as store + status

- [ ] `StoreOrganizationOfficerRequest.php`
  - Validate: organization_id (required, exists:organizations), student_id (required, exists:users), position (required), term_start (required, date), term_end (date, after:term_start), contact_email (email), photo (image, max:5120)

- [ ] `UpdateOrganizationOfficerRequest.php`
  - Same as store + is_current

**Commands:**
```powershell
php artisan make:request Modules/SAS/Http/Requests/StoreOrganizationRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateOrganizationRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/StoreOrganizationOfficerRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateOrganizationOfficerRequest --no-interaction
```

### Phase 1.15: Create Activity & Document Form Requests
- [ ] `StoreSASActivityRequest.php`
  - Validate: activity_title (required, max:255), description, start_date (required, date), end_date (required, date, after_or_equal:start_date), location, category, organizer, organization_id (exists:organizations), all_day (boolean), color, is_recurring (boolean), recurrence_rule

- [ ] `UpdateSASActivityRequest.php`
  - Same as store + status, actual_participants, completion_report

- [ ] `UploadDigitalizedDocumentRequest.php`
  - Validate: document_title (required), document_category (required, enum), file (required, file, max:10240), document_type, reference_number, original_date (date), academic_year, is_public (boolean)

- [ ] `UpdateDigitalizedDocumentRequest.php`
  - Same as upload (without file requirement) + disposal_status, disposal_date

**Commands:**
```powershell
php artisan make:request Modules/SAS/Http/Requests/StoreSASActivityRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateSASActivityRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UploadDigitalizedDocumentRequest --no-interaction
php artisan make:request Modules/SAS/Http/Requests/UpdateDigitalizedDocumentRequest --no-interaction
```

### Phase 1.16: Create Service Classes
Create services in `app/Modules/SAS/Services/`:

**Scholarship Services:**
- [ ] `ScholarshipService.php`
  - Methods: createScholarship(), updateScholarship(), createRecipient(), updateRecipient(), addRequirement(), trackRequirementSubmission(), checkExpiring($days), generateScholarshipReport()

**Insurance Services:**
- [ ] `InsuranceService.php`
  - Methods: submitInsurance(), reviewInsurance(), approve(), reject(), checkExpiringPolicies($days), sendExpirationReminders(), generateInsuranceReport()

**Organization Services:**
- [ ] `OrganizationService.php`
  - Methods: createOrganization(), updateOrganization(), addOfficer(), updateOfficer(), addMember(), removeMember(), uploadDocument(), trackCompliance(), generateOrganizationReport()

**Activity Services:**
- [ ] `ActivityService.php`
  - Methods: createActivity(), updateActivity(), cancelActivity(), markCompleted(), getCalendarData($month, $year), getUpcomingActivities(), scheduleReminders(), sendReminders()

**Document Services:**
- [ ] `DocumentService.php`
  - Methods: uploadDocument($file, $metadata), uploadBatch($files), trackDisposal(), updateDisposalStatus(), searchDocuments($criteria), manageVersions(), setPermissions(), generateDocumentReport()

**Notification Services:**
- [ ] `NotificationService.php`
  - Methods: createNotification(), sendScholarshipNotification(), sendInsuranceNotification(), sendActivityReminder(), markAsRead(), getUnreadNotifications($userId)

**File Upload Service:**
- [ ] `FileUploadService.php`
  - Methods: uploadFile($file, $directory), validateFile($file, $rules), deleteFile($path), getFileUrl($path), generateFileName($originalName)
  - Handle: PDFs, Images, Documents

**Dashboard Service:**
- [ ] `DashboardService.php`
  - Methods: getStatistics(), getScholarshipStats(), getInsuranceStats(), getOrganizationStats(), getActivityStats(), getDocumentStats(), getRecentActivity(), getPendingTasks()

---

## Week 7-8: Backend Controllers & Routes

### Phase 1.17: Create Scholarship Controllers
Create controllers in `app/Modules/SAS/Http/Controllers/`:

**Student Controllers:**
- [ ] `Student/ScholarshipController.php`
  - index() - View my scholarships
  - show($id) - View scholarship details
  - requirements($id) - View requirements checklist
  - uploadRequirement($id) - Upload required documents

**Admin Controllers:**
- [ ] `Admin/ScholarshipController.php`
  - index() - List all scholarships and recipients
  - create() - Show create scholarship form
  - store() - Create new scholarship
  - edit($id) - Show edit form
  - update($id) - Update scholarship
  - destroy($id) - Delete scholarship

- [ ] `Admin/ScholarshipRecipientController.php`
  - index() - List all recipients
  - create() - Show add recipient form
  - store() - Add new recipient
  - edit($id) - Show edit form
  - update($id) - Update recipient
  - destroy($id) - Remove recipient
  - updateStatus($id) - Update scholarship status
  - manageRequirements($id) - Manage requirements

**Commands:**
```powershell
php artisan make:controller Modules/SAS/Http/Controllers/Student/ScholarshipController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/ScholarshipController --resource --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/ScholarshipRecipientController --resource --no-interaction
```

### Phase 1.18: Create Insurance Controllers
- [ ] `Student/InsuranceController.php`
  - index() - View my insurance records
  - create() - Show submission form
  - store() - Submit insurance form
  - show($id) - View insurance details

- [ ] `Admin/InsuranceController.php`
  - index() - List all insurance submissions
  - show($id) - View submission details
  - review($id) - Show review form
  - approve($id) - Approve submission
  - reject($id) - Reject submission
  - destroy($id) - Delete record

**Commands:**
```powershell
php artisan make:controller Modules/SAS/Http/Controllers/Student/InsuranceController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/InsuranceController --no-interaction
```

### Phase 1.19: Create Organization Controllers
- [ ] `Public/OrganizationController.php`
  - index() - List all active organizations
  - show($code) - View organization profile

- [ ] `Adviser/OrganizationController.php`
  - dashboard() - My organization dashboard
  - edit() - Edit organization info
  - update() - Update organization
  - manageOfficers() - Manage officers
  - manageMembers() - Manage members
  - uploadDocument() - Upload documents

- [ ] `Admin/OrganizationController.php`
  - index() - List all organizations
  - create() - Show create form
  - store() - Create organization
  - edit($id) - Show edit form
  - update($id) - Update organization
  - destroy($id) - Delete organization
  - compliance() - View compliance status

**Commands:**
```powershell
php artisan make:controller Modules/SAS/Http/Controllers/Public/OrganizationController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Adviser/OrganizationController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/OrganizationController --resource --no-interaction
```

### Phase 1.20: Create Activity & Document Controllers
- [ ] `Public/ActivityController.php`
  - index() - List view of activities
  - calendar() - Calendar view
  - show($slug) - View activity details

- [ ] `Admin/ActivityController.php`
  - index() - List all activities
  - create() - Show create form
  - store() - Create activity
  - edit($id) - Show edit form
  - update($id) - Update activity
  - destroy($id) - Delete activity
  - markCompleted($id) - Mark as completed
  - cancel($id) - Cancel activity

- [ ] `Admin/DocumentController.php`
  - index() - List all documents
  - upload() - Show upload form
  - store() - Upload document
  - batchUpload() - Batch upload
  - show($id) - View document details
  - download($id) - Download document
  - destroy($id) - Delete document
  - manageDisposal() - Disposal management
  - updateDisposalStatus($id) - Update disposal status

- [ ] `Admin/DashboardController.php`
  - index() - SAS admin dashboard
  - statistics() - Get statistics data

**Commands:**
```powershell
php artisan make:controller Modules/SAS/Http/Controllers/Public/ActivityController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/ActivityController --resource --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/DocumentController --no-interaction
php artisan make:controller Modules/SAS/Http/Controllers/Admin/DashboardController --no-interaction
```

### Phase 1.21: Define All Routes
Update `app/Modules/SAS/routes.php`:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SAS\Http\Controllers\{
    Student\ScholarshipController as StudentScholarshipController,
    Student\InsuranceController as StudentInsuranceController,
    Public\OrganizationController as PublicOrganizationController,
    Public\ActivityController as PublicActivityController,
    Adviser\OrganizationController as AdviserOrganizationController,
    Admin\DashboardController,
    Admin\ScholarshipController,
    Admin\ScholarshipRecipientController,
    Admin\InsuranceController,
    Admin\OrganizationController,
    Admin\ActivityController,
    Admin\DocumentController,
};

// Public routes
Route::prefix('sas')->name('sas.')->group(function () {
    // Organizations
    Route::get('/organizations', [PublicOrganizationController::class, 'index'])->name('organizations.index');
    Route::get('/organizations/{code}', [PublicOrganizationController::class, 'show'])->name('organizations.show');
    
    // Activities
    Route::get('/activities', [PublicActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/calendar', [PublicActivityController::class, 'calendar'])->name('activities.calendar');
    Route::get('/activities/{slug}', [PublicActivityController::class, 'show'])->name('activities.show');
});

// Student routes (authenticated)
Route::prefix('sas/student')->name('sas.student.')->middleware(['auth', 'role:student|admin'])->group(function () {
    // My Scholarships
    Route::get('/scholarships', [StudentScholarshipController::class, 'index'])->name('scholarships.index');
    Route::get('/scholarships/{id}', [StudentScholarshipController::class, 'show'])->name('scholarships.show');
    Route::get('/scholarships/{id}/requirements', [StudentScholarshipController::class, 'requirements'])->name('scholarships.requirements');
    Route::post('/scholarships/{id}/upload-requirement', [StudentScholarshipController::class, 'uploadRequirement'])->name('scholarships.upload-requirement');
    
    // My Insurance
    Route::get('/insurance', [StudentInsuranceController::class, 'index'])->name('insurance.index');
    Route::get('/insurance/submit', [StudentInsuranceController::class, 'create'])->name('insurance.create');
    Route::post('/insurance', [StudentInsuranceController::class, 'store'])->name('insurance.store');
    Route::get('/insurance/{id}', [StudentInsuranceController::class, 'show'])->name('insurance.show');
});

// Organization Adviser routes (authenticated)
Route::prefix('sas/adviser')->name('sas.adviser.')->middleware(['auth', 'role:org_adviser|admin'])->group(function () {
    Route::get('/organization', [AdviserOrganizationController::class, 'dashboard'])->name('organization.dashboard');
    Route::get('/organization/edit', [AdviserOrganizationController::class, 'edit'])->name('organization.edit');
    Route::put('/organization', [AdviserOrganizationController::class, 'update'])->name('organization.update');
    Route::get('/organization/officers', [AdviserOrganizationController::class, 'manageOfficers'])->name('organization.officers');
    Route::get('/organization/members', [AdviserOrganizationController::class, 'manageMembers'])->name('organization.members');
    Route::post('/organization/documents', [AdviserOrganizationController::class, 'uploadDocument'])->name('organization.upload-document');
});

// SAS Admin routes (authenticated)
Route::prefix('sas/admin')->name('sas.admin.')->middleware(['auth', 'role:sas_officer|sas_admin|admin'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/statistics', [DashboardController::class, 'statistics'])->name('statistics');
    
    // Scholarships
    Route::resource('scholarships', ScholarshipController::class);
    Route::resource('scholarship-recipients', ScholarshipRecipientController::class);
    Route::post('scholarship-recipients/{id}/update-status', [ScholarshipRecipientController::class, 'updateStatus'])->name('scholarship-recipients.update-status');
    Route::get('scholarship-recipients/{id}/requirements', [ScholarshipRecipientController::class, 'manageRequirements'])->name('scholarship-recipients.requirements');
    
    // Insurance
    Route::get('insurance', [InsuranceController::class, 'index'])->name('insurance.index');
    Route::get('insurance/{id}', [InsuranceController::class, 'show'])->name('insurance.show');
    Route::get('insurance/{id}/review', [InsuranceController::class, 'review'])->name('insurance.review');
    Route::post('insurance/{id}/approve', [InsuranceController::class, 'approve'])->name('insurance.approve');
    Route::post('insurance/{id}/reject', [InsuranceController::class, 'reject'])->name('insurance.reject');
    Route::delete('insurance/{id}', [InsuranceController::class, 'destroy'])->name('insurance.destroy');
    
    // Organizations
    Route::resource('organizations', OrganizationController::class);
    Route::get('organizations/compliance/report', [OrganizationController::class, 'compliance'])->name('organizations.compliance');
    
    // Activities
    Route::resource('activities', ActivityController::class);
    Route::post('activities/{id}/mark-completed', [ActivityController::class, 'markCompleted'])->name('activities.mark-completed');
    Route::post('activities/{id}/cancel', [ActivityController::class, 'cancel'])->name('activities.cancel');
    
    // Documents
    Route::get('documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('documents/upload', [DocumentController::class, 'upload'])->name('documents.upload');
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::post('documents/batch-upload', [DocumentController::class, 'batchUpload'])->name('documents.batch-upload');
    Route::get('documents/{id}', [DocumentController::class, 'show'])->name('documents.show');
    Route::get('documents/{id}/download', [DocumentController::class, 'download'])->name('documents.download');
    Route::delete('documents/{id}', [DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::get('documents/disposal/manage', [DocumentController::class, 'manageDisposal'])->name('documents.manage-disposal');
    Route::post('documents/{id}/disposal-status', [DocumentController::class, 'updateDisposalStatus'])->name('documents.update-disposal-status');
});
```

---

## Week 9-10: Frontend Development

### Phase 1.22: Create Student Pages
Create React pages in `resources/js/Pages/sas/student/`:

**Scholarships:**
- [ ] `scholarships/index.tsx`
  - Display my scholarships
  - Filter by status
  - Show amounts and dates

- [ ] `scholarships/show.tsx`
  - Scholarship details
  - Requirements checklist
  - Upload requirements
  - Scholarship history

**Insurance:**
- [ ] `insurance/index.tsx`
  - List my insurance records
  - Status indicators

- [ ] `insurance/create.tsx`
  - Insurance submission form
  - Policy document upload
  - Beneficiary information

- [ ] `insurance/show.tsx`
  - Insurance details
  - Policy document viewer
  - Status history

### Phase 1.23: Create Public Pages ✅ COMPLETE
- [x] `public/organizations/index.tsx`
  - Grid view of all organizations
  - Filter by type (Major/Minor)
  - Search organizations

- [x] `public/organizations/show.tsx`
  - Organization profile
  - VMGO display
  - Officers list
  - Recent activities
  - Documents

- [x] `public/activities/index.tsx`
  - List view of activities
  - Filter by category
  - Search activities

- [x] `public/activities/calendar.tsx`
  - Full calendar view
  - Month/Week/Day views (Monthly view implemented)
  - Color-coded by category
  - Click to view details

- [x] `public/activities/show.tsx`
  - Activity details
  - Date, time, location
  - Organizer information
  - Related documents

### Phase 1.24: Create Admin Pages - Dashboard & Scholarships ✅ COMPLETE
- [x] `admin/dashboard.tsx`
  - ✅ Statistics cards (scholarships, insurance, organizations, activities, documents)
  - ✅ Recent activity timeline with badges
  - ✅ Pending tasks list with tabs (overview/pending/activity)
  - ✅ Quick actions to all modules
  - ✅ Charts and graphs placeholders

- [x] `admin/scholarships/index.tsx`
  - ✅ Data table of all scholarships
  - ✅ Filter by type (dropdown)
  - ✅ Filter by status
  - ✅ Search by name/code
  - ✅ Actions: Edit, Delete, View Recipients
  - ✅ Statistics cards (Total/Active/Recipients/Disbursed)

- [x] `admin/scholarships/create.tsx`
  - ✅ Create scholarship program form
  - ✅ Scholarship type selection (TES/TDP/CHED Merit/Private/University/Other)
  - ✅ Description textarea
  - ✅ Provider and scholarship code fields
  - ✅ Form validation

- [x] `admin/scholarships/edit.tsx`
  - ✅ Edit scholarship form
  - ✅ Toggle active status (Switch component)
  - ✅ Pre-filled data
  - ✅ Form validation

- [x] `admin/scholarship-recipients/index.tsx`
  - ✅ Data table of all recipients
  - ✅ Filter by scholarship (dropdown)
  - ✅ Filter by status
  - ✅ Filter by academic year
  - ✅ Search by student name
  - ✅ Actions: Edit, Delete, Update Status, Requirements
  - ✅ Status badges (Active/Suspended/Completed/Cancelled)

- [x] `admin/scholarship-recipients/create.tsx`
  - ✅ Add recipient form
  - ✅ Student search/select
  - ✅ Scholarship selection
  - ✅ Amount and dates (date pickers)
  - ✅ Semester selection (1st/2nd/Summer)
  - ✅ Status selection
  - ✅ Form validation

- [x] `admin/scholarship-recipients/edit.tsx`
  - ✅ Edit recipient form
  - ✅ Update status (dropdown)
  - ✅ Renewal status tracking
  - ✅ Requirements complete toggle
  - ✅ Remarks textarea
  - ✅ Form validation

### Phase 1.25: Create Admin Pages - Insurance & Organizations
- [ ] `admin/insurance/index.tsx`
  - Data table of insurance submissions
  - Filter by status
  - Search
  - Highlight pending reviews
  - Actions: Review, Approve, Reject, Delete

- [ ] `admin/insurance/show.tsx`
  - Insurance details
  - Policy document viewer
  - Review form
  - Approval buttons
  - History log

- [ ] `admin/organizations/index.tsx`
  - Data table of organizations
  - Filter by type (Major/Minor)
  - Status indicators
  - Actions: Edit, Delete, View Details

- [ ] `admin/organizations/create.tsx`
  - Create organization form
  - Logo upload
  - Adviser assignment
  - Organization type selection

- [ ] `admin/organizations/edit.tsx`
  - Edit organization form
  - Manage officers
  - Manage members
  - Upload documents
  - Activity history

- [ ] `admin/organizations/compliance.tsx`
  - Compliance dashboard
  - Document submission status
  - Missing documents
  - Compliance rate

### Phase 1.26: Create Admin Pages - Activities & Documents
- [ ] `admin/activities/index.tsx`
  - Data table of activities
  - Filter by status, category, date range
  - Calendar quick view
  - Actions: Edit, Delete, Complete, Cancel

- [ ] `admin/activities/create.tsx`
  - Create activity form
  - Date/time pickers
  - Location input
  - Organizer selection
  - Color picker
  - Recurring event options
  - Reminder settings

- [ ] `admin/activities/edit.tsx`
  - Edit activity form
  - Mark as completed
  - Upload completion report
  - Actual participants
  - Photos/documents

- [ ] `admin/documents/index.tsx`
  - Data table of all documents
  - Filter by category, disposal status
  - Search by title, reference number
  - Actions: View, Download, Delete, Update Disposal

- [ ] `admin/documents/upload.tsx`
  - Single upload form
  - Batch upload interface
  - Drag & drop
  - Metadata input
  - Category selection
  - Link to entity

- [ ] `admin/documents/show.tsx`
  - Document viewer
  - Metadata display
  - Version history
  - Permissions
  - Disposal status
  - Download/Print

- [ ] `admin/documents/manage-disposal.tsx`
  - Disposal management dashboard
  - Documents pending disposal
  - Bulk status update
  - Disposal permit tracking
  - Generate disposal report

### Phase 1.27: Create Adviser Pages
- [ ] `adviser/organization/dashboard.tsx`
  - My organization overview
  - Statistics
  - Recent activities
  - Pending tasks

- [ ] `adviser/organization/edit.tsx`
  - Edit organization info
  - Update VMGO
  - Change logo
  - Update contact info

- [ ] `adviser/organization/officers.tsx`
  - Officers list
  - Add new officer
  - Edit officer details
  - Remove officer
  - Set term dates

- [ ] `adviser/organization/members.tsx`
  - Members list
  - Add member
  - Update member status
  - Remove member

- [ ] `adviser/organization/documents.tsx`
  - Document repository
  - Upload documents
  - Categorize
  - View/download

### Phase 1.28: Create Reusable Components
Create components in `resources/js/components/sas/`:

**Data Display Components:**
- [ ] `scholarship-card.tsx` - Display scholarship info
- [ ] `insurance-card.tsx` - Display insurance record
- [ ] `organization-card.tsx` - Organization preview
- [ ] `activity-card.tsx` - Activity preview
- [ ] `document-card.tsx` - Document item
- [ ] `stats-card.tsx` - Dashboard statistics
- [ ] `status-badge.tsx` - Status indicators
- [ ] `requirement-checklist.tsx` - Requirements tracker

**Form Components:**
- [ ] `file-uploader.tsx` - Drag & drop upload
- [ ] `batch-uploader.tsx` - Multiple file upload
- [ ] `date-range-picker.tsx` - Date range selection
- [ ] `student-search.tsx` - Student autocomplete
- [ ] `organization-selector.tsx` - Organization dropdown
- [ ] `requirement-builder.tsx` - Build requirements list

**Calendar Components:**
- [ ] `calendar-widget.tsx` - Full calendar
- [ ] `activity-calendar.tsx` - Activity-specific calendar
- [ ] `date-picker.tsx` - Single date picker
- [ ] `reminder-settings.tsx` - Reminder configuration

**Specialized Components:**
- [ ] `organization-tree.tsx` - Organizational hierarchy
- [ ] `officer-card.tsx` - Officer profile
- [ ] `member-list.tsx` - Member table
- [ ] `document-viewer.tsx` - PDF/image viewer
- [ ] `version-history.tsx` - Document versions
- [ ] `disposal-tracker.tsx` - Disposal status tracker
- [ ] `compliance-meter.tsx` - Compliance gauge
- [ ] `notification-list.tsx` - Notifications

**Use shadcn/ui components:**
```powershell
npx shadcn@latest add button card badge input textarea select form table dialog alert calendar date-picker avatar file-upload tabs data-table
```

---

## Week 11: Testing

### Phase 1.29: Unit Tests
Create unit tests in `tests/Unit/Modules/SAS/`:

**Model Tests:**
- [ ] Test `Scholarship` model methods and relationships
- [ ] Test `ScholarshipRecipient` model scopes and methods
- [ ] Test `InsuranceRecord` model methods (isExpired, daysUntilExpiration)
- [ ] Test `Organization` model relationships and scopes
- [ ] Test `SASActivity` model methods (isToday, isUpcoming)
- [ ] Test `DigitalizedDocument` model methods (canBeDisposed)

**Service Tests:**
- [ ] Test `ScholarshipService` logic
- [ ] Test `InsuranceService` approval workflow
- [ ] Test `OrganizationService` compliance tracking
- [ ] Test `ActivityService` calendar data generation
- [ ] Test `DocumentService` disposal tracking
- [ ] Test `FileUploadService` file handling

**Commands:**
```powershell
php artisan make:test --unit Modules/SAS/Models/ScholarshipTest --pest --no-interaction
php artisan make:test --unit Modules/SAS/Models/InsuranceRecordTest --pest --no-interaction
php artisan make:test --unit Modules/SAS/Models/OrganizationTest --pest --no-interaction
php artisan make:test --unit Modules/SAS/Services/ScholarshipServiceTest --pest --no-interaction
php artisan make:test --unit Modules/SAS/Services/InsuranceServiceTest --pest --no-interaction
php artisan test --filter=ScholarshipTest
```

### Phase 1.30: Feature Tests
Create feature tests in `tests/Feature/Modules/SAS/`:

**Scholarship Tests:**
- [ ] Test scholarship CRUD operations
- [ ] Test recipient management
- [ ] Test requirement tracking
- [ ] Test scholarship reports

**Insurance Tests:**
- [ ] Test student insurance submission
- [ ] Test insurance approval workflow
- [ ] Test expiration tracking
- [ ] Test insurance reports

**Organization Tests:**
- [ ] Test organization CRUD
- [ ] Test officer management
- [ ] Test member management
- [ ] Test document uploads
- [ ] Test compliance tracking

**Activity Tests:**
- [ ] Test activity creation
- [ ] Test calendar views
- [ ] Test activity completion
- [ ] Test reminders

**Document Tests:**
- [ ] Test document upload (single and batch)
- [ ] Test disposal tracking
- [ ] Test permissions
- [ ] Test version control

**Authorization Tests:**
- [ ] Test role-based access control
- [ ] Test student permissions
- [ ] Test adviser permissions
- [ ] Test admin permissions

**Commands:**
```powershell
php artisan make:test Modules/SAS/ScholarshipManagementTest --pest --no-interaction
php artisan make:test Modules/SAS/InsuranceWorkflowTest --pest --no-interaction
php artisan make:test Modules/SAS/OrganizationManagementTest --pest --no-interaction
php artisan make:test Modules/SAS/ActivityManagementTest --pest --no-interaction
php artisan make:test Modules/SAS/DocumentManagementTest --pest --no-interaction
php artisan test
```

---

## Week 12: Polish, Documentation & Final Testing

### Phase 1.31: Complete Feature Implementation

**Scholarship Features:**
- [ ] Implement scholarship search
- [ ] Create automated expiration reminders
- [ ] Build scholarship renewal workflow
- [ ] Generate comprehensive reports (PDF/Excel)
- [ ] Email notifications for status changes

**Insurance Features:**
- [ ] Automated expiration alerts (30 days before)
- [ ] Email notifications for approvals/rejections
- [ ] Insurance statistics dashboard
- [ ] Export insurance reports

**Organization Features:**
- [ ] Advanced organization search
- [ ] Compliance monitoring system
- [ ] Officer term expiration alerts
- [ ] Organization activity reports
- [ ] Document compliance tracking

**Activity Features:**
- [ ] Implement recurring events
- [ ] Email/SMS reminders (configurable)
- [ ] iCal export for calendar integration
- [ ] Activity completion workflow
- [ ] Photo gallery for completed activities

**Document Features:**
- [ ] Advanced document search (full-text if possible)
- [ ] Bulk operations (categorize, dispose)
- [ ] Document access logs
- [ ] Disposal permit workflow
- [ ] Storage utilization reports

**Notification System:**
- [ ] Scholarship notifications
- [ ] Insurance notifications
- [ ] Activity reminders
- [ ] Expiration alerts
- [ ] System announcements

### Phase 1.32: Create Artisan Commands
- [ ] `php artisan sas:check-scholarship-expiration` - Check and notify expiring scholarships
- [ ] `php artisan sas:check-insurance-expiration` - Check and notify expiring insurance
- [ ] `php artisan sas:send-activity-reminders` - Send upcoming activity reminders
- [ ] `php artisan sas:update-activity-status` - Update past activities to completed
- [ ] `php artisan sas:generate-reports` - Generate scheduled reports

**Commands:**
```powershell
php artisan make:command Modules/SAS/CheckScholarshipExpiration --no-interaction
php artisan make:command Modules/SAS/CheckInsuranceExpiration --no-interaction
php artisan make:command Modules/SAS/SendActivityReminders --no-interaction
```

### Phase 1.33: Documentation
- [ ] Add PHPDoc blocks to all methods
- [ ] Create user manual for students
  - How to view scholarships
  - How to submit insurance
  - How to view organizations
- [ ] Create user manual for SAS officers
  - Scholarship management guide
  - Insurance review process
  - Organization oversight
  - Activity scheduling
  - Document digitalization workflow
- [ ] Create user manual for organization advisers
  - Update organization information
  - Manage officers and members
  - Upload documents
- [ ] Create admin guide
  - User management
  - System configuration
  - Report generation
  - Disposal management
- [ ] Document API endpoints
- [ ] Create deployment guide

### Phase 1.34: Performance Optimization
- [ ] Optimize database queries (eager loading)
- [ ] Add database indexes
- [ ] Implement caching for frequently accessed data
- [ ] Optimize file uploads
- [ ] Compress uploaded images
- [ ] Lazy load components

### Phase 1.35: Security Enhancements
- [ ] Implement file upload validation
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Implement rate limiting
- [ ] Add file virus scanning (optional)
- [ ] Encrypt sensitive documents

### Phase 1.36: Final Checklist
- [ ] Run `vendor/bin/pint --dirty` for code formatting
- [ ] Run `php artisan test` - all tests passing
- [ ] Ensure >80% code coverage
- [ ] Test file uploads work correctly
- [ ] Test all workflows end-to-end
- [ ] Test calendar on mobile devices
- [ ] Test batch document upload
- [ ] Verify responsive design on all pages
- [ ] Test dark mode support
- [ ] Verify email notifications work
- [ ] Test all reports generate correctly
- [ ] Verify disposal workflow
- [ ] Test role-based permissions
- [ ] Load test with sample data (100+ records each)
- [ ] Browser compatibility testing (Chrome, Firefox, Edge, Safari)

---

# 📚 Development Guidelines

## Code Standards
1. **Follow Laravel Boost Guidelines** - See `.github/copilot-instructions.md`
2. **Use Artisan Commands** - Always use `php artisan make:` commands
3. **Keep Controllers Thin** - Business logic goes in Service classes
4. **Form Requests** - Use Form Request classes for validation, not inline validation
5. **Type Hints** - Always use explicit return types and parameter types
6. **Factories & Seeders** - Create factories for all models
7. **Named Routes** - Use named routes: `route('sas.admin.scholarships.index')`
8. **Namespacing** - All models in `App\Modules\SAS\Models`, controllers in `App\Modules\SAS\Http\Controllers`

## Frontend Standards
1. **React + Inertia** - Use Inertia's `<Link>` and `<Form>` components
2. **Tailwind CSS v4** - Follow v4 syntax (no deprecated utilities)
3. **shadcn/ui** - Use existing components before creating custom ones
4. **Dark Mode** - Support dark mode with `dark:` classes
5. **Responsive** - Mobile-first responsive design
6. **Component Naming** - Use kebab-case for filenames: `scholarship-card.tsx`

## Testing Standards
1. **Pest** - All tests use Pest syntax
2. **Factories** - Use factories in tests, not manual model creation
3. **Coverage** - Aim for 80%+ code coverage
4. **Run Tests** - Run tests after every change: `php artisan test --filter=YourTest`
5. **Test Data** - Don't rely on seeders in tests

## File Management
1. **File Storage** - Use Laravel Storage facade
2. **File Naming** - `{type}_{reference}_{timestamp}_{original_name}`
3. **File Organization** - Follow directory structure in SRS
4. **File Validation** - Always validate file type and size
5. **File Cleanup** - Delete files when records are deleted

## Git Workflow
1. **Branch Naming** - `feature/sas-{feature-name}`
2. **Commits** - Clear, descriptive commit messages
3. **Pull Requests** - Create PR when phase is complete

---

# 🎯 Success Criteria

The SAS module will be considered complete when:

✅ **Scholarship Management:**
- Scholarship programs and recipients fully functional
- Requirements tracking works correctly
- Renewal workflow operational
- Reports generate accurately
- Notifications sent properly

✅ **Insurance Management:**
- Students can submit insurance forms
- Officers can review and approve/reject
- Documents upload successfully
- Expiration reminders work
- Reports generate correctly

✅ **Organization Management:**
- Can manage 23 organizations
- Officer and member management works
- Documents organize properly
- Compliance tracking functional
- Advisers can update their organizations

✅ **Calendar of Activities:**
- Calendar displays correctly (all views)
- Can create and schedule activities
- Reminders send on time
- Can mark activities as completed
- Export to iCal works

✅ **Document Digitalization:**
- Single and batch upload work
- Document search and filter accurate
- Disposal tracking functions properly
- Access control enforced
- Version control works

✅ **Integration:**
- All features work together seamlessly
- Navigation works across all features
- Consistent UI/UX across all pages
- All routes working correctly
- Role-based access control enforced

✅ **Quality:**
- All tests passing with >80% coverage
- Code passes Pint formatting
- Responsive design on all devices
- Dark mode support everywhere
- Complete documentation
- No security vulnerabilities

---

# 📅 Timeline Overview

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1-2 | Database & Models - Scholarships & Insurance | Migrations, models, factories, seeders |
| 3-4 | Database & Models - Organizations, Activities & Documents | All remaining migrations, models, factories |
| 5-6 | Backend Services & Form Requests | All form requests, service classes |
| 7-8 | Backend Controllers & Routes | All controllers, routes configuration |
| 9-10 | Frontend Development | All pages (student, public, admin, adviser), components |
| 11 | Testing | Unit tests, feature tests, integration tests |
| 12 | Polish & Documentation | Features, optimization, documentation, final testing |

---

# 🛠️ Resources & Support

## Documentation
- Laravel 12: Use `search-docs` tool in Copilot
- Inertia.js: Use `search-docs` tool in Copilot
- React 19: https://react.dev
- Tailwind CSS v4: Use `search-docs` tool in Copilot
- shadcn/ui: Check `components.json` and use MCP tools
- SAS Requirements: `SAS_SRS.md`

## Getting Help
1. Use GitHub Copilot with Laravel Boost for guidance
2. Check existing modules (USG, Guidance, Registrar) for patterns
3. Review `.github/copilot-instructions.md` for conventions
4. Review `SAS_SRS.md` for detailed requirements
5. Ask team lead for clarification on requirements

## Tools to Use
- **Laravel Boost MCP**: Database queries, Artisan commands, docs search, tinker
- **shadcn MCP**: Component search and examples

## Key Differences from USG Module
- **More Complex**: 5 major subsystems vs 2 in USG
- **More Tables**: 15+ tables vs 6 in USG
- **File Management**: Heavy focus on document upload and management
- **Approval Workflows**: Insurance and disposal workflows
- **Multiple User Types**: Students, Advisers, Officers, Admins
- **Compliance Tracking**: Organization compliance monitoring

---

**Good luck! 🚀**

Remember: You're building the complete Student Affairs and Services - a mission-critical system for managing scholarships, insurance, organizations, activities, and documents. Take it one phase at a time, test thoroughly, follow the SRS specifications, and create something amazing!
