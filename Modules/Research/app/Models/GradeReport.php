<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GradeReport extends Model
{
    protected $table = 'res_grade_reports';
    protected $fillable = ['proposal_id', 'student_id', 'proposal_grade', 'final_defense_grade', 'manuscript_grade', 'final_grade', 'remarks', 'released_at'];
    protected function casts(): array { return ['released_at' => 'date']; }
    public function proposal(): BelongsTo { return $this->belongsTo(Proposal::class); }
}