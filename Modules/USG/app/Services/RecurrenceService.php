<?php

namespace Modules\USG\Services;

use Carbon\Carbon;
use Illuminate\Support\Collection;

class RecurrenceService
{
    /**
     * Generate occurrences from a recurrence rule.
     */
    public function generateOccurrences(
        Carbon $startDate,
        ?Carbon $endDate,
        string $recurrenceRule,
        int $maxOccurrences = 100
    ): Collection {
        $rule = $this->parseRule($recurrenceRule);

        if (! isset($rule['FREQ'])) {
            return collect([$startDate]);
        }

        $occurrences = collect();
        $current = $startDate->copy();
        $count = 0;
        $limit = $rule['COUNT'] ?? $maxOccurrences;
        $until = isset($rule['UNTIL']) ? Carbon::parse($rule['UNTIL']) : null;

        while ($count < $limit) {
            // Add the occurrence
            $occurrences->push($current->copy());
            $count++;

            // Generate next occurrence
            $current = $this->getNextOccurrence($current, $endDate, $rule);

            // Check if we've exceeded the UNTIL date
            if ($until && $current->isAfter($until)) {
                break;
            }

            // Safety check to prevent infinite loops
            if ($count >= $maxOccurrences) {
                break;
            }
        }

        return $occurrences;
    }

    /**
     * Get the next occurrence based on the recurrence rule.
     */
    protected function getNextOccurrence(Carbon $current, ?Carbon $endDate, array $rule): Carbon
    {
        $interval = $rule['INTERVAL'] ?? 1;
        $freq = $rule['FREQ'];

        $next = $current->copy();

        switch ($freq) {
            case 'DAILY':
                $next->addDays($interval);
                break;

            case 'WEEKLY':
                if (isset($rule['BYDAY'])) {
                    $next = $this->getNextWeekdayOccurrence($current, $rule['BYDAY'], $interval);
                } else {
                    $next->addWeeks($interval);
                }
                break;

            case 'MONTHLY':
                if (isset($rule['BYMONTHDAY'])) {
                    $next = $this->getNextMonthDayOccurrence($current, $rule['BYMONTHDAY'], $interval);
                } else {
                    $next->addMonths($interval);
                }
                break;

            case 'YEARLY':
                $next->addYears($interval);
                break;
        }

        return $next;
    }

    /**
     * Get the next occurrence for weekly recurrence with BYDAY.
     */
    protected function getNextWeekdayOccurrence(Carbon $current, array $byDay, int $interval): Carbon
    {
        $dayMap = [
            'SU' => Carbon::SUNDAY,
            'MO' => Carbon::MONDAY,
            'TU' => Carbon::TUESDAY,
            'WE' => Carbon::WEDNESDAY,
            'TH' => Carbon::THURSDAY,
            'FR' => Carbon::FRIDAY,
            'SA' => Carbon::SATURDAY,
        ];

        $next = $current->copy()->addDay();

        // Find the next matching day
        while (true) {
            $dayOfWeek = $next->format('l');
            $shortDay = strtoupper(substr($dayOfWeek, 0, 2));

            if (in_array($shortDay, $byDay)) {
                // Check if we need to skip weeks based on interval
                $weeksDiff = $current->diffInWeeks($next);
                if ($weeksDiff % $interval === 0) {
                    break;
                }
            }

            $next->addDay();
        }

        return $next;
    }

    /**
     * Get the next occurrence for monthly recurrence with BYMONTHDAY.
     */
    protected function getNextMonthDayOccurrence(Carbon $current, array $byMonthDay, int $interval): Carbon
    {
        $next = $current->copy()->addDay();

        while (true) {
            if (in_array($next->day, $byMonthDay)) {
                break;
            }
            $next->addDay();
        }

        return $next;
    }

