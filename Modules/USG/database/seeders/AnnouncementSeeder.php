<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\USG\Models\Announcement;

class AnnouncementSeeder extends Seeder
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

        $announcements = [
            [
                'title' => 'USG General Assembly - All Students Required to Attend',
                'content' => 'The University Student Government will hold its General Assembly this Friday, October 25, 2025, at 2:00 PM in the University Auditorium. All students are required to attend. This assembly will discuss important matters including upcoming events, budget allocation, and student concerns. Please mark your calendars and come prepared with questions and suggestions.',
                'category' => 'Assembly',
                'status' => 'published',
            ],
            [
                'title' => 'Free Tutorial Program for Mathematics and Sciences',
                'content' => 'The USG Academic Affairs Committee is launching a free tutorial program for students struggling with Mathematics and Science subjects. Sessions will be held every Tuesday and Thursday from 4:00 PM to 6:00 PM at the Learning Commons. Qualified student tutors will be available to help. Registration is now open at the USG Office.',
                'category' => 'Academic',
                'status' => 'published',
            ],
            [
                'title' => 'Mental Health Week: Know Your Worth Campaign',
                'content' => 'Join us for Mental Health Week from November 1-7, 2025! The USG Student Welfare Committee presents "Know Your Worth" - a series of activities including free counseling sessions, stress management workshops, art therapy, and inspirational talks. Let\'s break the stigma and prioritize mental wellness together. Check our Facebook page for the complete schedule.',
                'category' => 'Welfare',
                'status' => 'published',
            ],
            [
                'title' => 'Scholarship Application Period Extended',
                'content' => 'Good news! The deadline for USG Merit Scholarship applications has been extended to November 15, 2025. This scholarship program provides financial assistance to academically excellent students with financial need. Application forms are available at the USG Office. Don\'t miss this opportunity!',
                'category' => 'Scholarship',
                'status' => 'published',
            ],
            [
                'title' => 'Campus Clean-Up Drive This Saturday',
                'content' => 'Let\'s work together for a cleaner campus! The USG Environmental Committee invites all students to participate in our monthly clean-up drive this Saturday, October 26, from 7:00 AM to 11:00 AM. Cleaning materials will be provided. Volunteers will receive community service credits and free snacks. Meeting point: University Main Gate.',
                'category' => 'Environment',
                'status' => 'published',
            ],
            [
                'title' => 'Sports Fest 2025 Registration Now Open',
                'content' => 'Get ready for the most exciting event of the year! USG Sports Fest 2025 registration is now open. Compete in basketball, volleyball, badminton, chess, and more! Individual and team categories available. Registration deadline: November 30, 2025. Visit the USG Office or register online through our website.',
                'category' => 'Sports',
                'status' => 'draft',
            ],
        ];

        foreach ($announcements as $announcement) {
            $slug = Str::slug($announcement['title']).'-'.Str::random(6);
            $publishDate = $announcement['status'] === 'published' ? now()->subDays(rand(1, 15)) : null;

            Announcement::create([
                'title' => $announcement['title'],
                'slug' => $slug,
                'content' => $announcement['content'],
                'excerpt' => Str::limit($announcement['content'], 150),
                'category' => $announcement['category'],
                'featured_image' => null,
                'status' => $announcement['status'],
                'publish_date' => $publishDate,
                'expiry_date' => $publishDate?->addDays(30),
                'author_id' => $user->id,
                'views_count' => $announcement['status'] === 'published' ? rand(50, 500) : 0,
                'created_at' => now()->subDays(rand(20, 40)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ]);
        }
    }
}
