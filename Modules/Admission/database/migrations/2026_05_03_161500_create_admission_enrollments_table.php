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
        Schema::create('admission_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')->constrained('admission_applicants')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('student_id', 20)->nullable();
            $table->enum('status', ['pending', 'confirmed', 'enrolled', 'cancelled'])->default('pending');
            $table->string('academic_year', 20);
            $table->enum('semester', ['1st', '2nd', 'Summer']);
            $table->string('year_level', 10)->default('1');
            $table->json('enrollment_data')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('enrolled_at')->nullable();
            $table->foreignId('confirmed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
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
