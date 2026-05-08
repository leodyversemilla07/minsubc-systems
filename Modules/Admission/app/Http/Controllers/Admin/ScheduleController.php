<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\Schedule;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\ScheduleService;

class ScheduleController extends Controller
{
    public function __construct(
        private ScheduleService $scheduleService
    ) {}

    public function index(Request $request): Response
    {
        $query = Schedule::with(['section.course', 'subject', 'instructor'])
            ->when($request->section_id, fn ($q, $id) => $q->where('section_id', $id))
            ->when($request->instructor_id, fn ($q, $id) => $q->where('instructor_id', $id))
            ->when($request->day, fn ($q, $d) => $q->where('day', $d))
            ->when($request->room, fn ($q, $r) => $q->where('room', $r));

        $schedules = $query->orderBy('day')->orderBy('start_time')->paginate(20)->withQueryString();

        $sections = Section::with('course')->get(['id', 'name']);
        $instructors = \App\Models\User::role(['faculty'])->orderBy('first_name')->get(['id', 'name']);
        $rooms = Schedule::whereNotNull('room')->distinct()->pluck('room');

        return Inertia::render('admission/admin/schedules/index', [
            'schedules' => $schedules,
            'sections' => $sections,
            'instructors' => $instructors,
            'rooms' => $rooms,
            'filters' => $request->only(['section_id', 'instructor_id', 'day', 'room']),
        ]);
    }

    public function create(Request $request): Response
    {
        $sections = Section::with('course:id,code,name')->get(['id', 'name', 'course_id']);
        $subjects = Subject::active()->orderBy('code')->get(['id', 'code', 'name', 'units']);
        $selectedSection = $request->section_id ? Section::with('course:id,code,name')->find($request->section_id, ['id', 'name', 'course_id']) : null;

        return Inertia::render('admission/admin/schedules/create', [
            'sections' => $sections,
            'subjects' => $subjects,
            'selectedSection' => $selectedSection,
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

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
            return redirect()
                ->route('admission.admin.sections.show', $section)
                ->with('success', 'Schedule created successfully.');
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.schedules.create')
                ->with('error', $e->getMessage())
                ->withInput();
        }
    }

    public function show(Schedule $schedule): Response
    {
        $schedule->load(['section.course', 'subject', 'instructor']);

        return Inertia::render('admission/admin/schedules/show', [
            'schedule' => $schedule->toArray() + [
                'section' => $schedule->section ? $schedule->section->toArray() + ['course' => $schedule->section->course?->toArray()] : null,
                'subject' => $schedule->subject?->toArray(),
                'instructor' => $schedule->instructor ? ['id' => $schedule->instructor->id, 'name' => $schedule->instructor->name] : null,
            ],
        ]);
    }

    public function edit(Schedule $schedule): Response
    {
        $sections = Section::with('course:id,code,name')->get(['id', 'name', 'course_id']);
        $subjects = Subject::active()->orderBy('code')->get(['id', 'code', 'name', 'units']);
        $instructors = \App\Models\User::role(['faculty'])->orderBy('first_name')->get(['id', 'name']);

        return Inertia::render('admission/admin/schedules/edit', [
            'schedule' => $schedule->load('section'),
            'sections' => $sections,
            'subjects' => $subjects,
            'instructors' => $instructors,
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

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
            return redirect()
                ->route('admission.admin.sections.show', $schedule->section)
                ->with('success', 'Schedule updated successfully.');
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.schedules.edit', $schedule)
                ->with('error', $e->getMessage())
                ->withInput();
        }
    }

    public function destroy(Schedule $schedule): RedirectResponse
    {
        $section = $schedule->section;
        $this->scheduleService->removeSchedule($schedule);

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', 'Schedule deleted successfully.');
    }

    public function instructorSchedule(Request $request, int $instructorId): Response
    {
        $schedules = $this->scheduleService->getInstructorSchedule($instructorId, $request->term_id);
        $instructor = \App\Models\User::find($instructorId, ['id', 'name']);

        $scheduleByDay = [];
        foreach ($schedules as $schedule) {
            $scheduleByDay[$schedule->day][] = $schedule->toArray() + [
                'section' => $schedule->section ? ['id' => $schedule->section->id, 'name' => $schedule->section->name, 'course' => $schedule->section->course ? $schedule->section->course->toArray() : null] : null,
                'subject' => $schedule->subject?->toArray(),
                'instructor' => $schedule->instructor ? ['id' => $schedule->instructor->id, 'name' => $schedule->instructor->name] : null,
            ];
        }

        $terms = \Modules\Admission\Models\AcademicTerm::orderBy('academic_year', 'desc')->get(['id', 'academic_year', 'semester']);

        return Inertia::render('admission/admin/schedules/instructor', [
            'instructor' => $instructor,
            'scheduleByDay' => $scheduleByDay,
            'terms' => $terms,
            'selectedTerm' => $request->term_id,
        ]);
    }

    public function roomSchedule(Request $request, string $room): Response
    {
        $schedules = $this->scheduleService->getRoomSchedule($room, $request->term_id);

        $scheduleByDay = [];
        foreach ($schedules as $schedule) {
            $scheduleByDay[$schedule->day][] = $schedule->toArray() + [
                'section' => $schedule->section ? ['id' => $schedule->section->id, 'name' => $schedule->section->name, 'course' => $schedule->section->course ? $schedule->section->course->toArray() : null] : null,
                'subject' => $schedule->subject?->toArray(),
                'instructor' => $schedule->instructor ? ['id' => $schedule->instructor->id, 'name' => $schedule->instructor->name] : null,
            ];
        }

        $terms = \Modules\Admission\Models\AcademicTerm::orderBy('academic_year', 'desc')->get(['id', 'academic_year', 'semester']);

        return Inertia::render('admission/admin/schedules/room', [
            'room' => $room,
            'scheduleByDay' => $scheduleByDay,
            'terms' => $terms,
            'selectedTerm' => $request->term_id,
        ]);
    }
}