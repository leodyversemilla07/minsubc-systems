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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type'); // Notification class name
            $table->morphs('notifiable'); // Polymorphic relation to any model (User, etc.)
            $table->json('data'); // Notification data (flexible for all modules)
            $table->timestamp('read_at')->nullable(); // When notification was read
            $table->timestamps();

            // Indexes for performance
            $table->index(['notifiable_type', 'notifiable_id', 'read_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
