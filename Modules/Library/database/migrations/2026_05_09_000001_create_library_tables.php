<?php

namespace Modules\Library\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('book_categories')) {
            Schema::create('book_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('books')) {
            Schema::create('books', function (Blueprint $table) {
                $table->id();
                $table->string('isbn', 20)->unique();
                $table->string('title');
                $table->string('author');
                $table->string('publisher')->nullable();
                $table->year('publication_year')->nullable();
                $table->string('edition')->nullable();
                $table->text('description')->nullable();
                $table->foreignId('category_id')->nullable()->constrained('book_categories')->nullOnDelete();
                $table->integer('total_copies')->default(1);
                $table->integer('available_copies')->default(1);
                $table->string('shelf_location')->nullable();
                $table->string('cover_image')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('book_borrowings')) {
            Schema::create('book_borrowings', function (Blueprint $table) {
                $table->id();
                $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('borrow_code', 20)->unique();
                $table->timestamp('borrowed_at')->nullable();
                $table->date('due_date');
                $table->timestamp('returned_at')->nullable();
                $table->string('status')->default('pending'); // pending, active, returned, overdue, lost, cancelled
                $table->text('notes')->nullable();
                $table->foreignId('processed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();

                $table->index(['user_id', 'status']);
                $table->index(['book_id', 'status']);
            });
        }

        if (!Schema::hasTable('book_fines')) {
            Schema::create('book_fines', function (Blueprint $table) {
                $table->id();
                $table->foreignId('borrowing_id')->constrained('book_borrowings')->cascadeOnDelete();
                $table->decimal('amount', 10, 2);
                $table->decimal('paid_amount', 10, 2)->default(0);
                $table->string('reason'); // overdue, lost, damaged
                $table->string('status')->default('unpaid'); // unpaid, partial, paid, waived
                $table->timestamp('paid_at')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('book_reservations')) {
            Schema::create('book_reservations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->timestamp('reserved_at')->nullable();
                $table->date('expires_at');
                $table->string('status')->default('active'); // active, fulfilled, expired, cancelled
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('book_reservations');
        Schema::dropIfExists('book_fines');
        Schema::dropIfExists('book_borrowings');
        Schema::dropIfExists('books');
        Schema::dropIfExists('book_categories');
    }
};