<?php

namespace Modules\Analytics\Services;

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
        if (!Schema::hasTable($table)) return 0;
        return DB::table($table)->where($column, $value)->count() ?? 0;
    }

    private function safeSum(string $table, string $column): float
    {
        if (!Schema::hasTable($table)) return 0;
        return DB::table($table)->sum($column) ?? 0;
    }

    private function safeRaw(string $table, string $select, string $groupBy, string $orderBy, int $months = 12)
    {
        if (!Schema::hasTable($table)) return collect();
        try {
            return DB::table($table)
                ->selectRaw($select)
                ->where('created_at', '>=', now()->subMonths($months))
                ->groupBy(DB::raw($groupBy))
                ->orderBy(DB::raw($orderBy))
                ->get();
        } catch (\Exception $e) {
            return collect();
        }
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
        $trends = [];
        $trends['enrollment'] = $this->safeRaw(
            'admission_enrollments',
            "strftime('%Y-%m', created_at) as month, count(*) as count",
            "strftime('%Y-%m', created_at)",
            "strftime('%Y-%m', created_at)"
        );
        $trends['revenue'] = $this->safeRaw(
            'acc_payments',
            "strftime('%Y-%m', created_at) as month, sum(amount) as total",
            "strftime('%Y-%m', created_at)",
            "strftime('%Y-%m', created_at)"
        );
        $trends['incidents'] = $this->safeRaw(
            'dsc_incidents',
            "strftime('%Y-%m', created_at) as month, count(*) as count",
            "strftime('%Y-%m', created_at)",
            "strftime('%Y-%m', created_at)"
        );
        return $trends;
    }
}