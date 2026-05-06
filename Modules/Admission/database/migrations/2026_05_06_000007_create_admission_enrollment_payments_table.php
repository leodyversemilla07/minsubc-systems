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
        Schema::create('admission_enrollment_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained('admission_enrollments')->onDelete('cascade');
            $table->string('payment_number', 50)->unique();
            $table->enum('type', ['full', 'partial', 'installment'])->default('full');
            $table->decimal('amount', 10, 2);
            $table->enum('method', ['cash', 'bank_transfer', 'gcash', 'paymaya', 'card', 'online'])->default('cash');
            $table->string('reference_number')->nullable();
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['enrollment_id', 'status']);
            $table->index('payment_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_enrollment_payments');
    }
};