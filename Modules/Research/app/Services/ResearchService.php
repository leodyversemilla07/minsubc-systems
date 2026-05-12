<?php namespace Modules\Research\Services;

use Modules\Research\Models\Proposal;
use Modules\Research\Models\Publication;
use Modules\Research\Models\Defense;
use Modules\Research\Models\Panel;
use Modules\Research\Models\Journal;

class ResearchService
{
    public function getDashboardStats(): array
    {
        return [
            'total_proposals' => Proposal::count(),
            'submitted_proposals' => Proposal::where('status', 'submitted')->count(),
            'approved_proposals' => Proposal::where('status', 'approved')->count(),
            'in_progress' => Proposal::where('status', 'in_progress')->count(),
            'completed' => Proposal::where('status', 'completed')->count(),
            'total_publications' => Publication::count(),
            'scheduled_defenses' => Defense::where('status', 'scheduled')->count(),
            'total_journals' => Journal::count(),
            'recent_proposals' => Proposal::with(['researchType', 'adviser'])->latest()->take(5)->get(),
            'upcoming_defenses' => Defense::with('proposal')->where('status', 'scheduled')->whereDate('scheduled_date', '>=', now())->take(5)->get(),
        ];
    }

    public function getProposalsStatus(): array
    {
        $proposals = Proposal::selectRaw("status, count(*) as total")->groupBy('status')->pluck('total', 'status')->toArray();
        $total = Proposal::count();
        return compact('proposals', 'total');
    }

    public function getPanelSummary(): array
    {
        $panels = Panel::with(['proposal', 'panelist'])->get()->groupBy(fn($p) => $p->proposal->title ?? 'Unknown');
        return compact('panels');
    }
}