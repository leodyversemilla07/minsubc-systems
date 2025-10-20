# Task Delegation: USG Information Portal
**Module:** USG Information and Transparency Portal  
**Developer:** John Paul Leido  
**Start Date:** October 16, 2025  
**Target Completion:** 8 weeks (December 11, 2025)

---

## Overview
The USG Information and Transparency Portal module is a comprehensive full-stack system covering all aspects of the USG portal. You will build the complete system from database migrations through backend services to frontend interfaces, including:
- ✅ **Content Management** - Announcements, Resolutions, Documents
- ✅ **Organization Management** - VMGO, Officers, Events & Calendar
- ✅ **Public Portal** - Homepage and public-facing pages
- ✅ **Admin Dashboard** - Complete admin interface with statistics

## Reference Documentation
- **Requirements:** `USG_INFORMATION_PORTAL_SRS.md`
- **Architecture:** `MODULAR_ARCHITECTURE.md`
- **Directory Structure:** `DIRECTORY_STRUCTURE.md`
- **Project Guidelines:** `.github/copilot-instructions.md`

---

## Technology Stack (Already Configured)
- **Backend:** Laravel 12 with PHP 8.2
- **Frontend:** React 19 with Inertia.js v2
- **UI:** Tailwind CSS v4 with shadcn/ui components
- **Testing:** Pest v3
- **Database:** MySQL/SQLite

---

# 🎯 Full-Stack Development Plan
**Developer:** John Paul Leido  
**Complete System:** Content Management + Organization & Events  
**Timeline:** 8 weeks

---

## System Components

You will build the complete USG Information Portal covering:

### Part A: Content Management System
- ✅ **Announcements** - Create, publish, and display announcements
- ✅ **Resolutions** - Manage USG resolutions with approval workflow
- ✅ **Documents** - File upload, management, and public access
- ✅ **Admin Dashboard** - Statistics and recent activity

### Part B: Organization & Events System
- ✅ **VMGO** - Vision, Mission, Goals, Objectives management
- ✅ **Officers** - USG officer profiles and organizational structure
- ✅ **Events** - Event management with calendar interface
- ✅ **Homepage** - Public landing page with featured content

---

## Week 1-2: Database & Backend Foundation (All Tables)

### Phase 1.1: Create All Migrations
Create migrations in `database/migrations/`:

**Content Management Tables:**
- [ ] `create_usg_announcements_table.php`
  - Fields: id, title, slug (unique), content, excerpt, category (enum: general/academic/event/urgent), priority (enum: low/medium/high), featured_image, status (enum: draft/published/archived), publish_date, expiry_date, author_id, views_count, timestamps

- [ ] `create_usg_resolutions_table.php`
  - Fields: id, resolution_number (unique), title, description, content, category (string), file_path, status (enum: draft/pending/approved/rejected), resolution_date, submitted_by, approved_by, approved_at, published_at, timestamps

- [ ] `create_usg_documents_table.php`
  - Fields: id, title, description, file_path, file_name, file_size, mime_type, category (string), is_public (boolean), uploaded_by, download_count, timestamps

**Organization & Events Tables:**
- [ ] `create_usg_vmgo_table.php`
  - Fields: id, vision (text), mission (text), goals (json), objectives (json), effective_date, updated_by, timestamps

- [ ] `create_usg_officers_table.php`
  - Fields: id, user_id (nullable), name, position, department, email, phone, photo, bio (text), term_start, term_end, order (integer), is_active (boolean), timestamps

- [ ] `create_usg_events_table.php`
  - Fields: id, title, slug (unique), description (text), location, start_date, end_date, all_day (boolean), category (string), color (string), organizer, is_recurring (boolean), recurrence_rule (text), status (enum: draft/published/cancelled), created_by, timestamps

