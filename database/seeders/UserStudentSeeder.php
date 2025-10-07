<?php

namespace Database\Seeders;

use App\Models\User;
use App\Modules\Registrar\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample users for different roles based on RBAC system
        $users = [
            // Students
            [
                'first_name' => 'John',
                'middle_name' => 'Michael',
                'last_name' => 'Doe',
                'email' => 'john.doe@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'student',
                'student_data' => [
                    'student_id' => 'MBC2025-0001',
                    'phone' => '+63 912 345 6789',
                    'course' => 'Bachelor of Science in Computer Science',
                    'year_level' => 3,
                    'campus' => 'Bongabong Campus',
                    'status' => 'active',
                ],
            ],
            [
                'first_name' => 'Jane',
                'middle_name' => null,
                'last_name' => 'Smith',
                'email' => 'jane.smith@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'student',
                'student_data' => [
                    'student_id' => 'MBC2025-0002',
                    'phone' => '+63 923 456 7890',
                    'course' => 'Bachelor of Science in Information Technology',
                    'year_level' => 2,
                    'campus' => 'Bongabong Campus',
                    'status' => 'active',
                ],
            ],
            [
                'first_name' => 'Maria',
                'middle_name' => 'Santos',
                'last_name' => 'Garcia',
                'email' => 'maria.garcia@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'student',
                'student_data' => [
                    'student_id' => 'MBC2025-0003',
                    'phone' => '+63 934 567 8901',
                    'course' => 'Bachelor of Science in Business Administration',
                    'year_level' => 4,
                    'campus' => 'Bongabong Campus',
                    'status' => 'active',
                ],
            ],
            [
                'first_name' => 'Carlos',
                'middle_name' => 'Reyes',
                'last_name' => 'Rodriguez',
                'email' => 'carlos.rodriguez@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'student',
                'student_data' => [
                    'student_id' => 'MBC2025-0004',
                    'phone' => '+63 945 678 9012',
                    'course' => 'Bachelor of Science in Accountancy',
                    'year_level' => 1,
                    'campus' => 'Bongabong Campus',
                    'status' => 'active',
                ],
            ],
            [
                'first_name' => 'Anna',
                'middle_name' => null,
                'last_name' => 'Johnson',
                'email' => 'anna.johnson@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'student',
                'student_data' => [
                    'student_id' => 'MBC2025-0005',
                    'phone' => '+63 956 789 0123',
                    'course' => 'Bachelor of Science in Nursing',
                    'year_level' => 3,
                    'campus' => 'Bongabong Campus',
                    'status' => 'active',
                ],
            ],

            // Cashier
            [
                'first_name' => 'Elena',
                'middle_name' => 'Cruz',
                'last_name' => 'Martinez',
                'email' => 'elena.martinez@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'cashier',
            ],

            // Registrar Staff
            [
                'first_name' => 'Roberto',
                'middle_name' => 'Diaz',
                'last_name' => 'Santiago',
                'email' => 'roberto.santiago@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-staff',
            ],
            [
                'first_name' => 'Patricia',
                'middle_name' => 'Luna',
                'last_name' => 'Fernandez',
                'email' => 'patricia.fernandez@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-staff',
            ],

            // Registrar Admin
            [
                'first_name' => 'Miguel',
                'middle_name' => 'Antonio',
                'last_name' => 'Torres',
                'email' => 'miguel.torres@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-admin',
            ],

            // System Admin
            [
                'first_name' => 'Administrator',
                'middle_name' => null,
                'last_name' => 'System',
                'email' => 'admin@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'system-admin',
            ],
        ];

        foreach ($users as $userData) {
            $role = $userData['role'];
            $studentData = $userData['student_data'] ?? null;
            unset($userData['role'], $userData['student_data']);

            // Create or update user
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Assign role to user
            if (!$user->hasRole($role)) {
                $user->assignRole($role);
            }

            // Create student record if this is a student
            if ($role === 'student' && $studentData) {
                Student::firstOrCreate(
                    ['student_id' => $studentData['student_id']],
                    array_merge($studentData, ['user_id' => $user->id])
                );
            }
        }

        // Create additional random students using factories
        User::factory(15)->create()->each(function ($user) {
            $user->assignRole('student');
            Student::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
