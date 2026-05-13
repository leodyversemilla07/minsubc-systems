<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Alumni\Database\Factories\EducationFactory;

class Education extends Model
{
    use HasFactory;

    protected $table = 'alm_educations';

    protected $fillable = [
        'alumnus_id', 'degree', 'institution', 'year_graduated',
        'honors', 'is_higher_education',
    ];

    protected function casts(): array
    {
        return [
            'year_graduated' => 'integer',
            'is_higher_education' => 'boolean',
        ];
    }

    public function alumnus(): BelongsTo
    {
        return $this->belongsTo(Alumnus::class);
    }

    protected static function newFactory(): EducationFactory
    {
        return EducationFactory::new();
    }
}