**Commands:**
```bash
php artisan make:migration create_usg_announcements_table --no-interaction
php artisan make:migration create_usg_resolutions_table --no-interaction
php artisan make:migration create_usg_documents_table --no-interaction
php artisan make:migration create_usg_vmgo_table --no-interaction
php artisan make:migration create_usg_officers_table --no-interaction
php artisan make:migration create_usg_events_table --no-interaction
php artisan migrate
```

### Phase 1.2: Create All Models
Create models in `app/Modules/USG/Models/`:

**Content Management Models:**
- [ ] `Announcement.php`
  - Casts: publish_date, expiry_date to datetime; status, category, priority to enums
  - Relationships: belongsTo(User, 'author_id')
  - Scopes: published(), active(), featured(), byCategory($category)
  - Slug generation on save

- [ ] `Resolution.php`
  - Casts: resolution_date, approved_at, published_at to datetime; status to enum
  - Relationships: belongsTo(User, 'submitted_by'), belongsTo(User, 'approved_by')
  - Scopes: approved(), pending(), published()
  - Auto-generate resolution_number

- [ ] `Document.php`
  - Casts: is_public to boolean, file_size to integer
  - Relationships: belongsTo(User, 'uploaded_by')
  - Methods: getDownloadUrlAttribute(), incrementDownloadCount()

**Organization & Events Models:**
- [ ] `VMGO.php`
  - Casts: goals to array, objectives to array, effective_date to datetime
  - Relationships: belongsTo(User, 'updated_by')
  - Methods: getCurrentVMGO() - Get active VMGO

- [ ] `Officer.php`
  - Casts: term_start, term_end to datetime; is_active to boolean
  - Relationships: belongsTo(User, 'user_id')
  - Scopes: active(), byDepartment($dept), ordered()
  - Accessor: getPhotoUrlAttribute()

- [ ] `Event.php`
  - Casts: start_date, end_date to datetime; all_day, is_recurring to boolean; status to enum
  - Relationships: belongsTo(User, 'created_by')
  - Scopes: published(), upcoming(), past(), byCategory($category)
  - Slug generation on save

**Commands:**
```bash
php artisan make:model Modules/USG/Models/Announcement --no-interaction
php artisan make:model Modules/USG/Models/Resolution --no-interaction
php artisan make:model Modules/USG/Models/Document --no-interaction
php artisan make:model Modules/USG/Models/VMGO --no-interaction
php artisan make:model Modules/USG/Models/Officer --no-interaction
php artisan make:model Modules/USG/Models/Event --no-interaction
```

### Phase 1.3: Create All Factories & Seeders
- [ ] Create `AnnouncementFactory.php` - Generate 20-30 sample announcements
- [ ] Create `ResolutionFactory.php` - Generate 15-20 sample resolutions
- [ ] Create `DocumentFactory.php` - Generate 10-15 sample documents
- [ ] Create `VMGOFactory.php` - Generate 1 active VMGO
- [ ] Create `OfficerFactory.php` - Generate 15-20 officers
- [ ] Create `EventFactory.php` - Generate 30-40 events (past and upcoming)
- [ ] Create `USGModuleSeeder.php` - Seed all models

**Commands:**
```bash
php artisan make:factory Modules/USG/AnnouncementFactory --model=Modules/USG/Models/Announcement --no-interaction
php artisan make:factory Modules/USG/ResolutionFactory --model=Modules/USG/Models/Resolution --no-interaction
php artisan make:factory Modules/USG/DocumentFactory --model=Modules/USG/Models/Document --no-interaction
php artisan make:factory Modules/USG/VMGOFactory --model=Modules/USG/Models/VMGO --no-interaction
php artisan make:factory Modules/USG/OfficerFactory --model=Modules/USG/Models/Officer --no-interaction
php artisan make:factory Modules/USG/EventFactory --model=Modules/USG/Models/Event --no-interaction
php artisan db:seed --class=USGModuleSeeder
```

---

## Week 3-4: Backend Services & APIs

### Phase 1.4: Create All Form Requests
Create Form Requests in `app/Modules/USG/Http/Requests/`:

