# MinSU BC Systems - Monorepo Modular Architecture

**Project:** Mindoro State University Bongabong Campus Systems  
**Architecture Type:** Monorepo Modular Monolith  
**Version:** 1.0  
**Last Updated:** October 11, 2025

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Modular Structure](#modular-structure)
3. [Module Anatomy](#module-anatomy)
4. [Shared Infrastructure](#shared-infrastructure)
5. [Module Communication](#module-communication)
6. [Naming Conventions](#naming-conventions)
7. [Development Workflow](#development-workflow)
8. [Best Practices](#best-practices)
9. [Module Implementation Guide](#module-implementation-guide)

---

## Architecture Overview

### What is Monorepo Modular Architecture?

The MinSU BC Systems employs a **Monorepo Modular Monolith** architecture, which combines:

- **Monorepo:** All code lives in a single repository
- **Modular:** Code is organized into independent, self-contained modules
- **Monolith:** Modules share the same runtime, database, and deployment

This approach provides:
- ✅ **Domain Separation:** Each university department has its own isolated module
- ✅ **Code Reusability:** Shared infrastructure and components across modules
- ✅ **Simplified Development:** Single codebase, unified tooling, and deployment
- ✅ **Gradual Migration Path:** Can evolve to microservices if needed
- ✅ **Team Independence:** Different teams can work on different modules

### Architecture Diagram

```
minsubc-systems/ (Monorepo Root)
│
├── app/
│   ├── Models/              ← Shared Models
│   ├── Providers/           ← Shared Service Providers
│   ├── Services/            ← Shared Services
│   └── Modules/             ← MODULE BOUNDARY
│       ├── Registrar/       ← Module 1 (Document Request System)
│       ├── USG/             ← Module 2 (Transparency Portal)
│       ├── Guidance/        ← Module 3 (Student Guidance)
│       └── SAS/             ← Module 4 (Student Affairs)
│
├── resources/js/
│   ├── components/          ← Shared UI Components
│   ├── layouts/             ← Shared Layouts
│   ├── lib/                 ← Shared Utilities
│   └── pages/               ← MODULE FRONTEND BOUNDARY
│       ├── registrar/       ← Module 1 Frontend
│       ├── usg/             ← Module 2 Frontend
│       ├── guidance/        ← Module 3 Frontend
│       └── sas/             ← Module 4 Frontend
│
├── database/
│   └── migrations/          ← Shared Migrations (All Modules)
│
└── routes/
    └── web.php              ← Includes Module Routes
```

---

## Modular Structure

### Current Modules

| Module | Status | Purpose | Domain |
|--------|--------|---------|--------|
| **Registrar** | ✅ Active | Document Request System (DRS) | Academic records, transcripts, certificates |
| **USG** | 📋 Planned | University Student Government Transparency Portal | Budget, projects, meetings, documents |
| **Guidance** | 🔜 Pending | Student Guidance Services | Counseling, career guidance, personal development |
| **SAS** | 🔜 Pending | Student Affairs Services | Organizations, events, scholarships |

### Module Directory Structure

Each module follows a consistent structure:

```
app/Modules/{ModuleName}/
├── Http/
│   ├── Controllers/         ← Module-specific controllers
│   │   ├── Controller.php   ← Base controller for module
│   │   └── ...Controller.php
│   ├── Middleware/          ← Module-specific middleware
│   │   └── ...Middleware.php
│   └── Requests/            ← Form request validation classes
│       └── ...Request.php
├── Models/                  ← Module-specific models
│   └── ...Model.php
├── Services/                ← Module-specific business logic
│   └── ...Service.php
├── Policies/                ← Authorization policies (optional)
│   └── ...Policy.php
├── Jobs/                    ← Queue jobs (optional)
│   └── ...Job.php
├── Events/                  ← Domain events (optional)
│   └── ...Event.php
├── Listeners/               ← Event listeners (optional)
│   └── ...Listener.php
└── routes.php               ← Module route definitions
```

### Frontend Module Structure

```
resources/js/pages/{module-name}/
├── index.tsx                ← Module landing page
├── dashboard.tsx            ← Module dashboard
├── {feature}/               ← Feature-specific pages
│   ├── index.tsx            ← List/index page
│   ├── create.tsx           ← Create page
│   ├── edit.tsx             ← Edit page
│   └── show.tsx             ← Detail page
└── components/              ← Module-specific components
    └── ...Component.tsx
```

---

## Module Anatomy

### Example: Registrar Module

#### Backend Structure

```
app/Modules/Registrar/
├── Http/
│   ├── Controllers/
│   │   ├── Controller.php                 ← Base controller
│   │   ├── DocumentRequestController.php  ← Handles document requests
│   │   ├── PaymentController.php          ← Payment processing
│   │   ├── AdminController.php            ← Admin operations
│   │   └── StudentController.php          ← Student management
│   ├── Middleware/
│   │   └── (module-specific middleware)
│   └── Requests/
│       ├── DocumentRequestRequest.php
│       └── PaymentRequest.php
├── Models/
│   ├── Student.php                        ← Student model
│   ├── DocumentRequest.php                ← Document request model
│   ├── Payment.php                        ← Payment model
│   ├── Notification.php                   ← Notification model
│   └── AuditLog.php                       ← Audit log model
├── Services/
│   ├── DocumentGenerator.php              ← PDF generation
│   ├── PaymentService.php                 ← Payment processing logic
│   └── NotificationService.php            ← Notification handling
└── routes.php                             ← Module routes
```

#### Frontend Structure

```
resources/js/pages/registrar/
├── document-requests/
│   ├── index.tsx              ← List all requests
│   ├── create.tsx             ← Create new request
│   ├── show.tsx               ← View request details
│   └── edit.tsx               ← Edit request
├── payments/
│   ├── method.tsx             ← Payment method selection
│   ├── cash-reference.tsx     ← Cash payment reference
│   └── status.tsx             ← Payment status
├── admin/
│   ├── dashboard.tsx          ← Admin dashboard
│   ├── queue.tsx              ← Processing queue
│   └── audit-logs.tsx         ← Audit logs
└── cashier/
    ├── dashboard.tsx          ← Cashier dashboard
    └── verify-payment.tsx     ← Payment verification
```

---

## Shared Infrastructure

### Shared Components

All modules have access to shared infrastructure:

#### 1. Shared Models (`app/Models/`)
- `User.php` - Base user authentication model
- `AuditLog.php` - System-wide audit logging
- `SystemSetting.php` - Application configuration
- `PaymentWebhook.php` - Payment webhook tracking

#### 2. Shared Services (`app/Services/`)
- Authentication services
- Authorization services
- Notification services (email, SMS)
- File upload services
- Audit logging services

#### 3. Shared Providers (`app/Providers/`)
- `AppServiceProvider.php` - Application bootstrapping
- `FortifyServiceProvider.php` - Authentication configuration
- `RoleEventServiceProvider.php` - Role-based event handling

#### 4. Shared UI Components (`resources/js/components/`)

**Layout Components:**
- `app-shell.tsx` - Main application shell
- `app-sidebar.tsx` - Sidebar navigation
- `app-header.tsx` - Header with user menu
- `breadcrumbs.tsx` - Breadcrumb navigation

**Form Components:**
- `input-error.tsx` - Form validation errors
- Various Shadcn UI components

**Data Components:**
- `data-table.tsx` - Reusable data table
- `user-info.tsx` - User information display

**UI Components (Shadcn):**
- `ui/button.tsx`, `ui/input.tsx`, `ui/select.tsx`
- `ui/dialog.tsx`, `ui/alert.tsx`, `ui/card.tsx`
- `ui/badge.tsx`, `ui/avatar.tsx`, `ui/separator.tsx`
- And 400+ more from Shadcn registry

#### 5. Shared Utilities (`resources/js/lib/`)
- `utils.ts` - Helper functions (cn, formatters, etc.)

#### 6. Shared Database (`database/migrations/`)
- All module migrations in one place
- Shared tables: `users`, `cache`, `jobs`, `sessions`
- Module-specific tables with prefixes (e.g., `usg_budgets`, `students`)

---

## Module Communication

### 1. Direct Model Relationships

Modules can reference each other through Eloquent relationships:

```php
// In Registrar Module - Student.php
namespace App\Modules\Registrar\Models;

class Student extends Model
{
    // Relationship to shared User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
```

### 2. Events and Listeners

Modules communicate through Laravel events:

```php
// Registrar module fires event
event(new DocumentRequestCreated($documentRequest));

// USG module listens to event (if needed)
class UpdateTransparencyLog
{
    public function handle(DocumentRequestCreated $event)
    {
        // Update transparency records
    }
}
```

### 3. Service Layer

Shared services can be used across modules:

```php
// In any module
use App\Services\NotificationService;

class SomeController extends Controller
{
    public function __construct(private NotificationService $notifications)
    {
    }
    
    public function someMethod()
    {
        $this->notifications->send($user, 'Message');
    }
}
```

### 4. Shared Database Tables

Modules share common tables:
- `users` - All user accounts
- `permissions` and `roles` - Authorization
- `audit_logs` - System-wide audit trail

---

## Naming Conventions

### Backend Conventions

#### 1. Namespaces
```php
// Module namespace pattern
App\Modules\{ModuleName}\{Layer}\{ClassName}

// Examples:
App\Modules\Registrar\Models\DocumentRequest
App\Modules\USG\Http\Controllers\BudgetController
App\Modules\Guidance\Services\CounselingService
```

#### 2. Route Names
```php
// Pattern: {module}.{resource}.{action}
registrar.document-requests.index
registrar.document-requests.create
registrar.document-requests.store
registrar.payments.method
usg.transparency.budgets.index
usg.transparency.projects.show
```

#### 3. Database Tables
```php
// Shared tables (no prefix)
users
permissions
roles
cache
jobs

// Module-specific tables (module prefix)
students                    // Registrar module
document_requests          // Registrar module
payments                   // Registrar module
usg_budgets               // USG module
usg_transactions          // USG module
usg_projects              // USG module
guidance_appointments     // Guidance module (future)
```

#### 4. Model Names
```php
// Module models live in module namespace
App\Modules\Registrar\Models\Student
App\Modules\Registrar\Models\DocumentRequest
App\Modules\USG\Models\Budget
App\Modules\USG\Models\Project
```

### Frontend Conventions

#### 1. Page Component Paths
```tsx
// Pattern: resources/js/pages/{module}/{feature}/{action}.tsx
resources/js/pages/registrar/document-requests/index.tsx
resources/js/pages/registrar/document-requests/create.tsx
resources/js/pages/usg/transparency/dashboard.tsx
resources/js/pages/usg/transparency/budgets.tsx
```

#### 2. Component Names
```tsx
// Shared components (PascalCase)
AppShell, AppSidebar, AppHeader, DataTable

// Module-specific components
DocumentRequestCard
PaymentStatusBadge
BudgetChart
ProjectTimeline
```

#### 3. Route Helpers (Inertia)
```tsx
// Use route() helper with module prefix
route('registrar.document-requests.index')
route('registrar.payments.method', documentRequest.id)
route('usg.transparency.projects.show', project.slug)
```

---

## Development Workflow

### Adding a New Module

#### Step 1: Create Module Directory Structure

```bash
# Create backend structure
mkdir -p app/Modules/NewModule/Http/Controllers
mkdir -p app/Modules/NewModule/Http/Middleware
mkdir -p app/Modules/NewModule/Http/Requests
mkdir -p app/Modules/NewModule/Models
mkdir -p app/Modules/NewModule/Services

# Create frontend structure
mkdir -p resources/js/pages/new-module
```

#### Step 2: Create Base Controller

```php
<?php
// app/Modules/NewModule/Http/Controllers/Controller.php

namespace App\Modules\NewModule\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
```

#### Step 3: Create Module Routes

```php
<?php
// app/Modules/NewModule/routes.php

use App\Modules\NewModule\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('new-module', [MainController::class, 'index'])
        ->name('new-module.index');
    
    // Add more routes...
});
```

#### Step 4: Register Routes in Main Route File

```php
// routes/web.php

// At the end of file
require __DIR__.'/../app/Modules/NewModule/routes.php';
```

#### Step 5: Create Migrations

```bash
php artisan make:migration create_new_module_table
```

#### Step 6: Create Models

```php
<?php
// app/Modules/NewModule/Models/Item.php

namespace App\Modules\NewModule\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'new_module_items';
    
    protected $fillable = [
        'name',
        'description',
    ];
}
```

#### Step 7: Create Frontend Pages

```tsx
// resources/js/pages/new-module/index.tsx

import { Head } from '@inertiajs/react';
import AppShell from '@/components/app-shell';

export default function Index() {
    return (
        <AppShell>
            <Head title="New Module" />
            <div>
                <h1>New Module</h1>
            </div>
        </AppShell>
    );
}
```

#### Step 8: Update Navigation

Add module to sidebar navigation in `resources/js/components/nav-main.tsx`

---

## Best Practices

### 1. Module Independence

✅ **DO:**
- Keep module-specific logic within the module
- Use clear module boundaries
- Create module-specific services
- Use events for cross-module communication

❌ **DON'T:**
- Directly import controllers from other modules
- Create tight coupling between modules
- Mix module concerns

### 2. Shared Code

✅ **DO:**
- Use shared components for common UI elements
- Create shared services for cross-cutting concerns
- Leverage shared models for authentication and authorization
- Use shared utilities for common operations

❌ **DON'T:**
- Duplicate code across modules
- Create module-specific versions of shared functionality

### 3. Database Design

✅ **DO:**
- Prefix module tables with module name (e.g., `usg_budgets`)
- Use shared tables for authentication (`users`, `roles`, `permissions`)
- Create proper foreign key relationships
- Use migrations for all database changes

❌ **DON'T:**
- Create duplicate user tables per module
- Use different authentication systems per module
- Skip migrations and modify database directly

### 4. Routing

✅ **DO:**
- Use consistent route naming: `{module}.{resource}.{action}`
- Group routes by permission/role
- Apply appropriate middleware
- Keep module routes in module `routes.php`

❌ **DON'T:**
- Mix module routes without clear separation
- Forget to apply authentication middleware
- Use inconsistent naming patterns

### 5. Frontend Organization

✅ **DO:**
- Organize pages by module in `resources/js/pages/{module}/`
- Use shared components from `resources/js/components/`
- Create module-specific components in module folder
- Use consistent component naming

❌ **DON'T:**
- Mix module pages without structure
- Duplicate shared components
- Create inconsistent file structures

### 6. Testing

✅ **DO:**
- Write tests for each module
- Test module integration points
- Use feature tests for workflows
- Test shared components separately

❌ **DON'T:**
- Skip testing cross-module interactions
- Forget to test authorization

---

## Module Implementation Guide

### Registrar Module (Implemented)

**Purpose:** Document Request System for academic records

**Key Features:**
- Document request submission (COE, TOR, Grades, etc.)
- Payment processing (digital via PayMongo, cash at counter)
- Admin processing queue
- Cashier payment verification
- Document generation with QR verification

**Routes:** All prefixed with `registrar.`
- `registrar.document-requests.*` - Student document requests
- `registrar.payments.*` - Payment processing
- `registrar.cashier.*` - Cashier portal
- `registrar.admin.*` - Admin dashboard
- `registrar.students.*` - Student management

**Database Tables:**
- `students`
- `document_requests`
- `payments`
- `notifications`
- `audit_logs`
- `payment_webhooks`
- `system_settings`

### USG Module (Planned)

**Purpose:** University Student Government Transparency Portal

**Key Features:**
- Financial transparency (budgets, transactions)
- Document repository
- Meeting records and minutes
- Project tracking
- Public engagement (feedback, FOI requests)
- Performance analytics

**Routes:** All prefixed with `usg.transparency.`
- `usg.transparency.budgets.*`
- `usg.transparency.transactions.*`
- `usg.transparency.projects.*`
- `usg.transparency.meetings.*`
- `usg.transparency.documents.*`

**Database Tables (Planned):**
- `usg_budgets`
- `usg_transactions`
- `usg_projects`
- `usg_project_milestones`
- `usg_project_updates`
- `usg_meetings`
- `usg_meeting_attendees`
- `usg_meeting_resolutions`
- `usg_documents`
- `usg_document_categories`
- `usg_public_feedback`
- `usg_foi_requests`
- `usg_announcements`
- `usg_performance_metrics`

### Guidance Module (Pending)

**Purpose:** Student Guidance and Counseling Services

**Potential Features:**
- Appointment scheduling
- Counseling records (confidential)
- Career guidance resources
- Psychological assessments
- Referral system

### SAS Module (Pending)

**Purpose:** Student Affairs Services

**Potential Features:**
- Student organization management
- Event management and registration
- Scholarship applications
- Student conduct records
- Campus life resources

---

## Benefits of This Architecture

### For Development

1. **Team Scalability:** Different teams can work on different modules independently
2. **Clear Boundaries:** Each module has well-defined responsibilities
3. **Code Reusability:** Shared components, services, and infrastructure
4. **Easier Onboarding:** New developers can focus on one module at a time
5. **Consistent Patterns:** All modules follow the same structure

### For Deployment

1. **Single Deployment:** One application to deploy and maintain
2. **Shared Resources:** Single database, cache, and queue system
3. **Simplified DevOps:** One CI/CD pipeline
4. **Easier Monitoring:** Centralized logging and monitoring

### For Maintenance

1. **Isolated Changes:** Changes to one module don't affect others
2. **Incremental Updates:** Update modules independently
3. **Easier Testing:** Test modules in isolation
4. **Clear Ownership:** Each module can have a dedicated owner/team

### For Future Growth

1. **Microservices Ready:** Can extract modules to separate services if needed
2. **Feature Flags:** Can enable/disable modules per campus or deployment
3. **White-Label Ready:** Can customize modules for different campuses
4. **Progressive Enhancement:** Add new modules without disrupting existing ones

---

## Migration from Traditional Monolith

If this were a traditional monolith, you would have:
- All controllers in `app/Http/Controllers/`
- All models in `app/Models/`
- Mixed concerns and tight coupling
- Difficult to scale teams

With our modular approach:
- Clear module boundaries
- Self-contained functionality
- Easy to understand and navigate
- Team independence
- Future-proof architecture

---

## Autoloading Configuration

The application uses PSR-4 autoloading defined in `composer.json`:

```json
"autoload": {
    "psr-4": {
        "App\\": "app/",
        "Database\\Factories\\": "database/factories/",
        "Database\\Seeders\\": "database/seeders/"
    }
}
```

This allows modules to be autoloaded under the `App\Modules\` namespace without additional configuration.

---

## Conclusion

The MinSU BC Systems Monorepo Modular Architecture provides a scalable, maintainable, and team-friendly structure for building integrated university systems. Each module represents a distinct university department or function while sharing common infrastructure and following consistent patterns.

This architecture enables:
- **Independent module development** with clear boundaries
- **Code sharing** through common components and services
- **Gradual implementation** of new modules
- **Team scalability** with module ownership
- **Future flexibility** to evolve architecture as needed

---

**Document Version:** 1.0  
**Last Updated:** October 11, 2025  
**Maintained By:** Development Team  
**Review Cycle:** Quarterly

---
