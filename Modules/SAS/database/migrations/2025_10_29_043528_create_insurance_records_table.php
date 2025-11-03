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
        Schema::create('insurance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->string('insurance_provider');
            $table->string('policy_number');
            $table->string('policy_type')->nullable();
            $table->decimal('coverage_amount', 12, 2)->nullable();
            $table->date('effective_date');
            $table->date('expiration_date');
            $table->enum('status', ['Pending Review', 'Approved', 'Rejected', 'Expired', 'Renewed'])->default('Pending Review');
            $table->string('beneficiary_name')->nullable();
            $table->string('beneficiary_relationship')->nullable();
            $table->string('policy_document_path')->nullable();
            $table->date('submission_date')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_records');
    }
};
