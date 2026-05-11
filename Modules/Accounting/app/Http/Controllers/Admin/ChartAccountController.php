<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\ChartAccount;

class ChartAccountController extends Controller
{
    public function index(): InertiaResponse
    {
        $accounts = ChartAccount::with('children')->whereNull('parent_id')->get();
        return inertia('accounting/admin/chart-accounts/index', compact('accounts'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'account_code' => 'required|string|max:20|unique:acc_chart_accounts,account_code',
            'name' => 'required|string|max:255',
            'type' => 'required|in:asset,liability,equity,revenue,expense',
            'parent_id' => 'nullable|exists:acc_chart_accounts,id',
        ]);
        ChartAccount::create($validated);
        return redirect()->route('accounting.admin.chart-accounts.index')->with('success', 'Account created.');
    }

    public function update(Request $request, ChartAccount $chartAccount): RedirectResponse
    {
        $validated = $request->validate([
            'account_code' => 'required|string|max:20|unique:acc_chart_accounts,account_code,' . $chartAccount->id,
            'name' => 'required|string|max:255',
            'type' => 'required|in:asset,liability,equity,revenue,expense',
            'is_active' => 'boolean',
        ]);
        $chartAccount->update($validated);
        return redirect()->route('accounting.admin.chart-accounts.index')->with('success', 'Account updated.');
    }

    public function list()
    {
        return response()->json(ChartAccount::where('is_active', true)->get());
    }
}