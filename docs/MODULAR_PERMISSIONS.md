# Modular Permissions System

This document explains the modular permissions and roles architecture for the MINSUBC Systems application.

## Overview

The application uses **Spatie Laravel Permission** package with a **modular architecture** where each module manages its own permissions and roles. This provides better organization, maintainability, and scalability.

## Structure

```
database/
└── seeders/
    └── RolesAndPermissionsSeeder.php  # Core roles (Student, Super Admin)

Modules/
├── Registrar/       → RegistrarPermissionsSeeder.php
├── Admission/       → AdmissionPermissionsSeeder.php
├── SAS/             → SASPermissionsSeeder.php
├── USG/             → USGPermissionsSeeder.php
├── VotingSystem/    → VotingSystemPermissionsSeeder.php
├── Library/         → LibraryPermissionsSeeder.php
├── HR/              → HRPermissionsSeeder.php
├── Accounting/      → AccountingPermissionsSeeder.php
├── Guidance/        → GuidancePermissionsSeeder.php
├── Curriculum/      → CurriculumPermissionsSeeder.php
├── Research/        → ResearchPermissionsSeeder.php
├── Alumni/          → AlumniPermissionsSeeder.php
├── Clinic/          → ClinicPermissionsSeeder.php
├── Facilities/      → FacilitiesPermissionsSeeder.php
├── Scheduling/      → SchedulingPermissionsSeeder.php
├── Discipline/      → DisciplinePermissionsSeeder.php
├── Helpdesk/        → HelpdeskPermissionsSeeder.php
├── Dormitory/       → DormitoryPermissionsSeeder.php
└── Analytics/       → (roles baked into Registrar permissions)
```

## Permission Naming Convention

All module permissions follow this pattern:
```
{module}.{resource}.{action}
```

Examples:
- `voting.elections.view`
- `registrar.approve_requests`
- `usg.create_announcements`
- `sas.manage_scholarships`

## Core Roles & Permissions

### Student Role
**Created in:** `RolesAndPermissionsSeeder.php`

**Permissions:**
- `submit_requests` - Submit document requests
- `view_own_requests` - View their own requests
- `make_payments` - Make payments
- `track_status` - Track request status

### Super Admin Role
**Created in:** `RolesAndPermissionsSeeder.php`

**Permissions:** All permissions from all modules automatically

**Purpose:** Highest authority - full system access

## Module-Specific Roles & Permissions

### Registrar Module
**Seeder:** `Modules/Registrar/Database/Seeders/RegistrarPermissionsSeeder.php`

**Roles:**
1. **Cashier**
   - `registrar.view_pending_cash_payments`
   - `registrar.confirm_cash_payments`
   - `registrar.issue_official_receipts`
   - `registrar.verify_payment_references`

2. **Registrar Staff**
   - `registrar.view_all_requests`
   - `registrar.process_documents`
   - `registrar.approve_requests`
   - `registrar.reject_requests`
   - `registrar.mark_ready_for_claim`
   - `registrar.release_documents`

3. **Registrar Admin**
   - All Registrar Staff permissions
   - `registrar.manage_users`
   - `registrar.system_configuration`

### USG Module
**Seeder:** `Modules/USG/Database/Seeders/USGPermissionsSeeder.php`

**Roles:**
1. **USG Officer**
   - `usg.view_dashboard`
   - `usg.create_announcements`
   - `usg.edit_announcements`
   - `usg.delete_announcements`
   - `usg.publish_announcements`
   - `usg.create_events`
   - `usg.edit_events`
   - `usg.delete_events`
   - `usg.publish_events`
   - `usg.create_resolutions`
   - `usg.edit_resolutions`
   - `usg.delete_resolutions`
   - `usg.submit_resolutions`

2. **USG Admin**
   - All USG Officer permissions
   - `usg.manage_vmgo`
   - `usg.manage_officers`
   - `usg.approve_resolutions`
   - `usg.reject_resolutions`
   - `usg.manage_documents`
   - `usg.archive_content`
   - `usg.view_analytics`
   - `usg.manage_settings`

### SAS Module
**Seeder:** `Modules/SAS/Database/Seeders/SASPermissionsSeeder.php`

