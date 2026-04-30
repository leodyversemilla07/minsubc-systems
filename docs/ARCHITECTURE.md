# MinSU BC Systems - Architecture Documentation

**Project:** Mindoro State University Bongabong Campus Systems  
**Architecture Type:** Monorepo Modular Monolith (Laravel Modules)  
**Version:** 3.0  
**Last Updated:** April 30, 2026  
**Module Package:** nwidart/laravel-modules v13.0.0

> **Complete architecture documentation** - includes system architecture, directory structure, and database organization.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Directory Structure](#directory-structure)
- [Modular Structure](#modular-structure)
- [Module Anatomy](#module-anatomy)
- [Database Organization](#database-organization)
- [Shared Infrastructure](#shared-infrastructure)
- [Module Communication](#module-communication)
- [Naming Conventions](#naming-conventions)
- [Development Workflow](#development-workflow)
- [Best Practices](#best-practices)
- [Module Implementation Guide](#module-implementation-guide)

---

## Architecture Overview

### What is Monorepo Modular Architecture?

The MinSU BC Systems employs a **Monorepo Modular Monolith** architecture using the industry-standard **Laravel Modules** package ([nwidart/laravel-modules](https://nwidartc.com/laravel-modules)), which combines:

- **Monorepo:** All code lives in a single repository
- **Modular:** Code is organized into independent, self-contained modules using Laravel Modules
- **Monolith:** Modules share the same runtime, database, and deployment
- **Standards-Based:** Uses the widely-adopted nwidart/laravel-modules package

### Why This Architecture?

✅ **Domain Separation:** Each university department has its own isolated module  
✅ **Code Reusability:** Shared infrastructure and components across modules  
✅ **Simplified Development:** Single codebase, unified tooling, and deployment  
✅ **Gradual Migration Path:** Can evolve to microservices if needed  
✅ **Team Independence:** Different teams can work on different modules  
✅ **Industry Standards:** Follows Laravel 13 best practices  
✅ **Auto-Discovery:** Modules are automatically registered and loaded

### Architecture Diagram

```
minsubc-systems/ (Monorepo Root)
│
├── Modules/                 ← LARAVEL MODULES (Root Level)
│   ├── Registrar/           ← Module 1 (Document Request System)
│   │   ├── app/             ← Module application code
│   │   ├── config/          ← Module configuration
│   │   ├── database/        ← Module migrations, seeds, factories
│   │   ├── routes/          ← Module routes (auto-registered)
│   │   ├── resources/       ← Module resources (views, assets)
│   │   ├── tests/           ← Module tests
│   │   ├── composer.json    ← Module dependencies
│   │   └── module.json      ← Module metadata
│   │
│   ├── USG/                 ← Module 2 (Transparency Portal)
│   │   └── (same structure)
│   │
│   └── SAS/                 ← Module 3 (Student Affairs)
│       └── (same structure)
│
├── app/
│   ├── Models/              ← Shared Models
│   ├── Providers/           ← Shared Service Providers
│   └── Services/            ← Shared Services
│
├── resources/js/
│   ├── components/          ← Shared UI Components
│   ├── layouts/             ← Shared Layouts
│   ├── lib/                 ← Shared Utilities
│   └── pages/               ← MODULE FRONTEND BOUNDARY
│       ├── registrar/       ← Module 1 Frontend
│       ├── usg/             ← Module 2 Frontend
│       └── sas/             ← Module 3 Frontend
│
├── database/
│   └── migrations/          ← Shared Migrations
│
├── routes/
│   └── web.php              ← Main routes (modules auto-register)
│
├── config/
│   └── modules.php          ← Laravel Modules configuration
│
└── composer.json            ← Includes merge-plugin for modules
```

---

## Directory Structure

### Complete Project Structure

```
minsubc-systems/
├── Modules/                 ← MODULES (Root Level)
│   ├── Registrar/
│   │   ├── app/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Middleware/
│   │   │   │   └── Requests/
│   │   │   ├── Models/
│   │   │   ├── Services/
│   │   │   ├── Policies/
│   │   │   ├── Jobs/
│   │   │   ├── Events/
│   │   │   ├── Listeners/
│   │   │   └── Providers/
│   │   ├── config/
│   │   │   └── config.php
│   │   ├── database/
│   │   │   ├── Factories/
│   │   │   ├── Migrations/
│   │   │   └── Seeders/
│   │   ├── routes/
│   │   │   ├── web.php
│   │   │   ├── api.php
│   │   │   └── channels.php
│   │   ├── resources/
│   │   │   ├── views/
│   │   │   └── lang/
│   │   ├── tests/
│   │   │   ├── Feature/
│   │   │   └── Unit/
│   │   ├── composer.json
│   │   └── module.json
│   │
│   ├── USG/
│   │   └── (same structure)
│   │
│   └── SAS/
│       └── (same structure)
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   │   └── ResolveCampus.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── AuditLog.php
│   │   ├── PaymentWebhook.php
│   │   └── SystemSetting.php
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── FortifyServiceProvider.php
│
├── bootstrap/
│   ├── app.php
│   └── providers.php
│
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   ├── modules.php          ← Laravel Modules config
│   └── (other configs)
│
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   ├── AuditLogFactory.php
│   │   └── SystemSettingFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   └── (other core migrations)
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── RolesAndPermissionsSeeder.php
│       └── UserSeeder.php
│
├── public/
│   ├── index.php
│   ├── robots.txt
│   └── build/
│
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── app.tsx
│   │   ├── components/      ← Shared UI components
│   │   │   ├── app-shell.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── app-header.tsx
│   │   │   └── ui/          ← Shadcn UI components
│   │   ├── layouts/
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   └── pages/           ← MODULE FRONTEND
│   │       ├── auth/
│   │       ├── dashboard.tsx
│   │       ├── registrar/
│   │       ├── usg/
│   │       ├── sas/
│   │       └── settings/
│   └── views/
│       └── app.blade.php
│
├── routes/
│   ├── auth.php
│   ├── console.php
│   ├── settings.php
│   └── web.php
│
├── storage/
│   ├── app/
│   ├── framework/
│   └── logs/
│
├── tests/
│   ├── Feature/
│   │   ├── Auth/
│   │   ├── RBAC/
│   │   └── Settings/
│   ├── Unit/
│   ├── Pest.php
│   └── TestCase.php
│
├── vendor/
│
├── .env
├── .env.example
├── .gitignore
├── artisan
├── boost.json
├── components.json
├── composer.json
├── composer.lock
├── eslint.config.js
├── package.json
├── phpunit.xml
├── README.md
├── tsconfig.json
└── vite.config.ts
```

### Key Directories Explained

**`Modules/`** - All module code (backend + tests)  
**`app/`** - Shared application code (models, services, providers)  
**`resources/js/pages/{module}/`** - Frontend pages organized by module  
**`resources/js/components/`** - Shared UI components  
**`database/`** - Core/shared database resources only  
**`tests/`** - Core/shared tests only  
**`config/`** - Application configuration  
**`routes/`** - Core routes (modules auto-register their own)

---

## Modular Structure

### Current Modules

| Module | Status | Purpose | Domain |
|--------|--------|---------|--------|
| **Registrar** | ✅ Active | Document Request System (DRS) | Academic records, transcripts, certificates |
| **USG** | ✅ Active | University Student Government Transparency Portal | Budget, projects, meetings, documents |
| **SAS** | ✅ Active | Student Affairs Services | Organizations, events, scholarships, insurance |

### Module Directory Structure

Each module follows the **Laravel Modules** standard structure:

```
Modules/{ModuleName}/
├── app/                     ← Module application code
│   ├── Http/
│   │   ├── Controllers/     ← Module-specific controllers
│   │   │   ├── Controller.php   ← Base controller for module
│   │   │   └── ...Controller.php
│   │   ├── Middleware/      ← Module-specific middleware
│   │   │   └── ...Middleware.php
│   │   └── Requests/        ← Form request validation classes
│   │       └── ...Request.php
│   ├── Models/              ← Module-specific models
│   │   └── ...Model.php
│   ├── Services/            ← Module-specific business logic
│   │   └── ...Service.php
│   ├── Policies/            ← Authorization policies (optional)
│   │   └── ...Policy.php
│   ├── Jobs/                ← Queue jobs (optional)
│   │   └── ...Job.php
│   ├── Events/              ← Domain events (optional)
│   │   └── ...Event.php
│   ├── Listeners/           ← Event listeners (optional)
│   │   └── ...Listener.php
│   └── Providers/           ← Module service providers
│       └── {ModuleName}ServiceProvider.php
│
├── config/                  ← Module configuration files
│   └── config.php
│
├── database/                ← Module database files
│   ├── Factories/           ← Eloquent factories
│   ├── Migrations/          ← Database migrations
│   └── Seeders/             ← Database seeders
│       └── {ModuleName}DatabaseSeeder.php
│
├── routes/                  ← Module routes (auto-registered)
│   ├── web.php              ← Web routes
│   ├── api.php              ← API routes
│   └── channels.php         ← Broadcast channels
│
├── resources/               ← Module resources
│   ├── views/               ← Blade views (if needed)
│   └── lang/                ← Translations
│
├── tests/                   ← Module tests
│   ├── Feature/
│   └── Unit/
│
├── composer.json            ← Module-specific dependencies
└── module.json              ← Module metadata and configuration
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
Modules/Registrar/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php
│   │   │   ├── DocumentRequestController.php
│   │   │   ├── PaymentController.php
│   │   │   ├── AdminController.php
│   │   │   └── StudentController.php
│   │   ├── Middleware/
│   │   │   └── (module-specific middleware)
│   │   └── Requests/
│   │       ├── DocumentRequestRequest.php
│   │       └── PaymentRequest.php
│   ├── Models/
│   │   ├── Student.php
│   │   ├── DocumentRequest.php
│   │   ├── Payment.php
│   │   └── Notification.php
│   ├── Services/
│   │   ├── PaymentService.php
│   │   └── NotificationService.php
│   └── Providers/
│       └── RegistrarServiceProvider.php
│
├── database/
│   ├── Factories/
│   │   ├── StudentFactory.php
│   │   ├── DocumentRequestFactory.php
│   │   ├── PaymentFactory.php
│   │   └── NotificationFactory.php
│   ├── Migrations/
│   │   ├── create_students_table.php
│   │   ├── create_document_requests_table.php
│   │   ├── create_payments_table.php
│   │   └── create_notifications_table.php
│   └── Seeders/
│       └── (seeders as needed)
│
├── routes/
│   └── web.php
│
└── tests/
    └── Feature/
        ├── DocumentRequestTest.php
        └── PaymentTest.php
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

## Database Organization

### Core Database (Shared Infrastructure)

**Location:** `database/`

```
database/
├── factories/
│   ├── UserFactory.php              ← Authentication
│   ├── AuditLogFactory.php          ← Audit trail
│   └── SystemSettingFactory.php     ← App settings
│
├── migrations/
│   ├── 0001_01_01_000000_create_users_table.php
│   ├── 0001_01_01_000001_create_cache_table.php
│   ├── 0001_01_01_000002_create_jobs_table.php
│   ├── create_permission_tables.php
│   ├── create_audit_logs_table.php
│   └── create_system_settings_table.php
│
└── seeders/
    ├── DatabaseSeeder.php           ← Main orchestrator
    ├── RolesAndPermissionsSeeder.php
    └── UserSeeder.php
```

**Purpose:** ONLY shared/cross-cutting concerns

### Module Databases (Self-Contained)

Each module contains its own database resources:

**SAS Module:**
```
Modules/SAS/database/
├── Factories/        (12 factories)
│   ├── ScholarshipFactory.php
│   ├── InsuranceFactory.php
│   ├── OrganizationFactory.php
│   └── (9 more)
│
├── Migrations/       (14 migrations)
│   ├── create_scholarships_table.php
│   ├── create_insurances_table.php
│   ├── create_organizations_table.php
│   └── (11 more)
│
└── Seeders/          (7 seeders)
    ├── SASDatabaseSeeder.php    ← Module orchestrator
    ├── ScholarshipSeeder.php
    ├── InsuranceSeeder.php
    └── (4 more)
```

**USG Module:**
```
Modules/USG/database/
├── Factories/        (8 factories)
├── Migrations/       (7 migrations)
└── Seeders/          (8 seeders including orchestrator)
```

**Registrar Module:**
```
Modules/Registrar/database/
├── Factories/        (4 factories)
├── Migrations/       (5 migrations)
└── Seeders/          (as needed)
```

### Database Modularization Achievements

✅ **27 factories** moved from central location to modules  
✅ **25 duplicate migrations** removed from central location  
✅ **13 seeders** moved from central location to modules  
✅ **Namespace standardization** (Database\Seeders → Modules\*\Database\Seeders)  
✅ **Module orchestrators** created for organized seeding

### Database Table Organization

#### Shared Tables (No Prefix)
```
users
permissions
roles
cache
jobs
audit_logs
system_settings
```

#### Module-Specific Tables (Module Prefix)
```
# Registrar
students
document_requests
payments
notifications

# USG
usg_budgets
usg_transactions
usg_projects
usg_meetings
usg_documents

# SAS
scholarships
scholarship_recipients
insurances
insurance_records
organizations
organization_members
```

---

## Shared Infrastructure

### 1. Shared Models (`app/Models/`)
- `User.php` - Base user authentication model
- `AuditLog.php` - System-wide audit logging
- `SystemSetting.php` - Application configuration
- `PaymentWebhook.php` - Payment webhook tracking

### 2. Shared Services (`app/Services/`)
- Authentication services
- Authorization services
- Notification services (email, SMS)
- File upload services
- Audit logging services

### 3. Shared Providers (`app/Providers/`)
- `AppServiceProvider.php` - Application bootstrapping
- `FortifyServiceProvider.php` - Authentication configuration
- `RoleEventServiceProvider.php` - Role-based event handling

### 4. Shared UI Components (`resources/js/components/`)

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
- 40+ UI components from Shadcn registry

### 5. Shared Utilities (`resources/js/lib/`)
- `utils.ts` - Helper functions (cn, formatters, etc.)

---

## Module Communication

### 1. Direct Model Relationships

Modules can reference shared models through Eloquent relationships:

```php
// In Registrar Module - Student.php
namespace Modules\Registrar\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

---

## Naming Conventions

### Backend Conventions

#### 1. Namespaces
```php
// Module namespace pattern (Laravel Modules)
Modules\{ModuleName}\{Layer}\{ClassName}

// Examples:
Modules\Registrar\Models\DocumentRequest
Modules\USG\Http\Controllers\BudgetController
Modules\SAS\Services\ScholarshipService
```

#### 2. Route Names
```php
// Pattern: {module}.{resource}.{action}
registrar.document-requests.index
registrar.document-requests.create
registrar.payments.method
usg.transparency.budgets.index
sas.scholarships.show
```

#### 3. Database Tables
```php
// Shared tables (no prefix)
users, permissions, roles, cache, jobs

// Module-specific tables (descriptive names)
students, document_requests, payments
usg_budgets, usg_transactions
scholarships, insurances, organizations
```

#### 4. Model Names
```php
// Module models live in module namespace
Modules\Registrar\Models\Student
Modules\Registrar\Models\DocumentRequest
Modules\USG\Models\Budget
Modules\SAS\Models\Scholarship
```

### Frontend Conventions

#### 1. Page Component Paths
```tsx
// Pattern: resources/js/pages/{module}/{feature}/{action}.tsx
resources/js/pages/registrar/document-requests/index.tsx
resources/js/pages/registrar/document-requests/create.tsx
resources/js/pages/usg/transparency/dashboard.tsx
resources/js/pages/sas/scholarships/index.tsx
```

#### 2. Component Names
```tsx
// Shared components (PascalCase)
AppShell, AppSidebar, AppHeader, DataTable

// Module-specific components
DocumentRequestCard
PaymentStatusBadge
BudgetChart
ScholarshipList
```

#### 3. Route Helpers (Inertia)
```tsx
// Use route() helper with module prefix
route('registrar.document-requests.index')
route('registrar.payments.method', documentRequest.id)
route('usg.transparency.projects.show', project.slug)
route('sas.scholarships.show', scholarship.id)
```

---

## Development Workflow

### Adding a New Module

#### Step 1: Generate Module Scaffold

```bash
# Use Laravel Modules Artisan command
php artisan module:make NewModule

# This automatically creates:
# - Modules/NewModule/ directory with all subdirectories
# - Module service provider
# - module.json configuration
# - composer.json for module
# - Routes files (web.php, api.php)
# - Standard Laravel module structure
```

#### Step 2: Enable the Module

```bash
# Enable the new module
php artisan module:enable NewModule

# Verify
php artisan module:list
```

#### Step 3: Create Controllers

```bash
# Generate a controller within the module
php artisan module:make-controller MainController NewModule

# This creates: Modules/NewModule/app/Http/Controllers/MainController.php
```

#### Step 4: Create Module Routes

```php
<?php
// Modules/NewModule/routes/web.php

use Illuminate\Support\Facades\Route;
use Modules\NewModule\Http\Controllers\MainController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('new-module', [MainController::class, 'index'])
        ->name('new-module.index');
});

// Routes are AUTO-REGISTERED by the module service provider
```

#### Step 5: Create Models

```bash
# Generate a model with migration and factory
php artisan module:make-model Item NewModule -mf
```

#### Step 6: Run Module Migrations

```bash
# Run migrations for specific module
php artisan module:migrate NewModule
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

### Laravel Modules Commands

```bash
# Generate components
php artisan module:make-controller {ControllerName} {ModuleName}
php artisan module:make-model {ModelName} {ModuleName} -mf
php artisan module:make-migration {MigrationName} {ModuleName}
php artisan module:make-request {RequestName} {ModuleName}
php artisan module:make-middleware {MiddlewareName} {ModuleName}
php artisan module:make-policy {PolicyName} {ModuleName}

# Module migrations
php artisan module:migrate {ModuleName}
php artisan module:migrate-rollback {ModuleName}
php artisan module:migrate-refresh {ModuleName}

# Module seeding
php artisan module:seed {ModuleName}

# Optimize modules
php artisan module:cache
php artisan module:cache-clear
```

---

## Best Practices

### 1. Module Independence

✅ **DO:**
- Keep module-specific logic within the module's directory
- Use clear module boundaries
- Create module-specific services
- Use events for cross-module communication
- Let Laravel Modules handle auto-registration

❌ **DON'T:**
- Directly import controllers from other modules
- Create tight coupling between modules
- Mix module concerns
- Manually register module routes

### 2. Shared Code

✅ **DO:**
- Use shared components for common UI elements
- Create shared services for cross-cutting concerns
- Leverage shared models for authentication
- Use shared utilities for common operations

❌ **DON'T:**
- Duplicate code across modules
- Create module-specific versions of shared functionality

### 3. Database Design

✅ **DO:**
- Use descriptive table names (e.g., `usg_budgets`, `scholarships`)
- Use shared tables for authentication (`users`, `roles`, `permissions`)
- Create proper foreign key relationships
- Use migrations for all database changes
- Keep module migrations in module directories

❌ **DON'T:**
- Create duplicate user tables per module
- Use different authentication systems per module
- Skip migrations and modify database directly
- Duplicate migrations in both central and module locations

### 4. Routing

✅ **DO:**
- Use consistent route naming: `{module}.{resource}.{action}`
- Group routes by permission/role in module's `routes/web.php`
- Apply appropriate middleware
- Let module service provider auto-register routes

❌ **DON'T:**
- Mix module routes without clear separation
- Manually include module routes in main `routes/web.php`
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
- Write tests for each module in `Modules/{Module}/tests/`
- Test module integration points
- Use feature tests for workflows
- Test shared components separately in central `tests/`

❌ **DON'T:**
- Place module tests in central `tests/` directory
- Skip testing cross-module interactions
- Forget to test authorization

### 7. Database Resources

✅ **DO:**
- Place factories in `Modules/{Module}/database/Factories/`
- Place migrations in `Modules/{Module}/database/Migrations/`
- Place seeders in `Modules/{Module}/database/Seeders/`
- Create module orchestrator seeders
- Use consistent namespaces: `Modules\{Module}\Database\*`

❌ **DON'T:**
- Place module factories in central `database/factories/`
- Duplicate migrations in both locations
- Mix module seeders in central `database/seeders/`
- Use inconsistent namespaces

---

## Module Implementation Guide

### Registrar Module (Implemented)

**Purpose:** Document Request System for academic records

**Key Features:**
- Document request submission (COE, TOR, Grades, etc.)
- Payment processing (digital via PayMongo, cash at counter)
- Admin processing queue
- Cashier payment verification
- Integration with Registrar's document generation software

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

### USG Module (Implemented)

**Purpose:** University Student Government Transparency Portal

**Key Features:**
- Financial transparency (budgets, transactions)
- Document repository
- Meeting records and minutes
- Project tracking
- Public engagement (feedback)
- Performance analytics

**Routes:** All prefixed with `usg.transparency.`
- `usg.transparency.budgets.*`
- `usg.transparency.transactions.*`
- `usg.transparency.projects.*`
- `usg.transparency.meetings.*`
- `usg.transparency.documents.*`

**Database Tables:**
- `usg_budgets`
- `usg_transactions`
- `usg_projects`
- `usg_meetings`
- `usg_documents`

### SAS Module (Implemented)

**Purpose:** Student Affairs Services

**Key Features:**
- Student organization management
- Scholarship applications and tracking
- Insurance record management
- Event management
- Digital document repository

**Routes:** All prefixed with `sas.`
- `sas.scholarships.*`
- `sas.insurances.*`
- `sas.organizations.*`
- `sas.activities.*`

**Database Tables:**
- `scholarships`
- `scholarship_recipients`
- `insurances`
- `insurance_records`
- `organizations`
- `organization_members`

---

## Benefits of This Architecture

### For Development

1. **Team Scalability:** Different teams work on different modules independently
2. **Clear Boundaries:** Each module has well-defined responsibilities
3. **Code Reusability:** Shared components, services, and infrastructure
4. **Easier Onboarding:** New developers focus on one module at a time
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

## Autoloading Configuration

The application uses PSR-4 autoloading with **Laravel Modules** integration in `composer.json`:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/",
            "Modules\\": "Modules/"
        }
    },
    "extra": {
        "merge-plugin": {
            "include": [
                "Modules/*/composer.json"
            ]
        }
    }
}
```

After adding or modifying modules, run:
```bash
composer dump-autoload
```

---

## Laravel Modules Package

This project uses **nwidart/laravel-modules** v12.0.4 for module management.

### Key Features:
- ✅ Auto-discovery and registration of modules
- ✅ Artisan commands for generating module components
- ✅ Module-specific migrations, seeders, and factories
- ✅ Independent module testing
- ✅ Module enable/disable functionality
- ✅ Namespace isolation (`Modules\{ModuleName}\`)

### Configuration:
Module behavior is configured in `config/modules.php`

### Documentation:
- Official: https://nwidart.com/laravel-modules
- GitHub: https://github.com/nwidart/laravel-modules

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

**Document Version:** 2.0  
**Last Updated:** November 3, 2025  
**Maintained By:** Development Team  
**Review Cycle:** Quarterly

---
