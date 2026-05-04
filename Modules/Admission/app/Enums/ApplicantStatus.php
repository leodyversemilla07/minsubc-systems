<?php

namespace Modules\Admission\Enums;

enum ApplicantStatus: string
{
    case Draft = 'draft';
    case Submitted = 'submitted';
    case UnderReview = 'under_review';
    case InterviewScheduled = 'interview_scheduled';
    case Accepted = 'accepted';
    case Waitlisted = 'waitlisted';
    case Rejected = 'rejected';
    case Enrolled = 'enrolled';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::Submitted => 'Submitted',
            self::UnderReview => 'Under Review',
            self::InterviewScheduled => 'Interview Scheduled',
            self::Accepted => 'Accepted',
            self::Waitlisted => 'Waitlisted',
            self::Rejected => 'Rejected',
            self::Enrolled => 'Enrolled',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Draft => 'gray',
            self::Submitted => 'blue',
            self::UnderReview => 'yellow',
            self::InterviewScheduled => 'purple',
            self::Accepted => 'teal',
            self::Waitlisted => 'orange',
            self::Rejected => 'red',
            self::Enrolled => 'green',
        };
    }

    public static function activeStatuses(): array
    {
        return [self::Submitted, self::UnderReview, self::InterviewScheduled];
    }

    public static function terminalStatuses(): array
    {
        return [self::Accepted, self::Rejected, self::Waitlisted, self::Enrolled];
    }
}
