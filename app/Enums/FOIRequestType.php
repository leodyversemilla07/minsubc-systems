<?php

namespace App\Enums;

enum FOIRequestType: string
{
    case Document = 'document';
    case Information = 'information';
    case Meeting = 'meeting';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Document => 'Document Request',
            self::Information => 'Information Request',
            self::Meeting => 'Meeting Request',
            self::Other => 'Other',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
