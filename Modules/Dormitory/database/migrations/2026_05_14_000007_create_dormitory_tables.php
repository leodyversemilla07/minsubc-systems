<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drm_halls', function (Blueprint $table) {
            $table->id(); $table->string('name'); $table->string('code')->unique();
            $table->string('address')->nullable(); $table->integer('floors')->default(1);
            $table->enum('gender', ['male', 'female', 'coed'])->default('coed');
            $table->string('warden_name')->nullable(); $table->string('warden_phone')->nullable();
            $table->boolean('is_active')->default(true); $table->timestamps();
        });
        Schema::create('drm_rooms', function (Blueprint $table) {
            $table->id(); $table->foreignId('hall_id')->constrained('drm_halls')->cascadeOnDelete();
            $table->string('room_number'); $table->integer('floor')->default(1);
            $table->string('room_type')->default('standard');
            $table->integer('capacity')->default(4); $table->integer('beds_count')->default(4);
            $table->boolean('is_active')->default(true); $table->timestamps();
            $table->unique(['hall_id', 'room_number']);
        });
        Schema::create('drm_beds', function (Blueprint $table) {
            $table->id(); $table->foreignId('room_id')->constrained('drm_rooms')->cascadeOnDelete();
            $table->string('bed_label'); $table->string('position')->nullable();
            $table->boolean('is_occupied')->default(false); $table->boolean('is_active')->default(true);
            $table->timestamps(); $table->unique(['room_id', 'bed_label']);
        });
        Schema::create('drm_assignments', function (Blueprint $table) {
            $table->id(); $table->foreignId('bed_id')->constrained('drm_beds');
            $table->string('student_id'); // string FK
            $table->date('checkin_date'); $table->date('checkout_date')->nullable();
            $table->string('status')->default('active');
            $table->decimal('fee_per_semester', 10, 2)->default(0);
            $table->text('notes')->nullable(); $table->timestamps();
        });
        Schema::create('drm_maintenance', function (Blueprint $table) {
            $table->id(); $table->foreignId('room_id')->constrained('drm_rooms');
            $table->foreignId('reported_by')->constrained('users');
            $table->string('issue_type'); $table->text('description');
            $table->string('priority')->default('medium');
            $table->string('status')->default('pending');
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->dateTime('resolved_at')->nullable();
            $table->text('notes')->nullable(); $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('drm_maintenance');
        Schema::dropIfExists('drm_assignments');
        Schema::dropIfExists('drm_beds');
        Schema::dropIfExists('drm_rooms');
        Schema::dropIfExists('drm_halls');
    }
};