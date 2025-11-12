import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { KeyRound, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    voters_id: string;
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
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Voters', href: voting.admin.voters.index.url() },
        { title: voter.student?.user?.full_name || voter.voters_id, href: '#' },
    ];

    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = () => {
        if (!newPassword) return;
        router.post(
            voting.admin.voters.resetPassword.url({
                voter: Number(voter.voters_id),
            }),
            { new_password: newPassword },
        );
        setResetPasswordOpen(false);
        setNewPassword('');
    };

    const handleResetVote = () => {
        if (
            confirm(
                'This will delete all votes and allow voter to vote again. Continue?',
            )
        ) {
            router.post(
                voting.admin.voters.resetVote.url({
                    voter: Number(voter.voters_id),
                }),
            );
        }
    };

    const handleDelete = () => {
        if (confirm('Permanently delete this voter?')) {
            router.delete(
                voting.admin.voters.destroy.url({
                    voter: Number(voter.voters_id),
                }),
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Voter: ${voter.voters_id}`} />

            <div className="max-w-4xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
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
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-lg font-bold text-gray-800">
                                Voter Info
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        Voter ID
                                    </div>
                                    <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                                        {voter.voters_id}
                                    </code>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        Election
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {voter.election.name}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        Generation Batch
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {voter.generation_batch}
                                    </div>
                                </div>
                                {voter.prefix && (
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">
                                            Prefix
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {voter.prefix}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        Status
                                    </div>
                                    <div className="mt-1">
                                        {voter.has_voted ? (
                                            <Badge className="bg-green-100 text-green-800">
                                                Voted
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Not Voted
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student Info */}
                        {voter.student && (
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h2 className="mb-4 text-lg font-bold text-gray-800">
                                    Student Info
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">
                                            Name
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {voter.student.user.full_name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">
                                            Course
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {voter.student.course}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">
                                            Year Level
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {voter.student.year_level}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">
                                            Campus
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {voter.student.campus}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Actions & Votes */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Actions */}
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                                Actions
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {/* Reset Password Dialog */}
                                <Dialog
                                    open={resetPasswordOpen}
                                    onOpenChange={setResetPasswordOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <KeyRound className="mr-2 h-4 w-4" />
                                            Reset Password
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Reset Voter Password
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div>
                                                <label
                                                    htmlFor="new_password"
                                                    className="mb-2 block text-sm font-medium"
                                                >
                                                    New Password
                                                </label>
                                                <Input
                                                    id="new_password"
                                                    type="text"
                                                    value={newPassword}
                                                    onChange={(e) =>
                                                        setNewPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={
                                                        handleResetPassword
                                                    }
                                                    disabled={!newPassword}
                                                >
                                                    Confirm Reset
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setResetPasswordOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                {/* Reset Vote */}
                                {voter.has_voted && (
                                    <Button
                                        onClick={handleResetVote}
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reset Vote
                                    </Button>
                                )}

                                {/* Delete Voter */}
                                <Button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Voter
                                </Button>
                            </div>
                        </div>

                        {/* Votes Cast */}
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                                Votes Cast ({voter.votes.length})
                            </h3>
                            {voter.votes.length === 0 ? (
                                <p className="py-8 text-center text-gray-500">
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
                                                <div className="font-medium text-gray-800">
                                                    {vote.candidate.fullname}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {
                                                        vote.candidate.position
                                                            .description
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">
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
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
