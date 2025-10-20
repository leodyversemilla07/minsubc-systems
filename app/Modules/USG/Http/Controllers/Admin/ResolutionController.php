<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\ResolutionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResolutionController extends Controller
{
    public function __construct(private ResolutionService $resolutionService) {}

    public function index(Request $request)
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

    public function create()
    {
        $categories = $this->resolutionService->getCategories();

        return Inertia::render('usg/admin/resolutions/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $resolution = $this->resolutionService->create(
            $request->validated(),
            Auth::id()
        );

        return redirect()
            ->route('usg.admin.resolutions.index')
            ->with('success', 'Resolution created successfully.');
    }

    public function show(int $id)
    {
        $resolution = $this->resolutionService->getById($id);

        return Inertia::render('usg/admin/resolutions/show', [
            'resolution' => $resolution,
        ]);
    }

    public function edit(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $categories = $this->resolutionService->getCategories();

        return Inertia::render('usg/admin/resolutions/edit', [
            'resolution' => $resolution,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, int $id)
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

    public function destroy(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->delete($resolution);

        return redirect()
            ->route('usg.admin.resolutions.index')
            ->with('success', 'Resolution deleted successfully.');
    }

    public function submit(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->submit($resolution);

        return back()->with('success', 'Resolution submitted for approval.');
    }

    public function pending()
    {
        $resolutions = $this->resolutionService->getPendingResolutions();

        return Inertia::render('usg/admin/resolutions/pending', [
            'resolutions' => $resolutions,
        ]);
    }

    public function approve(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->approve($resolution, Auth::id());

        return back()->with('success', 'Resolution approved successfully.');
    }

    public function reject(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->reject($resolution, Auth::id());

        return back()->with('success', 'Resolution rejected.');
    }

    public function archive(int $id)
    {
        $resolution = $this->resolutionService->getById($id);
        $this->resolutionService->archive($resolution);

        return back()->with('success', 'Resolution archived successfully.');
    }
}
