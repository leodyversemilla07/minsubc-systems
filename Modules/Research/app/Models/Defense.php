<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Defense extends Model
{
    protected $table = 'res_defenses';
    protected $fillable = ['proposal_id', 'stage', 'scheduled_date', 'start_time', 'end_time', 'venue', 'status', 'final_grade', 'remarks', 'recommendations', 'panel_scores', 'completed_at'];
    protected function casts(): array { return ['scheduled_date' => 'date', 'panel_scores' => 'json', 'completed_at' => 'date']; }
    public function proposal(): BelongsTo { return $this->belongsTo(Proposal::class); }
    public function scores(): HasMany { return $this->hasMany(DefenseScore::class); }
}