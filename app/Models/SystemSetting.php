<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class SystemSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'setting_key',
        'value',
        'type',
        'description',
        'is_encrypted',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_encrypted' => 'boolean',
        ];
    }

    /**
     * Get the decrypted value of the setting.
     */
    public function getDecryptedValueAttribute(): ?string
    {
        if ($this->is_encrypted && $this->value) {
            return Crypt::decryptString($this->value);
        }

        return $this->value;
    }

    /**
     * Set the value of the setting, encrypting if necessary.
     */
    public function setValueAttribute(mixed $value): void
    {
        if ($this->is_encrypted && $value) {
            $this->attributes['value'] = Crypt::encryptString($value);
        } else {
            $this->attributes['value'] = $value;
        }
    }

    /**
     * Get a setting value by key.
     */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        $setting = static::where('setting_key', $key)->first();

        return $setting ? $setting->decrypted_value : $default;
    }

    /**
     * Set a setting value by key.
     */
    public static function setValue(string $key, mixed $value, string $type = 'general', ?string $description = null, bool $encrypt = false): static
    {
        return static::updateOrCreate(
            ['setting_key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'description' => $description,
                'is_encrypted' => $encrypt,
            ]
        );
    }
}
