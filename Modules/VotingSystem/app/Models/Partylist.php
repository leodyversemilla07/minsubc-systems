<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Partylist extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): \Modules\VotingSystem\Database\Factories\PartylistFactory
    {
        return \Modules\VotingSystem\Database\Factories\PartylistFactory::new();
    }

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'partylist_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'name',
    ];

    /**
     * Get the election that owns the partylist.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the candidates for the partylist.
     */
    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class, 'partylist_id', 'partylist_id');
    }
}
