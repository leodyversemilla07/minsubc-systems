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
        Schema::create('document_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_number', 20)->unique();
            $table->string('student_id', 20);
            $table->string('document_type', 50);
            $table->enum('processing_type', ['regular', 'rush'])->default('regular');
            $table->integer('quantity')->default(1);
            $table->text('purpose')->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('payment_method', ['digital', 'cash'])->nullable();
            $table->enum('status', [
                'pending_payment',
                'payment_expired',
                'paid',
                'processing',
                'ready_for_pickup',
                'picked_up',
                'released',
                'cancelled',
                'rejected',
            ])->default('pending_payment');
            $table->timestamp('payment_deadline')->nullable();
            $table->unsignedBigInteger('processed_by')->nullable();
            $table->unsignedBigInteger('released_by')->nullable();
            $table->string('released_to', 200)->nullable();
            $table->string('released_id_type', 50)->nullable();
            $table->timestamp('released_at')->nullable();
            $table->boolean('picked_up_by_student')->default(false);
            $table->timestamp('picked_up_at')->nullable();
            $table->text('pickup_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('student_id')->on('students');
            $table->foreign('processed_by')->references('id')->on('users');
            $table->foreign('released_by')->references('id')->on('users');

            // Performance indexes
            $table->index('status');
            $table->index('payment_deadline');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_requests');
    }
};
