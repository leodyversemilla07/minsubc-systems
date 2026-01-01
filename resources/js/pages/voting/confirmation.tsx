import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { PrintReceipt } from '@/components/voting/print-receipt';
import { SecurityBadge } from '@/components/voting/security-badge';
import { VoteReceipt } from '@/components/voting/vote-receipt';
import { VotingProgress } from '@/components/voting/voting-progress';
import voting from '@/routes/voting';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    CheckCircle2,
    CircleCheck,
    Clock,
    Eye,
    FileCheck,
    Home,
    Lock,
    MessageSquare,
} from 'lucide-react';

interface Vote {
    position: string;
    candidate: string;
    partylist?: string;
}

interface Election {
    id: number;
    name: string;
}

interface ConfirmationPageProps {
    votes?: Vote[];
    election?: Election;
    referenceId?: string;
    timestamp?: string;
    feedbackToken?: string;
}

export default function Confirmation({
    votes = [],
    election,
    referenceId = `REF-${Date.now().toString(36).toUpperCase()}`,
    timestamp = new Date().toISOString(),
    feedbackToken,
}: ConfirmationPageProps) {
    // Clear draft from localStorage after successful vote submission
    useEffect(() => {
        if (election?.id) {
            try {
                const draftKey = `voting_draft_${election.id}`;
                localStorage.removeItem(draftKey);
            } catch {
                // Failed to clear draft from storage
            }
        }
    }, [election?.id]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background px-4 py-12">
            <div className="w-full max-w-3xl">
                {/* Success Animation Container */}
                <div className="mb-8 text-center">
                    <div className="inline-block">
                        {/* Animated Success Icon */}
                        <div className="relative">
                            <div className="animate-bounce-slow mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary shadow-2xl">
                                <CircleCheck
                                    className="h-16 w-16 text-primary-foreground"
                                    strokeWidth={2.5}
                                />
                            </div>
                            {/* Ripple Effect */}
                            <div className="absolute inset-0 mx-auto h-32 w-32 animate-ping rounded-full bg-primary opacity-20" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="mt-8 mb-3 text-4xl font-bold text-foreground">
                        Vote Submitted Successfully!
                    </h1>
                    <p className="mx-auto max-w-md text-lg text-muted-foreground">
                        Thank you for participating in the democratic process.
                        Your vote has been securely recorded and encrypted.
                    </p>
                </div>

                {/* Voting Progress Indicator */}
                <VotingProgress currentStep={4} />

                {/* Security Confirmation */}
                <div className="mb-6">
                    <SecurityBadge message="Your vote has been encrypted and securely stored. You have been automatically logged out for security." />
                </div>

                {/* Vote Receipt */}
                {votes.length > 0 && election && (
                    <>
                        <div className="mb-6">
                            <VoteReceipt
                                votes={votes}
                                electionName={election.name}
                                timestamp={timestamp}
                                referenceId={referenceId}
                            />
                        </div>

                        {/* Print Receipt Button */}
                        <div className="mb-6 flex justify-center">
                            <PrintReceipt
                                votes={votes}
                                electionName={election.name}
                                timestamp={timestamp}
                                referenceId={referenceId}
                            />
                        </div>
                    </>
                )}

                {/* Quick Stats */}
                <Card className="mb-6 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3">
                            <div>
                                <div className="text-3xl font-bold text-primary">
                                    {votes.length}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Positions Voted
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">
                                    ✓
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Encrypted
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-primary">
                                    100%
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Secure
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Notice */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <FileCheck className="h-5 w-5 text-info" />
                        What happens next?
                    </h3>
                    <div className="space-y-2">
                        <Item
                            variant="outline"
                            className="border-info/30 bg-info/5"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10">
                                    <CheckCircle2 className="h-5 w-5 text-info" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-foreground">
                                    Vote Counted
                                </ItemTitle>
                                <ItemDescription className="text-muted-foreground">
                                    Your vote is now part of the official count
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-primary/30 bg-primary/5"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-foreground">
                                    Secure Logout
                                </ItemTitle>
                                <ItemDescription className="text-muted-foreground">
                                    You have been automatically logged out for
                                    security
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-warning/30 bg-warning/5"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                                    <Clock className="h-5 w-5 text-warning" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-foreground">
                                    Results Pending
                                </ItemTitle>
                                <ItemDescription className="text-muted-foreground">
                                    Results will be available after the election
                                    closes
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-accent/30 bg-accent/5"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                                    <FileCheck className="h-5 w-5 text-accent-foreground" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-foreground">
                                    Reference ID
                                </ItemTitle>
                                <ItemDescription className="text-muted-foreground">
                                    Keep your reference ID for verification
                                    purposes
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    </div>
                </div>

                {/* Action Buttons */}
                <div
                    className={
                        election
                            ? 'mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2'
                            : 'mb-4 flex justify-center'
                    }
                >
                    {election && (
                        <Link
                            href={voting.results.url({ election: election.id })}
                        >
                            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:from-primary/90 hover:to-primary/70">
                                <Eye className="mr-2 h-4 w-4" />
                                View Election Results
                            </Button>
                        </Link>
                    )}
                    <Link href={voting.index.url()}>
                        <Button
                            variant="outline"
                            className={
                                election
                                    ? 'w-full border-2'
                                    : 'border-2 px-8 py-6 text-lg'
                            }
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Feedback Button */}
                {feedbackToken && (
                    <div className="flex justify-center">
                        <Link
                            href={
                                voting.feedback.create.url() +
                                `?token=${feedbackToken}`
                            }
                        >
                            <Button className="bg-gradient-to-r from-info to-info/80 px-8 py-6 text-lg shadow-lg hover:from-info/90 hover:to-info/70">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Share Your Feedback
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Questions or concerns?{' '}
                        <a
                            href="mailto:support@example.com"
                            className="font-medium text-primary hover:underline"
                        >
                            Contact the election administrator
                        </a>
                    </p>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
