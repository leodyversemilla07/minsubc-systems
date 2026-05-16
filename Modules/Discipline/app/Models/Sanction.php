<?php

namespace Modules\Discipline\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sanction extends Model
{
    use HasFactory;

    protected $table = 'dsc_sanctions';

    protected $fillable = [
        'incident_id', 'type', 'description', 'start_date', 'end_date',
        'issued_by', 'status', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }

    public function issuer(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'issued_by');
    }

    protected static function newFactory(): \Modules\Discipline\Database\Factories\SanctionFactory
    {
        return \Modules\Discipline\Database\Factories\SanctionFactory::new();
    }
}