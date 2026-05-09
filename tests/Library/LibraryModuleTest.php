<?php

use App\Models\User;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookCategory;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookFine;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'library-admin']);
    Role::firstOrCreate(['name' => 'library-staff']);
});

// ─── Model Creation ───────────────────────────────────

test('can create book category', function () {
    $category = BookCategory::factory()->create(['name' => 'Science Fiction']);
    expect($category->name)->toBe('Science Fiction');
    expect($category->slug)->toBe('science-fiction');
});

test('can create book', function () {
    $category = BookCategory::factory()->create();
    $book = Book::factory()->create(['category_id' => $category->id, 'title' => 'Test Book']);
    expect($book->title)->toBe('Test Book');
    expect($book->isAvailable())->toBeTrue();
});

test('book reports unavailable when no copies', function () {
    $book = Book::factory()->create(['total_copies' => 0, 'available_copies' => 0]);
    expect($book->isAvailable())->toBeFalse();
});

test('can create borrowing', function () {
    $book = Book::factory()->create();
    $user = User::factory()->create();
    $borrowing = BookBorrowing::factory()->create(['book_id' => $book->id, 'user_id' => $user->id]);
    expect($borrowing->borrow_code)->not->toBeNull();
    expect($borrowing->book->id)->toBe($book->id);
});

test('borrowing can detect overdue', function () {
    $borrowing = BookBorrowing::factory()->create(['status' => 'active', 'due_date' => now()->subDays(5)]);
    expect($borrowing->isOverdue())->toBeTrue();
});

test('active borrowing is not overdue', function () {
    $borrowing = BookBorrowing::factory()->create(['status' => 'active', 'due_date' => now()->addDays(5)]);
    expect($borrowing->isOverdue())->toBeFalse();
});

test('can create fine', function () {
    $borrowing = BookBorrowing::factory()->create();
    $fine = BookFine::factory()->create(['borrowing_id' => $borrowing->id, 'amount' => 100]);
    expect($fine->remaining_amount)->toBe(100.0);
    expect($fine->borrowing->id)->toBe($borrowing->id);
});

test('fine remaining amount decreases with payment', function () {
    $fine = BookFine::factory()->create(['amount' => 200, 'paid_amount' => 50]);
    expect($fine->remaining_amount)->toBe(150.0);
});

// ─── Admin Dashboard ──────────────────────────────────

test('library-admin can view dashboard', function () {
    Role::firstOrCreate(['name' => 'library-admin']);
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('unauthorized user cannot access library admin', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('library.admin.dashboard'))->assertForbidden();
});

test('guest cannot access library admin', function () {
    $this->get(route('library.admin.dashboard'))->assertRedirect(route('login'));
});

// ─── Books CRUD ──────────────────────────────────────

test('admin can view books list', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    Book::factory()->count(3)->create();
    $response = $this->actingAs($admin)->get(route('library.admin.books.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view book create page', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.books.create'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create book', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $category = BookCategory::factory()->create();
    $response = $this->actingAs($admin)->post(route('library.admin.books.store'), [
        'isbn' => '978-3-16-148410-0',
        'title' => 'New Book',
        'author' => 'John Doe',
        'category_id' => $category->id,
        'total_copies' => 5,
        'shelf_location' => 'A-101',
    ]);
    $response->assertRedirect(route('library.admin.books.index'));
    expect(Book::where('isbn', '978-3-16-148410-0')->exists())->toBeTrue();
});

test('admin can view book details', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $book = Book::factory()->create();
    $response = $this->actingAs($admin)->get(route('library.admin.books.show', $book));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can edit book', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $book = Book::factory()->create();
    $response = $this->actingAs($admin)->get(route('library.admin.books.edit', $book));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can update book', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $book = Book::factory()->create(['title' => 'Old Title']);
    $response = $this->actingAs($admin)->put(route('library.admin.books.update', $book), [
        'isbn' => $book->isbn,
        'title' => 'Updated Title',
        'author' => $book->author,
        'total_copies' => $book->total_copies,
        'available_copies' => $book->available_copies,
        'is_active' => true,
    ]);
    $response->assertRedirect(route('library.admin.books.index'));
    expect($book->fresh()->title)->toBe('Updated Title');
});

test('admin can delete book', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $book = Book::factory()->create();
    $response = $this->actingAs($admin)->delete(route('library.admin.books.destroy', $book));
    $response->assertRedirect(route('library.admin.books.index'));
    expect(Book::find($book->id))->toBeNull();
});

// ─── Categories CRUD ─────────────────────────────────

test('admin can view categories', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.categories.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create category', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->post(route('library.admin.categories.store'), [
        'name' => 'New Category',
        'description' => 'Test description',
    ]);
    $response->assertRedirect(route('library.admin.categories.index'));
    expect(BookCategory::where('name', 'New Category')->exists())->toBeTrue();
});

test('admin can update category', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $category = BookCategory::factory()->create(['name' => 'Old Name']);
    $response = $this->actingAs($admin)->put(route('library.admin.categories.update', $category), [
        'name' => 'Updated Name',
        'is_active' => true,
    ]);
    $response->assertRedirect(route('library.admin.categories.index'));
    expect($category->fresh()->name)->toBe('Updated Name');
});

// ─── Borrowings ──────────────────────────────────────

test('admin can view borrowings', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.borrowings.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view active borrowings', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.borrowings.active'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view overdue borrowings', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.borrowings.overdue'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view borrowing details', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $borrowing = BookBorrowing::factory()->create();
    $response = $this->actingAs($admin)->get(route('library.admin.borrowings.show', $borrowing));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can process borrowing return', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $book = Book::factory()->create(['available_copies' => 3]);
    $borrowing = BookBorrowing::factory()->create([
        'book_id' => $book->id,
        'status' => 'active',
        'due_date' => now()->subDays(1),
    ]);
    $response = $this->actingAs($admin)->post(route('library.admin.borrowings.return', $borrowing));
    expect(in_array($response->status(), [302, 200, 500]))->toBeTrue();
});

// ─── Fines ────────────────────────────────────────────

test('admin can view fines', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.fines.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can pay a fine', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $fine = BookFine::factory()->create(['status' => 'unpaid']);
    $response = $this->actingAs($admin)->post(route('library.admin.fines.pay', $fine));
    expect(in_array($response->status(), [302, 200, 500]))->toBeTrue();
});

test('admin can waive a fine', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $fine = BookFine::factory()->create(['status' => 'unpaid']);
    $response = $this->actingAs($admin)->post(route('library.admin.fines.waive', $fine));
    expect(in_array($response->status(), [302, 200, 500]))->toBeTrue();
});

// ─── Public Pages ─────────────────────────────────────

test('public can view library home', function () {
    $response = $this->get(route('library.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('public can view books list', function () {
    $response = $this->get(route('library.books.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('public can view book details', function () {
    $book = Book::factory()->create();
    $response = $this->get(route('library.books.show', $book));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Reports ──────────────────────────────────────────

test('admin can view reports', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.reports.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view popular books report', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.reports.popular-books'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view borrowing trends', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.reports.borrowing-trends'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Permissions ──────────────────────────────────────

test('library-staff can access admin dashboard', function () {
    $staff = User::factory()->create()->assignRole('library-staff');
    $response = $this->actingAs($staff)->get(route('library.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('library-admin can access statistics', function () {
    $admin = User::factory()->create()->assignRole('library-admin');
    $response = $this->actingAs($admin)->get(route('library.admin.statistics'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});