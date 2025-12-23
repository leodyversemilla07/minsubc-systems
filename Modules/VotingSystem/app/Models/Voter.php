<?php

namespace Modules\VotingSystem\Models;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'election_id',
        'user_id',
        'school_id',
        'generation_batch',
        'prefix',
        'has_voted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        // Password removed - uses User's password via relationship
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'has_voted' => 'boolean',
        'generation_batch' => 'integer',
    ];

    /**
     * Get the user that owns the voter.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

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

    /**
     * Get the user's remember token (delegated to User model).
     */
    public function getRememberToken()
    {
        return $this->user ? $this->user->getRememberToken() : null;
    }

    /**
     * Set the user's remember token (delegated to User model).
     */
    public function setRememberToken($value)
    {
        if ($this->user) {
            $this->user->setRememberToken($value);
            $this->user->save();
        }
    }

    /**
     * Get the column name for the "remember me" token.
     */
    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
