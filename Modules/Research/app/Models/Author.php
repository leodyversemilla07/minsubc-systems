<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Author extends Model
{
    protected $table = 'res_authors';
    protected $fillable = ['proposal_id', 'student_id', 'role', 'sort_order'];
    public function proposal(): BelongsTo { return $this->belongsTo(Proposal::class); }
}