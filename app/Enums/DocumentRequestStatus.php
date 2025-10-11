<?php

namespace App\Enums;

enum DocumentRequestStatus: string
{
    case PendingPayment = 'pending_payment';
    case PaymentExpired = 'payment_expired';
    case Paid = 'paid';
    case Processing = 'processing';
    case ReadyForClaim = 'ready_for_claim';
    case Claimed = 'claimed';
    case Released = 'released';
    case Cancelled = 'cancelled';
    case Rejected = 'rejected';

    /**
     * Get the human-readable label for the status.
     */
    public function label(): string
    {
        return match ($this) {
            self::PendingPayment => 'Pending Payment',
            self::PaymentExpired => 'Payment Expired',
            self::Paid => 'Paid',
            self::Processing => 'Processing',
            self::ReadyForClaim => 'Ready for Claim',
            self::Claimed => 'Claimed',
            self::Released => 'Released',
            self::Cancelled => 'Cancelled',
            self::Rejected => 'Rejected',
        };
    }

    /**
     * Get the description for the status.
     */
    public function description(): string
    {
        return match ($this) {
            self::PendingPayment => 'Initial status when request is submitted. Student must complete payment within 48 hours (payment deadline).',
            self::PaymentExpired => 'Payment deadline has passed without payment. Request is no longer active.',
            self::Paid => 'Payment has been successfully completed (digital or cash). Request is queued for processing.',
            self::Processing => 'Registrar staff is currently working on the document. Document is being prepared/generated.',
            self::ReadyForClaim => 'Document has been generated and is ready. Student can schedule pickup or claim the document.',
            self::Claimed => 'Student has picked up the document. Intermediate status before final release.',
            self::Released => 'Document has been officially released to the student or authorized representative. Final successful status.',
            self::Cancelled => 'Request was cancelled by the student or system.',
            self::Rejected => 'Request was rejected by registrar staff. Includes rejection reason.',
        };
    }

    /**
     * Get the Tailwind color classes for the status badge.
     */
    public function colorClasses(): string
    {
        return match ($this) {
            self::PendingPayment => 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            self::PaymentExpired => 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            self::Paid => 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            self::Processing => 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            self::ReadyForClaim => 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            self::Claimed => 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
            self::Released => 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
            self::Cancelled => 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            self::Rejected => 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
    }

    /**
     * Get the simple color name for the status.
     */
    public function color(): string
    {
        return match ($this) {
            self::PendingPayment => 'yellow',
            self::PaymentExpired => 'red',
            self::Paid => 'blue',
            self::Processing => 'purple',
            self::ReadyForClaim => 'green',
            self::Claimed => 'teal',
            self::Released => 'gray',
            self::Cancelled => 'red',
            self::Rejected => 'red',
        };
    }

    /**
     * Check if the current status can transition to a new status.
     */
    public function canTransitionTo(self $newStatus): bool
    {
        return match ($this) {
            self::PendingPayment => in_array($newStatus, [
                self::Paid,
                self::PaymentExpired,
                self::Cancelled,
            ]),
            self::PaymentExpired => in_array($newStatus, [
                self::Cancelled,
            ]),
            self::Paid => in_array($newStatus, [
                self::Processing,
                self::Cancelled,
            ]),
            self::Processing => in_array($newStatus, [
                self::ReadyForClaim,
                self::Rejected,
                self::Cancelled,
            ]),
            self::ReadyForClaim => in_array($newStatus, [
                self::Claimed,
                self::Cancelled,
            ]),
            self::Claimed => in_array($newStatus, [
                self::Released,
                self::Cancelled,
            ]),
            self::Released, self::Cancelled, self::Rejected => false,
        };
    }

    /**
     * Check if this is a final status (cannot transition further).
     */
    public function isFinal(): bool
    {
        return in_array($this, [
            self::Released,
            self::Cancelled,
            self::Rejected,
        ]);
    }

    /**
     * Check if this is an active status (request is in progress).
     */
    public function isActive(): bool
    {
        return in_array($this, [
            self::PendingPayment,
            self::Paid,
            self::Processing,
            self::ReadyForClaim,
            self::Claimed,
        ]);
    }

    /**
     * Get all active statuses.
     */
    public static function activeStatuses(): array
    {
        return [
            self::PendingPayment,
            self::Paid,
            self::Processing,
            self::ReadyForClaim,
            self::Claimed,
        ];
    }

    /**
     * Get all final statuses.
     */
    public static function finalStatuses(): array
    {
        return [
            self::Released,
            self::Cancelled,
            self::Rejected,
        ];
    }

    /**
     * Get all status values as strings.
     */
    public static function values(): array
    {
        return array_map(fn ($case) => $case->value, self::cases());
    }

    /**
     * Get all status labels.
     */
    public static function labels(): array
    {
        return array_map(fn ($case) => $case->label(), self::cases());
    }
}
