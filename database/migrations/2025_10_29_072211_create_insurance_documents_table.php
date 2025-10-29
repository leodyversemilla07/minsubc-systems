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
        Schema::create('insurance_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('insurance_id')->constrained('insurance_records')->cascadeOnDelete();
            $table->string('document_name');
            $table->string('file_path');
            $table->bigInteger('file_size')->nullable();
            $table->timestamp('uploaded_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_documents');
    }
};
