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
        // Skip fulltext indexes on SQLite as it doesn't support them
        if (config('database.default') !== 'sqlite') {
            Schema::table('transparency_reports', function (Blueprint $table) {
                $table->fullText(['title', 'description'], 'transparency_reports_search_fulltext');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (config('database.default') !== 'sqlite') {
            Schema::table('transparency_reports', function (Blueprint $table) {
                $table->dropFullText('transparency_reports_search_fulltext');
            });
        }
    }
};
