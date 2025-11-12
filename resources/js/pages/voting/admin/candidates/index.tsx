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
import { Edit, Eye, Plus, Trash2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Candidates', href: voting.admin.candidates.index.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Candidate {
    candidate_id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    photo: string | null;
    platform: string | null;
    election: Election;
    position: Position;
    partylist: Partylist | null;
}

interface Props {
    candidates: Candidate[];
    elections: Election[];
    selectedElectionId?: number;
}

export default function Index({
    candidates,
    elections,
    selectedElectionId,
}: Props) {
    const handleDelete = (candidate: Candidate) => {
        if (confirm('Delete this candidate?')) {
            router.delete(
                voting.admin.candidates.destroy.url({
                    candidate: candidate.candidate_id,
                }),
            );
        }
    };

    const handleElectionChange = (value: string) => {
        router.get(
            voting.admin.candidates.index.url(),
            value !== 'all' ? { election_id: value } : {},
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Candidates" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Candidates
                        </h1>
                        <p className="text-muted-foreground">
                            Manage election candidates
                        </p>
                    </div>
                    <Link
                        href={
                            voting.admin.candidates.create.url() +
                            (selectedElectionId
                                ? `?election_id=${selectedElectionId}`
                                : '')
                        }
                    >
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Candidate
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

                {/* Candidates List */}
                <div>
                    {candidates.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <Users className="h-16 w-16" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No candidates yet</EmptyTitle>
                                <EmptyDescription>
                                    Add candidates to get started
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link
                                    href={
                                        voting.admin.candidates.create.url() +
                                        (selectedElectionId
                                            ? `?election_id=${selectedElectionId}`
                                            : '')
                                    }
                                >
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Candidate
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Candidate</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Partylist</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidates.map((candidate) => (
                                        <TableRow key={candidate.candidate_id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {candidate.photo ? (
                                                        <img
                                                            src={`/storage/${candidate.photo}`}
                                                            alt={
                                                                candidate.fullname
                                                            }
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-500">
                                                            {candidate.firstname.charAt(
                                                                0,
                                                            )}
                                                            {candidate.lastname.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="font-medium text-gray-800">
                                                        {candidate.fullname}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {candidate.position.description}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {candidate.partylist ? (
                                                    <span className="text-blue-600">
                                                        {
                                                            candidate.partylist
                                                                .name
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500 italic">
                                                        Independent
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {candidate.election.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={voting.admin.candidates.show.url(
                                                            {
                                                                candidate:
                                                                    candidate.candidate_id,
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
                                                        href={voting.admin.candidates.edit.url(
                                                            {
                                                                candidate:
                                                                    candidate.candidate_id,
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
                                                                candidate,
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
