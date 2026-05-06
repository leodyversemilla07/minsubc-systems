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
        Schema::create('admission_enrollment_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained('admission_enrollments')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('admission_subjects')->onDelete('cascade');
            $table->foreignId('section_id')->nullable()->constrained('admission_sections')->nullOnDelete();
            $table->enum('status', ['enrolled', 'dropped', 'failed', 'incomplete', 'passed'])->default('enrolled');
            $table->decimal('grade', 5, 2)->nullable();
            $table->decimal('gpa', 3, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->unique(['enrollment_id', 'subject_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_enrollment_subjects');
    }
};