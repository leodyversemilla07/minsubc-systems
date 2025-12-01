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
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    Edit,
    Eye,
    FileText,
    Plus,
    Trash2,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Positions', href: voting.admin.positions.index.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    priority: number;
    election: Election;
    candidates_count?: number;
}

interface Props {
    positions: Position[];
    elections: Election[];
    selectedElectionId?: number;
}

export default function Index({
    positions,
    elections,
    selectedElectionId,
}: Props) {
    const handleElectionChange = (value: string) => {
        router.get(
            voting.admin.positions.index.url(),
            value !== 'all' ? { election_id: value } : {},
        );
    };

    const handleMoveUp = (positionId: number) => {
        router.post(
            voting.admin.positions.moveUp.url({ position: positionId }),
        );
    };

    const handleMoveDown = (positionId: number) => {
        router.post(
            voting.admin.positions.moveDown.url({ position: positionId }),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Positions" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Positions
                        </h1>
                        <p className="text-muted-foreground">
                            Manage election positions
                        </p>
                    </div>
                    <Link
                        href={
                            voting.admin.positions.create.url() +
                            (selectedElectionId
                                ? `?election_id=${selectedElectionId}`
                                : '')
                        }
                    >
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Position
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

                {/* Positions List */}
                <Card>
                    {positions.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FileText />
                                </EmptyMedia>
                                <EmptyTitle>No positions yet</EmptyTitle>
                                <EmptyDescription>
                                    Add positions to organize your election
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={
                                        voting.admin.positions.create.url() +
                                        (selectedElectionId
                                            ? `?election_id=${selectedElectionId}`
                                            : '')
                                    }
                                >
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Position
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>All Positions</CardTitle>
                                <CardDescription>
                                    View and manage all election positions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Max Votes</TableHead>
                                            <TableHead>Election</TableHead>
                                            <TableHead>Candidates</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {positions.map((position, index) => (
                                            <TableRow key={position.position_id}>
                                                <TableCell>
                                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
                                                        {position.priority}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-foreground">
                                                        {position.description}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {position.max_vote}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {position.election.name}
                                                </TableCell>
                                                <TableCell className="text-sm font-semibold text-foreground">
                                                    {position.candidates_count || 0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleMoveUp(
                                                                    position.position_id,
                                                                )
                                                            }
                                                            disabled={index === 0}
                                                            title="Move Up"
                                                        >
                                                            <ArrowUp className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleMoveDown(
                                                                    position.position_id,
                                                                )
                                                            }
                                                            disabled={
                                                                index ===
                                                                positions.length - 1
                                                            }
                                                            title="Move Down"
                                                        >
                                                            <ArrowDown className="h-4 w-4" />
                                                        </Button>
                                                        <Link
                                                            href={voting.admin.positions.show.url(
                                                                {
                                                                    position:
                                                                        position.position_id,
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
                                                            href={voting.admin.positions.edit.url(
                                                                {
                                                                    position:
                                                                        position.position_id,
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
                                                                        Delete Position
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete "{position.description}"? This action cannot be undone and will remove all associated candidates.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            router.delete(
                                                                                voting.admin.positions.destroy.url({
                                                                                    position: position.position_id,
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
