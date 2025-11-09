import { Link } from '@inertiajs/react';
import { CircleCheck, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import voting from '@/routes/voting';
import { VoteReceipt } from '@/components/voting/vote-receipt';
import { SecurityBadge } from '@/components/voting/security-badge';
import { Card, CardContent } from '@/components/ui/card';

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
}

export default function Confirmation({ 
    votes = [], 
    election,
    referenceId = `REF-${Date.now().toString(36).toUpperCase()}`,
    timestamp = new Date().toISOString()
}: ConfirmationPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full">
                {/* Success Animation Container */}
                <div className="text-center mb-8">
                    <div className="inline-block">
                        {/* Animated Success Icon */}
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                                <CircleCheck className="w-16 h-16 text-white" strokeWidth={2.5} />
                            </div>
                            {/* Ripple Effect */}
                            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full mx-auto animate-ping opacity-20" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-3">
                        Vote Submitted Successfully!
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Thank you for participating in the democratic process. Your vote has been
                        securely recorded and encrypted.
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
                <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-green-600">
                                    {votes.length}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">Positions Voted</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600">✓</div>
                                <div className="text-xs text-gray-600 mt-1">Encrypted</div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-green-600">100%</div>
                                <div className="text-xs text-gray-600 mt-1">Secure</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Notice */}
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <div className="text-sm text-blue-800">
                        <strong className="block mb-1">📋 What happens next?</strong>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Your vote is now part of the official count</li>
                            <li>You have been automatically logged out for security</li>
                            <li>Results will be available after the election closes</li>
                            <li>Keep your reference ID for verification purposes</li>
                        </ul>
                    </div>
                </Alert>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {election && (
                        <Link href={voting.results.url({ election: election.id })}>
                            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                View Election Results
                            </Button>
                        </Link>
                    )}
                    <Link href={voting.index.url()}>
                        <Button variant="outline" className="w-full border-2">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Questions or concerns?{' '}
                        <a href="mailto:support@example.com" className="text-green-600 hover:underline font-medium">
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
