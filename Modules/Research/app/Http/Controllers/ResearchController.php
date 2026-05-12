<?php namespace Modules\Research\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Proposal;
use Modules\Research\Models\Publication;

class ResearchController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'proposals' => Proposal::count(),
            'publications' => Publication::count(),
            'ongoing' => Proposal::where('status', 'in_progress')->count(),
            'completed' => Proposal::where('status', 'completed')->count(),
        ];
        return inertia('research/index', compact('stats'));
    }
    public function proposals(): InertiaResponse
    {
        $proposals = Proposal::with('researchType')->whereIn('status', ['approved', 'in_progress'])->get();
        return inertia('research/proposals', compact('proposals'));
    }
    public function publications(): InertiaResponse
    {
        $publications = Publication::where('status', 'published')->get();
        return inertia('research/publications', compact('publications'));
    }
    public function viewThesis(Proposal $proposal): InertiaResponse
    {
        $proposal->load(['researchType', 'authors', 'adviser', 'defenses', 'publication']);
        return inertia('research/theses/view', compact('proposal'));
    }
}