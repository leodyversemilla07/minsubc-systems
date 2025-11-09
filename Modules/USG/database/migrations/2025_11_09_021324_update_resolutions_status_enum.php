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
        Schema::table('resolutions', function (Blueprint $table) {
            // Drop the composite index that includes status
            $table->dropIndex('resolutions_status_resolution_date_index');
        });

        Schema::table('resolutions', function (Blueprint $table) {
            // Drop and recreate the status column with expanded enum values
            $table->dropColumn('status');
        });

        Schema::table('resolutions', function (Blueprint $table) {
            $table->enum('status', ['draft', 'review', 'published', 'archived', 'rejected'])
                ->default('published')
                ->after('file_path');

            // Recreate the composite index
            $table->index(['status', 'resolution_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resolutions', function (Blueprint $table) {
            // Drop the composite index
            $table->dropIndex('resolutions_status_resolution_date_index');
        });

        Schema::table('resolutions', function (Blueprint $table) {
            // Revert to original enum values
            $table->dropColumn('status');
        });

        Schema::table('resolutions', function (Blueprint $table) {
            $table->enum('status', ['published', 'archived'])
                ->default('published')
                ->after('file_path');

            // Recreate the composite index
            $table->index(['status', 'resolution_date']);
        });
    }
};
