<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Admission\Database\Factories\ApplicantFactory;
use Modules\Admission\Enums\ApplicantStatus;

class Applicant extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'admission_applicants';

    protected $fillable = [
        'application_number', 'program_id', 'user_id',
        'first_name', 'middle_name', 'last_name', 'email', 'phone',
        'date_of_birth', 'gender', 'address', 'city', 'province', 'zip_code',
        'last_school_attended', 'strand', 'gpa',
        'status', 'remarks', 'submitted_at', 'accepted_at', 'enrolled_at',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'gpa' => 'decimal:2',
            'status' => ApplicantStatus::class,
            'submitted_at' => 'datetime',
            'accepted_at' => 'datetime',
            'enrolled_at' => 'datetime',
        ];
    }

    protected static function newFactory(): ApplicantFactory
    {
        return ApplicantFactory::new();
    }

    public function program(): BelongsTo { return $this->belongsTo(AdmissionProgram::class, 'program_id'); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function documents(): HasMany { return $this->hasMany(ApplicantDocument::class, 'applicant_id'); }
    public function evaluations(): HasMany { return $this->hasMany(Evaluation::class, 'applicant_id'); }
    public function enrollment(): HasOne { return $this->hasOne(Enrollment::class, 'applicant_id'); }
    public function auditLogs(): HasMany { return $this->hasMany(AdmissionAuditLog::class, 'applicant_id'); }

    public function getFullNameAttribute(): string
    {
        return trim(implode(' ', array_filter([$this->first_name, $this->middle_name, $this->last_name])));
    }

    public function scopeByStatus($query, ApplicantStatus $status) { return $query->where('status', $status); }
    public function scopeSubmitted($query) { return $query->whereNotNull('submitted_at'); }
}