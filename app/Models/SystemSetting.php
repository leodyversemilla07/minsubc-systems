<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SystemSetting extends Model
{
    protected $fillable = [
        'setting_key',
        'setting_value',
        'description',
        'updated_by',
    ];

    protected $casts = [
        'updated_by' => 'integer',
    ];

    /**
     * Get the user who last updated this setting.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get a setting value by key.
     */
    public static function getValue(string $key, $default = null)
    {
        $setting = static::where('setting_key', $key)->first();

        return $setting ? $setting->setting_value : $default;
    }

    /**
     * Set a setting value by key.
     */
    public static function setValue(string $key, string $value, ?string $description = null, ?int $updatedBy = null): void
    {
        static::updateOrCreate(
            ['setting_key' => $key],
            [
                'setting_value' => $value,
                'description' => $description,
                'updated_by' => $updatedBy,
            ]
        );
    }

    /**
     * Get all settings as a key-value array.
     */
    public static function getAllAsArray(): array
    {
        return static::pluck('setting_value', 'setting_key')->toArray();
    }
}
