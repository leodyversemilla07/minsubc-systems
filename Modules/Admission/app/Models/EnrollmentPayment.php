<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class EnrollmentPayment extends Model
{
    use HasFactory;

    protected $table = 'admission_enrollment_payments';

    protected $fillable = [
        'enrollment_id',
        'payment_number',
        'type',
        'amount',
        'method',
        'reference_number',
        'status',
        'notes',
        'verified_by',
        'verified_at',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'verified_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (EnrollmentPayment $payment) {
            if (empty($payment->payment_number)) {
                $payment->payment_number = 'EP-' . date('Ymd') . '-' . strtoupper(Str::random(6));
            }
        });
    }

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeVerified($query)
    {
        return $query->where('status', 'verified');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function approve(User $verifier): bool
    {
        $this->update([
            'status' => 'verified',
            'verified_by' => $verifier->id,
            'verified_at' => now(),
        ]);

        return true;
    }

    public function reject(User $verifier, ?string $notes = null): bool
    {
        $this->update([
            'status' => 'rejected',
            'verified_by' => $verifier->id,
            'verified_at' => now(),
            'notes' => $notes ?? $this->notes,
        ]);

        return true;
    }

    public function isVerified(): bool
    {
        return $this->status === 'verified';
    }

    public function getDisplayStatusAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pending Verification',
            'verified' => 'Verified',
            'rejected' => 'Rejected',
            default => ucfirst($this->status),
        };
    }
}