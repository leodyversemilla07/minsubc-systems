# Document Request System Development Plan

## GitHub Issue: `feat(registrar): Implement Document Request System - Database Schema & Core Models`

### Description
Implement the core foundation of the Document Request System (DRS) starting with database schema and Eloquent models. This is the first development phase following the completion of Laravel application scaffolding.

### System Affected
- Registrar (Document Request System)

### Current Status ✅
- Laravel v12.32.5 + Inertia.js v2 + React 19 + Tailwind CSS v4 ✅
- Authentication (Laravel Fortify) ✅
- Basic database setup ✅
- Shadcn UI components available ✅

### Implementation Tasks

#### Phase 1: Database Schema (Priority: High)
- [x] Create `students` table migration
- [x] Create `document_requests` table migration  
- [x] Create `payments` table migration
- [x] Create `payment_webhooks` table migration
- [x] Create `notifications` table migration
- [x] Create `audit_logs` table migration
- [x] Run migrations and verify schema#### Phase 2: Eloquent Models (Priority: High)
- [x] Create `Student` model with relationships
- [x] Create `DocumentRequest` model with relationships
- [x] Create `Payment` model with relationships
- [x] Create `PaymentWebhook` model
- [x] Create `Notification` model
- [x] Create `AuditLog` model
- [x] Add proper casts and fillable attributes
- [x] Move models to `app/Modules/Registrar/Models/` namespace

#### Phase 3: Model Factories & Seeders (Priority: Medium)
- [ ] Create factories for all models
- [ ] Create seeders for test data
- [ ] Update `DatabaseSeeder.php`

### Technical Specifications
- Follow DRS.md database schema (sections 4.1-4.6)
- Use proper foreign key relationships
- Include indexes for performance
- Add database constraints and validations
- Follow Laravel naming conventions

### Acceptance Criteria
- [ ] All migrations created and executable
- [ ] All Eloquent models created with relationships
- [ ] Database schema matches DRS.md specifications
- [ ] Models include proper validation rules
- [ ] Factories and seeders created for testing
- [ ] `php artisan migrate` runs successfully
- [ ] `php artisan db:seed` populates test data

### Related Files
- `database/migrations/` (new files)
- `app/Models/` (new files)
- `database/factories/` (new files)
- `database/seeders/` (updates)
- `DRS.md` (reference documentation)

### Testing Requirements
- [ ] Migration rollback works correctly
- [ ] Model relationships function properly
- [ ] Factory-generated data is valid
- [ ] Seeder runs without errors

### Next Steps
After completion, this will enable:
- Document request API endpoints
- Payment processing integration
- User authentication flows
- Frontend component development

---

## Labels
- `enhancement`
- `registrar`
- `backend`
- `database`
- `priority-high`

## Development Commands

```bash
# Create migrations
php artisan make:migration create_students_table
php artisan make:migration create_document_requests_table
php artisan make:migration create_payments_table
php artisan make:migration create_payment_webhooks_table
php artisan make:migration create_notifications_table
php artisan make:migration create_audit_logs_table

# Create models
php artisan make:model Student
php artisan make:model DocumentRequest
php artisan make:model Payment
php artisan make:model PaymentWebhook
php artisan make:model Notification
php artisan make:model AuditLog

# Run migrations
php artisan migrate

# Create factories
php artisan make:factory StudentFactory
php artisan make:factory DocumentRequestFactory
# ... etc

# Run tests
php artisan test
```

## Database Schema Reference

Based on DRS.md Section 4.1:

### Students Table
```sql
CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    course VARCHAR(100),
    year_level INT,
    campus VARCHAR(50),
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Document Requests Table
```sql
CREATE TABLE document_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_number VARCHAR(20) UNIQUE NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    processing_type ENUM('regular', 'rush') DEFAULT 'regular',
    quantity INT DEFAULT 1,
    purpose TEXT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('digital', 'cash') NOT NULL,
    status ENUM('pending_payment', 'payment_expired', 'paid', 'processing', 'ready_for_pickup', 'released', 'cancelled', 'rejected') DEFAULT 'pending_payment',
    payment_deadline TIMESTAMP NULL,
    processed_by INT NULL,
    released_by INT NULL,
    released_to VARCHAR(200) NULL,
    released_id_type VARCHAR(50) NULL,
    released_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (processed_by) REFERENCES users(id),
    FOREIGN KEY (released_by) REFERENCES users(id)
);
```

*Additional table schemas available in DRS.md sections 4.2-4.6*

## Progress Tracking

- [ ] Database Schema & Migrations
- [ ] Eloquent Models & Relationships
- [ ] Model Factories & Seeders
- [ ] Form Requests & Validation
- [ ] API Endpoints
- [ ] PayMongo Integration
- [ ] Cash Payment System
- [ ] Notification System
- [ ] Frontend Components
- [ ] Testing & QA

---

*This development plan serves as both a GitHub issue template and implementation guide for the Document Request System.*