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
        Schema::create('admission_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('code', 20);
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('units')->default(3);
            $table->enum('semester', ['1st', '2nd', 'Summer', 'All'])->default('All');
            $table->integer('year_level')->default(1); // 1-4 or higher for graduate
            $table->enum('type', ['lec', 'lab', 'both'])->default('lec');
            $table->integer('lab_hours')->default(0);
            $table->integer('lec_hours')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['course_id', 'code']);
            $table->index('code');
            $table->index('year_level');
            $table->index('semester');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_subjects');
    }
};