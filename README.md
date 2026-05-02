<div align="center">

# MinSU BC Systems Platform

**A comprehensive web platform for Mindoro State University - Bongabong Campus**

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat)

[Features](#features) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [Modules](#modules) • [Docs](#documentation)

</div>

---

## Overview

The **MinSU BC Systems Platform** is a modular web application that consolidates four critical university systems into a unified platform:

- **Registrar** - Document request and management system
- **USG** - University Student Government portal
- **SAS** - Student Affairs and Services
- **VotingSystem** - Student elections and voting

---

## Features

### Core Platform
- Unified authentication with 2FA support
- Role-based access control (RBAC)
- Real-time notifications (email/SMS)
- Payment integration (PayMongo + Cash)
- Dark mode support
- Full TypeScript implementation
- Comprehensive audit logging

### Modules

| Module | Status | Purpose |
|--------|--------|---------|
| **Registrar** | ✅ Active | Document requests (TOR, COE, Grades), payment processing, cashier reports |
| **USG** | ✅ Active | Officers directory, announcements, events, transparency reports |
| **SAS** | ✅ Active | Organizations, scholarships, insurance, renewals |
| **VotingSystem** | ✅ Active | Elections, candidates, voters, party lists, positions |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Laravel 12, PHP 8.2+ |
| **Frontend** | React 19, TypeScript, Inertia.js |
| **Styling** | Tailwind CSS 4, Shadcn UI |
| **Database** | MySQL 8.0 |
| **Testing** | Pest, PHPUnit |
| **Routing** | Laravel Wayfinder |

---

## Quick Start

### Prerequisites
- PHP >= 8.2, Composer, Node.js >= 20.x, MySQL >= 8.0

### Installation

```bash
# Clone and install
git clone https://github.com/leodyversemilla07/minsubc-systems.git
cd minsubc-systems

# Install dependencies
composer install
npm install

# Setup
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Run
composer run dev
```

### Docker (Alternative)

```bash
./vendor/bin/sail up
```

---

## Project Structure

```
minsubc-systems/
├── app/                    # Laravel application
├── Modules/                # Modular modules (Registrar, USG, SAS, VotingSystem)
├── resources/js/           # React frontend
│   ├── pages/              # Page components by module
│   └── components/         # Shared UI components
├── database/               # Migrations and seeders
├── tests/                  # Test suites
└── docs/                  # Documentation
```

---

## Commands

```bash
# Development
composer run dev           # Start dev server
npm run dev               # Vite dev server

# Testing
composer test             # Run all tests
php artisan test          # Laravel tests

# Code Quality
vendor/bin/pint           # PHP formatting
npm run format            # JS/TS formatting
npm run lint              # Linting
```

---

## Documentation

For detailed documentation, see:

| Doc | Description |
|-----|-------------|
| [docs/README.md](docs/README.md) | Full documentation index |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [docs/TECHNICAL.md](docs/TECHNICAL.md) | Technical details |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide |

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and write tests
4. Run `composer test` and `npm run lint`
5. Commit and submit a Pull Request

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/leodyversemilla07/minsubc-systems/issues)
- **Email**: support@minsubc.edu.ph

</div>