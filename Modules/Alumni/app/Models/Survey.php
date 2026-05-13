<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Alumni\Database\Factories\SurveyFactory;

class Survey extends Model
{
    use HasFactory;

    protected $table = 'alm_surveys';

    protected $fillable = [
        'title', 'description', 'survey_type',
        'target_year', 'is_active',
        'starts_at', 'ends_at',
    ];

    protected function casts(): array
    {
        return [
            'target_year' => 'integer',
            'is_active' => 'boolean',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function questions(): HasMany
    {
        return $this->hasMany(SurveyQuestion::class, 'survey_id');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class, 'survey_id');
    }

    protected static function newFactory(): SurveyFactory
    {
        return SurveyFactory::new();
    }
}