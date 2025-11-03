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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('organization_code')->unique();
            $table->string('organization_name');
            $table->enum('organization_type', ['Major', 'Minor']);
            $table->string('category')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->date('establishment_date')->nullable();
            $table->string('logo_path')->nullable();
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->foreignId('adviser_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
