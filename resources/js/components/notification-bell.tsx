import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    Bell,
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface NotificationItem {
    id: string;
    type: string;
    data: {
        icon?: string;
        title: string;
        body: string;
        module: string;
        action_url?: string | null;
        action_text?: string | null;
    };
    read_at: string | null;
    created_at: string;
    is_unread: boolean;
}

export function NotificationBell() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchUnreadCount = async () => {
        try {
            const res = await fetch('/api/notifications/unread-count');
            const data = await res.json();
            setUnreadCount(data.count);
        } catch {
            // silent
        }
    };

    const fetchRecent = async () => {
        try {
            const res = await fetch('/api/notifications/recent');
            const data = await res.json();
            setNotifications(data);
        } catch {
            // silent
        }
    };

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) fetchRecent();
    };

    const markAllAsRead = async () => {
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
            setUnreadCount(0);
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, read_at: new Date().toISOString(), is_unread: false })),
            );
        } catch {
            // silent
        }
    };

    const handleNotificationClick = async (n: NotificationItem) => {
        // Mark as read
        try {
            await fetch(`/notifications/${n.id}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });
        } catch {
            // silent
        }

        setIsOpen(false);

        if (n.data.action_url) {
            router.visit(n.data.action_url);
        }
    };

    const unreadList = notifications.filter((n) => n.is_unread);
    const recentList = notifications;

    return (
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group relative h-9 w-9"
                    />
                }
            >
                <Bell className="!size-5 opacity-80 group-hover:opacity-100" />
                {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-900">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-3 py-2">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 cursor-pointer text-xs"
                            onClick={markAllAsRead}
                        >
                            Mark all read
                        </Button>
                    )}
                </div>
                <DropdownMenuSeparator />

                {recentList.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                        <Bell className="mx-auto mb-2 size-6 opacity-40" />
                        No notifications yet
                    </div>
                ) : (
                    <div className="max-h-80 overflow-y-auto">
                        {unreadList.length > 0 && (
                            <>
                                <div className="px-3 py-1 text-[11px] font-semibold uppercase text-muted-foreground">
                                    New
                                </div>
                                {unreadList.map((n) => (
                                    <NotificationRow
                                        key={n.id}
                                        notification={n}
                                        onClick={handleNotificationClick}
                                    />
                                ))}
                                {recentList.filter((n) => !n.is_unread).length >
                                    0 && (
                                    <DropdownMenuSeparator />
                                )}
                            </>
                        )}
                        {recentList
                            .filter((n) => !n.is_unread)
                            .slice(0, 5)
                            .map((n) => (
                                <NotificationRow
                                    key={n.id}
                                    notification={n}
                                    onClick={handleNotificationClick}
                                />
                            ))}
                    </div>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    render={
                        <Link
                            href="/notifications"
                            className="w-full cursor-pointer text-center text-sm font-medium"
                        />
                    }
                >
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function NotificationRow({
    notification: n,
    onClick,
}: {
    notification: NotificationItem;
    onClick: (n: NotificationItem) => void;
}) {
    const IconComponent = n.data.icon ? iconMap[n.data.icon] : Bell;
    const moduleColors: Record<string, string> = {
        helpdesk: 'text-blue-500',
        discipline: 'text-red-500',
        dormitory: 'text-purple-500',
        accounting: 'text-green-500',
        library: 'text-amber-500',
        hr: 'text-cyan-500',
        admission: 'text-indigo-500',
        usg: 'text-orange-500',
        voting: 'text-rose-500',
        clinic: 'text-emerald-500',
        guidance: 'text-teal-500',
        facilities: 'text-slate-500',
        scheduling: 'text-violet-500',
        general: 'text-neutral-500',
    };

    return (
        <button
            onClick={() => onClick(n)}
            className={cn(
                'flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent',
                n.is_unread && 'bg-accent/30',
            )}
        >
            <div
                className={cn(
                    'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted',
                    moduleColors[n.data.module] || 'text-neutral-500',
                )}
            >
                <IconComponent className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'truncate',
                        n.is_unread && 'font-semibold',
                    )}
                >
                    {n.data.title}
                </p>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                    {n.data.body}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    {n.created_at}
                </p>
            </div>
            {n.is_unread && (
                <div className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
            )}
        </button>
    );
}