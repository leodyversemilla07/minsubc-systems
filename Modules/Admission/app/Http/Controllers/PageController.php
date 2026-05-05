<?php

namespace Modules\Admission\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;

class PageController extends Controller
{
    public function index(): Response
    {
        $programs = AdmissionProgram::with('course')
            ->open()
            ->where('application_start', '<=', now())
            ->where('application_end', '>=', now())
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'course' => $p->course->name,
                'course_code' => $p->course->code,
                'academic_year' => $p->academic_year,
                'semester' => $p->semester,
                'slots_available' => $p->slots_available,
                'slots' => $p->slots,
                'description' => $p->description,
            ]);

        $stats = [
            'total_programs' => AdmissionProgram::count(),
            'open_programs' => $programs->count(),
            'total_applicants' => Applicant::count(),
            'enrolled' => Applicant::where('status', 'enrolled')->count(),
        ];

        $steps = [
            [
                'number' => '01',
                'title' => 'Create an Account',
                'description' => 'Register an account on the MSU portal to start your application journey.',
                'icon' => 'user',
            ],
            [
                'number' => '02',
                'title' => 'Choose Your Program',
                'description' => 'Browse available programs and select the one that matches your academic goals.',
                'icon' => 'book',
            ],
            [
                'number' => '03',
                'title' => 'Submit Requirements',
                'description' => 'Upload the required documents and complete your application form.',
                'icon' => 'file',
            ],
            [
                'number' => '04',
                'title' => 'Track Your Status',
                'description' => 'Monitor your application status and receive updates on your admission.',
                'icon' => 'check',
            ],
        ];

        return Inertia::render('admission/index', [
            'programs' => $programs,
            'stats' => $stats,
            'steps' => $steps,
        ]);
    }
}