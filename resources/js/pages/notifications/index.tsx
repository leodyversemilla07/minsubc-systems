import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    AlertTriangle,
    Award,
    Bell,
    CheckCircle,
    Clock,
    RefreshCw,
    ShieldCheck,
} from 'lucide-react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Notifications',
        href: '/notifications',
    },
];

interface NotificationData {
    title: string;
    message: string;
    icon?: string;
    url?: string;
    scholarship_name?: string;
    amount?: string;
    old_status?: string;
    new_status?: string;
    requirement_name?: string;
    deadline?: string;
    expiration_date?: string;
    policy_number?: string;
    provider?: string;
    reason?: string;
    expiry_date?: string;
    days_left?: number;
}

interface Notification {
    id: string;
    type: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginatedNotifications {
    data: Notification[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface NotificationsIndexProps {
    notifications: PaginatedNotifications;
    filter: 'all' | 'unread' | 'read';
}

const iconMap: Record<string, ReactNode> = {
    award: <Award className="h-5 w-5" />,
    bell: <Bell className="h-5 w-5" />,
    clock: <Clock className="h-5 w-5" />,
    'refresh-cw': <RefreshCw className="h-5 w-5" />,
    'shield-check': <ShieldCheck className="h-5 w-5" />,
    'check-circle': <CheckCircle className="h-5 w-5" />,
    'alert-circle': <AlertCircle className="h-5 w-5" />,
    'alert-triangle': <AlertTriangle className="h-5 w-5" />,
};

export default function NotificationsIndex({
    notifications,
    filter,
}: NotificationsIndexProps) {
    const handleTabChange = (value: string) => {
        router.get(
            '/notifications',
            { filter: value },
            { preserveState: true },
        );
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await fetch(`/notifications/${id}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });
            router.reload({ only: ['notifications'] });
        } catch {
            // Failed to mark notification as read
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await fetch('/notifications/read-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });
            router.reload({ only: ['notifications'] });
        } catch {
            // Failed to mark all notifications as read
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return date.toLocaleDateString();
        } else if (days > 0) {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return 'Just now';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Notifications
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and view your notifications
                        </p>
                    </div>
                    {notifications.data.some((n) => !n.read_at) && (
                        <Button onClick={handleMarkAllAsRead}>
                            Mark all as read
                        </Button>
                    )}
                </div>

                <Tabs
                    value={filter}
                    onValueChange={handleTabChange}
                    className="w-full"
                >
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                        <TabsTrigger value="read">Read</TabsTrigger>
                    </TabsList>

                    <TabsContent value={filter} className="mt-6">
                        {notifications.data.length === 0 ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <Empty>
                                        <EmptyMedia>
                                            <Bell className="size-12 text-muted-foreground" />
                                        </EmptyMedia>
                                        <EmptyHeader>
                                            <EmptyTitle>
                                                No notifications
                                            </EmptyTitle>
                                            <EmptyDescription>
                                                {filter === 'unread'
                                                    ? "You're all caught up! No unread notifications."
                                                    : filter === 'read'
                                                      ? 'No read notifications yet.'
                                                      : 'You have no notifications.'}
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent>
                                            <Link href={dashboard().url}>
                                                <Button>Go to Dashboard</Button>
                                            </Link>
                                        </EmptyContent>
                                    </Empty>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {notifications.data.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className={cn(
                                            'transition-colors hover:bg-accent/50',
                                            !notification.read_at &&
                                                'border-l-4 border-l-primary',
                                        )}
                                    >
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={cn(
                                                        'flex h-10 w-10 items-center justify-center rounded-full',
                                                        !notification.read_at
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-muted text-muted-foreground',
                                                    )}
                                                >
                                                    {iconMap[
                                                        notification.data
                                                            .icon || 'bell'
                                                    ] || (
                                                        <Bell className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <CardTitle className="text-base">
                                                            {
                                                                notification
                                                                    .data.title
                                                            }
                                                        </CardTitle>
                                                        {!notification.read_at && (
                                                            <Badge
                                                                variant="default"
                                                                className="h-5"
                                                            >
                                                                New
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            notification.data
                                                                .message
                                                        }
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(
                                                            notification.created_at,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {!notification.read_at && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleMarkAsRead(
                                                                notification.id,
                                                            )
                                                        }
                                                    >
                                                        Mark as read
                                                    </Button>
                                                )}
                                                {notification.data.url && (
                                                    <Link
                                                        href={
                                                            notification.data
                                                                .url
                                                        }
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            View
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}

                                {/* Pagination */}
                                {notifications.last_page > 1 && (
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Showing {notifications.from} to{' '}
                                            {notifications.to} of{' '}
                                            {notifications.total} notifications
                                        </p>
                                        <div className="flex gap-2">
                                            {notifications.current_page > 1 && (
                                                <Link
                                                    href={`/notifications?filter=${filter}&page=${notifications.current_page - 1}`}
                                                >
                                                    <Button variant="outline">
                                                        Previous
                                                    </Button>
                                                </Link>
                                            )}
                                            {notifications.current_page <
                                                notifications.last_page && (
                                                <Link
                                                    href={`/notifications?filter=${filter}&page=${notifications.current_page + 1}`}
                                                >
                                                    <Button variant="outline">
                                                        Next
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
