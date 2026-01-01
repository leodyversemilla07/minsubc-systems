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
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { RotateCcw, Trash2 } from 'lucide-react';

interface Election {
    id: number;
    name: string;
}

interface User {
    full_name: string;
}

interface Student {
    course: string;
    year_level: string;
    campus: string;
    user: User;
}

interface Position {
    description: string;
}

interface Candidate {
    fullname: string;
    position: Position;
}

interface Vote {
    candidate: Candidate;
    timestamp: string;
}

interface Voter {
    school_id: string;
    election: Election;
    student?: Student;
    has_voted: boolean;
    generation_batch: number;
    prefix?: string;
    votes: Vote[];
}

interface Props {
    voter: Voter;
}

export default function Show({ voter }: Props) {
    const { can } = usePermissions();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Voters', href: voting.admin.voters.index.url() },
        { title: voter.student?.user?.full_name || voter.school_id, href: '#' },
    ];

    const handleResetVote = () => {
        router.post(
            voting.admin.voters.resetVote.url({
                voter: Number(voter.school_id),
            }),
        );
    };

    const handleDelete = () => {
        router.delete(
            voting.admin.voters.destroy.url({
                voter: Number(voter.school_id),
            }),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Student: ${voter.school_id}`} />

            <div className="max-w-4xl space-y-6 p-6 md:space-y-8 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">
                        Voter Details
                    </h1>
                    <Link href={voting.admin.voters.index.url()}>
                        <Button variant="outline">Back</Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column: Voter & Student Info */}
                    <div className="space-y-6">
                        {/* Voter Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Voter Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        School ID
                                    </div>
                                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                        {voter.school_id}
                                    </code>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Election
                                    </div>
                                    <div className="text-sm font-medium text-foreground">
                                        {voter.election.name}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Generation Batch
                                    </div>
                                    <div className="text-sm font-medium text-foreground">
                                        {voter.generation_batch}
                                    </div>
                                </div>
                                {voter.prefix && (
                                    <div>
                                        <div className="text-xs uppercase text-muted-foreground">
                                            Prefix
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {voter.prefix}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Status
                                    </div>
                                    <div className="mt-1">
                                        {voter.has_voted ? (
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Voted
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Not Voted
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Info */}
                        {voter.student && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <div className="text-xs uppercase text-muted-foreground">
                                            Name
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {voter.student.user.full_name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase text-muted-foreground">
                                            Course
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {voter.student.course}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase text-muted-foreground">
                                            Year Level
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {voter.student.year_level}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase text-muted-foreground">
                                            Campus
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {voter.student.campus}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column: Actions & Votes */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Actions */}
                        {(can('voters.reset-vote') || can('voters.delete')) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Reset Vote */}
                                        {can('voters.reset-vote') && voter.has_voted && (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <RotateCcw className="mr-2 h-4 w-4" />
                                                        Reset Vote
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Reset Voter's Vote
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will delete all
                                                            votes cast by this voter
                                                            and allow them to vote
                                                            again. This action
                                                            cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={handleResetVote}
                                                        >
                                                            Reset Vote
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}

                                        {/* Delete Voter */}
                                        {can('voters.delete') && (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Voter
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete Voter
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to
                                                            permanently delete this
                                                            voter? This action cannot be
                                                            undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={handleDelete}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Votes Cast */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Votes Cast ({voter.votes.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {voter.votes.length === 0 ? (
                                    <p className="py-8 text-center text-muted-foreground">
                                        No votes yet
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {voter.votes.map((vote, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border p-3"
                                            >
                                                <div>
                                                    <div className="font-medium text-foreground">
                                                        {vote.candidate.fullname}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {
                                                            vote.candidate
                                                                .position
                                                                .description
                                                        }
                                                    </div>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        vote.timestamp,
                                                    ).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