**Content Management Requests:**
- [ ] `StoreAnnouncementRequest.php`
  - Validate: title (required, max:255), content (required), category, priority, publish_date, expiry_date, featured_image (image, max:2MB)

- [ ] `UpdateAnnouncementRequest.php`
  - Same as store + status validation

- [ ] `StoreResolutionRequest.php`
  - Validate: title (required), content (required), category, resolution_date, file (pdf, max:10MB)

- [ ] `UpdateResolutionRequest.php`
  - Same as store + status transitions

- [ ] `StoreDocumentRequest.php`
  - Validate: title (required), file (required, max:20MB), category, is_public

**Organization & Events Requests:**
- [ ] `UpdateVMGORequest.php`
  - Validate: vision (required), mission (required), goals (array), objectives (array), effective_date

- [ ] `StoreOfficerRequest.php`
  - Validate: name (required), position (required), department, email (email), phone, photo (image, max:2MB), bio, term_start, term_end

- [ ] `UpdateOfficerRequest.php`
  - Same as store + is_active, order

- [ ] `StoreEventRequest.php`
  - Validate: title (required), description, location, start_date (required, date), end_date (date, after:start_date), all_day, category, color

- [ ] `UpdateEventRequest.php`
  - Same as store + status

**Commands:**
```bash
php artisan make:request Modules/USG/Http/Requests/StoreAnnouncementRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateAnnouncementRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/StoreResolutionRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateResolutionRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/StoreDocumentRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateVMGORequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/StoreOfficerRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateOfficerRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/StoreEventRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateEventRequest --no-interaction
```

### Phase 1.5: Create All Service Classes
Create services in `app/Modules/USG/Services/`:

**Content Management Services:**
- [ ] `AnnouncementService.php`
  - Methods: createAnnouncement(), updateAnnouncement(), publishAnnouncement(), archiveExpired(), incrementViews()

- [ ] `ResolutionService.php`
  - Methods: createResolution(), updateResolution(), submitForApproval(), approve(), reject(), generateResolutionNumber()

- [ ] `FileUploadService.php`
  - Methods: uploadFile($file, $directory), validateFile(), deleteFile($path), getFileUrl()
  - Handle: Images (announcements), PDFs (resolutions), Documents (general)

- [ ] `DashboardService.php`
  - Methods: getStatistics(), getRecentActivity(), getPendingApprovals()

**Organization & Events Services:**
- [ ] `VMGOService.php`
  - Methods: getCurrentVMGO(), updateVMGO(), getHistory()

- [ ] `OfficerService.php`
  - Methods: createOfficer(), updateOfficer(), reorderOfficers(), getActiveOfficers(), getOfficersByDepartment()

- [ ] `EventService.php`
  - Methods: createEvent(), updateEvent(), cancelEvent(), getUpcomingEvents(), getEventsByMonth($year, $month), getCalendarData()

- [ ] `HomepageService.php`
  - Methods: getFeaturedContent(), getUpcomingEvents(), getLatestAnnouncements()

**Important:** All business logic goes here, not in controllers.

### Phase 1.6: Create All Controllers
Create controllers in `app/Modules/USG/Http/Controllers/`:

**Public Controllers:**
- [ ] `PublicHomeController.php`
  - index() - USG homepage with featured content, upcoming events, latest announcements

- [ ] `PublicAnnouncementController.php`
  - index() - List published announcements with filters
  - show($slug) - Display single announcement, increment views

- [ ] `PublicResolutionController.php`
  - index() - List approved resolutions with search
  - show($id) - Display resolution details
  - download($id) - Download resolution file

- [ ] `PublicVMGOController.php`
  - index() - Display current VMGO

- [ ] `PublicOfficerController.php`
  - index() - List all active officers with org chart

- [ ] `PublicEventController.php`
  - index() - List view of upcoming events
  - calendar() - Calendar view
  - show($slug) - Display event details

