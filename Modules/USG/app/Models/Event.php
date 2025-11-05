<?php

namespace Modules\USG\Models;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;
use Modules\USG\Database\Factories\EventFactory;
use Modules\USG\Services\RecurrenceService;

class Event extends Model
{
    use HasFactory, Searchable;

    protected $table = 'events';

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
        'venue_details',
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
        'featured_image',
    ];

    protected $appends = [
        'event_date',
        'event_time',
        'max_participants',
        'current_participants',
        'image_path',
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

    // Accessors for frontend compatibility
    protected function eventDate(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => $this->start_date?->format('Y-m-d'),
        );
    }

    protected function eventTime(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => $this->start_date?->format('H:i:s'),
        );
    }

    protected function maxParticipants(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => null, // No participant limit in current schema
        );
    }

    protected function currentParticipants(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => 0, // No registrations in current schema
        );
    }

    protected function imagePath(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => $this->featured_image ? asset('storage/'.$this->featured_image) : null,
        );
    }

    // Scout configuration
    public function shouldBeSearchable(): bool
    {
        return $this->status === 'published';
    }

    #[SearchUsingFullText(['title', 'description', 'location', 'organizer'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'organizer' => $this->organizer,
            'category' => $this->category,
        ];
    }

    // Relationships
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
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
