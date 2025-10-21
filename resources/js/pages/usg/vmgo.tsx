import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle,
    Eye,
    Heart,
    Megaphone,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';
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
            <USGLayout>
                <Head title="Vision, Mission, Goals & Objectives - USG" />
                <div className="bg-white py-32 dark:bg-gray-900">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center">
                            <div className="mb-6 inline-block animate-bounce rounded-full bg-blue-100 p-6 dark:bg-blue-900/30">
                                <Sparkles className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                VMGO Information Not Available
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                The Vision, Mission, Goals, and Objectives
                                information is currently being updated. Please
                                check back later.
                            </p>
                        </div>
                    </div>
                </div>
            </USGLayout>
        );
    }

    return (
        <USGLayout>
            <Head title="Vision, Mission, Goals & Objectives - USG" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 text-white dark:from-blue-800 dark:via-blue-900 dark:to-gray-900">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-6 inline-flex animate-pulse items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm">
                            <Target className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                            Vision, Mission, Goals & Objectives
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-blue-100 sm:text-xl">
                            Our guiding principles and strategic direction for
                            serving the MinSUBC community with excellence and
                            integrity
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        {/* Vision */}
                        <div
                            className={`group transform transition-all duration-500 ${activeSection === 0 ? 'scale-105' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="inline-flex rounded-full bg-blue-600 p-4 dark:bg-blue-500">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Vision
                                </h2>
                            </div>
                            <div className="relative rounded-2xl border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent p-8 dark:from-blue-900/20 dark:to-transparent">
                                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                                    {vmgo.vision}
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div
                            className={`group transform transition-all duration-500 ${activeSection === 1 ? 'scale-105' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="inline-flex rounded-full bg-green-600 p-4 dark:bg-green-500">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Mission
                                </h2>
                            </div>
                            <div className="relative rounded-2xl border-l-4 border-green-600 bg-gradient-to-r from-green-50 to-transparent p-8 dark:from-green-900/20 dark:to-transparent">
                                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                                    {vmgo.mission}
                                </p>
                            </div>
                        </div>

                        {/* Goals */}
                        <div
                            className={`group transform transition-all duration-500 ${activeSection === 2 ? 'scale-105' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="inline-flex rounded-full bg-purple-600 p-4 dark:bg-purple-500">
                                    <Heart className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Goals
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {vmgo.goals.map((goal, index) => (
                                    <div
                                        key={index}
                                        className={`flex transform items-start gap-4 rounded-xl border-l-4 border-purple-600 bg-gradient-to-r from-purple-50 to-transparent p-6 transition-all duration-500 hover:shadow-lg dark:from-purple-900/20 dark:to-transparent ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                                        style={{
                                            transitionDelay: `${800 + index * 100}ms`,
                                        }}
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 dark:bg-purple-500">
                                            <span className="text-lg font-bold text-white">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="flex-1 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                            {goal}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Objectives */}
                        <div
                            className={`group transform transition-all duration-500 ${activeSection === 3 ? 'scale-105' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '800ms' }}
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="inline-flex rounded-full bg-orange-600 p-4 dark:bg-orange-500">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Objectives
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {vmgo.objectives.map((objective, index) => (
                                    <div
                                        key={index}
                                        className={`flex transform items-start gap-4 rounded-xl border-l-4 border-orange-600 bg-gradient-to-r from-orange-50 to-transparent p-6 transition-all duration-500 hover:shadow-lg dark:from-orange-900/20 dark:to-transparent ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                        style={{
                                            transitionDelay: `${1000 + index * 100}ms`,
                                        }}
                                    >
                                        <div className="mt-1">
                                            <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <p className="flex-1 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                            {objective}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Metadata */}
                        <div
                            className={`transform rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all duration-500 dark:border-gray-800 dark:bg-gray-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '1000ms' }}
                        >
                            <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                                    <span>
                                        Effective Date:{' '}
                                        <span className="font-medium text-gray-900 dark:text-white">
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
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {vmgo.updated_by.first_name}{' '}
                                                {vmgo.updated_by.last_name}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 py-20 text-white dark:from-green-800 dark:via-green-700 dark:to-emerald-800">
                <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div
                        className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '1200ms' }}
                    >
                        <div className="mb-6 inline-flex items-center justify-center gap-3">
                            <Sparkles className="h-8 w-8 animate-pulse text-yellow-300" />
                            <h2 className="text-3xl font-bold lg:text-4xl">
                                Want to get involved?
                            </h2>
                            <Sparkles className="h-8 w-8 animate-pulse text-yellow-300" />
                        </div>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-green-50 dark:text-green-100">
                            Join us in our mission to serve the MinSUBC
                            community with dedication and excellence. Explore
                            our upcoming events, read our latest announcements,
                            and learn more about our dedicated officers who work
                            tirelessly for student welfare.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-green-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-2xl"
                            >
                                <Link
                                    href={usg.events.index.url()}
                                    className="flex items-center gap-2 px-8 py-4 text-lg font-bold"
                                >
                                    View Events
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-white bg-transparent text-white backdrop-blur-sm transition-all hover:bg-white hover:text-green-700"
                            >
                                <Link
                                    href={usg.officers.index.url()}
                                    className="flex items-center gap-2 px-8 py-4 text-lg font-bold"
                                >
                                    Meet Our Team
                                    <Users className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-white bg-transparent text-white backdrop-blur-sm transition-all hover:bg-white hover:text-green-700"
                            >
                                <Link
                                    href={usg.announcements.index.url()}
                                    className="flex items-center gap-2 px-8 py-4 text-lg font-bold"
                                >
                                    Latest Updates
                                    <Megaphone className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
