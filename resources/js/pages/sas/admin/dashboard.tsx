import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    GraduationCap, 
    Shield, 
    Users, 
    Calendar, 
    FileText, 
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowUpRight
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface StatisticsProps {
    scholarships: {
        total: number;
        active: number;
        expiring_soon: number;
        total_amount: number;
    };
    insurance: {
        total: number;
        pending_review: number;
        expiring_soon: number;
        approved: number;
    };
    organizations: {
        total: number;
        major: number;
        minor: number;
        active: number;
    };
    activities: {
        total: number;
        upcoming: number;
        this_month: number;
        completed: number;
    };
    documents: {
        total: number;
        pending_disposal: number;
        total_size: string;
    };
}

interface RecentActivity {
    id: number;
    type: string;
    title: string;
    description: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface PendingTask {
    id: number;
    type: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    due_date?: string;
    action_url: string;
}

interface DashboardProps {
    statistics: StatisticsProps;
    recentActivities: RecentActivity[];
    pendingTasks: PendingTask[];
}

export default function Dashboard({ statistics, recentActivities, pendingTasks }: DashboardProps) {
    const stats = [
        {
            title: 'Scholarships',
            total: statistics.scholarships.total,
            active: statistics.scholarships.active,
            alert: statistics.scholarships.expiring_soon,
            alertText: 'Expiring Soon',
            icon: GraduationCap,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            link: '/sas/admin/scholarships',
        },
        {
            title: 'Insurance',
            total: statistics.insurance.total,
            active: statistics.insurance.approved,
            alert: statistics.insurance.pending_review,
            alertText: 'Pending Review',
            icon: Shield,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            link: '/sas/admin/insurance',
        },
        {
            title: 'Organizations',
            total: statistics.organizations.total,
            active: statistics.organizations.active,
            alert: statistics.organizations.major,
            alertText: 'Major Orgs',
            icon: Users,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            link: '/sas/admin/organizations',
        },
        {
            title: 'Activities',
            total: statistics.activities.total,
            active: statistics.activities.upcoming,
            alert: statistics.activities.this_month,
            alertText: 'This Month',
            icon: Calendar,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
            link: '/sas/admin/activities',
        },
        {
            title: 'Documents',
            total: statistics.documents.total,
            active: statistics.documents.pending_disposal,
            alert: statistics.documents.total_size,
            alertText: 'Storage Used',
            icon: FileText,
            color: 'text-indigo-600 dark:text-indigo-400',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
            link: '/sas/admin/documents',
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
            case 'scholarship':
                return <GraduationCap className="h-4 w-4" />;
            case 'insurance':
                return <Shield className="h-4 w-4" />;
            case 'organization':
                return <Users className="h-4 w-4" />;
            case 'activity':
                return <Calendar className="h-4 w-4" />;
            case 'document':
                return <FileText className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'SAS Admin', href: '/sas/admin/dashboard' },
            { title: 'Dashboard', href: '/sas/admin/dashboard' },
        ]}>
            <Head title="SAS Dashboard" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                    {/* Statistics Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {stats.map((stat) => (
                            <Link key={stat.title} href={stat.link}>
                                <Card className="transition-shadow hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.title}
                                        </CardTitle>
                                        <div className={`rounded-full p-2 ${stat.bgColor}`}>
                                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.total}</div>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs text-muted-foreground">
                                                {stat.active} active
                                            </p>
                                            <Badge variant="secondary" className="text-xs">
                                                {stat.alert} {stat.alertText}
                                            </Badge>
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
                            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Scholarship Overview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Scholarship Overview</CardTitle>
                                        <CardDescription>
                                            Current scholarship program status
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Active Recipients</span>
                                            <span className="font-bold">
                                                {statistics.scholarships.active}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Expiring Soon</span>
                                            <Badge variant="destructive">
                                                {statistics.scholarships.expiring_soon}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Total Amount</span>
                                            <span className="font-bold text-green-600 dark:text-green-400">
                                                ₱{statistics.scholarships.total_amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <Link href="/sas/admin/scholarships">
                                            <Button variant="outline" className="w-full" size="sm">
                                                View All Scholarships
                                                <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Insurance Overview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Insurance Overview</CardTitle>
                                        <CardDescription>
                                            Student insurance status
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Pending Review</span>
                                            <Badge variant="secondary">
                                                {statistics.insurance.pending_review}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Approved</span>
                                            <span className="font-bold">
                                                {statistics.insurance.approved}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Expiring Soon</span>
                                            <Badge variant="destructive">
                                                {statistics.insurance.expiring_soon}
                                            </Badge>
                                        </div>
                                        <Link href="/sas/admin/insurance">
                                            <Button variant="outline" className="w-full" size="sm">
                                                View All Insurance
                                                <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Organizations & Activities */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Organizations</CardTitle>
                                        <CardDescription>
                                            Student organization status
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Major Organizations</span>
                                            <span className="font-bold">
                                                {statistics.organizations.major}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Minor Organizations</span>
                                            <span className="font-bold">
                                                {statistics.organizations.minor}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Active</span>
                                            <Badge variant="secondary">
                                                {statistics.organizations.active}
                                            </Badge>
                                        </div>
                                        <Link href="/sas/admin/organizations">
                                            <Button variant="outline" className="w-full" size="sm">
                                                View All Organizations
                                                <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Activities & Documents */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Activities & Documents</CardTitle>
                                        <CardDescription>
                                            Upcoming events and storage
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Upcoming Activities</span>
                                            <Badge variant="secondary">
                                                {statistics.activities.upcoming}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Total Documents</span>
                                            <span className="font-bold">
                                                {statistics.documents.total}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Storage Used</span>
                                            <span className="font-bold">
                                                {statistics.documents.total_size}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href="/sas/admin/activities" className="flex-1">
                                                <Button variant="outline" className="w-full" size="sm">
                                                    Activities
                                                </Button>
                                            </Link>
                                            <Link href="/sas/admin/documents" className="flex-1">
                                                <Button variant="outline" className="w-full" size="sm">
                                                    Documents
                                                </Button>
                                            </Link>
                                        </div>
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
                                            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                                            <p className="text-lg font-medium">All caught up!</p>
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
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium">{task.title}</h4>
                                                            <Badge className={getPriorityColor(task.priority)}>
                                                                {task.priority}
                                                            </Badge>
                                                        </div>
                                                        {task.due_date && (
                                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                                <Clock className="h-3 w-3" />
                                                                Due: {task.due_date}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Link href={task.action_url}>
                                                        <Button size="sm">
                                                            Review
                                                        </Button>
                                                    </Link>
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
                                        Latest system activities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivities.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-start gap-4 border-b pb-4 last:border-0"
                                            >
                                                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{activity.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {activity.description}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {activity.user.name} • {activity.created_at}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
        </AppLayout>
    );
}
