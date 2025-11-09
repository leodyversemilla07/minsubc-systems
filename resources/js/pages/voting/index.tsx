import { Link } from '@inertiajs/react';
import voting from '@/routes/voting';
import { Vote, BarChart3, Shield, Zap, CheckCircle2, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6 animate-pulse">
                        <CheckCircle2 className="w-4 h-4" />
                        Secure • Transparent • Reliable
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 leading-tight">
                        Electronic Voting System
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Participate in democratic decision-making with our secure, transparent, and efficient digital voting platform
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={voting.login.url()}
                        >
                            <Button className="px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                <Vote className="w-5 h-5 mr-2" />
                                Cast Your Vote
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        {activeElection && (
                            <Link
                                href={voting.results.url({ election: activeElection.id })}
                            >
                                <Button variant="outline" className="px-8 py-6 border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg rounded-xl shadow-lg">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    View Results
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Active Election Notice */}
                    {activeElection && (
                        <Card className="mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-green-700 font-semibold">
                                        <span className="text-green-900">Active Election:</span> {activeElection.name}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Our Voting System?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Built with cutting-edge technology to ensure your vote counts
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Military-grade encryption and authentication ensure your vote is protected and anonymous
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                End-to-end encryption
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Anonymous voting
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Secure authentication
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast & Efficient</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Real-time vote counting and instant results when the election concludes
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                Instant vote submission
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                Real-time counting
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                Immediate results
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparent & Verifiable</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Complete audit trail and verifiable results for all stakeholders
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                Full audit trail
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                Public results
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                Verifiable votes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple, secure, and straightforward voting process
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: 1, icon: Users, title: 'Login', desc: 'Access with your voter ID and password' },
                            { step: 2, icon: Vote, title: 'Vote', desc: 'Select your preferred candidates' },
                            { step: 3, icon: CheckCircle2, title: 'Review', desc: 'Confirm your selections' },
                            { step: 4, icon: BarChart3, title: 'Results', desc: 'View results after election closes' },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                        <item.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-12 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Ready to Make Your Voice Heard?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of voters in shaping the future
                    </p>
                    <Link href={voting.login.url()}>
                        <Button className="px-10 py-6 bg-white text-green-600 hover:bg-gray-100 text-lg font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all">
                            Start Voting Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
