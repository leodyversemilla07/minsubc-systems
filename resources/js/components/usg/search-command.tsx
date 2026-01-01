import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import { ScrollArea } from '@/components/ui/scroll-area';
import usg from '@/routes/usg';
import { router } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    FileText,
    Home,
    Megaphone,
    Search,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchResult {
    type: 'page' | 'announcement' | 'event' | 'officer' | 'resolution';
    title: string;
    description?: string;
    href: string;
    icon: React.ReactNode;
    date?: string;
}

interface AnnouncementItem {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    publish_date: string;
}

interface EventItem {
    id: number;
    title: string;
    description: string;
    slug: string;
    event_date: string;
    location?: string;
}

interface OfficerItem {
    id: number;
    name: string;
    position: string;
    department?: string;
}

interface ResolutionItem {
    id: number;
    title: string;
    description: string;
    slug: string;
    date_filed?: string;
    resolution_date?: string;
    resolution_number?: string;
}

interface DocumentItem {
    id: number;
    title: string;
    description: string;
    file_name?: string;
}

interface VMGOItem {
    id: number;
    vision: string;
    mission: string;
}

interface TransparencyReportItem {
    id: number;
    title: string;
    description: string;
    slug: string;
}

interface PaginatedData<T> {
    data: T[];
}

interface SearchApiResponse {
    announcements?: PaginatedData<AnnouncementItem>;
    events?: PaginatedData<EventItem>;
    officers?: PaginatedData<OfficerItem>;
    resolutions?: PaginatedData<ResolutionItem>;
    documents?: PaginatedData<DocumentItem>;
    vmgo?: PaginatedData<VMGOItem>;
    transparency_reports?: PaginatedData<TransparencyReportItem>;
}

const quickLinks: SearchResult[] = [
    {
        type: 'page',
        title: 'Home',
        description: 'USG main page',
        href: usg.index.url(),
        icon: <Home className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Announcements',
        description: 'Latest news and updates',
        href: usg.announcements.index.url(),
        icon: <Megaphone className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Events',
        description: 'Upcoming activities',
        href: usg.events.index.url(),
        icon: <Calendar className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Officers',
        description: 'Meet the USG team',
        href: usg.officers.index.url(),
        icon: <Users className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Resolutions',
        description: 'Official resolutions',
        href: usg.resolutions.index.url(),
        icon: <FileText className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'VMGO',
        description: 'Vision, Mission, Goals & Objectives',
        href: usg.vmgo.show.url(),
        icon: <BookOpen className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Transparency',
        description: 'Financial reports and transparency',
        href: usg.transparency.index.url(),
        icon: <FileText className="h-4 w-4" />,
    },
];

