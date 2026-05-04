<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    protected $table = 'admission_enrollments';
    protected $fillable = [
        'applicant_id', 'user_id', 'student_id', 'status', 'academic_year',
        'semester', 'year_level', 'enrollment_data', 'confirmed_at', 'enrolled_at', 'confirmed_by', 'notes',
    ];

    protected function casts(): array
    {
        return ['enrollment_data' => 'array', 'confirmed_at' => 'datetime', 'enrolled_at' => 'datetime'];
    }

    public function applicant(): BelongsTo { return $this->belongsTo(Applicant::class, 'applicant_id'); }
    public function user(): BelongsTo { return $this->belongsTo(User::class, 'user_id'); }
    public function confirmedBy(): BelongsTo { return $this->belongsTo(User::class, 'confirmed_by'); }
}
