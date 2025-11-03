<?php

use Carbon\Carbon;
use Modules\USG\Models\Event;
use Modules\USG\Services\RecurrenceService;

describe('RecurrenceService', function () {
    beforeEach(function () {
        $this->service = new RecurrenceService;
    });

    it('generates daily occurrences', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00');
        $rule = 'FREQ=DAILY;COUNT=5';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(5);
        expect($occurrences->first()->format('Y-m-d'))->toBe('2025-01-01');
        expect($occurrences->last()->format('Y-m-d'))->toBe('2025-01-05');
    });

    it('generates daily occurrences with interval', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00');
        $rule = 'FREQ=DAILY;INTERVAL=3;COUNT=4';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(4);
        expect($occurrences[0]->format('Y-m-d'))->toBe('2025-01-01');
        expect($occurrences[1]->format('Y-m-d'))->toBe('2025-01-04');
        expect($occurrences[2]->format('Y-m-d'))->toBe('2025-01-07');
        expect($occurrences[3]->format('Y-m-d'))->toBe('2025-01-10');
    });

    it('generates weekly occurrences', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00'); // Wednesday
        $rule = 'FREQ=WEEKLY;COUNT=4';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(4);
        expect($occurrences->first()->format('Y-m-d'))->toBe('2025-01-01');
        expect($occurrences[1]->format('Y-m-d'))->toBe('2025-01-08');
    });

    it('generates weekly occurrences with BYDAY', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00'); // Wednesday
        $rule = 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=6';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(6);
        expect($occurrences[0]->format('Y-m-d'))->toBe('2025-01-01'); // Wed
        expect($occurrences[1]->format('Y-m-d'))->toBe('2025-01-03'); // Fri
        expect($occurrences[2]->format('Y-m-d'))->toBe('2025-01-06'); // Mon
    });

    it('generates monthly occurrences', function () {
        $startDate = Carbon::parse('2025-01-15 10:00:00');
        $rule = 'FREQ=MONTHLY;COUNT=3';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(3);
        expect($occurrences[0]->format('Y-m-d'))->toBe('2025-01-15');
        expect($occurrences[1]->format('Y-m-d'))->toBe('2025-02-15');
        expect($occurrences[2]->format('Y-m-d'))->toBe('2025-03-15');
    });

    it('generates yearly occurrences', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00');
        $rule = 'FREQ=YEARLY;COUNT=3';

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences)->toHaveCount(3);
        expect($occurrences[0]->format('Y-m-d'))->toBe('2025-01-01');
        expect($occurrences[1]->format('Y-m-d'))->toBe('2026-01-01');
        expect($occurrences[2]->format('Y-m-d'))->toBe('2027-01-01');
    });

    it('respects UNTIL date', function () {
        $startDate = Carbon::parse('2025-01-01 10:00:00');
        $until = Carbon::parse('2025-01-10 23:59:59');
        $rule = 'FREQ=DAILY;UNTIL='.$until->format('Ymd\THis\Z');

        $occurrences = $this->service->generateOccurrences($startDate, null, $rule);

        expect($occurrences->count())->toBeLessThanOrEqual(10);
        expect($occurrences->last()->lte($until))->toBeTrue();
    });

    it('builds recurrence rule from components', function () {
        $rule = $this->service->buildRule(
            freq: 'WEEKLY',
            interval: 2,
            count: 10,
            byDay: ['MO', 'WE', 'FR']
        );

        expect($rule)->toBe('FREQ=WEEKLY;INTERVAL=2;COUNT=10;BYDAY=MO,WE,FR');
    });

    it('parses recurrence rule', function () {
        $rule = 'FREQ=WEEKLY;INTERVAL=2;COUNT=10;BYDAY=MO,WE,FR';
        $parsed = $this->service->parseRule($rule);

        expect($parsed['FREQ'])->toBe('WEEKLY');
        expect($parsed['INTERVAL'])->toBe(2);
        expect($parsed['COUNT'])->toBe(10);
        expect($parsed['BYDAY'])->toBe(['MO', 'WE', 'FR']);
    });

    it('generates human-readable description for daily', function () {
        $description = $this->service->getDescription('FREQ=DAILY;COUNT=5');

        expect($description)->toBe('Daily, 5 times');
    });

    it('generates human-readable description for weekly with days', function () {
        $description = $this->service->getDescription('FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10');

        expect($description)->toBe('Weekly on Monday, Wednesday, and Friday, 10 times');
    });

    it('generates human-readable description for monthly', function () {
        $description = $this->service->getDescription('FREQ=MONTHLY;INTERVAL=2');

        expect($description)->toBe('Every 2 months');
    });

    it('checks if date is an occurrence', function () {
        $startDate = Carbon::parse('2025-01-01');
        $rule = 'FREQ=DAILY;COUNT=5';

        $isOccurrence = $this->service->isOccurrence(
            Carbon::parse('2025-01-03'),
            $startDate,
            $rule
        );

        expect($isOccurrence)->toBeTrue();

        $isNotOccurrence = $this->service->isOccurrence(
            Carbon::parse('2025-01-10'),
            $startDate,
            $rule
        );

        expect($isNotOccurrence)->toBeFalse();
    });
});

