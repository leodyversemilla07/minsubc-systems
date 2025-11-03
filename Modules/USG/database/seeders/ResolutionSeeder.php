<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
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
                'description' => 'A resolution to establish a merit-based scholarship program for deserving students.',
                'category' => 'Academic',
                'status' => 'published',
            ],
            [
                'title' => 'Resolution on Campus Safety and Security Enhancement',
                'description' => 'A resolution calling for improved campus safety measures and security protocols.',
                'category' => 'Welfare',
                'status' => 'published',
            ],
            [
                'title' => 'Resolution Supporting Mental Health Services',
                'description' => 'A resolution advocating for expanded mental health support services for students.',
                'category' => 'Welfare',
                'status' => 'published',
            ],
            [
                'title' => 'Resolution on Sustainable Campus Initiatives',
                'description' => 'A resolution promoting environmental sustainability and green campus practices.',
                'category' => 'Environment',
                'status' => 'review',
            ],
            [
                'title' => 'Resolution Commending Outstanding Faculty Members',
                'description' => 'A resolution recognizing faculty members for their exceptional service to students.',
                'category' => 'Recognition',
                'status' => 'draft',
            ],
        ];

        foreach ($resolutions as $index => $resolution) {
            $resolutionNumber = 'USG-'.now()->year.'-'.str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $slug = Str::slug($resolution['title']);

            Resolution::create([
                'resolution_number' => $resolutionNumber,
                'title' => $resolution['title'],
                'description' => $resolution['description'],
                'content' => 'WHEREAS, the University Student Government recognizes the importance of this matter;

WHEREAS, there is a need to address the concerns of the student body;

WHEREAS, the USG is committed to serving the best interests of all students;

NOW, THEREFORE, BE IT RESOLVED that the University Student Government hereby:

1. Approves and supports this initiative;
2. Allocates necessary resources for implementation;
3. Establishes a monitoring committee to ensure proper execution;
4. Commits to transparent reporting of progress and outcomes.

RESOLVED FURTHER that this resolution shall take effect immediately upon approval.',
                'category' => $resolution['category'],
                'file_path' => null,
                'status' => $resolution['status'],
                'resolution_date' => $resolution['status'] === 'published' ? now()->subDays(rand(10, 60)) : null,
                'submitted_by' => $user->id,
                'approved_by' => $resolution['status'] === 'published' ? $user->id : null,
                'approved_at' => $resolution['status'] === 'published' ? now()->subDays(rand(5, 30)) : null,
                'published_at' => $resolution['status'] === 'published' ? now()->subDays(rand(1, 20)) : null,
                'created_at' => now()->subDays(rand(70, 100)),
                'updated_at' => now()->subDays(rand(1, 10)),
            ]);
        }
    }
}