    /**
     * Parse an RRULE string into an array.
     */
    public function parseRule(string $rule): array
    {
        $parsed = [];

        // Remove "RRULE:" prefix if present
        $rule = str_replace('RRULE:', '', $rule);

        $parts = explode(';', $rule);

        foreach ($parts as $part) {
            if (! str_contains($part, '=')) {
                continue;
            }

            [$key, $value] = explode('=', $part, 2);

            if ($key === 'BYDAY' || $key === 'BYMONTHDAY') {
                $parsed[$key] = explode(',', $value);
            } elseif ($key === 'INTERVAL' || $key === 'COUNT') {
                $parsed[$key] = (int) $value;
            } else {
                $parsed[$key] = $value;
            }
        }

        return $parsed;
    }

    /**
     * Build an RRULE string from components.
     */
    public function buildRule(
        string $freq,
        ?int $interval = null,
        ?int $count = null,
        ?string $until = null,
        ?array $byDay = null,
        ?array $byMonthDay = null
    ): string {
        $parts = ['FREQ='.$freq];

        if ($interval && $interval > 1) {
            $parts[] = 'INTERVAL='.$interval;
        }

        if ($count) {
            $parts[] = 'COUNT='.$count;
        }

        if ($until) {
            $parts[] = 'UNTIL='.$until;
        }

        if ($byDay) {
            $parts[] = 'BYDAY='.implode(',', $byDay);
        }

        if ($byMonthDay) {
            $parts[] = 'BYMONTHDAY='.implode(',', $byMonthDay);
        }

        return implode(';', $parts);
    }

    /**
     * Get a human-readable description of the recurrence rule.
     */
    public function getDescription(string $recurrenceRule): string
    {
        $rule = $this->parseRule($recurrenceRule);

        if (! isset($rule['FREQ'])) {
            return 'Does not repeat';
        }

        $freq = $rule['FREQ'];
        $interval = $rule['INTERVAL'] ?? 1;

        $description = match ($freq) {
            'DAILY' => $interval === 1 ? 'Daily' : "Every {$interval} days",
            'WEEKLY' => $interval === 1 ? 'Weekly' : "Every {$interval} weeks",
            'MONTHLY' => $interval === 1 ? 'Monthly' : "Every {$interval} months",
            'YEARLY' => $interval === 1 ? 'Yearly' : "Every {$interval} years",
            default => 'Custom recurrence',
        };

        // Add BYDAY information for weekly events
        if ($freq === 'WEEKLY' && isset($rule['BYDAY'])) {
            $days = $this->formatDays($rule['BYDAY']);
            $description .= ' on '.$days;
        }

        // Add BYMONTHDAY information
        if (isset($rule['BYMONTHDAY'])) {
            $description .= ' on day '.implode(', ', $rule['BYMONTHDAY']);
        }

        // Add end condition
        if (isset($rule['COUNT'])) {
            $description .= ', '.$rule['COUNT'].' times';
        } elseif (isset($rule['UNTIL'])) {
            $until = Carbon::parse($rule['UNTIL'])->format('M j, Y');
            $description .= ', until '.$until;
        }

        return $description;
    }

    /**
     * Format day abbreviations to readable format.
     */
    protected function formatDays(array $days): string
    {
        $dayNames = [
            'SU' => 'Sunday',
            'MO' => 'Monday',
            'TU' => 'Tuesday',
            'WE' => 'Wednesday',
            'TH' => 'Thursday',
            'FR' => 'Friday',
            'SA' => 'Saturday',
        ];

        $formatted = array_map(fn ($day) => $dayNames[$day] ?? $day, $days);

        if (count($formatted) === 1) {
            return $formatted[0];
        }

        if (count($formatted) === 2) {
            return implode(' and ', $formatted);
        }

        $last = array_pop($formatted);

        return implode(', ', $formatted).', and '.$last;
    }

    /**
     * Check if a date is an occurrence of the recurrence pattern.
     */
    public function isOccurrence(Carbon $date, Carbon $startDate, string $recurrenceRule): bool
    {
        $occurrences = $this->generateOccurrences($startDate, null, $recurrenceRule);

        return $occurrences->contains(fn ($occurrence) => $occurrence->isSameDay($date));
    }
}
