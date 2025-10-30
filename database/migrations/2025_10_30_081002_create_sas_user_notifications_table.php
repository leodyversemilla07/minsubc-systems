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
        Schema::create('sas_user_notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type'); // Type of notification (scholarship, insurance, etc.)
            $table->morphs('notifiable'); // User who receives the notification
            $table->json('data'); // Notification data (title, message, url, etc.)
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['notifiable_type', 'notifiable_id', 'read_at'], 'sas_notif_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sas_user_notifications');
    }
};
