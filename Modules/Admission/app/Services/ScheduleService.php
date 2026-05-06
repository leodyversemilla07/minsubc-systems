<?php

namespace Modules\Admission\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Schedule;
use Modules\Admission\Models\Subject;

class ScheduleService
{
    /**
     * Create a new section
     */
    public function createSection(array $data): Section
    {
        return DB::transaction(function () use ($data) {
            $section = Section::create([
                'academic_term_id' => $data['academic_term_id'],
                'course_id' => $data['course_id'],
                'name' => $data['name'],
                'year_level' => $data['year_level'],
                'max_students' => $data['max_students'] ?? 40,
                'adviser_id' => $data['adviser_id'] ?? null,
                'status' => 'open',
                'room' => $data['room'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            return $section;
        });
    }

    /**
     * Update a section
     */
    public function updateSection(Section $section, array $data): Section
    {
        $section->update($data);

        return $section->fresh();
    }

    /**
     * Add a schedule to a section
     */
    public function addSchedule(Section $section, array $data): Schedule
    {
        // Validate no time conflict
        $this->validateNoConflict($section, $data);

        return Schedule::create([
            'section_id' => $section->id,
            'subject_id' => $data['subject_id'],
            'day' => $data['day'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'room' => $data['room'] ?? null,
            'instructor_id' => $data['instructor_id'] ?? null,
            'type' => $data['type'] ?? 'lec',
            'notes' => $data['notes'] ?? null,
        ]);
    }

    /**
     * Update a schedule
     */
    public function updateSchedule(Schedule $schedule, array $data): Schedule
    {
        if (isset($data['day']) || isset($data['start_time']) || isset($data['end_time'])) {
            $this->validateNoConflict(
                $schedule->section,
                $data,
                $schedule->id
            );
        }

        $schedule->update($data);

        return $schedule->fresh();
    }

    /**
     * Remove a schedule
     */
    public function removeSchedule(Schedule $schedule): void
    {
        $schedule->delete();
    }

    /**
     * Validate no time conflict exists
     */
    protected function validateNoConflict(Section $section, array $data, ?int $excludeScheduleId = null): void
    {
        $day = $data['day'];
        $startTime = $data['start_time'];
        $endTime = $data['end_time'];

        $conflicting = Schedule::where('section_id', $section->id)
            ->where('id', '!=', $excludeScheduleId ?? 0)
            ->where('day', $day)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($q) use ($startTime, $endTime) {
                        $q->where('start_time', '<=', $startTime)
                          ->where('end_time', '>=', $endTime);
                    });
            })
            ->exists();

        if ($conflicting) {
            throw new \RuntimeException('This schedule conflicts with an existing class schedule.');
        }
    }

    /**
     * Get schedules for a section
     */
    public function getSectionSchedule(Section $section): Collection
    {
        return $section->schedules()
            ->with(['subject', 'instructor'])
            ->orderBy('day')
            ->orderBy('start_time')
            ->get();
    }

    /**
     * Get instructor's schedule
     */
    public function getInstructorSchedule(int $instructorId, ?int $termId = null): Collection
    {
        $query = Schedule::with(['section.course', 'subject'])
            ->where('instructor_id', $instructorId);

        if ($termId) {
            $query->whereHas('section', fn ($q) => $q->where('academic_term_id', $termId));
        }

        return $query->orderBy('day')
            ->orderBy('start_time')
            ->get();
    }

    /**
     * Get room schedule
     */
    public function getRoomSchedule(string $room, ?int $termId = null): Collection
    {
        $query = Schedule::with(['section', 'subject', 'instructor'])
            ->where('room', $room);

        if ($termId) {
            $query->whereHas('section', fn ($q) => $q->where('academic_term_id', $termId));
        }

        return $query->orderBy('day')
            ->orderBy('start_time')
            ->get();
    }

    /**
     * Get available subjects for a section based on year level and semester
     */
    public function getAvailableSubjects(int $courseId, int $yearLevel, string $semester): Collection
    {
        return Subject::where('course_id', $courseId)
            ->where('year_level', $yearLevel)
            ->where(function ($query) use ($semester) {
                $query->where('semester', $semester)
                    ->orWhere('semester', 'All');
            })
            ->active()
            ->orderBy('code')
            ->get();
    }

    /**
     * Auto-generate schedules for a section based on subjects
     */
    public function autoGenerateSchedules(Section $section, array $subjects, array $timeSlots, array $rooms): void
    {
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        foreach ($subjects as $subjectId) {
            $subject = Subject::find($subjectId);

            if (!$subject) {
                continue;
            }

            $dayIndex = 0;
            $totalHours = $subject->type === 'lab' ? $subject->lab_hours : $subject->lec_hours;

            for ($hours = 0; $hours < $totalHours && $dayIndex < count($days); $hours += 2) {
                $day = $days[$dayIndex % count($days)];
                $slot = $timeSlots[array_rand($timeSlots)];
                $room = $rooms[array_rand($rooms)];

                try {
                    $this->addSchedule($section, [
                        'subject_id' => $subject->id,
                        'day' => $day,
                        'start_time' => $slot['start'],
                        'end_time' => $slot['end'],
                        'room' => $room,
                        'type' => $subject->type,
                    ]);
                } catch (\RuntimeException $e) {
                    // Skip if conflict, try next slot
                    continue;
                }

                $dayIndex++;
            }
        }
    }

    /**
     * Get schedule summary by day
     */
    public function getScheduleByDay(Section $section): array
    {
        $schedules = $this->getSectionSchedule($section);

        $byDay = [];
        foreach ($schedules as $schedule) {
            $byDay[$schedule->day][] = $schedule;
        }

        return $byDay;
    }

    /**
     * Check if instructor is available at given time
     */
    public function isInstructorAvailable(int $instructorId, string $day, string $startTime, string $endTime, ?int $excludeSectionId = null): bool
    {
        $query = Schedule::where('instructor_id', $instructorId)
            ->where('day', $day)
            ->where(function ($q) use ($startTime, $endTime) {
                $q->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($q) use ($startTime, $endTime) {
                        $q->where('start_time', '<=', $startTime)
                          ->where('end_time', '>=', $endTime);
                    });
            });

        if ($excludeSectionId) {
            $query->whereHas('section', fn ($q) => $q->where('id', '!=', $excludeSectionId));
        }

        return !$query->exists();
    }

    /**
     * Get section statistics
     */
    public function getSectionStats(?int $termId = null): array
    {
        $query = Section::with('course');

        if ($termId) {
            $query->where('academic_term_id', $termId);
        }

        $sections = $query->get();

        return [
            'total_sections' => $sections->count(),
            'by_year_level' => $sections->groupBy('year_level')->map->count(),
            'by_course' => $sections->groupBy(fn ($s) => $s->course?->name ?? 'Unknown')->map->count(),
            'by_status' => $sections->groupBy('status')->map->count(),
            'average_enrollment' => $sections->avg('current_students'),
            'full_sections' => $sections->where('status', 'full')->count(),
            'empty_sections' => $sections->filter(fn ($s) => $s->current_students === 0)->count(),
        ];
    }
}