interface SearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SearchCommand({
    open,
    onOpenChange,
}: SearchCommandProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Perform global search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Debounce search
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `/usg/search/quick?q=${encodeURIComponent(searchQuery)}`,
                );

                if (response.ok) {
                    const data = (await response.json()) as SearchApiResponse;
                    const results: SearchResult[] = [];

                    // Add announcements
                    data.announcements?.data?.forEach(
                        (item: AnnouncementItem) => {
                            results.push({
                                type: 'announcement',
                                title: item.title,
                                description: item.excerpt,
                                href: usg.announcements.show.url(item.slug),
                                icon: <Megaphone className="h-4 w-4" />,
                                date: item.publish_date,
                            });
                        },
                    );

                    // Add events
                    data.events?.data?.forEach((item: EventItem) => {
                        results.push({
                            type: 'event',
                            title: item.title,
                            description: item.description,
                            href: usg.events.show.url(item.slug),
                            icon: <Calendar className="h-4 w-4" />,
                            date: item.event_date,
                        });
                    });

                    // Add resolutions
                    data.resolutions?.data?.forEach((item: ResolutionItem) => {
                        results.push({
                            type: 'resolution',
                            title: item.title,
                            description: item.description,
                            href: usg.resolutions.show.url(item.slug),
                            icon: <FileText className="h-4 w-4" />,
                            date: item.date_filed || item.resolution_date,
                        });
                    });

                    // Add officers
                    data.officers?.data?.forEach((item: OfficerItem) => {
                        results.push({
                            type: 'officer',
                            title: item.name,
                            description: `${item.position}${item.department ? ` - ${item.department}` : ''}`,
                            href: usg.officers.index.url(),
                            icon: <Users className="h-4 w-4" />,
                        });
                    });

                    // Note: Documents are admin-only and not included in public search

                    // Add transparency reports
                    data.transparency_reports?.data?.forEach(
                        (item: TransparencyReportItem) => {
                            results.push({
                                type: 'resolution',
                                title: item.title,
                                description: item.description,
                                href: usg.transparency.show.url(item.slug),
                                icon: <FileText className="h-4 w-4" />,
                            });
                        },
                    );

                    setSearchResults(results);
                }
            } catch {
                // Search error occurred
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredQuickLinks = searchQuery.trim()
        ? quickLinks.filter(
              (link) =>
                  link.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  link.description
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()),
          )
        : quickLinks;

    const allResults = searchQuery.trim()
        ? [...filteredQuickLinks, ...searchResults]
        : quickLinks;

    const handleSelect = (href: string) => {
        router.get(href);
        onOpenChange(false);
        setSearchQuery('');
        setSelectedIndex(0);
        setSearchResults([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < allResults.length - 1 ? prev + 1 : prev,
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (allResults.length > 0) {
                handleSelect(allResults[selectedIndex].href);
            }
        }
    };

    // Reset selected index when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="gap-0 overflow-hidden p-0 sm:max-w-2xl"
                showCloseButton={false}
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>

                {/* Search Input */}
                <div className="flex items-center border-b border-gray-200 px-4 dark:border-gray-700">
                    <Search className="mr-3 h-5 w-5 shrink-0 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search announcements, events, officers, pages..."
                        className="flex h-14 w-full bg-transparent py-4 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white [&:focus]:outline-none"
                        style={{
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                        autoFocus
                    />
                    <Kbd className="shrink-0">Esc</Kbd>
                </div>

                {/* Results */}
                <ScrollArea className="max-h-[60vh] overflow-y-auto">
                    <div className="p-2">
                        {isSearching ? (
                            <div className="py-8 text-center">
                                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--usg-primary)]"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Searching...
                                </p>
                            </div>
                        ) : searchQuery.trim() && allResults.length === 0 ? (
                            <div className="py-8 text-center">
                                <Search className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                                <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    No results found for "{searchQuery}"
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Try different keywords or check your
                                    spelling
                                </p>
                            </div>
                        ) : (
                            <>
                                {!searchQuery.trim() && (
                                    <div className="mb-2 px-2 py-1.5">
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Quick Links
                                        </p>
                                    </div>
                                )}

                                {searchQuery.trim() &&
                                    filteredQuickLinks.length > 0 && (
                                        <div className="mb-4">
                                            <div className="mb-2 px-2 py-1.5">
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Pages
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                {filteredQuickLinks.map(
                                                    (result, index) => (
                                                        <button
                                                            key={result.href}
                                                            onClick={() =>
                                                                handleSelect(
                                                                    result.href,
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                setSelectedIndex(
                                                                    index,
                                                                )
                                                            }
                                                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                                                index ===
                                                                selectedIndex
                                                                    ? 'bg-[var(--usg-primary)] text-white'
                                                                    : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                                                            }`}
                                                        >
                                                            <div
                                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                                                    index ===
                                                                    selectedIndex
                                                                        ? 'bg-white/20'
                                                                        : 'bg-gray-100 dark:bg-gray-800'
                                                                }`}
                                                            >
                                                                {result.icon}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="truncate font-medium">
                                                                    {
                                                                        result.title
                                                                    }
                                                                </div>
                                                                {result.description && (
                                                                    <div
                                                                        className={`truncate text-xs ${
                                                                            index ===
                                                                            selectedIndex
                                                                                ? 'text-white/80'
                                                                                : 'text-gray-500 dark:text-gray-400'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            result.description
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {!searchQuery.trim() && (
                                    <div className="space-y-1">
                                        {quickLinks.map((result, index) => (
                                            <button
                                                key={result.href}
                                                onClick={() =>
                                                    handleSelect(result.href)
                                                }
                                                onMouseEnter={() =>
                                                    setSelectedIndex(index)
                                                }
                                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                                    index === selectedIndex
                                                        ? 'bg-[var(--usg-primary)] text-white'
                                                        : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                                        index === selectedIndex
                                                            ? 'bg-white/20'
                                                            : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}
                                                >
                                                    {result.icon}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate font-medium">
                                                        {result.title}
                                                    </div>
                                                    {result.description && (
                                                        <div
                                                            className={`truncate text-xs ${
                                                                index ===
                                                                selectedIndex
                                                                    ? 'text-white/80'
                                                                    : 'text-gray-500 dark:text-gray-400'
                                                            }`}
                                                        >
                                                            {result.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {searchQuery.trim() &&
                                    searchResults.length > 0 && (
                                        <div>
                                            <div className="mb-2 px-2 py-1.5">
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Content (
                                                    {searchResults.length})
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                {searchResults.map(
                                                    (result, index) => {
                                                        const actualIndex =
                                                            filteredQuickLinks.length +
                                                            index;
                                                        return (
                                                            <button
                                                                key={`${result.type}-${result.href}`}
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        result.href,
                                                                    )
                                                                }
                                                                onMouseEnter={() =>
                                                                    setSelectedIndex(
                                                                        actualIndex,
                                                                    )
                                                                }
                                                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                                                    actualIndex ===
                                                                    selectedIndex
                                                                        ? 'bg-[var(--usg-primary)] text-white'
                                                                        : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                                                        actualIndex ===
                                                                        selectedIndex
                                                                            ? 'bg-white/20'
                                                                            : 'bg-gray-100 dark:bg-gray-800'
                                                                    }`}
                                                                >
                                                                    {
                                                                        result.icon
                                                                    }
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="truncate text-sm font-medium">
                                                                        {
                                                                            result.title
                                                                        }
                                                                    </div>
                                                                    {result.description && (
                                                                        <div
                                                                            className={`line-clamp-1 text-xs ${
                                                                                actualIndex ===
                                                                                selectedIndex
                                                                                    ? 'text-white/80'
                                                                                    : 'text-gray-500 dark:text-gray-400'
                                                                            }`}
                                                                        >
                                                                            {
                                                                                result.description
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {result.date && (
                                                                    <div
                                                                        className={`shrink-0 text-xs ${
                                                                            actualIndex ===
                                                                            selectedIndex
                                                                                ? 'text-white/60'
                                                                                : 'text-gray-400'
                                                                        }`}
                                                                    >
                                                                        {new Date(
                                                                            result.date,
                                                                        ).toLocaleDateString()}
                                                                    </div>
                                                                )}
                                                            </button>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <Kbd>↑↓</Kbd>
                            <span>Navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Kbd>↵</Kbd>
                            <span>Select</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Kbd>Esc</Kbd>
                            <span>Close</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
