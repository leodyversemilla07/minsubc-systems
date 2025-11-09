import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import voting from '@/routes/voting';

interface Partylist {
    id: number;
    name: string;
}

interface Candidate {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    photo: string | null;
    platform: string | null;
    partylist: Partylist | null;
}

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    candidates: Candidate[];
}

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface BallotPageProps {
    election: Election;
    positions: Position[];
}

export default function Ballot({ election, positions }: BallotPageProps) {
    const [selectedVotes, setSelectedVotes] = useState<Record<number, number[]>>(
        {}
    );

    const handleVoteChange = (positionId: number, candidateId: number, checked: boolean) => {
        setSelectedVotes((prev) => {
            const currentVotes = prev[positionId] || [];
            if (checked) {
                return { ...prev, [positionId]: [...currentVotes, candidateId] };
            } else {
                return {
                    ...prev,
                    [positionId]: currentVotes.filter((id) => id !== candidateId),
                };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(voting.preview.url(), { votes: selectedVotes });
    };

    const handleLogout = () => {
        router.post(voting.logout.url());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">{election.name}</h1>
                            <p className="text-sm opacity-90">Cast Your Vote</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ballot Form */}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <form onSubmit={handleSubmit}>
                    {/* Instructions Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            Voting Instructions
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                Select your preferred candidate for each position
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                Some positions allow multiple votes (check max votes)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                Review your selections before submitting
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">⚠</span>
                                Once submitted, you cannot change your vote
                            </li>
                        </ul>
                    </div>

                    {/* Positions and Candidates */}
                    {positions.map((position) => {
                        const selectedCount =
                            selectedVotes[position.position_id]?.length || 0;
                        const maxVotes = position.max_vote;

                        return (
                            <div
                                key={position.position_id}
                                className="bg-white rounded-lg shadow-md p-6 mb-6"
                            >
                                <div className="border-b pb-4 mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {position.description}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Select{' '}
                                        {maxVotes > 1 ? (
                                            <span className="font-semibold">
                                                up to {maxVotes} candidates
                                            </span>
                                        ) : (
                                            <span className="font-semibold">
                                                one candidate
                                            </span>
                                        )}
                                    </p>
                                    {selectedCount > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {selectedCount} of {maxVotes} selected
                                        </p>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {position.candidates.map((candidate) => {
                                        const isSelected = selectedVotes[
                                            position.position_id
                                        ]?.includes(candidate.id);
                                        const isDisabled =
                                            selectedCount >= maxVotes && !isSelected;

                                        return (
                                            <label
                                                key={candidate.id}
                                                className={`relative block cursor-pointer group ${
                                                    isDisabled
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    disabled={isDisabled}
                                                    onChange={(e) =>
                                                        handleVoteChange(
                                                            position.position_id,
                                                            candidate.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div
                                                    className={`border-2 rounded-lg p-4 transition ${
                                                        isSelected
                                                            ? 'border-green-600 bg-green-50'
                                                            : 'border-gray-200'
                                                    } hover:border-gray-400`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        {/* Candidate Photo */}
                                                        {candidate.photo ? (
                                                            <img
                                                                src={`/storage/${candidate.photo}`}
                                                                alt={candidate.fullname}
                                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                                                                {candidate.firstname.charAt(0)}
                                                                {candidate.lastname.charAt(0)}
                                                            </div>
                                                        )}

                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-800">
                                                                {candidate.fullname}
                                                            </h4>
                                                            {candidate.partylist ? (
                                                                <p className="text-sm text-green-600 font-medium">
                                                                    {candidate.partylist.name}
                                                                </p>
                                                            ) : (
                                                                <p className="text-sm text-gray-500 italic">
                                                                    Independent
                                                                </p>
                                                            )}
                                                            {candidate.platform && (
                                                                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                                                    {candidate.platform}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Checkmark Icon */}
                                                        {isSelected && (
                                                            <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                                                <CircleCheck className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}

                                    {position.candidates.length === 0 && (
                                        <div className="col-span-2 text-center py-8 text-gray-500">
                                            No candidates available for this position
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Submit Button */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-bold"
                        >
                            Review My Selections
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Review your selections before final submission
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
