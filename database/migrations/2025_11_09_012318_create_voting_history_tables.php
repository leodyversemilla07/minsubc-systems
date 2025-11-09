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
        // History table
        Schema::create('history', function (Blueprint $table) {
            $table->id();
            $table->string('election_title', 255);
            $table->dateTime('deleted_at');
            $table->text('candidates')->nullable();
            $table->text('voters')->nullable();
            $table->text('votes')->nullable();
            $table->text('positions')->nullable();
            $table->text('partylists')->nullable();
            $table->timestamps();
        });

        // History elections
        Schema::create('history_elections', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('election_code', 50);
            $table->timestamp('deleted_at')->useCurrent();
            $table->timestamps();
        });

        // History candidates
        Schema::create('history_candidates', function (Blueprint $table) {
            $table->id();
            $table->integer('election_id');
            $table->string('name', 255);
            $table->integer('position_id');
            $table->integer('votes')->default(0);
            $table->timestamp('deleted_at')->useCurrent();
            $table->timestamps();
        });

        // History positions
        Schema::create('history_positions', function (Blueprint $table) {
            $table->id();
            $table->integer('election_id');
            $table->string('position_name', 255);
            $table->integer('max_vote');
            $table->timestamp('deleted_at')->useCurrent();
            $table->timestamps();
        });

        // History votes
        Schema::create('history_votes', function (Blueprint $table) {
            $table->id();
            $table->integer('election_id');
            $table->integer('voter_id');
            $table->integer('candidate_id');
            $table->timestamp('deleted_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_votes');
        Schema::dropIfExists('history_positions');
        Schema::dropIfExists('history_candidates');
        Schema::dropIfExists('history_elections');
        Schema::dropIfExists('history');
    }
};
