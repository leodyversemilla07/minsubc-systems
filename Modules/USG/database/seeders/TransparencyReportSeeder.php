<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\USG\Models\TransparencyReport;

class TransparencyReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get first user as the creator
        $creator = User::first();

        if (! $creator) {
            $this->command->error('No users found. Please run the UserSeeder first.');

            return;
        }

        $reports = [
            [
                'title' => 'Financial Report - First Quarter 2025',
                'slug' => 'financial-report-q1-2025',
                'description' => 'Comprehensive financial report covering the first quarter of 2025, including budget allocations, expenditures, and revenue from various USG activities and projects.',
                'type' => 'financial',
                'status' => 'published',
                'report_period_start' => '2025-01-01',
                'report_period_end' => '2025-03-31',
                'data' => [
                    'total_budget' => '₱50,000.00',
                    'total_expenditure' => '₱32,500.00',
                    'remaining_balance' => '₱17,500.00',
                    'major_expenses' => [
                        'Events and Activities' => '₱15,000.00',
                        'Office Supplies' => '₱5,500.00',
                        'Transportation' => '₱8,000.00',
                        'Miscellaneous' => '₱4,000.00',
                    ],
                    'revenue_sources' => [
                        'Student Activity Fee' => '₱45,000.00',
                        'Fundraising Events' => '₱5,000.00',
                    ],
                ],
                'created_by' => $creator->id,
                'published_at' => now()->subDays(10),
                'view_count' => 125,
                'download_count' => 89,
            ],
            [
                'title' => 'USG General Assembly Minutes - March 2025',
                'slug' => 'general-assembly-minutes-march-2025',
                'description' => 'Official minutes from the USG General Assembly held on March 15, 2025, covering discussions on budget proposals, upcoming events, and policy changes.',
                'type' => 'meeting_minutes',
                'status' => 'published',
                'report_period_start' => '2025-03-15',
                'report_period_end' => '2025-03-15',
                'data' => [
                    'meeting_date' => 'March 15, 2025',
                    'attendees' => 28,
                    'agenda_items' => [
                        'Budget Review and Approval',
                        'Intramural Sports Planning',
                        'Academic Excellence Program',
                        'Student Welfare Initiatives',
                    ],
                    'resolutions_passed' => 3,
                    'next_meeting' => 'April 12, 2025',
                ],
                'created_by' => $creator->id,
                'published_at' => now()->subDays(5),
                'view_count' => 78,
                'download_count' => 45,
            ],
            [
                'title' => 'Annual Budget Plan 2025-2026',
                'slug' => 'annual-budget-plan-2025-2026',
                'description' => 'Detailed annual budget plan for the academic year 2025-2026, outlining proposed allocations for various USG programs, projects, and operational expenses.',
                'type' => 'budget',
                'status' => 'published',
                'report_period_start' => '2025-06-01',
                'report_period_end' => '2026-05-31',
                'data' => [
                    'total_proposed_budget' => '₱200,000.00',
                    'budget_breakdown' => [
                        'Academic Programs' => '₱60,000.00',
                        'Student Activities' => '₱50,000.00',
                        'Sports and Recreation' => '₱30,000.00',
                        'Student Welfare' => '₱35,000.00',
                        'Operations and Administration' => '₱25,000.00',
                    ],
                    'new_initiatives' => [
                        'Mental Health Support Program',
                        'Student Leadership Development',
                        'Sustainability Projects',
                    ],
                ],
                'created_by' => $creator->id,
                'published_at' => now()->subDays(20),
                'view_count' => 156,
                'download_count' => 112,
            ],
            [
                'title' => 'Student Activity Fund Expenditure Report',
                'slug' => 'student-activity-fund-expenditure-2024',
                'description' => 'Detailed breakdown of how student activity funds were utilized throughout 2024, including major events, programs, and administrative expenses.',
                'type' => 'expenditure',
                'status' => 'published',
                'report_period_start' => '2024-01-01',
                'report_period_end' => '2024-12-31',
                'data' => [
                    'total_funds_received' => '₱180,000.00',
                    'total_expenditure' => '₱175,500.00',
                    'surplus' => '₱4,500.00',
                    'major_events_funded' => [
                        'Orientation Week 2024' => '₱25,000.00',
                        'Intramural Sports Tournament' => '₱35,000.00',
                        'Cultural Festival' => '₱20,000.00',
                        'Academic Recognition Program' => '₱15,000.00',
                    ],
                    'program_expenses' => [
                        'Student Leadership Training' => '₱18,000.00',
                        'Mental Health Awareness Campaign' => '₱12,000.00',
                        'Environmental Conservation Program' => '₱8,500.00',
                    ],
                ],
                'created_by' => $creator->id,
                'published_at' => now()->subDays(35),
                'view_count' => 203,
                'download_count' => 167,
            ],
            [
                'title' => 'USG Performance Report 2024',
                'slug' => 'usg-performance-annual-report-2024',
                'description' => 'Comprehensive annual report showcasing USG accomplishments, challenges, and impact on student life throughout the 2024 academic year.',
                'type' => 'annual',
                'status' => 'published',
                'report_period_start' => '2024-06-01',
                'report_period_end' => '2025-05-31',
                'data' => [
                    'students_served' => 2450,
                    'events_organized' => 24,
                    'programs_implemented' => 8,
                    'resolutions_passed' => 15,
                    'key_achievements' => [
                        'Established Student Mental Health Support Center',
                        'Launched Scholarship Assistance Program',
                        'Implemented Campus Sustainability Initiative',
                        'Enhanced Student Grievance System',
                    ],
                    'student_satisfaction_rating' => '4.2/5.0',
                    'challenges_addressed' => [
                        'Improved campus Wi-Fi infrastructure',
                        'Enhanced library facilities',
                        'Expanded cafeteria options',
                    ],
                ],
                'created_by' => $creator->id,
                'published_at' => now()->subDays(15),
                'view_count' => 298,
                'download_count' => 234,
            ],
        ];

        foreach ($reports as $reportData) {
            TransparencyReport::create($reportData);
        }
    }
}
