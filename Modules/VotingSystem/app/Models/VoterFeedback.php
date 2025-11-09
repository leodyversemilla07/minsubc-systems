<?php

namespace Modules\VotingSystem\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VoterFeedback extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'voter_feedback';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'voter_id',
        'election_id',
        'rating',
        'comment',
        'experience',
        'would_recommend',
        'improvements',
    ];

    protected function casts(): array
    {
        return [
            'would_recommend' => 'boolean',
            'improvements' => 'array',
            'rating' => 'integer',
        ];
    }

    /**
     * Get the voter who submitted this feedback.
     */
    public function voter(): BelongsTo
    {
        return $this->belongsTo(Voter::class);
    }

    /**
     * Get the election this feedback belongs to.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Scope to filter by election.
     */
    public function scopeForElection(Builder $query, int $electionId): Builder
    {
        return $query->where('election_id', $electionId);
    }

    /**
     * Scope to filter by rating.
     */
    public function scopeWithRating(Builder $query, int $rating): Builder
    {
        return $query->where('rating', $rating);
    }

    /**
     * Scope to filter by experience.
     */
    public function scopeWithExperience(Builder $query, string $experience): Builder
    {
        return $query->where('experience', $experience);
    }

    /**
     * Get average rating for an election.
     */
    public static function averageRatingForElection(int $electionId): float
    {
        return static::forElection($electionId)->avg('rating') ?? 0;
    }

    /**
     * Get feedback statistics for an election.
     */
    public static function statisticsForElection(int $electionId): array
    {
        $feedback = static::forElection($electionId)->get();

        return [
            'total' => $feedback->count(),
            'average_rating' => round($feedback->avg('rating') ?? 0, 2),
            'ratings_breakdown' => [
                5 => $feedback->where('rating', 5)->count(),
                4 => $feedback->where('rating', 4)->count(),
                3 => $feedback->where('rating', 3)->count(),
                2 => $feedback->where('rating', 2)->count(),
                1 => $feedback->where('rating', 1)->count(),
            ],
            'would_recommend' => [
                'yes' => $feedback->where('would_recommend', true)->count(),
                'no' => $feedback->where('would_recommend', false)->count(),
            ],
        ];
    }
}
