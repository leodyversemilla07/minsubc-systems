<?php

namespace Modules\Guidance\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Counselors (guidance staff)
        if (!Schema::hasTable('gdn_counselors')) {
            Schema::create('gdn_counselors', function (Blueprint $table) {
                $table->id();
                $table->string('counselor_id', 20)->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('first_name');
                $table->string('last_name');
                $table->string('email')->unique();
                $table->string('phone')->nullable();
                $table->string('specialization')->nullable();
                $table->text('bio')->nullable();
                $table->string('profile_photo')->nullable();
                $table->boolean('is_available')->default(true);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Appointment Slots
        if (!Schema::hasTable('gdn_appointment_slots')) {
            Schema::create('gdn_appointment_slots', function (Blueprint $table) {
                $table->id();
                $table->foreignId('counselor_id')->constrained('gdn_counselors')->cascadeOnDelete();
                $table->date('date');
                $table->time('start_time');
                $table->time('end_time');
                $table->integer('max_students')->default(1);
                $table->integer('booked_count')->default(0);
                $table->string('location')->nullable();
                $table->string('type')->default('individual');
                $table->boolean('is_available')->default(true);
                $table->timestamps();
                $table->unique(['counselor_id', 'date', 'start_time', 'end_time']);
            });
        }

        // Appointments
        if (!Schema::hasTable('gdn_appointments')) {
            Schema::create('gdn_appointments', function (Blueprint $table) {
                $table->id();
                $table->string('appointment_code', 20)->unique();
                $table->foreignId('slot_id')->constrained('gdn_appointment_slots')->cascadeOnDelete();
                $table->string('student_id');
                $table->foreignId('counselor_id')->constrained('gdn_counselors')->cascadeOnDelete();
                $table->string('reason')->nullable();
                $table->text('notes')->nullable();
                $table->string('status')->default('scheduled');
                $table->timestamp('confirmed_at')->nullable();
                $table->timestamp('completed_at')->nullable();
                $table->text('cancellation_reason')->nullable();
                $table->timestamps();
            });
        }

        // Counseling Sessions
        if (!Schema::hasTable('gdn_counseling_sessions')) {
            Schema::create('gdn_counseling_sessions', function (Blueprint $table) {
                $table->id();
                $table->string('session_code', 20)->unique();
                $table->foreignId('appointment_id')->nullable()->constrained('gdn_appointments')->nullOnDelete();
                $table->string('student_id');
                $table->foreignId('counselor_id')->constrained('gdn_counselors')->cascadeOnDelete();
                $table->string('type')->default('individual');
                $table->string('session_type')->default('initial');
                $table->text('concern')->nullable();
                $table->text('observations')->nullable();
                $table->text('interventions')->nullable();
                $table->text('recommendations')->nullable();
                $table->string('mood')->nullable();
                $table->string('risk_level')->default('low');
                $table->boolean('requires_follow_up')->default(false);
                $table->text('follow_up_notes')->nullable();
                $table->date('follow_up_date')->nullable();
                $table->string('status')->default('draft');
                $table->timestamps();
            });
        }

        // Assessments
        if (!Schema::hasTable('gdn_assessments')) {
            Schema::create('gdn_assessments', function (Blueprint $table) {
                $table->id();
                $table->string('assessment_code', 20)->unique();
                $table->string('student_id');
                $table->foreignId('counselor_id')->nullable()->constrained('gdn_counselors')->nullOnDelete();
                $table->string('type');
                $table->json('responses')->nullable();
                $table->integer('score')->nullable();
                $table->text('interpretation')->nullable();
                $table->string('status')->default('pending');
                $table->timestamp('submitted_at')->nullable();
                $table->timestamp('reviewed_at')->nullable();
                $table->timestamps();
            });
        }

        // Referrals
        if (!Schema::hasTable('gdn_referrals')) {
            Schema::create('gdn_referrals', function (Blueprint $table) {
                $table->id();
                $table->string('referral_code', 20)->unique();
                $table->string('student_id');
                $table->foreignId('referred_by')->constrained('gdn_counselors')->cascadeOnDelete();
                $table->foreignId('referred_to')->nullable()->constrained('gdn_counselors')->nullOnDelete();
                $table->string('external_agency')->nullable();
                $table->string('reason');
                $table->text('details')->nullable();
                $table->string('urgency')->default('normal');
                $table->string('status')->default('pending');
                $table->text('feedback')->nullable();
                $table->timestamp('resolved_at')->nullable();
                $table->timestamps();
            });
        }

        // Interventions
        if (!Schema::hasTable('gdn_interventions')) {
            Schema::create('gdn_interventions', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('type');
                $table->date('start_date');
                $table->date('end_date')->nullable();
                $table->string('location')->nullable();
                $table->integer('max_participants')->nullable();
                $table->string('status')->default('planned');
                $table->timestamps();
            });
        }

        // Intervention Participants
        if (!Schema::hasTable('gdn_intervention_participants')) {
            Schema::create('gdn_intervention_participants', function (Blueprint $table) {
                $table->id();
                $table->foreignId('intervention_id')->constrained('gdn_interventions')->cascadeOnDelete();
                $table->string('student_id');
                $table->string('status')->default('enrolled');
                $table->text('notes')->nullable();
                $table->timestamps();
                $table->unique(['intervention_id', 'student_id']);
            });
        }

        // Incident Reports
        if (!Schema::hasTable('gdn_incident_reports')) {
            Schema::create('gdn_incident_reports', function (Blueprint $table) {
                $table->id();
                $table->string('incident_code', 20)->unique();
                $table->string('student_id');
                $table->foreignId('reported_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('type');
                $table->date('incident_date');
                $table->text('description');
                $table->string('severity')->default('minor');
                $table->string('location')->nullable();
                $table->text('action_taken')->nullable();
                $table->string('status')->default('open');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('gdn_incident_reports');
        Schema::dropIfExists('gdn_intervention_participants');
        Schema::dropIfExists('gdn_interventions');
        Schema::dropIfExists('gdn_referrals');
        Schema::dropIfExists('gdn_assessments');
        Schema::dropIfExists('gdn_counseling_sessions');
        Schema::dropIfExists('gdn_appointments');
        Schema::dropIfExists('gdn_appointment_slots');
        Schema::dropIfExists('gdn_counselors');
    }
};