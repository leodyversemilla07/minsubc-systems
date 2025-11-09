<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VoterActivityLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'voter_id',
        'election_id',
        'action',
        'ip_address',
        'user_agent',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    /**
     * Get the voter who performed this action.
     */
    public function voter(): BelongsTo
    {
        return $this->belongsTo(Voter::class);
    }

    /**
     * Get the election this activity belongs to.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Log a voter activity.
     */
    public static function log(
        int $voterId,
        int $electionId,
        string $action,
        ?array $metadata = null
    ): static {
        $request = request();

        return static::create([
            'voter_id' => $voterId,
            'election_id' => $electionId,
            'action' => $action,
            'ip_address' => $request ? $request->ip() : null,
            'user_agent' => $request ? $request->userAgent() : null,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Scope to filter by action type.
     */
    public function scopeAction(Builder $query, string $action): Builder
    {
        return $query->where('action', $action);
    }

    /**
     * Scope to filter by election.
     */
    public function scopeForElection(Builder $query, int $electionId): Builder
    {
        return $query->where('election_id', $electionId);
    }

    /**
     * Scope to filter by voter.
     */
    public function scopeForVoter(Builder $query, int $voterId): Builder
    {
        return $query->where('voter_id', $voterId);
    }

    /**
     * Scope to filter by date range.
     */
    public function scopeDateRange(Builder $query, string $from, string $to): Builder
    {
        return $query->whereBetween('created_at', [$from, $to]);
    }
}
