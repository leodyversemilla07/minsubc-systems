<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\BookCategory;

class BookCategoryController extends Controller
{
    public function index(): InertiaResponse
    {
        $categories = BookCategory::withCount('books')->latest()->get();
        return inertia('library/admin/categories/index', compact('categories'));
    }

    public function create(): InertiaResponse
    {
        return inertia('library/admin/categories/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:book_categories,name',
            'description' => 'nullable|string',
        ]);

        BookCategory::create($validated);

        return redirect()->route('library.admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(BookCategory $category): InertiaResponse
    {
        return inertia('library/admin/categories/edit', compact('category'));
    }

    public function update(Request $request, BookCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:book_categories,name,' . $category->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return redirect()->route('library.admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(BookCategory $category): RedirectResponse
    {
        if ($category->books()->count() > 0) {
            return redirect()->route('library.admin.categories.index')
                ->with('error', 'Cannot delete category with existing books.');
        }

        $category->delete();
        return redirect()->route('library.admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    public function list()
    {
        return response()->json(BookCategory::where('is_active', true)->get(['id', 'name']));
    }
}