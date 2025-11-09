import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, FileText, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

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

export default function Index({ positions, elections, selectedElectionId }: Props) {
    const handleDelete = (position: Position) => {
        if (confirm('Delete this position?')) {
            router.delete(voting.admin.positions.destroy.url({ position: position.position_id }));
        }
    };

    const handleElectionChange = (value: string) => {
        router.get(voting.admin.positions.index.url(), value !== 'all' ? { election_id: value } : {});
    };

    const handleMoveUp = (positionId: number) => {
        router.post(voting.admin.positions.moveUp.url({ position: positionId }));
    };

    const handleMoveDown = (positionId: number) => {
        router.post(voting.admin.positions.moveDown.url({ position: positionId }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Positions" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Positions</h1>
                        <p className="text-muted-foreground">Manage election positions</p>
                    </div>
                    <Link
                        href={voting.admin.positions.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                    >
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Position
                        </Button>
                    </Link>
                </div>

                {/* Election Filter */}
                <div className="flex gap-3">
                        <Select value={selectedElectionId?.toString() || 'all'} onValueChange={handleElectionChange}>
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="All Elections" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Elections</SelectItem>
                                {elections.map((election) => (
                                    <SelectItem key={election.id} value={election.id.toString()}>
                                        {election.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                {/* Positions List */}
                <div>
                    {positions.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <FileText className="w-16 h-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No positions yet</EmptyTitle>
                                <EmptyDescription>Add positions to organize your election</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={voting.admin.positions.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Position
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Max Votes</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Candidates</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {positions.map((position, index) => (
                                        <TableRow key={position.position_id}>
                                            <TableCell>
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-700">
                                                    {position.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">
                                                    {position.description}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {position.max_vote}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {position.election.name}
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold text-gray-800">
                                                {position.candidates_count || 0}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleMoveUp(position.position_id)}
                                                        disabled={index === 0}
                                                        title="Move Up"
                                                    >
                                                        <ArrowUp className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleMoveDown(position.position_id)}
                                                        disabled={index === positions.length - 1}
                                                        title="Move Down"
                                                    >
                                                        <ArrowDown className="w-4 h-4" />
                                                    </Button>
                                                    <Link href={voting.admin.positions.show.url({ position: position.position_id })}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={voting.admin.positions.edit.url({ position: position.position_id })}
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(position)}
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
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
