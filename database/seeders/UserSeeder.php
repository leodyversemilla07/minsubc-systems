<?php

namespace Database\Seeders;

use App\Models\User;
use App\Modules\Registrar\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure required roles exist
        $requiredRoles = ['student', 'cashier', 'registrar-staff', 'registrar-admin', 'usg-admin', 'super_admin'];

        foreach ($requiredRoles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                $this->command->error("The {$roleName} role does not exist. Please run RolesAndPermissionsSeeder first.");

                return;
            }
        }

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

            // USG Admin
            [
                'first_name' => 'USG',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'email' => 'usg-admin@minsu.edu.ph',
                'password' => Hash::make('USGAdmin@2024'),
                'email_verified_at' => now(),
                'role' => 'usg-admin',
            ],

            // Super Admin
            [
                'first_name' => 'Super',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'email' => 'superadmin@minsu.edu.ph',
                'password' => Hash::make('SuperAdmin@2024'),
                'email_verified_at' => now(),
                'role' => 'super_admin',
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
            if (! $user->hasRole($role)) {
                $user->assignRole($role);
            }

            // Create student record if this is a student
            if ($role === 'student' && $studentData) {
                if (! Student::where('student_id', $studentData['student_id'])->exists()) {
                    Student::create(array_merge($studentData, ['user_id' => $user->id]));
                }
            }
        }

        // Create additional random students using factories
        User::factory(15)->create()->each(function ($user) {
            $user->assignRole('student');

            // Generate a unique student ID that doesn't conflict with predefined ones
            $studentId = 'MBC2025-'.str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
            while (Student::where('student_id', $studentId)->exists()) {
                $studentId = 'MBC2025-'.str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
            }

            Student::create([
                'user_id' => $user->id,
                'student_id' => $studentId,
                'phone' => fake()->phoneNumber(),
                'course' => fake()->randomElement([
                    'Bachelor of Science in Computer Science',
                    'Bachelor of Science in Information Technology',
                    'Bachelor of Science in Business Administration',
                    'Bachelor of Science in Accountancy',
                    'Bachelor of Science in Nursing',
                    'Bachelor of Arts in Communication',
                    'Bachelor of Science in Engineering',
                    'Bachelor of Science in Education',
                ]),
                'year_level' => fake()->numberBetween(1, 4),
                'campus' => 'Bongabong Campus',
                'status' => fake()->randomElement(['active', 'inactive', 'graduated']),
            ]);
        });
    }
}
