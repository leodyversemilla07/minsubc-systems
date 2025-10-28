<?php

namespace App\Enums;

enum FOIPriority: string
{
    case Low = 'low';
    case Medium = 'medium';
    case High = 'high';

    public function label(): string
    {
        return match ($this) {
            self::Low => 'Low',
            self::Medium => 'Medium',
            self::High => 'High',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Low => 'gray',
            self::Medium => 'blue',
            self::High => 'red',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
