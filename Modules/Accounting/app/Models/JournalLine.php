<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalLine extends Model
{
    protected $table = 'acc_journal_lines';

    protected $fillable = ['journal_entry_id', 'chart_account_id', 'debit', 'credit', 'description'];

    protected function casts(): array
    {
        return ['debit' => 'decimal:2', 'credit' => 'decimal:2'];
    }

    public function journalEntry(): BelongsTo
    {
        return $this->belongsTo(JournalEntry::class, 'journal_entry_id');
    }

    public function chartAccount(): BelongsTo
    {
        return $this->belongsTo(ChartAccount::class, 'chart_account_id');
    }
}