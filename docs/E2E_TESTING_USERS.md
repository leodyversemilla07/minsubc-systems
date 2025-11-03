# E2E Testing & Quality Assurance - User Accounts

**Version:** 1.0  
**Last Updated:** November 4, 2025  
**Project:** MinSUBC Systems  
**Environment:** Development, Staging, Testing

---

## Table of Contents
1. [Overview](#overview)
2. [Seeded User Accounts](#seeded-user-accounts)
3. [Role-Based Test Scenarios](#role-based-test-scenarios)
4. [Module-Specific Testing](#module-specific-testing)
5. [Password Policy](#password-policy)
6. [Environment Configuration](#environment-configuration)
7. [Testing Best Practices](#testing-best-practices)
8. [Automated Testing Scripts](#automated-testing-scripts)

---

## Overview

This document provides comprehensive information about seeded user accounts for End-to-End (E2E) testing and Quality Assurance (QA) of the MinSUBC Systems platform. These accounts are automatically seeded by the `UserSeeder` class and are available in **development, staging, and testing environments only**.

### ⚠️ Security Notice

**Production Environment:**
- Only essential admin accounts are seeded in production
- Test accounts with weak passwords are NOT created in production
- Random student generation is disabled in production

**Non-Production Environments:**
- Full test suite of users is available
- Default password for most accounts: `password`
- Admin accounts use stronger passwords

---

## Seeded User Accounts

### 1. Student Accounts

Student accounts are created with complete profile data and linked to the Student model with student IDs.

#### 1.1 Primary Test Students (5 accounts)

| Name | Email | Student ID | Course | Year | Password | Status |
|------|-------|------------|--------|------|----------|--------|
| John Michael Doe | john.doe@minsu.edu.ph | MBC2025-0001 | BS Computer Science | 3 | `password` | Active |
| Jane Smith | jane.smith@minsu.edu.ph | MBC2025-0002 | BS Information Technology | 2 | `password` | Active |
| Maria Santos Garcia | maria.garcia@minsu.edu.ph | MBC2025-0003 | BS Business Administration | 4 | `password` | Active |
| Carlos Reyes Rodriguez | carlos.rodriguez@minsu.edu.ph | MBC2025-0004 | BS Accountancy | 1 | `password` | Active |
| Anna Johnson | anna.johnson@minsu.edu.ph | MBC2025-0005 | BS Nursing | 3 | `password` | Active |

**Additional Data:**
- Phone: Various Philippine mobile numbers
- Campus: Bongabong Campus
- Email Verified: Yes (all accounts)

#### 1.2 Random Test Students (15 accounts - Dev/Staging only)

In non-production environments, 15 additional random students are generated using factories with:
- Student IDs: MBC2025-1000 to MBC2025-9999 (random)
- Courses: CS, IT, BA, Accountancy, Nursing, Communication, Engineering, Education
- Year Levels: 1-4 (random)
- Status: active, inactive, or graduated (random)

**Note:** Random students are **NOT** created in production to avoid Faker dependency issues.

---

### 2. Registrar Module Accounts

#### 2.1 Cashier

| Name | Email | Role | Password |
|------|-------|------|----------|
| Elena Cruz Martinez | elena.martinez@minsu.edu.ph | cashier | `password` |

**Responsibilities:**
- Verify payment references
- Confirm cash payments
- Process payment transactions
- View payment reports

**Test Scenarios:**
- Payment verification workflows
- Cash payment confirmation
- Payment status updates
- Transaction history viewing

#### 2.2 Registrar Staff (2 accounts)

| Name | Email | Role | Password |
|------|-------|------|----------|
| Roberto Diaz Santiago | roberto.santiago@minsu.edu.ph | registrar-staff | `password` |
| Patricia Luna Fernandez | patricia.fernandez@minsu.edu.ph | registrar-staff | `password` |

**Responsibilities:**
- Process document requests
- Update request status
- Release documents
- Confirm document claims
- Manage student records

**Test Scenarios:**
- Document request processing
- Status updates (pending → processing → ready → released)
- Document release workflows
- Claim confirmation
- Student record management

#### 2.3 Registrar Admin

| Name | Email | Role | Password |
|------|-------|------|----------|
| Miguel Antonio Torres | miguel.torres@minsu.edu.ph | registrar-admin | `password` |

**Responsibilities:**
- Full registrar module access
- User management
- System configuration
- Reports and analytics
- Override capabilities

**Test Scenarios:**
- Admin dashboard access
- User role management
- Document type configuration
- Payment settings
- Comprehensive reporting
- Emergency overrides

---

### 3. USG Module Accounts

#### 3.1 USG Admin

| Name | Email | Role | Password |
|------|-------|------|----------|
| USG Administrator | usg-admin@minsu.edu.ph | usg-admin | `USGAdmin@2024` |

**Responsibilities:**
- Manage VMGO (Vision, Mission, Goals, Objectives)
- Manage USG officers
- Publish resolutions
- Create and manage announcements
- Schedule and manage events
- Upload transparency reports
- Manage organizational documents

**Test Scenarios:**
- VMGO management and updates
- Officer profile management
- Resolution approval workflow
- Announcement creation (normal, important, urgent)
- Event calendar management
- Recurring event creation
- Document repository management
- Public transparency portal

---

### 4. SAS Module Accounts

#### 4.1 SAS Staff (2 accounts)

| Name | Email | Role | Password |
|------|-------|------|----------|
| Sophia Mae Villanueva | sophia.villanueva@minsu.edu.ph | sas-staff | `password` |
| Marco Luis Ramos | marco.ramos@minsu.edu.ph | sas-staff | `password` |

**Responsibilities:**
- Process scholarship applications
- Review insurance submissions
- Manage organization records
- Schedule SAS activities
- Upload digitalized documents

**Test Scenarios:**
- Scholarship recipient management
- Insurance form review and approval
- Organization profile updates
- Activity calendar management
- Document digitalization workflows

#### 4.2 SAS Admin

| Name | Email | Role | Password |
|------|-------|------|----------|
| SAS Administrator | sas-admin@minsu.edu.ph | sas-admin | `SASAdmin@2024` |

**Responsibilities:**
- Full SAS module access
- Scholarship program management
- Insurance policy administration
- Organization oversight (11 minor + 12 major orgs)
- Activity approval and management
- Document disposal management
- Comprehensive reporting

**Test Scenarios:**
- Scholarship program creation
- Mass scholarship assignment
- Insurance policy tracking
- Organization compliance monitoring
- Document disposal workflows
- Advanced analytics and reporting

---

### 5. Super Admin Account

| Name | Email | Role | Password |
|------|-------|------|----------|
| Super Administrator | superadmin@minsu.edu.ph | super-admin | `SuperAdmin@2024` |

**Responsibilities:**
- Full system access across all modules
- System-wide configuration
- User and role management
- Audit log access
- System health monitoring
- Emergency interventions

**Test Scenarios:**
- Cross-module functionality
- System-wide user management
- Role and permission assignment
- Audit trail verification
- System settings configuration
- Performance monitoring

---

## Role-Based Test Scenarios

### Student Role Test Coverage

✅ **Authentication & Profile:**
- Login with credentials
- View and update profile
- Change password
- Email verification flow

✅ **Registrar Module (Student View):**
- Request documents (TOR, diploma, certificates)
- Upload payment proof
- Track request status
- View payment history
- Confirm document receipt

✅ **USG Module (Student View):**
- View VMGO
- Browse USG officers
- Read announcements
- View event calendar
- Export events to calendar
- Download resolutions

✅ **SAS Module (Student View):**
- View scholarship status
- Submit insurance forms
- View organization information
- Register for activities

---

### Staff Role Test Coverage

✅ **Cashier:**
- Verify payment references
- Confirm cash payments
- View pending payments
- Generate payment reports
- Handle payment discrepancies

✅ **Registrar Staff:**
- View pending requests
- Update request status
- Process documents
- Release documents
- Confirm claims
- Manage student records

✅ **SAS Staff:**
- Review scholarship applications
- Process insurance submissions
- Update organization records
- Schedule activities
- Upload documents

✅ **USG Staff:**
- Create announcements
- Schedule events
- Upload documents
- Update officer information

---

### Admin Role Test Coverage

✅ **Registrar Admin:**
- Approve/reject requests
- Configure document types
- Manage pricing
- User management (registrar module)
- Advanced reporting

✅ **SAS Admin:**
- Approve scholarships
- Manage scholarship programs
- Approve insurance policies
- Organization oversight
- Document disposal approval
- System configuration (SAS)

✅ **USG Admin:**
- Publish resolutions
- Approve announcements
- Manage VMGO
- Configure event categories
- Full content management

✅ **Super Admin:**
- All of the above
- System-wide settings
- Cross-module permissions
- Audit log access
- Emergency overrides

---

## Module-Specific Testing

### Registrar Module

**Test Data Available:**
- 5 verified students with complete profiles
- 1 cashier account
- 2 registrar staff accounts
- 1 registrar admin account

**Test Workflows:**

1. **Student Request Flow:**
   ```
   Student Login → Request Document → Upload Payment → 
   Wait for Verification → Receive Notification → Claim Document
   ```

2. **Staff Processing Flow:**
   ```
   Staff Login → View Pending Requests → Update Status → 
   Process Document → Mark Ready for Release
   ```

3. **Cashier Payment Flow:**
   ```
   Cashier Login → View Pending Payments → Verify Reference → 
   Confirm Payment → Update Request Status
   ```

4. **Admin Oversight Flow:**
   ```
   Admin Login → View All Requests → Generate Reports → 
   Configure Settings → Manage Users
   ```

---

### USG Module

**Test Data Available (Seeded):**
- 1 VMGO record
- 12 officer profiles
- 15 resolutions
- 20 announcements (various priorities)
- 30 events (including recurring)
- 10 documents
- 5 transparency reports

**Test Workflows:**

1. **Public Access Flow:**
   ```
   Public User → View VMGO → Browse Officers → 
   Read Announcements → View Events → Download Resolutions
   ```

2. **Admin Content Management:**
   ```
   USG Admin Login → Create Announcement → Schedule Event → 
   Publish Resolution → Upload Document → Update VMGO
   ```

3. **Event Management:**
   ```
   Create Event → Set Recurrence → Add Reminders → 
   Publish to Calendar → Track Registrations → Mark Complete
   ```

---

### SAS Module

**Test Data Available:**
- **Development/Staging Only:**
  - 10 scholarship programs
  - 50+ scholarship recipients
  - 50 insurance records
  - 23 organizations (11 minor + 12 major)
  - 50+ activities
  - 100+ digitalized documents

**Note:** SAS demo data is **NOT** seeded in production. Production will have real data entered by SAS staff.

**Test Workflows:**

1. **Scholarship Management:**
   ```
   SAS Staff → Add Scholar → Assign Scholarship → 
   Track Requirements → Update Status → Generate Reports
   ```

2. **Insurance Processing:**
   ```
   Student → Submit Form → Upload Policy → 
   SAS Staff → Review → Approve/Reject → Send Notification
   ```

3. **Organization Management:**
   ```
   Adviser → Update Org Info → Manage Officers → 
   Add Members → Upload Documents → Submit Reports
   ```

4. **Document Digitalization:**
   ```
   SAS Staff → Scan Document → Upload → Categorize → 
   Mark for Disposal → Approve Disposal → Archive
   ```

---

## Password Policy

### Default Passwords

| Account Type | Default Password | Strength |
|--------------|------------------|----------|
| Students | `password` | Weak (testing only) |
| Staff (non-admin) | `password` | Weak (testing only) |
| Module Admins | `[Module]Admin@2024` | Strong |
| Super Admin | `SuperAdmin@2024` | Strong |

### Password Requirements (Production)

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Cannot match common passwords
- Cannot match user information

### Testing Password Changes

All accounts support password change functionality. Test scenarios:
- ✅ Change password with valid format
- ✅ Attempt weak password (should fail)
- ✅ Attempt password matching user info (should fail)
- ✅ Password confirmation mismatch (should fail)
- ✅ Forgot password flow
- ✅ Password reset via email

---

## Environment Configuration

### Running Seeders

**Development/Staging:**
```bash
# Full seeding (includes random data)
php artisan migrate:fresh --seed

# Specific seeder
php artisan db:seed --class=UserSeeder
```

**Production:**
```bash
# Only essential data (no random generation)
php artisan migrate:fresh --seed
```

### Environment Detection

The seeder automatically detects the environment:

```php
// Random students only in non-production
if (app()->environment('local', 'development', 'testing')) {
    // Create 15 random students
}

// SAS demo data only in non-production
if (! app()->environment('production')) {
    // Seed SAS test data
}
```

---

## Testing Best Practices

### 1. Isolation

✅ **DO:**
- Use separate test accounts for each test suite
- Reset test data between test runs
- Use transactions for unit tests

❌ **DON'T:**
- Share accounts across parallel tests
- Modify admin account data in tests
- Leave test data in database

### 2. Authentication Testing

```php
// Example: Login as specific role
$this->actingAs($student);
$response = $this->get('/registrar/requests');
$response->assertSuccessful();

// Example: Test unauthorized access
$this->actingAs($student);
$response = $this->get('/admin/dashboard');
$response->assertForbidden();
```

### 3. Role-Based Testing

```php
// Test each role's permissions
$roles = ['student', 'registrar-staff', 'registrar-admin'];

foreach ($roles as $role) {
    $user = User::role($role)->first();
    $this->actingAs($user);
    // Perform role-specific tests
}
```

### 4. Data Verification

```php
// Verify seeded data exists
$this->assertDatabaseHas('users', [
    'email' => 'john.doe@minsu.edu.ph',
    'role' => 'student',
]);

$this->assertDatabaseHas('students', [
    'student_id' => 'MBC2025-0001',
    'status' => 'active',
]);
```

---

## Automated Testing Scripts

### Pest Test Examples

```php
// tests/Feature/Auth/LoginTest.php

test('students can login with credentials', function () {
    $response = $this->post('/login', [
        'email' => 'john.doe@minsu.edu.ph',
        'password' => 'password',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticated();
});

test('unauthorized users cannot access admin routes', function () {
    $student = User::where('email', 'john.doe@minsu.edu.ph')->first();
    
    $this->actingAs($student);
    $response = $this->get('/admin/dashboard');
    
    $response->assertForbidden();
});
```

### Browser Testing (Pest v4)

```php
// tests/Browser/DocumentRequestTest.php

test('student can request a document', function () {
    visit('/login')
        ->fill('email', 'john.doe@minsu.edu.ph')
        ->fill('password', 'password')
        ->click('Login')
        ->assertSee('Dashboard')
        ->click('Request Document')
        ->select('document_type', 'TOR')
        ->fill('purpose', 'Employment')
        ->click('Submit')
        ->assertSee('Request submitted successfully');
});
```

---

## Quick Reference

### Common Test Commands

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Auth/LoginTest.php

# Run tests with coverage
php artisan test --coverage

# Run parallel tests
php artisan test --parallel

# Run browser tests
php artisan test tests/Browser

# Seed test database
php artisan db:seed --class=UserSeeder --env=testing
```

### Useful Artisan Commands

```bash
# List all users with roles
php artisan tinker
>>> User::with('roles')->get(['id', 'email', 'first_name', 'last_name']);

# Check specific user
>>> User::where('email', 'john.doe@minsu.edu.ph')->with('roles')->first();

# List all students
>>> Student::with('user')->get(['student_id', 'course', 'year_level']);

# Clear and reseed
php artisan migrate:fresh --seed
```

---

## Support & Troubleshooting

### Common Issues

**Issue: "Faker not found" in production**
- **Solution:** Ensure environment detection is working. Factories should not run in production.

**Issue: Users not seeded**
- **Solution:** Run roles seeder first: `php artisan db:seed --class=RolesAndPermissionsSeeder`

**Issue: Cannot login with test accounts**
- **Solution:** Verify email_verified_at is set. Check password matches expectations.

**Issue: Permission denied errors**
- **Solution:** Verify roles are assigned: `User::find(1)->roles->pluck('name');`

### Contact

For testing support or to report seeding issues:
- Check documentation: `/docs/README.md`
- Review test files: `/tests/Feature`
- Check seeder code: `/database/seeders/UserSeeder.php`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | November 4, 2025 | Initial E2E testing documentation created |

---

**Document End**

*This documentation should be updated whenever seeder logic changes or new test accounts are added.*
