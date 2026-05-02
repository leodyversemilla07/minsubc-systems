# MinSU BC Systems - Documentation

Quick links to help you find what you need.

---

## Getting Started

| Doc | Description |
|-----|-------------|
| [README.md](../README.md) | Project overview and setup |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture |

---

## Modules

| Module | Spec File | Description |
|--------|-----------|-------------|
| **Registrar** | [DRS.md](DRS.md) | Document request system |
| **USG** | [USG_INFORMATION_PORTAL_SRS.md](USG_INFORMATION_PORTAL_SRS.md) | Student government portal |
| **SAS** | [SAS_SRS.md](SAS_SRS.md) | Student affairs services |
| **Voting** | (in module) | Elections and voting |

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

# Testing
composer test

# Code quality
vendor/bin/pint && npm run lint
```

---

## Need Help?

1. Check the relevant spec file above
2. Look at existing modules in `Modules/`
3. See [CONTRIBUTING.md](../CONTRIBUTING.md)