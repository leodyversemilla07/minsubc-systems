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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('election_id')->nullable()->constrained('elections')->onDelete('cascade');
            $table->foreignId('voter_id')->nullable()->constrained('voters')->onDelete('cascade');
            $table->foreignId('candidate_id')->nullable()->constrained('candidates')->onDelete('cascade');
            $table->foreignId('position_id')->nullable()->constrained('positions', 'position_id')->onDelete('cascade');
            $table->timestamp('timestamp')->useCurrent();
            $table->timestamps();

            $table->index(['election_id', 'voter_id']);
            $table->index(['candidate_id', 'position_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
