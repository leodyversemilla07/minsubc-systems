<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Curriculum\Database\Factories\TextbookFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Textbook extends Model
{
    use HasFactory;
    protected $table = 'cur_textbooks';
    protected $fillable = ['title', 'author', 'isbn', 'publisher', 'year', 'type'];
    protected static function newFactory(): TextbookFactory { return TextbookFactory::new(); }
    public function syllabi(): BelongsToMany { return $this->belongsToMany(Syllabus::class, 'cur_syllabus_textbooks', 'textbook_id', 'syllabus_id')->withPivot('type'); }
}