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
        Schema::create('scholarship_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipient_id')->constrained('scholarship_recipients')->cascadeOnDelete();
            $table->string('requirement_name');
            $table->boolean('is_submitted')->default(false);
            $table->date('submission_date')->nullable();
            $table->string('file_path')->nullable();
            $table->date('deadline')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_requirements');
    }
};
