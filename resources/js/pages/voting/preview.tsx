import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { CircleAlert, CircleCheck, ArrowLeft, Lock } from 'lucide-react';
import voting from '@/routes/voting';
import { SecurityBadge } from '@/components/voting/security-badge';
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

export default function Preview({ election, selections, votes }: PreviewPageProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEditVotes = () => {
        router.get(voting.ballot.url(), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleConfirmSubmit = () => {
        setIsSubmitting(true);
        router.post(voting.submit.url(), { votes }, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const totalSelections = selections.reduce(
        (sum, selection) => sum + selection.candidates.length,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-950 dark:to-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            {/* Logo */}
                            <img 
                                src="/votesys-logo.png" 
                                alt="VoteSys Logo" 
                                className="h-12 w-auto hidden sm:block"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{election.name}</h1>
                                <p className="text-sm opacity-90">Review Your Selections</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleEditVotes}
                            className="bg-white/20 hover:bg-white/30 text-white"
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Edit Selections
                        </Button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                            <CircleCheck className="w-4 h-4" />
                            <span className="font-semibold">
                                {selections.length} position{selections.length !== 1 ? 's' : ''} filled
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                            <span className="font-semibold">
                                {totalSelections} candidate{totalSelections !== 1 ? 's' : ''} selected
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Security Badge */}
                <div className="mb-6">
                    <SecurityBadge message="Your vote will be encrypted and submitted securely. This cannot be undone." />
                </div>

                {/* Warning Alert */}
                <Alert className="mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 shadow-md">
                    <CircleAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                    <div>
                        <h3 className="font-semibold mb-1">⚠️ Final Confirmation Required</h3>
                        <p className="text-sm">
                            Please carefully review your selections below. Once you submit your vote, 
                            <span className="font-semibold"> it cannot be changed or withdrawn</span>.
                            Make sure all selections are correct before proceeding.
                        </p>
                    </div>
                </Alert>

                {/* Selections Display */}
                <div className="space-y-6 mb-6">
                    {selections.map((selection) => (
                        <div
                            key={selection.position.position_id}
                            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800"
                        >
                            {/* Position Header */}
                            <div className="bg-green-600 dark:bg-green-700 text-white px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {selection.position.description}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            {selection.candidates.length} of {selection.position.max_vote} {selection.position.max_vote > 1 ? 'candidates' : 'candidate'} selected
                                        </p>
                                    </div>
                                    <CircleCheck className="w-8 h-8" />
                                </div>
                            </div>

                            {/* Selected Candidates */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {selection.candidates.map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            className="flex items-center gap-4 p-4 border-2 border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-950 rounded-lg"
                                        >
                                            {/* Candidate Photo */}
                                            {candidate.photo ? (
                                                <img
                                                    src={`/storage/${candidate.photo}`}
                                                    alt={candidate.fullname}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600 dark:border-green-500 shadow-md"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                                    {candidate.fullname.charAt(0)}
                                                </div>
                                            )}

                                            {/* Candidate Info */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                                    {candidate.fullname}
                                                </h4>
                                                {candidate.partylist ? (
                                                    <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                                                        {candidate.partylist.name}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                        Independent
                                                    </p>
                                                )}
                                            </div>

                                            {/* Checkmark */}
                                            <div className="bg-green-600 dark:bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                                                <CircleCheck className="w-5 h-5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {selections.length === 0 && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-800">
                            <div className="text-gray-400 dark:text-gray-600 mb-4">
                                <CircleAlert className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No Selections Made
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                You haven't selected any candidates yet.
                            </p>
                            <Button
                                onClick={handleEditVotes}
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back to Ballot
                            </Button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {selections.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleEditVotes}
                                variant="outline"
                                className="flex-1 py-6 text-lg border-2"
                                disabled={isSubmitting}
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Edit My Selections
                            </Button>
                            <Button
                                onClick={handleConfirmSubmit}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 py-6 text-lg font-bold shadow-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting Vote...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5 mr-2" />
                                        Confirm & Submit Vote
                                    </>
                                )}
                            </Button>
                        </div>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                            By confirming, you acknowledge that your selections are final and{' '}
                            <span className="font-semibold text-red-600 dark:text-red-500">cannot be changed</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
