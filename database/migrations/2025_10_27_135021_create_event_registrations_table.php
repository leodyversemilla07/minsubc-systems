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
        Schema::create('usg_event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('usg_events')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('status')->default('registered'); // registered, cancelled, attended
            $table->text('notes')->nullable();
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            // Prevent duplicate registrations
            $table->unique(['event_id', 'user_id']);

            // Index for queries
            $table->index(['event_id', 'status']);
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usg_event_registrations');
    }
};
