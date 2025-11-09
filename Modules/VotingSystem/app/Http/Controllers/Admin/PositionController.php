<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Position;

class PositionController extends Controller
{
    /**
     * Display a listing of positions.
     */
    public function index(Request $request): Response
    {
        $query = Position::with('election')->withCount('candidates')->orderBy('election_id', 'desc')->orderBy('priority');

        // Filter by election if provided
        if ($request->has('election_id')) {
            $query->where('election_id', $request->election_id);
        }

        $positions = $query->get();
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);

        return Inertia::render('voting/admin/positions/index', [
            'positions' => $positions,
            'elections' => $elections,
            'selectedElectionId' => $request->election_id,
        ]);
    }

    /**
     * Show the form for creating a new position.
     */
    public function create(Request $request): Response
    {
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);
        $selectedElectionId = $request->input('election_id', $elections->first()?->id);

        return Inertia::render('voting/admin/positions/create', [
            'elections' => $elections,
            'selectedElectionId' => $selectedElectionId,
        ]);
    }

    /**
     * Store a newly created position.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'description' => 'required|string|max:255',
            'max_vote' => 'required|integer|min:1|max:20',
            'priority' => 'required|integer|min:0',
        ]);

        Position::create($validated);

        return redirect()->route('voting.admin.positions.index', ['election_id' => $validated['election_id']])
            ->with('success', 'Position created successfully!');
    }

    /**
     * Display the specified position.
     */
    public function show(Position $position): Response
    {
        $position->load(['election', 'candidates.partylist']);

        return Inertia::render('voting/admin/positions/show', compact('position'));
    }

    /**
     * Show the form for editing the specified position.
     */
    public function edit(Position $position): Response
    {
        $position->load('election');

        return Inertia::render('voting/admin/positions/edit', compact('position'));
    }

    /**
     * Update the specified position.
     */
    public function update(Request $request, Position $position): RedirectResponse
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'max_vote' => 'required|integer|min:1|max:20',
            'priority' => 'required|integer|min:0',
        ]);

        $position->update($validated);

        return redirect()->route('voting.admin.positions.index', ['election_id' => $position->election_id])
            ->with('success', 'Position updated successfully!');
    }

    /**
     * Remove the specified position.
     */
    public function destroy(Position $position): RedirectResponse
    {
        $electionId = $position->election_id;
        $position->delete();

        return redirect()->route('voting.admin.positions.index', ['election_id' => $electionId])
            ->with('success', 'Position deleted successfully!');
    }

    /**
     * Move position up in priority (decrease priority number).
     */
    public function moveUp(Position $position): RedirectResponse
    {
        $previousPosition = Position::where('election_id', $position->election_id)
            ->where('priority', '<', $position->priority)
            ->orderBy('priority', 'desc')
            ->first();

        if ($previousPosition) {
            // Swap priorities
            $tempPriority = $position->priority;
            $position->priority = $previousPosition->priority;
            $previousPosition->priority = $tempPriority;

            $position->save();
            $previousPosition->save();
        }

        return redirect()->route('voting.admin.positions.index', ['election_id' => $position->election_id])
            ->with('success', 'Position moved up successfully!');
    }

    /**
     * Move position down in priority (increase priority number).
     */
    public function moveDown(Position $position): RedirectResponse
    {
        $nextPosition = Position::where('election_id', $position->election_id)
            ->where('priority', '>', $position->priority)
            ->orderBy('priority', 'asc')
            ->first();

        if ($nextPosition) {
            // Swap priorities
            $tempPriority = $position->priority;
            $position->priority = $nextPosition->priority;
            $nextPosition->priority = $tempPriority;

            $position->save();
            $nextPosition->save();
        }

        return redirect()->route('voting.admin.positions.index', ['election_id' => $position->election_id])
            ->with('success', 'Position moved down successfully!');
    }
}
