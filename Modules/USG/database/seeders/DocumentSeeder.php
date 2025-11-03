<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\USG\Models\Document;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@minsubc.edu.ph')->first()
            ?? User::first();

        if (! $user) {
            $this->command->warn('No users found. Please run UserSeeder first.');

            return;
        }

        $documents = [
            [
                'title' => 'USG Constitution and By-Laws',
                'description' => 'Official constitution and by-laws governing the University Student Government operations and elections.',
                'file_path' => '/documents/usg/constitution-bylaws.pdf',
                'file_name' => 'USG-Constitution-ByLaws-2025.pdf',
                'file_size' => 2457600,
                'mime_type' => 'application/pdf',
                'category' => 'Governance',
                'is_public' => true,
                'download_count' => 342,
            ],
            [
                'title' => 'Student Handbook 2025',
                'description' => 'Comprehensive handbook containing policies, procedures, and guidelines for students.',
                'file_path' => '/documents/usg/student-handbook-2025.pdf',
                'file_name' => 'Student-Handbook-2025.pdf',
                'file_size' => 5242880,
                'mime_type' => 'application/pdf',
                'category' => 'Academic',
                'is_public' => true,
                'download_count' => 1256,
            ],
            [
                'title' => 'USG Budget Proposal FY 2025-2026',
                'description' => 'Detailed budget proposal for the fiscal year 2025-2026 including allocations for various programs and activities.',
                'file_path' => '/documents/usg/budget-proposal-2025-2026.pdf',
                'file_name' => 'Budget-Proposal-FY2025-2026.pdf',
                'file_size' => 1572864,
                'mime_type' => 'application/pdf',
                'category' => 'Finance',
                'is_public' => true,
                'download_count' => 198,
            ],
            [
                'title' => 'Election Guidelines and Procedures',
                'description' => 'Complete guidelines and procedures for student government elections including eligibility requirements and voting process.',
                'file_path' => '/documents/usg/election-guidelines.pdf',
                'file_name' => 'Election-Guidelines-2025.pdf',
                'file_size' => 1048576,
                'mime_type' => 'application/pdf',
                'category' => 'Elections',
                'is_public' => true,
                'download_count' => 567,
            ],
            [
                'title' => 'Student Grievance Procedure',
                'description' => 'Step-by-step procedure for filing and resolving student grievances and concerns.',
                'file_path' => '/documents/usg/grievance-procedure.pdf',
                'file_name' => 'Student-Grievance-Procedure.pdf',
                'file_size' => 786432,
                'mime_type' => 'application/pdf',
                'category' => 'Welfare',
                'is_public' => true,
                'download_count' => 423,
            ],
            [
                'title' => 'Campus Event Planning Guide',
                'description' => 'Guidelines and templates for organizing campus events and activities.',
                'file_path' => '/documents/usg/event-planning-guide.pdf',
                'file_name' => 'Event-Planning-Guide.pdf',
                'file_size' => 2097152,
                'mime_type' => 'application/pdf',
                'category' => 'Events',
                'is_public' => true,
                'download_count' => 289,
            ],
            [
                'title' => 'USG Meeting Minutes - March 2025',
                'description' => 'Official minutes from the USG executive board meeting held in March 2025.',
                'file_path' => '/documents/usg/meeting-minutes-march-2025.pdf',
                'file_name' => 'Meeting-Minutes-March-2025.pdf',
                'file_size' => 524288,
                'mime_type' => 'application/pdf',
                'category' => 'Minutes',
                'is_public' => false,
                'download_count' => 45,
            ],
        ];

        foreach ($documents as $documentData) {
            Document::create([
                'title' => $documentData['title'],
                'description' => $documentData['description'],
                'file_path' => $documentData['file_path'],
                'file_name' => $documentData['file_name'],
                'file_size' => $documentData['file_size'],
                'mime_type' => $documentData['mime_type'],
                'category' => $documentData['category'],
                'is_public' => $documentData['is_public'],
                'uploaded_by' => $user->id,
                'download_count' => $documentData['download_count'],
            ]);
        }
    }
}
