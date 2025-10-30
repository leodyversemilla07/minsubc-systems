<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\SASActivityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class SASActivity extends Model
{
    use HasFactory;

    protected $table = 'sas_activities';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): SASActivityFactory
    {
        return SASActivityFactory::new();
    }

    protected $fillable = [
        'activity_title',
        'slug',
        'description',
        'start_date',
        'end_date',
        'all_day',
        'location',
        'category',
        'organizer',
        'organization_id',
        'color',
        'is_recurring',
        'recurrence_rule',
        'status',
        'target_participants',
        'actual_participants',
        'completion_report',
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($activity) {
            if (! $activity->slug) {
                $activity->slug = Str::slug($activity->activity_title).'-'.time();
            }
        });
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ActivityDocument::class, 'activity_id');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(ActivityReminder::class, 'activity_id');
    }

    public function scopeScheduled($query)
    {
        return $query->where('status', 'Scheduled');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'Scheduled')
            ->where('start_date', '>=', now());
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'Completed');
    }

    public function scopeByDateRange($query, $start, $end)
    {
        return $query->whereBetween('start_date', [$start, $end]);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function isToday(): bool
    {
        return $this->start_date->isToday();
    }

    public function isUpcoming(): bool
    {
        return $this->start_date->isFuture() && $this->status === 'Scheduled';
    }
}
