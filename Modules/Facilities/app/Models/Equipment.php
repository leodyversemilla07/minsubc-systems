<?php

namespace Modules\Facilities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Facilities\Database\Factories\EquipmentFactory;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'fac_equipment';

    protected $fillable = [
        'facility_id', 'name', 'code', 'description',
        'quantity', 'available_quantity',
        'condition', 'purchase_date', 'last_maintenance',
        'status', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'available_quantity' => 'integer',
            'purchase_date' => 'date',
            'last_maintenance' => 'date',
        ];
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    protected static function newFactory(): EquipmentFactory
    {
        return EquipmentFactory::new();
    }
}