describe('Event Model Recurring Methods', function () {
    it('identifies recurring events', function () {
        $event = Event::factory()->create([
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=4',
        ]);

        expect($event->isRecurring())->toBeTrue();
    });

    it('identifies non-recurring events', function () {
        $event = Event::factory()->create([
            'is_recurring' => false,
            'recurrence_rule' => null,
        ]);

        expect($event->isRecurring())->toBeFalse();
    });

    it('generates occurrences for recurring event', function () {
        $event = Event::factory()->create([
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 11:00:00'),
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=3',
        ]);

        $occurrences = $event->getOccurrences();

        expect($occurrences)->toHaveCount(3);
        expect($occurrences[0]['start_date']->format('Y-m-d'))->toBe('2025-01-01');
        expect($occurrences[1]['start_date']->format('Y-m-d'))->toBe('2025-01-08');
        expect($occurrences[2]['start_date']->format('Y-m-d'))->toBe('2025-01-15');
    });

    it('preserves event duration in occurrences', function () {
        $event = Event::factory()->create([
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 12:30:00'), // 2.5 hours
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=DAILY;COUNT=2',
        ]);

        $occurrences = $event->getOccurrences();

        foreach ($occurrences as $occurrence) {
            $duration = (int) $occurrence['start_date']->diffInMinutes($occurrence['end_date']);
            expect($duration)->toBe(150); // 2.5 hours = 150 minutes
        }
    });

    it('returns single occurrence for non-recurring event', function () {
        $event = Event::factory()->create([
            'is_recurring' => false,
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 11:00:00'),
        ]);

        $occurrences = $event->getOccurrences();

        expect($occurrences)->toHaveCount(1);
        expect($occurrences[0]['start_date']->format('Y-m-d H:i'))->toBe('2025-01-01 10:00');
    });

    it('gets next occurrence for recurring event', function () {
        Carbon::setTestNow('2025-01-05 12:00:00');

        $event = Event::factory()->create([
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 11:00:00'),
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=5',
        ]);

        $nextOccurrence = $event->getNextOccurrence();

        expect($nextOccurrence)->not->toBeNull();
        expect($nextOccurrence['start_date']->format('Y-m-d'))->toBe('2025-01-08');

        Carbon::setTestNow();
    });

    it('returns null when no future occurrences', function () {
        Carbon::setTestNow('2025-02-01 12:00:00');

        $event = Event::factory()->create([
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 11:00:00'),
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=2',
        ]);

        $nextOccurrence = $event->getNextOccurrence();

        expect($nextOccurrence)->toBeNull();

        Carbon::setTestNow();
    });

    it('gets recurrence description', function () {
        $event = Event::factory()->create([
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10',
        ]);

        $description = $event->getRecurrenceDescription();

        expect($description)->toBe('Weekly on Monday, Wednesday, and Friday, 10 times');
    });

    it('checks if date is an occurrence', function () {
        $event = Event::factory()->create([
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=3',
        ]);

        expect($event->isOccurrenceOn(Carbon::parse('2025-01-01')))->toBeTrue();
        expect($event->isOccurrenceOn(Carbon::parse('2025-01-08')))->toBeTrue();
        expect($event->isOccurrenceOn(Carbon::parse('2025-01-05')))->toBeFalse();
    });
});

describe('iCal Export with Recurrence', function () {
    it('includes RRULE in iCalendar export for recurring events', function () {
        $event = Event::factory()->create([
            'title' => 'Weekly Meeting',
            'start_date' => Carbon::parse('2025-01-01 10:00:00'),
            'end_date' => Carbon::parse('2025-01-01 11:00:00'),
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;COUNT=10',
            'status' => 'published',
        ]);

        $response = $this->get(route('usg.events.export', $event->slug));

        $response->assertSuccessful();
        $content = $response->getContent();

        expect($content)->toContain('RRULE:FREQ=WEEKLY;COUNT=10');
        expect($content)->toContain('BEGIN:VEVENT');
        expect($content)->toContain('SUMMARY:Weekly Meeting');
    });

    it('does not include RRULE for non-recurring events', function () {
        $event = Event::factory()->create([
            'title' => 'One-time Event',
            'is_recurring' => false,
            'recurrence_rule' => null,
            'status' => 'published',
        ]);

        $response = $this->get(route('usg.events.export', $event->slug));

        $response->assertSuccessful();
        $content = $response->getContent();

        expect($content)->not->toContain('RRULE:');
    });
});
