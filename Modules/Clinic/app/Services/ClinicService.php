<?php

namespace Modules\Clinic\Services;

use Modules\Clinic\Models\ClinicAppointment;
use Modules\Clinic\Models\Consultation;
use Modules\Clinic\Models\MedicalRecord;
use Modules\Clinic\Models\Referral;

class ClinicService
{
    public function getDashboardStats(): array
    {
        return [
            'total_patients' => MedicalRecord::count(),
            'consultations_today' => Consultation::whereDate('consultation_date', today())->count(),
            'appointments_today' => ClinicAppointment::whereDate('appointment_date', today())->count(),
            'pending_referrals' => Referral::where('status', 'pending')->count(),
            'pending_appointments' => ClinicAppointment::where('status', 'scheduled')->count(),
            'patients_this_month' => MedicalRecord::where('created_at', '>=', now()->startOfMonth())->count(),
        ];
    }

    public function getConsultationStats(): array
    {
        // Monthly grouping in PHP (DB-agnostic: strftime is SQLite-only)
        $monthly = Consultation::whereNotNull('consultation_date')
            ->orderBy('consultation_date')
            ->pluck('consultation_date')
            ->map(fn ($date) => $date->format('Y-m'))
            ->countBy()
            ->toArray();

        return [
            'total' => Consultation::count(),
            'by_diagnosis' => Consultation::selectRaw('diagnosis, count(*) as total')
                ->groupBy('diagnosis')->pluck('total', 'diagnosis')->toArray(),
            'monthly' => $monthly,
        ];
    }
}
