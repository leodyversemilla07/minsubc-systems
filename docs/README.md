# MinSU BC Systems — Documentation

Quick links to find what you need.

---

## Getting Started

| Doc | Description |
|-----|-------------|
| [README.md](../README.md) | Project overview, module list, setup |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Contribution guide, standards, testing |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture |

---

## All Modules (19 Active)

| Module | Spec / Docs | Description |
|--------|-------------|-------------|
| **Registrar** | [DRS.md](DRS.md) | Student records, document requests, cashier |
| **Admission** | — | Application, enrollment, grades, transcripts |
| **SAS** | [SAS_SRS.md](SAS_SRS.md) | Student affairs, scholarships, insurance |
| **USG** | [USG_INFORMATION_PORTAL_SRS.md](USG_INFORMATION_PORTAL_SRS.md) | Student government portal |
| **VotingSystem** | — | Elections, candidates, ballots, results |
| **Library** | — | Books, borrowing, fines, reports |
| **HR** | — | Employees, departments, attendance, leave |
| **Accounting** | — | Fee items, assessments, invoices, payments |
| **Guidance** | — | Counseling, appointments, assessments |
| **Curriculum** | — | Programs, courses, syllabi, outcomes |
| **Research** | — | Proposals, defenses, publications, journals |
| **Alumni** | — | Alumni records, events, donations, surveys |
| **Clinic** | — | Medical records, consultations, dental |
| **Facilities** | — | Rooms, equipment, reservations, maintenance |
| **Scheduling** | — | Events, bookings, academic schedules |
| **Discipline** | — | Offenses, incidents, sanctions, appeals |
| **Helpdesk** | — | Support tickets, categories, reports |
| **Dormitory** | — | Halls, rooms, beds, assignments, maintenance |
| **Analytics** | — | Cross-module dashboard, unified KPIs |

---

## Development

| Doc | Description |
|-----|-------------|
| [LARAVEL_MODULES.md](LARAVEL_MODULES.md) | Module development guide |
| [MODULAR_PERMISSIONS.md](MODULAR_PERMISSIONS.md) | RBAC implementation |
| [LOGIN_SYSTEM_ENHANCEMENT.md](LOGIN_SYSTEM_ENHANCEMENT.md) | Authentication |

---

## Design & Testing

| Doc | Description |
|-----|-------------|
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | UI/UX guidelines |
| [E2E_TESTING_USERS.md](E2E_TESTING_USERS.md) | Testing guide |

---

## Quick Commands

```bash
# Development
composer run dev

# Testing — all modules
composer test

# Testing — specific
php vendor/bin/pest Modules/Library/tests/

# Code quality
vendor/bin/pint
npm run lint
npm run format

# Build
npm run build
```

---

## Key Numbers

| Metric | Count |
|--------|:-----:|
| Active modules | **19** |
| React pages | **411** |
| Passing tests | **949** |
| Routes | **500+** |
| DB tables | **100+** |
| Roles | **24** |

---

## Need Help?

1. Check the relevant spec file above
2. Look at existing modules in `Modules/`
3. See [CONTRIBUTING.md](../CONTRIBUTING.md)