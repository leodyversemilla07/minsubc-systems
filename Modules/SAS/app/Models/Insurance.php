<?php

namespace Modules\SAS\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Insurance extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'insurance_records';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'insurance_provider',
        'policy_number',
        'policy_type',
        'coverage_amount',
        'effective_date',
        'expiration_date',
        'beneficiary_name',
        'beneficiary_relationship',
        'policy_document_path',
        'status',
        'review_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'coverage_amount' => 'decimal:2',
        'effective_date' => 'date',
        'expiration_date' => 'date',
    ];

    /**
     * Get the student that owns the insurance record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
