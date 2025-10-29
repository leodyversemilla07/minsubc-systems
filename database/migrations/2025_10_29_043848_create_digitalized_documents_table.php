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
        Schema::create('digitalized_documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_title');
            $table->enum('document_category', ['Scholarship', 'Insurance', 'Organization', 'Activity', 'Administrative', 'Other']);
            $table->string('document_type')->nullable();
            $table->string('reference_number')->nullable();
            $table->date('original_date')->nullable();
            $table->date('digitalized_date')->nullable();
            $table->string('file_path');
            $table->string('file_name');
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->string('academic_year')->nullable();
            $table->string('related_entity_type')->nullable();
            $table->unsignedBigInteger('related_entity_id')->nullable();
            $table->string('physical_location')->nullable();
            $table->enum('disposal_status', ['Physical Copy Exists', 'Pending Disposal Approval', 'Approved for Disposal', 'Disposed'])->default('Physical Copy Exists');
            $table->string('disposal_permit_number')->nullable();
            $table->date('disposal_date')->nullable();
            $table->boolean('is_public')->default(false);
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('digitalized_documents');
    }
};
