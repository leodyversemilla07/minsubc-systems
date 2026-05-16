<?php

namespace Modules\Helpdesk\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TicketCategory extends Model
{
    use HasFactory;
    protected $table = 'hlp_categories';
    protected $fillable = ['name', 'description', 'color', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
    public function tickets(): HasMany { return $this->hasMany(Ticket::class, 'category_id'); }

    protected static function newFactory()
    {
        return \Modules\Helpdesk\Database\Factories\TicketCategoryFactory::new();
    }
}