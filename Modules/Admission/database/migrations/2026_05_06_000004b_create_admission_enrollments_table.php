<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// NOTE: The "b" infix orders this before 000004 (schedules) and 000005
// (enrollment_subjects), which declares a foreign key to this table.
// MySQL enforces FK ordering; SQLite silently ignores it, which is why
// this only surfaced on MySQL. See 000008 (alters) and 000005/000007 (FKs).
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('admission_enrollments')) {
            return;
        }

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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_enrollments');
    }
};
