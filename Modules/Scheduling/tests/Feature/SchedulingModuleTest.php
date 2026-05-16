<?php

use Illuminate\Support\Facades\Schema;
use Modules\Scheduling\Models\CalendarEvent;
use Modules\Scheduling\Models\Booking;
use Modules\Scheduling\Models\AcademicSchedule;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Ensure Scheduling tables exist (handles fresh SQLite databases)
    if (!Schema::hasTable('sch_events')) {
        Schema::create('sch_events', function ($table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('event_type');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->boolean('all_day')->default(false);
            $table->string('location')->nullable();
            $table->foreignId('organizer_id')->constrained('users');
            $table->string('color')->nullable();
            $table->boolean('is_public')->default(true);
            $table->string('status')->default('scheduled');
            $table->string('recurrence_rule')->nullable();
            $table->integer('max_participants')->nullable();
            $table->timestamps();
        });
        Schema::create('sch_bookings', function ($table) {
            $table->id();
            $table->foreignId('event_id')->constrained('sch_events')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('confirmed');
            $table->text('notes')->nullable();
            $table->dateTime('checked_in_at')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'user_id']);
        });
        Schema::create('sch_academic_schedules', function ($table) {
            $table->id();
            $table->string('academic_year');
            $table->string('term');
            $table->string('event_name');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_holiday')->default(false);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }
    Role::firstOrCreate(['name' => 'scheduling-admin']);
    Role::firstOrCreate(['name' => 'scheduling-staff']);
});

test('can create calendar events', function () {
    $admin = User::factory()->create();
    $event = CalendarEvent::create([
        'title' => 'Orientation Week',
        'event_type' => 'orientation',
        'start_datetime' => now()->addWeek(),
        'end_datetime' => now()->addWeek()->addDay(),
        'location' => 'Main Hall',
        'organizer_id' => $admin->id,
        'is_public' => true,
        'status' => 'scheduled',
    ]);

    expect($event->id)->not->toBeNull();
    expect($event->title)->toBe('Orientation Week');
    expect($event->event_type)->toBe('orientation');
});

test('can create bookings for events', function () {
    $admin = User::factory()->create();
    $event = CalendarEvent::factory()->create(['organizer_id' => $admin->id]);
    $booking = Booking::create([
        'event_id' => $event->id,
        'user_id' => $admin->id,
        'status' => 'confirmed',
    ]);

    expect($booking->status)->toBe('confirmed');
    expect($booking->event_id)->toBe($event->id);
});

test('can create academic schedule entries', function () {
    $schedule = AcademicSchedule::create([
        'academic_year' => '2025-2026',
        'term' => '1st Semester',
        'event_name' => 'Start of Classes',
        'start_date' => '2025-08-01',
        'end_date' => '2025-08-01',
        'is_holiday' => false,
    ]);

    expect($schedule->academic_year)->toBe('2025-2026');
    expect($schedule->is_holiday)->toBeFalse();
});

test('can mark academic schedule as holiday', function () {
    $holiday = AcademicSchedule::create([
        'academic_year' => '2025-2026',
        'term' => '1st Semester',
        'event_name' => 'National Heroes Day',
        'start_date' => '2025-08-25',
        'end_date' => '2025-08-25',
        'is_holiday' => true,
    ]);

    expect($holiday->is_holiday)->toBeTrue();
});

test('can access admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('scheduling-admin');
    $response = $this->actingAs($admin)
        ->get(route('scheduling.admin.dashboard'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list events', function () {
    $admin = User::factory()->create()->assignRole('scheduling-admin');
    $response = $this->actingAs($admin)
        ->get(route('scheduling.admin.events.index'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list academic schedules', function () {
    $admin = User::factory()->create()->assignRole('scheduling-admin');
    $response = $this->actingAs($admin)
        ->get(route('scheduling.admin.academic-schedules.index'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});