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
            $table->foreignId('position_id')->constrained('positions', 'position_id')->onDelete('cascade');
            $table->string('firstname', 30);
            $table->string('lastname', 30);
            $table->string('photo', 150)->nullable();
            $table->text('platform')->nullable();
            $table->foreignId('partylist_id')->nullable()->constrained('partylists', 'partylist_id')->onDelete('set null');
            $table->timestamps();
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
