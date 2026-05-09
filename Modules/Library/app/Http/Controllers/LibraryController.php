<?php

namespace Modules\Library\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookCategory;
use Modules\Library\Services\LibraryService;

class LibraryController extends Controller
{
    public function __construct(
        protected LibraryService $libraryService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->libraryService->getDashboardStats();
        $recentBooks = Book::with('category')->where('is_active', true)->latest()->take(8)->get();
        $categories = BookCategory::where('is_active', true)->get();

        return inertia('library/index', compact('stats', 'recentBooks', 'categories'));
    }

    public function books(): InertiaResponse
    {
        $books = Book::with('category')
            ->where('is_active', true)
            ->when(request('search'), fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")->orWhere('author', 'like', "%{$s}%")->orWhere('isbn', 'like', "%{$s}%");
            }))
            ->when(request('category'), fn ($q, $c) => $q->where('category_id', $c))
            ->paginate(12)
            ->withQueryString();

        $categories = BookCategory::where('is_active', true)->get();

        return inertia('library/books/index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => request()->only(['search', 'category']),
        ]);
    }

    public function bookShow(Book $book): InertiaResponse
    {
        $book->load('category');
        $relatedBooks = Book::where('category_id', $book->category_id)
            ->where('id', '!=', $book->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return inertia('library/books/show', compact('book', 'relatedBooks'));
    }

    public function categoryShow(BookCategory $category): InertiaResponse
    {
        $books = Book::where('category_id', $category->id)->where('is_active', true)->paginate(12)->withQueryString();
        $categories = BookCategory::where('is_active', true)->get();

        return inertia('library/books/index', [
            'books' => $books,
            'categories' => $categories,
            'selectedCategory' => $category,
            'filters' => ['category' => $category->id],
        ]);
    }
}