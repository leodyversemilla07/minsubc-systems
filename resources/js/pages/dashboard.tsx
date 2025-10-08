import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import {
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    Plus,
    Eye,
    CreditCard,
    TrendingUp
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        student?: {
            student_id: string;
            course: string;
            year_level: number;
        };
    };
    stats: {
        total_requests: number;
        pending_payment: number;
        processing: number;
        ready_for_pickup: number;
        completed: number;
    };
    recent_requests: Array<{
        id: number;
        request_number: string;
        document_type: string;
        status: string;
        created_at: string;
        amount: number;
    }>;
}

export default function Dashboard({ user, stats, recent_requests }: DashboardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending_payment': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-purple-100 text-purple-800';
            case 'ready_for_pickup': return 'bg-green-100 text-green-800';
            case 'released': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending_payment': return <CreditCard className="w-4 h-4" />;
            case 'paid': return <CheckCircle className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'ready_for_pickup': return <CheckCircle className="w-4 h-4" />;
            case 'released': return <CheckCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const totalRequests = stats.total_requests;
    const completedPercentage = totalRequests > 0 ? (stats.completed / totalRequests) * 100 : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Welcome Header */}
                                {/* Welcome Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>
                                {user.first_name[0]}{user.last_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Welcome back, {user.first_name}!
                            </h1>
                            <p className="text-muted-foreground">
                                {user.student ? `Student ID: ${user.student.student_id}` : 'Staff Member'}
                            </p>
                        </div>
                    </div>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={create()}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Request
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{stats.total_requests}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                All time requests
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{stats.pending_payment}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Awaiting payment
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Processing</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{stats.processing}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Being processed
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold">{stats.ready_for_pickup}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Available for pickup
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Overview */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-lg">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Request Completion Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Completed Requests</span>
                                <span>{stats.completed} of {totalRequests}</span>
                            </div>
                            <Progress value={completedPercentage} className="w-full h-2" />
                            <p className="text-xs text-muted-foreground">
                                {completedPercentage.toFixed(1)}% completion rate
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Requests */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <CardTitle className="text-lg">Recent Requests</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={index()}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View All
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {recent_requests.length > 0 ? (
                            <div className="space-y-4">
                                {recent_requests.slice(0, 5).map((request) => (
                                    <div key={request.id} className="flex flex-col space-y-3 p-4 border rounded-lg transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            {getStatusIcon(request.status)}
                                            <div className="space-y-1">
                                                <p className="font-medium">{request.request_number}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {request.document_type} • ₱{request.amount}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                                            <Badge className={getStatusColor(request.status)}>
                                                {request.status.replace('_', ' ')}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No requests yet</h3>
                                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                    Create your first document request to get started.
                                </p>
                                <Button asChild>
                                    <Link href={create()}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Request
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
