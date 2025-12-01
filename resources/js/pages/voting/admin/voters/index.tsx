import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { Eye, Plus, Trash2, UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Voters', href: voting.admin.voters.index.url() },
];

interface Election {
    id: number;
    name: string;
}

interface User {
    full_name: string;
}

interface Student {
    course?: string;
    year_level?: string;
    user?: User;
}

interface Voter {
    voters_id: string;
    election: Election;
    student?: Student;
    has_voted: boolean;
    generation_batch: number;
}

interface Props {
    voters: Voter[];
    elections: Election[];
    selectedElectionId?: number;
}

export default function Index({
    voters,
    elections,
    selectedElectionId,
}: Props) {
    const handleElectionChange = (value: string) => {
        router.get(
            voting.admin.voters.index.url(),
            value !== 'all' ? { election_id: value } : {},
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voters" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Voters
                        </h1>
                        <p className="text-muted-foreground">
                            Manage voter accounts
                        </p>
                    </div>
                    <Link
                        href={
                            voting.admin.voters.create.url() +
                            (selectedElectionId
                                ? `?election_id=${selectedElectionId}`
                                : '')
                        }
                    >
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Generate Voters
                        </Button>
                    </Link>
                </div>

                {/* Election Filter */}
                <div className="flex gap-3">
                    <Select
                        value={selectedElectionId?.toString() || 'all'}
                        onValueChange={handleElectionChange}
                    >
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="All Elections" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Elections</SelectItem>
                            {elections.map((election) => (
                                <SelectItem
                                    key={election.id}
                                    value={election.id.toString()}
                                >
                                    {election.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Voters List */}
                <Card>
                    {voters.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <UserCheck />
                                </EmptyMedia>
                                <EmptyTitle>No voters yet</EmptyTitle>
                                <EmptyDescription>
                                    Generate voter accounts for students
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={
                                        voting.admin.voters.create.url() +
                                        (selectedElectionId
                                            ? `?election_id=${selectedElectionId}`
                                            : '')
                                    }
                                >
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Generate Voters
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>All Voters</CardTitle>
                                <CardDescription>
                                    View and manage all voter accounts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Voter ID</TableHead>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Election</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Batch</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {voters.map((voter) => (
                                            <TableRow key={voter.voters_id}>
                                                <TableCell>
                                                    <code className="rounded bg-muted px-2 py-1 text-xs">
                                                        {voter.voters_id}
                                                    </code>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-foreground">
                                                        {voter.student?.user
                                                            ?.full_name || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {voter.student?.course}{' '}
                                                        {voter.student?.year_level}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {voter.election.name}
                                                </TableCell>
                                                <TableCell>
                                                    {voter.has_voted ? (
                                                        <Badge variant="default">
                                                            Voted
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary">
                                                            Not Voted
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {voter.generation_batch}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={voting.admin.voters.show.url(
                                                                {
                                                                    voter: Number(
                                                                        voter.voters_id,
                                                                    ),
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
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Delete Voter
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete voter "{voter.voters_id}"? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            router.delete(
                                                                                voting.admin.voters.destroy.url({
                                                                                    voter: Number(voter.voters_id),
                                                                                }),
                                                                            )
                                                                        }
                                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
