<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;

class PartylistController extends Controller
{
    /**
     * Display a listing of partylists.
     */
    public function index(Request $request): Response
    {
        $query = Partylist::with('election')->withCount('candidates')->orderBy('election_id', 'desc');

        // Filter by election if provided
        if ($request->has('election_id')) {
            $query->where('election_id', $request->election_id);
        }

        $partylists = $query->get();
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);

        return Inertia::render('voting/admin/partylists/index', [
            'partylists' => $partylists,
            'elections' => $elections,
            'selectedElectionId' => $request->election_id,
        ]);
    }

    /**
     * Show the form for creating a new partylist.
     */
    public function create(Request $request): Response
    {
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);
        $selectedElectionId = $request->input('election_id', $elections->first()?->id);

        return Inertia::render('voting/admin/partylists/create', [
            'elections' => $elections,
            'selectedElectionId' => $selectedElectionId,
        ]);
    }

    /**
     * Store a newly created partylist.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'name' => 'required|string|max:255',
        ]);

        Partylist::create($validated);

        return redirect()->route('voting.admin.partylists.index', ['election_id' => $validated['election_id']])
            ->with('success', 'Partylist created successfully!');
    }

    /**
     * Display the specified partylist.
     */
    public function show(Partylist $partylist): Response
    {
        $partylist->load(['election', 'candidates.position']);

        return Inertia::render('voting/admin/partylists/show', compact('partylist'));
    }

    /**
     * Show the form for editing the specified partylist.
     */
    public function edit(Partylist $partylist): Response
    {
        $partylist->load('election');

        return Inertia::render('voting/admin/partylists/edit', compact('partylist'));
    }

    /**
     * Update the specified partylist.
     */
    public function update(Request $request, Partylist $partylist): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $partylist->update($validated);

        return redirect()->route('voting.admin.partylists.index', ['election_id' => $partylist->election_id])
            ->with('success', 'Partylist updated successfully!');
    }

    /**
     * Remove the specified partylist.
     */
    public function destroy(Partylist $partylist): RedirectResponse
    {
        $electionId = $partylist->election_id;
        $partylist->delete();

        return redirect()->route('voting.admin.partylists.index', ['election_id' => $electionId])
            ->with('success', 'Partylist deleted successfully!');
    }
}
