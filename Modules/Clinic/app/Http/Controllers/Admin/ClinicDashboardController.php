<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Services\ClinicService;
use Modules\Clinic\Models\MedicalRecord;
use Modules\Clinic\Models\Consultation;
use Modules\Clinic\Models\ClinicAppointment;
use Modules\Clinic\Models\PhysicalExam;

class ClinicDashboardController extends Controller
{
    public function __construct(
        protected ClinicService $clinicService
    ) {}

    public function index()
    {
        return Inertia::render('clinic/admin/dashboard', [
            'stats' => $this->clinicService->getDashboardStats(),
        ]);
    }
}