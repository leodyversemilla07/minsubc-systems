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
        // For SQLite, we need to recreate the table with the new constraint
        Schema::table('sas_activities', function (Blueprint $table) {
            $table->dropColumn('activity_status');
        });
        
        Schema::table('sas_activities', function (Blueprint $table) {
            $table->enum('activity_status', ['upcoming', 'ongoing', 'completed', 'cancelled'])->default('upcoming')->after('recurrence_rule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sas_activities', function (Blueprint $table) {
            $table->dropColumn('activity_status');
        });
        
        Schema::table('sas_activities', function (Blueprint $table) {
            $table->enum('activity_status', ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'])->default('Scheduled')->after('recurrence_rule');
        });
    }
};
