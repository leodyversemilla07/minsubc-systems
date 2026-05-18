<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DemoSeeder extends Seeder
{

    public function run(): void
    {
        $this->command->info('🌱 Seeding demo data for all 19 modules...');

        // ── 1. CORE USERS & ROLES ──────────────────────────────────
        $this->seedUsers();

        // ── 2. ACADEMIC ────────────────────────────────────────────
        $this->seedAcademicTerms();
        $this->seedPrograms();
        $this->seedCourses();
        $this->seedStudents();
        $this->seedSections();
        $this->seedAdmissionSubjects();
        $this->seedSchedules();

        // ── 3. ENROLLMENT ──────────────────────────────────────────
        $this->seedApplicants();
        $this->seedEnrollments();

        // ── 4. FINANCIAL ───────────────────────────────────────────
        $this->seedAccounting();

        // ── 5. OPERATIONS ──────────────────────────────────────────
        $this->seedHR();
        $this->seedLibrary();
        $this->seedFacilities();
        $this->seedDormitory();

        // ── 6. STUDENT SERVICES ────────────────────────────────────
        $this->seedGuidance();
        $this->seedDiscipline();
        $this->seedClinic();
        $this->seedCurriculum();
        $this->seedResearch();
        $this->seedAlumni();

        // ── 7. GOVERNANCE ──────────────────────────────────────────
        $this->seedUSG();
        $this->seedScheduling();
        $this->seedVoting();

        // ── 8. SUPPORT ─────────────────────────────────────────────
        $this->seedHelpdesk();

        // ── 9. NOTIFICATIONS ───────────────────────────────────────
        $this->seedNotifications();

        $this->command->info('✅ Demo seeding complete!');
    }

    // ═══════════════════════════════════════════════════════════════
    // 1. CORE USERS
    // ═══════════════════════════════════════════════════════════════

    private function seedUsers(): void
    {
        $makeUser = function ($firstName, $lastName, $email, $role) {
            $user = User::factory()->create([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'password' => Hash::make('password'),
            ]);
            $user->assignRole($role);
            return $user;
        };

        // Super Admin
        $makeUser('System', 'Admin', 'admin@minsubc.edu.ph', 'super-admin');

        // Registrar
        $makeUser('Maria', 'Santos', 'registrar@minsubc.edu.ph', 'registrar-admin');
        $makeUser('Juan', 'Cruz', 'registrar.staff@minsubc.edu.ph', 'registrar-staff');
        $makeUser('Ana', 'Reyes', 'cashier@minsubc.edu.ph', 'cashier');

        // Admission
        $makeUser('Pedro', 'Lim', 'admission@minsubc.edu.ph', 'registrar-staff');

        // Library
        $makeUser('Luzviminda', 'Gomez', 'library@minsubc.edu.ph', 'library-admin');
        $makeUser('Roberto', 'Tan', 'library.staff@minsubc.edu.ph', 'library-staff');

        // HR
        $makeUser('Cynthia', 'Flores', 'hr@minsubc.edu.ph', 'hr-admin');
        $makeUser('Mark', 'Villanueva', 'hr.staff@minsubc.edu.ph', 'hr-staff');

        // Accounting
        $makeUser('Diana', 'Mercado', 'accounting@minsubc.edu.ph', 'accounting-admin');

        // Guidance
        $makeUser('Teresa', 'Aquino', 'guidance@minsubc.edu.ph', 'guidance-admin');
        $makeUser('Kevin', 'Dela Cruz', 'counselor@minsubc.edu.ph', 'guidance-counselor');

        // Discipline
        $makeUser('Ricardo', 'Santos', 'discipline@minsubc.edu.ph', 'discipline-admin');
        $makeUser('Maria', 'Rivera', 'discipline.staff@minsubc.edu.ph', 'discipline-staff');

        // Helpdesk
        $makeUser('Paolo', 'Garcia', 'helpdesk@minsubc.edu.ph', 'helpdesk-admin');
        $makeUser('Jenny', 'Morales', 'tech@minsubc.edu.ph', 'helpdesk-technician');

        // Dormitory
        $makeUser('Ramon', 'Castillo', 'dormitory@minsubc.edu.ph', 'dormitory-admin');
        $makeUser('Grace', 'Villar', 'warden@minsubc.edu.ph', 'dormitory-warden');

        // SAS
        $makeUser('Angela', 'Bautista', 'sas@minsubc.edu.ph', 'sas-admin');
        $makeUser('Michael', 'Sy', 'sas.staff@minsubc.edu.ph', 'sas-staff');

        // USG
        $makeUser('Kyle', 'Fernandez', 'usg@minsubc.edu.ph', 'usg-admin');
        $makeUser('Sarah', 'Lopez', 'usg.officer@minsubc.edu.ph', 'usg-officer');

        // Voting
        $makeUser('Reyes', 'Commissioner', 'voting@minsubc.edu.ph', 'voting-admin');

        // Clinic
        $makeUser('Jose', 'Rizal Jr.', 'clinic@minsubc.edu.ph', 'clinic-admin');

        // Curriculum
        $makeUser('Olivia', 'Pascual', 'curriculum@minsubc.edu.ph', 'curriculum-admin');

        // Research
        $makeUser('Gregorio', 'Santiago', 'research@minsubc.edu.ph', 'research-admin');

        // Facilities
        $makeUser('Danilo', 'Reyes', 'facilities@minsubc.edu.ph', 'facilities-admin');

        // Scheduling
        $makeUser('Martha', 'Gonzales', 'scheduling@minsubc.edu.ph', 'scheduling-admin');

        // Alumni
        $makeUser('Bianca', 'Navarro', 'alumni@minsubc.edu.ph', 'alumni-admin');

        $this->command->info('  ✓ Users & roles');
    }
    // 2. ACADEMIC
    // ═══════════════════════════════════════════════════════════════

    private function seedAcademicTerms(): void
    {
        if (!Schema::hasTable('academic_terms')) return;

        $terms = ['1st Semester', '2nd Semester', 'Summer'];
        for ($sy = 2024; $sy <= 2026; $sy++) {
            foreach ($terms as $i => $term) {
                DB::table('academic_terms')->insert([
                    'name' => "AY {$sy}-" . ($sy + 1) . " - {$term}",
                    'school_year' => "{$sy}-" . ($sy + 1),
                    'semester' => $i + 1,
                    'start_date' => $i === 0 ? "{$sy}-08-01" : ($i === 1 ? ($sy+1) . "-01-01" : ($sy+1) . "-06-01"),
                    'end_date' => $i === 0 ? "{$sy}-12-20" : ($i === 1 ? ($sy+1) . "-05-15" : ($sy+1) . "-07-31"),
                    'is_active' => ($sy === 2025 && $i === 0),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        $this->command->info('  ✓ Academic terms');
    }

    private function seedPrograms(): void
    {
        if (!Schema::hasTable('cur_programs')) return;

        $programs = [
            ['code' => 'BSIT', 'name' => 'Bachelor of Science in Information Technology', 'years' => 4],
            ['code' => 'BSCS', 'name' => 'Bachelor of Science in Computer Science', 'years' => 4],
            ['code' => 'BSBA', 'name' => 'Bachelor of Science in Business Administration', 'years' => 4],
            ['code' => 'BSED', 'name' => 'Bachelor of Secondary Education', 'years' => 4],
            ['code' => 'BSCE', 'name' => 'Bachelor of Science in Civil Engineering', 'years' => 5],
            ['code' => 'BSN', 'name' => 'Bachelor of Science in Nursing', 'years' => 4],
            ['code' => 'BSA', 'name' => 'Bachelor of Science in Accountancy', 'years' => 4],
            ['code' => 'BSCRIM', 'name' => 'Bachelor of Science in Criminology', 'years' => 4],
        ];
        foreach ($programs as $p) {
            DB::table('cur_programs')->insert([
                'code' => $p['code'],
                'name' => $p['name'],
                'description' => "{$p['name']} program",
                'years' => $p['years'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Programs');
    }

    private function seedCourses(): void
    {
        if (!Schema::hasTable('cur_courses')) return;

        $courses = [
            ['code' => 'IT101', 'name' => 'Introduction to Computing', 'units' => 3],
            ['code' => 'IT102', 'name' => 'Programming Fundamentals', 'units' => 3],
            ['code' => 'IT103', 'name' => 'Data Structures & Algorithms', 'units' => 3],
            ['code' => 'IT104', 'name' => 'Database Management Systems', 'units' => 3],
            ['code' => 'IT105', 'name' => 'Web Development', 'units' => 3],
            ['code' => 'CS101', 'name' => 'Discrete Mathematics', 'units' => 3],
            ['code' => 'CS102', 'name' => 'Computer Architecture', 'units' => 3],
            ['code' => 'BA101', 'name' => 'Principles of Management', 'units' => 3],
            ['code' => 'BA102', 'name' => 'Business Ethics', 'units' => 3],
            ['code' => 'ED101', 'name' => 'Foundations of Education', 'units' => 3],
            ['code' => 'ED102', 'name' => 'Educational Psychology', 'units' => 3],
            ['code' => 'NURS101', 'name' => 'Fundamentals of Nursing', 'units' => 5],
            ['code' => 'NURS102', 'name' => 'Anatomy & Physiology', 'units' => 4],
            ['code' => 'GEC101', 'name' => 'Purposive Communication', 'units' => 3],
            ['code' => 'GEC102', 'name' => 'Mathematics in Modern World', 'units' => 3],
            ['code' => 'GEC103', 'name' => 'Understanding the Self', 'units' => 3],
            ['code' => 'GEC104', 'name' => 'The Contemporary World', 'units' => 3],
            ['code' => 'GEC105', 'name' => 'Art Appreciation', 'units' => 3],
            ['code' => 'PE101', 'name' => 'Physical Fitness', 'units' => 2],
            ['code' => 'PE102', 'name' => 'Rhythmic Activities', 'units' => 2],
        ];
        foreach ($courses as $c) {
            DB::table('cur_courses')->insert([
                'code' => $c['code'],
                'name' => $c['name'],
                'units' => $c['units'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Courses');
    }

    private function seedStudents(): void
    {
        if (!Schema::hasTable('students')) return;

        $firstNames = ['Juan', 'Maria', 'Jose', 'Ana', 'Pedro', 'Rosa', 'Carlos', 'Elena', 'Miguel', 'Sofia',
                        'Antonio', 'Carmen', 'Francisco', 'Isabella', 'Ramon', 'Luz', 'Manuel', 'Gloria', 'Jorge', 'Teresa'];
        $lastNames = ['Dela Cruz', 'Santos', 'Reyes', 'Bautista', 'Garcia', 'Mendoza', 'Flores', 'Gonzales',
                       'Villanueva', 'Navarro', 'Lopez', 'Fernandez', 'Aquino', 'Castillo', 'Mercado', 'Rivera',
                       'Gomez', 'Cruz', 'Tan', 'Lim'];

        $yearLevels = [1, 1, 1, 2, 2, 2, 3, 3, 4, 4];
        $programIds = Schema::hasTable('cur_programs')
            ? DB::table('cur_programs')->pluck('id')->toArray()
            : [1, 2, 3];

        $students = [];
        for ($i = 1; $i <= 100; $i++) {
            $fn = $firstNames[array_rand($firstNames)];
            $ln = $lastNames[array_rand($lastNames)];
            $studentId = sprintf('%09d', 202400000 + $i);
            $yearLevel = $yearLevels[array_rand($yearLevels)];
            $programId = $programIds[array_rand($programIds)];

            $students[] = [
                'student_id' => $studentId,
                'first_name' => $fn,
                'last_name' => $ln,
                'middle_name' => rand(0, 1) ? 'D.' : null,
                'email' => strtolower($fn . '.' . $ln . $i . '@students.minsubc.edu.ph'),
                'year_level' => $yearLevel,
                'program_id' => $programId,
                'status' => 'active',
                'created_at' => now()->subDays(rand(30, 365)),
                'updated_at' => now()->subDays(rand(0, 30)),
            ];
        }
        DB::table('students')->insert($students);
        $this->command->info('  ✓ 100 students');
    }

    private function seedSections(): void
    {
        if (!Schema::hasTable('admission_sections')) return;

        $programs = DB::table('cur_programs')->get();
        foreach ($programs as $prog) {
            for ($year = 1; $year <= 4; $year++) {
                foreach (['A', 'B'] as $section) {
                    DB::table('admission_sections')->insert([
                        'name' => "{$prog->code}-{$year}{$section}",
                        'program_id' => $prog->id,
                        'year_level' => $year,
                        'max_students' => 40,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
        $this->command->info('  ✓ Sections');
    }

    private function seedAdmissionSubjects(): void
    {
        if (!Schema::hasTable('admission_subjects')) return;
        // Use curriculum courses as admission subjects
        if (Schema::hasTable('cur_courses')) {
            $courses = DB::table('cur_courses')->get();
            foreach ($courses as $course) {
                DB::table('admission_subjects')->insert([
                    'code' => $course->code,
                    'name' => $course->name,
                    'units' => $course->units,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        $this->command->info('  ✓ Admission subjects');
    }

    private function seedSchedules(): void
    {
        if (!Schema::hasTable('admission_schedules')) return;

        $sections = DB::table('admission_sections')->get();
        $subjects = DB::table('admission_subjects')->get();
        $days = ['M/W/F', 'T/Th', 'M/W', 'W/F', 'M/F'];
        $times = [
            ['start' => '07:30', 'end' => '09:00'],
            ['start' => '09:00', 'end' => '10:30'],
            ['start' => '10:30', 'end' => '12:00'],
            ['start' => '13:00', 'end' => '14:30'],
            ['start' => '14:30', 'end' => '16:00'],
        ];

        foreach ($sections->take(20) as $section) {
            $count = rand(4, 6);
            for ($i = 0; $i < $count; $i++) {
                $subject = $subjects->random();
                $time = $times[array_rand($times)];
                $day = $days[array_rand($days)];
                DB::table('admission_schedules')->insert([
                    'section_id' => $section->id,
                    'subject_id' => $subject->id,
                    'day' => $day,
                    'time_start' => $time['start'],
                    'time_end' => $time['end'],
                    'room' => 'RM-' . str_pad((string)rand(101, 320), 3, '0', STR_PAD_LEFT),
                    'instructor' => fake()->name(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        $this->command->info('  ✓ Schedules');
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. ENROLLMENT
    // ═══════════════════════════════════════════════════════════════

    private function seedApplicants(): void
    {
        if (!Schema::hasTable('admission_applicants')) return;

        $students = DB::table('students')->take(50)->get();
        $programs = DB::table('cur_programs')->get();
        $statuses = ['pending', 'approved', 'rejected', 'enrolled'];

        foreach ($students as $student) {
            DB::table('admission_applicants')->insert([
                'student_id' => $student->student_id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'email' => $student->email,
                'program_id' => $programs->random()->id,
                'status' => $statuses[array_rand($statuses)],
                'created_at' => $student->created_at,
                'updated_at' => $student->updated_at,
            ]);
        }
        $this->command->info('  ✓ Applicants');
    }

    private function seedEnrollments(): void
    {
        if (!Schema::hasTable('admission_enrollments')) return;

        $students = DB::table('students')->take(60)->get();
        $sections = DB::table('admission_sections')->get();
        $statuses = ['enrolled', 'enrolled', 'enrolled', 'pending', 'dropped'];

        foreach ($students as $student) {
            DB::table('admission_enrollments')->insert([
                'student_id' => $student->student_id,
                'section_id' => $sections->random()->id,
                'school_year' => '2025-2026',
                'semester' => 1,
                'status' => $statuses[array_rand($statuses)],
                'enrolled_at' => now()->subDays(rand(1, 60)),
                'created_at' => now()->subDays(rand(1, 60)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Enrollments');
    }

    // ═══════════════════════════════════════════════════════════════
    // 4. FINANCIAL
    // ═══════════════════════════════════════════════════════════════

    private function seedAccounting(): void
    {
        if (!Schema::hasTable('acc_fee_categories')) {
            $this->command->info('  ⚡ Skipping Accounting (tables not found)');
            return;
        }

        // Fee categories
        $categories = [
            ['name' => 'Tuition', 'description' => 'Per-unit tuition fee'],
            ['name' => 'Miscellaneous', 'description' => 'Miscellaneous fees'],
            ['name' => 'Laboratory', 'description' => 'Laboratory fees'],
            ['name' => 'Other Fees', 'description' => 'Other institutional fees'],
        ];
        foreach ($categories as $cat) {
            DB::table('acc_fee_categories')->insert([
                'name' => $cat['name'],
                'description' => $cat['description'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Fee items
        $feeItems = [
            ['category_id' => 1, 'name' => 'Tuition per unit', 'amount' => 350.00, 'type' => 'per_unit'],
            ['category_id' => 1, 'name' => 'Registration Fee', 'amount' => 500.00, 'type' => 'fixed'],
            ['category_id' => 2, 'name' => 'Student Development', 'amount' => 750.00, 'type' => 'fixed'],
            ['category_id' => 2, 'name' => 'Library Fee', 'amount' => 500.00, 'type' => 'fixed'],
            ['category_id' => 2, 'name' => 'Medical & Dental', 'amount' => 300.00, 'type' => 'fixed'],
            ['category_id' => 2, 'name' => 'Guidance Fee', 'amount' => 250.00, 'type' => 'fixed'],
            ['category_id' => 3, 'name' => 'Computer Lab Fee', 'amount' => 800.00, 'type' => 'fixed'],
            ['category_id' => 3, 'name' => 'Science Lab Fee', 'amount' => 600.00, 'type' => 'fixed'],
            ['category_id' => 4, 'name' => 'Athletics Fee', 'amount' => 200.00, 'type' => 'fixed'],
            ['category_id' => 4, 'name' => 'Cultural Fee', 'amount' => 200.00, 'type' => 'fixed'],
            ['category_id' => 4, 'name' => 'Insurance', 'amount' => 150.00, 'type' => 'fixed'],
        ];
        foreach ($feeItems as $item) {
            DB::table('acc_fee_items')->insert([
                'fee_category_id' => $item['category_id'],
                'name' => $item['name'],
                'amount' => $item['amount'],
                'type' => $item['type'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Invoices
        $students = DB::table('students')->take(30)->get();
        $programs = DB::table('cur_programs')->get();
        foreach ($students as $student) {
            $totalAmount = rand(12, 21) * 350 + 3650; // ~12-21 units + misc
            DB::table('acc_invoices')->insert([
                'student_id' => $student->student_id,
                'invoice_number' => 'INV-' . date('Y') . '-' . str_pad((string)rand(1, 9999), 4, '0', STR_PAD_LEFT),
                'total_amount' => $totalAmount,
                'status' => ['pending', 'paid', 'partially_paid', 'overdue'][array_rand(['pending', 'paid', 'paid', 'pending'])],
                'due_date' => now()->addDays(rand(-30, 60)),
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now(),
            ]);
        }

        // Payments
        $invoices = DB::table('acc_invoices')->where('status', 'paid')->get();
        foreach ($invoices as $invoice) {
            DB::table('acc_payments')->insert([
                'invoice_id' => $invoice->id,
                'amount' => $invoice->total_amount,
                'payment_method' => ['gcash', 'bank_transfer', 'cash', 'card'][array_rand(['gcash', 'bank_transfer', 'cash', 'card'])],
                'reference_number' => 'PAY-' . date('Y') . str_pad((string)rand(1, 9999), 4, '0', STR_PAD_LEFT),
                'status' => 'completed',
                'paid_at' => now()->subDays(rand(1, 30)),
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('  ✓ Accounting (categories, items, invoices, payments)');
    }

    // ═══════════════════════════════════════════════════════════════
    // 5. OPERATIONS
    // ═══════════════════════════════════════════════════════════════

    private function seedHR(): void
    {
        if (!Schema::hasTable('hr_departments')) return;

        $depts = ['Registrar', 'Finance', 'Human Resources', 'Academic Affairs', 'Student Affairs',
                   'Library', 'IT Services', 'Guidance Office', 'Clinic', 'Maintenance'];
        foreach ($depts as $d) {
            DB::table('hr_departments')->insert([
                'name' => $d . ' Department',
                'code' => strtoupper(substr($d, 0, 3)),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (!Schema::hasTable('hr_employees')) return;
        $departments = DB::table('hr_departments')->get();
        $positions = ['Professor', 'Instructor', 'Staff', 'Administrative Officer', 'Clerk', 'Director', 'Dean'];
        $empFirstNames = ['Antonio', 'Beatriz', 'Carlos', 'Diana', 'Eduardo', 'Fe', 'Gregorio', 'Helen'];
        $empLastNames = ['Villanueva', 'Gonzales', 'Cruz', 'Mendoza', 'Flores', 'Aquino', 'Rivera', 'Castillo'];

        for ($i = 1; $i <= 25; $i++) {
            DB::table('hr_employees')->insert([
                'employee_number' => 'EMP-' . str_pad((string)$i, 4, '0', STR_PAD_LEFT),
                'first_name' => $empFirstNames[array_rand($empFirstNames)],
                'last_name' => $empLastNames[array_rand($empLastNames)],
                'email' => "employee{$i}@minsubc.edu.ph",
                'department_id' => $departments->random()->id,
                'position' => $positions[array_rand($positions)],
                'status' => 'active',
                'hire_date' => now()->subYears(rand(1, 15)),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ HR (departments, employees)');
    }

    private function seedLibrary(): void
    {
        if (!Schema::hasTable('book_categories')) return;

        $cats = ['Fiction', 'Non-Fiction', 'Reference', 'Textbook', 'Science', 'Technology',
                  'Engineering', 'Mathematics', 'Filipiniana', 'Periodicals'];
        foreach ($cats as $cat) {
            DB::table('book_categories')->insert([
                'name' => $cat,
                'description' => "{$cat} books collection",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (!Schema::hasTable('books')) return;
        $categories = DB::table('book_categories')->get();
        $bookTitles = [
            ['title' => 'Introduction to Algorithms', 'author' => 'Thomas H. Cormen'],
            ['title' => 'Clean Code', 'author' => 'Robert C. Martin'],
            ['title' => 'Design Patterns', 'author' => 'Gang of Four'],
            ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt'],
            ['title' => 'Database System Concepts', 'author' => 'Abraham Silberschatz'],
            ['title' => 'Operating System Concepts', 'author' => 'Silberschatz & Galvin'],
            ['title' => 'Computer Networking', 'author' => 'James Kurose'],
            ['title' => 'Artificial Intelligence', 'author' => 'Stuart Russell'],
            ['title' => 'Calculus: Early Transcendentals', 'author' => 'James Stewart'],
            ['title' => 'Physics for Scientists', 'author' => 'Serway & Jewett'],
            ['title' => 'Organic Chemistry', 'author' => 'Paula Bruice'],
            ['title' => 'Biology: The Unity of Life', 'author' => 'Cecie Starr'],
            ['title' => 'Principles of Economics', 'author' => 'N. Gregory Mankiw'],
            ['title' => 'Philippine History', 'author' => 'Renato Constantino'],
            ['title' => 'Rizal: Life and Works', 'author' => 'Zaide & Zaide'],
            ['title' => 'Noli Me Tangere', 'author' => 'Jose Rizal'],
            ['title' => 'El Filibusterismo', 'author' => 'Jose Rizal'],
            ['title' => 'The Little Prince', 'author' => 'Antoine de Saint-Exupéry'],
            ['title' => 'To Kill a Mockingbird', 'author' => 'Harper Lee'],
            ['title' => '1984', 'author' => 'George Orwell'],
        ];
        foreach ($bookTitles as $book) {
            DB::table('books')->insert([
                'title' => $book['title'],
                'author' => $book['author'],
                'isbn' => '978-' . rand(1, 9) . '-' . rand(10, 99) . '-' . rand(100000, 999999) . '-' . rand(0, 9),
                'book_category_id' => $categories->random()->id,
                'quantity' => rand(2, 10),
                'available_quantity' => rand(0, 5),
                'status' => rand(0, 1) ? 'available' : 'unavailable',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Library (books, categories)');
    }

    private function seedFacilities(): void
    {
        if (!Schema::hasTable('fac_facilities')) return;

        $facilities = [
            ['name' => 'Main Lecture Hall', 'capacity' => 200, 'type' => 'lecture_hall'],
            ['name' => 'Computer Lab A', 'capacity' => 40, 'type' => 'computer_lab'],
            ['name' => 'Computer Lab B', 'capacity' => 35, 'type' => 'computer_lab'],
            ['name' => 'Science Laboratory', 'capacity' => 30, 'type' => 'laboratory'],
            ['name' => 'Engineering Lab', 'capacity' => 25, 'type' => 'laboratory'],
            ['name' => 'Audio-Visual Room', 'capacity' => 100, 'type' => 'av_room'],
            ['name' => 'Conference Room', 'capacity' => 20, 'type' => 'conference'],
            ['name' => 'Gymnasium', 'capacity' => 500, 'type' => 'gym'],
            ['name' => 'Library Hall', 'capacity' => 150, 'type' => 'hall'],
            ['name' => 'Outdoor Stage', 'capacity' => 1000, 'type' => 'outdoor'],
        ];
        foreach ($facilities as $f) {
            DB::table('fac_facilities')->insert([
                'name' => $f['name'],
                'description' => "{$f['name']} - {$f['type']}",
                'capacity' => $f['capacity'],
                'type' => $f['type'],
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Equipment
        if (!Schema::hasTable('fac_equipment')) return;
        $equipment = ['Projector', 'Laptop', 'Speaker System', 'Microphone', 'Whiteboard',
                       'Document Camera', 'TV Monitor', 'Sound Mixer', 'Extension Cord', 'Tripod'];
        foreach ($equipment as $eq) {
            DB::table('fac_equipment')->insert([
                'name' => $eq,
                'description' => "{$eq} - standard issue",
                'quantity' => rand(2, 15),
                'available_quantity' => rand(0, 8),
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Facilities (rooms, equipment)');
    }

    private function seedDormitory(): void
    {
        if (!Schema::hasTable('drm_halls')) return;

        $halls = [
            ['name' => 'Rizal Hall', 'gender' => 'male', 'floors' => 4],
            ['name' => 'Bonifacio Hall', 'gender' => 'male', 'floors' => 3],
            ['name' => 'Mabini Hall', 'gender' => 'male', 'floors' => 3],
            ['name' => 'Luna Hall', 'gender' => 'female', 'floors' => 4],
            ['name' => 'Aguinaldo Hall', 'gender' => 'female', 'floors' => 3],
        ];
        foreach ($halls as $h) {
            DB::table('drm_halls')->insert([
                'name' => $h['name'],
                'gender' => $h['gender'],
                'total_floors' => $h['floors'],
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Rooms & beds
        if (!Schema::hasTable('drm_rooms') || !Schema::hasTable('drm_beds')) return;
        $halls = DB::table('drm_halls')->get();
        $roomTypes = ['suite', 'standard', 'economy'];
        foreach ($halls as $hall) {
            for ($floor = 1; $floor <= $hall->total_floors; $floor++) {
                for ($r = 1; $r <= 10; $r++) {
                    $roomNum = ($floor * 100) + $r;
                    $type = $roomTypes[array_rand($roomTypes)];
                    $capacity = $type === 'suite' ? 2 : ($type === 'standard' ? 4 : 6);
                    DB::table('drm_rooms')->insert([
                        'dorm_hall_id' => $hall->id,
                        'room_number' => (string)$roomNum,
                        'room_type' => $type,
                        'capacity' => $capacity,
                        'floor' => $floor,
                        'status' => 'available',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Create beds
                    $roomId = DB::getPdo()->lastInsertId();
                    for ($b = 1; $b <= $capacity; $b++) {
                        DB::table('drm_beds')->insert([
                            'dorm_room_id' => $roomId,
                            'bed_number' => "B-{$roomNum}-{$b}",
                            'is_occupied' => false,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }
        $this->command->info('  ✓ Dormitory (halls, rooms, beds)');
    }

    // ═══════════════════════════════════════════════════════════════
    // 6. STUDENT SERVICES
    // ═══════════════════════════════════════════════════════════════

    private function seedGuidance(): void
    {
        if (!Schema::hasTable('gdn_counseling_sessions')) return;

        $students = DB::table('students')->get();
        $purposes = ['Academic Concern', 'Personal Issue', 'Career Guidance', 'Family Matter',
                      'Stress Management', 'Peer Relationship', 'Mental Health', 'Academic Performance'];
        for ($i = 0; $i < 30; $i++) {
            $student = $students->random();
            $status = ['pending', 'completed', 'cancelled'][array_rand(['pending', 'completed', 'completed', 'pending'])];
            DB::table('gdn_counseling_sessions')->insert([
                'student_id' => $student->student_id,
                'purpose' => $purposes[array_rand($purposes)],
                'notes' => "Session notes for {$student->first_name} {$student->last_name}",
                'status' => $status,
                'scheduled_at' => now()->subDays(rand(1, 60)),
                'created_at' => now()->subDays(rand(1, 60)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Guidance (counseling sessions)');
    }

    private function seedDiscipline(): void
    {
        if (!Schema::hasTable('dsc_offense_categories')) return;

        $categories = [
            ['name' => 'Academic Dishonesty', 'description' => 'Cheating, plagiarism, etc.', 'severity' => 'major'],
            ['name' => 'Violence', 'description' => 'Physical altercations', 'severity' => 'major'],
            ['name' => 'Disrespect', 'description' => 'Disrespect towards faculty/staff', 'severity' => 'minor'],
            ['name' => 'Property Damage', 'description' => 'Vandalism, destruction of property', 'severity' => 'major'],
            ['name' => 'Tardiness', 'description' => 'Chronic tardiness', 'severity' => 'minor'],
            ['name' => 'Uniform Violation', 'description' => 'Improper attire', 'severity' => 'minor'],
        ];
        foreach ($categories as $cat) {
            DB::table('dsc_offense_categories')->insert([
                'name' => $cat['name'],
                'description' => $cat['description'],
                'severity' => $cat['severity'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Offenses
        if (!Schema::hasTable('dsc_offenses')) return;
        $cats = DB::table('dsc_offense_categories')->get();
        $offenses = [
            ['name' => 'Cheating during exam', 'penalty' => 'Warning + re-exam'],
            ['name' => 'Plagiarism', 'penalty' => 'Grade of zero on output'],
            ['name' => 'Physical fighting', 'penalty' => 'Suspension 1 week'],
            ['name' => 'Verbal abuse', 'penalty' => 'Counseling + warning'],
            ['name' => 'Graffiti on school property', 'penalty' => 'Clean-up + fine'],
            ['name' => 'Broken windows', 'penalty' => 'Replacement cost'],
            ['name' => 'Late to class (3x)', 'penalty' => 'Parent conference'],
            ['name' => 'No uniform', 'penalty' => 'Detention'],
        ];
        foreach ($offenses as $off) {
            DB::table('dsc_offenses')->insert([
                'offense_category_id' => $cats->random()->id,
                'name' => $off['name'],
                'penalty' => $off['penalty'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Incidents
        if (!Schema::hasTable('dsc_incidents') || !Schema::hasTable('students')) return;
        $students = DB::table('students')->take(20)->get();
        $offenseList = DB::table('dsc_offenses')->get();
        foreach ($students as $student) {
            DB::table('dsc_incidents')->insert([
                'student_id' => $student->student_id,
                'offense_id' => $offenseList->random()->id,
                'description' => "Incident report for {$student->first_name} {$student->last_name}",
                'status' => ['pending', 'resolved', 'under_investigation'][array_rand(['pending', 'resolved', 'under_investigation'])],
                'reported_by' => 'System Admin',
                'occurred_at' => now()->subDays(rand(1, 90)),
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Discipline (categories, offenses, incidents)');
    }

    private function seedClinic(): void
    {
        if (!Schema::hasTable('cls_medical_records') || !Schema::hasTable('students')) return;

        $students = DB::table('students')->take(30)->get();
        $conditions = ['Headache', 'Fever', 'Cough & Colds', 'Stomach Ache', 'Minor Injury',
                        'Allergy', 'Dizziness', 'Sore Throat', 'Skin Rash', 'Eye Irritation'];
        foreach ($students as $student) {
            DB::table('cls_medical_records')->insert([
                'student_id' => $student->student_id,
                'diagnosis' => $conditions[array_rand($conditions)],
                'treatment' => 'Prescribed medication and rest',
                'remarks' => 'Student advised to follow up if symptoms persist',
                'recorded_by' => 'Dr. Jose Rizal Jr.',
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Clinic (medical records)');
    }

    private function seedCurriculum(): void
    {
        if (!Schema::hasTable('cur_syllabi')) return;

        $courses = DB::table('cur_courses')->get();
        $instructors = ['Prof. Santos', 'Dr. Cruz', 'Mr. Reyes', 'Ms. Bautista', 'Dr. Mercado'];
        foreach ($courses->take(15) as $course) {
            DB::table('cur_syllabi')->insert([
                'course_id' => $course->id,
                'title' => "Syllabus - {$course->code} {$course->name}",
                'instructor' => $instructors[array_rand($instructors)],
                'term' => '1st Semester',
                'school_year' => '2025-2026',
                'status' => ['draft', 'published', 'approved'][array_rand(['draft', 'published', 'approved'])],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Curriculum (syllabi)');
    }

    private function seedResearch(): void
    {
        if (!Schema::hasTable('res_proposals')) return;

        $students = DB::table('students')->take(15)->get();
        $titles = [
            'Impact of AI on Philippine Education',
            'Mobile Learning Application for Rural Schools',
            'Predictive Analytics for Student Dropout',
            'Blockchain-based Academic Records System',
            'IoT-based Classroom Monitoring System',
            'Machine Learning for Crop Disease Detection',
            'Online Learning Readiness Assessment',
            'Social Media Influence on Student Behavior',
        ];
        foreach ($students as $i => $student) {
            DB::table('res_proposals')->insert([
                'student_id' => $student->student_id,
                'title' => $titles[$i % count($titles)],
                'abstract' => 'This research aims to explore and develop innovative solutions...',
                'status' => ['submitted', 'approved', 'defended', 'rejected'][array_rand(['submitted', 'approved', 'approved', 'defended'])],
                'submitted_at' => now()->subDays(rand(30, 180)),
                'created_at' => now()->subDays(rand(30, 180)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Research (proposals)');
    }

    private function seedAlumni(): void
    {
        if (!Schema::hasTable('alm_alumni')) return;

        $firstNames = ['Juan', 'Maria', 'Jose', 'Ana', 'Pedro', 'Rosa', 'Carlos', 'Elena'];
        $lastNames = ['Dela Cruz', 'Santos', 'Reyes', 'Bautista', 'Garcia', 'Mendoza', 'Flores'];
        $programs = ['BSIT', 'BSCS', 'BSBA', 'BSED', 'BSCE'];

        for ($i = 1; $i <= 30; $i++) {
            $gradYear = rand(2018, 2025);
            DB::table('alm_alumni')->insert([
                'first_name' => $firstNames[array_rand($firstNames)],
                'last_name' => $lastNames[array_rand($lastNames)],
                'email' => "alumni{$i}@email.com",
                'program' => $programs[array_rand($programs)],
                'graduation_year' => $gradYear,
                'employment_status' => ['employed', 'self-employed', 'unemployed', 'further_study'][array_rand(['employed', 'employed', 'employed', 'further_study'])],
                'company' => rand(0, 1) ? ['Google', 'Microsoft', 'Accenture', 'UP Manila', 'DOST', 'BPO Company'][array_rand(['Google', 'Microsoft', 'Accenture', 'UP Manila', 'DOST', 'BPO Company'])] : null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Alumni');
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. GOVERNANCE
    // ═══════════════════════════════════════════════════════════════

    private function seedUSG(): void
    {
        if (!Schema::hasTable('officers')) return;

        $positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'PIO', 'PRO'];
        $firstNames = ['Kyle', 'Sarah', 'Mark', 'Angel', 'Paolo', 'Jen', 'Ramon', 'Grace'];
        $lastNames = ['Fernandez', 'Lopez', 'Villanueva', 'Bautista', 'Garcia', 'Morales', 'Castillo', 'Villar'];

        foreach ($positions as $pos) {
            DB::table('officers')->insert([
                'name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                'position' => $pos,
                'term_start' => '2025-08-01',
                'term_end' => '2026-05-31',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Resolutions
        if (!Schema::hasTable('resolutions')) return;
        $resolutions = [
            'A Resolution Supporting the Digital Transformation Initiative',
            'A Resolution Establishing the Student Welfare Committee',
            'A Resolution on Academic Calendar Adjustment',
            'A Resolution Supporting Environmental Sustainability',
            'A Resolution on Student Rights and Welfare',
            'A Resolution for the Annual Cultural Festival',
        ];
        foreach ($resolutions as $res) {
            DB::table('resolutions')->insert([
                'resolution_number' => 'SRN-2025-' . str_pad((string)rand(1, 99), 2, '0', STR_PAD_LEFT),
                'title' => $res,
                'author' => 'USG Officers',
                'status' => ['draft', 'approved', 'adopted'][array_rand(['draft', 'approved', 'adopted'])],
                'created_at' => now()->subDays(rand(1, 60)),
                'updated_at' => now(),
            ]);
        }

        // Announcements
        if (!Schema::hasTable('announcements')) return;
        $announcements = [
            'General Assembly this Friday',
            'Scholarship Applications Now Open',
            'Intramurals 2026 Schedule Released',
            'Freshman Orientation Updates',
            'Library Extended Hours for Finals',
            'Student Government Election Results',
        ];
        foreach ($announcements as $ann) {
            DB::table('announcements')->insert([
                'title' => $ann,
                'content' => "Details about: {$ann}. Please check the USG office for more information.",
                'status' => ['draft', 'published'][array_rand(['draft', 'published', 'published'])],
                'published_at' => now()->subDays(rand(1, 30)),
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ USG (officers, resolutions, announcements)');
    }

    private function seedScheduling(): void
    {
        if (!Schema::hasTable('sch_events')) return;

        $events = [
            ['title' => 'Freshman Orientation', 'type' => 'academic', 'start' => '2025-08-05', 'end' => '2025-08-07'],
            ['title' => 'Midterm Examinations', 'type' => 'academic', 'start' => '2025-10-15', 'end' => '2025-10-21'],
            ['title' => 'University Intramurals', 'type' => 'sports', 'start' => '2025-11-10', 'end' => '2025-11-15'],
            ['title' => 'Christmas Break', 'type' => 'holiday', 'start' => '2025-12-20', 'end' => '2026-01-05'],
            ['title' => 'Final Examinations', 'type' => 'academic', 'start' => '2026-03-10', 'end' => '2026-03-16'],
            ['title' => 'Graduation Day', 'type' => 'ceremony', 'start' => '2026-04-15', 'end' => '2026-04-15'],
            ['title' => 'National Heroes Day', 'type' => 'holiday', 'start' => '2025-08-25', 'end' => '2025-08-25'],
            ['title' => 'Foundation Day', 'type' => 'celebration', 'start' => '2025-09-20', 'end' => '2025-09-20'],
            ['title' => 'Semestral Break', 'type' => 'holiday', 'start' => '2025-12-20', 'end' => '2026-01-05'],
            ['title' => 'Enrollment Week', 'type' => 'academic', 'start' => '2025-07-28', 'end' => '2025-08-02'],
        ];
        foreach ($events as $e) {
            DB::table('sch_events')->insert([
                'title' => $e['title'],
                'description' => "{$e['title']} - university wide event",
                'type' => $e['type'],
                'start_date' => $e['start'],
                'end_date' => $e['end'],
                'status' => 'published',
                'created_by' => 'System Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Academic schedules
        if (!Schema::hasTable('sch_academic_schedules')) return;
        $sections = DB::table('admission_sections')->get();
        $subjects = DB::table('admission_subjects')->get();
        foreach ($sections->take(10) as $section) {
            for ($i = 0; $i < rand(3, 5); $i++) {
                DB::table('sch_academic_schedules')->insert([
                    'section_id' => $section->id,
                    'subject_id' => $subjects->random()->id,
                    'day' => ['M', 'T', 'W', 'Th', 'F', 'M/W', 'T/Th'][array_rand(['M', 'W', 'F', 'M/W', 'T/Th'])],
                    'time_start' => sprintf('%02d:00', rand(7, 16)),
                    'time_end' => sprintf('%02d:00', rand(9, 18)),
                    'room' => 'RM-' . str_pad((string)rand(101, 320), 3, '0', STR_PAD_LEFT),
                    'instructor' => fake()->name(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        $this->command->info('  ✓ Scheduling (events, academic schedules)');
    }

    private function seedVoting(): void
    {
        if (!Schema::hasTable('elections')) return;

        DB::table('elections')->insert([
            'title' => 'USG General Elections 2026',
            'description' => 'Annual student government elections',
            'start_date' => '2026-03-01 08:00:00',
            'end_date' => '2026-03-03 17:00:00',
            'status' => 'upcoming',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Positions
        if (!Schema::hasTable('positions')) return;
        $positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'PIO'];
        foreach ($positions as $pos) {
            DB::table('positions')->insert([
                'name' => $pos,
                'election_id' => 1,
                'max_votes' => 1,
                'priority' => array_search($pos, $positions) + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Partylists
        if (!Schema::hasTable('partylists')) return;
        $parties = ['Kilusang Bagong Sigla', 'Alyansang Mag-aaral', 'Samahang Nagkakaisa',
                     'Tinig ng Kabataan', 'Pagsulong Coalition'];
        foreach ($parties as $party) {
            DB::table('partylists')->insert([
                'name' => $party,
                'election_id' => 1,
                'color' => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][array_rand(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'])],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Candidates
        if (!Schema::hasTable('candidates')) return;
        $students = DB::table('students')->take(18)->get();
        $positionIds = DB::table('positions')->pluck('id')->toArray();
        $partylistIds = DB::table('partylists')->pluck('id')->toArray();
        foreach ($students as $i => $student) {
            DB::table('candidates')->insert([
                'student_id' => $student->student_id,
                'position_id' => $positionIds[$i % count($positionIds)],
                'partylist_id' => $partylistIds[array_rand($partylistIds)],
                'election_id' => 1,
                'platform' => 'Platform statement of candidate ' . $student->first_name,
                'is_approved' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Voting (elections, positions, partylists, candidates)');
    }

    // ═══════════════════════════════════════════════════════════════
    // 8. SUPPORT
    // ═══════════════════════════════════════════════════════════════

    private function seedHelpdesk(): void
    {
        if (!Schema::hasTable('hlp_ticket_categories')) return;

        $cats = ['IT Issue', 'Facility Problem', 'Account Concern', 'Document Request', 'Other'];
        foreach ($cats as $cat) {
            DB::table('hlp_ticket_categories')->insert([
                'name' => $cat,
                'description' => "{$cat} related tickets",
                'color' => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7', '#96CEB4'][array_rand(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7', '#96CEB4'])],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Tickets
        if (!Schema::hasTable('hlp_tickets') || !Schema::hasTable('students')) return;
        $students = DB::table('students')->take(20)->get();
        $categories = DB::table('hlp_ticket_categories')->get();
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $statuses = ['open', 'open', 'in_progress', 'resolved', 'closed'];
        $titles = [
            'Cannot login to portal',
            'Request for transcript of records',
            'Broken chair in Room 203',
            'Internet connection issue',
            'Grade encoding error',
        ];

        foreach ($students as $student) {
            DB::table('hlp_tickets')->insert([
                'student_id' => $student->student_id,
                'ticket_category_id' => $categories->random()->id,
                'title' => $titles[array_rand($titles)],
                'description' => "Details about the issue reported by {$student->first_name} {$student->last_name}",
                'priority' => $priorities[array_rand($priorities)],
                'status' => $statuses[array_rand($statuses)],
                'assigned_to' => 'tech@minsubc.edu.ph',
                'created_at' => now()->subDays(rand(1, 45)),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('  ✓ Helpdesk (categories, tickets)');
    }

    private function seedNotifications(): void
    {
        if (!Schema::hasTable('notifications')) return;

        $admins = User::role(['super-admin', 'registrar-admin', 'helpdesk-admin', 'discipline-admin', 'dormitory-admin'])->get();
        if ($admins->isEmpty()) return;

        $notifications = [
            ['title' => 'New Helpdesk Ticket', 'body' => 'A new support ticket has been opened by a student requiring attention.', 'module' => 'helpdesk', 'icon' => 'Ticket'],
            ['title' => 'Discipline Incident Reported', 'body' => 'A new conduct incident has been reported and requires review.', 'module' => 'discipline', 'icon' => 'AlertTriangle'],
            ['title' => 'Maintenance Request Submitted', 'body' => 'A dormitory maintenance request has been filed by a resident.', 'module' => 'dormitory', 'icon' => 'Wrench'],
            ['title' => 'Payment Received', 'body' => 'A student payment has been processed successfully.', 'module' => 'accounting', 'icon' => 'Bell'],
            ['title' => 'Overdue Book Return', 'body' => 'A borrowed book is now overdue and requires follow-up.', 'module' => 'library', 'icon' => 'BookOpen'],
            ['title' => 'New Enrollment', 'body' => 'A new student has been enrolled for the current semester.', 'module' => 'admission', 'icon' => 'GraduationCap'],
            ['title' => 'Counseling Session Scheduled', 'body' => 'A guidance counseling session has been booked.', 'module' => 'guidance', 'icon' => 'HeartPulse'],
            ['title' => 'New USG Resolution', 'body' => 'A new resolution has been submitted for approval.', 'module' => 'usg', 'icon' => 'FileText'],
            ['title' => 'Facility Reservation', 'body' => 'A new facility reservation request needs confirmation.', 'module' => 'facilities', 'icon' => 'Building2'],
            ['title' => 'Election Period Starting', 'body' => 'The student election period is about to begin.', 'module' => 'voting', 'icon' => 'Vote'],
        ];

        foreach ($admins as $admin) {
            foreach ($notifications as $i => $n) {
                $createdAt = now()->subHours(rand(1, 72))->subMinutes(rand(0, 59));
                $isRead = $i < 5;

                DB::table('notifications')->insert([
                    'id' => \Illuminate\Support\Str::uuid(),
                    'type' => 'App\Notifications\ModuleNotification',
                    'notifiable_type' => 'App\Models\User',
                    'notifiable_id' => $admin->id,
                    'data' => json_encode([
                        'icon' => $n['icon'],
                        'title' => $n['title'],
                        'body' => $n['body'],
                        'module' => $n['module'],
                        'action_url' => null,
                        'action_text' => null,
                    ]),
                    'read_at' => $isRead ? $createdAt : null,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }

        $adminCount = $admins->count();
        $this->command->info("  ✓ Notifications ({$adminCount} users × 10 notifications each)");
    }
}