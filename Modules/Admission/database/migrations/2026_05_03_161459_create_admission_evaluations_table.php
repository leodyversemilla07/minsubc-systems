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
        Schema::create('admission_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')->constrained('admission_applicants')->onDelete('cascade');
            $table->foreignId('evaluator_id')->constrained('users')->onDelete('cascade');
            $table->enum('decision', ['accepted', 'rejected', 'waitlisted']);
            $table->text('notes')->nullable();
            $table->decimal('score', 5, 2)->nullable();
            $table->json('criteria_scores')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_evaluations');
    }
};
