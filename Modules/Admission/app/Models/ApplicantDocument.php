<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicantDocument extends Model
{
    protected $table = 'admission_applicant_documents';
    protected $fillable = [
        'applicant_id', 'requirement_id', 'name', 'file_path', 'original_name',
        'mime_type', 'file_size', 'status', 'admin_notes', 'reviewed_at', 'reviewed_by',
    ];

    protected function casts(): array
    {
        return ['file_size' => 'integer', 'status' => 'string', 'reviewed_at' => 'datetime'];
    }

    public function applicant(): BelongsTo { return $this->belongsTo(Applicant::class, 'applicant_id'); }
    public function requirement(): BelongsTo { return $this->belongsTo(AdmissionRequirement::class, 'requirement_id'); }
    public function reviewer(): BelongsTo { return $this->belongsTo(User::class, 'reviewed_by'); }
}
