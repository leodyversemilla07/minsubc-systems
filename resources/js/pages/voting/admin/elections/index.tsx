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
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Edit, Eye, Plus, Trash2 } from 'lucide-react';
import voting from '@/routes/voting';

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
            router.delete(voting.admin.elections.destroy.url({ election: election.id }));
        }
    };

    return (
        <AppLayout>
            <Head title="Elections" />

            <div className="bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="border-b p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Elections</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage election cycles and settings</p>
                    </div>
                    <Link href={voting.admin.elections.create.url()}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Election
                        </Button>
                    </Link>
                </div>

                {/* Elections Table */}
                <div className="p-6">
                    {elections.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <Calendar className="w-16 h-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No elections yet</EmptyTitle>
                                <EmptyDescription>
                                    Create your first election to get started
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href={voting.admin.elections.create.url()}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" />
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
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {elections.map((election) => (
                                        <TableRow key={election.id}>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">{election.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                    {election.election_code}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                {election.status === 'active' ? (
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
                                                    ? new Date(election.end_time).toLocaleDateString('en-US', {
                                                          month: 'short',
                                                          day: 'numeric',
                                                          year: 'numeric',
                                                          hour: 'numeric',
                                                          minute: '2-digit',
                                                      })
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={voting.admin.elections.show.url({ election: election.id })}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={voting.admin.elections.edit.url({ election: election.id })}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(election)}
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
