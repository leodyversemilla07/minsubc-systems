<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'voters_id',
        'candidate_id',
        'position_id',
        'timestamp',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'timestamp' => 'datetime',
    ];

    /**
     * Get the election that owns the vote.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the voter that owns the vote.
     */
    public function voter(): BelongsTo
    {
        return $this->belongsTo(Voter::class, 'voters_id');
    }

    /**
     * Get the candidate that owns the vote.
     */
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class);
    }

    /**
     * Get the position that owns the vote.
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }
}
