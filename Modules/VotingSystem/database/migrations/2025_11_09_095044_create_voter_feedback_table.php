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
        Schema::create('voter_feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voter_id')->constrained('voters')->onDelete('cascade');
            $table->foreignId('election_id')->constrained('elections')->onDelete('cascade');
            $table->integer('rating')->unsigned(); // 1-5 star rating
            $table->text('comment')->nullable(); // Optional feedback comment
            $table->string('experience')->nullable(); // 'excellent', 'good', 'average', 'poor'
            $table->boolean('would_recommend')->nullable(); // Would recommend this voting system?
            $table->json('improvements')->nullable(); // Areas for improvement (checkboxes)
            $table->timestamps();

            // Indexes
            $table->index(['election_id', 'rating']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voter_feedback');
    }
};
