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
        Schema::create('scholarship_renewals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipient_id')->constrained('scholarship_recipients')->cascadeOnDelete();
            $table->string('academic_year');
            $table->string('semester');
            $table->enum('status', ['Pending', 'Approved', 'Denied'])->default('Pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_renewals');
    }
};
