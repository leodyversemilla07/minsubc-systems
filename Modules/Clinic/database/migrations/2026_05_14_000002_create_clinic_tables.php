<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cls_medical_records', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('blood_type')->nullable();
            $table->json('allergies')->nullable();
            $table->json('medical_conditions')->nullable();
            $table->json('medications')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('health_insurance')->nullable();
            $table->string('insurance_policy_no')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('cls_appointments', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->nullable();
            $table->dateTime('appointment_date');
            $table->string('appointment_type');
            $table->text('reason')->nullable();
            $table->string('status')->default('scheduled');
            $table->text('notes')->nullable();
            $table->string('handled_by')->nullable();
            $table->timestamps();
        });

        Schema::create('cls_consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_record_id')->constrained('cls_medical_records')->cascadeOnDelete();
            $table->text('complaint')->nullable();
            $table->text('diagnosis')->nullable();
            $table->text('treatment')->nullable();
            $table->text('prescription')->nullable();
            $table->text('notes')->nullable();
            $table->string('consulted_by')->nullable();
            $table->dateTime('consultation_date');
            $table->date('follow_up_date')->nullable();
            $table->string('status')->default('completed');
            $table->timestamps();
        });

        Schema::create('cls_immunizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_record_id')->constrained('cls_medical_records')->cascadeOnDelete();
            $table->string('vaccine_name');
            $table->integer('dose_number')->nullable();
            $table->date('date_administered');
            $table->string('administered_by')->nullable();
            $table->string('batch_no')->nullable();
            $table->text('remarks')->nullable();
            $table->date('next_due_date')->nullable();
            $table->timestamps();
        });

        Schema::create('cls_dental_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_record_id')->constrained('cls_medical_records')->cascadeOnDelete();
            $table->string('procedure')->nullable();
            $table->text('findings')->nullable();
            $table->text('treatment')->nullable();
            $table->string('dentist')->nullable();
            $table->dateTime('dental_date');
            $table->date('follow_up_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('cls_physical_exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_record_id')->constrained('cls_medical_records')->cascadeOnDelete();
            $table->date('exam_date');
            $table->decimal('height_cm', 5, 1)->nullable();
            $table->decimal('weight_kg', 5, 1)->nullable();
            $table->decimal('bmi', 4, 1)->nullable();
            $table->string('blood_pressure')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->decimal('temperature', 4, 1)->nullable();
            $table->string('vision_left')->nullable();
            $table->string('vision_right')->nullable();
            $table->string('color_vision')->nullable();
            $table->string('hearing_left')->nullable();
            $table->string('hearing_right')->nullable();
            $table->string('chest_xray')->nullable();
            $table->text('lab_results')->nullable();
            $table->text('findings')->nullable();
            $table->string('cleared_by')->nullable();
            $table->boolean('is_cleared')->default(false);
            $table->text('recommendations')->nullable();
            $table->timestamps();
        });

        Schema::create('cls_medications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->constrained('cls_consultations')->cascadeOnDelete();
            $table->string('medicine_name');
            $table->string('dosage')->nullable();
            $table->integer('quantity')->nullable();
            $table->text('instructions')->nullable();
            $table->string('dispensed_by')->nullable();
            $table->dateTime('dispensed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('cls_referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_record_id')->constrained('cls_medical_records')->cascadeOnDelete();
            $table->string('referred_to');
            $table->text('reason')->nullable();
            $table->date('referral_date');
            $table->text('notes')->nullable();
            $table->string('status')->default('pending');
            $table->text('follow_up_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cls_referrals');
        Schema::dropIfExists('cls_medications');
        Schema::dropIfExists('cls_physical_exams');
        Schema::dropIfExists('cls_dental_records');
        Schema::dropIfExists('cls_immunizations');
        Schema::dropIfExists('cls_consultations');
        Schema::dropIfExists('cls_appointments');
        Schema::dropIfExists('cls_medical_records');
    }
};