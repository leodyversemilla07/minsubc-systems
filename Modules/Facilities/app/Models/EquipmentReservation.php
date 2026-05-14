<?php

namespace Modules\Facilities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentReservation extends Model
{
    use HasFactory;

    protected $table = 'fac_equipment_reservations';

    protected $fillable = [
        'reservation_id', 'equipment_id', 'quantity_used',
    ];

    protected function casts(): array
    {
        return [
            'quantity_used' => 'integer',
        ];
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }
}