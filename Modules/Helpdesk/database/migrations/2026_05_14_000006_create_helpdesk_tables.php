<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hlp_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('hlp_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('hlp_categories');
            $table->string('title');
            $table->text('description');
            $table->string('priority')->default('medium');
            $table->string('status')->default('open');
            $table->foreignId('reported_by')->constrained('users');
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->dateTime('resolved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('hlp_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('hlp_tickets')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users');
            $table->text('body');
            $table->boolean('is_internal')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hlp_comments');
        Schema::dropIfExists('hlp_tickets');
        Schema::dropIfExists('hlp_categories');
    }
};