**Admin Controllers:**
- [ ] `Admin/DashboardController.php`
  - index() - Show statistics, recent activity, pending approvals

- [ ] `Admin/AnnouncementController.php`
  - index() - List all announcements (with status filters)
  - create() - Show create form
  - store() - Create new announcement
  - edit($id) - Show edit form
  - update($id) - Update announcement
  - destroy($id) - Delete announcement
  - publish($id) - Publish announcement

- [ ] `Admin/ResolutionController.php`
  - index() - List all resolutions (with status filters)
  - create() - Show create form
  - store() - Create new resolution
  - edit($id) - Show edit form
  - update($id) - Update resolution
  - destroy($id) - Delete resolution
  - approve($id) - Approve resolution
  - reject($id) - Reject resolution

- [ ] `Admin/DocumentController.php`
  - index() - List all documents
  - create() - Show upload form
  - store() - Upload document
  - destroy($id) - Delete document

- [ ] `Admin/VMGOController.php`
  - edit() - Show edit form
  - update() - Update VMGO

- [ ] `Admin/OfficerController.php`
  - index() - List all officers (sortable)
  - create() - Show create form
  - store() - Create new officer
  - edit($id) - Show edit form
  - update($id) - Update officer
  - destroy($id) - Delete officer
  - reorder() - Update officer display order

- [ ] `Admin/EventController.php`
  - index() - List all events (with status filters)
  - create() - Show create form
  - store() - Create new event
  - edit($id) - Show edit form
  - update($id) - Update event
  - destroy($id) - Delete event
  - cancel($id) - Cancel event

**Commands:**
```bash
php artisan make:controller Modules/USG/Http/Controllers/PublicHomeController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/PublicAnnouncementController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/PublicResolutionController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/PublicVMGOController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/PublicOfficerController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/PublicEventController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/DashboardController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/AnnouncementController --resource --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/ResolutionController --resource --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/DocumentController --resource --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/VMGOController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/OfficerController --resource --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/EventController --resource --no-interaction
```

### Phase 1.7: Define All Routes
Create routes in `app/Modules/USG/routes.php`:

```php
// Public routes
Route::prefix('usg')->name('usg.')->group(function () {
    // Homepage
    Route::get('/', [PublicHomeController::class, 'index'])->name('home');
    
    // Announcements
    Route::get('/announcements', [PublicAnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('/announcements/{slug}', [PublicAnnouncementController::class, 'show'])->name('announcements.show');
    
    // Resolutions
    Route::get('/resolutions', [PublicResolutionController::class, 'index'])->name('resolutions.index');
    Route::get('/resolutions/{id}', [PublicResolutionController::class, 'show'])->name('resolutions.show');
    Route::get('/resolutions/{id}/download', [PublicResolutionController::class, 'download'])->name('resolutions.download');
    
    // VMGO
    Route::get('/vmgo', [PublicVMGOController::class, 'index'])->name('vmgo');
    
    // Officers
    Route::get('/officers', [PublicOfficerController::class, 'index'])->name('officers.index');
    
    // Events
    Route::get('/events', [PublicEventController::class, 'index'])->name('events.index');
    Route::get('/events/calendar', [PublicEventController::class, 'calendar'])->name('events.calendar');
    Route::get('/events/{slug}', [PublicEventController::class, 'show'])->name('events.show');
});

// Admin routes (authenticated)
Route::prefix('usg/admin')->name('usg.admin.')->middleware(['auth', 'role:usg_officer|admin'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Announcements
    Route::resource('announcements', Admin\AnnouncementController::class);
    Route::post('announcements/{id}/publish', [Admin\AnnouncementController::class, 'publish'])->name('announcements.publish');
    
    // Resolutions
    Route::resource('resolutions', Admin\ResolutionController::class);
    Route::post('resolutions/{id}/approve', [Admin\ResolutionController::class, 'approve'])->name('resolutions.approve');
    Route::post('resolutions/{id}/reject', [Admin\ResolutionController::class, 'reject'])->name('resolutions.reject');
    
    // Documents
    Route::resource('documents', Admin\DocumentController::class);
    
    // VMGO
    Route::get('/vmgo/edit', [Admin\VMGOController::class, 'edit'])->name('vmgo.edit');
    Route::put('/vmgo', [Admin\VMGOController::class, 'update'])->name('vmgo.update');
    
    // Officers
    Route::resource('officers', Admin\OfficerController::class);
    Route::post('officers/reorder', [Admin\OfficerController::class, 'reorder'])->name('officers.reorder');
    
    // Events
    Route::resource('events', Admin\EventController::class);
    Route::post('events/{id}/cancel', [Admin\EventController::class, 'cancel'])->name('events.cancel');
});
```

