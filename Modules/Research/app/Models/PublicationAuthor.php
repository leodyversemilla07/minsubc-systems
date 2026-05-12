<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PublicationAuthor extends Model
{
    protected $table = 'res_publication_authors';
    protected $fillable = ['publication_id', 'name', 'student_id', 'affiliation', 'role', 'sort_order'];
    public function publication(): BelongsTo { return $this->belongsTo(Publication::class); }
}