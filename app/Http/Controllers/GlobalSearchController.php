<?php

namespace App\Http\Controllers;

use App\Services\GlobalSearchService;
use Illuminate\Http\Request;

class GlobalSearchController extends Controller
{
    public function __construct(private GlobalSearchService $searchService) {}

    public function search(Request $request)
    {
        $query = $request->input('q', '');

        if (strlen(trim($query)) < 2) {
            return response()->json([]);
        }

        $results = $this->searchService->search($query);

        return response()->json($results);
    }
}