<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\USG\Database\Factories\VMGOFactory;

class VMGO extends Model
{
    use HasFactory;

    protected $table = 'vmgo';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): VMGOFactory
    {
        return VMGOFactory::new();
    }

    protected $fillable = [
        'vision',
        'mission',
        'goals',
        'objectives',
        'effective_date',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'goals' => 'array',
            'objectives' => 'array',
            'effective_date' => 'datetime',
        ];
    }

    // Relationships
    public function updatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
