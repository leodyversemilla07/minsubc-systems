<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'feedback';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'feedback',
    ];

    /**
     * Get the election that owns the feedback.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }
}
