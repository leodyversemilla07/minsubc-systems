<?php

namespace Modules\Helpdesk\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;
    protected $table = 'hlp_tickets';
    protected $fillable = ['category_id', 'title', 'description', 'priority', 'status', 'reported_by', 'assigned_to', 'resolved_at'];
    protected function casts(): array { return ['resolved_at' => 'datetime']; }
    public function category(): BelongsTo { return $this->belongsTo(TicketCategory::class, 'category_id'); }
    public function reporter(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'reported_by'); }
    public function assignee(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'assigned_to'); }
    public function comments(): HasMany { return $this->hasMany(TicketComment::class, 'ticket_id'); }

    protected static function newFactory()
    {
        return \Modules\Helpdesk\Database\Factories\TicketFactory::new();
    }
}