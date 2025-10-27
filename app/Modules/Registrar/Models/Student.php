<?php

namespace App\Modules\Registrar\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'student_id',
        'user_id',
        'phone',
        'course',
        'year_level',
        'campus',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'string',
            'year_level' => 'integer',
        ];
    }

    /**
     * Get the user associated with this student.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Get the document requests for this student.
     */
    public function documentRequests(): HasMany
    {
        return $this->hasMany(DocumentRequest::class, 'student_id', 'student_id');
    }

    /**
     * Get the notifications for this student.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'student_id', 'student_id');
    }
}
