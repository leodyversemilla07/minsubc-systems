<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Models\PaymentAllocation;
use Modules\Accounting\Models\AssessmentLine;
use Modules\Accounting\Services\AccountingService;
use App\Models\Student;

class DashboardController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->accountingService->getDashboardStats();
        return inertia('accounting/admin/dashboard/index', compact('stats'));
    }
}

class FeeCategoryController extends Controller
{
    protected $model = \Modules\Accounting\Models\FeeCategory::class;
    protected string $routePrefix = 'accounting.admin.fee-categories';
    protected string $viewPrefix = 'accounting/admin/fee-categories';

    public function index(): InertiaResponse
    {
        $categories = \Modules\Accounting\Models\FeeCategory::withCount('feeItems')->latest()->get();
        return inertia("{$this->viewPrefix}/index", compact('categories'));
    }

    public function create(): InertiaResponse
    {
        return inertia("{$this->viewPrefix}/create");
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_categories,code',
            'description' => 'nullable|string',
            'is_required' => 'boolean',
        ]);
        \Modules\Accounting\Models\FeeCategory::create($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee category created.');
    }

    public function edit(\Modules\Accounting\Models\FeeCategory $feeCategory): InertiaResponse
    {
        return inertia("{$this->viewPrefix}/edit", ['feeCategory' => $feeCategory]);
    }

    public function update(Request $request, \Modules\Accounting\Models\FeeCategory $feeCategory): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_categories,code,' . $feeCategory->id,
            'description' => 'nullable|string',
            'is_required' => 'boolean',
            'is_active' => 'boolean',
        ]);
        $feeCategory->update($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee category updated.');
    }

    public function destroy(\Modules\Accounting\Models\FeeCategory $feeCategory): \Illuminate\Http\RedirectResponse
    {
        $feeCategory->delete();
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee category deleted.');
    }
}

class FeeItemController extends Controller
{
    protected string $routePrefix = 'accounting.admin.fee-items';
    protected string $viewPrefix = 'accounting/admin/fee-items';

    public function index(): InertiaResponse
    {
        $items = \Modules\Accounting\Models\FeeItem::with('category')->latest()->get();
        return inertia("{$this->viewPrefix}/index", compact('items'));
    }

    public function create(): InertiaResponse
    {
        $categories = \Modules\Accounting\Models\FeeCategory::where('is_active', true)->get(['id', 'name', 'code']);
        return inertia("{$this->viewPrefix}/create", compact('categories'));
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'fee_category_id' => 'required|exists:acc_fee_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_items,code',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:tuition,laboratory,miscellaneous,other',
            'billing_cycle' => 'required|in:per_term,per_year,one_time',
            'description' => 'nullable|string',
        ]);
        \Modules\Accounting\Models\FeeItem::create($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee item created.');
    }

    public function edit(\Modules\Accounting\Models\FeeItem $feeItem): InertiaResponse
    {
        $categories = \Modules\Accounting\Models\FeeCategory::where('is_active', true)->get(['id', 'name', 'code']);
        return inertia("{$this->viewPrefix}/edit", ['feeItem' => $feeItem, 'categories' => $categories]);
    }

    public function update(Request $request, \Modules\Accounting\Models\FeeItem $feeItem): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'fee_category_id' => 'required|exists:acc_fee_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_fee_items,code,' . $feeItem->id,
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:tuition,laboratory,miscellaneous,other',
            'billing_cycle' => 'required|in:per_term,per_year,one_time',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $feeItem->update($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee item updated.');
    }

    public function destroy(\Modules\Accounting\Models\FeeItem $feeItem): \Illuminate\Http\RedirectResponse
    {
        $feeItem->delete();
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Fee item deleted.');
    }

    public function list()
    {
        return response()->json(\Modules\Accounting\Models\FeeItem::with('category')->where('is_active', true)->get());
    }
}

