<?php

namespace Modules\USG\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Modules\USG\Models\Event;

class ICalService
{
    /**
     * Generate iCalendar content for a single event.
     */
    public function generateEventICalendar(Event $event): string
    {
        $ical = $this->getCalendarHeader();
        $ical .= $this->generateVEvent($event);
        $ical .= $this->getCalendarFooter();

        return $ical;
    }

    /**
     * Generate iCalendar content for multiple events.
     */
    public function generateMultipleEventsICalendar(Collection $events): string
    {
        $ical = $this->getCalendarHeader();

        foreach ($events as $event) {
            $ical .= $this->generateVEvent($event);
        }

        $ical .= $this->getCalendarFooter();

        return $ical;
    }

    /**
     * Generate VEVENT block for a single event.
     */
    protected function generateVEvent(Event $event): string
    {
        $uid = $this->generateUID($event);
        $dtstart = $this->formatDateTime($event->start_date, $event->all_day);
        $dtend = $this->formatDateTime($event->end_date, $event->all_day);
        $summary = $this->escapeText($event->title);
        $description = $this->escapeText($event->description ?? '');
        $location = $this->escapeText($event->location ?? '');
        $status = $this->getEventStatus($event->status);
        $dtstamp = $this->formatDateTime($event->updated_at ?? $event->created_at, false);
        $created = $this->formatDateTime($event->created_at, false);
        $lastModified = $this->formatDateTime($event->updated_at ?? $event->created_at, false);

        $vevent = "BEGIN:VEVENT\r\n";
        $vevent .= "UID:{$uid}\r\n";
        $vevent .= "DTSTAMP:{$dtstamp}\r\n";
        $vevent .= "DTSTART{$dtstart}\r\n";
        $vevent .= "DTEND{$dtend}\r\n";
        $vevent .= "SUMMARY:{$summary}\r\n";

        if (! empty($description)) {
            $vevent .= "DESCRIPTION:{$description}\r\n";
        }

        if (! empty($location)) {
            $vevent .= "LOCATION:{$location}\r\n";
        }

        $vevent .= "STATUS:{$status}\r\n";

        // Add recurrence rule if event is recurring
        if ($event->is_recurring && ! empty($event->recurrence_rule)) {
            $rrule = str_replace('RRULE:', '', $event->recurrence_rule);
            $vevent .= "RRULE:{$rrule}\r\n";
        }

        $vevent .= "CREATED:{$created}\r\n";
        $vevent .= "LAST-MODIFIED:{$lastModified}\r\n";

        if ($event->organizer) {
            $organizer = $this->escapeText($event->organizer);
            $vevent .= "ORGANIZER;CN={$organizer}:MAILTO:usg@minsubc.edu.ph\r\n";
        }

        // Add URL to event page
        $url = route('usg.events.show', $event->slug);
        $vevent .= "URL:{$url}\r\n";

        $vevent .= "END:VEVENT\r\n";

        return $vevent;
    }

    /**
     * Get calendar header.
     */
    protected function getCalendarHeader(): string
    {
        return "BEGIN:VCALENDAR\r\n".
               "VERSION:2.0\r\n".
               "PRODID:-//MinSU USG//Events Calendar//EN\r\n".
               "CALSCALE:GREGORIAN\r\n".
               "METHOD:PUBLISH\r\n".
               "X-WR-CALNAME:MinSU USG Events\r\n".
               "X-WR-TIMEZONE:Asia/Manila\r\n".
               "X-WR-CALDESC:University Student Government Events Calendar\r\n";
    }

    /**
     * Get calendar footer.
     */
    protected function getCalendarFooter(): string
    {
        return "END:VCALENDAR\r\n";
    }

    /**
     * Generate unique identifier for event.
     */
    protected function generateUID(Event $event): string
    {
        return "event-{$event->id}@minsubc-usg.edu.ph";
    }

    /**
     * Format datetime for iCalendar.
     */
    protected function formatDateTime($datetime, bool $allDay): string
    {
        if (! $datetime) {
            return '';
        }

        $dt = $datetime instanceof \DateTimeInterface ? $datetime : now();

        if ($allDay) {
            return ';VALUE=DATE:'.$dt->format('Ymd');
        }

        // Format as UTC
        return ':'.$dt->clone()->setTimezone('UTC')->format('Ymd\THis\Z');
    }

    /**
     * Escape text for iCalendar format.
     */
    protected function escapeText(?string $text): string
    {
        if (! $text) {
            return '';
        }

        // Remove HTML tags
        $text = strip_tags($text);

        // Escape special characters
        $text = str_replace(['\\', ',', ';', "\n"], ['\\\\', '\\,', '\\;', '\\n'], $text);

        // Fold long lines (max 75 characters per line)
        return $this->foldLine($text);
    }

    /**
     * Fold long lines for iCalendar format.
     */
    protected function foldLine(string $text, int $maxLength = 75): string
    {
        if (strlen($text) <= $maxLength) {
            return $text;
        }

        $lines = [];
        $currentLine = '';

        $words = explode(' ', $text);

        foreach ($words as $word) {
            if (strlen($currentLine.$word) > $maxLength) {
                if (! empty($currentLine)) {
                    $lines[] = $currentLine;
                    $currentLine = ' '.$word; // Continuation lines start with space
                } else {
                    $lines[] = $word;
                }
            } else {
                $currentLine .= ($currentLine ? ' ' : '').$word;
            }
        }

        if (! empty($currentLine)) {
            $lines[] = $currentLine;
        }

        return implode("\r\n", $lines);
    }

    /**
     * Get event status for iCalendar.
     */
    protected function getEventStatus(string $status): string
    {
        return match ($status) {
            'published' => 'CONFIRMED',
            'cancelled' => 'CANCELLED',
            'draft' => 'TENTATIVE',
            default => 'TENTATIVE',
        };
    }

    /**
     * Generate filename for iCalendar file.
     */
    public function generateFilename(Event $event): string
    {
        $slug = Str::slug($event->title);

        return "{$slug}.ics";
    }

    /**
     * Generate filename for multiple events.
     */
    public function generateMultipleEventsFilename(): string
    {
        return 'minsu-usg-events-'.now()->format('Y-m-d').'.ics';
    }
}