**Roles:**
1. **SAS Staff**
   - `sas.view_dashboard`
   - `sas.view_scholarships`
   - `sas.view_insurance`
   - `sas.view_organizations`
   - `sas.view_activities`
   - `sas.process_scholarships`
   - `sas.process_insurance`

2. **SAS Admin**
   - All SAS Staff permissions
   - `sas.manage_scholarships`
   - `sas.manage_insurance`
   - `sas.manage_organizations`
   - `sas.manage_activities`
   - `sas.manage_documents`
   - `sas.approve_applications`
   - `sas.reject_applications`
   - `sas.view_analytics`
   - `sas.manage_settings`

### VotingSystem Module
**Seeder:** `Modules/VotingSystem/Database/Seeders/VotingSystemPermissionsSeeder.php`

**Roles:**
1. **Voting Admin**
   - All election management permissions (view, create, edit, delete, toggle-status)
   - All candidate management permissions
   - All position management permissions (including reorder)
   - All partylist management permissions
   - All voter management permissions (including reset-password, reset-vote, export)
   - `voting.activity-logs.view`
   - `voting.feedback.view`

2. **Voting Manager** (View-only)
   - `voting.elections.view`
   - `voting.candidates.view`
   - `voting.positions.view`
   - `voting.partylists.view`
   - `voting.voters.view`
   - `voting.activity-logs.view`
   - `voting.feedback.view`

### Library Module
**Seeder:** `Modules/Library/Database/Seeders/LibraryPermissionsSeeder.php`

**Roles:**
1. **Library Admin**
   - `library.books.view`, `library.books.create`, `library.books.edit`, `library.books.delete`
   - `library.categories.view`, `library.categories.manage`
   - `library.borrowings.view`, `library.borrowings.manage`
   - `library.fines.view`, `library.fines.manage`
   - `library.reports.view`

2. **Library Staff**
   - `library.books.view`, `library.books.create`, `library.books.edit`
   - `library.categories.view`
   - `library.borrowings.view`, `library.borrowings.manage`

### HR Module
**Seeder:** `Modules/HR/Database/Seeders/HRPermissionsSeeder.php`

**Roles:**
1. **HR Admin**
   - `hr.employees.*`, `hr.departments.*`, `hr.positions.*`
   - `hr.attendance.*`, `hr.leave.*`, `hr.evaluations.*`
   - `hr.reports.view`

2. **HR Staff**
   - `hr.employees.view`, `hr.attendance.view`, `hr.leave.view`
   - `hr.attendance.manage`, `hr.leave.manage`

### Accounting Module
**Seeder:** `Modules/Accounting/Database/Seeders/AccountingPermissionsSeeder.php`

**Roles:**
1. **Accounting Admin**
   - `accounting.fee-categories.*`, `accounting.fee-items.*`
   - `accounting.assessments.*`, `accounting.invoices.*`
   - `accounting.payments.*`, `accounting.discounts.*`
   - `accounting.journals.*`, `accounting.reports.*`

2. **Accounting Staff**
   - `accounting.assessments.view`, `accounting.invoices.view`
   - `accounting.payments.manage`

### Guidance Module
**Seeder:** `Modules/Guidance/Database/Seeders/GuidancePermissionsSeeder.php`

**Roles:**
1. **Guidance Admin**
   - `guidance.appointments.*`, `guidance.sessions.*`
   - `guidance.assessments.*`, `guidance.referrals.*`
   - `guidance.interventions.*`, `guidance.incidents.*`
   - `guidance.counselors.*`, `guidance.reports.*`

2. **Guidance Counselor**
   - `guidance.appointments.view`, `guidance.sessions.manage`
   - `guidance.assessments.view`, `guidance.referrals.manage`

### Curriculum Module
**Seeder:** `Modules/Curriculum/Database/Seeders/CurriculumPermissionsSeeder.php`

**Roles:**
1. **Curriculum Admin**
   - `curriculum.programs.*`, `curriculum.courses.*`
   - `curriculum.curricula.*`, `curriculum.syllabi.*`
   - `curriculum.outcomes.*`, `curriculum.textbooks.*`
   - `curriculum.reports.*`

