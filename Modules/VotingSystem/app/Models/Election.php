<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\VotingSystem\Database\Factories\ElectionFactory;

class Election extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'election_code',
        'status',
        'end_time',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'status' => 'boolean',
        'end_time' => 'datetime',
    ];

    /**
     * Get the partylists for the election.
     */
    public function partylists(): HasMany
    {
        return $this->hasMany(Partylist::class);
    }

    /**
     * Get the positions for the election.
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }

    /**
     * Get the candidates for the election.
     */
    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    /**
     * Get the voters for the election.
     */
    public function voters(): HasMany
    {
        return $this->hasMany(Voter::class);
    }

    /**
     * Get the votes for the election.
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    /**
     * Get the feedback for the election.
     */
    public function feedback(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    /**
     * Check if the election is active.
     */
    public function isActive(): bool
    {
        return $this->status === true;
    }

    /**
     * Check if the election has ended.
     */
    public function hasEnded(): bool
    {
        return $this->end_time !== null && $this->end_time->isPast();
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): ElectionFactory
    {
        return ElectionFactory::new();
    }
}
