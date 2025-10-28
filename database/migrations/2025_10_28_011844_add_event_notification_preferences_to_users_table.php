<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('notify_event_created')->default(true)->after('email_verified_at');
            $table->boolean('notify_event_updated')->default(true)->after('notify_event_created');
            $table->boolean('notify_event_cancelled')->default(true)->after('notify_event_updated');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'notify_event_created',
                'notify_event_updated',
                'notify_event_cancelled',
            ]);
        });
    }
};
