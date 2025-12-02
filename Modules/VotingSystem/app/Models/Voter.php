<?php

namespace Modules\VotingSystem\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class Voter extends Authenticatable
{
    use HasFactory, HasRoles;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'school_id',
        'password',
        'generation_batch',
        'prefix',
        'has_voted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'has_voted' => 'boolean',
        'generation_batch' => 'integer',
    ];

    /**
     * Get the election that owns the voter.
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the student associated with this voter.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'school_id', 'student_id');
    }

    /**
     * Get the votes for the voter.
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class, 'voter_id');
    }

    /**
     * Check if the voter has already voted.
     */
    public function hasVoted(): bool
    {
        return $this->has_voted === true;
    }

    /**
     * Mark the voter as having voted.
     */
    public function markAsVoted(): void
    {
        $this->update(['has_voted' => true]);
    }
}
