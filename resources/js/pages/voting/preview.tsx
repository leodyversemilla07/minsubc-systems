import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { SecurityBadge } from '@/components/voting/security-badge';
import { VotingProgress } from '@/components/voting/voting-progress';
import voting from '@/routes/voting';
import { router } from '@inertiajs/react';
import { ArrowLeft, CircleAlert, CircleCheck, Lock } from 'lucide-react';
import { useState } from 'react';

interface Partylist {
    id: number;
    name: string;
}

interface CandidatePreview {
    id: number;
    fullname: string;
    photo: string | null;
    partylist: Partylist | null;
}

interface PositionPreview {
    position_id: number;
    description: string;
    max_vote: number;
}

interface Selection {
    position: PositionPreview;
    candidates: CandidatePreview[];
}

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface PreviewPageProps {
    election: Election;
    selections: Selection[];
    votes: Record<number, number[]>;
}

export default function Preview({
    election,
    selections,
    votes,
}: PreviewPageProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEditVotes = () => {
        router.get(
            voting.ballot.url(),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleConfirmSubmit = () => {
        setIsSubmitting(true);
        router.post(
            voting.submit.url(),
            { votes },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const totalSelections = selections.reduce(
        (sum, selection) => sum + selection.candidates.length,
        0,
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-950 dark:to-gray-900">
            {/* Header */}
            <div className="bg-green-600 text-white shadow-lg dark:bg-green-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            {/* Logo */}
                            <img
                                src="/votesys-logo.png"
                                alt="VoteSys Logo"
                                className="hidden h-12 w-auto sm:block"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {election.name}
                                </h1>
                                <p className="text-sm opacity-90">
                                    Review Your Selections
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleEditVotes}
                            className="bg-white/20 text-white hover:bg-white/30"
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Edit Selections
                        </Button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                            <CircleCheck className="h-4 w-4" />
                            <span className="font-semibold">
                                {selections.length} position
                                {selections.length !== 1 ? 's' : ''} filled
                            </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                            <span className="font-semibold">
                                {totalSelections} candidate
                                {totalSelections !== 1 ? 's' : ''} selected
                            </span>
                        </div>
                    </div>

                    {/* Voting Progress Indicator - Centered */}
                    <div className="mt-6">
                        <VotingProgress currentStep={3} />
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="container mx-auto max-w-5xl px-4 py-8">
                {/* Security Badge */}
                <div className="mb-6">
                    <SecurityBadge message="Your vote will be encrypted and submitted securely. This cannot be undone." />
                </div>

                {/* Warning Alert */}
                <Alert className="mb-6 border-yellow-200 bg-yellow-50 text-yellow-800 shadow-md dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                    <CircleAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                    <div>
                        <h3 className="mb-1 font-semibold">
                            Final Confirmation Required
                        </h3>
                        <p className="text-sm">
                            Please carefully review your selections below. Once
                            you submit your vote,
                            <span className="font-semibold">
                                {' '}
                                it cannot be changed or withdrawn
                            </span>
                            . Make sure all selections are correct before
                            proceeding.
                        </p>
                    </div>
                </Alert>

                {/* Selections Display - Consolidated */}
                <div className="mb-6">
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
                        {/* Header */}
                        <div className="bg-green-600 px-6 py-4 text-white dark:bg-green-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Your Vote Summary
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        {totalSelections} candidate{totalSelections !== 1 ? 's' : ''} selected across {selections.length} position{selections.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <CircleCheck className="h-10 w-10" />
                            </div>
                        </div>

                        {/* All Selections */}
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {selections.map((selection) => (
                                <div key={selection.position.position_id} className="p-6">
                                    {/* Position Title */}
                                    <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white dark:bg-green-500">
                                            {selection.candidates.length}
                                        </span>
                                        {selection.position.description}
                                    </h4>

                                    {/* Candidates for this position */}
                                    <div className="space-y-3">
                                        {selection.candidates.map((candidate) => (
                                            <div
                                                key={candidate.id}
                                                className="flex items-center gap-4 rounded-lg border-2 border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950"
                                            >
                                                {/* Candidate Photo */}
                                                {candidate.photo ? (
                                                    <img
                                                        src={`/storage/${candidate.photo}`}
                                                        alt={candidate.fullname}
                                                        className="h-14 w-14 rounded-full border-2 border-green-600 object-cover shadow-md dark:border-green-500"
                                                    />
                                                ) : (
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white shadow-md dark:bg-green-500">
                                                        {candidate.fullname.charAt(0)}
                                                    </div>
                                                )}

                                                {/* Candidate Info */}
                                                <div className="flex-1">
                                                    <h5 className="font-bold text-gray-800 dark:text-gray-100">
                                                        {candidate.fullname}
                                                    </h5>
                                                    {candidate.partylist ? (
                                                        <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                                            {candidate.partylist.name}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm italic text-gray-500 dark:text-gray-400">
                                                            Independent
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Checkmark */}
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white shadow-md dark:bg-green-500">
                                                    <CircleCheck className="h-4 w-4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selections.length === 0 && (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-md dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-4 text-gray-400 dark:text-gray-600">
                                <CircleAlert className="mx-auto h-16 w-16" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                                No Selections Made
                            </h3>
                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                You haven't selected any candidates yet.
                            </p>
                            <Button
                                onClick={handleEditVotes}
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back to Ballot
                            </Button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {selections.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                onClick={handleEditVotes}
                                variant="outline"
                                className="flex-1 border-2 py-6 text-lg"
                                disabled={isSubmitting}
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Edit My Selections
                            </Button>
                            <Button
                                onClick={handleConfirmSubmit}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-lg font-bold shadow-lg hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Submitting Vote...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2 h-5 w-5" />
                                        Confirm & Submit Vote
                                    </>
                                )}
                            </Button>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            By confirming, you acknowledge that your selections
                            are final and{' '}
                            <span className="font-semibold text-red-600 dark:text-red-500">
                                cannot be changed
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
