import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { SecurityBadge } from '@/components/voting/security-badge';
import { VoteReceipt } from '@/components/voting/vote-receipt';
import voting from '@/routes/voting';
import { Link } from '@inertiajs/react';
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
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-white px-4 py-12 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="w-full max-w-3xl">
                {/* Success Animation Container */}
                <div className="mb-8 text-center">
                    <div className="inline-block">
                        {/* Animated Success Icon */}
                        <div className="relative">
                            <div className="animate-bounce-slow mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-2xl dark:from-green-500 dark:to-emerald-500">
                                <CircleCheck
                                    className="h-16 w-16 text-white"
                                    strokeWidth={2.5}
                                />
                            </div>
                            {/* Ripple Effect */}
                            <div className="absolute inset-0 mx-auto h-32 w-32 animate-ping rounded-full bg-green-400 opacity-20 dark:bg-green-500" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="mt-8 mb-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Vote Submitted Successfully!
                    </h1>
                    <p className="mx-auto max-w-md text-lg text-gray-600 dark:text-gray-300">
                        Thank you for participating in the democratic process.
                        Your vote has been securely recorded and encrypted.
                    </p>
                </div>

                {/* Security Confirmation */}
                <div className="mb-6">
                    <SecurityBadge message="Your vote has been encrypted and securely stored. You have been automatically logged out for security." />
                </div>

                {/* Vote Receipt */}
                {votes.length > 0 && election && (
                    <div className="mb-6">
                        <VoteReceipt
                            votes={votes}
                            electionName={election.name}
                            timestamp={timestamp}
                            referenceId={referenceId}
                        />
                    </div>
                )}

                {/* Quick Stats */}
                <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-900 dark:from-green-950 dark:to-emerald-950">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3">
                            <div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    {votes.length}
                                </div>
                                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                    Positions Voted
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    ✓
                                </div>
                                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                    Encrypted
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    100%
                                </div>
                                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                    Secure
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Notice */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        What happens next?
                    </h3>
                    <div className="space-y-2">
                        <Item
                            variant="outline"
                            className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-gray-900 dark:text-gray-100">
                                    Vote Counted
                                </ItemTitle>
                                <ItemDescription className="text-gray-600 dark:text-gray-400">
                                    Your vote is now part of the official count
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-gray-900 dark:text-gray-100">
                                    Secure Logout
                                </ItemTitle>
                                <ItemDescription className="text-gray-600 dark:text-gray-400">
                                    You have been automatically logged out for
                                    security
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-gray-900 dark:text-gray-100">
                                    Results Pending
                                </ItemTitle>
                                <ItemDescription className="text-gray-600 dark:text-gray-400">
                                    Results will be available after the election
                                    closes
                                </ItemDescription>
                            </ItemContent>
                        </Item>

                        <Item
                            variant="outline"
                            className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/50"
                        >
                            <ItemMedia>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                    <FileCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="text-gray-900 dark:text-gray-100">
                                    Reference ID
                                </ItemTitle>
                                <ItemDescription className="text-gray-600 dark:text-gray-400">
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
                            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600">
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
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Share Your Feedback
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Questions or concerns?{' '}
                        <a
                            href="mailto:support@example.com"
                            className="font-medium text-green-600 hover:underline dark:text-green-400"
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
