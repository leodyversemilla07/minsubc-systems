<?php

namespace Modules\Alumni\Services;

use Modules\Alumni\Models\Alumnus;
use Modules\Alumni\Models\AlumniEvent;

class AlumniService
{
    public function getDashboardStats(): array
    {
        return [
            'total_alumni' => Alumnus::count(),
            'verified_alumni' => Alumnus::where('is_verified', true)->count(),
            'employed_alumni' => Alumnus::where('is_employed', true)->count(),
            'upcoming_events' => AlumniEvent::where('status', 'upcoming')->count(),
            'total_donations' => \Modules\Alumni\Models\Donation::sum('amount'),
            'recent_registrations' => Alumnus::where('created_at', '>=', now()->subMonth())->count(),
        ];
    }

    public function getEmploymentStats(): array
    {
        $total = Alumnus::count();
        $employed = Alumnus::where('is_employed', true)->count();
        return [
            'employment_rate' => $total > 0 ? round(($employed / $total) * 100, 1) : 0,
            'employed' => $employed,
            'unemployed' => $total - $employed,
            'by_industry' => \Modules\Alumni\Models\EmploymentRecord::selectRaw('industry, count(*) as total')
                ->groupBy('industry')->pluck('total', 'industry')->toArray(),
        ];
    }

    public function getDonationSummary(): array
    {
        return [
            'total' => \Modules\Alumni\Models\Donation::sum('amount'),
            'by_purpose' => \Modules\Alumni\Models\Donation::selectRaw('purpose, sum(amount) as total')
                ->groupBy('purpose')->pluck('total', 'purpose')->toArray(),
            'donors_count' => \Modules\Alumni\Models\Donation::distinct('alumnus_id')->count('alumnus_id'),
        ];
    }

    public function getTracerData(array $filters = []): array
    {
        $query = Alumnus::with('employmentRecords');
        if (!empty($filters['year'])) {
            $query->where('graduation_year', $filters['year']);
        }
        if (!empty($filters['college'])) {
            $query->where('college', $filters['college']);
        }
        return $query->get()->toArray();
    }
}