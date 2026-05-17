# MinSU BC Systems Platform

A modular campus management system built with **Laravel 13, React 19, Inertia.js, and Tailwind CSS 4**.

## 🏛 Modules — 19 Active

| Module | Prefix | Purpose | Admin Pages | Tests |
|--------|--------|---------|:-:|:-:|
| **Registrar** | — | Student records, document requests, cashier, analytics | 19 | 29 |
| **Admission** | — | Application, enrollment, grades, transcripts, payments | 32 | 84 |
| **SAS** | — | Student orgs, activities, scholarships, insurance | 35+ | 41 |
| **USG** | — | Announcements, events, documents, officers, resolutions | 18 | 18 |
| **VotingSystem** | — | Elections, candidates, ballots, results, analytics | 26 | 41 |
| **Library** | — | Books, categories, borrowing, fines, reports | 13 | 37 |
| **HR** | `hr_` | Employees, departments, attendance, leave, evaluations | 19 | 20 |
| **Accounting** | `acc_` | Fee categories, assessments, invoices, payments, journals | 20+ | 15 |
| **Guidance** | `gdn_` | Counseling, appointments, assessments, referrals, interventions | 25+ | 28 |
| **Curriculum** | `cur_` | Programs, courses, syllabi, outcomes, textbooks | 23+ | 18 |
| **Research** | `res_` | Proposals, defenses, publications, journals, panels | 18+ | 12 |
| **Alumni** | `alm_` | Alumni records, events, donations, surveys, employment | 20+ | 12 |
| **Clinic** | `cls_` | Medical records, consultations, dental, immunizations | 16+ | 10 |
| **Facilities** | `fac_` | Facilities, equipment, reservations, maintenance | 8 | 9 |
| **Scheduling** | `sch_` | Events, bookings, academic schedules | 6 | 7 |
| **Discipline** | `dsc_` | Offenses, incidents, sanctions, appeals | 4 | 8 |
| **Helpdesk** | `hlp_` | Support tickets, categories, comments, reports | 6 | 8 |
| **Dormitory** | `drm_` | Halls, rooms, beds, assignments, maintenance | 6 | 9 |
| **Analytics** | — | Cross-module dashboard, trends, unified KPIs | 1 | 2 |

**Total: 411 React pages | 949 tests | 500+ routes | 100+ DB tables**

## 🚀 Tech Stack

- **Backend:** PHP 8.3+, Laravel 13, nwidart/laravel-modules v12
- **Frontend:** React 19, Inertia.js v2, TypeScript, Tailwind CSS 4
- **UI:** shadcn/ui, Lucide icons, Recharts
- **Database:** MySQL (production) / SQLite (testing)
- **Auth:** Spatie Permissions, Better Auth
- **Payments:** PayMongo (GCash, card, bank transfer)
- **PDF:** DomPDF
- **CI/CD:** GitHub Actions (lint + tests)

## ⚡ Quick Start

```bash
# Install dependencies
composer install
npm install

# Copy environment
cp .env.example .env
php artisan key:generate

# Database
touch database/database.sqlite
php artisan migrate --seed

# Build frontend
npm run build

# Run locally
php artisan serve
npm run dev
```

## 🧪 Testing

```bash
# Run all tests
composer test

# Run a specific module
php vendor/bin/pest Modules/Library/tests/

# Run a specific test
php vendor/bin/pest tests/Feature/Registrar/RegistrarModuleTest.php

# Run with coverage (requires Xdebug/PCOV)
php -d pcov.enabled=1 vendor/bin/pest --coverage
```

## 📁 Module Structure

```
Modules/{ModuleName}/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/       # Admin controllers
│   │   │   └── Student/     # Student-facing controllers
│   │   └── Requests/        # Form requests
│   ├── Models/              # Eloquent models
│   ├── Providers/           # Service providers
│   │   ├── {Module}ServiceProvider.php
│   │   ├── RouteServiceProvider.php
│   │   └── EventServiceProvider.php
│   └── Services/            # Business logic services
├── config/config.php
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/web.php
├── composer.json
├── module.json
└── tests/Feature/
```

## 🖥 Frontend Structure

```
resources/js/
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── {module}/             # Module-specific components
├── layouts/
│   ├── app-layout.tsx        # Main app layout
│   └── settings-layout.tsx   # Settings layout
├── pages/                    # Inertia page components
│   ├── {module}/admin/       # Admin CRUD pages
│   └── {module}/student/     # Student portal pages
├── routes/                   # TypeScript route helpers
└── types/                    # TypeScript types
```

## 🔐 Roles & Permissions

| Role | Scope | Module |
|------|-------|--------|
| `super-admin` | Full access | — |
| `registrar-admin` | Full registrar | Registrar |
| `registrar-staff` | Document processing | Registrar |
| `cashier` | Payment processing | Registrar |
| `sas-admin` | Student affairs | SAS |
| `sas-staff` | Scholarship/insurance ops | SAS |
| `usg-admin` | Student government | USG |
| `usg-officer` | Content management | USG |
| `voting-admin` | Election management | VotingSystem |
| `voting-manager` | View elections | VotingSystem |
| `library-admin` | Library management | Library |
| `library-staff` | Library operations | Library |
| `hr-admin` | HR management | HR |
| `hr-staff` | HR operations | HR |
| `guidance-admin` | Guidance management | Guidance |
| `guidance-counselor` | Counseling | Guidance |
| `discipline-admin` | Discipline management | Discipline |
| `discipline-staff` | Incident reporting | Discipline |
| `helpdesk-admin` | Ticket management | Helpdesk |
| `helpdesk-technician` | Ticket resolution | Helpdesk |
| `dormitory-admin` | Dormitory management | Dormitory |
| `dormitory-warden` | Hall supervision | Dormitory |
| `analytics-viewer` | View dashboards | Analytics |
| `student` | Student portal | All |
| `org_adviser` | Organization advising | SAS |

## 📊 CI/CD

GitHub Actions runs on every push to `main`:

| Workflow | What it does |
|----------|-------------|
| **Linter** | PHP Pint + ESLint (changed files only) |
| **Tests** | `composer install --optimize-autoloader` + full Pest suite (SQLite in-memory) |

> ⚠️ **CI notes:** Module routes are loaded via `require` in `routes/web.php` since `bootstrap/cache/modules.php` isn't tracked in git. Module tables must be manually created in tests via `Schema::create()`.

## 📄 Key Constraints

| Constraint | Reason |
|------------|--------|
| `Student` PK is `student_id` (string) | Legacy integration |
| `$student->id` returns auto-increment `id`, not `student_id` | Eloquent behavior |
| Factories in `Modules/{M}/Database/Factories\ ` namespace | PSR-4 autoload |
| Models need `newFactory()` for factory resolution | Custom module structure |
| `Tool` icon doesn't exist in lucide-react v0.475 | Use `Wrench` instead |
| Module tables use prefix: `hlp_`, `drm_`, `dsc_`, `sch_`, `fac_`, etc. | Avoid collisions |

## 📄 License

MinSU BC Systems Platform &copy; 2026 — Mindoro State University