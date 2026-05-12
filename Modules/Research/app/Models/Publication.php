<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Research\Database\Factories\PublicationFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publication extends Model
{
    use HasFactory;
    protected $table = 'res_publications';
    protected $fillable = ['proposal_id', 'title', 'abstract', 'journal_name', 'issn', 'doi', 'volume', 'issue', 'publication_year', 'url', 'status', 'published_at'];
    protected static function newFactory(): PublicationFactory { return PublicationFactory::new(); }
    protected function casts(): array { return ['published_at' => 'date']; }
    public function proposal(): BelongsTo { return $this->belongsTo(Proposal::class); }
    public function authors(): HasMany { return $this->hasMany(PublicationAuthor::class); }
}