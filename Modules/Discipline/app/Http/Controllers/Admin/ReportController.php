<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Discipline\Models\Incident;
use Modules\Discipline\Models\Sanction;
use Modules\Discipline\Models\Offense;

class ReportController extends Controller
{
    public function index()
    {
        $incidentsByStatus = Incident::selectRaw("status, count(*) as count")
            ->groupBy('status')->pluck('count', 'status');
        $incidentsByTier = Offense::selectRaw("dsc_offense_categories.tier, count(*) as count")
            ->join('dsc_offense_categories', 'dsc_offenses.category_id', '=', 'dsc_offense_categories.id')
            ->join('dsc_incidents', 'dsc_offenses.id', '=', 'dsc_incidents.offense_id')
            ->groupBy('dsc_offense_categories.tier')
            ->pluck('count', 'tier');
        $activeSanctions = Sanction::where('status', 'active')->count();
        $totalIncidents = Incident::count();
        return inertia('discipline/admin/reports/index', compact('incidentsByStatus', 'incidentsByTier', 'activeSanctions', 'totalIncidents'));
    }
}