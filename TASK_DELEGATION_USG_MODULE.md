# Task Delegation: USG Information Portal
**Assigned Developer:** John Paul Leido  
**Module:** USG Information and Transparency Portal  
**Start Date:** October 16, 2025  
**Target Completion:** 8 weeks (December 11, 2025)

---

## Overview
You are tasked with developing the USG Information and Transparency Portal module for the MinSUBC Systems platform. This module will provide a public-facing portal for university student government transparency, announcements, events, and official documents.

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

## Development Phases & Tasks

### Phase 1: Database & Models (Week 1)
**Estimated Time:** 5-7 days

#### Task 1.1: Create Migrations
Create the following database migrations in `database/migrations/`:

- [ ] `create_usg_vmgo_table.php`
  - Fields: id, vision, mission, goals, objectives, effective_date, updated_by, timestamps
  
- [ ] `create_usg_officers_table.php`
  - Fields: id, user_id (nullable), name, position, department, email, phone, photo, bio, term_start, term_end, order, is_active, timestamps
  
- [ ] `create_usg_resolutions_table.php`
  - Fields: id, resolution_number (unique), title, description, content, category, file_path, status (enum), resolution_date, submitted_by, approved_by, approved_at, published_at, timestamps
  
- [ ] `create_usg_announcements_table.php`
  - Fields: id, title, slug (unique), content, excerpt, category (enum), priority (enum), featured_image, status (enum), publish_date, expiry_date, author_id, views_count, timestamps
  
- [ ] `create_usg_events_table.php`
  - Fields: id, title, slug, description, location, start_date, end_date, all_day, category, color, organizer, is_recurring, recurrence_rule, status (enum), created_by, timestamps
  
- [ ] `create_usg_documents_table.php`
  - Fields: id, title, description, file_path, file_name, file_size, mime_type, category, is_public, uploaded_by, download_count, timestamps

**Commands to use:**
```bash
php artisan make:migration create_usg_vmgo_table --no-interaction
php artisan make:migration create_usg_officers_table --no-interaction
php artisan make:migration create_usg_resolutions_table --no-interaction
php artisan make:migration create_usg_announcements_table --no-interaction
php artisan make:migration create_usg_events_table --no-interaction
php artisan make:migration create_usg_documents_table --no-interaction
```

#### Task 1.2: Create Models
Create models in `app/Modules/USG/Models/`:

- [ ] `VMGO.php` - with casts, fillable, relationships
- [ ] `Officer.php` - with casts, fillable, relationships, scopes
- [ ] `Resolution.php` - with enums, fillable, relationships, scopes
- [ ] `Announcement.php` - with enums, fillable, relationships, scopes, slug generation
- [ ] `Event.php` - with casts, fillable, relationships, scopes
- [ ] `Document.php` - with casts, fillable, relationships, file handling

**Important:**
- Use PHP 8 property promotion in constructors
- Define `casts()` method for type casting
- Add appropriate relationships (belongsTo User)
- Create query scopes for common filters (published, active, upcoming, etc.)

**Commands to use:**
```bash
php artisan make:model Modules/USG/Models/VMGO --no-interaction
php artisan make:model Modules/USG/Models/Officer --no-interaction
php artisan make:model Modules/USG/Models/Resolution --no-interaction
php artisan make:model Modules/USG/Models/Announcement --no-interaction
php artisan make:model Modules/USG/Models/Event --no-interaction
php artisan make:model Modules/USG/Models/Document --no-interaction
```

#### Task 1.3: Create Factories & Seeders
- [ ] Create factories for each model in `database/factories/Modules/USG/`
- [ ] Create seeders for sample data
- [ ] Test with: `php artisan db:seed`

**Commands:**
```bash
php artisan make:factory Modules/USG/VMGOFactory --model=Modules/USG/Models/VMGO --no-interaction
php artisan make:factory Modules/USG/OfficerFactory --model=Modules/USG/Models/Officer --no-interaction
php artisan make:factory Modules/USG/ResolutionFactory --model=Modules/USG/Models/Resolution --no-interaction
php artisan make:factory Modules/USG/AnnouncementFactory --model=Modules/USG/Models/Announcement --no-interaction
php artisan make:factory Modules/USG/EventFactory --model=Modules/USG/Models/Event --no-interaction
php artisan make:factory Modules/USG/DocumentFactory --model=Modules/USG/Models/Document --no-interaction
```

---

### Phase 2: Backend Controllers & Services (Week 2)
**Estimated Time:** 5-7 days

#### Task 2.1: Create Form Request Validators
Create Form Requests in `app/Modules/USG/Http/Requests/`:

