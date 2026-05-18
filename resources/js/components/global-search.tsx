import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import {
    AlertTriangle,
    BookOpen,
    Building2,
    Calendar,
    FileText,
    FlaskConical,
    GraduationCap,
    Megaphone,
    Search,
    Ticket,
    UserCheck,
    UserCircle,
    Users,
    Vote,
    Wrench,
} from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Users,
    UserCircle,
    BookOpen,
    Building2,
    Wrench,
    Ticket,
    AlertTriangle,
    Calendar,
    FlaskConical,
    FileText,
    Megaphone,
    UserCheck,
    Vote,
};

interface SearchResult {
    type: string;
    label: string;
    sublabel: string;
    url: string | null;
    icon: string;
}

export function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    // Toggle with Cmd+K / Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Debounced search
    useEffect(() => {
        if (!open || query.length < 2) {
            setResults([]);
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, open]);

    const handleSelect = (result: SearchResult) => {
        setOpen(false);
        if (result.url) {
            router.visit(result.url);
        }
    };

    // Group results by type
    const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
        (acc[r.type] ??= []).push(r);
        return acc;
    }, {});

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                title="Search (⌘K)"
            >
                <Search className="size-5 opacity-80 group-hover:opacity-100" />
                <span className="sr-only">Search</span>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search students, books, tickets, events..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {loading && (
                        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                            Searching...
                        </div>
                    )}
                    {!loading && results.length === 0 && query.length >= 2 && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    {!loading &&
                        Object.entries(grouped).map(([type, items]) => (
                            <CommandGroup key={type} heading={type}>
                                {items.map((item, i) => {
                                    const Icon = item.icon
                                        ? iconMap[item.icon]
                                        : Search;
                                    return (
                                        <CommandItem
                                            key={`${type}-${i}`}
                                            onSelect={() => handleSelect(item)}
                                            className="flex items-center gap-3"
                                        >
                                            <Icon className="size-4 shrink-0 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span>{item.label}</span>
                                                {item.sublabel && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.sublabel}
                                                    </span>
                                                )}
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        ))}
                </CommandList>
            </CommandDialog>
        </>
    );
}