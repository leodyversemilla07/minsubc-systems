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
        Schema::create('usg_transparency_reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['financial', 'attendance', 'budget', 'expenditure', 'meeting_minutes', 'quarterly', 'annual', 'other']);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->date('report_period_start');
            $table->date('report_period_end');
            $table->json('data')->nullable(); // For storing structured report data
            $table->string('file_path')->nullable(); // For uploaded report files
            $table->string('file_name')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->timestamp('published_at')->nullable();
            $table->unsignedInteger('download_count')->default(0);
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users');
            $table->index(['status', 'published_at']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usg_transparency_reports');
    }
};
