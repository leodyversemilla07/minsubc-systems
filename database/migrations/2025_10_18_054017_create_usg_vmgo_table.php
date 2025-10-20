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
        Schema::create('usg_vmgo', function (Blueprint $table) {
            $table->id();
            $table->text('vision');
            $table->text('mission');
            $table->json('goals');
            $table->json('objectives');
            $table->date('effective_date');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usg_vmgo');
    }
};
