import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    FileText,
    Megaphone,
    Scale,
    Search,
    Sparkles,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publish_date: string;
}

interface SearchProps {
    query: string;
    announcements: Announcement[];
    categories: string[];
}

export default function USGSearch({ query, announcements }: SearchProps) {
    const [searchQuery, setSearchQuery] = useState(query || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/usg/search', { q: searchQuery });
    };

    return (
        <USGLayout>
            <Head title={`Search: ${query || 'USG'}`} />

            {/* Hero Section */}
            <section className="relative -mt-28 overflow-hidden bg-gradient-to-br from-green-700 via-green-700 to-green-900 pt-32 pb-20 text-white sm:pt-40 dark:from-green-900 dark:via-green-900 dark:to-black">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                {/* Grid Pattern Background */}
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

                <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md">
                            Search USG Content
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-green-50 sm:text-xl lg:text-2xl leading-relaxed dark:text-gray-200">
                            Search through announcements, events,
                            resolutions, and transparency reports from the
                            University Student Government.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Search Form */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-lg bg-gray-600 p-2">
                            <Search className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Search
                        </h2>
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search announcements, events, resolutions..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                            <Button type="submit">Search</Button>
                        </div>
                    </form>
                </div>

                {/* Results Count */}
                {query && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {announcements.length} result
                            {announcements.length !== 1 ? 's' : ''} found for "
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {query}
                            </span>
                            "
                        </p>
                    </div>
                )}

                {/* Search Results */}
                {announcements.length > 0 ? (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            <TextLink
                                                href={`/usg/announcements/${announcement.slug}`}
                                                className="hover:text-orange-600 dark:hover:text-orange-400"
                                            >
                                                {announcement.title}
                                            </TextLink>
                                        </h3>
                                        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(
                                                announcement.publish_date,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
                                            {announcement.excerpt}
                                        </p>
                                    </div>
                                    {announcement.category && (
                                        <Badge className="shrink-0 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                                            {announcement.category}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : query ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                            <Search className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            No results found
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Try searching with different keywords
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                router.get('/usg/search');
                            }}
                        >
                            Clear search
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900">
                            <Sparkles className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Start searching
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter a search term above to find announcements and
                            other USG content
                        </p>
                    </div>
                )}

                {/* Quick Links */}
                <div className="mt-12">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Quick Links
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <TextLink
                            href={usg.announcements.index.url()}
                            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-orange-700"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-900 dark:text-orange-400">
                                <Megaphone className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                All Announcements
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Browse all USG announcements
                            </p>
                        </TextLink>

                        <TextLink
                            href={usg.events.index.url()}
                            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--usg-medium)] hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-[var(--usg-primary)]"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--usg-light)] text-[var(--usg-primary)] transition-colors group-hover:bg-[var(--usg-primary)] group-hover:text-white dark:bg-[var(--usg-dark)] dark:text-[var(--usg-accent)]">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--usg-primary)] dark:text-white dark:group-hover:text-[var(--usg-accent)]">
                                All Events
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                View all upcoming events
                            </p>
                        </TextLink>

                        <TextLink
                            href={usg.resolutions.index.url()}
                            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-blue-700"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900 dark:text-blue-400">
                                <Scale className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                All Resolutions
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Read all official resolutions
                            </p>
                        </TextLink>

                        <TextLink
                            href={usg.transparency.index.url()}
                            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-cyan-700"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-900 dark:text-cyan-400">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                                Transparency Reports
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Access financial reports
                            </p>
                        </TextLink>
                    </div>
                </div>
            </div>
        </USGLayout>
    );
}
