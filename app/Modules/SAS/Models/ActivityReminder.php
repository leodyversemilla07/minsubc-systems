<?php

namespace App\Modules\SAS\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityReminder extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'activity_id',
        'reminder_date',
        'reminder_type',
        'sent',
        'sent_at',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'reminder_date' => 'datetime',
            'sent_at' => 'datetime',
            'sent' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(SASActivity::class, 'activity_id');
    }

    public function scopePending($query)
    {
        return $query->where('sent', false);
    }

    public function scopeSent($query)
    {
        return $query->where('sent', true);
    }
}
