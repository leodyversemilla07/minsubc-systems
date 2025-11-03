<div align="center">

# MinSU BC Systems Platform

![Laravel](https://img.shields.io/badge/Laravel-12.32.5-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.1.4-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**A comprehensive web-based platform for Mindoro State University - Bongabong Campus**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Modules](#-modules)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The **MinSU BC Systems Platform** is a modern, modular monorepo application built to streamline and digitize various administrative processes at Mindoro State University - Bongabong Campus. This platform consolidates four critical university systems into a unified, secure, and user-friendly web application.

### Why This Platform?

- **🎯 Unified Experience**: Single authentication, consistent UI/UX across all modules
- **🔒 Secure & Compliant**: Built with security best practices, role-based access control
- **📱 Modern Stack**: Latest Laravel 12, React 19, TypeScript, and Tailwind CSS 4
- **🚀 High Performance**: Optimized for speed with Vite, SSR support, and efficient caching
- **♿ Accessible**: WCAG compliant, responsive design, dark mode support
- **🧩 Modular Architecture**: Independent modules that can evolve separately

---

## ✨ Features

### Core Platform Features

- ✅ **Unified Authentication** - Laravel Fortify with 2FA support
- ✅ **Role-Based Access Control** - Spatie Permission package integration
- ✅ **Audit Logging** - Complete activity tracking and compliance
- ✅ **Real-time Notifications** - Email and SMS notifications
- ✅ **Payment Integration** - PayMongo integration for online payments
- ✅ **Dark Mode Support** - System-wide theme switching
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Type-Safe Frontend** - Full TypeScript implementation
- ✅ **Component Library** - Shadcn UI with 443+ components

### Module-Specific Features

#### 📄 Registrar Module (Active)
- Online document request submission (TOR, COE, Grades, etc.)
- Dual payment modes: Digital (PayMongo) & Cash (Pay-at-Counter)
- Real-time request tracking with unique reference numbers
- Admin processing queue and workflow management
- Cashier portal for payment verification
- Integration with Registrar's existing document generation software
- Physical claim with ID verification
- SMS/Email notifications at every status change

#### 🏛️ USG Module (Active)
- University Student Government transparency portal
- Vision, Mission, Goals, and Objectives (VMGO) management
- Student government officers directory
- Announcements and news publishing system
- Events calendar with registration system
- Resolutions and official documents repository
- FOI (Freedom of Information) request system
- Transparency reports (financial, activity, and performance)
- Document downloads tracking
- Public and authenticated access control

#### 📊 SAS Module (Active)
- Student Affairs Services management
- Comprehensive scholarship management system
- Scholarship recipients tracking and renewal
- Student organization management and directory
- Organization officers and member management
- Organization activities and event tracking
- Student insurance records management
- Document digitalization and archive system
- Activity calendar and event planning
- Activity documents and reports
- Student notifications system

#### 🎓 Guidance Module (Planned)
- Student guidance and counseling services
- Appointment scheduling system
- Confidential counseling records
- Career guidance resources
- Psychological assessments
- Referral system

---

## 🏗️ Architecture

### Monorepo Modular Monolith

This project uses a **Monorepo Modular Monolith** architecture, combining the benefits of:

- **Monorepo**: All code in a single repository
- **Modular**: Independent, self-contained modules
- **Monolith**: Shared runtime, database, and deployment

```
minsubc-systems/
├── app/
│   ├── Models/              # Shared models (User, AuditLog, SystemSetting, etc.)
│   ├── Providers/           # Service providers
│   ├── Services/            # Shared business logic
│   ├── Http/                # Shared HTTP layer
│   └── Observers/           # Model observers
├── Modules/                 # 🎯 BACKEND MODULE BOUNDARY
│   ├── Registrar/           # Document Request System (7 tables)
│   ├── USG/                 # Student Government Portal (11 tables)
│   └── SAS/                 # Student Affairs Services (15 tables)
├── resources/js/
│   ├── components/          # Shared UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── sas/             # SAS-specific components
│   │   └── usg/             # USG-specific components
│   ├── layouts/             # Shared layouts
│   ├── lib/                 # Utilities and helpers
│   └── pages/               # 🎯 FRONTEND MODULE BOUNDARY
│       ├── registrar/       # Registrar pages
│       ├── usg/             # USG pages (public & admin)
│       └── sas/             # SAS pages (student, adviser & admin)
├── database/
│   ├── migrations/          # Shared core migrations
│   ├── factories/           # Model factories
│   └── seeders/             # Database seeders
├── routes/
│   ├── web.php              # Main routes file
│   ├── auth.php             # Authentication routes
│   └── settings.php         # Settings routes
└── tests/
    ├── Feature/             # Feature tests (212 tests)
    ├── Unit/                # Unit tests (1 test)
    └── Browser/             # Browser tests (30 ready)
```

### Benefits

✅ **Domain Separation** - Each department has its own isolated module  
✅ **Code Reusability** - Shared components and infrastructure  
✅ **Simplified Development** - Single codebase, unified tooling  
✅ **Team Independence** - Different teams work on different modules  
✅ **Gradual Migration** - Can evolve to microservices if needed  

---

## 🛠️ Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **PHP** | 8.3.27 | Server-side language |
| **Laravel** | 12.34.0 | PHP framework |
| **Inertia.js (Server)** | 2.0.10 | Modern monolith SPA adapter |
| **Laravel Fortify** | 1.31.1 | Authentication backend |
| **Spatie Permission** | 6.21 | Role-based access control |
| **MySQL** | 8.0+ | Relational database |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library |
| **TypeScript** | 5.7.2 | Type-safe JavaScript |
| **Inertia.js (Client)** | 2.1.4 | SPA without API complexity |
| **Tailwind CSS** | 4.1.12 | Utility-first CSS framework |
| **Shadcn UI** | 3.4.0 | Component library (443+ components) |
| **Vite** | 7.0.4 | Build tool and dev server |
| **React Hook Form** | 7.64.0 | Form management |
| **Zod** | 3.25.76 | Schema validation |
| **Lucide React** | 0.475.0 | Icon library |
| **Next Themes** | 0.4.6 | Dark mode support |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Laravel Pint** | 1.25.1 | PHP code formatter |
| **ESLint** | 9.33.0 | JavaScript linter |
| **Prettier** | 3.6.2 | Code formatter |
| **Pest** | 4.1.2 | Testing framework |
| **PHPUnit** | 12.4.0 | Testing foundation |
| **Laravel Boost** | 1.3 | Development productivity MCP server |
| **Laravel Wayfinder** | 0.1.12 | Type-safe routing |
| **Laravel MCP** | 0.3.0 | Model Context Protocol integration |
| **Laravel Sail** | 1.46.0 | Docker development environment |

---

## 📦 Modules

### Current Status

| Module | Status | Routes | Database Tables | Purpose |
|--------|--------|--------|-----------------|---------|
| **Registrar** | ✅ Active | 35+ | 7 | Document request system |
| **USG** | ✅ Active | 50+ | 11 | Student government transparency |
| **SAS** | ✅ Active | 40+ | 15 | Student affairs management |
| **Guidance** | 🔜 Planned | - | - | Student counseling services |

### Module Anatomy

Each module follows a consistent structure using **nwidart/laravel-modules**:

```
Modules/{ModuleName}/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Module controllers
│   │   ├── Middleware/      # Module middleware
│   │   └── Requests/        # Form validation
│   ├── Models/              # Module-specific models
│   └── Services/            # Business logic
├── database/
│   ├── migrations/          # Module migrations
│   ├── factories/           # Module factories
│   └── seeders/             # Module seeders
├── routes/
│   ├── web.php              # Web routes
│   └── api.php              # API routes
├── resources/
│   └── views/               # Blade views (if any)
├── tests/
│   ├── Feature/             # Feature tests
│   └── Unit/                # Unit tests
├── composer.json            # Module dependencies
├── module.json              # Module metadata
├── vite.config.js           # Module build config
└── package.json             # Frontend dependencies

resources/js/pages/{modulename}/
├── index.tsx                # Module landing page
├── dashboard.tsx            # Module dashboard
├── {feature}/               # Feature pages
│   ├── index.tsx
│   ├── create.tsx
│   ├── edit.tsx
│   └── show.tsx
└── admin/                   # Admin pages
    └── {feature}/
```

---

## 🚀 Quick Start

### Prerequisites

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 20.x
- **npm** >= 10.x
- **MySQL** >= 8.0
- **Laravel Herd** (recommended) or **Laravel Valet**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/leodyversemilla07/minsubc-systems.git
cd minsubc-systems
```

2. **Install PHP dependencies**

```bash
composer install
```

3. **Install JavaScript dependencies**

```bash
npm install
```

4. **Configure environment**

```bash
cp .env.example .env
php artisan key:generate
```

5. **Configure database** in `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=minsubc_systems
DB_USERNAME=root
DB_PASSWORD=
```

6. **Run migrations and seeders**

```bash
php artisan migrate --seed
```

7. **Build frontend assets**

```bash
npm run build
```

8. **Start development servers**

```bash
composer run dev
```

This will start:
- PHP development server (http://localhost:8000)
- Queue worker
- Vite dev server (HMR)

### Alternative: Docker with Laravel Sail

```bash
# Install Sail
composer require laravel/sail --dev

# Start containers
./vendor/bin/sail up -d

# Run migrations
./vendor/bin/sail artisan migrate --seed

# Install frontend dependencies
./vendor/bin/sail npm install

# Build assets
./vendor/bin/sail npm run build
```

---

## 💻 Development

### Code Standards

#### PHP/Laravel
- Follow PSR-12 coding standards
- Use Laravel Pint: `vendor/bin/pint`
- Write PHPDoc blocks for classes and methods
- Use explicit return types and type hints
- Follow modular architecture

#### React/TypeScript
- Use functional components with TypeScript
- Follow existing component structure
- Use Shadcn UI components when possible
- Run ESLint: `npm run lint`
- Format with Prettier: `npm run format`

### Running Development Server

```bash
# Run all services (server + queue + vite)
composer run dev

# Or run individually
php artisan serve           # Backend server
php artisan queue:listen    # Queue worker
npm run dev                 # Frontend dev server
```

### With SSR Support

```bash
# Build SSR bundle and run
composer run dev:ssr
```

### Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
composer run dev         # Start all services
composer run dev:ssr     # Start with SSR

# Build
npm run build            # Production build
npm run build:ssr        # Build with SSR

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run types            # TypeScript type check
vendor/bin/pint          # Format PHP code
vendor/bin/pint --test   # Check PHP formatting

# Testing
composer test            # Run all tests
php artisan test         # Run Pest tests
php artisan test --filter=testName  # Run specific test
```

### Using Laravel Boost MCP

This project includes **Laravel Boost**, an MCP (Model Context Protocol) server for enhanced development:

```bash
# Application info
php artisan boost:info

# Database operations
php artisan boost:schema
php artisan boost:query "SELECT * FROM users LIMIT 5"

# Execute code in Tinker context
php artisan boost:tinker "User::count()"

# Search documentation
php artisan boost:docs "authentication"

# View logs
php artisan boost:logs --lines=50
```

---

## 🗄️ Database Schema

### Core Tables

- **users** - System users (students, staff, admin)
- **students** - Student-specific information
- **roles** - User roles (student, admin, cashier, etc.)
- **permissions** - Granular permissions
- **audit_logs** - Complete activity tracking
- **system_settings** - Application configuration

### Module Tables

**Registrar Module (7 tables):**
- **document_requests** - Document request records
- **payments** - Payment transactions
- **payment_webhooks** - PayMongo webhook logs
- **notifications** - SMS/Email notifications

**USG Module (11 tables):**
- **usg_vmgo** - Vision, Mission, Goals, Objectives
- **usg_officers** - Student government officers
- **usg_announcements** - News and announcements
- **usg_events** - Events calendar
- **usg_event_registrations** - Event registrations
- **usg_resolutions** - Official resolutions
- **usg_documents** - Document repository
- **usg_document_downloads** - Download tracking
- **usg_transparency_reports** - Transparency reports
- **usg_foi_requests** - Freedom of Information requests
- **usg_foi_responses** - FOI request responses

**SAS Module (15 tables):**
- **scholarships** - Scholarship programs
- **scholarship_recipients** - Scholarship recipients
- **scholarship_requirements** - Scholarship requirements
- **insurance_records** - Student insurance records
- **insurance_documents** - Insurance related documents
- **organizations** - Student organizations
- **organization_officers** - Organization officers
- **organization_members** - Organization members
- **organization_activities** - Organization activities
- **organization_documents** - Organization documents
- **sas_activities** - SAS events and activities
- **activity_documents** - Activity related documents
- **digitalized_documents** - Digitalized document archive
- **sas_user_notifications** - SAS notifications

### Key Relationships

**Registrar:**
```
users (1) ─────── (*) students
users (1) ─────── (*) document_requests (as processor)
students (1) ───── (*) document_requests
document_requests (1) ─ (*) payments
document_requests (1) ─ (*) notifications
```

**USG:**
```
users (1) ─────── (*) usg_officers
users (1) ─────── (*) usg_announcements (as author)
users (1) ─────── (*) usg_events (as creator)
users (1) ─────── (*) usg_event_registrations
usg_events (1) ─── (*) usg_event_registrations
users (1) ─────── (*) usg_foi_requests
usg_foi_requests (1) ─ (*) usg_foi_responses
```

**SAS:**
```
users (1) ─────── (*) scholarship_recipients (as student)
scholarships (1) ─ (*) scholarship_recipients
scholarship_recipients (1) ─ (*) scholarship_requirements
users (1) ─────── (*) organizations (as adviser)
organizations (1) ─ (*) organization_officers
organizations (1) ─ (*) organization_members
organizations (1) ─ (*) organization_activities
organizations (1) ─ (*) sas_activities
users (1) ─────── (*) insurance_records (as student)
```

### Running Migrations

```bash
# Run all pending migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Fresh migration with seed data
php artisan migrate:fresh --seed

# Check migration status
php artisan migrate:status
```

---

## 🧪 Testing

This project uses **Pest 4** for testing with comprehensive feature, unit, and browser tests.

### Test Suite Statistics

| Category | Count | Coverage |
|----------|-------|----------|
| **Total Tests** | 213 | All critical workflows |
| **Feature Tests** | 212 | Auth, RBAC, Registrar, USG |
| **Unit Tests** | 1 | Utilities and helpers |
| **Browser Tests** | 30 (ready) | E2E user workflows |
| **Assertions** | 789+ | Comprehensive validation |
| **Test Duration** | ~48s | Optimized for speed |

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Registrar/DocumentRequestTest.php

# Run specific test suite
php artisan test tests/Feature/USG

# Filter by test name
php artisan test --filter="can create document request"

# Run in parallel (faster)
php artisan test --parallel

# Run with code coverage
php artisan test --coverage

# Run with detailed coverage
php artisan test --coverage --min=80
```

### Browser Testing (Pest 4)

This project includes comprehensive E2E browser tests using Pest 4 and Playwright.

#### Setup Browser Testing

1. **Install Playwright browsers** (one-time setup):
```bash
npx playwright install
```

2. **Add to `.gitignore`**:
```gitignore
/tests/Browser/Screenshots
```

3. **Start development server**:
```bash
# Option A: Full stack
composer run dev

# Option B: Just Vite
npm run dev
```

#### Running Browser Tests

```bash
# Run all browser tests
php artisan test tests/Browser

# Run specific browser test
php artisan test tests/Browser/DocumentRequestFlowTest.php

# Run in headed mode (see browser)
./vendor/bin/pest tests/Browser --headed

# Run in debug mode (pause on failures)
./vendor/bin/pest tests/Browser --debug

# Run on specific browser
./vendor/bin/pest tests/Browser --browser firefox
./vendor/bin/pest tests/Browser --browser safari

# Take screenshots on failure
./vendor/bin/pest tests/Browser --screenshots
```

#### Available Browser Tests

- **DocumentRequestFlowTest.php** - Complete document request workflow (7 tests)
- **PaymentFlowTest.php** - Payment processing flows (10 tests)
- **AnnouncementPublishFlowTest.php** - USG announcement lifecycle (13 tests)

### Code Coverage

#### Prerequisites

Install PCOV for fast code coverage:

**On Windows (with XAMPP/Herd):**

1. Download PCOV extension for your PHP version from [PECL](https://pecl.php.net/package/pcov)
2. Copy `php_pcov.dll` to your PHP `ext` directory
3. Add to `php.ini`:
```ini
[pcov]
extension=pcov
pcov.enabled=1
pcov.directory=.
pcov.exclude="~vendor~"
```

4. Restart PHP server and verify:
```bash
php -m | findstr pcov
```

**On macOS/Linux:**

```bash
# Install PCOV
pecl install pcov

# Add to php.ini
echo "extension=pcov.so" >> $(php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||")
echo "pcov.enabled=1" >> $(php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||")

# Verify installation
php -m | grep pcov
```

**Alternative: Use Xdebug** (slower but more features)

```bash
# Install Xdebug
pecl install xdebug

# Add to php.ini
zend_extension=xdebug.so
xdebug.mode=coverage
```

#### Running Coverage Reports

```bash
# Generate coverage report (HTML)
php artisan test --coverage-html coverage-report

# Open the report
# Windows: start coverage-report/index.html
# macOS: open coverage-report/index.html
# Linux: xdg-open coverage-report/index.html

# Generate coverage with minimum threshold
php artisan test --coverage --min=80

# Coverage for specific paths
php artisan test --coverage --path=app/Modules/USG

# Generate multiple format coverage
vendor/bin/pest --coverage-html=coverage-report --coverage-text --coverage-clover=coverage.xml
```

#### Coverage Report Output Example

```
Tests:    213 passed (789 assertions)
Duration: 48.23s

Code Coverage:
  app/Models ................................. 92.5%
  app/Modules/Registrar ...................... 88.3%
  app/Modules/USG ............................ 91.7%
  app/Http/Controllers ....................... 85.2%
  app/Services ............................... 87.9%

  Total: 89.2%
```

#### CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Run tests with coverage
  run: |
    vendor/bin/pest --coverage --coverage-clover=coverage.xml
    
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage.xml
```

### Writing Tests

Tests use Pest syntax:

```php
it('can create a document request', function () {
    $student = Student::factory()->create();
    
    $response = $this->actingAs($student->user)
        ->post('/document-requests', [
            'document_type' => 'TOR',
            'quantity' => 1,
            'purpose' => 'Employment',
        ]);
    
    $response->assertSuccessful();
    expect(DocumentRequest::count())->toBe(1);
});
```

### Test Structure

```
tests/
├── Pest.php                 # Pest configuration
├── TestCase.php             # Base test class
├── Feature/                 # Feature tests
│   ├── Auth/
│   └── Registrar/
└── Unit/                    # Unit tests
```

---

## 🚢 Deployment

### Production Build

1. **Optimize application**

```bash
# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build frontend assets
npm run build
```

2. **Configure web server** (Nginx example)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/minsubc-systems/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

3. **Set proper permissions**

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

4. **Configure queue worker** (Supervisor)

```ini
[program:minsubc-queue-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/minsubc-systems/artisan queue:work --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/minsubc-systems/storage/logs/worker.log
stopwaitsecs=3600
```

5. **Configure cron** for scheduled tasks

```bash
* * * * * cd /path/to/minsubc-systems && php artisan schedule:run >> /dev/null 2>&1
```

### Environment Variables

Key production environment variables:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password

PAYMONGO_SECRET_KEY=your-secret-key
PAYMONGO_PUBLIC_KEY=your-public-key

QUEUE_CONNECTION=database
SESSION_DRIVER=database
CACHE_DRIVER=redis
```

---

## 📚 Documentation

### Project Documentation

All comprehensive documentation is located in the **[`/docs`](docs/)** directory.

**📖 [Browse All Documentation](docs/README.md)** - Complete documentation index with quick navigation

#### Quick Links by Role

- **New Developers**: Start with [Laravel Modules Guide](docs/LARAVEL_MODULES_GUIDE.md) and [Quick Reference](docs/LARAVEL_MODULES_QUICK_REFERENCE.md)
- **Module Developers**: See [Tutorial](docs/LARAVEL_MODULES_TUTORIAL.md) and [Architecture](docs/MODULAR_ARCHITECTURE.md)
- **Project Managers**: Review [Module Specifications](docs/)
- **System Architects**: Check [Directory Structure](docs/DIRECTORY_STRUCTURE.md) and [Migration Complete](docs/MIGRATION_COMPLETE.md)

#### Key Documents

| Document | Description |
|----------|-------------|
| **[Laravel Modules Guide](docs/LARAVEL_MODULES_GUIDE.md)** | Complete guide to modular development |
| **[Architecture Overview](docs/MODULAR_ARCHITECTURE.md)** | System architecture and design patterns |
| **[Registrar (DRS) Specs](docs/DRS.md)** | Document Request System specifications |
| **[USG Portal Specs](docs/USG_INFORMATION_PORTAL_SRS.md)** | Student Government portal requirements |
| **[Directory Structure](docs/DIRECTORY_STRUCTURE.md)** | File organization and conventions |
| **[Contributing](CONTRIBUTING.md)** | Contribution guidelines |

#### How Do I...?

- **Create a new module?** → [Tutorial](docs/LARAVEL_MODULES_TUTORIAL.md) + [Quick Reference](docs/LARAVEL_MODULES_QUICK_REFERENCE.md)
- **Understand the architecture?** → [Modular Architecture](docs/MODULAR_ARCHITECTURE.md)
- **Work with Registrar module?** → [DRS Specifications](docs/DRS.md)
- **Work with USG module?** → [USG SRS](docs/USG_INFORMATION_PORTAL_SRS.md)
- **Find specific files?** → [Directory Structure](docs/DIRECTORY_STRUCTURE.md)

### External Resources

- [Laravel 12 Documentation](https://laravel.com/docs/12.x)
- [Laravel Modules Package](https://nwidart.com/laravel-modules)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Pest PHP Documentation](https://pestphp.com/)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our code standards
4. Write/update tests for your changes
5. Run tests: `composer test`
6. Format code: `vendor/bin/pint` and `npm run format`
7. Commit with descriptive messages
8. Push to your fork and submit a Pull Request

### Development Priorities

**Current Focus Areas:**
- **Registrar System**: Payment flow improvements
- **USG System**: Initial module implementation
- **Guidance System**: Module planning
- **SAS System**: Module planning
- **Cross-System**: Shared components and utilities

### Code Review Process

1. All PRs require at least one review
2. All tests must pass
3. Code must follow style guidelines
4. Documentation must be updated

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🐛 Troubleshooting

### Common Issues

**Vite manifest error**
```bash
npm run build
# or for development
npm run dev
```

**Permission denied on storage**
```bash
chmod -R 775 storage bootstrap/cache
```

**Class not found**
```bash
composer dump-autoload
```

**Migration issues**
```bash
php artisan migrate:fresh --seed
```

**Queue not processing**
```bash
php artisan queue:restart
php artisan queue:listen
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Mindoro State University - Bongabong Campus**  
Information Technology Department

### Contributors

See [GitHub Contributors](https://github.com/leodyversemilla07/minsubc-systems/graphs/contributors) for a complete list.

---

## 📞 Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/leodyversemilla07/minsubc-systems/issues)
- **Discussions**: [GitHub Discussions](https://github.com/leodyversemilla07/minsubc-systems/discussions)
- **Email**: support@minsubc.edu.ph

---

## 🙏 Acknowledgments

- Laravel Framework and Community
- Inertia.js Team
- Shadcn UI Component Library
- All open-source contributors

---

<div align="center">

**Built with ❤️ for Mindoro State University - Bongabong Campus**

⭐ Star this repo if you find it useful!

</div>
