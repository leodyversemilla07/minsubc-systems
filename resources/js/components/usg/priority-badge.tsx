import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Priority = 'low' | 'normal' | 'high';

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
    normal: {
        variant: 'default' as const,
        label: 'Normal',
        className:
            'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    },
    high: {
        variant: 'destructive' as const,
        label: 'High',
        className:
            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
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
