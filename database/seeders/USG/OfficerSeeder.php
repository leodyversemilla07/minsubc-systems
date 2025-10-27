<?php

namespace Database\Seeders\USG;

use App\Modules\USG\Models\Officer;
use Illuminate\Database\Seeder;

class OfficerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officers = [
            [
                'name' => 'Juan Dela Cruz',
                'position' => 'USG President',
                'department' => 'Executive',
                'email' => 'president@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6789',
                'bio' => 'Dedicated to serving the student body and promoting excellence in student governance.',
                'order' => 1,
            ],
            [
                'name' => 'Maria Santos',
                'position' => 'USG Vice President',
                'department' => 'Executive',
                'email' => 'vicepresident@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6790',
                'bio' => 'Committed to supporting student initiatives and fostering campus unity.',
                'order' => 2,
            ],
            [
                'name' => 'Pedro Reyes',
                'position' => 'Secretary General',
                'department' => 'Executive',
                'email' => 'secretary@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6791',
                'bio' => 'Ensuring efficient documentation and communication within the organization.',
                'order' => 3,
            ],
            [
                'name' => 'Ana Garcia',
                'position' => 'Treasurer',
                'department' => 'Finance',
                'email' => 'treasurer@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6792',
                'bio' => 'Managing financial resources with transparency and accountability.',
                'order' => 4,
            ],
            [
                'name' => 'Carlos Mendoza',
                'position' => 'Auditor',
                'department' => 'Finance',
                'email' => 'auditor@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6793',
                'bio' => 'Maintaining financial integrity through regular audits and reviews.',
                'order' => 5,
            ],
            [
                'name' => 'Sofia Torres',
                'position' => 'Academic Affairs Director',
                'department' => 'Academic Affairs',
                'email' => 'academic@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6794',
                'bio' => 'Championing academic excellence and student learning initiatives.',
                'order' => 6,
            ],
            [
                'name' => 'Miguel Rivera',
                'position' => 'Student Welfare Director',
                'department' => 'Student Welfare',
                'email' => 'welfare@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6795',
                'bio' => 'Advocating for student rights and well-being on campus.',
                'order' => 7,
            ],
            [
                'name' => 'Isabella Cruz',
                'position' => 'Public Relations Officer',
                'department' => 'Communications',
                'email' => 'pro@usg.minsubc.edu.ph',
                'phone' => '+63 912 345 6796',
                'bio' => 'Building strong relationships between USG and the student community.',
                'order' => 8,
            ],
        ];

        $termStart = now()->startOfYear();
        $termEnd = now()->endOfYear();

        foreach ($officers as $officerData) {
            Officer::create([
                'user_id' => null,
                'name' => $officerData['name'],
                'position' => $officerData['position'],
                'department' => $officerData['department'],
                'email' => $officerData['email'],
                'phone' => $officerData['phone'],
                'photo' => null,
                'bio' => $officerData['bio'],
                'term_start' => $termStart,
                'term_end' => $termEnd,
                'order' => $officerData['order'],
                'is_active' => true,
            ]);
        }
    }
}
