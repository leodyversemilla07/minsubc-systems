<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Research\Database\Factories\ResearchTypeFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResearchType extends Model
{
    use HasFactory;
    protected $table = 'res_research_types';
    protected $fillable = ['name', 'code', 'description', 'is_active'];
    protected static function newFactory(): ResearchTypeFactory { return ResearchTypeFactory::new(); }
    protected function casts(): array { return ['is_active' => 'boolean']; }
    public function proposals(): HasMany { return $this->hasMany(Proposal::class); }
}