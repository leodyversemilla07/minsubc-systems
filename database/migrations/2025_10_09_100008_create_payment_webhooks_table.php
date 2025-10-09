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
        Schema::create('payment_webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('event_id')->unique()->comment('PayMongo event ID');
            $table->string('event_type')->index()->comment('Webhook event type (e.g., payment.paid, payment.failed)');
            $table->json('payload')->comment('Full webhook payload');
            $table->boolean('processed')->default(false)->index()->comment('Whether the webhook has been processed');
            $table->timestamp('processed_at')->nullable()->comment('When the webhook was processed');
            $table->text('error_message')->nullable()->comment('Error message if processing failed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_webhooks');
    }
};
