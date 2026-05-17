# MinSU BC Systems Platform

A modular campus management system built with Laravel 13, React 19, Inertia.js, and Tailwind CSS 4.

## 🏛 Modules

| Module | Purpose | Admin Pages | Tests |
|--------|---------|:-:|:-:|
| **Admission** | Application, enrollment, grades, transcripts, payments | 32 React | 84 |
| **Registrar** | Student records, document requests, cashier, analytics | 19 React | 29 |
| **SAS** | Student orgs, activities, scholarships, insurance | 35+ React | 41 |
| **USG** | Announcements, events, documents, officers, resolutions | 18 React | 18 |
| **VotingSystem** | Elections, candidates, ballots, results, analytics | 26 React | 41 |
| **Library** | Books, categories, borrowing, fines, reports | 13 React | 37 |
| **Accounting** | Assessments, fee categories, payments, discounts | 5 React | — |
| **HR** | Employees, departments, leave, attendance, evaluations | 8 React | — |
| **Guidance** | Counseling, appointments, assessments, incident reports | 10 React | — |
| **Clinic** | Medical records, consultations, dental, immunizations | 8 React | — |
| **Curriculum** | Programs, courses, syllabi, learning outcomes | 8 React | — |
| **Research** | Proposals, defenses, journals, publications | 9 React | — |
| **Facilities** | Equipment, reservations, maintenance | 5 React | — |
| **Dormitory** | Halls, rooms, bed assignments, maintenance | 6 React | — |
| **Helpdesk** | IT support tickets, assignments, comments | 6 React | — |
| **Discipline** | Offenses, incidents, sanctions, appeals | 4 React | — |
| **Scheduling** | Events, bookings, academic schedules | 6 React | — |
| **Analytics** | Cross-module KPI dashboard with trends | 1 React | — |
| **Alumni** | Alumni records and engagement | — | — |

**Total: ~250+ tests | 19 modules | ~130+ React pages**

## 🚀 Tech Stack

- **Backend:** PHP 8.3+, Laravel 13, nwidart/laravel-modules
- **Frontend:** React 19, Inertia.js, TypeScript, Tailwind CSS 4
- **UI:** shadcn/ui, Lucide icons, Recharts
- **Database:** MySQL (production) / SQLite (testing)
- **Auth:** Laravel Jetstream, Spatie Permissions, Better Auth
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

# Run specific module
php vendor/bin/pest tests/Admission/
php vendor/bin/pest tests/Library/LibraryModuleTest.php

# Run with coverage (requires Xdebug/PCOV)
php -d pcov.enabled=1 vendor/bin/pest --coverage
```

## 📁 Module Structure

```
Modules/{ModuleName}/
├── app/
│   ├── Enums/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   └── Student/
│   │   └── Requests/
│   ├── Models/
│   ├── Notifications/
│   ├── Providers/
│   └── Services/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── web.php
│   ├── student.php
│   └── api.php
```

## 🖥 Frontend Structure

```
resources/js/
├── components/       # Shared UI components
│   ├── ui/          # shadcn/ui components
│   └── admission/   # Module-specific components
├── layouts/          # App layouts
├── pages/            # Inertia page components
│ ├── accounting/
│ ├── admission/
│ ├── clinic/
│ ├── curriculum/
│ ├── facilities/
│ ├── guidance/
│ ├── hr/
│ ├── library/
│ ├── registrar/
│ ├── research/
│ ├── sas/
│ ├── student/
│ ├── usg/
│ └── voting/
├── routes/           # Wayfinder-generated route helpers
└── types/            # TypeScript type definitions
```

## 🔐 Roles & Permissions

| Role | Scope |
|------|-------|
| `super-admin` | Full system access |
| `registrar-admin` | Registrar management |
| `registrar-staff` | Registrar operations |
| `cashier` | Payment processing |
| `sas-admin` | Student affairs management |
| `usg-admin` | Student government management |
| `voting-admin` | Election management |
| `voting-manager` | Election operations |
| `library-admin` | Library management |
| `library-staff` | Library operations |
| `student` | Student portal |
| `org_adviser` | Organization advising |

## 📊 CI/CD

GitHub Actions runs on every push:
- **Linter:** PHP Pint + ESLint (changed files only)
- **Tests:** Full Pest test suite (SQLite in-memory)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

MinSU BC Systems Platform &copy; 2025-2026 Leodyver Semilla and contributors