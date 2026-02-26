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
    if (!vmgo) {
        return (
            <USGLayout>
                <Head title="Vision, Mission, Goals & Objectives - USG" />
                <div className="bg-white py-32 dark:bg-gray-900">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="text-center">
                            <div className="mb-6 inline-block animate-bounce rounded-full bg-[var(--usg-light)] p-6">
                                <Sparkles className="h-16 w-16 text-[var(--usg-primary)]" />
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
            <section className="relative -mt-28 overflow-hidden bg-gradient-to-br from-green-700 via-green-700 to-green-900 pt-32 pb-20 text-white sm:pt-40 dark:from-green-900 dark:via-green-900 dark:to-black">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                {/* Grid Pattern Background */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-6xl">
                            Vision, Mission, Goals & Objectives
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-green-50 sm:text-xl lg:text-2xl dark:text-gray-200">
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
                        {/* Vision and Mission Row */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Vision */}
                            <div className="h-full rounded-2xl bg-[var(--usg-primary)] p-8 text-white shadow-xl">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="inline-flex rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                        <Eye className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold">
                                        Our Vision
                                    </h3>
                                </div>
                                <p className="text-lg leading-relaxed text-white/90">
                                    {vmgo.vision}
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="h-full rounded-2xl bg-[var(--usg-secondary)] p-8 text-gray-900 shadow-xl">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="inline-flex rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                        <Target className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Our Mission
                                    </h3>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-800">
                                    {vmgo.mission}
                                </p>
                            </div>
                        </div>

                        {/* Goals */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex items-center gap-4 rounded-full bg-[var(--usg-light)] px-6 py-3 dark:bg-gray-800">
                                <div className="inline-flex rounded-full bg-[var(--usg-secondary)] p-2">
                                    <Heart className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Goals
                                </h2>
                            </div>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                                The key objectives we strive to achieve for our
                                community
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {vmgo.goals.map((goal, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg hover:shadow-xl dark:bg-gray-800"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--usg-secondary)] text-white shadow-lg">
                                        <span className="text-lg font-bold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                            {goal}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Objectives */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex items-center gap-4 rounded-full bg-[var(--usg-light)] px-6 py-3 dark:bg-gray-800">
                                <div className="inline-flex rounded-full bg-[var(--usg-accent)] p-2">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                                    Our Objectives
                                </h2>
                            </div>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                                Specific actions and strategies to fulfill our
                                mission
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {vmgo.objectives.map((objective, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg hover:shadow-xl dark:bg-gray-800"
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle className="h-8 w-8 text-[var(--usg-accent)]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                            {objective}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <section className="relative overflow-hidden bg-green-800 py-20 text-white dark:bg-green-900">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mb-6 inline-flex items-center justify-center gap-3">
                        <Sparkles className="h-8 w-8 text-yellow-300" />
                        <h2 className="text-3xl font-bold lg:text-4xl">
                            Want to get involved?
                        </h2>
                        <Sparkles className="h-8 w-8 text-yellow-300" />
                    </div>
                    <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-[var(--usg-hero-text)] dark:text-[var(--usg-light)]">
                        Join us in our mission to serve the MinSUBC community
                        with dedication and excellence. Explore our upcoming
                        events, read our latest announcements, and learn more
                        about our dedicated officers who work tirelessly for
                        student welfare.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[var(--usg-primary)] shadow-xl hover:bg-[var(--usg-light)] hover:shadow-2xl"
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
                            className="border-2 border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-[var(--usg-primary)]"
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
                            className="border-2 border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-[var(--usg-primary)]"
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
            </section>
        </USGLayout>
    );
}
