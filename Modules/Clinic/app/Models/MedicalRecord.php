<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Clinic\Database\Factories\MedicalRecordFactory;

class MedicalRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cls_medical_records';

    protected $fillable = [
        'student_id', 'first_name', 'last_name', 'birth_date', 'gender',
        'blood_type', 'allergies', 'medical_conditions', 'medications',
        'emergency_contact_name', 'emergency_contact_phone',
        'health_insurance', 'insurance_policy_no',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'allergies' => 'array',
            'medical_conditions' => 'array',
            'medications' => 'array',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id', 'student_id');
    }

    public function consultations(): HasMany
    {
        return $this->hasMany(Consultation::class, 'medical_record_id');
    }

    public function immunizations(): HasMany
    {
        return $this->hasMany(Immunization::class, 'medical_record_id');
    }

    public function dentalRecords(): HasMany
    {
        return $this->hasMany(DentalRecord::class, 'medical_record_id');
    }

    public function physicalExams(): HasMany
    {
        return $this->hasMany(PhysicalExam::class, 'medical_record_id');
    }

    protected static function newFactory(): MedicalRecordFactory
    {
        return MedicalRecordFactory::new();
    }
}