---

## Week 5-6: Frontend Development

### Phase 1.8: Create All Public Pages
Create React pages in `resources/js/Pages/usg/public/`:

**Homepage & Organization:**
- [ ] `index.tsx`
  - USG homepage/landing page
  - Hero section with VMGO summary
  - Featured announcements
  - Upcoming events
  - Officers section
  - Call-to-action buttons

- [ ] `vmgo.tsx`
  - Display Vision, Mission, Goals, Objectives
  - Beautiful layout with sections
  - Effective date
  - Print-friendly

- [ ] `officers/index.tsx`
  - Grid view of all active officers
  - Organizational chart/hierarchy view toggle
  - Filter by department
  - Officer cards with photo, position, contact

**Announcements & Resolutions:**
- [ ] `announcements/index.tsx`
  - Grid/List view of published announcements
  - Filter by category, search, pagination
  - Featured announcements at top
  - Show priority badges

- [ ] `announcements/show.tsx`
  - Full announcement display
  - Featured image
  - Author info, publish date
  - Related announcements

- [ ] `resolutions/index.tsx`
  - Table/List view of approved resolutions
  - Search by resolution number, title, date
  - Filter by date range
  - Download buttons

- [ ] `resolutions/show.tsx`
  - Resolution details
  - Download button
  - Approval information
  - Related resolutions

**Events:**
- [ ] `events/index.tsx`
  - List view of upcoming events
  - Filter by category
  - Search events
  - Event cards with date, location, organizer

- [ ] `events/calendar.tsx`
  - Full calendar view
  - Month/Week/Day views
  - Click event to see details
  - Color-coded by category
  - Navigate months

- [ ] `events/show.tsx`
  - Event detail page
  - Date, time, location
  - Description
  - Organizer info
  - Add to calendar button
  - Related events

### Phase 1.9: Create All Admin Pages
Create React pages in `resources/js/Pages/usg/admin/`:

**Dashboard:**
- [ ] `dashboard.tsx`
  - Statistics cards (total announcements, pending resolutions, total documents, upcoming events)
  - Recent activity timeline
  - Pending approvals list
  - Quick actions

**Announcements:**
- [ ] `announcements/index.tsx`
  - Data table with status filters
  - Search and sort
  - Actions: Edit, Delete, Publish
  - Status indicators

- [ ] `announcements/create.tsx`
  - Form: title, content (rich text), category, priority, publish date, featured image
  - Save as draft or publish
  - Image upload preview

- [ ] `announcements/edit.tsx`
  - Same as create form
  - Show current values
  - Update status

**Resolutions:**
- [ ] `resolutions/index.tsx`
  - Data table with status filters
  - Search by resolution number
  - Actions: Edit, Delete, Approve, Reject

- [ ] `resolutions/create.tsx`
  - Form: title, content, category, resolution date, file upload
  - Generate resolution number automatically
  - PDF upload

- [ ] `resolutions/edit.tsx`
  - Same as create form
  - Approval buttons (if pending)
  - Show approval history

