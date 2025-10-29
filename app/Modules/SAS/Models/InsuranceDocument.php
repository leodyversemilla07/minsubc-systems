<?php

namespace App\Modules\SAS\Models;

use Database\Factories\InsuranceDocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InsuranceDocument extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'insurance_id',
        'document_name',
        'file_path',
        'file_size',
        'uploaded_at',
    ];

    protected function casts(): array
    {
        return [
            'uploaded_at' => 'datetime',
        ];
    }

    protected static function newFactory(): InsuranceDocumentFactory
    {
        return InsuranceDocumentFactory::new();
    }

    public function insurance(): BelongsTo
    {
        return $this->belongsTo(InsuranceRecord::class, 'insurance_id');
    }
}
