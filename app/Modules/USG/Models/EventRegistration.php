<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventRegistration extends Model
{
    use HasFactory;

    protected $table = 'usg_event_registrations';

    protected $fillable = [
        'event_id',
        'user_id',
        'status',
        'notes',
        'registered_at',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'registered_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    /**
     * Get the event this registration belongs to.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    /**
     * Get the user who registered.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the registration is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'registered';
    }

    /**
     * Check if the registration was cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Mark the registration as attended.
     */
    public function markAsAttended(): void
    {
        $this->update(['status' => 'attended']);
    }

    /**
     * Cancel the registration.
     */
    public function cancel(): void
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);
    }
}