**Documents:**
- [ ] `documents/index.tsx`
  - Data table of all documents
  - Upload button
  - Download count tracking
  - Delete action

- [ ] `documents/create.tsx`
  - Simple upload form
  - Title, description, category, public toggle
  - File validation

**VMGO:**
- [ ] `vmgo/edit.tsx`
  - Form to edit Vision, Mission
  - Dynamic fields for Goals and Objectives (add/remove)
  - Effective date picker
  - Preview before saving

**Officers:**
- [ ] `officers/index.tsx`
  - Sortable data table
  - Drag-and-drop reordering
  - Actions: Edit, Delete, Toggle Active
  - Display order numbers

- [ ] `officers/create.tsx`
  - Form: name, position, department, email, phone, photo, bio, term dates
  - Photo upload with preview
  - Bio rich text editor

- [ ] `officers/edit.tsx`
  - Same as create form
  - Show current values
  - Toggle is_active
  - Change display order

**Events:**
- [ ] `events/index.tsx`
  - Data table with status filters
  - Search and sort by date
  - Actions: Edit, Delete, Cancel
  - Calendar quick view

- [ ] `events/create.tsx`
  - Form: title, description, location, start/end dates, all-day toggle, category, color picker, organizer
  - Recurring event options
  - Date/time pickers

- [ ] `events/edit.tsx`
  - Same as create form
  - Cancel button (if published)
  - Show attendees (future feature)

### Phase 1.10: Create All Reusable Components
Create components in `resources/js/components/usg/`:

**Content Components:**
- [ ] `announcement-card.tsx`
  - Display announcement preview
  - Priority badge, category badge
  - Excerpt with "Read More"
  - Featured image thumbnail

- [ ] `resolution-card.tsx`
  - Display resolution item
  - Resolution number, title, date
  - Status badge
  - Download button

- [ ] `stats-card.tsx`
  - Icon, label, value
  - Trend indicator (optional)
  - Click action

- [ ] `priority-badge.tsx`
  - Color-coded by priority
  - High (red), Medium (yellow), Low (gray)

- [ ] `status-badge.tsx`
  - Color-coded by status
  - Draft, Published, Pending, Approved, Rejected, Archived

- [ ] `file-uploader.tsx`
  - Drag & drop upload
  - File type validation
  - Size validation
  - Progress indicator
  - Preview for images

- [ ] `rich-text-editor.tsx`
  - WYSIWYG editor for content
  - Formatting options
  - Image insertion

- [ ] `search-bar.tsx`
  - Search input with icon
  - Clear button
  - Debounced search

- [ ] `category-filter.tsx`
  - Dropdown or pills
  - Multi-select support

**Organization Components:**
- [ ] `officer-card.tsx`
  - Officer photo
  - Name, position, department
  - Contact info (email, phone)
  - Bio preview
  - View profile button

- [ ] `event-card.tsx`
  - Event title
  - Date badge
  - Location
  - Category badge
  - Description excerpt
  - View details button

- [ ] `calendar-widget.tsx`
  - Full calendar component
  - Month/Week/Day views
  - Event rendering
  - Navigation controls
  - Responsive

- [ ] `organizational-chart.tsx`
  - Hierarchical display of officers
  - Tree/graph visualization
  - Collapsible sections
  - Print-friendly

- [ ] `timeline.tsx`
  - Vertical timeline for events or history
  - Date markers
  - Event items
  - Scroll navigation

- [ ] `hero-section.tsx`
  - Homepage hero
  - Background image/gradient
  - Title, subtitle
  - CTA buttons

- [ ] `feature-grid.tsx`
  - Grid of featured items
  - Responsive columns
  - Hover effects

**Use shadcn/ui base components:**
```bash
npx shadcn@latest add button card badge input textarea select form table dialog alert calendar date-picker avatar file-upload
```

---

## Week 7: Testing

### Phase 1.11: Unit Tests
Create unit tests in `tests/Unit/Modules/USG/`:

