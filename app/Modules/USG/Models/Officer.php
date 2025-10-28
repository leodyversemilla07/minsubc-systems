<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Database\Factories\OfficerFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Officer extends Model
{
    use HasFactory;

    protected $table = 'usg_officers';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): OfficerFactory
    {
        return OfficerFactory::new();
    }

    protected $fillable = [
        'user_id',
        'name',
        'position',
        'department',
        'email',
        'phone',
        'photo',
        'bio',
        'term_start',
        'term_end',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'term_start' => 'datetime',
            'term_end' => 'datetime',
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('is_active', false);
    }

    public function scopeCurrentTerm(Builder $query): Builder
    {
        return $query->where('term_start', '<=', now())
            ->where('term_end', '>=', now());
    }
}
