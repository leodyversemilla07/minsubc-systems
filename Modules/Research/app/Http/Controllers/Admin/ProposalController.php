<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Proposal;
use Modules\Research\Models\Author;
use Modules\Research\Models\ResearchType;
class ProposalController extends Controller
{
    public function index(): InertiaResponse
    {
        $proposals = Proposal::with(['researchType', 'adviser', 'authors'])->latest()->paginate(15);
        return inertia('research/admin/proposals/index', compact('proposals'));
    }
    public function create(): InertiaResponse { return inertia('research/admin/proposals/create', ['researchTypes' => ResearchType::all()]); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255', 'research_type_id' => 'required|exists:res_research_types,id',
            'student_id' => 'required|exists:students,student_id', 'abstract' => 'nullable|string', 'keywords' => 'nullable|string',
        ]);
        $validated['proposal_code'] = 'RES-' . date('Y') . '-' . str_pad(Proposal::max('id') + 1, 4, '0', STR_PAD_LEFT);
        $validated['submitted_by'] = auth()->id();
        Proposal::create($validated);
        return redirect()->route('research.admin.proposals.index')->with('success', 'Proposal created.');
    }
    public function show(Proposal $proposal): InertiaResponse
    {
        $proposal->load(['researchType', 'adviser', 'authors', 'panels.panelist', 'defenses.scores', 'gradeReports']);
        return inertia('research/admin/proposals/show', compact('proposal'));
    }
    public function submit(Proposal $proposal): RedirectResponse
    {
        $proposal->update(['status' => 'submitted', 'submitted_at' => now()]);
        return redirect()->route('research.admin.proposals.show', $proposal)->with('success', 'Proposal submitted.');
    }
    public function approve(Request $request, Proposal $proposal): RedirectResponse
    {
        $proposal->update(['status' => 'approved', 'approved_at' => now(), 'adviser_feedback' => $request->feedback]);
        return redirect()->route('research.admin.proposals.show', $proposal)->with('success', 'Proposal approved.');
    }
    public function assignAdviser(Request $request, Proposal $proposal): RedirectResponse
    {
        $validated = $request->validate(['adviser_id' => 'required|exists:users,id']);
        $proposal->update(['adviser_id' => $validated['adviser_id']]);
        return redirect()->route('research.admin.proposals.show', $proposal)->with('success', 'Adviser assigned.');
    }
    public function addAuthor(Request $request, Proposal $proposal): RedirectResponse
    {
        $validated = $request->validate(['student_id' => 'required|exists:students,student_id', 'role' => 'required|in:leader,member,co_adviser']);
        Author::create(array_merge($validated, ['proposal_id' => $proposal->id]));
        return redirect()->route('research.admin.proposals.show', $proposal)->with('success', 'Author added.');
    }
    public function removeAuthor(Proposal $proposal, Author $author): RedirectResponse { $author->delete(); return redirect()->route('research.admin.proposals.show', $proposal)->with('success', 'Author removed.'); }
}


