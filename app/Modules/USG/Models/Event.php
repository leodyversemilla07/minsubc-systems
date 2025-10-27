<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Database\Factories\Modules\USG\EventFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}
