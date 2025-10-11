import React from 'react';
import { Badge } from '@/components/ui/badge';
import { statusColors, StatusColorKey } from '@/lib/status-colors';

interface StatusBadgeProps {
    status: StatusColorKey;
    label?: string;
    className?: string;
}

const statusLabels: Record<StatusColorKey, string> = {
    pending_payment: 'Pending Payment',
    payment_expired: 'Payment Expired',
    paid: 'Paid',
    processing: 'Processing',
    ready_for_claim: 'Ready for Claim',
    claimed: 'Claimed',
    released: 'Released',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
};

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
    const displayLabel = label || statusLabels[status];
    const colorClasses = statusColors[status];

    return (
        <Badge className={`${colorClasses} ${className}`.trim()}>
            {displayLabel}
        </Badge>
    );
}

export default StatusBadge;
