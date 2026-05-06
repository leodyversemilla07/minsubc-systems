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
        Schema::create('admission_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('admission_sections')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('admission_subjects')->onDelete('cascade');
            $table->string('day', 20); // "Monday", "Tuesday", etc. or "MWF", "TTH"
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room', 50)->nullable();
            $table->foreignId('instructor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('type', ['lec', 'lab'])->default('lec');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['section_id', 'day']);
            $table->index('instructor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_schedules');
    }
};