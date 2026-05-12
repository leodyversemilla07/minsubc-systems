<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Services\ResearchService;
class ReportController extends Controller
{
    public function __construct(protected ResearchService $researchService) {}
    public function index(): InertiaResponse { return inertia('research/admin/reports/index'); }
    public function proposalsStatus(): InertiaResponse { return inertia('research/admin/reports/proposals-status', ['report' => $this->researchService->getProposalsStatus()]); }
    public function panelSummary(): InertiaResponse { return inertia('research/admin/reports/panel-summary', ['report' => $this->researchService->getPanelSummary()]); }
}
