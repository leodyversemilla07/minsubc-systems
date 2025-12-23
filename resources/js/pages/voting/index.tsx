import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import voting from '@/routes/voting';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Menu,
    Users,
    Vote,
} from 'lucide-react';
import { useState } from 'react';

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface IndexPageProps {
    activeElection?: Election;
}

export default function Index({ activeElection }: IndexPageProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-100 bg-white/80 backdrop-blur-md dark:border-green-900 dark:bg-gray-950/80">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
                    <div className="flex items-center gap-3">
                        <img
                            src="/votesys-logo.png"
                            alt="VoteSys Logo"
                            className="h-12 w-auto"
                        />
                        <span className="hidden text-xl font-bold text-gray-900 sm:block dark:text-gray-100">
                            VoteSys
                        </span>
                    </div>

                    {/* Active Election - Centered */}
                    {activeElection && (
                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 md:px-4 md:py-1.5 dark:border-green-800 dark:bg-green-900/30">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 md:h-2 md:w-2" />
                            <span className="max-w-[140px] truncate text-xs font-medium text-green-700 md:max-w-none md:text-sm dark:text-green-300">
                                {activeElection.name}
                            </span>
                        </div>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-4 sm:flex">
                        {activeElection && (
                            <Link
                                href={voting.results.url({
                                    election: activeElection.id,
                                })}
                            >
                                <Button
                                    variant="ghost"
                                    className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Results
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.login.url()}>
                            <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                                <Vote className="mr-2 h-4 w-4" />
                                Cast Vote
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex sm:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="border-l border-green-100 bg-white/95 p-6 backdrop-blur-md dark:border-green-900 dark:bg-gray-950/95">
                                <div className="mt-8 flex flex-col gap-4">
                                    {activeElection && (
                                        <Link
                                            href={voting.results.url({
                                                election: activeElection.id,
                                            })}
                                            className="w-full"
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-200 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                                            >
                                                <BarChart3 className="mr-3 h-5 w-5" />
                                                View Results
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href={voting.login.url()} className="w-full pt-4">
                                        <Button className="w-full bg-green-600 py-6 text-lg text-white shadow-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                                            <Vote className="mr-2 h-5 w-5" />
                                            Cast Vote
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            {/* Main Content - Centered */}
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center pt-16">
                <div className="container mx-auto px-4 py-12">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-gray-100">
                            How It Works
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                            Simple, secure, and straightforward voting process
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
                            {[
                                {
                                    step: 1,
                                    icon: Users,
                                    title: 'Login',
                                    desc: 'Access with your school ID and password',
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
                                <div key={item.step} className="group text-center">
                                    <div className="relative mb-6 inline-block">
                                        <div className="mx-auto flex h-24 w-24 transform items-center justify-center rounded-3xl bg-green-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl dark:bg-green-500">
                                            <item.icon className="h-12 w-12 text-white" />
                                        </div>
                                        <div className="absolute -top-3 -right-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white shadow-lg ring-4 ring-white dark:bg-green-500 dark:ring-gray-950">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
