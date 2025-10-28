<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usg_foi_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('foi_request_id')->constrained('usg_foi_requests')->cascadeOnDelete();
            $table->string('document_path')->nullable();
            $table->text('response_text')->nullable();
            $table->foreignId('responder_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->index('foi_request_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usg_foi_responses');
    }
};
