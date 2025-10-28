<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\StoreResolutionRequest;
use App\Modules\USG\Http\Requests\UpdateResolutionRequest;
use App\Modules\USG\Services\ResolutionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResolutionController extends Controller
{
    public function __construct(private ResolutionService $resolutionService) {}

    public function index(Request $request): Response
    {
        $search = $request->get('search');
        $category = $request->get('category');

        if ($search || $category) {
            $resolutions = $this->resolutionService->searchResolutions($search ?? '', [
                'category' => $category,
            ]);
        } else {
            $resolutions = $this->resolutionService->getAllPaginated(15);
        }

        $categories = $this->resolutionService->getCategories();
        $statistics = $this->resolutionService->getStatistics();

        return Inertia::render('usg/admin/resolutions/index', [
            'resolutions' => $resolutions,
            'categories' => $categories,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function create(): Response
    {
        $categories = $this->resolutionService->getCategories();

        return Inertia::render('usg/admin/resolutions/create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreResolutionRequest $request): RedirectResponse
    {
        $resolution = $this->resolutionService->create(
            $request->validated(),
            $request->user()->id
        );

        return redirect()
            ->route('usg.admin.resolutions.index')
            ->with('success', 'Resolution created successfully.');
    }

    public function show(int $id): Response
    {
        $resolution = $this->resolutionService->getById($id);

        return Inertia::render('usg/admin/resolutions/show', [
            'resolution' => $resolution,
        ]);
    }

    public function edit(int $id): Response
    {
        $resolution = $this->resolutionService->getById($id);
        $categories = $this->resolutionService->getCategories();

        return Inertia::render('usg/admin/resolutions/edit', [
            'resolution' => $resolution,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateResolutionRequest $request, int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);

        $this->resolutionService->update(
            $resolution,
            $request->validated()
        );

        return redirect()
            ->route('usg.admin.resolutions.index')
            ->with('success', 'Resolution updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->delete($resolution);

        return redirect()
            ->route('usg.admin.resolutions.index')
            ->with('success', 'Resolution deleted successfully.');
    }

    public function submit(int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->submit($resolution);

        return back()->with('success', 'Resolution submitted for approval.');
    }

    public function pending(): Response
    {
        $resolutions = $this->resolutionService->getPendingResolutions();

        return Inertia::render('usg/admin/resolutions/pending', [
            'resolutions' => $resolutions,
        ]);
    }

    public function approve(int $id, Request $request): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->approve($resolution, $request->user()->id);

        return back()->with('success', 'Resolution approved successfully.');
    }

    public function reject(int $id, Request $request): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->reject($resolution, $request->user()->id);

        return back()->with('success', 'Resolution rejected.');
    }

    public function archive(int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->archive($resolution);

        return back()->with('success', 'Resolution archived successfully.');
    }
}
