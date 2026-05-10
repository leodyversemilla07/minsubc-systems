<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\LeaveType;
use Modules\HR\Models\Employee;

class LeaveController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $leaves = LeaveRequest::with(['employee:id,employee_id,first_name,last_name,department_id', 'leaveType', 'approver:id,first_name,last_name'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->leave_type, fn ($q, $t) => $q->where('leave_type_id', $t))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $leaveTypes = LeaveType::where('is_active', true)->get();
        $summary = [
            'pending' => LeaveRequest::where('status', 'pending')->count(),
            'approved' => LeaveRequest::where('status', 'approved')->count(),
            'rejected' => LeaveRequest::where('status', 'rejected')->count(),
        ];

        return inertia('hr/admin/leave/index', [
            'leaves' => $leaves,
            'leaveTypes' => $leaveTypes,
            'summary' => $summary,
            'filters' => $request->only(['status', 'leave_type']),
        ]);
    }

    public function show(LeaveRequest $leaveRequest): InertiaResponse
    {
        $leaveRequest->load(['employee', 'leaveType', 'approver']);
        return inertia('hr/admin/leave/show', compact('leaveRequest'));
    }

    public function approve(Request $request, LeaveRequest $leaveRequest): RedirectResponse
    {
        $validated = $request->validate(['approval_notes' => 'nullable|string']);
        $leaveRequest->update([
            'status' => 'approved',
            'approved_by' => auth()->user()->employee?->id ?? Employee::where('user_id', auth()->id())->first()?->id,
            'approved_at' => now(),
            'approval_notes' => $validated['approval_notes'] ?? null,
        ]);

        return redirect()->route('hr.admin.leave.index')
            ->with('success', 'Leave request approved.');
    }

    public function reject(Request $request, LeaveRequest $leaveRequest): RedirectResponse
    {
        $validated = $request->validate(['approval_notes' => 'required|string']);
        $leaveRequest->update([
            'status' => 'rejected',
            'approved_by' => auth()->user()->employee?->id ?? Employee::where('user_id', auth()->id())->first()?->id,
            'approved_at' => now(),
            'approval_notes' => $validated['approval_notes'],
        ]);

        return redirect()->route('hr.admin.leave.index')
            ->with('success', 'Leave request rejected.');
    }
}