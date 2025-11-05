<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Http\Requests\StoreResolutionRequest;
use Modules\USG\Http\Requests\UpdateResolutionRequest;
use Modules\USG\Services\ResolutionService;

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
        $statuses = ['published', 'archived'];

        return Inertia::render('usg/admin/resolutions/create', [
            'categories' => $categories,
            'statuses' => $statuses,
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
        $statuses = ['published', 'archived'];

        return Inertia::render('usg/admin/resolutions/edit', [
            'resolution' => $resolution,
            'categories' => $categories,
            'statuses' => $statuses,
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

    public function archive(int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->archive($resolution);

        return back()->with('success', 'Resolution archived successfully.');
    }

    public function unarchive(int $id): RedirectResponse
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->unarchive($resolution);

        return back()->with('success', 'Resolution restored successfully.');
    }
}
