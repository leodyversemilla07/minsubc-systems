<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\ClinicAppointment;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = ClinicAppointment::orderBy('appointment_date', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/appointments/index', ['appointments' => $appointments]);
    }

    public function create()
    {
        return Inertia::render('clinic/admin/appointments/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'nullable|string',
            'appointment_date' => 'required|date',
            'appointment_type' => 'required|string',
            'reason' => 'nullable|string',
        ]);
        ClinicAppointment::create($validated);
        return redirect()->route('clinic.admin.appointments.index')->with('success', 'Appointment created.');
    }

    public function show(ClinicAppointment $appointment)
    {
        return Inertia::render('clinic/admin/appointments/show', ['appointment' => $appointment]);
    }

    public function edit(ClinicAppointment $appointment)
    {
        return Inertia::render('clinic/admin/appointments/edit', ['appointment' => $appointment]);
    }

    public function update(\Illuminate\Http\Request $request, ClinicAppointment $appointment)
    {
        $validated = $request->validate([
            'appointment_date' => 'required|date',
            'status' => 'required|string',
        ]);
        $appointment->update($validated);
        return redirect()->route('clinic.admin.appointments.index')->with('success', 'Appointment updated.');
    }

    public function destroy(ClinicAppointment $appointment)
    {
        $appointment->delete();
        return redirect()->route('clinic.admin.appointments.index')->with('success', 'Appointment deleted.');
    }
}