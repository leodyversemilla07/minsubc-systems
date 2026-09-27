<?php

namespace Modules\Analytics\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AnalyticsService
{
    public function getAllStats(): array
    {
        return [
            'academic' => $this->getAcademicStats(),
            'financial' => $this->getFinancialStats(),
            'operations' => $this->getOperationsStats(),
            'student_services' => $this->getStudentServicesStats(),
            'governance' => $this->getGovernanceStats(),
            'trends' => $this->getTrends(),
        ];
    }

    private function safeCount(string $table, string $column = 'id'): int
    {
        return Schema::hasTable($table) ? (DB::table($table)->count($column) ?? 0) : 0;
    }

    private function safeCountWhere(string $table, string $column, $value): int
    {
        if (! Schema::hasTable($table)) {
            return 0;
        }

        return DB::table($table)->where($column, $value)->count() ?? 0;
    }

    private function safeSum(string $table, string $column): float
    {
        if (! Schema::hasTable($table)) {
            return 0;
        }

        return DB::table($table)->sum($column) ?? 0;
    }

    private function getAcademicStats(): array
    {
        return [
            'total_students' => $this->safeCount('students'),
            'new_applicants' => $this->safeCountWhere('admission_applicants', 'status', 'pending'),
            'active_enrollments' => $this->safeCountWhere('admission_enrollments', 'status', 'enrolled'),
            'active_programs' => $this->safeCount('cur_programs'),
            'courses' => $this->safeCount('cur_courses'),
            'academic_terms' => $this->safeCountWhere('academic_terms', 'is_active', 1),
        ];
    }

    private function getFinancialStats(): array
    {
        $totalInvoiced = $this->safeSum('acc_invoices', 'total_amount');
        $totalCollected = $this->safeSum('acc_payments', 'amount');

        return [
            'total_invoiced' => round($totalInvoiced, 2),
            'total_collected' => round($totalCollected, 2),
            'outstanding' => round(max(0, $totalInvoiced - $totalCollected), 2),
            'pending_payments' => $this->safeCountWhere('acc_invoices', 'status', 'pending'),
        ];
    }

    private function getOperationsStats(): array
    {
        return [
            'employees' => $this->safeCount('hr_employees'),
            'departments' => $this->safeCount('hr_departments'),
            'active_borrowings' => $this->safeCountWhere('book_borrowings', 'status', 'borrowed'),
            'overdue_books' => $this->safeCountWhere('book_borrowings', 'status', 'overdue'),
            'available_books' => $this->safeCount('books'),
            'facility_rooms' => $this->safeCount('fac_facilities'),
            'active_reservations' => $this->safeCountWhere('fac_reservations', 'status', 'approved'),
            'equipment_count' => $this->safeCount('fac_equipment'),
            'pending_maintenance' => $this->safeCountWhere('fac_maintenance_requests', 'status', 'pending'),
            'dorm_halls' => $this->safeCount('drm_halls'),
            'dorm_occupancy' => $this->safeCountWhere('drm_assignments', 'status', 'active'),
            'dorm_capacity' => $this->safeCount('drm_beds'),
            'helpdesk_open' => $this->safeCountWhere('hlp_tickets', 'status', 'open'),
            'helpdesk_resolved' => $this->safeCountWhere('hlp_tickets', 'status', 'resolved'),
            'helpdesk_total' => $this->safeCount('hlp_tickets'),
        ];
    }

    private function getStudentServicesStats(): array
    {
        return [
            'clinic_appointments' => $this->safeCount('cls_appointments'),
            'guidance_sessions' => $this->safeCount('gdn_counseling_sessions'),
            'guidance_incidents' => $this->safeCount('gdn_incident_reports'),
            'discipline_incidents' => $this->safeCount('dsc_incidents'),
            'active_sanctions' => $this->safeCountWhere('dsc_sanctions', 'status', 'active'),
            'pending_appeals' => $this->safeCountWhere('dsc_appeals', 'status', 'pending'),
            'active_scholarships' => $this->safeCountWhere('scholarship_recipients', 'status', 'active'),
            'research_proposals' => $this->safeCountWhere('res_proposals', 'status', 'submitted'),
            'research_defenses' => $this->safeCountWhere('res_defenses', 'status', 'scheduled'),
            'publications' => $this->safeCount('res_publications'),
            'alumni_count' => $this->safeCount('alm_alumni'),
            'alumni_events' => $this->safeCountWhere('alm_events', 'status', 'upcoming'),
        ];
    }

    private function getGovernanceStats(): array
    {
        return [
            'usg_officers' => $this->safeCount('officers'),
            'usg_resolutions' => $this->safeCount('resolutions'),
            'usg_announcements' => $this->safeCount('announcements'),
            'upcoming_events' => $this->safeCountWhere('sch_events', 'status', 'published'),
            'academic_schedules' => $this->safeCount('sch_academic_schedules'),
            'active_elections' => $this->safeCountWhere('elections', 'status', 'active'),
            'candidates' => $this->safeCount('candidates'),
        ];
    }

    private function getTrends(): array
    {
        // Grouped in PHP (DB-agnostic: strftime is SQLite-only).
        // safeRaw() silently swallowed the MySQL error and returned empty trends.
        return [
            'enrollment' => $this->safeMonthlyCount('admission_enrollments'),
            'revenue' => $this->safeMonthlySum('acc_payments', 'amount'),
            'incidents' => $this->safeMonthlyCount('dsc_incidents'),
        ];
    }

    private function safeMonthlyCount(string $table, int $months = 12)
    {
        if (! Schema::hasTable($table)) {
            return collect();
        }

        return DB::table($table)
            ->where('created_at', '>=', now()->subMonths($months))
            ->orderBy('created_at')
            ->pluck('created_at')
            ->map(fn ($date) => Carbon::parse($date)->format('Y-m'))
            ->countBy()
            ->map(fn ($count, $month) => ['month' => $month, 'count' => $count])
            ->values();
    }

    private function safeMonthlySum(string $table, string $column, int $months = 12)
    {
        if (! Schema::hasTable($table)) {
            return collect();
        }

        return DB::table($table)
            ->where('created_at', '>=', now()->subMonths($months))
            ->orderBy('created_at')
            ->get(['created_at', $column])
            ->groupBy(fn ($row) => Carbon::parse($row->created_at)->format('Y-m'))
            ->map(fn ($group, $month) => ['month' => $month, 'total' => $group->sum($column)])
            ->sortKeys()
            ->values();
    }
}
