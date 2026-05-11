<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Services\CurriculumService;

class DashboardController extends Controller
{
    public function __construct(protected CurriculumService $curriculumService) {}

    public function index(): InertiaResponse
    {
        $stats = $this->curriculumService->getDashboardStats();
        return inertia('curriculum/admin/dashboard/index', compact('stats'));
    }
}



