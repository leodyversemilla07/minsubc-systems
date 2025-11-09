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
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Plus, Trash2, UserCheck } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

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

export default function Index({ voters, elections, selectedElectionId }: Props) {
    const handleDelete = (voter: Voter) => {
        if (confirm('Delete this voter?')) {
            router.delete(voting.admin.voters.destroy.url({ voter: Number(voter.voters_id) }));
        }
    };

    const handleElectionChange = (value: string) => {
        router.get(voting.admin.voters.index.url(), value !== 'all' ? { election_id: value } : {});
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voters" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Voters</h1>
                        <p className="text-muted-foreground">Manage voter accounts</p>
                    </div>
                    <Link
                        href={voting.admin.voters.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                    >
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Generate Voters
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

                {/* Voters List */}
                <div>
                    {voters.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <UserCheck className="w-16 h-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No voters yet</EmptyTitle>
                                <EmptyDescription>Generate voter accounts for students</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={voting.admin.voters.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Generate Voters
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Voter ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Batch</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {voters.map((voter) => (
                                        <TableRow key={voter.voters_id}>
                                            <TableCell>
                                                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                    {voter.voters_id}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">
                                                    {voter.student?.user?.full_name || 'N/A'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {voter.student?.course} {voter.student?.year_level}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {voter.election.name}
                                            </TableCell>
                                            <TableCell>
                                                {voter.has_voted ? (
                                                    <Badge className="bg-green-100 text-green-800">Voted</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Not Voted</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {voter.generation_batch}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={voting.admin.voters.show.url({ voter: Number(voter.voters_id) })}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(voter)}
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
