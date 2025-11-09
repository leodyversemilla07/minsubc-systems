import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { CircleAlert, CircleCheck, ArrowLeft } from 'lucide-react';
import voting from '@/routes/voting';

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
    const handleEditVotes = () => {
        router.get(voting.ballot.url(), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleConfirmSubmit = () => {
        router.post(voting.submit.url(), { votes });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">{election.name}</h1>
                            <p className="text-sm opacity-90">Review Your Selections</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleEditVotes}
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Edit Selections
                        </Button>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Warning Alert */}
                <Alert className="mb-6 border-yellow-200 bg-yellow-50 text-yellow-800">
                    <CircleAlert className="h-5 w-5 text-yellow-600" />
                    <div>
                        <h3 className="font-semibold mb-1">Review Before Submitting</h3>
                        <p className="text-sm">
                            Please carefully review your selections below. Once you submit your vote, 
                            <span className="font-semibold"> you cannot make any changes</span>.
                        </p>
                    </div>
                </Alert>

                {/* Selections Display */}
                <div className="space-y-6 mb-6">
                    {selections.map((selection) => (
                        <div
                            key={selection.position.position_id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {/* Position Header */}
                            <div className="bg-green-600 text-white px-6 py-4">
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
                                            className="flex items-center gap-4 p-4 border-2 border-green-100 bg-green-50 rounded-lg"
                                        >
                                            {/* Candidate Photo */}
                                            {candidate.photo ? (
                                                <img
                                                    src={`/storage/${candidate.photo}`}
                                                    alt={candidate.fullname}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600 shadow-md"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                                    {candidate.fullname.charAt(0)}
                                                </div>
                                            )}

                                            {/* Candidate Info */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-lg">
                                                    {candidate.fullname}
                                                </h4>
                                                {candidate.partylist ? (
                                                    <p className="text-sm text-green-700 font-medium">
                                                        {candidate.partylist.name}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-500 italic">
                                                        Independent
                                                    </p>
                                                )}
                                            </div>

                                            {/* Checkmark */}
                                            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                                                <CircleCheck className="w-5 h-5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {selections.length === 0 && (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <CircleAlert className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No Selections Made
                            </h3>
                            <p className="text-gray-500 mb-6">
                                You haven't selected any candidates yet.
                            </p>
                            <Button
                                onClick={handleEditVotes}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back to Ballot
                            </Button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {selections.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleEditVotes}
                                variant="outline"
                                className="flex-1 py-6 text-lg"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Edit My Selections
                            </Button>
                            <Button
                                onClick={handleConfirmSubmit}
                                className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-lg font-bold"
                            >
                                <CircleCheck className="w-5 h-5 mr-2" />
                                Confirm & Submit Vote
                            </Button>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            By confirming, you acknowledge that your selections are final and{' '}
                            <span className="font-semibold text-red-600">cannot be changed</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