- [ ] `StoreAnnouncementRequest.php`
- [ ] `UpdateAnnouncementRequest.php`
- [ ] `StoreResolutionRequest.php`
- [ ] `UpdateResolutionRequest.php`
- [ ] `StoreEventRequest.php`
- [ ] `UpdateEventRequest.php`
- [ ] `StoreOfficerRequest.php`
- [ ] `UpdateVMGORequest.php`

**Important:** Include both validation rules AND custom error messages in each request.

**Commands:**
```bash
php artisan make:request Modules/USG/Http/Requests/StoreAnnouncementRequest --no-interaction
php artisan make:request Modules/USG/Http/Requests/UpdateAnnouncementRequest --no-interaction
# ... continue for all requests
```

#### Task 2.2: Create Service Classes
Create services in `app/Modules/USG/Services/`:

- [ ] `VMGOService.php` - VMGO management logic
- [ ] `OfficerService.php` - Officer management logic
- [ ] `ResolutionService.php` - Resolution workflow logic
- [ ] `AnnouncementService.php` - Announcement publishing logic
- [ ] `EventService.php` - Event management logic
- [ ] `FileUploadService.php` - Handle file uploads, validation, storage

**Important:** Keep controllers thin - business logic goes in services.

#### Task 2.3: Create Controllers
Create controllers in `app/Modules/USG/Http/Controllers/`:

**Public Controllers:**
- [ ] `PublicVMGOController.php` - Display VMGO
- [ ] `PublicOfficerController.php` - List officers
- [ ] `PublicAnnouncementController.php` - List/view announcements
- [ ] `PublicEventController.php` - Calendar and event listing
- [ ] `PublicResolutionController.php` - List/download resolutions

**Admin Controllers:**
- [ ] `Admin/DashboardController.php` - Admin dashboard
- [ ] `Admin/VMGOController.php` - Manage VMGO
- [ ] `Admin/OfficerController.php` - Manage officers
- [ ] `Admin/AnnouncementController.php` - Manage announcements
- [ ] `Admin/EventController.php` - Manage events
- [ ] `Admin/ResolutionController.php` - Manage resolutions
- [ ] `Admin/DocumentController.php` - Manage documents

**Commands:**
```bash
php artisan make:controller Modules/USG/Http/Controllers/PublicVMGOController --no-interaction
php artisan make:controller Modules/USG/Http/Controllers/Admin/DashboardController --no-interaction
# ... continue for all controllers
```

#### Task 2.4: Define Routes
Create/update `app/Modules/USG/routes.php`:

- [ ] Public routes (no auth): VMGO, Officers, Announcements, Events, Resolutions
- [ ] Authenticated routes: Admin dashboard, content management
- [ ] Use route groups for organization
- [ ] Use named routes (e.g., `usg.announcements.index`)

**Important:** Follow existing route conventions in `routes/web.php`

---

### Phase 3: Frontend Components (Week 3-4)
**Estimated Time:** 10-14 days

#### Task 3.1: Create Page Components
Create React pages in `resources/js/Pages/usg/`:

**Public Pages:**
- [ ] `public/index.tsx` - Homepage with featured content
- [ ] `public/vmgo.tsx` - Vision, Mission, Goals, Objectives
- [ ] `public/officers/index.tsx` - Officers listing with org chart
- [ ] `public/announcements/index.tsx` - Announcements grid/list
- [ ] `public/announcements/show.tsx` - Single announcement view
- [ ] `public/events/calendar.tsx` - Calendar view
- [ ] `public/events/index.tsx` - Events list view
- [ ] `public/events/show.tsx` - Event detail page
- [ ] `public/resolutions/index.tsx` - Resolutions with search
- [ ] `public/resolutions/show.tsx` - Resolution detail

**Admin Pages:**
- [ ] `admin/dashboard.tsx` - Admin dashboard
- [ ] `admin/vmgo/edit.tsx` - Edit VMGO
- [ ] `admin/officers/index.tsx` - Manage officers
- [ ] `admin/officers/create.tsx` - Add officer
- [ ] `admin/officers/edit.tsx` - Edit officer
- [ ] `admin/announcements/index.tsx` - Manage announcements
- [ ] `admin/announcements/create.tsx` - Create announcement
- [ ] `admin/announcements/edit.tsx` - Edit announcement
- [ ] `admin/events/index.tsx` - Manage events
- [ ] `admin/events/create.tsx` - Create event
- [ ] `admin/events/edit.tsx` - Edit event
- [ ] `admin/resolutions/index.tsx` - Manage resolutions
- [ ] `admin/resolutions/create.tsx` - Create resolution
- [ ] `admin/resolutions/edit.tsx` - Edit resolution

