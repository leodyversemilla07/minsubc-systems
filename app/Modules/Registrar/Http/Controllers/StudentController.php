<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Http\Requests\StoreStudentRequest;
use App\Modules\Registrar\Http\Requests\UpdateStudentRequest;
use App\Modules\Registrar\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request): Response
    {
        $query = Student::with('user');

        // Filter by course, year_level, campus, status
        if ($request->course) {
            $query->where('course', $request->course);
        }
        if ($request->year_level) {
            $query->where('year_level', $request->year_level);
        }
        if ($request->campus) {
            $query->where('campus', $request->campus);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }

        $students = $query->latest()->paginate(20);

        return Inertia::render('registrar/students/index', [
            'students' => $students,
            'filters' => $request->only(['course', 'year_level', 'campus', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new student.
     */
    public function create(): Response
    {
        return Inertia::render('registrar/students/create');
    }

    /**
     * Store a newly created student.
     */
    public function store(StoreStudentRequest $request): RedirectResponse
    {
        Student::create($request->validated());

        return redirect()->route('registrar.students.index')
            ->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified student.
     */
    public function show(Student $student): Response
    {
        $student->load(['user', 'documentRequests' => function ($query) {
            $query->latest()->limit(10);
        }]);

        return Inertia::render('registrar/students/show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified student.
     */
    public function edit(Student $student): Response
    {
        return Inertia::render('registrar/students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $student->update($request->validated());

        return redirect()->route('registrar.students.index')
            ->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified student.
     */
    public function destroy(Student $student): RedirectResponse
    {
        // Check if student has active document requests
        if ($student->documentRequests()->whereIn('status', ['pending_payment', 'paid', 'processing', 'ready_for_claim', 'claimed'])->exists()) {
            return back()->with('error', 'Cannot delete student with active document requests.');
        }

        $student->delete();

        return redirect()->route('registrar.students.index')
            ->with('success', 'Student deleted successfully.');
    }
}
