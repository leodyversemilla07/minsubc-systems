<?php

namespace Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Services\SearchService;

class SearchController extends Controller
{
    public function __construct(
        protected SearchService $searchService
    ) {}

    /**
     * Display global search results
     */
    public function index(Request $request): Response
    {
        $query = $request->input('q');
        $type = $request->input('type'); // announcements, resolutions, documents, or null for all

        if (! $query) {
            return Inertia::render('usg/search', [
                'query' => null,
                'results' => null,
                'popularSearches' => $this->searchService->getPopularSearches(),
            ]);
        }

        $results = $this->searchService->globalSearch($query, $type);
        $totalResults = $this->searchService->getTotalResults($query);

        return Inertia::render('usg/search', [
            'query' => $query,
            'type' => $type,
            'results' => $results,
            'totalResults' => $totalResults,
            'popularSearches' => $this->searchService->getPopularSearches(),
        ]);
    }

    /**
     * Get search suggestions (AJAX endpoint)
     */
    public function suggestions(Request $request): JsonResponse
    {
        $query = $request->input('q');

        if (! $query || strlen($query) < 2) {
            return response()->json([]);
        }

        $suggestions = $this->searchService->getSearchSuggestions($query);

        return response()->json($suggestions);
    }
}