#### Task 3.2: Create Reusable Components
Create shared components in `resources/js/components/usg/`:

- [ ] `announcement-card.tsx` - Display announcement preview
- [ ] `event-card.tsx` - Display event card
- [ ] `officer-card.tsx` - Display officer info
- [ ] `resolution-card.tsx` - Display resolution item
- [ ] `calendar-widget.tsx` - Calendar component
- [ ] `stats-card.tsx` - Statistics display
- [ ] `search-bar.tsx` - Search functionality
- [ ] `category-filter.tsx` - Filter by category
- [ ] `priority-badge.tsx` - Show priority levels
- [ ] `status-badge.tsx` - Show status (draft/published/etc)
- [ ] `file-uploader.tsx` - File upload component
- [ ] `rich-text-editor.tsx` - Rich text editor for content

**Important:**
- Use shadcn/ui components as base (Button, Card, Badge, etc.)
- Check existing components first before creating new ones
- Follow Tailwind CSS v4 conventions
- Support dark mode using `dark:` classes
- Make components responsive

#### Task 3.3: Use shadcn/ui Components
Before building custom components, check and add needed shadcn components:

```bash
# Example components you'll likely need:
npx shadcn@latest add button card badge input textarea select calendar form table dialog alert
```

Use the `search_items_in_registries` tool or check `components.json` for available components.

---

### Phase 4: Features Implementation (Week 5-6)
**Estimated Time:** 10-14 days

#### Task 4.1: Search Functionality
- [ ] Implement global search across announcements, events, resolutions
- [ ] Add filters (date range, category, type)
- [ ] Display results with relevance ranking
- [ ] Add search to admin panel

#### Task 4.2: File Upload System
- [ ] Implement file validation (type, size)
- [ ] Store files in `storage/app/public/usg/`
- [ ] Create symbolic link: `php artisan storage:link`
- [ ] Handle file downloads with tracking
- [ ] Implement file deletion

#### Task 4.3: Approval Workflow
- [ ] Implement status transitions (draft → review → published)
- [ ] Add approval controls for admins
- [ ] Show pending items in dashboard
- [ ] Send notifications on status change (optional)

#### Task 4.4: Content Archiving
- [ ] Auto-archive expired announcements
- [ ] Archive past events
- [ ] Keep archived content viewable but separate
- [ ] Create artisan command for archiving: `php artisan usg:archive-expired`

#### Task 4.5: Statistics & Dashboard
- [ ] Calculate and display statistics (total resolutions, upcoming events, etc.)
- [ ] Recent activities timeline
- [ ] Content management quick actions
- [ ] Charts/graphs for transparency (optional)

---

### Phase 5: Testing (Week 7)
**Estimated Time:** 5-7 days

#### Task 5.1: Unit Tests
Create unit tests in `tests/Unit/Modules/USG/`:

- [ ] Test model methods and relationships
- [ ] Test service class logic
- [ ] Test validation rules
- [ ] Test file upload handling

**Commands:**
```bash
php artisan make:test --unit Modules/USG/Models/AnnouncementTest --pest --no-interaction
php artisan make:test --unit Modules/USG/Services/AnnouncementServiceTest --pest --no-interaction
```

#### Task 5.2: Feature Tests
Create feature tests in `tests/Feature/Modules/USG/`:

- [ ] Test public routes (VMGO, Officers, Announcements, Events, Resolutions)
- [ ] Test admin CRUD operations
- [ ] Test authentication/authorization
- [ ] Test file uploads
- [ ] Test search functionality
- [ ] Test approval workflow

**Commands:**
```bash
php artisan make:test Modules/USG/PublicAnnouncementTest --pest --no-interaction
php artisan make:test Modules/USG/Admin/AnnouncementManagementTest --pest --no-interaction
```

**Important:**
- Use factories for test data
- Test both happy paths AND failure paths
- Aim for 80%+ code coverage
- Run specific tests after changes: `php artisan test --filter=AnnouncementTest`

#### Task 5.3: Run All Tests
Before finalizing:
```bash
php artisan test
vendor/bin/pint --dirty
```

---

### Phase 6: Documentation & Deployment (Week 8)
**Estimated Time:** 5-7 days

#### Task 6.1: Code Documentation
- [ ] Add PHPDoc blocks to all public methods
- [ ] Document complex logic with inline comments
- [ ] Update module README if needed

#### Task 6.2: User Documentation
- [ ] Create admin user guide for content management
- [ ] Document how to add officers
- [ ] Document how to publish announcements
- [ ] Document approval workflow

