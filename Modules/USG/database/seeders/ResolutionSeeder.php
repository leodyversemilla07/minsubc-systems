<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\USG\Models\Resolution;

class ResolutionSeeder extends Seeder
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

        $resolutions = [
            [
                'title' => 'Resolution Establishing the Student Scholarship Program',
                'description' => 'A resolution to establish a merit-based scholarship program for deserving students of Mindoro State University at Bongabong Campus.',
                'category' => 'Academic',
                'status' => 'published',
                'date_passed' => now()->subDays(45),
            ],
            [
                'title' => 'Resolution on Campus Safety and Security Enhancement',
                'description' => 'A resolution calling for improved campus safety measures and security protocols to ensure student welfare.',
                'category' => 'Welfare',
                'status' => 'published',
                'date_passed' => now()->subDays(60),
            ],
            [
                'title' => 'Resolution Supporting Mental Health Services',
                'description' => 'A resolution advocating for expanded mental health support services and counseling programs for students.',
                'category' => 'Welfare',
                'status' => 'published',
                'date_passed' => now()->subDays(30),
            ],
            [
                'title' => 'Resolution on Sustainable Campus Initiatives',
                'description' => 'A resolution promoting environmental sustainability, waste reduction, and green campus practices.',
                'category' => 'Environment',
                'status' => 'published',
                'date_passed' => now()->subDays(20),
            ],
            [
                'title' => 'Resolution Commending Outstanding Faculty Members',
                'description' => 'A resolution recognizing and commending faculty members for their exceptional service and dedication to students.',
                'category' => 'Recognition',
                'status' => 'published',
                'date_passed' => now()->subDays(15),
            ],
            [
                'title' => 'Resolution on Student Activity Fee Allocation',
                'description' => 'A resolution approving the allocation and disbursement of student activity fees for the current academic year.',
                'category' => 'Budget',
                'status' => 'published',
                'date_passed' => now()->subDays(90),
            ],
            [
                'title' => 'Resolution Supporting Student Organization Accreditation',
                'description' => 'A resolution establishing guidelines and procedures for student organization recognition and accreditation.',
                'category' => 'Governance',
                'status' => 'published',
                'date_passed' => now()->subDays(75),
            ],
            [
                'title' => 'Resolution on Library Services Enhancement',
                'description' => 'A resolution calling for extended library hours and improved digital resource access for students.',
                'category' => 'Academic',
                'status' => 'published',
                'date_passed' => now()->subDays(50),
            ],
        ];

        foreach ($resolutions as $index => $resolution) {
            $resolutionNumber = 'USG-'.now()->year.'-'.str_pad($index + 1, 3, '0', STR_PAD_LEFT);

            Resolution::create([
                'resolution_number' => $resolutionNumber,
                'title' => $resolution['title'],
                'description' => $resolution['description'],
                'content' => $resolution['description'], // Content is same as description for approved resolutions
                'category' => $resolution['category'],
                'file_path' => null, // In production, this would contain the PDF file path
                'status' => $resolution['status'],
                'resolution_date' => $resolution['date_passed'],
                'submitted_by' => $user->id,
                'approved_by' => $resolution['status'] === 'published' ? $user->id : null,
                'approved_at' => $resolution['status'] === 'published' ? $resolution['date_passed'] : null,
                'published_at' => $resolution['status'] === 'published' ? $resolution['date_passed'] : null,
                'created_at' => $resolution['date_passed']->subDays(rand(1, 5)),
                'updated_at' => $resolution['date_passed'],
            ]);
        }
    }
}
