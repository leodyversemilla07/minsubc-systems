<?php

namespace App\Modules\SAS\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\StoreInsuranceRequest;
use App\Modules\SAS\Services\InsuranceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InsuranceController extends Controller
{
    public function __construct(
        protected InsuranceService $insuranceService
    ) {}

    /**
     * Display a listing of the student's insurance records.
     */
    public function index(Request $request): Response
    {
        $studentId = $request->user()->id;

        $insuranceRecords = $this->insuranceService->getStudentInsurance($studentId);

        return Inertia::render('SAS/student/insurance/index', [
            'insuranceRecords' => $insuranceRecords,
        ]);
    }

    /**
     * Show the form for creating a new insurance record.
     */
    public function create(): Response
    {
        return Inertia::render('SAS/student/insurance/create');
    }

    /**
     * Store a newly created insurance record.
     */
    public function store(StoreInsuranceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['student_id'] = $request->user()->id;
        $data['status'] = 'Pending Review';

        $this->insuranceService->createInsurance($data);

        return redirect()->route('sas.student.insurance.index')
            ->with('success', 'Insurance record submitted successfully.');
    }

    /**
     * Display the specified insurance record.
     */
    public function show(Request $request, int $id): Response
    {
        $insurance = $this->insuranceService->getInsuranceById($id);

        // Ensure the insurance belongs to the authenticated student
        if ($insurance->student_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to insurance record.');
        }

        return Inertia::render('SAS/student/insurance/show', [
            'insurance' => $insurance,
        ]);
    }
}
