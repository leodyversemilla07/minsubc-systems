import { Link } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import voting from '@/routes/voting';

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
}

export default function Confirmation({ votes = [], election }: ConfirmationPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Success Card */}
                <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CircleCheck className="w-12 h-12 text-green-500" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Vote Submitted Successfully!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Thank you for participating in the election. Your vote has been
                        recorded.
                    </p>

                    {/* Vote Summary */}
                    {votes.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
                                Your Selections
                            </h2>
                            <div className="space-y-4">
                                {votes.map((vote, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0"
                                    >
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">
                                                {vote.position}
                                            </div>
                                            <div className="font-semibold text-gray-800">
                                                {vote.candidate}
                                            </div>
                                            {vote.partylist && (
                                                <div className="text-xs text-green-600">
                                                    {vote.partylist}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Info Notice */}
                    <Alert className="mb-6">
                        <div className="text-sm">
                            <strong>Note:</strong> You have been automatically logged out.
                            Your vote is secure and cannot be changed.
                        </div>
                    </Alert>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {election && (
                            <Link href={voting.results.url({ election: election.id })}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    View Election Results
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.index.url()}>
                            <Button variant="outline" className="w-full">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Questions or concerns? Contact the election administrator.</p>
                </div>
            </div>
        </div>
    );
}
