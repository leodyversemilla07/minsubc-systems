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
        Schema::create('organization_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('activity_name');
            $table->text('description')->nullable();
            $table->date('activity_date');
            $table->string('venue')->nullable();
            $table->integer('participants_count')->nullable();
            $table->decimal('budget', 10, 2)->nullable();
            $table->decimal('expenses', 10, 2)->nullable();
            $table->text('accomplishment_report')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_activities');
    }
};
