import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Calendar, Compass, Edit, Eye, Flag, Target, Trophy, User } from 'lucide-react';

interface VMGOVersion {
    id: number;
    vision: string;
    mission: string;
    goals: string[];
    objectives: string[];
    effective_date: string;
    updated_at: string;
    updated_by?: number;
    updated_by_user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    history: {
        current_page: number;
        data: VMGOVersion[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

export default function VMGOHistory({ history }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDateShort = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.visit(url);
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'VMGO', href: '/usg/admin/vmgo/edit' },
                { title: 'History', href: '' },
            ]}
        >
            <Head title="VMGO History - USG Admin" />

            <div className="space-y-6 py-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            VMGO Version History
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            View all versions of the Vision, Mission, Goals, and
                            Objectives
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                router.visit('/usg/admin/vmgo/edit')
                            }
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Current
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/usg/vmgo')}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Public View
                        </Button>
                    </div>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    {history.data.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <Calendar className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    No History Available
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    No VMGO versions have been created yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        history.data.map((version, index) => (
                            <Card key={version.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <CardTitle className="text-lg">
                                                    Version from{' '}
                                                    {formatDateShort(
                                                        version.effective_date,
                                                    )}
                                                </CardTitle>
                                                {index === 0 && (
                                                    <Badge>Current</Badge>
                                                )}
                                            </div>
                                            <CardDescription>
                                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        Effective:{' '}
                                                        {formatDate(
                                                            version.effective_date,
                                                        )}
                                                    </div>
                                                    {version.updated_by_user && (
                                                        <div className="flex items-center gap-1">
                                                            <User className="h-3 w-3" />
                                                            Updated by{' '}
                                                            {
                                                                version
                                                                    .updated_by_user
                                                                    .name
                                                            }
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <Trophy className="h-3 w-3" />
                                                        {version.goals.length}{' '}
                                                        Goals
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Flag className="h-3 w-3" />
                                                        {
                                                            version.objectives
                                                                .length
                                                        }{' '}
                                                        Objectives
                                                    </div>
                                                </div>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Vision */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            <h4 className="font-semibold">
                                                Vision
                                            </h4>
                                        </div>
                                        <p className="rounded-lg bg-muted p-3 text-sm">
                                            {version.vision}
                                        </p>
                                    </div>

                                    {/* Mission */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            <h4 className="font-semibold">
                                                Mission
                                            </h4>
                                        </div>
                                        <p className="rounded-lg bg-muted p-3 text-sm">
                                            {version.mission}
                                        </p>
                                    </div>

                                    {/* Goals */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <h4 className="font-semibold">
                                                Goals
                                            </h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {version.goals.map(
                                                (goal, goalIndex) => (
                                                    <li
                                                        key={goalIndex}
                                                        className="flex gap-3 text-sm"
                                                    >
                                                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                                            {goalIndex + 1}
                                                        </span>
                                                        <span className="flex-1 pt-0.5">
                                                            {goal}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    {/* Objectives */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Flag className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            <h4 className="font-semibold">
                                                Objectives
                                            </h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {version.objectives.map(
                                                (objective, objIndex) => (
                                                    <li
                                                        key={objIndex}
                                                        className="flex gap-3 text-sm"
                                                    >
                                                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                                                            {objIndex + 1}
                                                        </span>
                                                        <span className="flex-1 pt-0.5">
                                                            {objective}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {history.last_page > 1 && (
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {history.from} to {history.to} of{' '}
                            {history.total} versions
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    handlePageChange(history.prev_page_url)
                                }
                                disabled={!history.prev_page_url}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from(
                                    { length: history.last_page },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <Button
                                        key={page}
                                        variant={
                                            page === history.current_page
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(
                                                `${history.path}?page=${page}`,
                                            )
                                        }
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    handlePageChange(history.next_page_url)
                                }
                                disabled={!history.next_page_url}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
