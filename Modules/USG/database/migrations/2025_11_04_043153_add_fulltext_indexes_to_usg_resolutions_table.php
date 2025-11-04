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
            $table->fullText(['title', 'description', 'content'], 'resolutions_search_fulltext');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resolutions', function (Blueprint $table) {
            $table->dropFullText('resolutions_search_fulltext');
        });
    }
};
