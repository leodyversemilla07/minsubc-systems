<?php

namespace Modules\Research\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Programs offering research/thesis (reference cur_programs or standalone)
        Schema::create('res_research_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Thesis, Capstone, Dissertation, Feasibility Study
            $table->string('code', 20)->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Research Proposals / Thesis Titles
        Schema::create('res_proposals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('research_type_id')->constrained('res_research_types');
            $table->string('student_id'); // FK to students.student_id
            $table->foreignId('adviser_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('proposal_code', 30)->unique();
            $table->text('abstract')->nullable();
            $table->text('keywords')->nullable();
            $table->string('status')->default('draft'); // draft, submitted, approved, rejected, in_progress, completed
            $table->date('submitted_at')->nullable();
            $table->date('approved_at')->nullable();
            $table->text('adviser_feedback')->nullable();
            $table->foreignId('submitted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // Research Authors (multiple authors per proposal)
        Schema::create('res_authors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('res_proposals')->cascadeOnDelete();
            $table->string('student_id'); // FK to students.student_id
            $table->string('role')->default('member'); // leader, member, adviser, co_adviser
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['proposal_id', 'student_id', 'role'], 'author_unique');
        });

        // Panel Members
        Schema::create('res_panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('res_proposals')->cascadeOnDelete();
            $table->foreignId('panelist_id')->constrained('users')->cascadeOnDelete();
            $table->string('role')->default('member'); // chair, member, secretary
            $table->text('designation')->nullable(); // e.g., "Statistics Expert", "IT Expert"
            $table->timestamps();
            $table->unique(['proposal_id', 'panelist_id']);
        });

        // Defense Schedules & Results
        Schema::create('res_defenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('res_proposals')->cascadeOnDelete();
            $table->string('stage'); // proposal, pre_oral, final_defense, grand_defense
            $table->date('scheduled_date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->string('venue')->nullable();
            $table->string('status')->default('scheduled'); // scheduled, completed, postponed, cancelled
            $table->decimal('final_grade', 5, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->text('recommendations')->nullable();
            $table->json('panel_scores')->nullable();
            $table->date('completed_at')->nullable();
            $table->timestamps();
        });

        // Defense Panel Scores per defense
        Schema::create('res_defense_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('defense_id')->constrained('res_defenses')->cascadeOnDelete();
            $table->foreignId('panelist_id')->constrained('users')->cascadeOnDelete();
            $table->json('criteria_scores'); // {"presentation": 95, "content": 90, ...}
            $table->decimal('total_score', 5, 2);
            $table->text('comments')->nullable();
            $table->timestamps();
            $table->unique(['defense_id', 'panelist_id']);
        });

        // Grade Reports / Final Grades
        Schema::create('res_grade_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('res_proposals')->cascadeOnDelete();
            $table->string('student_id');
            $table->decimal('proposal_grade', 5, 2)->nullable();
            $table->decimal('final_defense_grade', 5, 2)->nullable();
            $table->decimal('manuscript_grade', 5, 2)->nullable();
            $table->decimal('final_grade', 5, 2)->nullable();
            $table->string('remarks')->nullable(); // passed, failed, incomplete
            $table->date('released_at')->nullable();
            $table->timestamps();
            $table->unique(['proposal_id', 'student_id']);
        });

        // Publications / Journals
        Schema::create('res_publications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->nullable()->constrained('res_proposals')->nullOnDelete();
            $table->string('title');
            $table->text('abstract')->nullable();
            $table->string('journal_name')->nullable();
            $table->string('issn')->nullable();
            $table->string('doi')->nullable();
            $table->string('volume')->nullable();
            $table->string('issue')->nullable();
            $table->year('publication_year')->nullable();
            $table->string('url')->nullable();
            $table->string('status')->default('submitted'); // submitted, accepted, published, indexed
            $table->date('published_at')->nullable();
            $table->timestamps();
        });

        // Publication Authors
        Schema::create('res_publication_authors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publication_id')->constrained('res_publications')->cascadeOnDelete();
            $table->string('name');
            $table->string('student_id')->nullable();
            $table->string('affiliation')->nullable();
            $table->string('role')->default('author'); // author, co_author, corresponding
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Research Journals (internal)
        Schema::create('res_journals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('issn')->nullable();
            $table->string('publisher')->nullable();
            $table->text('description')->nullable();
            $table->string('frequency')->nullable(); // annual, semiannual, quarterly
            $table->string('status')->default('active');
            $table->timestamps();
        });

        // Journal Issues
        Schema::create('res_journal_issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('journal_id')->constrained('res_journals')->cascadeOnDelete();
            $table->string('title'); // "Volume 1, Issue 1"
            $table->string('volume')->nullable();
            $table->string('issue')->nullable();
            $table->year('year')->nullable();
            $table->date('published_at')->nullable();
            $table->string('status')->default('draft'); // draft, published
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('res_journal_issues');
        Schema::dropIfExists('res_journals');
        Schema::dropIfExists('res_publication_authors');
        Schema::dropIfExists('res_publications');
        Schema::dropIfExists('res_grade_reports');
        Schema::dropIfExists('res_defense_scores');
        Schema::dropIfExists('res_defenses');
        Schema::dropIfExists('res_panels');
        Schema::dropIfExists('res_authors');
        Schema::dropIfExists('res_proposals');
        Schema::dropIfExists('res_research_types');
    }
};