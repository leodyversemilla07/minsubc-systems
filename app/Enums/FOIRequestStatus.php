<?php

namespace App\Enums;

enum FOIRequestStatus: string
{
    case Pending = 'pending';
    case UnderReview = 'under_review';
    case Completed = 'completed';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::UnderReview => 'Under Review',
            self::Completed => 'Completed',
            self::Rejected => 'Rejected',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Pending => 'yellow',
            self::UnderReview => 'blue',
            self::Completed => 'green',
            self::Rejected => 'red',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
