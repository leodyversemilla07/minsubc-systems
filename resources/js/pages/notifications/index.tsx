import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import {
    AlertTriangle,
    Bell,
    BookOpen,
    Building2,
    Calendar,
    Check,
    CheckCheck,
    FileText,
    FlaskConical,
    GraduationCap,
    HeartPulse,
    Megaphone,
    Ticket,
    UserCheck,
    UserPlus,
    Vote,
    Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';

const iconMap: Record<string, React.ElementType> = {
    Bell,
    AlertTriangle,
    BookOpen,
    Building2,
    Calendar,
    FileText,
    FlaskConical,
    GraduationCap,
    HeartPulse,
    Megaphone,
    Ticket,
    UserCheck,
    UserPlus,
    Vote,
    Wrench,
};

const moduleColors: Record<string, string> = {
    helpdesk: 'text-blue-500 bg-blue-50 dark:bg-blue-950',
    discipline: 'text-red-500 bg-red-50 dark:bg-red-950',
    dormitory: 'text-purple-500 bg-purple-50 dark:bg-purple-950',
    accounting: 'text-green-500 bg-green-50 dark:bg-green-950',
    library: 'text-amber-500 bg-amber-50 dark:bg-amber-950',
    hr: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950',
    admission: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950',
    usg: 'text-orange-500 bg-orange-50 dark:bg-orange-950',
    voting: 'text-rose-500 bg-rose-50 dark:bg-rose-950',
    clinic: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950',
    guidance: 'text-teal-500 bg-teal-50 dark:bg-teal-950',
    facilities: 'text-slate-500 bg-slate-50 dark:bg-slate-950',
    scheduling: 'text-violet-500 bg-violet-50 dark:bg-violet-950',
    general: 'text-neutral-500 bg-neutral-50 dark:bg-neutral-800',
};

interface NotificationData {
    icon?: string;
    title: string;
    body: string;
    module: string;
    action_url?: string | null;
    action_text?: string | null;
}

interface NotificationItem {
    id: string;
    type: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    is_unread: boolean;
}

interface PaginatedResponse {
    data: NotificationItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

export default function NotificationsIndex({
    notifications,
    filter,
}: {
    notifications: PaginatedResponse;
    filter: string;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Notifications', href: '/notifications' },
    ];

    const handleMarkRead = async (id: string) => {
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
    };

    const handleMarkAllRead = async () => {
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
    };

    const handleClick = (n: NotificationItem) => {
        if (n.is_unread) handleMarkRead(n.id);
        if (n.data.action_url) router.visit(n.data.action_url);
    };

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'unread', label: 'Unread' },
        { key: 'read', label: 'Read' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <div className="flex items-center gap-2">
                        {notifications.data.filter((n) => n.is_unread).length >
                            0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleMarkAllRead}
                            >
                                <CheckCheck className="mr-1 size-4" />
                                Mark all read
                            </Button>
                        )}
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 rounded-lg border p-1">
                    {filters.map((f) => (
                        <Link
                            key={f.key}
                            href={`/notifications?filter=${f.key}`}
                            preserveState
                            className={cn(
                                'flex-1 rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors',
                                filter === f.key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent',
                            )}
                        >
                            {f.label}
                        </Link>
                    ))}
                </div>

                {/* Notifications list */}
                <div className="space-y-2">
                    {notifications.data.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Bell className="mx-auto mb-3 size-8 text-muted-foreground/40" />
                                <p className="text-muted-foreground">
                                    {filter === 'unread'
                                        ? 'No unread notifications'
                                        : filter === 'read'
                                          ? 'No read notifications'
                                          : 'No notifications yet'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        notifications.data.map((n) => {
                            const IconComponent = n.data.icon
                                ? iconMap[n.data.icon] || Bell
                                : Bell;
                            const colorClass =
                                moduleColors[n.data.module] ||
                                moduleColors.general;

                            return (
                                <button
                                    key={n.id}
                                    onClick={() => handleClick(n)}
                                    className={cn(
                                        'flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors hover:bg-accent',
                                        n.is_unread &&
                                            'border-l-4 border-l-blue-500 bg-accent/20',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex size-10 shrink-0 items-center justify-center rounded-full',
                                            colorClass,
                                        )}
                                    >
                                        <IconComponent className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p
                                                className={cn(
                                                    'truncate',
                                                    n.is_unread &&
                                                        'font-semibold',
                                                )}
                                            >
                                                {n.data.title}
                                            </p>
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {n.created_at}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {n.data.body}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            {n.data.action_text && (
                                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                    {n.data.action_text}
                                                </span>
                                            )}
                                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                                                {n.data.module}
                                            </span>
                                        </div>
                                    </div>
                                    {n.is_unread && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMarkRead(n.id);
                                            }}
                                            className="shrink-0 rounded-full p-1 text-muted-foreground/40 hover:text-blue-500"
                                            title="Mark as read"
                                        >
                                            <Check className="size-4" />
                                        </button>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                {notifications.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from(
                            { length: notifications.last_page },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <Link
                                key={page}
                                href={`/notifications?filter=${filter}&page=${page}`}
                                preserveState
                                className={cn(
                                    'flex size-8 items-center justify-center rounded-md text-sm',
                                    page === notifications.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent',
                                )}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}