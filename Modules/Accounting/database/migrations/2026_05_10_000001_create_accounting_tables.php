<?php

namespace Modules\Accounting\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Fee Categories (tuition, lab, miscellaneous, etc.)
        if (!Schema::hasTable('acc_fee_categories')) {
            Schema::create('acc_fee_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code', 20)->unique();
                $table->text('description')->nullable();
                $table->boolean('is_required')->default(true);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Fee Items (specific fees under a category)
        if (!Schema::hasTable('acc_fee_items')) {
            Schema::create('acc_fee_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('fee_category_id')->constrained('acc_fee_categories')->cascadeOnDelete();
                $table->string('name');
                $table->string('code', 20)->unique();
                $table->decimal('amount', 12, 2)->default(0);
                $table->enum('type', ['tuition', 'laboratory', 'miscellaneous', 'other'])->default('other');
                $table->enum('billing_cycle', ['per_term', 'per_year', 'one_time'])->default('per_term');
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Student Fee Assessments (what each student owes per term)
        if (!Schema::hasTable('acc_assessments')) {
            Schema::create('acc_assessments', function (Blueprint $table) {
                $table->id();
                $table->string('assessment_code', 30)->unique();
                $table->morphs('assessable'); // polymorphic: Student, employee, etc.
                $table->foreignId('term_id')->nullable()->constrained('academic_terms')->nullOnDelete();
                $table->string('academic_year')->nullable();
                $table->string('semester')->nullable(); // 1st, 2nd, summer
                $table->decimal('total_amount', 12, 2)->default(0);
                $table->decimal('paid_amount', 12, 2)->default(0);
                $table->string('status')->default('pending'); // pending, partial, paid, cancelled, waived
                $table->date('due_date')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        // Assessment Lines (individual fee items on an assessment)
        if (!Schema::hasTable('acc_assessment_lines')) {
            Schema::create('acc_assessment_lines', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assessment_id')->constrained('acc_assessments')->cascadeOnDelete();
                $table->foreignId('fee_item_id')->constrained('acc_fee_items')->cascadeOnDelete();
                $table->decimal('amount', 12, 2)->default(0);
                $table->decimal('paid_amount', 12, 2)->default(0);
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        // Payments
        if (!Schema::hasTable('acc_payments')) {
            Schema::create('acc_payments', function (Blueprint $table) {
                $table->id();
                $table->string('payment_code', 30)->unique();
                $table->foreignId('assessment_id')->constrained('acc_assessments')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete(); // collected by
                $table->decimal('amount', 12, 2);
                $table->string('payment_method')->default('cash'); // cash, check, bank_transfer, gcash, paymaya
                $table->string('reference_number')->nullable();
                $table->date('payment_date');
                $table->text('notes')->nullable();
                $table->string('status')->default('completed'); // pending, completed, failed, refunded
                $table->timestamps();
            });
        }

        // Payment Allocations (how a payment is distributed across assessment lines)
        if (!Schema::hasTable('acc_payment_allocations')) {
            Schema::create('acc_payment_allocations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('payment_id')->constrained('acc_payments')->cascadeOnDelete();
                $table->foreignId('assessment_line_id')->constrained('acc_assessment_lines')->cascadeOnDelete();
                $table->decimal('amount', 12, 2);
                $table->timestamps();
            });
        }

        // Invoices
        if (!Schema::hasTable('acc_invoices')) {
            Schema::create('acc_invoices', function (Blueprint $table) {
                $table->id();
                $table->string('invoice_number', 30)->unique();
                $table->foreignId('assessment_id')->constrained('acc_assessments')->cascadeOnDelete();
                $table->string('status')->default('draft'); // draft, sent, paid, overdue, cancelled
                $table->date('issued_date');
                $table->date('due_date');
                $table->decimal('total_amount', 12, 2);
                $table->decimal('paid_amount', 12, 2)->default(0);
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        // Journal Entries (double-entry accounting)
        if (!Schema::hasTable('acc_journal_entries')) {
            Schema::create('acc_journal_entries', function (Blueprint $table) {
                $table->id();
                $table->string('entry_number', 30)->unique();
                $table->date('entry_date');
                $table->string('description');
                $table->string('type'); // payment, assessment, adjustment, refund
                $table->morphs('referenceable'); // polymorphic: payment, assessment
                $table->decimal('total_debit', 14, 2)->default(0);
                $table->decimal('total_credit', 14, 2)->default(0);
                $table->string('status')->default('posted'); // draft, posted
                $table->timestamps();
            });
        }

        // Account Chart (COA)
        if (!Schema::hasTable('acc_chart_accounts')) {
            Schema::create('acc_chart_accounts', function (Blueprint $table) {
                $table->id();
                $table->string('account_code', 20)->unique();
                $table->string('name');
                $table->enum('type', ['asset', 'liability', 'equity', 'revenue', 'expense']);
                $table->foreignId('parent_id')->nullable()->constrained('acc_chart_accounts')->nullOnDelete();
                $table->decimal('balance', 14, 2)->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Journal Lines (individual debit/credit lines)
        if (!Schema::hasTable('acc_journal_lines')) {
            Schema::create('acc_journal_lines', function (Blueprint $table) {
                $table->id();
                $table->foreignId('journal_entry_id')->constrained('acc_journal_entries')->cascadeOnDelete();
                $table->foreignId('chart_account_id')->constrained('acc_chart_accounts')->cascadeOnDelete();
                $table->decimal('debit', 14, 2)->default(0);
                $table->decimal('credit', 14, 2)->default(0);
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        // Discounts & Waivers
        if (!Schema::hasTable('acc_discounts')) {
            Schema::create('acc_discounts', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code', 20)->unique();
                $table->enum('type', ['percentage', 'fixed'])->default('percentage');
                $table->decimal('value', 12, 2);
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Applied Discounts (discounts applied to assessments)
        if (!Schema::hasTable('acc_applied_discounts')) {
            Schema::create('acc_applied_discounts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assessment_id')->constrained('acc_assessments')->cascadeOnDelete();
                $table->foreignId('discount_id')->constrained('acc_discounts')->cascadeOnDelete();
                $table->decimal('amount', 12, 2);
                $table->text('reason')->nullable();
                $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('acc_applied_discounts');
        Schema::dropIfExists('acc_discounts');
        Schema::dropIfExists('acc_journal_lines');
        Schema::dropIfExists('acc_chart_accounts');
        Schema::dropIfExists('acc_journal_entries');
        Schema::dropIfExists('acc_invoices');
        Schema::dropIfExists('acc_payment_allocations');
        Schema::dropIfExists('acc_payments');
        Schema::dropIfExists('acc_assessment_lines');
        Schema::dropIfExists('acc_assessments');
        Schema::dropIfExists('acc_fee_items');
        Schema::dropIfExists('acc_fee_categories');
    }
};