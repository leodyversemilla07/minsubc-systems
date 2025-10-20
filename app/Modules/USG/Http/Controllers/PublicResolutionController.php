<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\ResolutionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicResolutionController extends Controller
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
            $resolutions = $this->resolutionService->getPublishedResolutions(12);
        }

        $categories = $this->resolutionService->getCategories();
        $statistics = $this->resolutionService->getStatistics();

        return Inertia::render('usg/public/resolutions/index', [
            'resolutions' => $resolutions,
            'categories' => $categories,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function show(string $resolutionNumber)
    {
        $resolution = $this->resolutionService->getByNumber($resolutionNumber);

        if (! $resolution) {
            abort(404, 'Resolution not found');
        }

        $related = $this->resolutionService->getRelatedResolutions($resolution, 3);

        return Inertia::render('usg/public/resolutions/show', [
            'resolution' => $resolution,
            'related' => $related,
        ]);
    }
}
