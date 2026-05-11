<?php

namespace Modules\Guidance\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Assessment;
use Modules\Guidance\Models\Referral;
use Modules\Guidance\Models\Intervention;
use Modules\Guidance\Models\IncidentReport;
use Modules\Guidance\Models\InterventionParticipant;
use Modules\Guidance\Services\GuidanceService;
use App\Models\Student;

class ReportController extends Controller
{
    public function __construct(
        protected GuidanceService $guidanceService
    ) {}

    public function index(): InertiaResponse
    {
        return inertia('guidance/admin/reports/index');
    }

    public function appointmentsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getAppointmentsReport();
        return inertia('guidance/admin/reports/appointments', compact('report'));
    }

    public function sessionsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getSessionsReport();
        return inertia('guidance/admin/reports/sessions', compact('report'));
    }

    public function incidentsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getIncidentsReport();
        return inertia('guidance/admin/reports/incidents', compact('report'));
    }
}