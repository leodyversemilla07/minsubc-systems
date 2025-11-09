<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'position_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'description',
        'max_vote',
        'priority',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'max_vote' => 'integer',
        'priority' => 'integer',
    ];

    /**
     * Get the election that owns the position.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the candidates for the position.
     */
    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class, 'position_id', 'position_id');
    }

    /**
     * Get the votes for the position.
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class, 'position_id', 'position_id');
    }
}
