<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
class DashboardController extends Controller
{
    public function __construct(protected ResearchService $researchService) {}
    public function index(): InertiaResponse
    {
        $stats = $this->researchService->getDashboardStats();
        return inertia('research/admin/dashboard/index', compact('stats'));
    }
}


