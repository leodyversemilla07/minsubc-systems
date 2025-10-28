<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Enums\FOIRequestStatus;
use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\AddFOIResponseRequest;
use App\Modules\USG\Http\Requests\UpdateFOIStatusRequest;
use App\Modules\USG\Models\FOIRequest;
use App\Modules\USG\Services\FOIService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FOIRequestAdminController extends Controller
{
    public function __construct(protected FOIService $foiService) {}

    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $query = FOIRequest::with(['user', 'reviewer']);

        if ($status && in_array($status, FOIRequestStatus::values())) {
            $query->where('status', $status);
        }

        $requests = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('usg/admin/foi/index', [
            'requests' => $requests,
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    public function show(FOIRequest $foiRequest): Response
    {
        $foiRequest->load(['user', 'reviewer', 'responses.responder']);

        return Inertia::render('usg/admin/foi/show', [
            'request' => $foiRequest,
        ]);
    }

    public function updateStatus(UpdateFOIStatusRequest $request, FOIRequest $foiRequest): RedirectResponse
    {
        $validated = $request->validated();

        $this->foiService->updateStatus(
            $foiRequest->id,
            FOIRequestStatus::from($validated['status']),
            $request->user()->id,
            $validated['rejection_reason'] ?? null
        );

        return back()->with('success', 'Request status updated successfully.');
    }

    public function addResponse(AddFOIResponseRequest $request, FOIRequest $foiRequest): RedirectResponse
    {
        $validated = $request->validated();

        $this->foiService->addResponse(
            $foiRequest->id,
            $request->user()->id,
            $validated['response_text'] ?? null,
            $validated['document'] ?? null
        );

        return back()->with('success', 'Response added successfully.');
    }

    public function updateNotes(Request $request, FOIRequest $foiRequest): RedirectResponse
    {
        $validated = $request->validate([
            'internal_notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $this->foiService->addInternalNote($foiRequest->id, $validated['internal_notes'] ?? '');

        return back()->with('success', 'Internal notes updated successfully.');
    }
}
