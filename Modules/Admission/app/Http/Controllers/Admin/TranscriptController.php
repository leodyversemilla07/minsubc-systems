<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;
use Modules\Admission\Services\TranscriptService;
use Modules\Registrar\Models\Student;

class TranscriptController extends Controller
{
    public function __construct(
        private TranscriptService $transcriptService
    ) {}

    /**
     * Display transcript management page.
     */
    public function index(Request $request): View
    {
        $query = Student::with('user');

        if ($request->search) {
            $query->whereHas('user', fn ($q) => 
                $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->search}%"])
                  ->orWhere('email', 'like', "%{$request->search}%")
            )->orWhere('student_id', 'like', "%{$request->search}%");
        }

        if ($request->course) {
            $query->where('course', $request->course);
        }

        $students = $query->latest()->paginate(20)->withQueryString();

        $courses = Student::distinct()->pluck('course')->filter()->sort();

        return view('admission::admin.transcripts.index', [
            'students' => $students,
            'courses' => $courses,
            'filters' => $request->only(['search', 'course']),
        ]);
    }

    /**
     * Generate and download transcript.
     */
    public function download(Request $request, string $studentId): Response
    {
        $student = Student::where('student_id', $studentId)->firstOrFail();
        $user = $student->user;

        $pdf = $this->transcriptService->generatePDF($user, [
            'purpose' => $request->get('purpose', 'Official Transcript'),
            'issued_by' => auth()->user()->full_name ?? 'Registrar',
        ]);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"TOR_{$studentId}.pdf\"",
        ]);
    }

    /**
     * Preview transcript in browser.
     */
    public function preview(Request $request, string $studentId): View
    {
        $student = Student::where('student_id', $studentId)->firstOrFail();
        $user = $student->user;

        return $this->transcriptService->generateView($user, [
            'purpose' => $request->get('purpose', 'Transcript Preview'),
            'issued_by' => auth()->user()->full_name ?? 'Registrar',
        ]);
    }

    /**
     * Generate enrollment certificate.
     */
    public function enrollmentCertificate(Enrollment $enrollment): View
    {
        $data = $this->transcriptService->generateEnrollmentCertificate($enrollment);

        return view('admission::pdf.enrollment-certificate', $data);
    }

    /**
     * Generate True Copy of Grades.
     */
    public function trueCopy(Request $request, string $studentId): Response
    {
        $student = Student::where('student_id', $studentId)->firstOrFail();
        $user = $student->user;

        $pdf = $this->transcriptService->generatePDF($user, [
            'purpose' => 'True Copy of Grades',
            'issued_by' => auth()->user()->full_name ?? 'University Registrar',
        ]);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"TCOG_{$studentId}.pdf\"",
        ]);
    }

    /**
     * Verify a transcript.
     */
    public function verify(Request $request): View|RedirectResponse
    {
        $studentId = $request->get('student_id');

        if (!$studentId) {
            return view('admission::admin.transcripts.verify');
        }

        $result = $this->transcriptService->verify($studentId);

        if (!$result['verified']) {
            return redirect()
                ->back()
                ->with('error', $result['message']);
        }

        return view('admission::admin.transcripts.verify', [
            'verification' => $result,
        ]);
    }

    /**
     * Print multiple transcripts (batch).
     */
    public function batchPrint(Request $request): Response
    {
        $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'required|string',
        ]);

        // For batch printing, you might want to combine PDFs or generate individual ones
        $pdfs = [];

        foreach ($request->student_ids as $studentId) {
            $student = Student::where('student_id', $studentId)->first();
            
            if ($student) {
                $pdfs[] = $this->transcriptService->generatePDF($student->user, [
                    'purpose' => 'Official Transcript (Batch)',
                    'issued_by' => auth()->user()->full_name ?? 'Registrar',
                ]);
            }
        }

        if (empty($pdfs)) {
            return response('No valid students found', 400);
        }

        // For simplicity, return the first PDF
        // In production, you might want to merge PDFs using a library
        return response($pdfs[0], 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="batch_transcripts.pdf"',
        ]);
    }

    /**
     * API: Get student transcript data.
     */
    public function apiShow(string $studentId): \Illuminate\Http\JsonResponse
    {
        $student = Student::where('student_id', $studentId)->first();

        if (!$student) {
            return response()->json([
                'error' => 'Student not found',
            ], 404);
        }

        $data = $this->transcriptService->generate($student->user, [
            'purpose' => 'API Export',
        ]);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}