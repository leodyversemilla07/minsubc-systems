<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Services\EvaluationService;

class EvaluationController extends Controller
{
    public function __construct(private EvaluationService $evaluationService) {}

    public function store(Request $request, int $applicantId)
    {
        $validated = $request->validate([
            'decision' => ['required', 'in:accepted,rejected,waitlisted'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'score' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'criteria_scores' => ['nullable', 'array'],
        ]);

        $applicant = Applicant::findOrFail($applicantId);

        try {
            $this->evaluationService->evaluate($applicant, $validated);
            return back()->with('success', 'Evaluation submitted successfully.');
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
