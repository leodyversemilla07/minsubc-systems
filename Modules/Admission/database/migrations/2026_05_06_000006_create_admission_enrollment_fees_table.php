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
        Schema::create('admission_enrollment_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_term_id')->constrained('academic_terms')->onDelete('cascade');
            $table->string('name'); // e.g., "Tuition Fee", "Miscellaneous", "Laboratory Fee"
            $table->enum('type', ['tuition', 'misc', 'lab', 'other'])->default('other');
            $table->decimal('amount', 10, 2);
            $table->string('unit'); // "per unit", "flat rate", "per subject"
            $table->integer('units')->nullable(); // if per unit
            $table->boolean('is_required')->default(true);
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0); // for display ordering
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index(['academic_term_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_enrollment_fees');
    }
};