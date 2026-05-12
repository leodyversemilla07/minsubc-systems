<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Publication;
use Modules\Research\Models\PublicationAuthor;
use Modules\Research\Models\Proposal;
class PublicationController extends Controller
{
    public function index(): InertiaResponse { return inertia('research/admin/publications/index', ['publications' => Publication::with('proposal')->latest()->get()]); }
    public function create(): InertiaResponse { return inertia('research/admin/publications/create', ['proposals' => Proposal::where('status', 'completed')->get(['id', 'title', 'proposal_code'])]); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255', 'proposal_id' => 'nullable|exists:res_proposals,id',
            'abstract' => 'nullable|string', 'journal_name' => 'nullable|string|max:255',
            'doi' => 'nullable|string|max:255', 'status' => 'required|in:submitted,accepted,published,indexed',
        ]);
        Publication::create($validated);
        return redirect()->route('research.admin.publications.index')->with('success', 'Publication created.');
    }
    public function addAuthor(Request $request, Publication $publication): RedirectResponse
    {
        $validated = $request->validate(['name' => 'required|string|max:255', 'role' => 'required|in:author,co_author,corresponding']);
        PublicationAuthor::create(array_merge($validated, ['publication_id' => $publication->id]));
        return redirect()->route('research.admin.publications.index')->with('success', 'Author added.');
    }
    public function removeAuthor(Publication $publication, PublicationAuthor $author): RedirectResponse { $author->delete(); return redirect()->route('research.admin.publications.index')->with('success', 'Author removed.'); }
}


