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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('activity_title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->boolean('all_day')->default(false);
            $table->string('location')->nullable();
            $table->string('category')->nullable();
            $table->string('organizer')->nullable();
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('set null');
            $table->string('color')->default('#3b82f6');
            $table->boolean('is_recurring')->default(false);
            $table->string('recurrence_rule')->nullable();
            $table->enum('status', ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'])->default('Scheduled');
            $table->integer('target_participants')->nullable();
            $table->integer('actual_participants')->nullable();
            $table->text('completion_report')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
