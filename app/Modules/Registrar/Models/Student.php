<?php

namespace App\Modules\Registrar\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    protected $primaryKey = 'student_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'student_id',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone',
        'course',
        'year_level',
        'campus',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
        'year_level' => 'integer',
    ];

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