class AssessmentController extends Controller
{
    protected string $routePrefix = 'accounting.admin.assessments';

    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(Request $request): InertiaResponse
    {
        $assessments = Assessment::with('assessable')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->term, fn ($q, $t) => $q->where('term_id', $t))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('accounting/admin/assessments/index', [
            'assessments' => $assessments,
            'filters' => $request->only(['status', 'term']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $feeItems = \Modules\Accounting\Models\FeeItem::with('category')->where('is_active', true)->get();
        $discounts = \Modules\Accounting\Models\Discount::where('is_active', true)->get();
        return inertia('accounting/admin/assessments/create', compact('feeItems', 'discounts'));
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
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

        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Assessment created.');
    }

    public function show(Assessment $assessment): InertiaResponse
    {
        $assessment->load(['assessable', 'lines.feeItem.category', 'payments', 'appliedDiscounts.discount']);
        return inertia('accounting/admin/assessments/show', compact('assessment'));
    }

    public function searchStudents(Request $request)
    {
        $q = $request->q;
        $students = Student::where(function ($query) use ($q) {
            $query->where('first_name', 'like', "%{$q}%")
                ->orWhere('last_name', 'like', "%{$q}%")
                ->orWhere('student_id', 'like', "%{$q}%");
        })->take(10)->get(['id', 'student_id', 'first_name', 'last_name']);

        return response()->json($students);
    }
}

class PaymentController extends Controller
{
    protected string $routePrefix = 'accounting.admin.payments';

    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(Request $request): InertiaResponse
    {
        $payments = Payment::with(['assessment', 'user'])
            ->when($request->method, fn ($q, $m) => $q->where('payment_method', $m))
            ->when($request->from, fn ($q, $d) => $q->whereDate('payment_date', '>=', $d))
            ->when($request->to, fn ($q, $d) => $q->whereDate('payment_date', '<=', $d))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('accounting/admin/payments/index', [
            'payments' => $payments,
            'filters' => $request->only(['method', 'from', 'to']),
        ]);
    }

    public function create(): InertiaResponse
    {
        return inertia('accounting/admin/payments/create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'assessment_id' => 'required|exists:acc_assessments,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,check,bank_transfer,gcash,paymaya',
            'reference_number' => 'nullable|string|max:100',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
            'allocations' => 'nullable|array',
            'allocations.*.assessment_line_id' => 'required|exists:acc_assessment_lines,id',
            'allocations.*.amount' => 'required|numeric|min:0',
        ]);

        $payment = $this->accountingService->recordPayment($validated);

        return redirect()->route("{$this->routePrefix}.show", $payment)->with('success', 'Payment recorded.');
    }

    public function show(Payment $payment): InertiaResponse
    {
        $payment->load(['assessment.assessable', 'user', 'allocations.assessmentLine.feeItem']);
        return inertia('accounting/admin/payments/show', compact('payment'));
    }
}

class InvoiceController extends Controller
{
    public function index(): InertiaResponse
    {
        $invoices = \Modules\Accounting\Models\Invoice::with('assessment.assessable')
            ->latest()->paginate(15);
        return inertia('accounting/admin/invoices/index', compact('invoices'));
    }

    public function show(\Modules\Accounting\Models\Invoice $invoice): InertiaResponse
    {
        $invoice->load(['assessment.assessable', 'assessment.lines.feeItem']);
        return inertia('accounting/admin/invoices/show', compact('invoice'));
    }
}

class ChartAccountController extends Controller
{
    public function index(): InertiaResponse
    {
        $accounts = \Modules\Accounting\Models\ChartAccount::with('children')->whereNull('parent_id')->get();
        return inertia('accounting/admin/chart-accounts/index', compact('accounts'));
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'account_code' => 'required|string|max:20|unique:acc_chart_accounts,account_code',
            'name' => 'required|string|max:255',
            'type' => 'required|in:asset,liability,equity,revenue,expense',
            'parent_id' => 'nullable|exists:acc_chart_accounts,id',
        ]);
        \Modules\Accounting\Models\ChartAccount::create($validated);
        return redirect()->route('accounting.admin.chart-accounts.index')->with('success', 'Account created.');
    }

    public function list()
    {
        return response()->json(\Modules\Accounting\Models\ChartAccount::where('is_active', true)->get());
    }
}

class DiscountController extends Controller
{
    protected string $routePrefix = 'accounting.admin.discounts';

    public function index(): InertiaResponse
    {
        $discounts = \Modules\Accounting\Models\Discount::latest()->get();
        return inertia('accounting/admin/discounts/index', compact('discounts'));
    }

    public function create(): InertiaResponse
    {
        return inertia('accounting/admin/discounts/create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_discounts,code',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);
        \Modules\Accounting\Models\Discount::create($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Discount created.');
    }

    public function edit(\Modules\Accounting\Models\Discount $discount): InertiaResponse
    {
        return inertia('accounting/admin/discounts/edit', compact('discount'));
    }

    public function update(Request $request, \Modules\Accounting\Models\Discount $discount): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:acc_discounts,code,' . $discount->id,
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $discount->update($validated);
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Discount updated.');
    }

    public function destroy(\Modules\Accounting\Models\Discount $discount): \Illuminate\Http\RedirectResponse
    {
        $discount->delete();
        return redirect()->route("{$this->routePrefix}.index")->with('success', 'Discount deleted.');
    }
}

class ReportController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(): InertiaResponse
    {
        return inertia('accounting/admin/reports/index');
    }

    public function collections(Request $request): InertiaResponse
    {
        $report = $this->accountingService->getCollectionsReport($request->from, $request->to);
        return inertia('accounting/admin/reports/collections', compact('report'));
    }

    public function aging(): InertiaResponse
    {
        $report = $this->accountingService->getAgingReport();
        return inertia('accounting/admin/reports/aging', compact('report'));
    }

    public function ledger(Request $request): InertiaResponse
    {
        $report = $this->accountingService->getLedgerReport($request->from, $request->to, $request->chart_account_id);
        return inertia('accounting/admin/reports/ledger', compact('report'));
    }

    public function journal(Request $request): InertiaResponse
    {
        $entries = \Modules\Accounting\Models\JournalEntry::with('lines.chartAccount')
            ->when($request->from, fn ($q, $d) => $q->whereDate('entry_date', '>=', $d))
            ->when($request->to, fn ($q, $d) => $q->whereDate('entry_date', '<=', $d))
            ->latest()->paginate(20);
        return inertia('accounting/admin/reports/journal', compact('entries'));
    }
}