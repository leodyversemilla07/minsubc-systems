import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    Archive,
    CheckCircle,
    Clock,
    Eye,
    EyeOff,
    FileText,
    XCircle,
} from 'lucide-react';

type Status =
    | 'draft'
    | 'pending'
    | 'review'
    | 'published'
    | 'rejected'
    | 'archived'
    | 'cancelled'
    | 'completed'
    | 'active'
    | 'inactive';

interface StatusBadgeProps {
    status: Status;
    className?: string;
    showIcon?: boolean;
}

const statusConfig = {
    draft: {
        variant: 'secondary' as const,
        label: 'Draft',
        icon: FileText,
        className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    },
    pending: {
        variant: 'default' as const,
        label: 'Pending',
        icon: Clock,
        className:
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    },
    review: {
        variant: 'default' as const,
        label: 'Under Review',
        icon: Clock,
        className:
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    },
    published: {
        variant: 'default' as const,
        label: 'Published',
        icon: Eye,
        className:
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    },
    rejected: {
        variant: 'destructive' as const,
        label: 'Rejected',
        icon: XCircle,
        className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    },
    archived: {
        variant: 'secondary' as const,
        label: 'Archived',
        icon: Archive,
        className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    },
    cancelled: {
        variant: 'destructive' as const,
        label: 'Cancelled',
        icon: XCircle,
        className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    },
    completed: {
        variant: 'default' as const,
        label: 'Completed',
        icon: CheckCircle,
        className:
            'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    },
    active: {
        variant: 'default' as const,
        label: 'Active',
        icon: CheckCircle,
        className:
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    },
    inactive: {
        variant: 'secondary' as const,
        label: 'Inactive',
        icon: EyeOff,
        className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    },
};

export default function StatusBadge({
    status,
    className,
    showIcon = false,
}: StatusBadgeProps) {
    const config = statusConfig[status] ?? null;

    // Defensive fallback when an unknown status is provided.
    if (!config) {
        // Log the unknown status to help with debugging in the browser console.
        // This will help backend or data providers identify what value is missing.
        // Avoid cluttering logs in production — this is a low-risk informational log.
        console.warn('[StatusBadge] Unknown status:', status);
        return (
            <Badge
                variant="secondary"
                className={cn('bg-gray-100 text-gray-700', className)}
            >
                {String(status) || 'Unknown'}
            </Badge>
        );
    }

    const Icon = config.icon;

    return (
        <Badge
            variant={config.variant}
            className={cn(config.className, className)}
        >
            {showIcon && Icon && <Icon className="mr-1 h-3 w-3" />}
            {config.label}
        </Badge>
    );
}
