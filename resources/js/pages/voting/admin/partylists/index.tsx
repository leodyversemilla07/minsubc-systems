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
import { Edit, Eye, Flag, Plus, Trash2 } from 'lucide-react';
import voting from '@/routes/voting';

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

export default function Index({ partylists, elections, selectedElectionId }: Props) {
    const handleDelete = (partylist: Partylist) => {
        if (confirm('Delete this partylist?')) {
            router.delete(voting.admin.partylists.destroy.url({ partylist: partylist.partylist_id }));
        }
    };

    const handleElectionChange = (value: string) => {
        router.get(voting.admin.partylists.index.url(), value ? { election_id: value } : {});
    };

    return (
        <AppLayout>
            <Head title="Partylists" />

            <div className="bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="border-b p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Partylists</h1>
                            <p className="text-sm text-gray-600 mt-1">Manage political parties and groups</p>
                        </div>
                        <Link
                            href={voting.admin.partylists.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                        >
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Partylist
                            </Button>
                        </Link>
                    </div>

                    {/* Election Filter */}
                    <div className="flex gap-3">
                        <Select value={selectedElectionId?.toString() || ''} onValueChange={handleElectionChange}>
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="All Elections" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Elections</SelectItem>
                                {elections.map((election) => (
                                    <SelectItem key={election.id} value={election.id.toString()}>
                                        {election.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Partylists List */}
                <div className="p-6">
                    {partylists.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <Flag className="w-16 h-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No partylists yet</EmptyTitle>
                                <EmptyDescription>Add partylists to organize candidates</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={voting.admin.partylists.create.url() + (selectedElectionId ? `?election_id=${selectedElectionId}` : '')}
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Partylist
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Partylist</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Candidates</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {partylists.map((partylist) => (
                                        <TableRow key={partylist.partylist_id}>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">{partylist.name}</div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {partylist.election.name}
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold text-gray-800">
                                                {partylist.candidates_count || 0}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={voting.admin.partylists.show.url({ partylist: partylist.partylist_id })}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={voting.admin.partylists.edit.url({ partylist: partylist.partylist_id })}
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(partylist)}
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
