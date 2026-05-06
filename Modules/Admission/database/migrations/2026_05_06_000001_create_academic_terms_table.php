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
        Schema::create('academic_terms', function (Blueprint $table) {
            $table->id();
            $table->string('academic_year', 20); // e.g., "2025-2026"
            $table->enum('semester', ['1st', '2nd', 'Summer']);
            $table->date('enrollment_start');
            $table->date('enrollment_end');
            $table->date('classes_start')->nullable();
            $table->date('classes_end')->nullable();
            $table->enum('status', ['upcoming', 'enrollment', 'ongoing', 'ended'])->default('upcoming');
            $table->boolean('is_active')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['academic_year', 'semester']);
            $table->index('status');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_terms');
    }
};