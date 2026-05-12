<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalIssue extends Model
{
    protected $table = 'res_journal_issues';
    protected $fillable = ['journal_id', 'title', 'volume', 'issue', 'year', 'published_at', 'status'];
    protected function casts(): array { return ['published_at' => 'date']; }
    public function journal(): BelongsTo { return $this->belongsTo(Journal::class); }
}