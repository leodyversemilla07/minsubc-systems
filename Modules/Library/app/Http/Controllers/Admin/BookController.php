<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookCategory;

class BookController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $books = Book::with('category')
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")->orWhere('author', 'like', "%{$s}%")->orWhere('isbn', 'like', "%{$s}%");
            }))
            ->when($request->category, fn ($q, $c) => $q->where('category_id', $c))
            ->when($request->status === 'available', fn ($q) => $q->where('available_copies', '>', 0))
            ->when($request->status === 'unavailable', fn ($q) => $q->where('available_copies', '<=', 0))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $categories = BookCategory::where('is_active', true)->get();

        return inertia('library/admin/books/index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $categories = BookCategory::where('is_active', true)->get();
        return inertia('library/admin/books/create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'isbn' => 'required|string|max:20|unique:books,isbn',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1800|max:' . now()->year,
            'edition' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:book_categories,id',
            'total_copies' => 'required|integer|min:1',
            'shelf_location' => 'nullable|string|max:100',
        ]);

        $validated['available_copies'] = $validated['total_copies'];
        $validated['is_active'] = true;

        Book::create($validated);

        return redirect()->route('library.admin.books.index')
            ->with('success', 'Book created successfully.');
    }

    public function show(Book $book): InertiaResponse
    {
        $book->load('category', 'borrowings.user');
        return inertia('library/admin/books/show', compact('book'));
    }

    public function edit(Book $book): InertiaResponse
    {
        $categories = BookCategory::where('is_active', true)->get();
        return inertia('library/admin/books/edit', compact('book', 'categories'));
    }

    public function update(Request $request, Book $book): RedirectResponse
    {
        $validated = $request->validate([
            'isbn' => 'required|string|max:20|unique:books,isbn,' . $book->id,
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1800|max:' . now()->year,
            'edition' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:book_categories,id',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'required|integer|min:0',
            'shelf_location' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        $book->update($validated);

        return redirect()->route('library.admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();
        return redirect()->route('library.admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }

    public function addCopies(Request $request, Book $book): RedirectResponse
    {
        $validated = $request->validate(['copies' => 'required|integer|min:1']);
        $book->increment('total_copies', $validated['copies']);
        $book->increment('available_copies', $validated['copies']);

        return redirect()->route('library.admin.books.show', $book)
            ->with('success', "{$validated['copies']} copy/copies added successfully.");
    }

    public function search(Request $request)
    {
        $books = Book::where('is_active', true)
            ->where('available_copies', '>', 0)
            ->where(function ($q) use ($request) {
                $s = $request->q;
                $q->where('title', 'like', "%{$s}%")->orWhere('author', 'like', "%{$s}%")->orWhere('isbn', 'like', "%{$s}%");
            })
            ->take(10)
            ->get(['id', 'title', 'author', 'isbn', 'available_copies']);

        return response()->json($books);
    }

    public function popular()
    {
        $books = Book::withCount('borrowings')
            ->where('is_active', true)
            ->orderByDesc('borrowings_count')
            ->take(10)
            ->get(['id', 'title', 'author', 'isbn', 'available_copies']);

        return response()->json($books);
    }
}