<?php namespace Modules\Research\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Research\Database\Factories\ProposalFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Proposal extends Model
{
    use HasFactory;
    protected $table = 'res_proposals';
    protected $fillable = ['title', 'research_type_id', 'student_id', 'adviser_id', 'proposal_code', 'abstract', 'keywords', 'status', 'submitted_at', 'approved_at', 'adviser_feedback', 'submitted_by'];
    protected static function newFactory(): ProposalFactory { return ProposalFactory::new(); }
    protected function casts(): array { return ['submitted_at' => 'date', 'approved_at' => 'date']; }
    public function researchType(): BelongsTo { return $this->belongsTo(ResearchType::class); }
    public function adviser(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'adviser_id'); }
    public function authors(): HasMany { return $this->hasMany(Author::class); }
    public function panels(): HasMany { return $this->hasMany(Panel::class); }
    public function defenses(): HasMany { return $this->hasMany(Defense::class); }
    public function gradeReports(): HasMany { return $this->hasMany(GradeReport::class); }
    public function publication(): HasMany { return $this->hasMany(Publication::class); }
}