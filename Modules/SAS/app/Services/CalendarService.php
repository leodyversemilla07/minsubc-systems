<?php

namespace Modules\SAS\Services;

use Illuminate\Support\Collection;
use Modules\SAS\Models\SASActivity;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Symfony\Component\HttpFoundation\Response;

class CalendarService
{
    /**
     * Export a single activity as an .ics file.
     */
    public function exportActivity(SASActivity $activity): Response
    {
        $calendar = Calendar::create($activity->activity_title);

        $event = $this->createEventFromActivity($activity);
        $calendar->event($event);

        return response($calendar->get())
            ->header('Content-Type', 'text/calendar; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="'.$this->sanitizeFilename($activity->activity_title).'.ics"');
    }

    /**
     * Export multiple activities as an .ics file.
     */
    public function exportActivities(Collection $activities, string $filename = 'activities'): Response
    {
        $calendar = Calendar::create('SAS Activities');

        foreach ($activities as $activity) {
            $event = $this->createEventFromActivity($activity);
            $calendar->event($event);
        }

        return response($calendar->get())
            ->header('Content-Type', 'text/calendar; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="'.$this->sanitizeFilename($filename).'.ics"');
    }

    /**
     * Export all upcoming activities.
     */
    public function exportAllUpcoming(): Response
    {
        $activities = SASActivity::where('start_date', '>=', now())
            ->where('status', 'scheduled')
            ->orderBy('start_date')
            ->get();

        return $this->exportActivities($activities, 'upcoming-activities');
    }

    /**
     * Create an iCalendar event from a SAS activity.
     */
    protected function createEventFromActivity(SASActivity $activity): Event
    {
        $activity->load('organization');

        $event = Event::create($activity->activity_title)
            ->description($this->formatDescription($activity))
            ->startsAt($activity->start_date)
            ->endsAt($activity->end_date);

        if ($activity->all_day) {
            $event->fullDay();
        }

        if ($activity->location) {
            $event->address($activity->location);
        }

        if ($activity->organizer) {
            $event->organizer($activity->organizer, $activity->organizer);
        } elseif ($activity->organization) {
            $event->organizer(
                $activity->organization->contact_email ?? 'noreply@minsubc.edu.ph',
                $activity->organization->organization_name
            );
        }

        // Add categories - note: categories are optional in iCal
        // if ($activity->category) {
        //     $event->appendProperty('CATEGORIES', $activity->category);
        // }

        // Add status - note: status is optional in iCal and defaults to CONFIRMED
        // $status = match ($activity->status) {
        //     'scheduled' => 'CONFIRMED',
        //     'ongoing' => 'CONFIRMED',
        //     'completed' => 'CONFIRMED',
        //     'cancelled' => 'CANCELLED',
        //     default => 'TENTATIVE',
        // };
        // $event->appendProperty('STATUS', $status);

        return $event;
    }

    /**
     * Format the activity description for the calendar event.
     */
    protected function formatDescription(SASActivity $activity): string
    {
        $description = $activity->description ?? '';

        if ($activity->organization) {
            $description .= "\n\nOrganized by: ".$activity->organization->organization_name;
        }

        if ($activity->category) {
            $description .= "\nCategory: ".ucfirst($activity->category);
        }

        if ($activity->target_participants) {
            $description .= "\nTarget Participants: ".$activity->target_participants;
        }

        return trim($description);
    }

    /**
     * Sanitize filename for safe file system usage.
     */
    protected function sanitizeFilename(string $filename): string
    {
        // Remove any character that isn't alphanumeric, dash, underscore, or space
        $filename = preg_replace('/[^a-zA-Z0-9\-_ ]/', '', $filename);

        // Replace multiple spaces with a single space
        $filename = preg_replace('/\s+/', ' ', $filename);

        // Replace spaces with dashes
        $filename = str_replace(' ', '-', $filename);

        // Lowercase
        $filename = strtolower($filename);

        return $filename;
    }
}
