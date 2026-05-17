# Contributing to MinSU Systems Platform

Thank you for your interest in contributing to the MinSU Systems Platform — a modular campus management system with **19 modules**, **411 React pages**, and **949 passing tests**.

## About This Project

The MinSU Systems Platform is built with Laravel 13, Inertia.js v2, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui. It serves as the central campus management system for Mindoro State University.

### Module Architecture

```
Modules/                            resources/js/pages/
├── Registrar/     (records)        ├── registrar/
├── Admission/     (enrollment)     ├── admission/
├── SAS/           (student aff.)   ├── sas/
├── USG/           (gov't)          ├── usg/
├── VotingSystem/  (elections)      ├── voting/
├── Library/       (books)          ├── library/
├── HR/            (employees)      ├── hr/
├── Accounting/    (fees/invoices)  ├── accounting/
├── Guidance/      (counseling)     ├── guidance/
├── Curriculum/    (programs)       ├── curriculum/
├── Research/      (proposals)      ├── research/
├── Alumni/        (network)        ├── alumni/
├── Clinic/        (medical)        ├── clinic/
├── Facilities/    (rooms/equip)    ├── facilities/
├── Scheduling/    (events)         ├── scheduling/
├── Discipline/    (conduct)        ├── discipline/
├── Helpdesk/      (support)        ├── helpdesk/
├── Dormitory/     (housing)        ├── dormitory/
└── Analytics/     (cross-module)   └── analytics/
```

## How to Contribute

### 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leodyversemilla07/minsubc-systems.git
   cd minsubc-systems
   ```

2. **Set up dependencies:**
   ```bash
   composer install
   npm install
   cp .env.example .env
   php artisan key:generate
   touch database/database.sqlite
   php artisan migrate --seed
   npm run build
   ```

3. **Start development:**
   ```bash
   php artisan serve     # Terminal 1
   npm run dev          # Terminal 2
   ```

### 📝 Development Workflow

1. **Create a feature branch from `main`:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Add module routes** to `routes/web.php` via `require` for CI compatibility:
   ```php
   require __DIR__ . '/../Modules/YourModule/routes/web.php';
   ```

3. **Update autoload** in `composer.json`:
   ```json
   "autoload": {
       "psr-4": {
           "Modules\\YourModule\\": "Modules/YourModule/app/",
           "Modules\\YourModule\\Database\\Factories\\": "Modules/YourModule/database/factories/"
       }
   }
   ```
   Then run: `composer dump-autoload`

4. **Run tests:**
   ```bash
   php vendor/bin/pest
   npm run lint
   ```

### 🏗️ Module Creation Standards

Each new module must include:

```
Modules/{Module}/
├── app/
│   ├── Http/Controllers/Admin/     # Separate file per controller
│   ├── Models/
│   ├── Providers/
│   │   ├── {Module}ServiceProvider.php
│   │   └── RouteServiceProvider.php
│   └── Services/{Module}Service.php
├── config/config.php
├── database/
│   ├── factories/                   # Namespace: Modules\{Module}\Database\Factories\
│   ├── migrations/                  # Table names prefixed (e.g., hlp_, drm_)
│   └── seeders/
├── routes/web.php
├── composer.json
├── module.json
└── tests/Feature/                   # Tests use direct URLs, not route() for CI
```

### 🧪 Testing Constraints

- **SQLite in-memory** tests don't run module migrations — create tables in `beforeEach`:
  ```php
  beforeEach(function () {
      Schema::create('hlp_tickets', function ($t) { ... });
  });
  ```
- **Use direct URLs** instead of `route()` for CI compatibility:
  ```php
  $this->get('/admin/analytics/dashboard');   // ✅
  route('analytics.admin.dashboard');         // ❌ may fail in CI
  ```
- **Factories** must be in the correct namespace and models need `newFactory()`:
  ```php
  protected static function newFactory(): TicketFactory
  {
      return TicketFactory::new();
  }
  ```

### 🛠️ Development Standards

#### PHP/Laravel
- Follow PSR-12, use Laravel Pint: `vendor/bin/pint`
- Type hints and return types on all methods
- Service layer for business logic (thin controllers)
- Module-prefixed tables (`hlp_`, `drm_`, `dsc_`, `sch_`, `fac_`, etc.)

#### React/TypeScript
- Functional components with TypeScript
- shadcn/ui components when possible
- ESLint + Prettier: `npm run lint && npm run format`
- Pages in `resources/js/pages/{module}/` matching Inertia paths

### 📋 Pull Request Guidelines

**Title format:** `type(scope): description`
```
feat(dormitory): add housing management module
fix(analytics): resolve route conflict with registrar
docs(readme): update module list to 19 modules
```

**Before submitting:**
1. ✅ All tests pass locally
2. ✅ Vite build succeeds: `npm run build`
3. ✅ No duplicate imports (causes CI build failure)
4. ✅ Routes added to `routes/web.php` via `require`
5. ✅ Documentation updated if needed

### 🐛 Reporting Issues

Include:
1. Module affected
2. Steps to reproduce
3. Expected vs actual behavior
4. PHP version, Node version, OS

### 📚 Documentation

- **README.md**: Project overview, module list, setup
- **docs/ARCHITECTURE.md**: System architecture
- **docs/LARAVEL_MODULES.md**: Module development guide
- **docs/MODULAR_PERMISSIONS.md**: RBAC implementation

### 🙏 Recognition

Contributors are recognized in:
- GitHub contributors list
- Changelog
- Project acknowledgments

Thank you for contributing to the MinSU BC System! 🎓