**Content Management:**
- [ ] Test `Announcement` model methods and scopes
- [ ] Test `Resolution` model methods and scopes
- [ ] Test `Document` model methods
- [ ] Test `AnnouncementService` logic
- [ ] Test `ResolutionService` approval workflow
- [ ] Test `FileUploadService` file handling

**Organization & Events:**
- [ ] Test `VMGO` model methods
- [ ] Test `Officer` model methods and scopes
- [ ] Test `Event` model methods and scopes
- [ ] Test `VMGOService` logic
- [ ] Test `OfficerService` reordering logic
- [ ] Test `EventService` calendar data generation

**Commands:**
```bash
php artisan make:test --unit Modules/USG/Models/AnnouncementTest --pest --no-interaction
php artisan make:test --unit Modules/USG/Models/ResolutionTest --pest --no-interaction
php artisan make:test --unit Modules/USG/Models/EventTest --pest --no-interaction
php artisan make:test --unit Modules/USG/Services/AnnouncementServiceTest --pest --no-interaction
php artisan make:test --unit Modules/USG/Services/EventServiceTest --pest --no-interaction
php artisan test --filter=AnnouncementTest
php artisan test --filter=EventTest
```

### Phase 1.12: Feature Tests
Create feature tests in `tests/Feature/Modules/USG/`:

**Content Management:**
- [ ] Test public announcement routes (index, show)
- [ ] Test public resolution routes (index, show, download)
- [ ] Test admin announcement CRUD
- [ ] Test announcement publishing workflow
- [ ] Test resolution approval workflow
- [ ] Test file uploads and downloads
- [ ] Test authentication and authorization

**Organization & Events:**
- [ ] Test public homepage route
- [ ] Test public VMGO route
- [ ] Test public officers routes
- [ ] Test public events routes (index, calendar, show)
- [ ] Test admin VMGO update
- [ ] Test admin officer CRUD
- [ ] Test officer reordering
- [ ] Test admin event CRUD
- [ ] Test event cancellation
- [ ] Test authentication and authorization

**Commands:**
```bash
php artisan make:test Modules/USG/PublicAnnouncementTest --pest --no-interaction
php artisan make:test Modules/USG/PublicEventTest --pest --no-interaction
php artisan make:test Modules/USG/Admin/AnnouncementManagementTest --pest --no-interaction
php artisan make:test Modules/USG/Admin/EventManagementTest --pest --no-interaction
php artisan test
```

---

## Week 8: Polish & Documentation

### Phase 1.13: Complete Feature Implementation
**Content Management Features:**
- [ ] **Search** - Implement search across announcements and resolutions
- [ ] **Auto-Archive** - Create command to archive expired announcements: `php artisan usg:archive-expired`
- [ ] **File Management** - Ensure proper file cleanup on deletion
- [ ] **Download Tracking** - Track document downloads
- [ ] **View Tracking** - Track announcement views

**Organization & Events Features:**
- [ ] **Calendar Integration** - Generate iCal files for "Add to Calendar"
- [ ] **Officer Directory** - Advanced search and filtering
- [ ] **Event Notifications** - Email reminders for upcoming events (optional)
- [ ] **Recurring Events** - Implement recurrence rules (daily, weekly, monthly)
- [ ] **Print Styles** - CSS for printing VMGO and officer directory

### Phase 1.14: Documentation
- [ ] Add PHPDoc blocks to all methods
- [ ] Create admin guide for managing announcements
- [ ] Create admin guide for resolution approval workflow
- [ ] Create admin guide for managing VMGO
- [ ] Create admin guide for managing officers
- [ ] Create admin guide for event calendar
- [ ] Document file upload requirements
- [ ] Document officer reordering feature

