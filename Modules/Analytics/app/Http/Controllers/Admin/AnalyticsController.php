<?php

namespace Modules\Analytics\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Analytics\Services\AnalyticsService;

class AnalyticsController extends Controller
{
    public function __construct(private AnalyticsService $service) {}
    public function index()
    {
        $stats = $this->service->getAllStats();
        return inertia('analytics/admin/dashboard', compact('stats'));
    }
}