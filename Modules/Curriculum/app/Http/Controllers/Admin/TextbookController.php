<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Textbook;

class TextbookController extends Controller
{
    public function index(): InertiaResponse
    {
        $textbooks = Textbook::withCount('syllabi')->latest()->get();
        return inertia('curriculum/admin/textbooks/index', compact('textbooks'));
    }
    public function create(): InertiaResponse { return inertia('curriculum/admin/textbooks/create'); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['title' => 'required|string|max:255', 'author' => 'required|string|max:255', 'isbn' => 'nullable|string|max:20', 'publisher' => 'nullable|string|max:255', 'year' => 'nullable|integer|min:1900|max:2099', 'type' => 'required|in:textbook,reference,journal,online_resource']);
        Textbook::create($validated);
        return redirect()->route('curriculum.admin.textbooks.index')->with('success', 'Textbook created.');
    }
    public function edit(Textbook $textbook): InertiaResponse { return inertia('curriculum/admin/textbooks/edit', compact('textbook')); }
    public function update(Request $request, Textbook $textbook): RedirectResponse
    {
        $validated = $request->validate(['title' => 'required|string|max:255', 'author' => 'required|string|max:255', 'isbn' => 'nullable|string|max:20', 'publisher' => 'nullable|string|max:255', 'year' => 'nullable|integer|min:1900|max:2099', 'type' => 'required|in:textbook,reference,journal,online_resource']);
        $textbook->update($validated);
        return redirect()->route('curriculum.admin.textbooks.index')->with('success', 'Textbook updated.');
    }
    public function destroy(Textbook $textbook): RedirectResponse { $textbook->delete(); return redirect()->route('curriculum.admin.textbooks.index')->with('success', 'Textbook deleted.'); }
}


