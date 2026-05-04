<?php

namespace Modules\Admission\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Services\ApplicationService;

class ApplicationController extends Controller
{
    public function __construct(private ApplicationService $applicationService) {}

    public function create(): Response
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
                'description' => $p->description,
            ]);

        return Inertia::render('admission/apply', ['programs' => $programs]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => ['required', 'exists:admission_programs,id'],
            'first_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'date_of_birth' => ['required', 'date', 'before:18 years ago'],
            'gender' => ['nullable', 'in:male,female,other'],
            'address' => ['nullable', 'string', 'max:500'],
            'city' => ['nullable', 'string', 'max:100'],
            'province' => ['nullable', 'string', 'max:100'],
            'zip_code' => ['nullable', 'string', 'max:10'],
            'last_school_attended' => ['nullable', 'string', 'max:200'],
            'strand' => ['nullable', 'string', 'max:100'],
            'gpa' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ]);

        $applicant = $this->applicationService->createApplication($validated);

        return redirect()->route('admission.application.show', $applicant->application_number)
            ->with('success', 'Application draft created successfully.');
    }

    public function show(string $applicationNumber): Response
    {
        $applicant = Applicant::with(['program.course', 'documents', 'enrollment'])
            ->where('application_number', $applicationNumber)
            ->firstOrFail();

        $requirements = $applicant->program->requirements()->orderBy('sort_order')->get();

        return Inertia::render('admission/manage', [
            'applicant' => $applicant->load('documents'),
            'requirements' => $requirements,
        ]);
    }

    public function submit(string $applicationNumber)
    {
        $applicant = Applicant::where('application_number', $applicationNumber)->firstOrFail();

        try {
            $this->applicationService->submitApplication($applicant);

            return redirect()->route('admission.application.show', $applicant->application_number)
                ->with('success', 'Application submitted successfully!');
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function uploadDocument(Request $request, string $applicationNumber)
    {
        $applicant = Applicant::where('application_number', $applicationNumber)->firstOrFail();

        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
            'name' => ['required', 'string', 'max:200'],
            'requirement_id' => ['nullable', 'exists:admission_requirements,id'],
        ]);

        $this->applicationService->uploadDocument($applicant, $validated, $request->file('file'));

        return back()->with('success', 'Document uploaded successfully.');
    }

    public function trackForm(): Response
    {
        return Inertia::render('admission/track');
    }

    public function trackStatus(Request $request)
    {
        $validated = $request->validate([
            'application_number' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $applicant = Applicant::with(['program.course', 'documents'])
            ->where('application_number', $validated['application_number'])
            ->where('email', $validated['email'])
            ->first();

        if (!$applicant) {
            return back()->with('error', 'No application found with that number and email combination.');
        }

        return Inertia::render('admission/track', ['applicant' => $applicant]);
    }
}
