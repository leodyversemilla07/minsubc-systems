<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\USG\Models\TransparencyReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PublicTransparencyController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TransparencyReport::query()
            ->with('createdBy:id,first_name,last_name')
            ->published()
            ->orderBy('published_at', 'desc');

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by year
        if ($request->filled('year')) {
            $year = (int) $request->year;
            $query->where(function ($q) use ($year) {
                $q->whereBetween('report_period_start', ["{$year}-01-01", "{$year}-12-31"])
                    ->orWhereBetween('report_period_end', ["{$year}-01-01", "{$year}-12-31"]);
            });
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        $reports = $query->paginate(12);

        // Get available filter options
        $types = TransparencyReport::published()
            ->distinct()
            ->pluck('type')
            ->sort()
            ->values();

        $years = TransparencyReport::published()
            ->selectRaw('YEAR(report_period_start) as year')
            ->union(
                TransparencyReport::published()
                    ->selectRaw('YEAR(report_period_end) as year')
            )
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // Get statistics
        $stats = [
            'total_reports' => TransparencyReport::published()->count(),
            'financial_reports' => TransparencyReport::published()->ofType('financial')->count(),
            'meeting_minutes' => TransparencyReport::published()->ofType('meeting_minutes')->count(),
            'total_downloads' => TransparencyReport::published()->sum('download_count'),
        ];

        return Inertia::render('usg/public/transparency/index', [
            'reports' => $reports,
            'types' => $types,
            'years' => $years,
            'stats' => $stats,
            'filters' => $request->only(['type', 'year', 'search']),
        ]);
    }

    public function show(TransparencyReport $transparencyReport): Response
    {
        abort_unless($transparencyReport->status === 'published', 404);

        $transparencyReport->load('createdBy:id,first_name,last_name');
        $transparencyReport->incrementViewCount();

        // Get related reports
        $relatedReports = TransparencyReport::published()
            ->where('id', '!=', $transparencyReport->id)
            ->where('type', $transparencyReport->type)
            ->limit(3)
            ->get(['id', 'title', 'slug', 'type', 'published_at']);

        return Inertia::render('usg/public/transparency/show', [
            'report' => $transparencyReport,
            'relatedReports' => $relatedReports,
        ]);
    }

    public function download(TransparencyReport $transparencyReport): BinaryFileResponse
    {
        abort_unless($transparencyReport->status === 'published', 404);
        abort_unless($transparencyReport->file_path && file_exists(storage_path('app/'.$transparencyReport->file_path)), 404);

        $transparencyReport->incrementDownloadCount();

        return response()->download(
            storage_path('app/'.$transparencyReport->file_path),
            $transparencyReport->file_name ?: 'transparency-report.pdf'
        );
    }
}
