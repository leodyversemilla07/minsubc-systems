import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/usg/stats-card';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    FileText,
    Megaphone,
    Settings,
    Target,
    Users,
} from 'lucide-react';

interface DashboardStats {
    totalOfficers: number;
    totalAnnouncements: number;
    totalEvents: number;
    totalResolutions: number;
    pendingAnnouncements: number;
    upcomingEvents: number;
    draftResolutions: number;
    recentActivity: number;
}

interface RecentItem {
    id: number;
    title: string;
    type: 'announcement' | 'event' | 'resolution' | 'officer';
    status: string;
    created_at: string;
    author?: string;
}

interface QuickAction {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    route: string;
    color: string;
}

interface Props {
    stats?: DashboardStats;
    recentItems?: RecentItem[];
}

export default function AdminDashboard({ stats, recentItems }: Props) {
    // Provide default values for props that may be undefined
    const safeStats = stats ?? {
        totalOfficers: 0,
        totalAnnouncements: 0,
        totalEvents: 0,
        totalResolutions: 0,
        pendingAnnouncements: 0,
        upcomingEvents: 0,
        draftResolutions: 0,
        recentActivity: 0,
    };
    const safeRecentItems = recentItems ?? [];

    const managementActions: QuickAction[] = [
        {
            label: 'Announcements',
            description: 'Manage all announcements',
            icon: Megaphone,
            route: '/usg/admin/announcements',
            color: 'blue',
        },
        {
            label: 'Events',
            description: 'Manage calendar events',
            icon: Calendar,
            route: '/usg/admin/events',
            color: 'green',
        },
        {
            label: 'Resolutions',
            description: 'Manage resolutions',
            icon: FileText,
            route: '/usg/admin/resolutions',
            color: 'purple',
        },
        {
            label: 'Officers',
            description: 'Manage officer profiles',
            icon: Users,
            route: '/usg/admin/officers',
            color: 'orange',
        },
    ];

    const settingsActions: QuickAction[] = [
        {
            label: 'VMGO',
            description: 'Vision, Mission & Goals',
            icon: Target,
            route: '/usg/admin/vmgo/edit',
            color: 'indigo',
        },
        {
            label: 'Analytics',
            description: 'View detailed analytics',
            icon: BarChart3,
            route: '/usg/admin/analytics',
            color: 'pink',
        },
        {
            label: 'Settings',
            description: 'System configuration',
            icon: Settings,
            route: '/usg/admin/settings',
            color: 'gray',
        },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800 dark:hover:bg-blue-900',
            green: 'bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:border-green-800 dark:hover:bg-green-900',
            purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 dark:bg-purple-950 dark:border-purple-800 dark:hover:bg-purple-900',
            orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 dark:bg-orange-950 dark:border-orange-800 dark:hover:bg-orange-900',
            indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-950 dark:border-indigo-800 dark:hover:bg-indigo-900',
            pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100 dark:bg-pink-950 dark:border-pink-800 dark:hover:bg-pink-900',
            gray: 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-900',
        };
        return colors[color as keyof typeof colors] || colors.gray;
    };

    const getIconColorClasses = (color: string) => {
        const colors = {
            blue: 'text-blue-600 dark:text-blue-400',
            green: 'text-green-600 dark:text-green-400',
            purple: 'text-purple-600 dark:text-purple-400',
            orange: 'text-orange-600 dark:text-orange-400',
            indigo: 'text-indigo-600 dark:text-indigo-400',
            pink: 'text-pink-600 dark:text-pink-400',
            gray: 'text-gray-600 dark:text-gray-400',
        };
        return colors[color as keyof typeof colors] || colors.gray;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const getItemIcon = (type: string) => {
        switch (type) {
            case 'announcement':
                return Megaphone;
            case 'event':
                return Calendar;
            case 'resolution':
                return FileText;
            case 'officer':
                return Users;
            default:
                return AlertCircle;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'published':
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
            case 'scheduled':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'draft':
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Dashboard', href: '/usg/admin/dashboard' },
            ]}
        >
            <Head title="Admin Dashboard - USG Management" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Stats Overview */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Officers"
                        value={safeStats.totalOfficers}
                        icon={<Users className="h-4 w-4" />}
                        description="+2 this month"
                        variant="default"
                    />
                    <StatsCard
                        title="Announcements"
                        value={safeStats.totalAnnouncements}
                        icon={<Megaphone className="h-4 w-4" />}
                        description={`${safeStats.pendingAnnouncements} pending`}
                        variant="default"
                    />
                    <StatsCard
                        title="Events"
                        value={safeStats.totalEvents}
                        icon={<Calendar className="h-4 w-4" />}
                        description={`${safeStats.upcomingEvents} upcoming`}
                        variant="default"
                    />
                    <StatsCard
                        title="Resolutions"
                        value={safeStats.totalResolutions}
                        icon={<FileText className="h-4 w-4" />}
                        description={`${safeStats.draftResolutions} drafts`}
                        variant="default"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Management Sections */}
                    <div className="lg:col-span-8">
                        <div className="mb-6">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Content Management
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {managementActions.map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`group cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 ${getColorClasses(action.color)}`}
                                            onClick={() =>
                                                router.visit(action.route)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="rounded-lg bg-white/80 p-3 shadow-sm dark:bg-gray-800/80">
                                                        <Icon
                                                            className={`h-6 w-6 ${getIconColorClasses(action.color)}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {action.label}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {action.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                                            </div>

                                            {/* Stats for each section */}
                                            <div className="mt-4 flex items-center gap-4 text-sm">
                                                {action.label ===
                                                    'Announcements' && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">
                                                                {
                                                                    safeStats.totalAnnouncements
                                                                }
                                                            </span>{' '}
                                                            total
                                                        </span>
                                                        {safeStats.pendingAnnouncements >
                                                            0 && (
                                                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                                {
                                                                    safeStats.pendingAnnouncements
                                                                }{' '}
                                                                pending
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {action.label === 'Events' && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">
                                                                {
                                                                    safeStats.totalEvents
                                                                }
                                                            </span>{' '}
                                                            total
                                                        </span>
                                                        {safeStats.upcomingEvents >
                                                            0 && (
                                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                {
                                                                    safeStats.upcomingEvents
                                                                }{' '}
                                                                upcoming
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {action.label ===
                                                    'Resolutions' && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">
                                                                {
                                                                    safeStats.totalResolutions
                                                                }
                                                            </span>{' '}
                                                            total
                                                        </span>
                                                        {safeStats.draftResolutions >
                                                            0 && (
                                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                {
                                                                    safeStats.draftResolutions
                                                                }{' '}
                                                                drafts
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {action.label ===
                                                    'Officers' && (
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        <span className="font-medium">
                                                            {
                                                                safeStats.totalOfficers
                                                            }
                                                        </span>{' '}
                                                        total
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* System & Analytics */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                System & Analytics
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {settingsActions.map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`group cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${getColorClasses(action.color)}`}
                                            onClick={() =>
                                                router.visit(action.route)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-lg bg-white/80 p-2 shadow-sm dark:bg-gray-800/80">
                                                        <Icon
                                                            className={`h-5 w-5 ${getIconColorClasses(action.color)}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                                            {action.label}
                                                        </h3>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {action.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        {/* Priority Actions */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-amber-500" />
                                    Priority Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {safeStats.pendingAnnouncements > 0 && (
                                        <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                                            <div className="flex items-center gap-3">
                                                <Clock className="h-4 w-4 text-yellow-600" />
                                                <div>
                                                    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                                        {
                                                            safeStats.pendingAnnouncements
                                                        }{' '}
                                                        Pending Review
                                                    </div>
                                                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                                                        Announcements awaiting
                                                        approval
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.visit(
                                                        '/usg/admin/announcements?status=pending',
                                                    )
                                                }
                                            >
                                                Review
                                            </Button>
                                        </div>
                                    )}

                                    {safeStats.draftResolutions > 0 && (
                                        <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                            <div className="flex items-center gap-3">
                                                <Edit className="h-4 w-4 text-blue-600" />
                                                <div>
                                                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                        {
                                                            safeStats.draftResolutions
                                                        }{' '}
                                                        Draft Resolution
                                                        {safeStats.draftResolutions !==
                                                        1
                                                            ? 's'
                                                            : ''}
                                                    </div>
                                                    <div className="text-xs text-blue-600 dark:text-blue-400">
                                                        Ready for completion
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.visit(
                                                        '/usg/admin/resolutions?status=draft',
                                                    )
                                                }
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    )}

                                    {safeStats.upcomingEvents > 0 && (
                                        <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-4 w-4 text-green-600" />
                                                <div>
                                                    <div className="text-sm font-medium text-green-800 dark:text-green-200">
                                                        {
                                                            safeStats.upcomingEvents
                                                        }{' '}
                                                        Upcoming Event
                                                        {safeStats.upcomingEvents !==
                                                        1
                                                            ? 's'
                                                            : ''}
                                                    </div>
                                                    <div className="text-xs text-green-600 dark:text-green-400">
                                                        This month
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.visit(
                                                        '/usg/admin/events?filter=upcoming',
                                                    )
                                                }
                                            >
                                                View
                                            </Button>
                                        </div>
                                    )}

                                    {safeStats.pendingAnnouncements === 0 &&
                                        safeStats.draftResolutions === 0 &&
                                        safeStats.upcomingEvents === 0 && (
                                            <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                                                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                                                <div className="text-sm font-medium">
                                                    All caught up!
                                                </div>
                                                <div className="text-xs">
                                                    No pending actions
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {safeRecentItems.length > 0 ? (
                                        safeRecentItems
                                            .slice(0, 5)
                                            .map((item) => {
                                                const Icon = getItemIcon(
                                                    item.type,
                                                );
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    >
                                                        <div className="rounded-lg bg-gray-100 p-1.5 dark:bg-gray-800">
                                                            <Icon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                {item.title}
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-2">
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={`text-xs ${getStatusColor(item.status)}`}
                                                                >
                                                                    {
                                                                        item.status
                                                                    }
                                                                </Badge>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {formatDate(
                                                                        item.created_at,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    ) : (
                                        <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            <Clock className="mx-auto mb-2 h-6 w-6" />
                                            <div className="text-sm">
                                                No recent activity
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {safeRecentItems.length > 0 && (
                                    <div className="mt-4 border-t pt-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full"
                                            onClick={() =>
                                                router.visit(
                                                    '/usg/admin/activity',
                                                )
                                            }
                                        >
                                            View All Activity
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
