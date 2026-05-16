<?php

namespace Modules\Dormitory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DormAssignment extends Model
{
    use HasFactory;
    protected $table = 'drm_assignments';
    protected $fillable = ['bed_id', 'student_id', 'checkin_date', 'checkout_date', 'status', 'fee_per_semester', 'notes'];
    protected function casts(): array { return ['checkin_date' => 'date', 'checkout_date' => 'date', 'fee_per_semester' => 'decimal:2']; }
    public function bed(): BelongsTo { return $this->belongsTo(DormBed::class, 'bed_id'); }
    public function student(): BelongsTo { return $this->belongsTo(\App\Models\Student::class, 'student_id', 'student_id'); }

    protected static function newFactory()
    {
        return \Modules\Dormitory\Database\Factories\DormAssignmentFactory::new();
    }
}