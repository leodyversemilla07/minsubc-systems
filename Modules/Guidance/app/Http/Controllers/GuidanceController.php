<?php

namespace Modules\Guidance\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\CounselingSession;

class GuidanceController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'counselors' => Counselor::where('is_active', true)->count(),
            'appointments_this_month' => Appointment::whereMonth('created_at', now()->month)->count(),
            'sessions_completed' => CounselingSession::where('status', 'completed')->count(),
        ];
        return inertia('guidance/index', compact('stats'));
    }
}