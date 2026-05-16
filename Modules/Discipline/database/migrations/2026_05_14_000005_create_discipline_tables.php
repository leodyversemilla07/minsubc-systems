<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dsc_offense_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tier'); // minor, major, grave
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });

        Schema::create('dsc_offenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('dsc_offense_categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->text('penalty_guideline')->nullable();
            $table->timestamps();
        });

        Schema::create('dsc_incidents', function (Blueprint $table) {
            $table->id();
            $table->string('student_id');
            $table->foreignId('offense_id')->constrained('dsc_offenses');
            $table->foreignId('reported_by')->constrained('users');
            $table->date('incident_date');
            $table->string('location')->nullable();
            $table->text('description');
            $table->string('status')->default('pending');
            $table->text('resolution')->nullable();
            $table->timestamps();
        });

        Schema::create('dsc_sanctions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incident_id')->constrained('dsc_incidents')->cascadeOnDelete();
            $table->string('type'); // warning, suspension, community_service, probation, expulsion
            $table->text('description');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('issued_by')->constrained('users');
            $table->string('status')->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('dsc_appeals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incident_id')->constrained('dsc_incidents')->cascadeOnDelete();
            $table->date('appeal_date');
            $table->text('reason');
            $table->string('status')->default('pending');
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->date('review_date')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dsc_appeals');
        Schema::dropIfExists('dsc_sanctions');
        Schema::dropIfExists('dsc_incidents');
        Schema::dropIfExists('dsc_offenses');
        Schema::dropIfExists('dsc_offense_categories');
    }
};