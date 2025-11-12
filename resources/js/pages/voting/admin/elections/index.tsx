import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Edit, Eye, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Elections', href: voting.admin.elections.index.url() },
];

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: 'active' | 'ended';
    end_time: string | null;
    created_at: string;
    updated_at: string;
    positions_count?: number;
    candidates_count?: number;
    voters_count?: number;
    votes_count?: number;
}

interface Props {
    elections: Election[];
}

export default function Index({ elections }: Props) {
    const handleDelete = (election: Election) => {
        if (confirm('Are you sure you want to delete this election?')) {
            router.delete(
                voting.admin.elections.destroy.url({ election: election.id }),
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Elections" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Elections
                        </h1>
                        <p className="text-muted-foreground">
                            Manage election cycles and settings
                        </p>
                    </div>
                    <Link href={voting.admin.elections.create.url()}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Election
                        </Button>
                    </Link>
                </div>

                {/* Elections Table */}
                <div>
                    {elections.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <Calendar className="h-16 w-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No elections yet</EmptyTitle>
                                <EmptyDescription>
                                    Create your first election to get started
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={voting.admin.elections.create.url()}
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Election
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>End Time</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {elections.map((election) => (
                                        <TableRow key={election.id}>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">
                                                    {election.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                                                    {election.election_code}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                {election.status ===
                                                'active' ? (
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Ended
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {election.end_time
                                                    ? new Date(
                                                          election.end_time,
                                                      ).toLocaleDateString(
                                                          'en-US',
                                                          {
                                                              month: 'short',
                                                              day: 'numeric',
                                                              year: 'numeric',
                                                              hour: 'numeric',
                                                              minute: '2-digit',
                                                          },
                                                      )
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={voting.admin.elections.show.url(
                                                            {
                                                                election:
                                                                    election.id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={voting.admin.elections.edit.url(
                                                            {
                                                                election:
                                                                    election.id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                election,
                                                            )
                                                        }
                                                        className="text-red-600 hover:bg-red-50 hover:text-red-800"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
