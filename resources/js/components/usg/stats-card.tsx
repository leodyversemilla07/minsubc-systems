import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, Minus, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        type: 'increase' | 'decrease' | 'neutral';
        period?: string;
    };
    icon?: React.ReactNode;
    description?: string;
    variant?: 'default' | 'success' | 'warning' | 'danger';
    className?: string;
}

export default function StatsCard({
    title,
    value,
    change,
    icon,
    description,
    variant = 'default',
    className,
}: StatsCardProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
            case 'warning':
                return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
            case 'danger':
                return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
            default:
                return 'border-border bg-card';
        }
    };

    const getChangeIcon = () => {
        if (!change) return null;

        switch (change.type) {
            case 'increase':
                return <TrendingUp className="h-4 w-4 text-green-600" />;
            case 'decrease':
                return <TrendingDown className="h-4 w-4 text-red-600" />;
            case 'neutral':
                return <Minus className="h-4 w-4 text-gray-600" />;
            default:
                return <Activity className="h-4 w-4 text-gray-600" />;
        }
    };

    const getChangeColor = () => {
        if (!change) return '';

        switch (change.type) {
            case 'increase':
                return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
            case 'decrease':
                return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
            case 'neutral':
                return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatChangeValue = (value: number) => {
        const sign = value > 0 ? '+' : '';
        return `${sign}${value}%`;
    };

    return (
        <Card className={cn(getVariantStyles(), className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon && (
                    <div className="h-4 w-4 text-muted-foreground">{icon}</div>
                )}
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="text-2xl font-bold">
                            {typeof value === 'number'
                                ? value.toLocaleString()
                                : value}
                        </div>

                        {description && (
                            <p className="text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>

                    {change && (
                        <div className="flex items-center space-x-1">
                            <Badge
                                variant="secondary"
                                className={cn('px-2 py-1', getChangeColor())}
                            >
                                <div className="flex items-center gap-1">
                                    {getChangeIcon()}
                                    <span className="text-xs font-medium">
                                        {formatChangeValue(change.value)}
                                    </span>
                                </div>
                            </Badge>
                        </div>
                    )}
                </div>

                {change && change.period && (
                    <p className="mt-2 text-xs text-muted-foreground">
                        {change.type === 'increase' && '↗ '}
                        {change.type === 'decrease' && '↘ '}
                        {change.period}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
