<?php

namespace Modules\Helpdesk\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketComment extends Model
{
    use HasFactory;
    protected $table = 'hlp_comments';
    protected $fillable = ['ticket_id', 'user_id', 'body', 'is_internal'];
    protected function casts(): array { return ['is_internal' => 'boolean']; }
    public function ticket(): BelongsTo { return $this->belongsTo(Ticket::class); }
    public function user(): BelongsTo { return $this->belongsTo(\App\Models\User::class); }

    protected static function newFactory()
    {
        return \Modules\Helpdesk\Database\Factories\TicketCommentFactory::new();
    }
}