<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\GradeReport;
use Modules\Research\Models\Proposal;
class GradeReportController extends Controller
{
    public function index(): InertiaResponse { return inertia('research/admin/grade-reports/index', ['reports' => GradeReport::with('proposal')->latest()->get()]); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'proposal_id' => 'required|exists:res_proposals,id', 'student_id' => 'required|string',
            'proposal_grade' => 'nullable|numeric|min:0|max:100', 'final_defense_grade' => 'nullable|numeric|min:0|max:100',
            'manuscript_grade' => 'nullable|numeric|min:0|max:100', 'final_grade' => 'nullable|numeric|min:0|max:100',
            'remarks' => 'required|in:passed,failed,incomplete',
        ]);
        GradeReport::create($validated);
        return redirect()->route('research.admin.grade-reports.index')->with('success', 'Grade report created.');
    }
}


