<?php

namespace Modules\Facilities\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Facilities\Models\Reservation;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('facility', 'user')
            ->latest()->paginate(10);
        return inertia('facilities/admin/reservations/index', compact('reservations'));
    }

    public function show(Reservation $reservation)
    {
        $reservation->load('facility', 'user', 'equipmentReservations.equipment');
        return inertia('facilities/admin/reservations/show', compact('reservation'));
    }

    public function approve(Reservation $reservation)
    {
        $reservation->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);
        return back()->with('success', 'Reservation approved.');
    }

    public function reject(Request $request, Reservation $reservation)
    {
        $reservation->update([
            'status' => 'rejected',
            'notes' => $request->input('notes', $reservation->notes),
        ]);
        return back()->with('success', 'Reservation rejected.');
    }

    public function complete(Reservation $reservation)
    {
        $reservation->update(['status' => 'completed']);
        return back()->with('success', 'Reservation marked completed.');
    }
}