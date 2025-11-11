<?php

namespace Modules\Registrar\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Registrar\Database\Factories\StudentFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'student_id',
        'phone',
        'course',
        'year_level',
        'campus',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'year_level' => 'integer',
        ];
    }

    protected static function newFactory(): StudentFactory
    {
        return StudentFactory::new();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }
}
