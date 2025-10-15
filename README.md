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
- ✅ **Document Generation** - Automated PDF generation with QR verification
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
- Automated document generation with QR codes
- Physical claim with ID verification
- SMS/Email notifications at every status change

#### 🏛️ USG Module (Planned)
- University Student Government transparency portal
- Financial transparency (budgets, transactions)
- Document repository and meeting records
- Project tracking and public engagement
- FOI (Freedom of Information) requests
- Performance analytics dashboard
- Event calendar and announcements

#### 🎓 Guidance Module (Pending)
- Student guidance and counseling services
- Appointment scheduling system
- Confidential counseling records
- Career guidance resources
- Psychological assessments
- Referral system

#### 📊 SAS Module (Pending)
- Student Affairs Services management
- Student organization management
- Event management and registration
- Scholarship applications
- Student conduct records
- Campus life resources

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
│   ├── Models/              # Shared models (User, AuditLog, etc.)
│   ├── Providers/           # Service providers
│   ├── Services/            # Shared business logic
│   └── Modules/             # 🎯 MODULE BOUNDARY
│       ├── Registrar/       # Document Request System
│       ├── USG/             # Student Government Portal
│       ├── Guidance/        # Student Guidance Services
│       └── SAS/             # Student Affairs Services
├── resources/js/
│   ├── components/          # Shared UI components
│   ├── layouts/             # Shared layouts
│   ├── lib/                 # Utilities and helpers
│   └── pages/               # 🎯 FRONTEND MODULE BOUNDARY
│       ├── registrar/
│       ├── usg/
│       ├── guidance/
│       └── sas/
├── database/
│   ├── migrations/          # Shared migrations
│   ├── factories/           # Model factories
│   └── seeders/             # Database seeders
└── routes/
    └── web.php              # Includes all module routes
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
| **PHP** | 8.2.29 | Server-side language |
| **Laravel** | 12.32.5 | PHP framework |
| **Inertia.js (Server)** | 2.0.10 | Modern monolith SPA adapter |
| **Laravel Fortify** | 1.31.1 | Authentication backend |
| **Spatie Permission** | 6.21 | Role-based access control |
| **DomPDF** | 3.1 | PDF document generation |
| **MySQL** | 8.0+ | Relational database |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI library |
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
| **Pest** | 3.8.4 | Testing framework |
| **Laravel Boost** | 1.3 | Development productivity MCP server |
| **Laravel Wayfinder** | 0.1.12 | Type-safe routing |

---

## 📦 Modules

### Current Status

| Module | Status | Routes | Database Tables | Purpose |
|--------|--------|--------|-----------------|---------|
| **Registrar** | ✅ Active | 35+ | 7 | Document request system |
| **USG** | 📋 Planned | - | - | Student government transparency |
| **Guidance** | 🔜 Pending | - | - | Student counseling services |
| **SAS** | 🔜 Pending | - | - | Student affairs management |

### Module Anatomy

Each module follows a consistent structure:

```
app/Modules/{ModuleName}/
├── Http/
│   ├── Controllers/         # Module controllers
│   ├── Middleware/          # Module middleware
│   └── Requests/            # Form validation
├── Models/                  # Module-specific models
├── Services/                # Business logic
└── routes.php               # Module routes

resources/js/pages/{modulename}/
├── index.tsx                # Module landing page
├── dashboard.tsx            # Module dashboard
├── {feature}/               # Feature pages
│   ├── index.tsx
│   ├── create.tsx
│   ├── edit.tsx
│   └── show.tsx
└── components/              # Module components
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

### Registrar Module Tables

- **document_requests** - Document request records
- **payments** - Payment transactions
- **payment_webhooks** - PayMongo webhook logs
- **notifications** - SMS/Email notifications

### Key Relationships

```
users (1) ─────── (*) students
users (1) ─────── (*) document_requests (as processor)
students (1) ───── (*) document_requests
document_requests (1) ─ (*) payments
document_requests (1) ─ (*) notifications
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

This project uses **Pest** for testing with a focus on feature and unit tests.

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Registrar/DocumentRequestTest.php

# Filter by test name
php artisan test --filter=testCanCreateDocumentRequest

# Run with coverage (requires Xdebug)
php artisan test --coverage

# Run in parallel
php artisan test --parallel
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

- **[MODULAR_ARCHITECTURE.md](MODULAR_ARCHITECTURE.md)** - Complete architecture guide
- **[DRS.md](DRS.md)** - Document Request System specifications
- **[USG_INFORMATION_PORTAL_SRS.md](USG_INFORMATION_PORTAL_SRS.md)** - USG module requirements
- **[DIRECTORY_STRUCTURE.md](DIRECTORY_STRUCTURE.md)** - File organization guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[req-type.md](req-type.md)** - Document types and fees

### External Resources

- [Laravel 12 Documentation](https://laravel.com/docs/12.x)
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
