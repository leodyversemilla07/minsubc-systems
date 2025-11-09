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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('election_id')->constrained('elections')->onDelete('cascade');
            $table->unsignedBigInteger('position_id');
            $table->string('firstname', 30);
            $table->string('lastname', 30);
            $table->string('photo', 150);
            $table->text('platform');
            $table->unsignedBigInteger('partylist_id')->nullable();
            $table->timestamps();
            
            $table->foreign('position_id')->references('position_id')->on('positions')->onDelete('cascade');
            $table->foreign('partylist_id')->references('partylist_id')->on('partylists')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