### Research Module
**Seeder:** `Modules/Research/Database/Seeders/ResearchPermissionsSeeder.php`

**Roles:**
1. **Research Admin**
   - `research.proposals.*`, `research.defenses.*`
   - `research.publications.*`, `research.journals.*`
   - `research.panels.*`, `research.types.*`
   - `research.grades.*`, `research.reports.*`

### Alumni Module
**Seeder:** `Modules/Alumni/Database/Seeders/AlumniPermissionsSeeder.php`

**Roles:**
1. **Alumni Admin**
   - `alumni.records.*`, `alumni.events.*`, `alumni.donations.*`
   - `alumni.surveys.*`, `alumni.employment.*`
   - `alumni.reports.*`

### Clinic Module
**Seeder:** `Modules/Clinic/Database/Seeders/ClinicPermissionsSeeder.php`

**Roles:**
1. **Clinic Admin**
   - `clinic.medical-records.*`, `clinic.consultations.*`
   - `clinic.dental.*`, `clinic.immunizations.*`
   - `clinic.exams.*`, `clinic.appointments.*`
   - `clinic.referrals.*`

### Facilities Module
**Seeder:** `Modules/Facilities/Database/Seeders/FacilitiesPermissionsSeeder.php`

**Roles:**
1. **Facilities Admin**
   - `facilities.facilities.*`, `facilities.equipment.*`
   - `facilities.reservations.*`, `facilities.maintenance.*`

### Scheduling Module
**Seeder:** `Modules/Scheduling/Database/Seeders/SchedulingPermissionsSeeder.php`

**Roles:**
1. **Scheduling Admin**
   - `scheduling.events.*`, `scheduling.bookings.*`
   - `scheduling.academic-schedules.*`

### Discipline Module
**Seeder:** `Modules/Discipline/Database/Seeders/DisciplinePermissionsSeeder.php`

**Roles:**
1. **Discipline Admin**
   - `discipline.categories.*`, `discipline.offenses.*`
   - `discipline.incidents.*`, `discipline.sanctions.*`
   - `discipline.appeals.*`, `discipline.reports.*`

2. **Discipline Staff**
   - `discipline.incidents.view`, `discipline.incidents.report`
   - `discipline.offenses.view`

### Helpdesk Module
**Seeder:** `Modules/Helpdesk/Database/Seeders/HelpdeskPermissionsSeeder.php`

**Roles:**
1. **Helpdesk Admin**
   - `helpdesk.tickets.*`, `helpdesk.categories.*`
   - `helpdesk.comments.*`, `helpdesk.reports.*`

2. **Helpdesk Technician**
   - `helpdesk.tickets.view`, `helpdesk.tickets.manage`
   - `helpdesk.comments.create`

### Dormitory Module
**Seeder:** `Modules/Dormitory/Database/Seeders/DormitoryPermissionsSeeder.php`

**Roles:**
1. **Dormitory Admin**
   - `dormitory.halls.*`, `dormitory.rooms.*`, `dormitory.beds.*`
   - `dormitory.assignments.*`, `dormitory.maintenance.*`
   - `dormitory.reports.*`

2. **Dormitory Warden**
   - `dormitory.rooms.view`, `dormitory.assignments.view`
   - `dormitory.maintenance.manage`

### Analytics Module
**Roles baked into Registrar permissions.** The Analytics dashboard is accessible to `super-admin` and `registrar-admin` roles via sidebar. No separate role needed.

## Setup Instructions

### 1. Run All Permission Seeders

Run the main seeder which automatically runs all module seeders:

```bash
php artisan db:seed --class=RolesAndPermissionsSeeder
```

This will:
1. Create core roles (Student, Super Admin)
2. Call all module-specific permission seeders
3. Automatically grant all module permissions to Super Admin

### 2. Run Individual Module Seeders

You can also run module seeders individually:

