<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Cache;

class SystemSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
        'setting_key',
        'setting_value',
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
     * Get a setting value by key (new format).
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::remember("system_setting_{$key}", 3600, function () use ($key, $default) {
            // Try new format first
            $setting = self::where('key', $key)->first();
            if ($setting) {
                return match ($setting->type ?? 'string') {
                    'integer' => (int) $setting->value,
                    'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                    'float' => (float) $setting->value,
                    'json' => json_decode($setting->value, true),
                    default => $setting->value,
                };
            }
            // Fallback to legacy format
            $setting = self::where('setting_key', $key)->first();
            if ($setting) {
                return $setting->setting_value;
            }

            return $default;
        });
    }

    /**
     * Set a setting value by key (new format).
     */
    public static function set(string $key, mixed $value, ?string $type = 'string', ?string $description = null): void
    {
        // Try new format first
        $columns = self::getTableColumns();
        if (in_array('key', $columns) && in_array('value', $columns)) {
            self::updateOrCreate(
                ['key' => $key],
                [
                    'value' => (string) $value,
                    'type' => $type,
                    'description' => $description,
                ]
            );
        } elseif (in_array('setting_key', $columns) && in_array('setting_value', $columns)) {
            self::updateOrCreate(
                ['setting_key' => $key],
                [
                    'setting_value' => (string) $value,
                    'description' => $description,
                ]
            );
        }
        Cache::forget("system_setting_{$key}");
    }

    /**
     * Get the table columns for the model.
     */
    protected static function getTableColumns(): array
    {
        return \Schema::getColumnListing((new static)->getTable());
    }

    /**
     * Get the daily document request limit.
     */
    public static function getDailyLimit(): int
    {
        return (int) self::get('daily_document_request_limit', 140);
    }

    /**
     * Get a setting value by key (legacy format).
     */
    public static function getValue(string $key, $default = null)
    {
        $setting = static::where('setting_key', $key)->first();

        return $setting ? $setting->setting_value : $default;
    }

    /**
     * Set a setting value by key (legacy format).
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
