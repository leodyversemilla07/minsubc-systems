<?php

namespace Modules\HR\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('hr_departments')) {
            Schema::create('hr_departments', function (Blueprint $table) {
                $table->id();
                $table->string('code', 20)->unique();
                $table->string('name');
                $table->string('type')->default('academic'); // academic, administrative, office
                $table->text('description')->nullable();
                $table->foreignId('head_id')->nullable()->constrained('hr_employees')->nullOnDelete();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hr_positions')) {
            Schema::create('hr_positions', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category')->default('faculty'); // faculty, staff, executive
                $table->string('employment_type')->default('full-time'); // full-time, part-time, contractual
                $table->text('description')->nullable();
                $table->decimal('salary_grade_min', 12, 2)->nullable();
                $table->decimal('salary_grade_max', 12, 2)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hr_employees')) {
            Schema::create('hr_employees', function (Blueprint $table) {
                $table->id();
                $table->string('employee_id', 20)->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('first_name');
                $table->string('last_name');
                $table->string('middle_name')->nullable();
                $table->string('email')->unique();
                $table->string('phone')->nullable();
                $table->text('address')->nullable();
                $table->date('birth_date')->nullable();
                $table->string('gender')->nullable();
                $table->string('civil_status')->nullable();
                $table->foreignId('department_id')->nullable()->constrained('hr_departments')->nullOnDelete();
                $table->foreignId('position_id')->nullable()->constrained('hr_positions')->nullOnDelete();
                $table->string('employment_status')->default('active'); // active, inactive, on-leave, resigned, terminated
                $table->date('hire_date');
                $table->date('regularization_date')->nullable();
                $table->date('resignation_date')->nullable();
                $table->string('education_level')->nullable();
                $table->string('specialization')->nullable();
                $table->string('profile_photo')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hr_attendance')) {
            Schema::create('hr_attendance', function (Blueprint $table) {
                $table->id();
                $table->foreignId('employee_id')->constrained('hr_employees')->cascadeOnDelete();
                $table->date('date');
                $table->timestamp('time_in')->nullable();
                $table->timestamp('time_out')->nullable();
                $table->string('status')->default('present'); // present, late, absent, half-day, holiday, leave
                $table->text('remarks')->nullable();
                $table->timestamps();
                $table->unique(['employee_id', 'date']);
            });
        }

        if (!Schema::hasTable('hr_leave_types')) {
            Schema::create('hr_leave_types', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code', 10)->unique();
                $table->text('description')->nullable();
                $table->integer('days_per_year')->default(15);
                $table->boolean('is_paid')->default(true);
                $table->boolean('requires_approval')->default(true);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hr_leave_requests')) {
            Schema::create('hr_leave_requests', function (Blueprint $table) {
                $table->id();
                $table->string('leave_code', 20)->unique();
                $table->foreignId('employee_id')->constrained('hr_employees')->cascadeOnDelete();
                $table->foreignId('leave_type_id')->constrained('hr_leave_types');
                $table->date('start_date');
                $table->date('end_date');
                $table->integer('total_days');
                $table->text('reason');
                $table->string('status')->default('pending'); // pending, approved, rejected, cancelled
                $table->foreignId('approved_by')->nullable()->constrained('hr_employees')->nullOnDelete();
                $table->timestamp('approved_at')->nullable();
                $table->text('approval_notes')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hr_evaluations')) {
            Schema::create('hr_evaluations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('employee_id')->constrained('hr_employees')->cascadeOnDelete();
                $table->foreignId('evaluator_id')->constrained('hr_employees')->cascadeOnDelete();
                $table->string('type'); // periodic, performance, peer, self
                $table->string('period'); // Q1 2026, AY 2025-2026
                $table->integer('rating')->nullable(); // 1-5 or percentage
                $table->text('comments')->nullable();
                $table->string('status')->default('pending'); // pending, completed
                $table->timestamp('submitted_at')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('hr_evaluations');
        Schema::dropIfExists('hr_leave_requests');
        Schema::dropIfExists('hr_leave_types');
        Schema::dropIfExists('hr_attendance');
        Schema::dropIfExists('hr_employees');
        Schema::dropIfExists('hr_positions');
        Schema::dropIfExists('hr_departments');
    }
};