import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CircleCheck, Info, Eye, Shield, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import voting from '@/routes/voting';
import { SecurityBadge } from '@/components/voting/security-badge';
import { HelpTooltip } from '@/components/voting/help-tooltip';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

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
    end_time?: string | null;
}

interface BallotPageProps {
    election: Election;
    positions: Position[];
}

export default function Ballot({ election, positions }: BallotPageProps) {
    const [selectedVotes, setSelectedVotes] = useState<Record<number, number[]>>({});
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    // Calculate time remaining if election has end time
    useEffect(() => {
        if (!election.end_time) return;

        const updateTimer = () => {
            const now = new Date();
            const end = new Date(election.end_time!);
            const diff = end.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeRemaining('Election has ended');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeRemaining(`${hours}h ${minutes}m remaining`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [election.end_time]);

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

    // Calculate overall progress
    const totalPositions = positions.length;
    const completedPositions = Object.keys(selectedVotes).filter(
        (key) => selectedVotes[parseInt(key)].length > 0
    ).length;
    const progressPercentage = totalPositions > 0 ? (completedPositions / totalPositions) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">{election.name}</h1>
                            <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm opacity-90">Cast Your Vote</p>
                                {timeRemaining && (
                                    <div className="flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        {timeRemaining}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            Logout
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="opacity-90">Your Progress</span>
                            <span className="font-semibold">
                                {completedPositions} of {totalPositions} positions
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-white/20" />
                    </div>
                </div>
            </div>

            {/* Ballot Form */}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <form onSubmit={handleSubmit}>
                    {/* Security Badge */}
                    <div className="mb-6">
                        <SecurityBadge />
                    </div>

                    {/* Instructions Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-600">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">
                                    Voting Instructions
                                </h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold mt-0.5">1.</span>
                                        <span>Review all candidates carefully before making your selection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold mt-0.5">2.</span>
                                        <span>Click "View Details" to see full candidate information</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold mt-0.5">3.</span>
                                        <span>Some positions allow multiple votes - check the maximum</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold mt-0.5">4.</span>
                                        <span>Review your selections before final submission</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold mt-0.5">⚠</span>
                                        <span className="font-semibold text-red-600">
                                            Once submitted, you cannot change your vote
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Positions and Candidates */}
                    {positions.map((position) => {
                        const selectedCount =
                            selectedVotes[position.position_id]?.length || 0;
                        const maxVotes = position.max_vote;
                        const isComplete = selectedCount > 0;

                        return (
                            <div
                                key={position.position_id}
                                className={`bg-white rounded-lg shadow-md p-6 mb-6 transition-all ${
                                    isComplete ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                                }`}
                                role="region"
                                aria-labelledby={`position-${position.position_id}`}
                            >
                                <div className="border-b pb-4 mb-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                id={`position-${position.position_id}`}
                                                className="text-xl font-bold text-gray-800"
                                            >
                                                {position.description}
                                                {isComplete && (
                                                    <CircleCheck className="inline-block w-5 h-5 ml-2 text-green-600" />
                                                )}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className="text-sm text-gray-600">
                                                    Select{' '}
                                                    {maxVotes > 1 ? (
                                                        <span className="font-semibold text-green-700">
                                                            up to {maxVotes} candidates
                                                        </span>
                                                    ) : (
                                                        <span className="font-semibold text-green-700">
                                                            one candidate
                                                        </span>
                                                    )}
                                                </p>
                                                <HelpTooltip
                                                    content={`You can select up to ${maxVotes} candidate${maxVotes > 1 ? 's' : ''} for this position. Click on a candidate card to select them.`}
                                                />
                                            </div>
                                            {selectedCount > 0 && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="bg-green-600 h-full transition-all duration-300"
                                                            style={{
                                                                width: `${(selectedCount / maxVotes) * 100}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-600 min-w-[60px] text-right">
                                                        {selectedCount} / {maxVotes}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {position.candidates.map((candidate) => {
                                        const isSelected = selectedVotes[
                                            position.position_id
                                        ]?.includes(candidate.id);
                                        const isDisabled =
                                            selectedCount >= maxVotes && !isSelected;

                                        return (
                                            <div key={candidate.id} className="relative">
                                                <label
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
                                                        aria-label={`Select ${candidate.fullname} for ${position.description}`}
                                                    />
                                                    <div
                                                        className={`border-2 rounded-lg p-4 transition-all ${
                                                            isSelected
                                                                ? 'border-green-600 bg-green-50 shadow-lg scale-[1.02]'
                                                                : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                                                        } ${!isDisabled && 'hover:scale-[1.01]'}`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            {/* Candidate Photo */}
                                                            {candidate.photo ? (
                                                                <img
                                                                    src={`/storage/${candidate.photo}`}
                                                                    alt={candidate.fullname}
                                                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                                                                    {candidate.firstname.charAt(0)}
                                                                    {candidate.lastname.charAt(0)}
                                                                </div>
                                                            )}

                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-bold text-gray-800 truncate">
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
                                                                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                                                                    <CircleCheck className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </label>

                                                {/* View Details Button */}
                                                {candidate.platform && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedCandidate(candidate);
                                                        }}
                                                        className="absolute bottom-2 right-2 text-xs h-7 px-2 bg-white/80 hover:bg-white"
                                                    >
                                                        <Eye className="w-3 h-3 mr-1" />
                                                        Details
                                                    </Button>
                                                )}
                                            </div>
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
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-6 text-lg font-bold shadow-lg transition-all hover:shadow-xl"
                            disabled={completedPositions === 0}
                        >
                            <CircleCheck className="w-5 h-5 mr-2" />
                            Review My Selections ({completedPositions} positions)
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            {completedPositions === 0 ? (
                                'Please select at least one candidate to continue'
                            ) : (
                                'You can review and modify your selections before final submission'
                            )}
                        </p>
                    </div>
                </form>
            </div>

            {/* Candidate Details Dialog */}
            <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Candidate Information</DialogTitle>
                        <DialogDescription>
                            Review the complete profile and platform
                        </DialogDescription>
                    </DialogHeader>
                    {selectedCandidate && (
                        <div className="space-y-6">
                            {/* Candidate Header */}
                            <div className="flex items-start gap-6 pb-4 border-b">
                                {selectedCandidate.photo ? (
                                    <img
                                        src={`/storage/${selectedCandidate.photo}`}
                                        alt={selectedCandidate.fullname}
                                        className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200 shadow-md"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                        {selectedCandidate.firstname.charAt(0)}
                                        {selectedCandidate.lastname.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {selectedCandidate.fullname}
                                    </h3>
                                    {selectedCandidate.partylist ? (
                                        <p className="text-lg text-green-600 font-semibold mt-1">
                                            {selectedCandidate.partylist.name}
                                        </p>
                                    ) : (
                                        <p className="text-lg text-gray-500 italic mt-1">
                                            Independent Candidate
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Platform */}
                            {selectedCandidate.platform && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        Platform & Advocacy
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {selectedCandidate.platform}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <Button
                                    onClick={() => setSelectedCandidate(null)}
                                    className="w-full"
                                    variant="outline"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
