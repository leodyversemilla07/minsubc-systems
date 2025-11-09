import { Link } from '@inertiajs/react';
import voting from '@/routes/voting';

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface IndexPageProps {
    activeElection?: Election;
}

export default function Index({ activeElection }: IndexPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-green-600 mb-6">
                        Electronic Voting System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Secure, transparent, and efficient digital voting platform
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={voting.login.url()}
                            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
                        >
                            Cast Your Vote
                        </Link>
                        {activeElection && (
                            <Link
                                href={voting.results.url({ election: activeElection.id })}
                                className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition shadow-lg"
                            >
                                View Results
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Secure</h3>
                        <p className="text-gray-600">
                            Advanced encryption and authentication ensure your vote is
                            protected
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Fast</h3>
                        <p className="text-gray-600">
                            Real-time vote counting and instant results when election ends
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">
                            Transparent
                        </h3>
                        <p className="text-gray-600">
                            Complete audit trail and verifiable results for all stakeholders
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
