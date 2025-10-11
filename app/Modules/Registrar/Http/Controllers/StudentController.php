<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request)
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
    public function create()
    {
        return Inertia::render('registrar/students/create');
    }

    /**
     * Store a newly created student.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|string|unique:students,student_id',
            'user_id' => 'required|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'course' => 'nullable|string|max:100',
            'year_level' => 'nullable|integer|min:1|max:6',
            'campus' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive,graduated',
        ]);

        Student::create($request->validated());

        return redirect()->route('registrar.students.index')
            ->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified student.
     */
    public function show(Student $student)
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
    public function edit(Student $student)
    {
        return Inertia::render('registrar/students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(Request $request, Student $student)
    {
        $request->validate([
            'student_id' => 'required|string|unique:students,student_id,'.$student->student_id.',student_id',
            'user_id' => 'required|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'course' => 'nullable|string|max:100',
            'year_level' => 'nullable|integer|min:1|max:6',
            'campus' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive,graduated',
        ]);

        $student->update($request->validated());

        return redirect()->route('registrar.students.index')
            ->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified student.
     */
    public function destroy(Student $student)
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
