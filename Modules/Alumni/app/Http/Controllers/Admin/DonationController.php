<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\Donation;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::with('alumnus')->orderBy('donated_at', 'desc')->paginate(15);
        return Inertia::render('alumni/admin/donations/index', ['donations' => $donations]);
    }

    public function create()
    {
        $alumni = \Modules\Alumni\Models\Alumnus::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('alumni/admin/donations/create', ['alumni' => $alumni]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'alumnus_id' => 'required|exists:alm_alumni,id',
            'amount' => 'required|numeric|min:0',
            'donation_type' => 'required|string',
            'purpose' => 'nullable|string',
            'payment_method' => 'nullable|string',
            'donated_at' => 'nullable|date',
            'is_anonymous' => 'boolean',
        ]);
        Donation::create($validated);
        return redirect()->route('alumni.admin.donations.index')->with('success', 'Donation recorded.');
    }

    public function show(Donation $donation)
    {
        $donation->load('alumnus');
        return Inertia::render('alumni/admin/donations/show', ['donation' => $donation]);
    }

    public function destroy(Donation $donation)
    {
        $donation->delete();
        return redirect()->route('alumni.admin.donations.index')->with('success', 'Donation deleted.');
    }
}