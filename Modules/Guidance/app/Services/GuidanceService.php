<?php

namespace Modules\Guidance\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\IncidentReport;
use Modules\Guidance\Models\Referral;
use Modules\Guidance\Models\Intervention;
use Modules\Guidance\Models\Assessment;

class GuidanceService
{
    public function getDashboardStats(): array
    {
        return [
            'counselors' => Counselor::where('is_active', true)->count(),
            'appointments_total' => Appointment::count(),
            'appointments_today' => Appointment::whereDate('created_at', today())->count(),
            'appointments_pending' => Appointment::where('status', 'scheduled')->count(),
            'sessions_completed' => CounselingSession::where('status', 'completed')->count(),
            'assessments_pending' => Assessment::where('status', 'pending')->count(),
            'referrals_active' => Referral::whereIn('status', ['pending', 'accepted'])->count(),
            'incidents_open' => IncidentReport::where('status', 'open')->count(),
            'interventions_active' => Intervention::whereIn('status', ['planned', 'ongoing'])->count(),
            'high_risk_cases' => CounselingSession::whereIn('risk_level', ['high', 'critical'])
                ->where('status', 'completed')
                ->count(),
        ];
    }

    public function getAppointmentsReport(): array
    {
        $month = request('month') ?? now()->format('Y-m');
        $start = Carbon::parse($month)->startOfMonth();
        $end = Carbon::parse($month)->endOfMonth();

        $daily = Appointment::whereBetween('created_at', [$start, $end])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN status = "no_show" THEN 1 ELSE 0 END) as no_show')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $byCounselor = Counselor::withCount(['appointments' => fn ($q) => $q->whereBetween('created_at', [$start, $end])])
            ->get(['id', 'first_name', 'last_name']);

        return compact('month', 'daily', 'byCounselor');
    }

    public function getSessionsReport(): array
    {
        $year = request('year') ?? now()->year;

        $monthly = collect(range(1, 12))->map(function ($m) use ($year) {
            $count = CounselingSession::whereYear('created_at', $year)
                ->whereMonth('created_at', $m)->count();
            return ['month' => Carbon::create($year, $m)->format('F'), 'count' => $count];
        });

        $byRisk = CounselingSession::whereYear('created_at', $year)
            ->selectRaw('risk_level, COUNT(*) as total')
            ->groupBy('risk_level')
            ->pluck('total', 'risk_level');

        $byType = CounselingSession::whereYear('created_at', $year)
            ->selectRaw('session_type, COUNT(*) as total')
            ->groupBy('session_type')
            ->pluck('total', 'session_type');

        return compact('year', 'monthly', 'byRisk', 'byType');
    }

    public function getIncidentsReport(): array
    {
        $year = request('year') ?? now()->year;

        $byType = IncidentReport::whereYear('created_at', $year)
            ->selectRaw('type, COUNT(*) as total')
            ->groupBy('type')->pluck('total', 'type');

        $bySeverity = IncidentReport::whereYear('created_at', $year)
            ->selectRaw('severity, COUNT(*) as total')
            ->groupBy('severity')->pluck('total', 'severity');

        $monthly = collect(range(1, 12))->map(function ($m) use ($year) {
            $count = IncidentReport::whereYear('created_at', $year)
                ->whereMonth('created_at', $m)->count();
            return ['month' => Carbon::create($year, $m)->format('F'), 'count' => $count];
        });

        return compact('year', 'byType', 'bySeverity', 'monthly');
    }
}