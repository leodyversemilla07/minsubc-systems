<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clinic\Database\Factories\PhysicalExamFactory;

class PhysicalExam extends Model
{
    use HasFactory;

    protected $table = 'cls_physical_exams';

    protected $fillable = [
        'medical_record_id', 'exam_date', 'height_cm', 'weight_kg',
        'bmi', 'blood_pressure', 'heart_rate', 'temperature',
        'vision_left', 'vision_right', 'color_vision',
        'hearing_left', 'hearing_right',
        'chest_xray', 'lab_results', 'findings', 'cleared_by',
        'is_cleared', 'recommendations',
    ];

    protected function casts(): array
    {
        return [
            'exam_date' => 'date',
            'height_cm' => 'decimal:1',
            'weight_kg' => 'decimal:1',
            'bmi' => 'decimal:1',
            'is_cleared' => 'boolean',
        ];
    }

    public function medicalRecord(): BelongsTo
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    protected static function newFactory(): PhysicalExamFactory
    {
        return PhysicalExamFactory::new();
    }
}