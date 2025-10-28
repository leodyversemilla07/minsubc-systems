<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use App\Modules\USG\Services\RecurrenceService;
use Carbon\Carbon;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Event extends Model
{
    use HasFactory;

    protected $table = 'usg_events';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): EventFactory
    {
        return EventFactory::new();
    }

    protected $fillable = [
        'title',
        'slug',
        'description',
        'location',
        'start_date',
        'end_date',
        'all_day',
        'category',
        'color',
        'organizer',
        'is_recurring',
        'recurrence_rule',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'all_day' => 'boolean',
            'is_recurring' => 'boolean',
        ];
    }

    // Relationships
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get all registrations for this event.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class, 'event_id');
    }

    /**
     * Get active registrations for this event.
     */
    public function activeRegistrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class, 'event_id')
            ->where('status', 'registered');
    }

    /**
     * Check if a user is registered for this event.
     */
    public function isUserRegistered(?int $userId = null): bool
    {
        if (! $userId) {
            $userId = auth()->id();
        }

        if (! $userId) {
            return false;
        }

        return $this->activeRegistrations()
            ->where('user_id', $userId)
            ->exists();
    }

    /**
     * Check if the event can accept more registrations.
     */
    public function canAcceptRegistrations(): bool
    {
        // If no max attendees, always accept
        if (! isset($this->max_attendees)) {
            return true;
        }

        return $this->activeRegistrations()->count() < $this->max_attendees;
    }

    /**
     * Get the count of active registrations.
     */
    public function getAttendeesCountAttribute(): int
    {
        return $this->activeRegistrations()->count();
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', 'cancelled');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->where('status', 'archived');
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('start_date', '>=', now());
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->where('end_date', '<', now());
    }

    public function scopeToday(Builder $query): Builder
    {
        return $query->whereDate('start_date', '<=', today())
            ->whereDate('end_date', '>=', today());
    }

    // Recurring Event Methods

    /**
     * Check if the event is recurring.
     */
    public function isRecurring(): bool
    {
        return $this->is_recurring && ! empty($this->recurrence_rule);
    }

    /**
     * Get all occurrences of the recurring event.
     */
    public function getOccurrences(int $maxOccurrences = 100): Collection
    {
        if (! $this->isRecurring()) {
            return collect([
                [
                    'start_date' => $this->start_date,
                    'end_date' => $this->end_date,
                ],
            ]);
        }

        $service = app(RecurrenceService::class);

        return $service->generateOccurrences(
            $this->start_date,
            $this->end_date,
            $this->recurrence_rule,
            $maxOccurrences
        )->map(function (Carbon $occurrence) {
            $duration = $this->start_date->diffInSeconds($this->end_date);

            return [
                'start_date' => $occurrence,
                'end_date' => $occurrence->copy()->addSeconds($duration),
            ];
        });
    }

    /**
     * Get the next occurrence of the recurring event.
     */
    public function getNextOccurrence(?Carbon $after = null): ?array
    {
        if (! $this->isRecurring()) {
            if ($this->start_date->isFuture()) {
                return [
                    'start_date' => $this->start_date,
                    'end_date' => $this->end_date,
                ];
            }

            return null;
        }

        $after = $after ?? now();

        return $this->getOccurrences()
            ->first(fn ($occurrence) => $occurrence['start_date']->isAfter($after));
    }

    /**
     * Get the recurrence description.
     */
    public function getRecurrenceDescription(): string
    {
        if (! $this->isRecurring()) {
            return 'Does not repeat';
        }

        $service = app(RecurrenceService::class);

        return $service->getDescription($this->recurrence_rule);
    }

    /**
     * Check if a given date is an occurrence of this event.
     */
    public function isOccurrenceOn(Carbon $date): bool
    {
        if (! $this->isRecurring()) {
            return $this->start_date->isSameDay($date);
        }

        $service = app(RecurrenceService::class);

        return $service->isOccurrence($date, $this->start_date, $this->recurrence_rule);
    }
}
