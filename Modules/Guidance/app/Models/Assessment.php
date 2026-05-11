<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\AssessmentFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assessment extends Model
{
    use HasFactory;

    protected $table = 'gdn_assessments';

    protected $fillable = [
        'assessment_code', 'student_id', 'counselor_id', 'type',
        'responses', 'score', 'interpretation', 'status', 'submitted_at', 'reviewed_at',
    ];

    protected static function newFactory(): AssessmentFactory
    {
        return AssessmentFactory::new();
    }

    protected function casts(): array
    {
        return ['responses' => 'json', 'submitted_at' => 'datetime', 'reviewed_at' => 'datetime'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }
}