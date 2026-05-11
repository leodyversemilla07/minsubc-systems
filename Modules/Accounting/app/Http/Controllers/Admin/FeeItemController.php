<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\FeeItem;
use Modules\Accounting\Models\FeeCategory;

class FeeItemController extends Controller
{
    public function index(): InertiaResponse
    {
        $items = FeeItem::with('category')->latest()->get();
        return inertia('accounting/admin/fee-items/index', compact('items'));
    }

    public function create(): InertiaResponse
    {
        $categories = FeeCategory::where('is_active', true)->get(['id', 'name', 'code']);
        return inertia('accounting/admin/fee-items/create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fee_category_id' => 'required|exists:acc_fee_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_items,code',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:tuition,laboratory,miscellaneous,other',
            'billing_cycle' => 'required|in:per_term,per_year,one_time',
            'description' => 'nullable|string',
        ]);
        FeeItem::create($validated);
        return redirect()->route('accounting.admin.fee-items.index')->with('success', 'Fee item created.');
    }

    public function edit(FeeItem $feeItem): InertiaResponse
    {
        $categories = FeeCategory::where('is_active', true)->get(['id', 'name', 'code']);
        return inertia('accounting/admin/fee-items/edit', ['feeItem' => $feeItem, 'categories' => $categories]);
    }

    public function update(Request $request, FeeItem $feeItem): RedirectResponse
    {
        $validated = $request->validate([
            'fee_category_id' => 'required|exists:acc_fee_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_items,code,' . $feeItem->id,
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:tuition,laboratory,miscellaneous,other',
            'billing_cycle' => 'required|in:per_term,per_year,one_time',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $feeItem->update($validated);
        return redirect()->route('accounting.admin.fee-items.index')->with('success', 'Fee item updated.');
    }

    public function destroy(FeeItem $feeItem): RedirectResponse
    {
        $feeItem->delete();
        return redirect()->route('accounting.admin.fee-items.index')->with('success', 'Fee item deleted.');
    }

    public function list()
    {
        return response()->json(FeeItem::with('category')->where('is_active', true)->get());
    }
}