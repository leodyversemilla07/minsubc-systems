<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GlobalSearchService
{
    public function search(string $query): array
    {
        if (strlen(trim($query)) < 2) {
            return [];
        }

        $term = '%' . $query . '%';
        $results = [];

        // ── Students ────────────────────────────────────────────────
        if (Schema::hasTable('students')) {
            foreach (DB::table('students')
                ->where('first_name', 'like', $term)
                ->orWhere('last_name', 'like', $term)
                ->orWhere('student_id', 'like', $term)
                ->limit(10)->get() as $row) {
                $results[] = [
                    'type' => 'Student',
                    'label' => "{$row->first_name} {$row->last_name}",
                    'sublabel' => $row->student_id,
                    'url' => "/admin/students/{$row->student_id}",
                    'icon' => 'GraduationCap',
                ];
            }
        }

        // ── Faculty / Staff ─────────────────────────────────────────
        if (Schema::hasTable('hr_employees')) {
            foreach (DB::table('hr_employees')
                ->where('first_name', 'like', $term)
                ->orWhere('last_name', 'like', $term)
                ->orWhere('employee_number', 'like', $term)
                ->limit(10)->get() as $row) {
                $results[] = [
                    'type' => 'Employee',
                    'label' => "{$row->first_name} {$row->last_name}",
                    'sublabel' => $row->position ?? $row->employee_number,
                    'url' => "/admin/hr/employees/{$row->id}",
                    'icon' => 'Users',
                ];
            }
        }

        // ── Users ────────────────────────────────────────────────────
        if (Schema::hasTable('users')) {
            foreach (DB::table('users')
                ->where('name', 'like', $term)
                ->orWhere('email', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'User',
                    'label' => $row->name,
                    'sublabel' => $row->email,
                    'url' => null,
                    'icon' => 'UserCircle',
                ];
            }
        }

        // ── Programs ────────────────────────────────────────────────
        if (Schema::hasTable('cur_programs')) {
            foreach (DB::table('cur_programs')
                ->where('name', 'like', $term)
                ->orWhere('code', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Program',
                    'label' => "{$row->code} — {$row->name}",
                    'sublabel' => $row->years . ' years',
                    'url' => "/admin/curricula/programs/{$row->id}",
                    'icon' => 'BookOpen',
                ];
            }
        }

        // ── Courses ──────────────────────────────────────────────────
        if (Schema::hasTable('cur_courses')) {
            foreach (DB::table('cur_courses')
                ->where('name', 'like', $term)
                ->orWhere('code', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Course',
                    'label' => "{$row->code} — {$row->name}",
                    'sublabel' => $row->units . ' units',
                    'url' => "/admin/curricula/courses/{$row->id}",
                    'icon' => 'BookOpen',
                ];
            }
        }

        // ── Library Books ────────────────────────────────────────────
        if (Schema::hasTable('books')) {
            foreach (DB::table('books')
                ->where('title', 'like', $term)
                ->orWhere('author', 'like', $term)
                ->orWhere('isbn', 'like', $term)
                ->limit(10)->get() as $row) {
                $results[] = [
                    'type' => 'Book',
                    'label' => $row->title,
                    'sublabel' => $row->author,
                    'url' => "/admin/library/books/{$row->id}",
                    'icon' => 'BookOpen',
                ];
            }
        }

        // ── Facilities ───────────────────────────────────────────────
        if (Schema::hasTable('fac_facilities')) {
            foreach (DB::table('fac_facilities')
                ->where('name', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Facility',
                    'label' => $row->name,
                    'sublabel' => ucfirst(str_replace('_', ' ', $row->type)),
                    'url' => "/admin/facilities/facilities/{$row->id}",
                    'icon' => 'Building2',
                ];
            }
        }

        // ── Equipment ────────────────────────────────────────────────
        if (Schema::hasTable('fac_equipment')) {
            foreach (DB::table('fac_equipment')
                ->where('name', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Equipment',
                    'label' => $row->name,
                    'sublabel' => "Qty: {$row->quantity}",
                    'url' => "/admin/facilities/equipment/{$row->id}",
                    'icon' => 'Wrench',
                ];
            }
        }

        // ── Dormitory Halls ──────────────────────────────────────────
        if (Schema::hasTable('drm_halls')) {
            foreach (DB::table('drm_halls')
                ->where('name', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Dorm Hall',
                    'label' => $row->name,
                    'sublabel' => ucfirst($row->gender) . ' · ' . $row->total_floors . ' floors',
                    'url' => "/admin/dormitory/halls/{$row->id}",
                    'icon' => 'Building2',
                ];
            }
        }

        // ── Helpdesk Tickets ─────────────────────────────────────────
        if (Schema::hasTable('hlp_tickets')) {
            foreach (DB::table('hlp_tickets')
                ->where('title', 'like', $term)
                ->orWhere('description', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Ticket',
                    'label' => $row->title,
                    'sublabel' => ucfirst($row->status) . ' · ' . ucfirst($row->priority),
                    'url' => "/admin/helpdesk/tickets/{$row->id}",
                    'icon' => 'Ticket',
                ];
            }
        }

        // ── Discipline Incidents ─────────────────────────────────────
        if (Schema::hasTable('dsc_incidents')) {
            foreach (DB::table('dsc_incidents')
                ->where('description', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Incident',
                    'label' => mb_substr($row->description, 0, 60),
                    'sublabel' => ucfirst($row->status),
                    'url' => "/admin/discipline/incidents/{$row->id}",
                    'icon' => 'AlertTriangle',
                ];
            }
        }

        // ── Events ───────────────────────────────────────────────────
        if (Schema::hasTable('sch_events')) {
            foreach (DB::table('sch_events')
                ->where('title', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Event',
                    'label' => $row->title,
                    'sublabel' => $row->start_date,
                    'url' => "/admin/scheduling/events/{$row->id}",
                    'icon' => 'Calendar',
                ];
            }
        }

        // ── Research Proposals ───────────────────────────────────────
        if (Schema::hasTable('res_proposals')) {
            foreach (DB::table('res_proposals')
                ->where('title', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Research',
                    'label' => $row->title,
                    'sublabel' => ucfirst($row->status),
                    'url' => "/admin/research/proposals/{$row->id}",
                    'icon' => 'FlaskConical',
                ];
            }
        }

        // ── USG Resolutions ──────────────────────────────────────────
        if (Schema::hasTable('resolutions')) {
            foreach (DB::table('resolutions')
                ->where('title', 'like', $term)
                ->orWhere('resolution_number', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Resolution',
                    'label' => $row->title,
                    'sublabel' => $row->resolution_number,
                    'url' => "/admin/usg/resolutions/{$row->id}",
                    'icon' => 'FileText',
                ];
            }
        }

        // ── USG Announcements ────────────────────────────────────────
        if (Schema::hasTable('announcements')) {
            foreach (DB::table('announcements')
                ->where('title', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Announcement',
                    'label' => $row->title,
                    'sublabel' => ucfirst($row->status),
                    'url' => "/admin/usg/announcements/{$row->id}",
                    'icon' => 'Megaphone',
                ];
            }
        }

        // ── Officers ─────────────────────────────────────────────────
        if (Schema::hasTable('officers')) {
            foreach (DB::table('officers')
                ->where('name', 'like', $term)
                ->orWhere('position', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Officer',
                    'label' => $row->name,
                    'sublabel' => $row->position,
                    'url' => "/admin/usg/officers/{$row->id}",
                    'icon' => 'UserCheck',
                ];
            }
        }

        // ── Elections ────────────────────────────────────────────────
        if (Schema::hasTable('elections')) {
            foreach (DB::table('elections')
                ->where('title', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Election',
                    'label' => $row->title,
                    'sublabel' => ucfirst($row->status),
                    'url' => "/admin/voting/elections/{$row->id}",
                    'icon' => 'Vote',
                ];
            }
        }

        // ── Alumni ───────────────────────────────────────────────────
        if (Schema::hasTable('alm_alumni')) {
            foreach (DB::table('alm_alumni')
                ->where('first_name', 'like', $term)
                ->orWhere('last_name', 'like', $term)
                ->orWhere('email', 'like', $term)
                ->limit(5)->get() as $row) {
                $results[] = [
                    'type' => 'Alumni',
                    'label' => "{$row->first_name} {$row->last_name}",
                    'sublabel' => $row->email,
                    'url' => "/admin/alumni/alumni/{$row->id}",
                    'icon' => 'GraduationCap',
                ];
            }
        }

        // Limit total results
        return array_slice($results, 0, 30);
    }
}