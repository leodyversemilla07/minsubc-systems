<?php

namespace Modules\Curriculum\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Programs (BSIT, BSCS, etc.)
        if (!Schema::hasTable('cur_programs')) {
            Schema::create('cur_programs', function (Blueprint $table) {
                $table->id();
                $table->string('code', 20)->unique();
                $table->string('name');
                $table->string('full_name')->nullable();
                $table->string('level')->default('undergraduate'); // undergraduate, graduate, postgraduate, short_course
                $table->string('college')->nullable();
                $table->integer('years')->default(4);
                $table->integer('total_units')->default(0);
                $table->text('description')->nullable();
                $table->text('objectives')->nullable();
                $table->text('career_opportunities')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Curriculum Versions (a program can have multiple curriculum versions)
        if (!Schema::hasTable('cur_curricula')) {
            Schema::create('cur_curricula', function (Blueprint $table) {
                $table->id();
                $table->foreignId('program_id')->constrained('cur_programs')->cascadeOnDelete();
                $table->string('version_name'); // e.g., "2024 Curriculum", "Revised 2025"
                $table->string('academic_year')->nullable();
                $table->integer('total_units')->default(0);
                $table->text('description')->nullable();
                $table->string('status')->default('draft'); // draft, published, archived
                $table->date('effective_date')->nullable();
                $table->date('approved_at')->nullable();
                $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }

        // Program Learning Outcomes
        if (!Schema::hasTable('cur_program_outcomes')) {
            Schema::create('cur_program_outcomes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('program_id')->constrained('cur_programs')->cascadeOnDelete();
                $table->string('code', 10); // e.g., PO1, PO2
                $table->text('description');
                $table->string('domain')->nullable(); // knowledge, skills, attitude, values
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->unique(['program_id', 'code']);
            });
        }

        // Courses (subjects offered)
        if (!Schema::hasTable('cur_courses')) {
            Schema::create('cur_courses', function (Blueprint $table) {
                $table->id();
                $table->string('code', 20)->unique(); // e.g., IT 101
                $table->string('name');
                $table->text('description')->nullable();
                $table->decimal('units', 5, 1)->default(3.0);
                $table->decimal('lecture_hours', 5, 1)->default(3.0);
                $table->decimal('lab_hours', 5, 1)->default(0);
                $table->string('category')->default('major'); // major, general_education, elective, nstp, pe, nstp
                $table->boolean('is_lab')->default(false);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Course Prerequisites
        if (!Schema::hasTable('cur_prerequisites')) {
            Schema::create('cur_prerequisites', function (Blueprint $table) {
                $table->id();
                $table->foreignId('course_id')->constrained('cur_courses')->cascadeOnDelete();
                $table->foreignId('prerequisite_id')->constrained('cur_courses')->cascadeOnDelete();
                $table->string('type')->default('required'); // required, recommended, corequisite
                $table->timestamps();
                $table->unique(['course_id', 'prerequisite_id']);
            });
        }

        // Curriculum Course Mappings (which courses in which year/term of a curriculum)
        if (!Schema::hasTable('cur_curriculum_courses')) {
            Schema::create('cur_curriculum_courses', function (Blueprint $table) {
                $table->id();
                $table->foreignId('curriculum_id')->constrained('cur_curricula')->cascadeOnDelete();
                $table->foreignId('course_id')->constrained('cur_courses')->cascadeOnDelete();
                $table->integer('year_level')->default(1);
                $table->string('semester')->default('1st'); // 1st, 2nd, summer
                $table->boolean('is_elective')->default(false);
                $table->text('notes')->nullable();
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->unique(['curriculum_id', 'course_id', 'year_level', 'semester'], 'curric_course_unique');
            });
        }

        // Syllabi
        if (!Schema::hasTable('cur_syllabi')) {
            Schema::create('cur_syllabi', function (Blueprint $table) {
                $table->id();
                $table->foreignId('course_id')->constrained('cur_courses')->cascadeOnDelete();
                $table->string('version')->default('1.0');
                $table->string('academic_year')->nullable();
                $table->string('semester')->nullable();
                $table->text('course_description')->nullable();
                $table->text('learning_objectives')->nullable();
                $table->string('grading_system')->nullable(); // e.g., "Standard", "Pass/Fail"
                $table->json('grading_components')->nullable();
                $table->json('course_policies')->nullable();
                $table->json('weekly_topics')->nullable();
                $table->json('references')->nullable();
                $table->string('status')->default('draft'); // draft, published, archived
                $table->foreignId('prepared_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('approved_at')->nullable();
                $table->timestamps();
            });
        }

        // Syllabus Course Outcomes
        if (!Schema::hasTable('cur_course_outcomes')) {
            Schema::create('cur_course_outcomes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('syllabus_id')->constrained('cur_syllabi')->cascadeOnDelete();
                $table->string('code', 10); // CO1, CO2
                $table->text('description');
                $table->string('domain')->nullable();
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->unique(['syllabus_id', 'code']);
            });
        }

        // CO-PO Mapping
        if (!Schema::hasTable('cur_co_po_mappings')) {
            Schema::create('cur_co_po_mappings', function (Blueprint $table) {
                $table->id();
                $table->foreignId('course_outcome_id')->constrained('cur_course_outcomes')->cascadeOnDelete();
                $table->foreignId('program_outcome_id')->constrained('cur_program_outcomes')->cascadeOnDelete();
                $table->string('strength')->default('moderate'); // low, moderate, strong
                $table->timestamps();
                $table->unique(['course_outcome_id', 'program_outcome_id'], 'co_po_unique');
            });
        }

        // Textbooks & References
        if (!Schema::hasTable('cur_textbooks')) {
            Schema::create('cur_textbooks', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('author');
                $table->string('isbn')->nullable();
                $table->string('publisher')->nullable();
                $table->year('year')->nullable();
                $table->string('type')->default('textbook'); // textbook, reference, journal, online_resource
                $table->timestamps();
            });
        }

        // Syllabus Textbook Mappings
        if (!Schema::hasTable('cur_syllabus_textbooks')) {
            Schema::create('cur_syllabus_textbooks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('syllabus_id')->constrained('cur_syllabi')->cascadeOnDelete();
                $table->foreignId('textbook_id')->constrained('cur_textbooks')->cascadeOnDelete();
                $table->string('type')->default('required'); // required, recommended
                $table->timestamps();
                $table->unique(['syllabus_id', 'textbook_id']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('cur_syllabus_textbooks');
        Schema::dropIfExists('cur_textbooks');
        Schema::dropIfExists('cur_co_po_mappings');
        Schema::dropIfExists('cur_course_outcomes');
        Schema::dropIfExists('cur_syllabi');
        Schema::dropIfExists('cur_curriculum_courses');
        Schema::dropIfExists('cur_prerequisites');
        Schema::dropIfExists('cur_courses');
        Schema::dropIfExists('cur_program_outcomes');
        Schema::dropIfExists('cur_curricula');
        Schema::dropIfExists('cur_programs');
    }
};