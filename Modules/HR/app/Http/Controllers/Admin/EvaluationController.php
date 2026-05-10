<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Evaluation;
use Modules\HR\Models\Employee;

class EvaluationController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $evaluations = Evaluation::with(['employee:id,employee_id,first_name,last_name', 'evaluator:id,first_name,last_name'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->type, fn ($q, $t) => $q->where('type', $t))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('hr/admin/evaluations/index', [
            'evaluations' => $evaluations,
            'filters' => $request->only(['status', 'type']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $employees = Employee::where('employment_status', 'active')
            ->get(['id', 'employee_id', 'first_name', 'last_name']);
        return inertia('hr/admin/evaluations/create', compact('employees'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'evaluator_id' => 'required|exists:hr_employees,id',
            'type' => 'required|in:periodic,performance,peer,self',
            'period' => 'required|string|max:50',
            'rating' => 'nullable|integer|min:1|max:5',
            'comments' => 'nullable|string',
        ]);

        $validated['status'] = $validated['rating'] ? 'completed' : 'pending';
        $validated['submitted_at'] = $validated['rating'] ? now() : null;

        Evaluation::create($validated);

        return redirect()->route('hr.admin.evaluations.index')
            ->with('success', 'Evaluation created.');
    }

    public function show(Evaluation $evaluation): InertiaResponse
    {
        $evaluation->load(['employee', 'evaluator']);
        return inertia('hr/admin/evaluations/show', compact('evaluation'));
    }
}