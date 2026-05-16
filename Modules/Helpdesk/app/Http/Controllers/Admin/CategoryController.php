<?php

namespace Modules\Helpdesk\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Helpdesk\Models\TicketCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = TicketCategory::withCount('tickets')->paginate(20);
        return inertia('helpdesk/admin/categories/index', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);
        TicketCategory::create($validated);
        return redirect()->route('helpdesk.admin.categories.index');
    }

    public function update(Request $request, TicketCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7',
            'is_active' => 'boolean',
        ]);
        $category->update($validated);
        return redirect()->route('helpdesk.admin.categories.index');
    }
}