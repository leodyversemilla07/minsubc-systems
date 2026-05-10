<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\EvaluationFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
    use HasFactory;

    protected static function newFactory(): EvaluationFactory
    {
        return EvaluationFactory::new();
    }

    protected $table = 'hr_evaluations';

    protected $fillable = [
        'employee_id', 'evaluator_id', 'type', 'period',
        'rating', 'comments', 'status', 'submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'submitted_at' => 'datetime',
        ];
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function evaluator(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'evaluator_id');
    }
}