#### Task 6.3: Deployment Checklist
- [ ] Run migrations on production
- [ ] Run seeders for initial data
- [ ] Create storage symlink
- [ ] Set proper file permissions
- [ ] Configure environment variables
- [ ] Build frontend assets: `npm run build`
- [ ] Clear caches: `php artisan optimize:clear`

---

## Development Guidelines

### Code Standards
1. **Follow Laravel Boost Guidelines** - See `.github/copilot-instructions.md`
2. **Use Artisan Commands** - Always use `php artisan make:` commands
3. **Keep Controllers Thin** - Business logic goes in Service classes
4. **Form Requests** - Use Form Request classes for validation, not inline validation
5. **Type Hints** - Always use explicit return types and parameter types
6. **Factories & Seeders** - Create factories for all models
7. **Named Routes** - Use named routes: `route('usg.announcements.index')`

### Frontend Standards
1. **React + Inertia** - Use Inertia's `<Link>` and `<Form>` components
2. **Tailwind CSS v4** - Follow v4 syntax (no deprecated utilities)
3. **shadcn/ui** - Use existing components before creating custom ones
4. **Dark Mode** - Support dark mode with `dark:` classes
5. **Responsive** - Mobile-first responsive design

### Testing Standards
1. **Pest** - All tests use Pest syntax
2. **Factories** - Use factories in tests, not manual model creation
3. **Coverage** - Aim for 80%+ code coverage
4. **Run Tests** - Run tests after every change: `php artisan test --filter=YourTest`

### Git Workflow
1. **Branch Naming** - Use: `feature/usg-module-{feature-name}`
2. **Commits** - Clear, descriptive commit messages
3. **Pull Requests** - Create PR when phase is complete
4. **Code Review** - Request review before merging

---

## Checklist Summary

### Week 1: Foundation
- [ ] All migrations created and tested
- [ ] All models created with relationships
- [ ] Factories and seeders working
- [ ] Database schema matches SRS

### Week 2: Backend
- [ ] All Form Requests created
- [ ] All Service classes implemented
- [ ] All Controllers created (Public + Admin)
- [ ] Routes defined and working

### Week 3-4: Frontend
- [ ] All public pages created and functional
- [ ] All admin pages created and functional
- [ ] Reusable components created
- [ ] UI matches design requirements

### Week 5-6: Features
- [ ] Search functionality working
- [ ] File uploads working
- [ ] Approval workflow implemented
- [ ] Auto-archiving working
- [ ] Dashboard with statistics

### Week 7: Testing
- [ ] Unit tests written and passing
- [ ] Feature tests written and passing
- [ ] Code coverage > 80%
- [ ] All tests passing: `php artisan test`

### Week 8: Finalization
- [ ] Code formatted: `vendor/bin/pint`
- [ ] Documentation complete
- [ ] Deployment checklist completed
- [ ] User acceptance testing passed

---

## Resources & Support

### Documentation
- Laravel 12: Use `search-docs` tool in Copilot
- Inertia.js: Use `search-docs` tool in Copilot
- React 19: https://react.dev
- Tailwind CSS v4: Use `search-docs` tool in Copilot
- shadcn/ui: Check `components.json` and use MCP tools

### Getting Help
1. Use GitHub Copilot with Laravel Boost for guidance
2. Check existing modules (Guidance, Registrar, SAS) for patterns
3. Review `.github/copilot-instructions.md` for conventions
4. Ask team lead for clarification on requirements

### Tools to Use
- **Laravel Boost MCP**: Database queries, Artisan commands, docs search, tinker
- **Pylance MCP**: Python environment (if needed)
- **shadcn MCP**: Component search and examples

---

## Success Criteria

Your implementation will be considered complete when:

✅ All functional requirements from SRS are implemented  
✅ All public users can view USG information  
✅ USG Officers can create and manage content  
✅ Administrators can approve content  
✅ Search returns accurate results  
✅ File uploads work correctly  
✅ All pages are responsive and support dark mode  
✅ Tests pass with >80% coverage  
✅ Code passes Pint formatting  
✅ User documentation is complete  

---

## Timeline

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1 | Database & Models | Migrations, Models, Factories, Seeders |
| 2 | Backend | Form Requests, Services, Controllers, Routes |
| 3-4 | Frontend | Public Pages, Admin Pages, Components |
| 5-6 | Features | Search, Upload, Workflow, Dashboard |
| 7 | Testing | Unit Tests, Feature Tests |
| 8 | Deployment | Documentation, Production Setup |

---

**Good luck, John Paul! 🚀**

If you have questions or need clarification, please reach out. Remember to commit frequently and create pull requests at the end of each phase for review.
