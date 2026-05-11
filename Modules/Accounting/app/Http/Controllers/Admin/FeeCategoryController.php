<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\FeeCategory;

class FeeCategoryController extends Controller
{
    public function index(): InertiaResponse
    {
        $categories = FeeCategory::withCount('feeItems')->latest()->get();
        return inertia('accounting/admin/fee-categories/index', compact('categories'));
    }

    public function create(): InertiaResponse
    {
        return inertia('accounting/admin/fee-categories/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_categories,code',
            'description' => 'nullable|string',
            'is_required' => 'boolean',
        ]);
        FeeCategory::create($validated);
        return redirect()->route('accounting.admin.fee-categories.index')->with('success', 'Fee category created.');
    }

    public function edit(FeeCategory $feeCategory): InertiaResponse
    {
        return inertia('accounting/admin/fee-categories/edit', ['feeCategory' => $feeCategory]);
    }

    public function update(Request $request, FeeCategory $feeCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_categories,code,' . $feeCategory->id,
            'description' => 'nullable|string',
            'is_required' => 'boolean',
            'is_active' => 'boolean',
        ]);
        $feeCategory->update($validated);
        return redirect()->route('accounting.admin.fee-categories.index')->with('success', 'Fee category updated.');
    }

    public function destroy(FeeCategory $feeCategory): RedirectResponse
    {
        $feeCategory->delete();
        return redirect()->route('accounting.admin.fee-categories.index')->with('success', 'Fee category deleted.');
    }
}