```bash
# Registrar permissions
php artisan db:seed --class=Modules\\Registrar\\Database\\Seeders\\RegistrarPermissionsSeeder

# USG permissions
php artisan db:seed --class=Modules\\USG\\Database\\Seeders\\USGPermissionsSeeder

# SAS permissions
php artisan db:seed --class=Modules\\SAS\\Database\\Seeders\\SASPermissionsSeeder

# VotingSystem permissions
php artisan db:seed --class=Modules\\VotingSystem\\Database\\Seeders\\VotingSystemPermissionsSeeder

# Library permissions
php artisan db:seed --class=Modules\\Library\\Database\\Seeders\\LibraryPermissionsSeeder

# HR permissions
php artisan db:seed --class=Modules\\HR\\Database\\Seeders\\HRPermissionsSeeder

# Accounting permissions
php artisan db:seed --class=Modules\\Accounting\\Database\\Seeders\\AccountingPermissionsSeeder

# Guidance permissions
php artisan db:seed --class=Modules\\Guidance\\Database\\Seeders\\GuidancePermissionsSeeder

# Curriculum permissions
php artisan db:seed --class=Modules\\Curriculum\\Database\\Seeders\\CurriculumPermissionsSeeder

# Research permissions
php artisan db:seed --class=Modules\\Research\\Database\\Seeders\\ResearchPermissionsSeeder

# Alumni permissions
php artisan db:seed --class=Modules\\Alumni\\Database\\Seeders\\AlumniPermissionsSeeder

# Clinic permissions
php artisan db:seed --class=Modules\\Clinic\\Database\\Seeders\\ClinicPermissionsSeeder

# Facilities permissions
php artisan db:seed --class=Modules\\Facilities\\Database\\Seeders\\FacilitiesPermissionsSeeder

# Scheduling permissions
php artisan db:seed --class=Modules\\Scheduling\\Database\\Seeders\\SchedulingPermissionsSeeder

# Discipline permissions
php artisan db:seed --class=Modules\\Discipline\\Database\\Seeders\\DisciplinePermissionsSeeder

# Helpdesk permissions
php artisan db:seed --class=Modules\\Helpdesk\\Database\\Seeders\\HelpdeskPermissionsSeeder

# Dormitory permissions
php artisan db:seed --class=Modules\\Dormitory\\Database\\Seeders\\DormitoryPermissionsSeeder
```

### 3. Assign Roles to Users

#### Using Tinker
```bash
php artisan tinker
```

```php
// Assign Voting Admin role
$user = App\Models\User::where('email', 'admin@example.com')->first();
$user->assignRole('Voting Admin');

// Assign multiple roles
$user->assignRole(['Voting Admin', 'USG Admin']);

// Check roles
$user->getRoleNames(); // Returns collection of role names
```

#### Using VotingSystem Command
```bash
php artisan voting:assign-admin user@example.com
```

#### Programmatically in Code
```php
use App\Models\User;

$user = User::find(1);
$user->assignRole('Registrar Admin');
```

## Adding New Modules

When creating a new module, follow this pattern:

### 1. Create Module Permissions Seeder

```bash
# Create seeders directory
mkdir Modules/YourModule/database/seeders

# Create seeder file
touch Modules/YourModule/database/seeders/YourModulePermissionsSeeder.php
```

### 2. Seeder Template

```php
<?php

namespace Modules\YourModule\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class YourModulePermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'yourmodule.resource.view',
            'yourmodule.resource.create',
            'yourmodule.resource.edit',
            'yourmodule.resource.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create module-specific roles
        $adminRole = Role::firstOrCreate(['name' => 'YourModule Admin']);
        $adminRole->givePermissionTo($permissions);

        // Give Super Admin all permissions
        $superAdminRole = Role::where('name', 'Super Admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ YourModule permissions created successfully!');
    }
}
```

### 3. Register in Main Seeder

Add to `RolesAndPermissionsSeeder.php`:

