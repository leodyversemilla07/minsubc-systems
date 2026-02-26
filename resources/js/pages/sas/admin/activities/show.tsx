import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    FileText,
    MapPin,
    Target,
    Users,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Organization {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    activity_title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    all_day: boolean;
    location: string | null;
    category: string | null;
    organizer: string | null;
    organization_id: number | null;
    organization?: Organization;
    color: string;
    target_participants: number | null;
    actual_participants: number | null;
    completion_report: string | null;
    status: string;
}

interface Props {
    activity: Activity;
}

export default function ActivityShow({ activity }: Props) {
    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            Scheduled: 'default',
            Completed: 'secondary',
            Cancelled: 'destructive',
        };

        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    }

    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    const handleCancel = () => {
        setIsCancelDialogOpen(true);
    };

    const confirmCancel = () => {
        router.post(
            sas.admin.activities.cancel.url(activity.id),
            {},
            {
                onSuccess: () => setIsCancelDialogOpen(false),
            },
        );
    };

    const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

    const {
        data,
        setData,
        post: postComplete,
        processing: isCompleting,
        reset: resetComplete,
    } = useForm({
        actual_participants: activity.target_participants?.toString() || '0',
        completion_report: '',
    });

    const handleComplete = () => {
        setIsCompleteDialogOpen(true);
    };

    const confirmComplete = (e: React.FormEvent) => {
        e.preventDefault();
        postComplete(sas.admin.activities.complete.url(activity.id), {
            onSuccess: () => {
                setIsCompleteDialogOpen(false);
                resetComplete();
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: sas.admin.dashboard.url() },
                { title: 'Activities', href: sas.admin.activities.index.url() },
                {
                    title: activity.activity_title,
                    href: sas.admin.activities.show.url(activity.id),
                },
            ]}
        >
            <Head title={`Activity: ${activity.activity_title}`} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="flex items-center gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                                    {activity.activity_title}
                                </h1>
                                {getStatusBadge(activity.status)}
                            </div>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                {activity.category || 'Uncategorized'} •
                                Scheduled by {activity.organizer || 'SAS Admin'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {activity.status === 'Scheduled' && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                                <Button onClick={handleComplete}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark Completed
                                </Button>
                            </>
                        )}
                        <Button variant="secondary" asChild>
                            <Link
                                href={sas.admin.activities.edit.url(
                                    activity.id,
                                )}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column - Main Details */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                                    {activity.description ||
                                        'No description provided.'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Completion Details (Only if completed) */}
                        {activity.status === 'Completed' && (
                            <Card className="border-green-200 bg-green-50/10 dark:border-green-900/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                        <CheckCircle className="h-5 w-5" />
                                        Completion Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm font-medium">
                                                Actual Participants
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {activity.actual_participants ||
                                                    0}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Turnout Rate
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {activity.target_participants
                                                    ? Math.round(
                                                          ((activity.actual_participants ||
                                                              0) /
                                                              activity.target_participants) *
                                                              100,
                                                      )
                                                    : 0}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                    {activity.completion_report && (
                                        <div>
                                            <p className="mb-1 text-sm font-medium">
                                                Post-Activity Notes
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.completion_report}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Info Panels */}
                    <div className="space-y-6">
                        {/* Event Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Schedule
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {new Date(
                                                activity.start_date,
                                            ).toLocaleDateString()}
                                            {activity.all_day
                                                ? ' (All Day)'
                                                : ` @ ${new Date(activity.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Duration
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {new Date(
                                                activity.end_date,
                                            ).toLocaleDateString()}
                                            {!activity.all_day &&
                                                ` @ ${new Date(activity.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Venue
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {activity.location || 'TBA'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div
                                        className="h-4 w-4 rounded-full border shadow-sm"
                                        style={{
                                            backgroundColor: activity.color,
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Calendar Color
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground uppercase">
                                            {activity.color}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organization & Participation */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Participation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Organizer
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {activity.organizer || 'SAS Admin'}
                                        </p>
                                        {activity.organization && (
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                Org:{' '}
                                                {activity.organization.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm leading-none font-medium">
                                            Target Participants
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {activity.target_participants ||
                                                'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <AlertDialog
                open={isCancelDialogOpen}
                onOpenChange={setIsCancelDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Activity</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel "
                            {activity.activity_title}"? This action will mark
                            the activity as cancelled and cannot be easily
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Go Back</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmCancel}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Confirm Cancellation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog
                open={isCompleteDialogOpen}
                onOpenChange={setIsCompleteDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Mark Activity as Completed</DialogTitle>
                        <DialogDescription>
                            Enter the final details for "
                            {activity.activity_title}" to close this record.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={confirmComplete} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="actual_participants">
                                Actual Participants Count
                            </Label>
                            <Input
                                id="actual_participants"
                                type="number"
                                min="0"
                                value={data.actual_participants}
                                onChange={(e) =>
                                    setData(
                                        'actual_participants',
                                        e.target.value,
                                    )
                                }
                                placeholder="Enter total attendees"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="completion_report">
                                Completion Report / Notes (Optional)
                            </Label>
                            <Textarea
                                id="completion_report"
                                value={data.completion_report}
                                onChange={(e) =>
                                    setData('completion_report', e.target.value)
                                }
                                placeholder="Briefly describe how the activity went..."
                                rows={4}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCompleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCompleting}>
                                {isCompleting
                                    ? 'Processing...'
                                    : 'Complete Activity'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
