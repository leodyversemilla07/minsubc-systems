<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Modules\Admission\Models\Schedule;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\ScheduleService;

class ScheduleController extends Controller
{
    public function __construct(
        private ScheduleService $scheduleService
    ) {}

    /**
     * Display a listing of schedules.
     */
    public function index(Request $request): View
    {
        $query = Schedule::with(['section.course', 'subject', 'instructor'])
            ->when($request->section_id, fn ($q, $id) => $q->where('section_id', $id))
            ->when($request->instructor_id, fn ($q, $id) => $q->where('instructor_id', $id))
            ->when($request->day, fn ($q, $d) => $q->where('day', $d))
            ->when($request->room, fn ($q, $r) => $q->where('room', $r));

        $schedules = $query->orderBy('day')->orderBy('start_time')->paginate(20)->withQueryString();

        $sections = Section::with('course')->get();
        $instructors = \App\Models\User::role(['faculty'])->orderBy('first_name')->get();
        $rooms = Schedule::whereNotNull('room')->distinct()->pluck('room');

        return view('admission::admin.schedules.index', [
            'schedules' => $schedules,
            'sections' => $sections,
            'instructors' => $instructors,
            'rooms' => $rooms,
            'filters' => $request->only(['section_id', 'instructor_id', 'day', 'room']),
        ]);
    }

    /**
     * Show the form for creating a new schedule.
     */
    public function create(Request $request): View
    {
        $sections = Section::with('course')->get();
        $subjects = Subject::active()->orderBy('code')->get();

        $selectedSection = $request->section_id ? Section::with('course')->find($request->section_id) : null;

        return view('admission::admin.schedules.create', [
            'sections' => $sections,
            'subjects' => $subjects,
            'selectedSection' => $selectedSection,
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

    /**
     * Store a newly created schedule.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'section_id' => 'required|exists:admission_sections,id',
            'subject_id' => 'required|exists:admission_subjects,id',
            'day' => 'required|string|max:20',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'room' => 'nullable|string|max:50',
            'instructor_id' => 'nullable|exists:users,id',
            'type' => 'required|in:lec,lab',
            'notes' => 'nullable|string',
        ]);

        $section = Section::find($validated['section_id']);

        try {
            $this->scheduleService->addSchedule($section, $validated);
            $message = 'Schedule created successfully.';
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.schedules.create')
                ->with('error', $e->getMessage())
                ->withInput();
        }

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', $message);
    }

    /**
     * Display the specified schedule.
     */
    public function show(Schedule $schedule): View
    {
        $schedule->load(['section.course', 'subject', 'instructor']);

        return view('admission::admin.schedules.show', [
            'schedule' => $schedule,
        ]);
    }

    /**
     * Show the form for editing the specified schedule.
     */
    public function edit(Schedule $schedule): View
    {
        $sections = Section::with('course')->get();
        $subjects = Subject::active()->orderBy('code')->get();
        $instructors = \App\Models\User::role(['faculty'])->orderBy('first_name')->get();

        return view('admission::admin.schedules.edit', [
            'schedule' => $schedule,
            'sections' => $sections,
            'subjects' => $subjects,
            'instructors' => $instructors,
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

    /**
     * Update the specified schedule.
     */
    public function update(Request $request, Schedule $schedule): RedirectResponse
    {
        $validated = $request->validate([
            'section_id' => 'required|exists:admission_sections,id',
            'subject_id' => 'required|exists:admission_subjects,id',
            'day' => 'required|string|max:20',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'room' => 'nullable|string|max:50',
            'instructor_id' => 'nullable|exists:users,id',
            'type' => 'required|in:lec,lab',
            'notes' => 'nullable|string',
        ]);

        try {
            $this->scheduleService->updateSchedule($schedule, $validated);
            $message = 'Schedule updated successfully.';
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.schedules.edit', $schedule)
                ->with('error', $e->getMessage())
                ->withInput();
        }

        return redirect()
            ->route('admission.admin.sections.show', $schedule->section)
            ->with('success', $message);
    }

    /**
     * Remove the specified schedule.
     */
    public function destroy(Schedule $schedule): RedirectResponse
    {
        $section = $schedule->section;
        $this->scheduleService->removeSchedule($schedule);

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', 'Schedule deleted successfully.');
    }

    /**
     * Get instructor's schedule.
     */
    public function instructorSchedule(Request $request, int $instructorId): View
    {
        $schedules = $this->scheduleService->getInstructorSchedule($instructorId, $request->term_id);

        $instructor = \App\Models\User::find($instructorId);

        $scheduleByDay = [];
        foreach ($schedules as $schedule) {
            $scheduleByDay[$schedule->day][] = $schedule;
        }

        $terms = \Modules\Admission\Models\AcademicTerm::orderBy('academic_year', 'desc')->get();

        return view('admission::admin.schedules.instructor', [
            'instructor' => $instructor,
            'scheduleByDay' => $scheduleByDay,
            'terms' => $terms,
            'selectedTerm' => $request->term_id,
        ]);
    }

    /**
     * Get room schedule.
     */
    public function roomSchedule(Request $request, string $room): View
    {
        $schedules = $this->scheduleService->getRoomSchedule($room, $request->term_id);

        $scheduleByDay = [];
        foreach ($schedules as $schedule) {
            $scheduleByDay[$schedule->day][] = $schedule;
        }

        $terms = \Modules\Admission\Models\AcademicTerm::orderBy('academic_year', 'desc')->get();

        return view('admission::admin.schedules.room', [
            'room' => $room,
            'scheduleByDay' => $scheduleByDay,
            'terms' => $terms,
            'selectedTerm' => $request->term_id,
        ]);
    }
}