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
        Schema::create('resolutions', function (Blueprint $table) {
            $table->id();
            $table->string('resolution_number')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('category')->nullable();
            $table->string('file_path')->nullable();
            $table->enum('status', ['published', 'archived'])->default('published');
            $table->date('resolution_date')->nullable();
            $table->foreignId('submitted_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('approved_at')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'resolution_date']);
            $table->index('submitted_by');
            $table->index('approved_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resolutions');
    }
};
