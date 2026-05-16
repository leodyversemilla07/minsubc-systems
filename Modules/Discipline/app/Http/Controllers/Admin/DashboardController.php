<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Discipline\Models\OffenseCategory;
use Modules\Discipline\Models\Incident;
use Modules\Discipline\Models\Sanction;
use Modules\Discipline\Models\Appeal;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_incidents' => Incident::count(),
            'pending_incidents' => Incident::where('status', 'pending')->count(),
            'active_sanctions' => Sanction::where('status', 'active')->count(),
            'pending_appeals' => Appeal::where('status', 'pending')->count(),
            'categories' => OffenseCategory::count(),
        ];
        $recentIncidents = Incident::with('student', 'offense.category', 'reporter')
            ->latest()->take(10)->get();
        return inertia('discipline/admin/dashboard', compact('stats', 'recentIncidents'));
    }
}