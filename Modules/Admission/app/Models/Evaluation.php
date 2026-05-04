<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
    protected $table = 'admission_evaluations';
    protected $fillable = ['applicant_id', 'evaluator_id', 'decision', 'notes', 'score', 'criteria_scores'];

    protected function casts(): array
    {
        return ['score' => 'decimal:2', 'criteria_scores' => 'array', 'decision' => 'string'];
    }

    public function applicant(): BelongsTo { return $this->belongsTo(Applicant::class, 'applicant_id'); }
    public function evaluator(): BelongsTo { return $this->belongsTo(User::class, 'evaluator_id'); }
}
