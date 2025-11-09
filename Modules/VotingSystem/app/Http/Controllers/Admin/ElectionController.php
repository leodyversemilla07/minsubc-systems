<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;

class ElectionController extends Controller
{
    /**
     * Display a listing of elections.
     */
    public function index(): Response
    {
        $elections = Election::withCount(['positions', 'candidates', 'voters', 'votes'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('voting/admin/elections/index', compact('elections'));
    }

    /**
     * Show the form for creating a new election.
     */
    public function create(): Response
    {
        return Inertia::render('voting/admin/elections/create');
    }

    /**
     * Store a newly created election.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'end_time' => 'nullable|date|after:now',
        ]);

        $validated['election_code'] = strtoupper(Str::random(10));
        $validated['status'] = false;

        Election::create($validated);

        return redirect()->route('voting.admin.elections.index')
            ->with('success', 'Election created successfully!');
    }

    /**
     * Display the specified election.
     */
    public function show(Election $election): Response
    {
        $election->loadCount(['positions', 'candidates', 'voters', 'votes']);

        return Inertia::render('voting/admin/elections/show', compact('election'));
    }

    /**
     * Show the form for editing the specified election.
     */
    public function edit(Election $election): Response
    {
        return Inertia::render('voting/admin/elections/edit', compact('election'));
    }

    /**
     * Update the specified election.
     */
    public function update(Request $request, Election $election): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'end_time' => 'nullable|date',
        ]);

        $election->update($validated);

        return redirect()->route('voting.admin.elections.index')
            ->with('success', 'Election updated successfully!');
    }

    /**
     * Toggle election status (activate/deactivate).
     */
    public function toggleStatus(Election $election): RedirectResponse
    {
        $election->update(['status' => ! $election->status]);

        $message = $election->status ? 'Election activated successfully!' : 'Election deactivated successfully!';

        return back()->with('success', $message);
    }

    /**
     * Remove the specified election.
     */
    public function destroy(Election $election): RedirectResponse
    {
        $election->delete();

        return redirect()->route('voting.admin.elections.index')
            ->with('success', 'Election deleted successfully!');
    }
}
