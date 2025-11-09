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
        Schema::create('voting_admins', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50);
            $table->string('password', 60);
            $table->string('firstname', 50);
            $table->string('lastname', 50);
            $table->string('photo', 150);
            $table->date('created_on');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voting_admins');
    }
};