### Phase 1.15: Final Checklist
- [ ] Run `vendor/bin/pint` for code formatting
- [ ] Run `php artisan test` - all tests passing
- [ ] Ensure >80% code coverage
- [ ] Test file uploads work correctly
- [ ] Test approval workflow end-to-end
- [ ] Test calendar on mobile devices
- [ ] Test officer photo uploads
- [ ] Verify organizational chart displays correctly
- [ ] Verify responsive design on mobile
- [ ] Test dark mode support

---

# 📚 Development Guidelines

## Code Standards
1. **Follow Laravel Boost Guidelines** - See `.github/copilot-instructions.md`
2. **Use Artisan Commands** - Always use `php artisan make:` commands
3. **Keep Controllers Thin** - Business logic goes in Service classes
4. **Form Requests** - Use Form Request classes for validation, not inline validation
5. **Type Hints** - Always use explicit return types and parameter types
6. **Factories & Seeders** - Create factories for all models
7. **Named Routes** - Use named routes: `route('usg.announcements.index')`
8. **Namespacing** - All models in `App\Modules\USG\Models`, controllers in `App\Modules\USG\Http\Controllers`

## Frontend Standards
1. **React + Inertia** - Use Inertia's `<Link>` and `<Form>` components
2. **Tailwind CSS v4** - Follow v4 syntax (no deprecated utilities)
3. **shadcn/ui** - Use existing components before creating custom ones
4. **Dark Mode** - Support dark mode with `dark:` classes
5. **Responsive** - Mobile-first responsive design
6. **Component Naming** - Use kebab-case for filenames: `announcement-card.tsx`

## Testing Standards
1. **Pest** - All tests use Pest syntax
2. **Factories** - Use factories in tests, not manual model creation
3. **Coverage** - Aim for 80%+ code coverage
4. **Run Tests** - Run tests after every change: `php artisan test --filter=YourTest`
5. **Test Data** - Don't rely on seeders in tests

## Git Workflow
1. **Branch Naming** - `feature/usg-{feature-name}`
2. **Commits** - Clear, descriptive commit messages
3. **Pull Requests** - Create PR when phase is complete

---

# 🎯 Success Criteria

The USG module will be considered complete when:

✅ **Content Management:**
- Announcements fully functional (public view + admin management)
- Resolutions with approval workflow working
- Documents with file upload/download working
- Admin dashboard with statistics

✅ **Organization & Events:**
- VMGO display and management working
- Officers directory with org chart
- Events with calendar interface
- USG homepage integrated

✅ **Integration:**
- Homepage shows content from all features
- Navigation works across all features
- Consistent UI/UX across all pages
- All routes working correctly

✅ **Quality:**
- All tests passing with >80% coverage
- Code passes Pint formatting
- Responsive design on all devices
- Dark mode support everywhere
- Complete documentation

---

# 📅 Timeline Overview

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1-2 | Database & Backend Foundation | All migrations, models, factories, seeders |
| 3-4 | Backend Services & APIs | Form requests, services, controllers, routes |
| 5-6 | Frontend Development | All public pages, admin pages, components |
| 7 | Testing | Unit tests, feature tests, integration tests |
| 8 | Polish & Documentation | Features, documentation, final testing |

---

# 🛠️ Resources & Support

## Documentation
- Laravel 12: Use `search-docs` tool in Copilot
- Inertia.js: Use `search-docs` tool in Copilot
- React 19: https://react.dev
- Tailwind CSS v4: Use `search-docs` tool in Copilot
- shadcn/ui: Check `components.json` and use MCP tools

## Getting Help
1. Use GitHub Copilot with Laravel Boost for guidance
2. Check existing modules (Guidance, Registrar, SAS) for patterns
3. Review `.github/copilot-instructions.md` for conventions
4. Ask team lead for clarification on requirements

## Tools to Use
- **Laravel Boost MCP**: Database queries, Artisan commands, docs search, tinker
- **shadcn MCP**: Component search and examples

---

**Good luck! 🚀**

Remember: You're building the complete USG Information Portal. Take it one phase at a time, test thoroughly, and create something amazing!
