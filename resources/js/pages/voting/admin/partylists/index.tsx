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
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Flag, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Partylists', href: voting.admin.partylists.index.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
    election: Election;
    candidates_count?: number;
}

interface Props {
    partylists: Partylist[];
    elections: Election[];
    selectedElectionId?: number;
}

export default function Index({
    partylists,
    elections,
    selectedElectionId,
}: Props) {
    const { can } = usePermissions();

    const handleElectionChange = (value: string) => {
        router.get(
            voting.admin.partylists.index.url(),
            value !== 'all' ? { election_id: value } : {},
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Partylists" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Partylists
                        </h1>
                        <p className="text-muted-foreground">
                            Manage political parties and groups
                        </p>
                    </div>
                    {can('partylists.create') && (
                        <Link
                            href={
                                voting.admin.partylists.create.url() +
                                (selectedElectionId
                                    ? `?election_id=${selectedElectionId}`
                                    : '')
                            }
                        >
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Partylist
                            </Button>
                        </Link>
                    )}
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

                {/* Partylists List */}
                <Card>
                    {partylists.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Flag />
                                </EmptyMedia>
                                <EmptyTitle>No partylists yet</EmptyTitle>
                                <EmptyDescription>
                                    Add partylists to organize candidates
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                {can('partylists.create') && (
                                    <Link
                                        href={
                                            voting.admin.partylists.create.url() +
                                            (selectedElectionId
                                                ? `?election_id=${selectedElectionId}`
                                                : '')
                                        }
                                    >
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Partylist
                                        </Button>
                                    </Link>
                                )}
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>All Partylists</CardTitle>
                                <CardDescription>
                                    View and manage all political parties and groups
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Partylist</TableHead>
                                            <TableHead>Election</TableHead>
                                            <TableHead>Candidates</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {partylists.map((partylist) => (
                                            <TableRow key={partylist.partylist_id}>
                                                <TableCell>
                                                    <div className="font-medium text-foreground">
                                                        {partylist.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {partylist.election.name}
                                                </TableCell>
                                                <TableCell className="text-sm font-semibold text-foreground">
                                                    {partylist.candidates_count ||
                                                        0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={voting.admin.partylists.show.url(
                                                                {
                                                                    partylist:
                                                                        partylist.partylist_id,
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
                                                        {can('partylists.edit') && (
                                                            <Link
                                                                href={voting.admin.partylists.edit.url(
                                                                    {
                                                                        partylist:
                                                                            partylist.partylist_id,
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
                                                        )}
                                                        {can('partylists.delete') && (
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
                                                                            Delete Partylist
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Are you sure you want to delete "{partylist.name}"? This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                router.delete(
                                                                                    voting.admin.partylists.destroy.url({
                                                                                        partylist: partylist.partylist_id,
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
                                                        )}
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
