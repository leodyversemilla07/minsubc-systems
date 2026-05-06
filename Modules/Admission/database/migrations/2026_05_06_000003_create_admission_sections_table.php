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
        Schema::create('admission_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_term_id')->constrained('academic_terms')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('name', 50); // e.g., "BSIT-1A", "BSCS-2B"
            $table->integer('year_level');
            $table->integer('max_students')->default(40);
            $table->integer('current_students')->default(0);
            $table->foreignId('adviser_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('status', ['open', 'closed', 'full'])->default('open');
            $table->text('room')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['academic_term_id', 'course_id', 'name']);
            $table->index(['academic_term_id', 'course_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_sections');
    }
};