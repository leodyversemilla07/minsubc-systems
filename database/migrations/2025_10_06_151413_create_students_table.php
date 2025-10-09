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
        Schema::create('students', function (Blueprint $table) {
            $table->string('student_id', 20)->primary();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('course', 100)->nullable();
            $table->integer('year_level')->nullable();
            $table->string('campus', 50)->nullable();
            $table->enum('status', ['active', 'inactive', 'graduated'])->default('active');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');

            // Performance indexes
            $table->index('status');
            $table->index('campus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
