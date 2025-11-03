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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->enum('payment_method', ['cash']); // Only cash payment supported

            // Cash Payment fields
            $table->string('payment_reference_number', 20)->nullable()->unique();
            $table->unsignedBigInteger('cashier_id')->nullable();
            $table->string('official_receipt_number', 50)->nullable();

            // Common fields
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'paid', 'failed', 'expired'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('request_id')->references('id')->on('document_requests');
            $table->foreign('cashier_id')->references('id')->on('users');

            // Performance indexes
            $table->index('status');
            $table->index('payment_reference_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
