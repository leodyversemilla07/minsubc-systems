<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sch_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('event_type');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->boolean('all_day')->default(false);
            $table->string('location')->nullable();
            $table->foreignId('organizer_id')->constrained('users');
            $table->string('color')->nullable();
            $table->boolean('is_public')->default(true);
            $table->string('status')->default('scheduled');
            $table->string('recurrence_rule')->nullable();
            $table->integer('max_participants')->nullable();
            $table->timestamps();
        });

        Schema::create('sch_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('sch_events')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('confirmed');
            $table->text('notes')->nullable();
            $table->dateTime('checked_in_at')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'user_id']);
        });

        Schema::create('sch_academic_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('academic_year');
            $table->string('term');
            $table->string('event_name');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_holiday')->default(false);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sch_bookings');
        Schema::dropIfExists('sch_events');
        Schema::dropIfExists('sch_academic_schedules');
    }
};