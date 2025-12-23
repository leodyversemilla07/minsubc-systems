# MinSU Bongabong Campus Systems - User Accounts

> **Last Updated:** December 23, 2025  
> **Document Author:** System Administrator

This document contains all seeded user accounts for the MinSU Bongabong Campus Systems. These accounts are created during database seeding for development, testing, and initial production setup.

---

## 📋 Table of Contents

- [Core Users](#core-users)
  - [Super Administrator](#super-administrator)
  - [Students](#students)
- [Module-Specific Users](#module-specific-users)
  - [Registrar Module](#registrar-module)
  - [USG Module](#usg-module)
  - [SAS Module](#sas-module)
  - [Voting System Module](#voting-system-module)
- [Default Credentials](#default-credentials)
- [Security Notes](#security-notes)

---

## 🔐 Core Users

### Super Administrator

The super administrator has full access to all modules and system configurations.

| Field | Value |
|-------|-------|
| **Name** | Super Administrator |
| **Email** | `superadmin@minsu.edu.ph` |
| **Password** | `SuperAdmin@2024` |
| **Role** | `super-admin` |

---

### Students

These are the predefined student accounts. In development/testing environments, an additional 15 random student accounts are generated using factories.

| # | Name | Email | Student ID | Course | Year Level | Campus | Status |
|---|------|-------|------------|--------|------------|--------|--------|
| 1 | John Michael Doe | `john.doe@minsu.edu.ph` | MBC2025-0001 | Bachelor of Science in Computer Science | 3rd Year | Bongabong Campus | Active |
| 2 | Jane Smith | `jane.smith@minsu.edu.ph` | MBC2025-0002 | Bachelor of Science in Information Technology | 2nd Year | Bongabong Campus | Active |
| 3 | Maria Santos Garcia | `maria.garcia@minsu.edu.ph` | MBC2025-0003 | Bachelor of Science in Business Administration | 4th Year | Bongabong Campus | Active |
| 4 | Carlos Reyes Rodriguez | `carlos.rodriguez@minsu.edu.ph` | MBC2025-0004 | Bachelor of Science in Accountancy | 1st Year | Bongabong Campus | Active |
| 5 | Anna Johnson | `anna.johnson@minsu.edu.ph` | MBC2025-0005 | Bachelor of Science in Nursing | 3rd Year | Bongabong Campus | Active |

**Contact Numbers:**
- John Michael Doe: +63 912 345 6789
- Jane Smith: +63 923 456 7890
- Maria Santos Garcia: +63 934 567 8901
- Carlos Reyes Rodriguez: +63 945 678 9012
- Anna Johnson: +63 956 789 0123

---

## 📦 Module-Specific Users

### Registrar Module

Users responsible for registrar operations including document processing, enrollment, and cashier transactions.

#### Cashier

| Field | Value |
|-------|-------|
| **Name** | Elena Cruz Martinez |
| **Email** | `elena.martinez@minsu.edu.ph` |
| **Password** | `password` |
| **Role** | `cashier` |

#### Registrar Staff

| # | Name | Email | Role |
|---|------|-------|------|
| 1 | Roberto Diaz Santiago | `roberto.santiago@minsu.edu.ph` | `registrar-staff` |
| 2 | Patricia Luna Fernandez | `patricia.fernandez@minsu.edu.ph` | `registrar-staff` |

#### Registrar Administrator

| Field | Value |
|-------|-------|
| **Name** | Miguel Antonio Torres |
| **Email** | `miguel.torres@minsu.edu.ph` |
| **Password** | `password` |
| **Role** | `registrar-admin` |

---

### USG Module

Users for the University Student Government module.

#### USG Administrator

| Field | Value |
|-------|-------|
| **Name** | USG Administrator |
| **Email** | `usg-admin@minsu.edu.ph` |
| **Password** | `USGAdmin@2024` |
| **Role** | `usg-admin` |

---

### SAS Module

Users for the Student Affairs and Services module, handling scholarships and student services.

#### SAS Staff

| # | Name | Email | Role |
|---|------|-------|------|
| 1 | Sophia Mae Villanueva | `sophia.villanueva@minsu.edu.ph` | `sas-staff` |
| 2 | Marco Luis Ramos | `marco.ramos@minsu.edu.ph` | `sas-staff` |

#### SAS Administrator

| Field | Value |
|-------|-------|
| **Name** | SAS Administrator |
| **Email** | `sas-admin@minsu.edu.ph` |
| **Password** | `SASAdmin@2024` |
| **Role** | `sas-admin` |

---

### Voting System Module

Users for the election and voting system module.

#### Voting Administrator

| Field | Value |
|-------|-------|
| **Name** | Kian Rodriguez |
| **Email** | `kian.rodriguez@minsu.edu.ph` |
| **Password** | `VotingAdmin@2024` |
| **Role** | `voting-admin` |

#### Voting Manager

| Field | Value |
|-------|-------|
| **Name** | Voting Manager |
| **Email** | `voting-manager@minsu.edu.ph` |
| **Password** | `password` |
| **Role** | `voting-manager` |

---

## 🔑 Default Credentials

### Quick Reference

| User Type | Email | Password |
|-----------|-------|----------|
| **Super Admin** | `superadmin@minsu.edu.ph` | `SuperAdmin@2024` |
| **USG Admin** | `usg-admin@minsu.edu.ph` | `USGAdmin@2024` |
| **SAS Admin** | `sas-admin@minsu.edu.ph` | `SASAdmin@2024` |
| **Voting Admin** | `kian.rodriguez@minsu.edu.ph` | `VotingAdmin@2024` |
| **All Students** | `[name]@minsu.edu.ph` | `password` |
| **All Staff** | `[name]@minsu.edu.ph` | `password` |
| **Voting Manager** | `voting-manager@minsu.edu.ph` | `password` |
---

## 🎯 Role Dashboard Mapping

When users log in, they are automatically redirected to their appropriate dashboard based on their role:

| Role | Dashboard URL | Description |
|------|--------------|-------------|
| `super-admin` | `/super-admin/dashboard` | Super Admin Dashboard |
| `usg-admin` | `/usg/admin` | USG Admin Dashboard |
| `usg-officer` | `/usg/admin` | USG Admin Dashboard |
| `registrar-admin` | `/admin` | Registrar Admin Dashboard |
| `registrar-staff` | `/admin` | Registrar Admin Dashboard |
| `cashier` | `/cashier` | Cashier Dashboard |
| `sas-admin` | `/sas/admin/dashboard` | SAS Admin Dashboard |
| `sas-staff` | `/sas/admin/dashboard` | SAS Admin Dashboard |
| `voting-admin` | `/voting/admin/dashboard` | Voting Admin Dashboard |
| `voting-manager` | `/voting/admin/dashboard` | Voting Admin Dashboard |
| `student` | `/dashboard` | Student Dashboard |

---

## ⚠️ Security Notes

> **IMPORTANT:** These credentials are for development and initial setup only.

1. **Change Default Passwords:** All default passwords should be changed immediately after deploying to a production environment.

2. **Admin Accounts:** Administrator accounts have elevated privileges. Ensure they are secured with strong, unique passwords.

3. **Student Accounts:** In production, student accounts should be created through proper registration workflows, not through seeders.

4. **Factory-Generated Users:** In development/testing environments, 15 additional random student accounts are created. These accounts have randomly generated student IDs in the format `MBC2025-XXXX`.

5. **Email Domain:** All accounts use the `@minsu.edu.ph` domain. Ensure your email server or mail trap is configured accordingly.

---

## 📊 User Statistics Summary

| Category | Count |
|----------|-------|
| Super Administrators | 1 |
| Students (Seeded) | 5 |
| Students (Factory - Dev Only) | 15 |
| Registrar Users | 4 |
| USG Users | 1 |
| SAS Users | 3 |
| Voting System Users | 2 |
| **Total Seeded Users** | **16** |
| **Total with Factory Users (Dev)** | **31** |

---

## 🛠️ Related Seeders

The user accounts are created by the following seeders:

- `database/seeders/UserSeeder.php` - Core users (Students & Super Admin)
- `Modules/Registrar/Database/Seeders/RegistrarUsersSeeder.php` - Registrar module users
- `Modules/USG/Database/Seeders/USGUsersSeeder.php` - USG module users
- `Modules/SAS/Database/Seeders/SASUsersSeeder.php` - SAS module users
- `Modules/VotingSystem/Database/Seeders/VotingSystemUsersSeeder.php` - Voting System module users

---

*This document is auto-generated based on the database seeders. For the most up-to-date information, refer to the actual seeder files.*
