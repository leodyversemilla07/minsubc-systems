<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\USG\Models\Event;

class EventSeeder extends Seeder
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

        $events = [
            [
                'title' => 'USG General Assembly',
                'description' => 'Quarterly general assembly for all students to discuss important matters and updates from the University Student Government.',
                'location' => 'University Auditorium',
                'start_date' => now()->addDays(5)->setTime(14, 0),
                'end_date' => now()->addDays(5)->setTime(17, 0),
                'all_day' => false,
                'category' => 'Assembly',
                'color' => '#3B82F6',
                'organizer' => 'USG Executive Board',
                'status' => 'published',
            ],
            [
                'title' => 'Mental Health Awareness Week',
                'description' => 'A week-long series of activities promoting mental health awareness, including seminars, workshops, and wellness activities.',
                'location' => 'Various Campus Locations',
                'start_date' => now()->addDays(15)->setTime(8, 0),
                'end_date' => now()->addDays(21)->setTime(17, 0),
                'all_day' => true,
                'category' => 'Welfare',
                'color' => '#10B981',
                'organizer' => 'USG Student Welfare Committee',
                'status' => 'published',
            ],
            [
                'title' => 'Intramural Sports Festival',
                'description' => 'Annual sports competition featuring various athletic events and games. All students are encouraged to participate and show their sportsmanship.',
                'location' => 'University Sports Complex',
                'start_date' => now()->addDays(30)->setTime(7, 0),
                'end_date' => now()->addDays(33)->setTime(18, 0),
                'all_day' => true,
                'category' => 'Sports',
                'color' => '#F59E0B',
                'organizer' => 'USG Sports Committee',
                'status' => 'published',
            ],
            [
                'title' => 'Leadership Training Seminar',
                'description' => 'An intensive seminar designed to develop leadership skills among student leaders and aspiring officers.',
                'location' => 'Conference Hall',
                'start_date' => now()->addDays(20)->setTime(9, 0),
                'end_date' => now()->addDays(20)->setTime(16, 0),
                'all_day' => false,
                'category' => 'Training',
                'color' => '#8B5CF6',
                'organizer' => 'USG Leadership Development',
                'status' => 'published',
            ],
            [
                'title' => 'Campus Clean-Up Drive',
                'description' => 'Monthly environmental activity to keep our campus clean and green. All students are welcome to volunteer.',
                'location' => 'University Campus Grounds',
                'start_date' => now()->addDays(7)->setTime(7, 0),
                'end_date' => now()->addDays(7)->setTime(11, 0),
                'all_day' => false,
                'category' => 'Environment',
                'color' => '#059669',
                'organizer' => 'USG Environmental Committee',
                'status' => 'published',
            ],
            [
                'title' => 'Cultural Night Celebration',
                'description' => 'A celebration showcasing the diverse cultures represented in our student body through performances, exhibits, and food.',
                'location' => 'Open Grounds',
                'start_date' => now()->addDays(45)->setTime(17, 0),
                'end_date' => now()->addDays(45)->setTime(21, 0),
                'all_day' => false,
                'category' => 'Cultural',
                'color' => '#EC4899',
                'organizer' => 'USG Cultural Affairs',
                'status' => 'draft',
            ],
        ];

        foreach ($events as $event) {
            $slug = Str::slug($event['title']).'-'.Str::random(6);

            Event::create([
                'title' => $event['title'],
                'slug' => $slug,
                'description' => $event['description'],
                'location' => $event['location'],
                'start_date' => $event['start_date'],
                'end_date' => $event['end_date'],
                'all_day' => $event['all_day'],
                'category' => $event['category'],
                'color' => $event['color'],
                'organizer' => $event['organizer'],
                'is_recurring' => false,
                'recurrence_rule' => null,
                'status' => $event['status'],
                'created_by' => $user->id,
                'created_at' => now()->subDays(rand(10, 30)),
                'updated_at' => now()->subDays(rand(1, 5)),
            ]);
        }
    }
}
