<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alm_alumni', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->nullable()->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('suffix')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('country')->nullable()->default('Philippines');
            $table->date('birth_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('civil_status')->nullable();
            $table->integer('graduation_year')->nullable();
            $table->string('degree_program')->nullable();
            $table->string('college')->nullable();
            $table->boolean('is_employed')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->string('linkedin_url')->nullable();
            $table->string('photo_url')->nullable();
            $table->string('preferred_contact_method')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('alm_employment_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumnus_id')->constrained('alm_alumni')->cascadeOnDelete();
            $table->string('company_name');
            $table->string('position')->nullable();
            $table->string('industry')->nullable();
            $table->string('employment_type')->nullable();
            $table->decimal('monthly_income', 10, 2)->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->boolean('is_related_to_course')->nullable();
            $table->timestamps();
        });

        Schema::create('alm_educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumnus_id')->constrained('alm_alumni')->cascadeOnDelete();
            $table->string('degree');
            $table->string('institution');
            $table->integer('year_graduated')->nullable();
            $table->string('honors')->nullable();
            $table->boolean('is_higher_education')->default(true);
            $table->timestamps();
        });

        Schema::create('alm_donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumnus_id')->constrained('alm_alumni')->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('currency')->default('PHP');
            $table->string('donation_type')->default('monetary');
            $table->string('purpose')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('transaction_ref')->nullable();
            $table->date('donated_at')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->text('remarks')->nullable();
            $table->timestamps();
        });

        Schema::create('alm_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('event_type');
            $table->dateTime('event_date');
            $table->dateTime('end_date')->nullable();
            $table->string('location')->nullable();
            $table->string('venue')->nullable();
            $table->integer('max_participants')->nullable();
            $table->decimal('registration_fee', 10, 2)->default(0);
            $table->boolean('is_public')->default(true);
            $table->string('status')->default('upcoming');
            $table->string('cover_photo_url')->nullable();
            $table->timestamps();
        });

        Schema::create('alm_event_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('alm_events')->cascadeOnDelete();
            $table->foreignId('alumnus_id')->constrained('alm_alumni')->cascadeOnDelete();
            $table->string('status')->default('registered');
            $table->dateTime('registered_at')->nullable();
            $table->dateTime('attended_at')->nullable();
            $table->integer('number_of_guests')->default(0);
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'alumnus_id']);
        });

        Schema::create('alm_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('survey_type');
            $table->integer('target_year')->nullable();
            $table->boolean('is_active')->default(true);
            $table->dateTime('starts_at')->nullable();
            $table->dateTime('ends_at')->nullable();
            $table->timestamps();
        });

        Schema::create('alm_survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('alm_surveys')->cascadeOnDelete();
            $table->text('question_text');
            $table->string('question_type');
            $table->json('options')->nullable();
            $table->boolean('is_required')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('alm_survey_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('alm_surveys')->cascadeOnDelete();
            $table->foreignId('alumnus_id')->constrained('alm_alumni')->cascadeOnDelete();
            $table->json('answers');
            $table->dateTime('submitted_at')->nullable();
            $table->timestamps();
            $table->unique(['survey_id', 'alumnus_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alm_survey_responses');
        Schema::dropIfExists('alm_survey_questions');
        Schema::dropIfExists('alm_surveys');
        Schema::dropIfExists('alm_event_participants');
        Schema::dropIfExists('alm_events');
        Schema::dropIfExists('alm_donations');
        Schema::dropIfExists('alm_educations');
        Schema::dropIfExists('alm_employment_records');
        Schema::dropIfExists('alm_alumni');
    }
};