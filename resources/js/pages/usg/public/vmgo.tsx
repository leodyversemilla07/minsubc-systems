import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Eye, Heart, Sparkles, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VMGO {
    id: number;
    vision: string;
    mission: string;
    goals: string[];
    objectives: string[];
    effective_date: string;
    updated_by?: {
        first_name: string;
        last_name: string;
    };
}

interface Props {
    vmgo: VMGO | null;
}

export default function VMGOPage({ vmgo }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setActiveSection((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    if (!vmgo) {
        return (
            <PublicLayout>
                <Head title="Vision, Mission, Goals & Objectives - USG" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="flex min-h-screen items-center justify-center">
                            <div className="transform text-center transition-all duration-1000 hover:scale-105">
                                <div className="mb-6 animate-bounce">
                                    <Sparkles className="mx-auto h-16 w-16 text-blue-500" />
                                </div>
                                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-3xl font-bold text-transparent">
                                    VMGO Information Not Available
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    The Vision, Mission, Goals, and Objectives
                                    information is currently being updated.
                                    Please check back later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Vision, Mission, Goals & Objectives - USG" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-green-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-purple-400/10"></div>
                </div>

                <div className="relative mx-auto max-w-6xl px-4 pb-8">
                    {/* Animated Header */}
                    <div
                        className={`mb-12 transform text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        <div className="mb-6">
                            <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-4">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                            Vision, Mission, Goals & Objectives
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                            Our guiding principles and strategic direction for
                            serving the MinSUBC community with excellence and
                            integrity
                        </p>
                    </div>

                    <div className="grid gap-8 lg:gap-12">
                        {/* Vision */}
                        <Card
                            className={`group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${activeSection === 0 ? 'shadow-lg ring-2 ring-blue-500' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                <CardTitle className="flex items-center text-xl">
                                    <div className="mr-4 rounded-full bg-white/20 p-2 transition-transform duration-300 group-hover:rotate-12">
                                        <Eye className="h-6 w-6" />
                                    </div>
                                    Our Vision
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="relative">
                                    <div className="absolute top-0 -left-2 h-full w-1 rounded bg-gradient-to-b from-blue-500 to-transparent"></div>
                                    <p className="pl-4 text-lg leading-relaxed transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                        {vmgo.vision}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mission */}
                        <Card
                            className={`group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${activeSection === 1 ? 'shadow-lg ring-2 ring-green-500' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                                <CardTitle className="flex items-center text-xl">
                                    <div className="mr-4 rounded-full bg-white/20 p-2 transition-transform duration-300 group-hover:rotate-12">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    Our Mission
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="relative">
                                    <div className="absolute top-0 -left-2 h-full w-1 rounded bg-gradient-to-b from-green-500 to-transparent"></div>
                                    <p className="pl-4 text-lg leading-relaxed transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300">
                                        {vmgo.mission}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Goals */}
                        <Card
                            className={`group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${activeSection === 2 ? 'shadow-lg ring-2 ring-purple-500' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                                <CardTitle className="flex items-center text-xl">
                                    <div className="mr-4 rounded-full bg-white/20 p-2 transition-transform duration-300 group-hover:rotate-12">
                                        <Heart className="h-6 w-6" />
                                    </div>
                                    Our Goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {vmgo.goals.map((goal, index) => (
                                        <div
                                            key={index}
                                            className={`flex transform items-start space-x-4 transition-all duration-500 hover:scale-102 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                                            style={{
                                                transitionDelay: `${800 + index * 100}ms`,
                                            }}
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-purple-200 transition-transform duration-300 group-hover:scale-110 dark:from-purple-900 dark:to-purple-800">
                                                <span className="text-sm font-bold text-purple-600 dark:text-purple-300">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <p className="flex-1 text-lg leading-relaxed transition-colors duration-300 hover:text-purple-700 dark:hover:text-purple-300">
                                                {goal}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Objectives */}
                        <Card
                            className={`group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${activeSection === 3 ? 'shadow-lg ring-2 ring-orange-500' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '800ms' }}
                        >
                            <CardHeader className="rounded-t-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                <CardTitle className="flex items-center text-xl">
                                    <div className="mr-4 rounded-full bg-white/20 p-2 transition-transform duration-300 group-hover:rotate-12">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                    Our Objectives
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid gap-6">
                                    {vmgo.objectives.map((objective, index) => (
                                        <div
                                            key={index}
                                            className={`flex transform items-start space-x-4 rounded-xl border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-transparent p-4 transition-all duration-500 hover:scale-102 hover:shadow-md dark:from-orange-900/20 dark:to-transparent ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                            style={{
                                                transitionDelay: `${1000 + index * 100}ms`,
                                            }}
                                        >
                                            <div className="mt-1">
                                                <CheckCircle className="h-6 w-6 text-orange-600 transition-transform duration-300 hover:scale-110" />
                                            </div>
                                            <p className="flex-1 leading-relaxed transition-colors duration-300 hover:text-orange-700 dark:hover:text-orange-300">
                                                {objective}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card
                            className={`transform bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-500 hover:scale-105 dark:from-gray-800 dark:to-gray-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '1000ms' }}
                        >
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                                        <span>
                                            Effective Date:{' '}
                                            <span className="font-medium text-foreground">
                                                {new Date(
                                                    vmgo.effective_date,
                                                ).toLocaleDateString()}
                                            </span>
                                        </span>
                                    </div>
                                    {vmgo.updated_by && (
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                            <span>
                                                Last updated by:{' '}
                                                <span className="font-medium text-foreground">
                                                    {vmgo.updated_by.first_name}{' '}
                                                    {vmgo.updated_by.last_name}
                                                </span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Call to Action */}
                        <div
                            className={`transform py-12 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '1200ms' }}
                        >
                            <div className="mb-6 inline-flex items-center justify-center">
                                <Sparkles className="mr-3 h-8 w-8 animate-pulse text-yellow-500" />
                                <h2 className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-3xl font-bold text-transparent">
                                    Want to get involved?
                                </h2>
                                <Sparkles className="ml-3 h-8 w-8 animate-pulse text-yellow-500" />
                            </div>
                            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                                Join us in our mission to serve the MinSUBC
                                community with dedication and excellence.
                                Explore our upcoming events, read our latest
                                announcements, and learn more about our
                                dedicated officers who work tirelessly for
                                student welfare.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Button
                                    asChild
                                    className="group transform bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700"
                                >
                                    <Link
                                        href="/usg/events"
                                        className="flex items-center gap-2"
                                    >
                                        <Target className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                        View Events
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="group transform transition-all duration-300 hover:scale-105 hover:border-green-500 hover:text-green-600"
                                >
                                    <Link
                                        href="/usg/officers"
                                        className="flex items-center gap-2"
                                    >
                                        <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                        Meet Our Team
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="group transform transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:text-purple-600"
                                >
                                    <Link
                                        href="/usg/announcements"
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                        Latest News
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
