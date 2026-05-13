<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\Alumnus;
use Modules\Alumni\Models\AlumniEvent;
use Modules\Alumni\Models\Donation;
use Modules\Alumni\Services\AlumniService;

class DashboardController extends Controller
{
    public function __construct(
        protected AlumniService $alumniService
    ) {}

    public function index()
    {
        return Inertia::render('alumni/admin/dashboard', [
            'stats' => $this->alumniService->getDashboardStats(),
        ]);
    }
}