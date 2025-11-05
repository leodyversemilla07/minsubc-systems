<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;
use Modules\USG\Database\Factories\OfficerFactory;

class Officer extends Model
{
    use HasFactory, Searchable;

    protected $table = 'officers';

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

    // Accessors
    protected function photoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->photo ? Storage::disk('public')->url($this->photo) : null,
        );
    }

    // Scout configuration
    public function shouldBeSearchable(): bool
    {
        return $this->is_active === true;
    }

    #[SearchUsingFullText(['name', 'position', 'department', 'bio'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'position' => $this->position,
            'department' => $this->department,
            'bio' => $this->bio,
            'email' => $this->email,
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
