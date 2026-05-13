<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Services\AlumniService;

class ReportController extends Controller
{
    public function __construct(
        protected AlumniService $alumniService
    ) {}

    public function index()
    {
        return Inertia::render('alumni/admin/reports/index');
    }

    public function employment()
    {
        $stats = $this->alumniService->getEmploymentStats();
        return Inertia::render('alumni/admin/reports/employment', ['stats' => $stats]);
    }

    public function donations()
    {
        $summary = $this->alumniService->getDonationSummary();
        return Inertia::render('alumni/admin/reports/donations', ['summary' => $summary]);
    }

    public function tracer(\Illuminate\Http\Request $request)
    {
        $data = $this->alumniService->getTracerData($request->only(['year', 'college']));
        return Inertia::render('alumni/admin/reports/tracer', [
            'data' => $data,
            'filters' => $request->only(['year', 'college']),
        ]);
    }
}