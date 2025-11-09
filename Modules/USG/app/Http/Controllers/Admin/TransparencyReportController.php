<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Http\Requests\StoreTransparencyReportRequest;
use Modules\USG\Http\Requests\UpdateTransparencyReportRequest;
use Modules\USG\Models\TransparencyReport;
use Modules\USG\Services\TransparencyReportService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TransparencyReportController extends Controller
{
    public function __construct(
        private TransparencyReportService $transparencyReportService
    ) {}

    /**
     * Display a listing of transparency reports
     */
    public function index(Request $request): Response
    {
        $search = $request->get('search');
        $type = $request->get('type');
        $status = $request->get('status');
        $year = $request->get('year');

        if ($search || $type || $status || $year) {
            $reports = $this->transparencyReportService->searchReports($search ?? '', [
                'type' => $type,
                'status' => $status,
                'year' => $year,
            ]);
        } else {
            $reports = $this->transparencyReportService->getAllPaginated(15);
        }

        $types = $this->transparencyReportService->getTypes();
        $statistics = $this->transparencyReportService->getStatistics();

        // Get available years from existing reports
        $years = TransparencyReport::selectRaw('DISTINCT YEAR(report_period_start) as year')
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        return Inertia::render('usg/admin/transparency/index', [
            'reports' => $reports,
            'types' => $types,
            'years' => $years,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'status' => $status,
                'year' => $year,
            ],
        ]);
    }

    /**
     * Show the form for creating a new transparency report
     */
    public function create(): Response
    {
        $types = $this->transparencyReportService->getTypes();

        return Inertia::render('usg/admin/transparency/create', [
            'types' => $types,
        ]);
    }

    /**
     * Store a newly created transparency report
     */
    public function store(StoreTransparencyReportRequest $request): RedirectResponse
    {
        $this->transparencyReportService->create(
            $request->validated(),
            $request->user()->id
        );

        return redirect()
            ->route('usg.admin.transparency.index')
            ->with('success', 'Transparency report created successfully.');
    }

    /**
     * Display the specified transparency report
     */
    public function show(TransparencyReport $transparencyReport): Response
    {
        $transparencyReport->load('createdBy');

        return Inertia::render('usg/admin/transparency/show', [
            'report' => $transparencyReport,
        ]);
    }

    /**
     * Show the form for editing the specified transparency report
     */
    public function edit(TransparencyReport $transparencyReport): Response
    {
        $transparencyReport->load('createdBy');
        $types = $this->transparencyReportService->getTypes();

        return Inertia::render('usg/admin/transparency/edit', [
            'report' => $transparencyReport,
            'types' => $types,
        ]);
    }

    /**
     * Update the specified transparency report
     */
    public function update(UpdateTransparencyReportRequest $request, TransparencyReport $transparencyReport): RedirectResponse
    {
        $this->transparencyReportService->update($transparencyReport, $request->validated());

        return redirect()
            ->route('usg.admin.transparency.index')
            ->with('success', 'Transparency report updated successfully.');
    }

    /**
     * Remove the specified transparency report
     */
    public function destroy(TransparencyReport $transparencyReport): RedirectResponse
    {
        $this->transparencyReportService->delete($transparencyReport);

        return redirect()
            ->route('usg.admin.transparency.index')
            ->with('success', 'Transparency report deleted successfully.');
    }

    /**
     * Publish the specified transparency report
     */
    public function publish(TransparencyReport $transparencyReport): RedirectResponse
    {
        $this->transparencyReportService->publish($transparencyReport);

        return back()->with('success', 'Transparency report published successfully.');
    }

    /**
     * Unpublish the specified transparency report
     */
    public function unpublish(TransparencyReport $transparencyReport): RedirectResponse
    {
        $this->transparencyReportService->unpublish($transparencyReport);

        return back()->with('success', 'Transparency report unpublished successfully.');
    }

    /**
     * Download the specified transparency report
     */
    public function download(TransparencyReport $transparencyReport): BinaryFileResponse
    {
        if (! $transparencyReport->file_path || ! Storage::disk('public')->exists($transparencyReport->file_path)) {
            abort(404, 'Report file not found');
        }

        // Increment download count
        $this->transparencyReportService->incrementDownloadCount($transparencyReport);

        return response()->download(
            Storage::disk('public')->path($transparencyReport->file_path),
            $transparencyReport->file_name
        );
    }
}
