<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Panel extends Model
{
    protected $table = 'res_panels';
    protected $fillable = ['proposal_id', 'panelist_id', 'role', 'designation'];
    public function proposal(): BelongsTo { return $this->belongsTo(Proposal::class); }
    public function panelist(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'panelist_id'); }
}