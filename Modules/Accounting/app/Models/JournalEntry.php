<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalEntry extends Model
{
    protected $table = 'acc_journal_entries';

    protected $fillable = ['entry_number', 'entry_date', 'description', 'type', 'referenceable_type', 'referenceable_id', 'total_debit', 'total_credit', 'status'];

    protected function casts(): array
    {
        return ['entry_date' => 'date', 'total_debit' => 'decimal:2', 'total_credit' => 'decimal:2'];
    }

    public function lines(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(JournalLine::class, 'journal_entry_id');
    }
}