```php
$this->call([
    \Modules\Registrar\Database\Seeders\RegistrarPermissionsSeeder::class,
    \Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder::class,
    \Modules\SAS\Database\Seeders\SASPermissionsSeeder::class,
    \Modules\USG\Database\Seeders\USGPermissionsSeeder::class,
    \Modules\VotingSystem\Database\Seeders\VotingSystemPermissionsSeeder::class,
    \Modules\Library\Database\Seeders\LibraryPermissionsSeeder::class,
    \Modules\HR\Database\Seeders\HRPermissionsSeeder::class,
    \Modules\Accounting\Database\Seeders\AccountingPermissionsSeeder::class,
    \Modules\Guidance\Database\Seeders\GuidancePermissionsSeeder::class,
    \Modules\Curriculum\Database\Seeders\CurriculumPermissionsSeeder::class,
    \Modules\Research\Database\Seeders\ResearchPermissionsSeeder::class,
    \Modules\Alumni\Database\Seeders\AlumniPermissionsSeeder::class,
    \Modules\Clinic\Database\Seeders\ClinicPermissionsSeeder::class,
    \Modules\Facilities\Database\Seeders\FacilitiesPermissionsSeeder::class,
    \Modules\Scheduling\Database\Seeders\SchedulingPermissionsSeeder::class,
    \Modules\Discipline\Database\Seeders\DisciplinePermissionsSeeder::class,
    \Modules\Helpdesk\Database\Seeders\HelpdeskPermissionsSeeder::class,
    \Modules\Dormitory\Database\Seeders\DormitoryPermissionsSeeder::class,
    \Modules\YourModule\Database\Seeders\YourModulePermissionsSeeder::class, // Add new modules here
]);
```

## Checking Permissions in Code

### In Controllers
```php
// Check permission
if (auth()->user()->can('voting.elections.create')) {
    // User can create elections
}

// Abort if no permission
abort_unless(auth()->user()->can('voting.elections.edit'), 403);

// Using authorize
$this->authorize('voting.elections.delete');
```

### In Blade Views
```blade
@can('voting.elections.create')
    <a href="{{ route('voting.admin.elections.create') }}">Create Election</a>
@endcan

@role('Voting Admin')
    <p>You are a Voting Admin</p>
@endrole
```

### In Routes (Middleware)
```php
Route::middleware(['permission:voting.elections.view'])->group(function () {
    Route::get('/elections', [ElectionController::class, 'index']);
});

// Multiple permissions (OR logic)
Route::middleware(['permission:voting.elections.view|voting.candidates.view'])->group(function () {
    // User needs at least one of these permissions
});
```

### In Inertia/React
Share permissions in `HandleInertiaRequests` middleware:

```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user(),
            'permissions' => $request->user()?->getAllPermissions()->pluck('name') ?? [],
            'roles' => $request->user()?->getRoleNames() ?? [],
        ],
    ];
}
```

Use in React:
```tsx
import { usePage } from '@inertiajs/react';

const { permissions } = usePage().props.auth;

if (permissions.includes('voting.elections.create')) {
    // Show create button
}
```

## Benefits of Modular Permissions

1. **Separation of Concerns** - Each module owns its permissions
2. **Maintainability** - Easy to find and update module-specific permissions
3. **Scalability** - New modules can be added without touching core seeder
4. **Clarity** - Permission naming makes it clear which module they belong to
5. **Testing** - Modules can be tested independently
6. **Super Admin Auto-Update** - Super Admin automatically gets new module permissions

## Troubleshooting

### Permission Cache Issues
```bash
php artisan permission:cache-reset
```

### Re-seed All Permissions
```bash
php artisan db:seed --class=RolesAndPermissionsSeeder --force
```

### View All Permissions
```bash
php artisan tinker
```
```php
\Spatie\Permission\Models\Permission::pluck('name');
```

### View All Roles
```bash
php artisan tinker
```
```php
\Spatie\Permission\Models\Role::with('permissions')->get();
```

## Best Practices

1. **Always prefix permissions with module name** - e.g., `voting.`, `sas.`, `usg.`
2. **Use descriptive permission names** - `voting.elections.view` not `view_elections`
3. **Run seeders after module updates** - Ensure new permissions are created
4. **Clear permission cache** - After modifying permissions
5. **Document new permissions** - Update module documentation
6. **Test role assignments** - Verify users have correct access
7. **Use Super Admin role** - For full system access during development

## Migration from Old Structure

If you have the old monolithic permissions structure:

1. **Backup your database**
2. **Run the new seeders**
3. **Verify role assignments**
4. **Update middleware** - Change permission names if needed
5. **Test thoroughly** - Ensure access control works correctly

The new structure is backward compatible - old permission names still work until you migrate them to the new naming convention.
