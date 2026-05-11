<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Discount;

class DiscountController extends Controller
{
    public function index(): InertiaResponse
    {
        $discounts = Discount::latest()->get();
        return inertia('accounting/admin/discounts/index', compact('discounts'));
    }

    public function create(): InertiaResponse
    {
        return inertia('accounting/admin/discounts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_discounts,code',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);
        Discount::create($validated);
        return redirect()->route('accounting.admin.discounts.index')->with('success', 'Discount created.');
    }

    public function edit(Discount $discount): InertiaResponse
    {
        return inertia('accounting/admin/discounts/edit', compact('discount'));
    }

    public function update(Request $request, Discount $discount): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_discounts,code,' . $discount->id,
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $discount->update($validated);
        return redirect()->route('accounting.admin.discounts.index')->with('success', 'Discount updated.');
    }

    public function destroy(Discount $discount): RedirectResponse
    {
        $discount->delete();
        return redirect()->route('accounting.admin.discounts.index')->with('success', 'Discount deleted.');
    }
}