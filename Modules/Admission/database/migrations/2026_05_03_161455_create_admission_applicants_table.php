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
        Schema::create('admission_applicants', function (Blueprint $table) {
            $table->id();
            $table->string('application_number', 30)->unique();
            $table->foreignId('program_id')->constrained('admission_programs');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            // Personal Information
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('zip_code', 10)->nullable();

            // Previous Education
            $table->string('last_school_attended')->nullable();
            $table->string('strand')->nullable();
            $table->decimal('gpa', 5, 2)->nullable();

            // Status
            $table->enum('status', [
                'draft',
                'submitted',
                'under_review',
                'interview_scheduled',
                'accepted',
                'waitlisted',
                'rejected',
                'enrolled',
            ])->default('draft');

            $table->text('remarks')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('enrolled_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('status');
            $table->index('email');
            $table->index(['program_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_applicants');
    }
};
