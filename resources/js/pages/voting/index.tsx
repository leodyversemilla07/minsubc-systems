import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import voting from '@/routes/voting';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Shield,
    TrendingUp,
    Users,
    Vote,
    Zap,
} from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <img
                            src="/votesys-logo.png"
                            alt="VoteSys Logo"
                            className="h-24 w-auto"
                        />
                    </div>

                    {/* Badge */}
                    <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                        <CheckCircle2 className="h-4 w-4" />
                        Secure • Transparent • Reliable
                    </div>

                    <h1 className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-5xl leading-tight font-bold text-transparent lg:text-6xl dark:from-green-400 dark:to-emerald-400">
                        Electronic Voting System
                    </h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 lg:text-2xl dark:text-gray-300">
                        Participate in democratic decision-making with our
                        secure, transparent, and efficient digital voting
                        platform
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={voting.login.url()}>
                            <Button className="transform rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-lg text-white shadow-xl transition-all hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-2xl dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600">
                                <Vote className="mr-2 h-5 w-5" />
                                Cast Your Vote
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        {activeElection && (
                            <Link
                                href={voting.results.url({
                                    election: activeElection.id,
                                })}
                            >
                                <Button
                                    variant="outline"
                                    className="rounded-xl border-2 border-green-600 px-8 py-6 text-lg text-green-600 shadow-lg hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950"
                                >
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    View Results
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Active Election Notice */}
                    {activeElection && (
                        <Card className="mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg dark:border-green-800 dark:from-green-950 dark:to-emerald-950">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 dark:bg-green-400" />
                                    <p className="font-semibold text-green-700 dark:text-green-300">
                                        <span className="text-green-900 dark:text-green-100">
                                            Active Election:
                                        </span>{' '}
                                        {activeElection.name}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto bg-white/50 px-4 py-16 backdrop-blur-sm dark:bg-gray-900/50">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-gray-100">
                        Why Choose Our Voting System?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Built with cutting-edge technology to ensure your vote
                        counts
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="transform rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg dark:from-green-500 dark:to-emerald-500">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Secure & Private
                        </h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            Military-grade encryption and authentication ensure
                            your vote is protected and anonymous
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                                End-to-end encryption
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                                Anonymous voting
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                                Secure authentication
                            </li>
                        </ul>
                    </div>

                    <div className="transform rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg dark:from-blue-500 dark:to-blue-500">
                            <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Fast & Efficient
                        </h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            Real-time vote counting and instant results when the
                            election concludes
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                                Instant vote submission
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                                Real-time counting
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                                Immediate results
                            </li>
                        </ul>
                    </div>

                    <div className="transform rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg dark:from-purple-500 dark:to-purple-500">
                            <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Transparent & Verifiable
                        </h3>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            Complete audit trail and verifiable results for all
                            stakeholders
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                                Full audit trail
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                                Public results
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                                Verifiable votes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-gray-100">
                        How It Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Simple, secure, and straightforward voting process
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        {[
                            {
                                step: 1,
                                icon: Users,
                                title: 'Login',
                                desc: 'Access with your voter ID and password',
                            },
                            {
                                step: 2,
                                icon: Vote,
                                title: 'Vote',
                                desc: 'Select your preferred candidates',
                            },
                            {
                                step: 3,
                                icon: CheckCircle2,
                                title: 'Review',
                                desc: 'Confirm your selections',
                            },
                            {
                                step: 4,
                                icon: BarChart3,
                                title: 'Results',
                                desc: 'View results after election closes',
                            },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="relative mb-4">
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-xl dark:from-green-500 dark:to-emerald-500">
                                        <item.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow-lg dark:bg-green-500">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-12 text-center text-white shadow-2xl dark:from-green-500 dark:to-emerald-500">
                    <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                        Ready to Make Your Voice Heard?
                    </h2>
                    <p className="mb-8 text-xl opacity-90">
                        Join thousands of voters in shaping the future
                    </p>
                    <Link href={voting.login.url()}>
                        <Button className="transform rounded-xl bg-white px-10 py-6 text-lg font-bold text-green-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100 dark:text-green-700 dark:hover:bg-gray-200">
                            Start Voting Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
