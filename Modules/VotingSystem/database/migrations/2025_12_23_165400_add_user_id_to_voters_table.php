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
        Schema::table('voters', function (Blueprint $table) {
            // Add user_id column
            $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->onDelete('cascade');
            
            // Make school_id nullable since we'll use user relationship
            $table->string('school_id', 15)->nullable()->change();
            
            // Drop password column - use User's password instead
            $table->dropColumn('password');
            
            // Add index for user_id
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voters', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropIndex(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
