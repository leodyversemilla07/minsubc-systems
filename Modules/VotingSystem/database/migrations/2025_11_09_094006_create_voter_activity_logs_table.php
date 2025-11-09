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
        Schema::create('voter_activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voter_id')->constrained('voters')->onDelete('cascade');
            $table->foreignId('election_id')->constrained('elections')->onDelete('cascade');
            $table->string('action'); // 'login', 'vote_cast', 'results_viewed', 'ballot_accessed', 'logout'
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->json('metadata')->nullable(); // Additional context (e.g., position_id for votes)
            $table->timestamps();

            // Indexes for efficient querying
            $table->index(['voter_id', 'created_at']);
            $table->index(['election_id', 'action', 'created_at']);
            $table->index('action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voter_activity_logs');
    }
};
