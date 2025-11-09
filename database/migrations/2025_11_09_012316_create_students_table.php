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
        Schema::create('voting_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voters_id')->constrained('voters')->onDelete('cascade');
            $table->string('name', 255);
            $table->string('year_section', 50);
            $table->string('course', 100);
            $table->foreignId('election_id')->nullable()->constrained('elections')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voting_students');
    }
};
