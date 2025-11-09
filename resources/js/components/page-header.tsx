import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface PageHeaderProps {
    /**
     * The main title of the page
     */
    title: string;
    /**
     * Optional description or subtitle
     */
    description?: string;
    /**
     * Optional icon to display before the title
     */
    icon?: LucideIcon;
    /**
     * Optional actions (buttons, etc.) to display on the right side
     */
    actions?: ReactNode;
    /**
     * Optional className for the container
     */
    className?: string;
}

export function PageHeader({
    title,
    description,
    icon: Icon,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <Card className={cn('mb-6', className)}>
            <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1.5">
                        <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
                            {Icon && (
                                <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                            )}
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription className="text-sm sm:text-base">
                                {description}
                            </CardDescription>
                        )}
                    </div>
                    {actions && (
                        <div className="flex items-center gap-2">{actions}</div>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
