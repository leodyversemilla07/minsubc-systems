<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Candidate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'position_id',
        'firstname',
        'lastname',
        'photo',
        'platform',
        'partylist_id',
    ];

    /**
     * Get the election that owns the candidate.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the position that owns the candidate.
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }

    /**
     * Get the partylist that owns the candidate.
     */
    public function partylist(): BelongsTo
    {
        return $this->belongsTo(Partylist::class, 'partylist_id', 'partylist_id');
    }

    /**
     * Get the votes for the candidate.
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    /**
     * Get the candidate's full name.
     */
    protected function fullname(): Attribute
    {
        return Attribute::make(
            get: fn() => "{$this->firstname} {$this->lastname}",
        );
    }

    /**
     * Get the total vote count for this candidate.
     */
    public function voteCount(): int
    {
        return $this->votes()->count();
    }
}
