<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\StoreFOIRequestRequest;
use App\Modules\USG\Models\FOIRequest;
use App\Modules\USG\Services\FOIService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FOIRequestController extends Controller
{
    public function __construct(protected FOIService $foiService) {}

    public function index(Request $request): Response
    {
        $requests = $this->foiService->getUserRequests($request->user()->id);

        return Inertia::render('usg/foi/index', [
            'requests' => $requests,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('usg/foi/create');
    }

    public function store(StoreFOIRequestRequest $request): RedirectResponse
    {
        $foiRequest = $this->foiService->submitRequest(
            $request->user()->id,
            $request->validated()
        );

        return redirect()
            ->route('usg.foi.show', $foiRequest)
            ->with('success', 'Your FOI request has been submitted successfully.');
    }

    public function show(Request $request, FOIRequest $foiRequest): Response
    {
        $user = $request->user();

        if ($foiRequest->user_id !== $user->id && ! $user->hasAnyRole(['usg-admin', 'super-admin'])) {
            abort(403, 'You do not have permission to view this request.');
        }

        $foiRequest->load(['responses.responder', 'reviewer']);

        return Inertia::render('usg/foi/show', [
            'request' => $foiRequest,
        ]);
    }
}
