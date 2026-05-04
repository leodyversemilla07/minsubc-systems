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
        Schema::create('admission_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('academic_year', 20);
            $table->enum('semester', ['1st', '2nd', 'Summer']);
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('slots')->default(0);
            $table->integer('slots_filled')->default(0);
            $table->date('application_start');
            $table->date('application_end');
            $table->enum('status', ['open', 'closed', 'full'])->default('open');
            $table->timestamps();

            $table->unique(['course_id', 'academic_year', 'semester']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_programs');
    }
};
