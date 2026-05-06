<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if table exists
        if (!Schema::hasTable('admission_enrollments')) {
            // Table doesn't exist - create it with all columns (fresh install)
            Schema::create('admission_enrollments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('applicant_id')->constrained('admission_applicants')->onDelete('cascade');
                $table->foreignId('user_id')->nullable()->constrained('users');
                $table->string('student_id', 20)->nullable();
                $table->foreignId('academic_term_id')->nullable()->constrained('academic_terms')->nullOnDelete();
                $table->foreignId('section_id')->nullable()->constrained('admission_sections')->nullOnDelete();
                $table->enum('status', ['pending', 'confirmed', 'enrolled', 'dropped', 'cancelled'])->default('pending');
                $table->string('academic_year', 20);
                $table->enum('semester', ['1st', '2nd', 'Summer']);
                $table->string('year_level', 10)->default('1');
                $table->json('enrollment_data')->nullable();
                $table->timestamp('confirmed_at')->nullable();
                $table->timestamp('enrolled_at')->nullable();
                $table->foreignId('confirmed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->text('notes')->nullable();
                $table->decimal('gpa', 4, 2)->nullable();
                $table->timestamps();
            });
        } else {
            // Table exists - add missing columns
            Schema::table('admission_enrollments', function (Blueprint $table) {
                // Add new columns if they don't exist
                if (!Schema::hasColumn('admission_enrollments', 'academic_term_id')) {
                    $table->foreignId('academic_term_id')->nullable()->constrained('academic_terms')->nullOnDelete()->after('student_id');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'section_id')) {
                    $table->foreignId('section_id')->nullable()->constrained('admission_sections')->nullOnDelete()->after('academic_term_id');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'enrollment_data')) {
                    $table->json('enrollment_data')->nullable()->after('year_level');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'confirmed_at')) {
                    $table->timestamp('confirmed_at')->nullable()->after('enrollment_data');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'enrolled_at')) {
                    $table->timestamp('enrolled_at')->nullable()->after('confirmed_at');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'confirmed_by')) {
                    $table->foreignId('confirmed_by')->nullable()->constrained('users')->nullOnDelete()->after('enrolled_at');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'notes')) {
                    $table->text('notes')->nullable()->after('confirmed_by');
                }
                
                if (!Schema::hasColumn('admission_enrollments', 'gpa')) {
                    $table->decimal('gpa', 4, 2)->nullable()->after('notes');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Don't drop table in down() - just remove the added columns
        if (Schema::hasTable('admission_enrollments')) {
            Schema::table('admission_enrollments', function (Blueprint $table) {
                $columns = ['academic_term_id', 'section_id', 'enrollment_data', 'confirmed_at', 'enrolled_at', 'confirmed_by', 'notes', 'gpa'];
                
                $table->dropForeign(['academic_term_id']);
                $table->dropForeign(['section_id']);
                $table->dropForeign(['confirmed_by']);
                
                foreach ($columns as $column) {
                    if (Schema::hasColumn('admission_enrollments', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }
    }
};