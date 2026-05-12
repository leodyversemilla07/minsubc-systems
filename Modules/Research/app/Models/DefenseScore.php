<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DefenseScore extends Model
{
    protected $table = 'res_defense_scores';
    protected $fillable = ['defense_id', 'panelist_id', 'criteria_scores', 'total_score', 'comments'];
    protected function casts(): array { return ['criteria_scores' => 'json']; }
    public function defense(): BelongsTo { return $this->belongsTo(Defense::class); }
    public function panelist(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'panelist_id'); }
}