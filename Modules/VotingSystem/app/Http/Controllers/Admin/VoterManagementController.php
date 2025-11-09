<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Voter;

class VoterManagementController extends Controller
{
    /**
     * Display a listing of voters.
     */
    public function index(Request $request): Response
    {
        $query = Voter::with(['election', 'student.user'])->orderBy('election_id', 'desc');

        // Filter by election if provided
        if ($request->has('election_id')) {
            $query->where('election_id', $request->election_id);
        }

        $voters = $query->get();
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);

        return Inertia::render('voting/admin/voters/index', [
            'voters' => $voters,
            'elections' => $elections,
            'selectedElectionId' => $request->election_id,
        ]);
    }

    /**
     * Show the form for creating voters (bulk generation).
     */
    public function create(Request $request): Response
    {
        $elections = Election::orderBy('created_at', 'desc')->get(['id', 'name']);
        $selectedElectionId = $request->input('election_id', $elections->first()?->id);

        // Get students who are not yet voters in the selected election
        $availableStudents = Student::with('user')
            ->whereDoesntHave('voters', function ($query) use ($selectedElectionId) {
                $query->where('election_id', $selectedElectionId);
            })
            ->where('status', 'active')
            ->get();

        return Inertia::render('voting/admin/voters/create', [
            'elections' => $elections,
            'availableStudents' => $availableStudents,
            'selectedElectionId' => $selectedElectionId,
        ]);
    }

    /**
     * Generate voters in bulk.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'exists:students,student_id',
            'generation_batch' => 'required|integer|min:1',
            'prefix' => 'nullable|string|max:10',
            'default_password' => 'nullable|string|min:6',
        ]);

        $password = $validated['default_password'] ?? 'password';
        $hashedPassword = Hash::make($password);

        $created = 0;
        foreach ($validated['student_ids'] as $studentId) {
            // Check if voter already exists
            $exists = Voter::where('election_id', $validated['election_id'])
                ->where('voters_id', $studentId)
                ->exists();

            if (! $exists) {
                Voter::create([
                    'election_id' => $validated['election_id'],
                    'voters_id' => $studentId,
                    'password' => $hashedPassword,
                    'generation_batch' => $validated['generation_batch'],
                    'prefix' => $validated['prefix'] ?? '',
                    'has_voted' => false,
                ]);
                $created++;
            }
        }

        return redirect()->route('voting.admin.voters.index', ['election_id' => $validated['election_id']])
            ->with('success', "Successfully generated {$created} voter(s)!");
    }

    /**
     * Display the specified voter.
     */
    public function show(Voter $voter): Response
    {
        $voter->load(['election', 'student.user', 'votes.candidate.position']);

        return Inertia::render('voting/admin/voters/show', compact('voter'));
    }

    /**
     * Reset voter's password.
     */
    public function resetPassword(Request $request, Voter $voter): RedirectResponse
    {
        $validated = $request->validate([
            'new_password' => 'required|string|min:6',
        ]);

        $voter->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return back()->with('success', 'Voter password reset successfully!');
    }

    /**
     * Reset voter's voting status (allow re-vote).
     */
    public function resetVote(Voter $voter): RedirectResponse
    {
        // Delete existing votes
        $voter->votes()->delete();

        // Reset has_voted status
        $voter->update(['has_voted' => false]);

        return back()->with('success', 'Voter status reset successfully. Voter can now vote again.');
    }

    /**
     * Remove the specified voter.
     */
    public function destroy(Voter $voter): RedirectResponse
    {
        $electionId = $voter->election_id;
        $voter->delete();

        return redirect()->route('voting.admin.voters.index', ['election_id' => $electionId])
            ->with('success', 'Voter deleted successfully!');
    }

    /**
     * Export voters list for the specified election.
     */
    public function export(Election $election)
    {
        $voters = Voter::with('student.user')
            ->where('election_id', $election->id)
            ->get();

        $csvData = "Voter ID,Student Name,Course,Year Level,Has Voted,Generation Batch,Prefix\n";

        foreach ($voters as $voter) {
            $csvData .= sprintf(
                "%s,%s,%s,%s,%s,%s,%s\n",
                $voter->voters_id,
                $voter->student?->user?->full_name ?? 'N/A',
                $voter->student?->course ?? 'N/A',
                $voter->student?->year_level ?? 'N/A',
                $voter->has_voted ? 'Yes' : 'No',
                $voter->generation_batch,
                $voter->prefix
            );
        }

        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', "attachment; filename=voters_{$election->election_code}.csv");
    }
}
