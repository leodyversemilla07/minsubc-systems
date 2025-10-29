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
        Schema::create('scholarship_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('scholarship_id')->constrained('scholarships')->cascadeOnDelete();
            $table->string('academic_year');
            $table->enum('semester', ['1st', '2nd', 'Summer']);
            $table->decimal('amount', 10, 2)->nullable();
            $table->enum('status', ['Active', 'Suspended', 'Completed', 'Cancelled'])->default('Active');
            $table->date('date_awarded')->nullable();
            $table->date('expiration_date')->nullable();
            $table->enum('renewal_status', ['Not Applicable', 'Pending', 'Approved', 'Denied'])->default('Not Applicable');
            $table->text('remarks')->nullable();
            $table->boolean('requirements_complete')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_recipients');
    }
};
