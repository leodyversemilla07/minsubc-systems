<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fac_facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('type');
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->integer('capacity')->nullable();
            $table->string('floor')->nullable();
            $table->string('building')->nullable();
            $table->json('amenities')->nullable();
            $table->text('rules')->nullable();
            $table->boolean('is_available')->default(true);
            $table->string('operating_hours')->nullable();
            $table->string('photo_url')->nullable();
            $table->timestamps();
        });

        Schema::create('fac_equipment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained('fac_facilities')->cascadeOnDelete();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->integer('quantity')->default(1);
            $table->integer('available_quantity')->default(1);
            $table->string('condition')->default('good');
            $table->date('purchase_date')->nullable();
            $table->date('last_maintenance')->nullable();
            $table->string('status')->default('available');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('fac_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained('fac_facilities')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('purpose');
            $table->text('notes')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('status')->default('pending');
            $table->integer('attendees_count')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('recurrence_pattern')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->dateTime('approved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('fac_equipment_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained('fac_reservations')->cascadeOnDelete();
            $table->foreignId('equipment_id')->constrained('fac_equipment')->cascadeOnDelete();
            $table->integer('quantity_used')->default(1);
            $table->timestamps();
            $table->unique(['reservation_id', 'equipment_id']);
        });

        Schema::create('fac_maintenance_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->nullable()->constrained('fac_facilities')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('fac_equipment')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('priority')->default('medium');
            $table->string('status')->default('pending');
            $table->foreignId('requested_by')->constrained('users');
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->date('scheduled_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fac_maintenance_requests');
        Schema::dropIfExists('fac_equipment_reservations');
        Schema::dropIfExists('fac_reservations');
        Schema::dropIfExists('fac_equipment');
        Schema::dropIfExists('fac_facilities');
    }
};