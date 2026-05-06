<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Admission\Models\Subject;
use Modules\Admission\Models\Course;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all courses
        $courses = Course::all();

        // Sample subjects template (can be customized per course)
        $sampleSubjects = [
            // First Year - 1st Semester
            [
                'code' => 'GE 101',
                'name' => 'College English',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'MATH 101',
                'name' => 'College Mathematics',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'GE 102',
                'name' => 'Pagbasa at Pagsulat sa Filipino',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'PE 101',
                'name' => 'Physical Education 1',
                'units' => 2,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 2,
                'lab_hours' => 0,
            ],
            [
                'code' => 'NSTP 1',
                'name' => 'National Service Training Program 1',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'CS 101',
                'name' => 'Introduction to Computing',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 1,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            // First Year - 2nd Semester
            [
                'code' => 'GE 103',
                'name' => 'Speech Communication',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'MATH 102',
                'name' => 'Mathematics in the Modern World',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'GE 104',
                'name' => 'Contemporary Philippine Arts',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'PE 102',
                'name' => 'Physical Education 2',
                'units' => 2,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 2,
                'lab_hours' => 0,
            ],
            [
                'code' => 'NSTP 2',
                'name' => 'National Service Training Program 2',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'CS 102',
                'name' => 'Computer Programming 1',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 1,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            // Second Year - 1st Semester
            [
                'code' => 'CS 201',
                'name' => 'Computer Programming 2',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 2,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            [
                'code' => 'CS 202',
                'name' => 'Data Structures and Algorithms',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 2,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            [
                'code' => 'GE 201',
                'name' => 'The Entrepreneurial Mind',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'MATH 201',
                'name' => 'Discrete Mathematics',
                'units' => 3,
                'semester' => '1st',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'PE 201',
                'name' => 'Physical Education 3',
                'units' => 2,
                'semester' => '1st',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 2,
                'lab_hours' => 0,
            ],
            // Second Year - 2nd Semester
            [
                'code' => 'CS 203',
                'name' => 'Object-Oriented Programming',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 2,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            [
                'code' => 'CS 204',
                'name' => 'Database Management Systems',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 2,
                'type' => 'both',
                'lec_hours' => 2,
                'lab_hours' => 3,
            ],
            [
                'code' => 'GE 202',
                'name' => 'Ethics',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'MATH 202',
                'name' => 'Probability and Statistics',
                'units' => 3,
                'semester' => '2nd',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 3,
                'lab_hours' => 0,
            ],
            [
                'code' => 'PE 202',
                'name' => 'Physical Education 4',
                'units' => 2,
                'semester' => '2nd',
                'year_level' => 2,
                'type' => 'lec',
                'lec_hours' => 2,
                'lab_hours' => 0,
            ],
        ];

        // Create subjects for each course
        foreach ($courses as $course) {
            foreach ($sampleSubjects as $subjectData) {
                Subject::updateOrCreate(
                    [
                        'course_id' => $course->id,
                        'code' => $subjectData['code'],
                    ],
                    [
                        'name' => $subjectData['name'],
                        'units' => $subjectData['units'],
                        'semester' => $subjectData['semester'],
                        'year_level' => $subjectData['year_level'],
                        'type' => $subjectData['type'],
                        'lec_hours' => $subjectData['lec_hours'],
                        'lab_hours' => $subjectData['lab_hours'],
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}