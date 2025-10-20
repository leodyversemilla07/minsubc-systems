import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
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
        <>
            <Head title={`Search: ${query || 'USG'}`} />

            <div className="min-h-screen bg-background py-12">
                <div className="container mx-auto max-w-5xl px-4">
                    {/* Search Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            Search USG Content
                        </h1>
                        <p className="text-muted-foreground">
                            Search through announcements, events, and more from
                            the University Student Government
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-8">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search announcements..."
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

                    {/* Results */}
                    {query && (
                        <div className="mb-6">
                            <p className="text-sm text-muted-foreground">
                                {announcements.length} result
                                {announcements.length !== 1 ? 's' : ''} found
                                for "{query}"
                            </p>
                        </div>
                    )}

                    {/* Search Results */}
                    {announcements.length > 0 ? (
                        <div className="space-y-4">
                            {announcements.map((announcement) => (
                                <Card key={announcement.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <CardTitle>
                                                    <TextLink
                                                        href={`/usg/announcements/${announcement.slug}`}
                                                        className="hover:underline"
                                                    >
                                                        {announcement.title}
                                                    </TextLink>
                                                </CardTitle>
                                                <CardDescription>
                                                    {new Date(
                                                        announcement.publish_date,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </CardDescription>
                                            </div>
                                            {announcement.category && (
                                                <Badge variant="secondary">
                                                    {announcement.category}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {announcement.excerpt}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : query ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold">
                                    No results found
                                </h3>
                                <p className="mb-4 text-muted-foreground">
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
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold">
                                    Start searching
                                </h3>
                                <p className="text-muted-foreground">
                                    Enter a search term above to find
                                    announcements and other USG content
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Links */}
                    <div className="mt-12">
                        <h2 className="mb-4 text-xl font-semibold">
                            Quick Links
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        <TextLink href="/usg/announcements">
                                            All Announcements
                                        </TextLink>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        <TextLink href="/usg/events">
                                            All Events
                                        </TextLink>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        <TextLink href="/usg/resolutions">
                                            All Resolutions
                                        </TextLink>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
