<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Research\Database\Factories\JournalFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Journal extends Model
{
    use HasFactory;
    protected $table = 'res_journals';
    protected $fillable = ['name', 'issn', 'publisher', 'description', 'frequency', 'status'];
    protected static function newFactory(): JournalFactory { return JournalFactory::new(); }
    public function issues(): HasMany { return $this->hasMany(JournalIssue::class); }
}