<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Alumni\Database\Factories\DonationFactory;

class Donation extends Model
{
    use HasFactory;

    protected $table = 'alm_donations';

    protected $fillable = [
        'alumnus_id', 'amount', 'currency', 'donation_type',
        'purpose', 'payment_method', 'transaction_ref',
        'donated_at', 'is_anonymous', 'remarks',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'donated_at' => 'date',
            'is_anonymous' => 'boolean',
        ];
    }

    public function alumnus(): BelongsTo
    {
        return $this->belongsTo(Alumnus::class);
    }

    protected static function newFactory(): DonationFactory
    {
        return DonationFactory::new();
    }
}