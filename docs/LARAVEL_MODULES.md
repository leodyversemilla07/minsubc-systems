# Laravel Modules - Complete Guide

**Project:** MinSU BC Systems  
**Package:** nwidart/laravel-modules v12.0.4  
**Last Updated:** November 3, 2025

> **Complete guide for working with Laravel Modules** - includes tutorial, quick reference, and comprehensive documentation.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Quick Reference](#quick-reference)
- [Tutorial: Building a Library Module](#tutorial-building-a-library-module)
- [Module Structure](#module-structure)
- [Creating Components](#creating-components)
- [Working with Routes](#working-with-routes)
- [Working with Models](#working-with-models)
- [Working with Migrations](#working-with-migrations)
- [Working with Controllers](#working-with-controllers)
- [Working with Views (Inertia)](#working-with-views-inertia)
- [Module Configuration](#module-configuration)
- [Module Dependencies](#module-dependencies)
- [Testing Modules](#testing-modules)
- [Module Management](#module-management)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Command Reference](#command-reference)

---

## Quick Start

### Why Use Modules?

- **Organization:** Keep related code together
- **Reusability:** Share modules across projects
- **Team Development:** Different teams work on different modules
- **Scalability:** Add features without cluttering main app
- **Maintainability:** Clear boundaries and dependencies

### Check Installed Modules

```bash
php artisan module:list
```

Output:
```
[Enabled] Registrar ....... Modules/Registrar [0]
[Enabled] SAS ............. Modules/SAS [0]
[Enabled] USG ............. Modules/USG [0]
```

### Create Your First Module

```bash
# Create a new module called "Library"
php artisan module:make Library

# Enable the module
php artisan module:enable Library

# Verify it's created
php artisan module:list
```

---

## Quick Reference

### Common Commands

```bash
# Creating Components
php artisan module:make-controller BookController Library
php artisan module:make-model Book Library -mf
php artisan module:make-request StoreBookRequest Library
php artisan module:make-migration create_books_table Library
php artisan module:make-middleware CheckLibraryAccess Library
php artisan module:make-policy BookPolicy Library --model=Book

# Database Operations
php artisan module:migrate Library              # Run migrations
php artisan module:migrate-rollback Library     # Rollback
php artisan module:seed Library                 # Seed data

# Testing
php artisan module:make-test BookTest Library --feature
php artisan test Modules/Library/tests

# Module Management
php artisan module:enable Library
php artisan module:disable Library
php artisan module:list
```

### Namespace Pattern

```php
// Controllers
Modules\Library\Http\Controllers\BookController

// Models
Modules\Library\Models\Book

// Services
Modules\Library\Services\BookService

// Requests
Modules\Library\Http\Requests\StoreBookRequest
```

### Route Naming Convention

```php
// Pattern: {module}.{area}.{resource}.{action}
library.admin.books.index
library.admin.books.show
library.student.dashboard
```

---

## Tutorial: Building a Library Module

**Learn by doing** - Build a complete Library Management module in 30-45 minutes.

### What We'll Build

- ✅ Book catalog management
- ✅ Student borrowing system
- ✅ Admin dashboard
- ✅ Overdue tracking
- ✅ Search functionality

### Step 1: Create the Module (2 minutes)

```bash
# Create the module
php artisan module:make Library

# Enable it
php artisan module:enable Library

# Verify
php artisan module:list
```

### Step 2: Create Models & Migrations (5 minutes)

#### Create Book Model

```bash
php artisan module:make-model Book Library -mf
```

**Edit Migration:** `Modules/Library/database/Migrations/*_create_books_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('isbn')->unique();
            $table->string('publisher')->nullable();
            $table->string('category');
            $table->integer('quantity')->default(1);
            $table->integer('available_quantity')->default(1);
            $table->string('location')->nullable();
            $table->enum('status', ['available', 'unavailable'])->default('available');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('category');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
```

#### Create Borrowing Model

```bash
php artisan module:make-model Borrowing Library -mf
```

**Edit Migration:** `Modules/Library/database/Migrations/*_create_borrowings_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('borrowings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->dateTime('borrowed_at');
            $table->dateTime('due_at');
            $table->dateTime('returned_at')->nullable();
            $table->enum('status', ['active', 'returned', 'overdue'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['book_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('borrowings');
    }
};
```

#### Run Migrations

```bash
php artisan module:migrate Library
```

### Step 3: Update Models (5 minutes)

**Edit:** `Modules/Library/app/Models/Book.php`

```php
<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'publisher',
        'category',
        'quantity',
        'available_quantity',
        'location',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'available_quantity' => 'integer',
        ];
    }

    // Relationships
    public function borrowings(): HasMany
    {
        return $this->hasMany(Borrowing::class);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('available_quantity', '>', 0)
            ->where('status', 'available');
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('author', 'like', "%{$search}%")
              ->orWhere('isbn', 'like', "%{$search}%");
        });
    }

    // Accessors
    public function getIsAvailableAttribute(): bool
    {
        return $this->available_quantity > 0 && $this->status === 'available';
    }

    // Methods
    public function borrow(): void
    {
        $this->decrement('available_quantity');
        
        if ($this->available_quantity === 0) {
            $this->update(['status' => 'unavailable']);
        }
    }

    public function returnBook(): void
    {
        $this->increment('available_quantity');
        $this->update(['status' => 'available']);
    }
}
```

**Edit:** `Modules/Library/app/Models/Borrowing.php`

```php
<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'borrowed_at',
        'due_at',
        'returned_at',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime',
            'due_at' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    // Methods
    public function isOverdue(): bool
    {
        return $this->status === 'active' && $this->due_at < now();
    }
}
```

### Step 4: Create Service Layer (5 minutes)

**Create:** `Modules/Library/app/Services/BorrowingService.php` (manually)

```php
<?php

namespace Modules\Library\Services;

use Modules\Library\Models\Book;
use Modules\Library\Models\Borrowing;
use App\Models\User;
use Carbon\Carbon;

class BorrowingService
{
    public function borrowBook(Book $book, User $user): Borrowing
    {
        $this->validateBorrowing($book, $user);

        $borrowing = Borrowing::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_at' => $this->calculateDueDate(),
            'status' => 'active',
        ]);

        $book->borrow();

        return $borrowing;
    }

    public function returnBook(Borrowing $borrowing): void
    {
        $borrowing->update([
            'returned_at' => now(),
            'status' => 'returned',
        ]);

        $borrowing->book->returnBook();
    }

    protected function validateBorrowing(Book $book, User $user): void
    {
        $maxBooks = 3;
        $activeCount = Borrowing::where('user_id', $user->id)
            ->where('status', 'active')
            ->count();

        throw_if(
            $activeCount >= $maxBooks,
            \Exception::class,
            "You can only borrow {$maxBooks} books at a time."
        );

        throw_if(
            !$book->is_available,
            \Exception::class,
            'This book is not available.'
        );
    }

    protected function calculateDueDate(): Carbon
    {
        return now()->addDays(14); // 2 weeks
    }
}
```

### Step 5: Create Controllers (5 minutes)

```bash
php artisan module:make-controller Admin/BookController Library
php artisan module:make-controller Student/BorrowingController Library
```

**Edit:** `Modules/Library/app/Http/Controllers/Admin/BookController.php`

```php
<?php

namespace Modules\Library\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Library\Models\Book;

class BookController extends Controller
{
    public function index(Request $request): Response
    {
        $books = Book::query()
            ->when($request->search, fn($q, $s) => $q->search($s))
            ->when($request->category, fn($q, $c) => $q->where('category', $c))
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('library/admin/books/index', [
            'books' => $books,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('library/admin/books/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books',
            'category' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $validated['available_quantity'] = $validated['quantity'];

        $book = Book::create($validated);

        return redirect()
            ->route('library.admin.books.show', $book)
            ->with('success', 'Book added successfully.');
    }

    public function show(Book $book): Response
    {
        $book->load('borrowings.user');

        return Inertia::render('library/admin/books/show', [
            'book' => $book,
        ]);
    }

    public function edit(Book $book): Response
    {
        return Inertia::render('library/admin/books/edit', [
            'book' => $book,
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn,' . $book->id,
            'category' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $book->update($validated);

        return redirect()
            ->route('library.admin.books.show', $book)
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()
            ->route('library.admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
```

### Step 6: Create Routes (3 minutes)

**Edit:** `Modules/Library/routes/web.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use Modules\Library\Http\Controllers\Admin\BookController;
use Modules\Library\Http\Controllers\Student\BorrowingController;

// Student routes
Route::middleware(['auth', 'verified', 'role:student|super-admin'])
    ->prefix('library/student')
    ->name('library.student.')
    ->group(function () {
        Route::get('dashboard', [BorrowingController::class, 'dashboard'])
            ->name('dashboard');
        
        Route::post('borrow/{book}', [BorrowingController::class, 'borrow'])
            ->name('borrow');
        
        Route::post('return/{borrowing}', [BorrowingController::class, 'return'])
            ->name('return');
    });

// Admin routes
Route::middleware(['auth', 'verified', 'role:librarian|super-admin'])
    ->prefix('library/admin')
    ->name('library.admin.')
    ->group(function () {
        Route::resource('books', BookController::class);
    });
```

**Verify routes:**
```bash
php artisan route:list --path=library
```

### Step 7: Test Everything

```bash
# Check routes are registered
php artisan route:list --path=library

# Run the development server
npm run dev

# Create test data using tinker
php artisan tinker
>>> use Modules\Library\Models\Book;
>>> Book::create(['title' => 'Test Book', 'author' => 'Test Author', 'isbn' => '123', 'category' => 'fiction', 'quantity' => 5, 'available_quantity' => 5]);
```

**Congratulations!** You've built a complete Library Management module! 🎉

---

## Module Structure

### Directory Breakdown

```
Modules/{ModuleName}/
│
├── app/                          # Application Code
│   ├── Http/
│   │   ├── Controllers/          # Module controllers
│   │   ├── Middleware/           # Module middleware
│   │   └── Requests/             # Form requests
│   ├── Models/                   # Eloquent models
│   ├── Services/                 # Business logic services
│   ├── Policies/                 # Authorization policies
│   ├── Jobs/                     # Queue jobs
│   ├── Events/                   # Events
│   ├── Listeners/                # Event listeners
│   └── Providers/                # Service providers
│       └── {Module}ServiceProvider.php
│
├── config/                       # Module Configuration
│   └── config.php                # Module-specific config
│
├── database/                     # Database Files
│   ├── Migrations/               # Module migrations
│   ├── Seeders/                  # Module seeders
│   └── Factories/                # Model factories
│
├── routes/                       # Route Files
│   ├── web.php                   # Web routes (auto-registered)
│   ├── api.php                   # API routes (auto-registered)
│   └── channels.php              # Broadcast channels
│
├── resources/                    # Resources
│   ├── views/                    # Blade views (if needed)
│   ├── lang/                     # Translations
│   └── assets/                   # Assets (CSS, JS)
│
├── tests/                        # Tests
│   ├── Feature/                  # Feature tests
│   └── Unit/                     # Unit tests
│
├── composer.json                 # Module dependencies
└── module.json                   # Module metadata
```

---

## Creating Components

### Controllers

```bash
# Generate a controller
php artisan module:make-controller BookController Library

# Generate a controller with model
php artisan module:make-controller BookController Library --model=Book

# Generate an API resource controller
php artisan module:make-controller BookController Library --api

# Generate a controller in a subdirectory
php artisan module:make-controller Admin/BookController Library
```

### Models

```bash
# Generate a model
php artisan module:make-model Book Library

# Generate model with migration
php artisan module:make-model Book Library --migration

# Generate model with migration and factory
php artisan module:make-model Book Library --migration --factory

# Shorthand
php artisan module:make-model Book Library -mf
```

### Migrations

```bash
# Generate a migration
php artisan module:make-migration create_books_table Library

# Generate migration with table name
php artisan module:make-migration create_books_table Library --table=books
```

### Form Requests

```bash
# Generate a form request
php artisan module:make-request StoreBookRequest Library
php artisan module:make-request UpdateBookRequest Library
```

**Example Form Request:**

```php
<?php

namespace Modules\Library\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['required', 'string', Rule::unique('books', 'isbn')],
            'category' => ['required', 'string'],
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'isbn.unique' => 'A book with this ISBN already exists.',
            'quantity.max' => 'Quantity cannot exceed 100 copies.',
        ];
    }
}
```

### Other Components

```bash
# Middleware
php artisan module:make-middleware CheckLibraryAccess Library

# Policy
php artisan module:make-policy BookPolicy Library --model=Book

# Job
php artisan module:make-job ProcessBookReturn Library

# Event
php artisan module:make-event BookBorrowed Library

# Listener
php artisan module:make-listener SendBorrowNotification Library

# Command
php artisan module:make-command SendOverdueReminders Library

# Provider
php artisan module:make-provider RepositoryServiceProvider Library
```

---

## Working with Routes

### Web Routes

Routes in `Modules/{Module}/routes/web.php` are **automatically registered**!

```php
<?php

use Illuminate\Support\Facades\Route;
use Modules\Library\Http\Controllers\BookController;

// Public routes
Route::get('library', [BookController::class, 'index'])
    ->name('library.index');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Student routes
    Route::prefix('library/student')->name('library.student.')->group(function () {
        Route::get('dashboard', [BorrowController::class, 'dashboard'])
            ->name('dashboard');
    });
    
    // Admin routes
    Route::middleware(['role:librarian|super-admin'])
        ->prefix('library/admin')
        ->name('library.admin.')
        ->group(function () {
            Route::resource('books', BookController::class);
        });
});
```

### Verify Routes

```bash
# List all routes
php artisan route:list

# Filter by module
php artisan route:list --path=library

# Show specific route
php artisan route:list --name=library.books.index
```

---

## Working with Models

### Model with Relationships

```php
<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'category',
        'quantity',
        'available_quantity',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'available_quantity' => 'integer',
        ];
    }

    // Relationships
    public function borrowings(): HasMany
    {
        return $this->hasMany(Borrowing::class);
    }

    public function activeBorrowings(): HasMany
    {
        return $this->hasMany(Borrowing::class)
            ->where('status', 'active');
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('available_quantity', '>', 0)
            ->where('status', 'available');
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', "%{$search}%")
            ->orWhere('author', 'like', "%{$search}%");
    }

    // Accessors
    public function getIsAvailableAttribute(): bool
    {
        return $this->available_quantity > 0;
    }

    // Methods
    public function borrow(): void
    {
        $this->decrement('available_quantity');
    }

    public function returnBook(): void
    {
        $this->increment('available_quantity');
    }
}
```

### Relationships with Shared Models

```php
<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User; // Shared User model

class Borrowing extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'borrowed_at',
        'due_at',
        'returned_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime',
            'due_at' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    // Relationship to shared User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship within module
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
```

---

## Working with Migrations

### Creating Migrations

```bash
# Create a migration
php artisan module:make-migration create_books_table Library
php artisan module:make-migration create_borrowings_table Library
```

### Example Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('isbn')->unique();
            $table->string('category');
            $table->integer('quantity')->default(1);
            $table->integer('available_quantity')->default(1);
            $table->enum('status', ['available', 'unavailable'])->default('available');
            $table->timestamps();

            $table->index('isbn');
            $table->index('category');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
```

### Running Migrations

```bash
# Run migrations for a specific module
php artisan module:migrate Library

# Run migrations for all modules
php artisan module:migrate

# Rollback module migrations
php artisan module:migrate-rollback Library

# Refresh module migrations
php artisan module:migrate-refresh Library

# Reset module migrations
php artisan module:migrate-reset Library
```

---

## Working with Controllers

### Resource Controller Example

```php
<?php

namespace Modules\Library\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Library\Models\Book;
use Modules\Library\Http\Requests\StoreBookRequest;
use Modules\Library\Http\Requests\UpdateBookRequest;

class BookController extends Controller
{
    public function index(Request $request): Response
    {
        $books = Book::query()
            ->when($request->search, fn($query, $search) =>
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
            )
            ->when($request->category, fn($query, $category) =>
                $query->where('category', $category)
            )
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('library/admin/books/index', [
            'books' => $books,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('library/admin/books/create');
    }

    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->validated());

        return redirect()
            ->route('library.admin.books.show', $book)
            ->with('success', 'Book created successfully.');
    }

    public function show(Book $book): Response
    {
        $book->load(['borrowings.user']);

        return Inertia::render('library/admin/books/show', [
            'book' => $book,
        ]);
    }

    public function edit(Book $book): Response
    {
        return Inertia::render('library/admin/books/edit', [
            'book' => $book,
        ]);
    }

    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->validated());

        return redirect()
            ->route('library.admin.books.show', $book)
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()
            ->route('library.admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
```

---

## Working with Views (Inertia)

### Frontend Structure

```
resources/js/pages/library/
├── index.tsx                    # Public library page
│
├── student/
│   ├── dashboard.tsx            # Student dashboard
│   └── borrowings.tsx           # My borrowings
│
└── admin/
    ├── dashboard.tsx            # Admin dashboard
    └── books/
        ├── index.tsx            # List books
        ├── create.tsx           # Create book
        ├── edit.tsx             # Edit book
        └── show.tsx             # View book
```

### Example Inertia Page

```tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppShell from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    category: string;
}

interface Props {
    books: {
        data: Book[];
    };
    filters: {
        search?: string;
    };
}

export default function BooksIndex({ books, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = () => {
        router.get(route('library.admin.books.index'), {
            search,
        }, {
            preserveState: true,
        });
    };

    return (
        <AppShell>
            <Head title="Books - Library Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Books</h1>
                    <Link href={route('library.admin.books.create')}>
                        <Button>Add Book</Button>
                    </Link>
                </div>

                <div className="flex gap-4">
                    <Input
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {/* Book list here */}
            </div>
        </AppShell>
    );
}
```

---

## Module Configuration

### Module Config File

`Modules/Library/config/config.php`:

```php
<?php

return [
    'name' => 'Library',
    
    // Borrowing settings
    'borrowing' => [
        'max_books_per_user' => 3,
        'default_borrow_days' => 14,
        'max_renewals' => 2,
        'overdue_fine_per_day' => 10.00, // PHP Pesos
    ],
    
    // Book categories
    'categories' => [
        'fiction',
        'non-fiction',
        'reference',
        'textbook',
        'journal',
    ],
    
    // Features
    'features' => [
        'enable_online_reservation' => true,
        'enable_email_reminders' => true,
        'enable_fines' => true,
    ],
];
```

### Accessing Config

```php
// Get module config
$maxBooks = config('library.borrowing.max_books_per_user');

// Get with default
$finePerDay = config('library.borrowing.overdue_fine_per_day', 5.00);

// Check feature flag
if (config('library.features.enable_fines')) {
    // Apply fines
}
```

---

## Module Dependencies

### Module composer.json

Each module can have its own dependencies:

```json
{
    "name": "nwidart/library",
    "description": "Library Management Module",
    "type": "laravel-module",
    "require": {
        "php": "^8.2",
        "barryvdh/laravel-dompdf": "^2.0"
    },
    "autoload": {
        "psr-4": {
            "Modules\\Library\\": "app/",
            "Modules\\Library\\Database\\Factories\\": "database/Factories/",
            "Modules\\Library\\Database\\Seeders\\": "database/Seeders/"
        }
    }
}
```

After adding dependencies:

```bash
composer update
```

---

## Testing Modules

### Creating Tests

```bash
# Feature test
php artisan module:make-test BookControllerTest Library --feature

# Unit test
php artisan module:make-test BookModelTest Library --unit
```

### Example Test

```php
<?php

namespace Modules\Library\Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Modules\Library\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_librarian_can_view_books_index(): void
    {
        $librarian = User::factory()->create();
        $librarian->assignRole('librarian');

        $response = $this->actingAs($librarian)
            ->get(route('library.admin.books.index'));

        $response->assertSuccessful();
    }

    public function test_librarian_can_create_book(): void
    {
        $librarian = User::factory()->create();
        $librarian->assignRole('librarian');

        $bookData = [
            'title' => 'Test Book',
            'author' => 'Test Author',
            'isbn' => '978-3-16-148410-0',
            'category' => 'fiction',
            'quantity' => 5,
        ];

        $response = $this->actingAs($librarian)
            ->post(route('library.admin.books.store'), $bookData);

        $response->assertRedirect();
        
        $this->assertDatabaseHas('books', [
            'title' => 'Test Book',
            'isbn' => '978-3-16-148410-0',
        ]);
    }
}
```

### Running Tests

```bash
# Run all tests
php artisan test

# Run module tests only
php artisan test Modules/Library/tests

# Run specific test file
php artisan test Modules/Library/tests/Feature/BookControllerTest.php

# Run with filter
php artisan test --filter=BookControllerTest
```

---

## Module Management

### Enable/Disable Modules

```bash
# Enable a module
php artisan module:enable Library

# Disable a module
php artisan module:disable Library

# Enable all modules
php artisan module:enable

# Disable all modules
php artisan module:disable
```

### Module Seeding

```bash
# Seed a specific module
php artisan module:seed Library

# Seed all modules
php artisan module:seed

# Seed specific seeder
php artisan module:seed Library --class=BookSeeder
```

### Module Caching

```bash
# Cache module information (production)
php artisan module:cache

# Clear module cache
php artisan module:cache-clear
```

---

## Best Practices

### 1. Module Naming

```
✅ DO:
- Use PascalCase (Library, StudentAffairs)
- Use singular names (Book, not Books)
- Use descriptive names (DocumentRequest, not DR)

❌ DON'T:
- Use lowercase (library)
- Use abbreviations (lib)
- Use plurals (Libraries)
```

### 2. Keep Controllers Thin

```php
✅ DO:
// Use service classes for business logic
public function borrow(Book $book)
{
    $this->borrowingService->borrowBook($book, auth()->user());
    return redirect()->back();
}

❌ DON'T:
// Put all logic in controller
public function borrow(Book $book)
{
    // 50 lines of business logic here
}
```

### 3. Use Form Requests

```php
✅ DO:
public function store(StoreBookRequest $request)
{
    Book::create($request->validated());
}

❌ DON'T:
public function store(Request $request)
{
    $request->validate([...]); // Inline validation
}
```

### 4. Keep Modules Independent

```php
✅ DO:
// Use shared models
use App\Models\User;

// Communicate via events
event(new BookBorrowed($book, $user));

❌ DON'T:
// Import from other modules
use Modules\Registrar\Models\Student; // Avoid
```

### 5. Route Naming

```php
✅ DO:
Route::name('library.student.borrow')
Route::name('library.admin.books.index')

❌ DON'T:
Route::name('borrow')
Route::name('books')
```

---

## Common Patterns

### Service Layer Pattern

```php
<?php

namespace Modules\Library\Services;

use Modules\Library\Models\Book;
use App\Models\User;

class BorrowingService
{
    public function borrowBook(Book $book, User $user): Borrowing
    {
        $this->validateBorrowing($book, $user);
        
        $borrowing = Borrowing::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_at' => now()->addDays(14),
        ]);
        
        $book->borrow();
        
        return $borrowing;
    }

    protected function validateBorrowing(Book $book, User $user): void
    {
        throw_if(
            !$book->is_available,
            \Exception::class,
            'Book is not available.'
        );
    }
}
```

### Repository Pattern (Optional)

```php
<?php

namespace Modules\Library\Repositories;

use Modules\Library\Models\Book;

class BookRepository
{
    public function findAvailable()
    {
        return Book::available()->get();
    }

    public function search(string $query)
    {
        return Book::search($query)->paginate(20);
    }
}
```

---

## Troubleshooting

### Module Not Found

```bash
# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Regenerate autoload
composer dump-autoload

# Verify module is enabled
php artisan module:list
```

### Routes Not Working

```bash
# Check routes are registered
php artisan route:list --path=library

# Clear route cache
php artisan route:clear
```

### Migrations Not Running

```bash
# Check migration path
php artisan module:migrate Library --pretend

# Run with force
php artisan module:migrate Library --force
```

### Class Not Found

```bash
# Always dump autoload after creating new classes
composer dump-autoload

# Check namespace matches file location
```

---

## Command Reference

### Module Management

| Command | Description |
|---------|-------------|
| `module:list` | List all modules |
| `module:make {name}` | Create a new module |
| `module:enable {name}` | Enable a module |
| `module:disable {name}` | Disable a module |
| `module:cache` | Cache module information |
| `module:cache-clear` | Clear module cache |

### Generating Components

| Command | Description |
|---------|-------------|
| `module:make-controller {name} {module}` | Generate controller |
| `module:make-model {name} {module}` | Generate model |
| `module:make-migration {name} {module}` | Generate migration |
| `module:make-request {name} {module}` | Generate form request |
| `module:make-middleware {name} {module}` | Generate middleware |
| `module:make-policy {name} {module}` | Generate policy |
| `module:make-provider {name} {module}` | Generate provider |
| `module:make-command {name} {module}` | Generate artisan command |
| `module:make-job {name} {module}` | Generate job |
| `module:make-event {name} {module}` | Generate event |
| `module:make-listener {name} {module}` | Generate listener |
| `module:make-factory {name} {module}` | Generate factory |
| `module:make-seeder {name} {module}` | Generate seeder |
| `module:make-test {name} {module}` | Generate test |

### Database Operations

| Command | Description |
|---------|-------------|
| `module:migrate {module?}` | Run module migrations |
| `module:migrate-rollback {module?}` | Rollback migrations |
| `module:migrate-refresh {module?}` | Refresh migrations |
| `module:migrate-reset {module?}` | Reset migrations |
| `module:seed {module?}` | Seed module database |

---

## Additional Resources

### Documentation
- **Laravel Modules:** https://nwidart.com/laravel-modules
- **GitHub:** https://github.com/nwidart/laravel-modules
- **Project Docs:** `MODULAR_ARCHITECTURE.md`

### Getting Help
1. Check existing modules for examples (Registrar, USG, SAS)
2. Review Laravel documentation for core concepts
3. Check module configuration in `config/modules.php`

---

**Happy Modular Development! 🚀**
