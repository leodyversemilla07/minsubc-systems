import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowUpRight,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Megaphone,
    Plus,
    Settings,
    Shield,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react';

interface Statistics {
    announcements: {
        total: number;
        published: number;
        draft: number;
        pending: number;
        this_month: number;
    };
    events: {
        total: number;
        published: number;
        upcoming: number;
        this_month: number;
        today: number;
    };
    resolutions: {
        total: number;
        published: number;
        draft: number;
        pending: number;
        this_year: number;
    };
    officers: {
        total: number;
        active: number;
        inactive: number;
    };
    transparency: {
        total: number;
        published: number;
        draft: number;
    };
}

interface RecentItem {
    id: number;
    title: string;
    type: 'announcement' | 'event' | 'resolution';
    status: string;
    created_at: string;
    author?: string;
    start_date?: string;
    resolution_number?: string;
}

interface PendingTask {
    id: number;
    type: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    action_url: string;
}

interface Props {
    statistics?: Statistics;
    recentItems?: RecentItem[];
    pendingTasks?: PendingTask[];
}

export default function AdminDashboard({
    statistics,
    recentItems = [],
    pendingTasks = [],
}: Props) {
    const detailedStats = statistics ?? {
        announcements: {
            total: 0,
            published: 0,
            draft: 0,
            pending: 0,
            this_month: 0,
        },
        events: {
            total: 0,
            published: 0,
            upcoming: 0,
            this_month: 0,
            today: 0,
        },
        resolutions: {
            total: 0,
            published: 0,
            draft: 0,
            pending: 0,
            this_year: 0,
        },
        officers: { total: 0, active: 0, inactive: 0 },
        transparency: { total: 0, published: 0, draft: 0 },
    };

    // Stats cards configuration
    const statsCards = [
        {
            title: 'Announcements',
            total: detailedStats.announcements.total,
            active: detailedStats.announcements.published,
            alert: detailedStats.announcements.draft,
            alertText: 'Drafts',
            icon: Megaphone,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            link: '/usg/admin/announcements',
        },
        {
            title: 'Events',
            total: detailedStats.events.total,
            active: detailedStats.events.upcoming,
            alert: detailedStats.events.this_month,
            alertText: 'This Month',
            icon: Calendar,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            link: '/usg/admin/events',
        },
        {
            title: 'Resolutions',
            total: detailedStats.resolutions.total,
            active: detailedStats.resolutions.published,
            alert: detailedStats.resolutions.pending,
            alertText: 'Pending',
            icon: FileText,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            link: '/usg/admin/resolutions',
        },
        {
            title: 'Officers',
            total: detailedStats.officers.total,
            active: detailedStats.officers.active,
            alert: detailedStats.officers.inactive,
            alertText: 'Inactive',
            icon: Users,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
            link: '/usg/admin/officers',
        },
        {
            title: 'Transparency',
            total: detailedStats.transparency.total,
            active: detailedStats.transparency.published,
            alert: detailedStats.transparency.draft,
            alertText: 'Drafts',
            icon: Shield,
            color: 'text-indigo-600 dark:text-indigo-400',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
            link: '/usg/admin/transparency',
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'announcement':
                return <Megaphone className="h-4 w-4" />;
            case 'event':
                return <Calendar className="h-4 w-4" />;
            case 'resolution':
                return <FileText className="h-4 w-4" />;
            case 'transparency':
                return <Shield className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'published':
            case 'approved':
                return (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {status}
                    </Badge>
                );
            case 'draft':
                return (
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        {status}
                    </Badge>
                );
            case 'scheduled':
            case 'submitted':
            case 'pending':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        {status}
                    </Badge>
                );
            case 'archived':
                return (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {status}
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const quickActions = [
        {
            label: 'New Announcement',
            icon: Megaphone,
            href: '/usg/admin/announcements/create',
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            label: 'New Event',
            icon: Calendar,
            href: '/usg/admin/events/create',
            color: 'bg-green-600 hover:bg-green-700',
        },
        {
            label: 'New Resolution',
            icon: FileText,
            href: '/usg/admin/resolutions/create',
            color: 'bg-purple-600 hover:bg-purple-700',
        },
        {
            label: 'New Officer',
            icon: Users,
            href: '/usg/admin/officers/create',
            color: 'bg-orange-600 hover:bg-orange-700',
        },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Dashboard', href: '/usg/admin' },
            ]}
        >
            <Head title="USG Admin Dashboard" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header with Quick Actions */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            USG Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Welcome back! Here's an overview of your USG
                            content.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                            <Link key={action.label} href={action.href}>
                                <Button
                                    size="sm"
                                    className={`${action.color} text-white`}
                                >
                                    <Plus className="mr-1 h-4 w-4" />
                                    {action.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {statsCards.map((stat) => (
                        <Link key={stat.title} href={stat.link}>
                            <Card className="transition-shadow hover:shadow-lg">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div
                                        className={`rounded-full p-2 ${stat.bgColor}`}
                                    >
                                        <stat.icon
                                            className={`h-4 w-4 ${stat.color}`}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.total}
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            {stat.active} active
                                        </p>
                                        {stat.alert > 0 && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {stat.alert} {stat.alertText}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="pending">
                            Pending Tasks
                            {pendingTasks.length > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {pendingTasks.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="activity">
                            Recent Activity
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Announcements Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Megaphone className="h-5 w-5 text-blue-600" />
                                        Announcements
                                    </CardTitle>
                                    <CardDescription>
                                        Content publication status
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Published
                                        </span>
                                        <span className="font-bold">
                                            {
                                                detailedStats.announcements
                                                    .published
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Drafts</span>
                                        <Badge variant="secondary">
                                            {detailedStats.announcements.draft}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            This Month
                                        </span>
                                        <span className="flex items-center gap-1 font-bold text-green-600 dark:text-green-400">
                                            <TrendingUp className="h-3 w-3" />
                                            {
                                                detailedStats.announcements
                                                    .this_month
                                            }
                                        </span>
                                    </div>
                                    <Link href="/usg/admin/announcements">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            View All
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Events Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                        Events
                                    </CardTitle>
                                    <CardDescription>
                                        Upcoming activities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Upcoming
                                        </span>
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                            {detailedStats.events.upcoming}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Happening Today
                                        </span>
                                        <span className="font-bold">
                                            {detailedStats.events.today}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            This Month
                                        </span>
                                        <span className="font-bold">
                                            {detailedStats.events.this_month}
                                        </span>
                                    </div>
                                    <Link href="/usg/admin/events">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            View All
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Resolutions Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                        Resolutions
                                    </CardTitle>
                                    <CardDescription>
                                        Official documents
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Published
                                        </span>
                                        <span className="font-bold">
                                            {
                                                detailedStats.resolutions
                                                    .published
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Pending Approval
                                        </span>
                                        {detailedStats.resolutions.pending >
                                        0 ? (
                                            <Badge variant="destructive">
                                                {
                                                    detailedStats.resolutions
                                                        .pending
                                                }
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                0
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            This Year
                                        </span>
                                        <span className="font-bold">
                                            {
                                                detailedStats.resolutions
                                                    .this_year
                                            }
                                        </span>
                                    </div>
                                    <Link href="/usg/admin/resolutions">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            View All
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Officers Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-orange-600" />
                                        Officers
                                    </CardTitle>
                                    <CardDescription>
                                        USG leadership team
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Active</span>
                                        <span className="font-bold text-green-600 dark:text-green-400">
                                            {detailedStats.officers.active}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Inactive
                                        </span>
                                        <span className="text-muted-foreground">
                                            {detailedStats.officers.inactive}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Total</span>
                                        <span className="font-bold">
                                            {detailedStats.officers.total}
                                        </span>
                                    </div>
                                    <Link href="/usg/admin/officers">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            Manage Officers
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Transparency Reports */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-indigo-600" />
                                        Transparency
                                    </CardTitle>
                                    <CardDescription>
                                        Financial reports
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Published
                                        </span>
                                        <span className="font-bold">
                                            {
                                                detailedStats.transparency
                                                    .published
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Drafts</span>
                                        <Badge variant="secondary">
                                            {detailedStats.transparency.draft}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Total</span>
                                        <span className="font-bold">
                                            {detailedStats.transparency.total}
                                        </span>
                                    </div>
                                    <Link href="/usg/admin/transparency">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            View Reports
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-gray-600" />
                                        Quick Links
                                    </CardTitle>
                                    <CardDescription>
                                        Management shortcuts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Link href="/usg/admin/vmgo/edit">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            size="sm"
                                        >
                                            <Target className="mr-2 h-4 w-4" />
                                            Edit VMGO
                                        </Button>
                                    </Link>
                                    <Link href="/usg">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            size="sm"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Public Site
                                        </Button>
                                    </Link>
                                    <Link href="/usg/admin/documents">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            size="sm"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            Documents
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Pending Tasks Tab */}
                    <TabsContent value="pending" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Tasks</CardTitle>
                                <CardDescription>
                                    Items requiring your attention
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {pendingTasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                                        <p className="text-lg font-medium">
                                            All caught up!
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            No pending tasks at the moment.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pendingTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between border-b pb-4 last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                                                        {getActivityIcon(
                                                            task.type,
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium">
                                                                {task.title}
                                                            </h4>
                                                            <Badge
                                                                className={getPriorityColor(
                                                                    task.priority,
                                                                )}
                                                            >
                                                                {task.priority}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            task.action_url,
                                                        )
                                                    }
                                                >
                                                    Review
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Recent Activity Tab */}
                    <TabsContent value="activity" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest content updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Clock className="mb-4 h-12 w-12 text-gray-400" />
                                        <p className="text-lg font-medium">
                                            No recent activity
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Start creating content to see
                                            activity here.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentItems.map((item, index) => (
                                            <div
                                                key={`${item.type}-${item.id}-${index}`}
                                                className="flex items-start gap-4 border-b pb-4 last:border-0"
                                            >
                                                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                                                    {getActivityIcon(item.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium">
                                                        {item.title}
                                                    </h4>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        {getStatusBadge(
                                                            item.status,
                                                        )}
                                                        <span className="text-xs text-muted-foreground capitalize">
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {item.author &&
                                                            `${item.author} • `}
                                                        {formatDate(
                                                            item.created_at,
                                                        )}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/usg/admin/${item.type}s/${item.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
