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
        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('election_id')->constrained('elections')->onDelete('cascade');
            $table->string('voters_id', 15)->unique();
            $table->string('password')->nullable();
            $table->integer('generation_batch')->default(1);
            $table->string('prefix', 10)->default('');
            $table->boolean('has_voted')->default(false);
            $table->timestamps();

            $table->index(['election_id', 'voters_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voters');
    }
};
