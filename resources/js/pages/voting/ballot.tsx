import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HelpTooltip } from '@/components/voting/help-tooltip';
import { PositionNavigator } from '@/components/voting/position-navigator';
import { SecurityBadge } from '@/components/voting/security-badge';
import { VotingProgress } from '@/components/voting/voting-progress';
import voting from '@/routes/voting';
import { router } from '@inertiajs/react';
import {
    CircleAlert,
    CircleCheck,
    Clock,
    Eye,
    Info,
    Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
    // Load draft from localStorage on mount
    const loadDraft = () => {
        try {
            const draftKey = `voting_draft_${election.id}`;
            const savedDraft = localStorage.getItem(draftKey);
            if (savedDraft) {
                return JSON.parse(savedDraft);
            }
        } catch (error) {
            console.error('Failed to load draft:', error);
        }
        return {};
    };

    const [selectedVotes, setSelectedVotes] = useState<
        Record<number, number[]>
    >(loadDraft);
    const [selectedCandidate, setSelectedCandidate] =
        useState<Candidate | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    // Save draft to localStorage whenever selections change
    useEffect(() => {
        try {
            const draftKey = `voting_draft_${election.id}`;
            localStorage.setItem(draftKey, JSON.stringify(selectedVotes));
        } catch (error) {
            console.error('Failed to save draft:', error);
        }
    }, [selectedVotes, election.id]);

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

    const handleVoteChange = (
        positionId: number,
        candidateId: number,
        checked: boolean,
    ) => {
        setSelectedVotes((prev) => {
            const currentVotes = prev[positionId] || [];
            if (checked) {
                return {
                    ...prev,
                    [positionId]: [...currentVotes, candidateId],
                };
            } else {
                return {
                    ...prev,
                    [positionId]: currentVotes.filter(
                        (id) => id !== candidateId,
                    ),
                };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with votes:', selectedVotes);
        router.post(voting.preview.url(), { votes: selectedVotes });
    };

    const handleLogout = () => {
        router.post(voting.logout.url());
    };

    // Calculate overall progress
    const totalPositions = positions.length;
    const completedPositions = Object.keys(selectedVotes).filter(
        (key) => selectedVotes[parseInt(key)].length > 0,
    ).length;
    const progressPercentage =
        totalPositions > 0 ? (completedPositions / totalPositions) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-950 dark:to-green-950/30">
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
                                <div className="mt-1 flex items-center gap-4">
                                    <p className="text-sm opacity-90">
                                        Cast Your Vote
                                    </p>
                                    {timeRemaining && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs dark:bg-white/10">
                                            <Clock className="h-3 w-3" />
                                            {timeRemaining}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="bg-white/20 text-white hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                        >
                            Logout
                        </Button>
                    </div>

                    {/* Voting Progress Indicator - Centered */}
                    <div className="mt-8 flex justify-center">
                        <VotingProgress currentStep={2} />
                    </div>
                </div>
            </div>

            {/* Ballot Form */}
            <div className="container mx-auto max-w-5xl px-4 py-8">
                <form onSubmit={handleSubmit}>
                    {/* Security Badge */}
                    <div className="mb-6">
                        <SecurityBadge />
                    </div>

                    {/* Voting Instructions */}
                    <div className="mb-6 space-y-4">
                        <Alert className="bg-white dark:bg-gray-900">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Voting Instructions</AlertTitle>
                            <AlertDescription>
                                <ol className="mt-2 space-y-2 text-sm">
                                    <li className="flex gap-2">
                                        <span className="font-semibold text-green-600 dark:text-green-500">
                                            1.
                                        </span>
                                        <span>
                                            Review all candidates carefully before making your selection
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold text-green-600 dark:text-green-500">
                                            2.
                                        </span>
                                        <span>
                                            Click "View Details" to see full candidate information
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold text-green-600 dark:text-green-500">
                                            3.
                                        </span>
                                        <span>
                                            Some positions allow multiple votes - check the maximum
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold text-green-600 dark:text-green-500">
                                            4.
                                        </span>
                                        <span>
                                            Review your selections before final submission
                                        </span>
                                    </li>
                                </ol>
                            </AlertDescription>
                        </Alert>

                        <Alert variant="destructive" className="bg-white dark:bg-gray-900">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Important Notice</AlertTitle>
                            <AlertDescription>
                                Once submitted, you cannot change your vote. Please review carefully.
                            </AlertDescription>
                        </Alert>
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
                                className={`mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all dark:border-gray-800 dark:bg-gray-900 ${isComplete
                                    ? 'ring-opacity-50 ring-2 ring-green-500 dark:ring-green-600'
                                    : ''
                                    }`}
                                role="region"
                                aria-labelledby={`position-${position.position_id}`}
                            >
                                <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                id={`position-${position.position_id}`}
                                                className="text-xl font-bold text-gray-800 dark:text-gray-100"
                                            >
                                                {position.description}
                                                {isComplete && (
                                                    <CircleCheck className="ml-2 inline-block h-5 w-5 text-green-600 dark:text-green-500" />
                                                )}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Select{' '}
                                                    {maxVotes > 1 ? (
                                                        <span className="font-semibold text-green-700 dark:text-green-500">
                                                            up to {maxVotes}{' '}
                                                            candidates
                                                        </span>
                                                    ) : (
                                                        <span className="font-semibold text-green-700 dark:text-green-500">
                                                            one candidate
                                                        </span>
                                                    )}
                                                </p>
                                                <HelpTooltip
                                                    content={`You can select up to ${maxVotes} candidate${maxVotes > 1 ? 's' : ''} for this position. Click on a candidate card to select them.`}
                                                />
                                            </div>
                                            {selectedCount > 0 && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                                        <div
                                                            className="h-full bg-green-600 transition-all duration-300 dark:bg-green-500"
                                                            style={{
                                                                width: `${(selectedCount / maxVotes) * 100}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="min-w-[60px] text-right text-xs font-semibold text-gray-600 dark:text-gray-300">
                                                        {selectedCount} /{' '}
                                                        {maxVotes}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {position.candidates.map((candidate) => {
                                        const isSelected = selectedVotes[
                                            position.position_id
                                        ]?.includes(candidate.id);
                                        const isDisabled =
                                            selectedCount >= maxVotes &&
                                            !isSelected;

                                        return (
                                            <div
                                                key={candidate.id}
                                                className="relative"
                                            >
                                                <label
                                                    className={`group relative block cursor-pointer ${isDisabled
                                                        ? 'cursor-not-allowed opacity-50'
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
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="peer sr-only"
                                                        aria-label={`Select ${candidate.fullname} for ${position.description}`}
                                                    />
                                                    <Card
                                                        className={`border-2 bg-white transition-all dark:bg-gray-900 ${isSelected
                                                            ? 'scale-[1.02] border-green-600 bg-green-50 shadow-lg dark:border-green-500 dark:bg-green-950'
                                                            : 'border-gray-200 hover:border-green-300 hover:shadow-md dark:border-gray-700 dark:hover:border-green-700'
                                                            } ${!isDisabled && 'hover:scale-[1.01]'}`}
                                                    >
                                                        <CardContent className="p-4">
                                                            <div className="flex items-start gap-4">
                                                                {/* Candidate Photo */}
                                                                {candidate.photo ? (
                                                                    <img
                                                                        src={`/storage/${candidate.photo}`}
                                                                        alt={
                                                                            candidate.fullname
                                                                        }
                                                                        className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover shadow-sm dark:border-gray-600"
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xl font-bold text-white shadow-sm dark:from-green-500 dark:to-green-700">
                                                                        {candidate.firstname.charAt(
                                                                            0,
                                                                        )}
                                                                        {candidate.lastname.charAt(
                                                                            0,
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <div className="min-w-0 flex-1">
                                                                    <h4 className="truncate font-bold text-gray-800 dark:text-gray-100">
                                                                        {
                                                                            candidate.fullname
                                                                        }
                                                                    </h4>
                                                                    {candidate.partylist ? (
                                                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                                            {
                                                                                candidate
                                                                                    .partylist
                                                                                    .name
                                                                            }
                                                                        </p>
                                                                    ) : (
                                                                        <p className="text-sm italic text-gray-500 dark:text-gray-400">
                                                                            Independent
                                                                        </p>
                                                                    )}
                                                                    {candidate.platform && (
                                                                        <p className="mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
                                                                            {
                                                                                candidate.platform
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                {/* Checkmark Icon */}
                                                                {isSelected && (
                                                                    <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white shadow-md dark:bg-green-500">
                                                                        <CircleCheck className="h-4 w-4" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CardContent>

                                                        {/* View Details Button */}
                                                        {candidate.platform && (
                                                            <CardFooter className="border-t p-3">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setSelectedCandidate(
                                                                            candidate,
                                                                        );
                                                                    }}
                                                                    className="h-9 w-full text-sm"
                                                                >
                                                                    <Eye className="mr-1 h-3 w-3" />
                                                                    View Full Details
                                                                </Button>
                                                            </CardFooter>
                                                        )}
                                                    </Card>
                                                </label>
                                            </div>
                                        );
                                    })}

                                    {position.candidates.length === 0 && (
                                        <div className="col-span-2 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No candidates available for this
                                            position
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Submit Button */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-lg font-bold shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
                            disabled={completedPositions === 0}
                        >
                            <CircleCheck className="mr-2 h-5 w-5" />
                            Review My Selections ({completedPositions} position
                            {completedPositions !== 1 ? 's' : ''})
                        </Button>
                        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            {completedPositions === 0 ? (
                                <span className="flex items-center justify-center gap-2">
                                    <CircleAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                    Please select at least one candidate to
                                    continue
                                </span>
                            ) : (
                                'You can review and modify your selections before final submission'
                            )}
                        </p>
                    </div>
                </form>
            </div>

            {/* Candidate Details Dialog */}
            <Dialog
                open={!!selectedCandidate}
                onOpenChange={() => setSelectedCandidate(null)}
            >
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto bg-white dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-gray-900 dark:text-gray-100">
                            Candidate Information
                        </DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                            Review the complete profile and platform
                        </DialogDescription>
                    </DialogHeader>
                    {selectedCandidate && (
                        <div className="space-y-6">
                            {/* Candidate Header */}
                            <div className="flex items-start gap-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                                {selectedCandidate.photo ? (
                                    <img
                                        src={`/storage/${selectedCandidate.photo}`}
                                        alt={selectedCandidate.fullname}
                                        className="h-32 w-32 rounded-lg border-2 border-gray-200 object-cover shadow-md dark:border-gray-600"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 text-4xl font-bold text-white shadow-md dark:from-green-500 dark:to-green-700">
                                        {selectedCandidate.firstname.charAt(0)}
                                        {selectedCandidate.lastname.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {selectedCandidate.fullname}
                                    </h3>
                                    {selectedCandidate.partylist ? (
                                        <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                                            {selectedCandidate.partylist.name}
                                        </p>
                                    ) : (
                                        <p className="mt-1 text-lg text-gray-500 italic dark:text-gray-400">
                                            Independent Candidate
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Platform */}
                            {selectedCandidate.platform && (
                                <div>
                                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <Shield className="h-5 w-5 text-green-600 dark:text-green-500" />
                                        Platform & Advocacy
                                    </h4>
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                            {selectedCandidate.platform}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
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

            {/* Position Navigator */}
            <PositionNavigator
                positions={positions}
                selectedVotes={selectedVotes}
                onNavigate={() => { }}
            />
        </div>
    );
}
