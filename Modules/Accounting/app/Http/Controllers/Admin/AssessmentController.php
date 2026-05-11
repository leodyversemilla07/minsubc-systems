<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\FeeItem;
use Modules\Accounting\Models\Discount;
use Modules\Accounting\Services\AccountingService;

class AssessmentController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(Request $request): InertiaResponse
    {
        $assessments = Assessment::with('assessable')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('accounting/admin/assessments/index', [
            'assessments' => $assessments,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $feeItems = FeeItem::with('category')->where('is_active', true)->get();
        $discounts = Discount::where('is_active', true)->get();
        return inertia('accounting/admin/assessments/create', compact('feeItems', 'discounts'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'assessable_type' => 'required|string',
            'assessable_id' => 'required|integer',
            'academic_year' => 'nullable|string|max:20',
            'semester' => 'nullable|string|max:20',
            'due_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'lines' => 'required|array|min:1',
            'lines.*.fee_item_id' => 'required|exists:acc_fee_items,id',
            'lines.*.amount' => 'required|numeric|min:0',
        ]);

        $this->accountingService->createAssessment($validated);

        return redirect()->route('accounting.admin.assessments.index')->with('success', 'Assessment created.');
    }

    public function show(Assessment $assessment): InertiaResponse
    {
        $assessment->load(['assessable', 'lines.feeItem.category', 'payments', 'appliedDiscounts.discount']);
        return inertia('accounting/admin/assessments/show', compact('assessment'));
    }

    public function searchStudents(Request $request)
    {
        $q = $request->q;
        $students = \App\Models\Student::where(function ($query) use ($q) {
            $query->where('first_name', 'like', "%{$q}%")
                ->orWhere('last_name', 'like', "%{$q}%")
                ->orWhere('student_id', 'like', "%{$q}%");
        })->take(10)->get(['id', 'student_id', 'first_name', 'last_name']);

        return response()->json($students);
    }
}