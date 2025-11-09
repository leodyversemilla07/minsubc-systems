<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;

class CandidateController extends Controller
{
    /**
     * Display a listing of candidates.
     */
    public function index(Request $request): Response
    {
        $query = Candidate::with(['election', 'position', 'partylist'])
            ->orderBy('election_id', 'desc')
            ->orderBy('position_id');

        // Filter by election if provided
        if ($request->has('election_id')) {
            $query->where('election_id', $request->election_id);
        }

        $candidates = $query->get();
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);

        return Inertia::render('voting/admin/candidates/index', [
            'candidates' => $candidates,
            'elections' => $elections,
            'selectedElectionId' => $request->election_id,
        ]);
    }

    /**
     * Show the form for creating a new candidate.
     */
    public function create(Request $request): Response
    {
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);
        $selectedElectionId = $request->input('election_id', $elections->first()?->id);

        $positions = Position::where('election_id', $selectedElectionId)
            ->orderBy('priority')
            ->get(['position_id', 'description']);

        $partylists = Partylist::where('election_id', $selectedElectionId)
            ->get(['partylist_id', 'name']);

        return Inertia::render('voting/admin/candidates/create', [
            'elections' => $elections,
            'positions' => $positions,
            'partylists' => $partylists,
            'selectedElectionId' => $selectedElectionId,
        ]);
    }

    /**
     * Store a newly created candidate.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'position_id' => 'required|exists:positions,position_id',
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
            'photo' => 'nullable|image|max:2048',
            'platform' => 'nullable|string',
            'partylist_id' => 'nullable|exists:partylists,partylist_id',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('candidates', 'public');
        }

        Candidate::create($validated);

        return redirect()->route('voting.admin.candidates.index', ['election_id' => $validated['election_id']])
            ->with('success', 'Candidate created successfully!');
    }

    /**
     * Display the specified candidate.
     */
    public function show(Candidate $candidate): Response
    {
        $candidate->load(['election', 'position', 'partylist', 'votes.voter.student.user']);

        return Inertia::render('voting/admin/candidates/show', compact('candidate'));
    }

    /**
     * Show the form for editing the specified candidate.
     */
    public function edit(Candidate $candidate): Response
    {
        $positions = Position::where('election_id', $candidate->election_id)
            ->orderBy('priority')
            ->get(['position_id', 'description']);

        $partylists = Partylist::where('election_id', $candidate->election_id)
            ->get(['partylist_id', 'name']);

        return Inertia::render('voting/admin/candidates/edit', [
            'candidate' => $candidate,
            'positions' => $positions,
            'partylists' => $partylists,
        ]);
    }

    /**
     * Update the specified candidate.
     */
    public function update(Request $request, Candidate $candidate): RedirectResponse
    {
        $validated = $request->validate([
            'position_id' => 'required|exists:positions,position_id',
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
            'photo' => 'nullable|image|max:2048',
            'platform' => 'nullable|string',
            'partylist_id' => 'nullable|exists:partylists,partylist_id',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo
            if ($candidate->photo) {
                Storage::disk('public')->delete($candidate->photo);
            }
            $validated['photo'] = $request->file('photo')->store('candidates', 'public');
        }

        $candidate->update($validated);

        return redirect()->route('voting.admin.candidates.index', ['election_id' => $candidate->election_id])
            ->with('success', 'Candidate updated successfully!');
    }

    /**
     * Remove the specified candidate.
     */
    public function destroy(Candidate $candidate): RedirectResponse
    {
        // Delete photo if exists
        if ($candidate->photo) {
            Storage::disk('public')->delete($candidate->photo);
        }

        $electionId = $candidate->election_id;
        $candidate->delete();

        return redirect()->route('voting.admin.candidates.index', ['election_id' => $electionId])
            ->with('success', 'Candidate deleted successfully!');
    }
}
