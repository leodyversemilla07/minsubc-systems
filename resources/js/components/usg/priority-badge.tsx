import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface PriorityBadgeProps {
    priority: Priority;
    className?: string;
}

const priorityConfig = {
    low: {
        variant: 'secondary' as const,
        label: 'Low',
        className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    },
    medium: {
        variant: 'default' as const,
        label: 'Medium',
        className:
            'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    },
    high: {
        variant: 'destructive' as const,
        label: 'High',
        className:
            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    },
    urgent: {
        variant: 'destructive' as const,
        label: 'Urgent',
        className:
            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 animate-pulse',
    },
};

export default function PriorityBadge({
    priority,
    className,
}: PriorityBadgeProps) {
    const config = priorityConfig[priority];

    return (
        <Badge
            variant={config.variant}
            className={cn(config.className, className)}
        >
            {config.label}
        </Badge>
    );
}
