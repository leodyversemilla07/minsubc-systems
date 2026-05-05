import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import { ScrollArea } from '@/components/ui/scroll-area';
import admission, { track as trackRoute } from '@/routes/admission';
import { router } from '@inertiajs/react';
import { FileText, GraduationCap, Search, ClipboardCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchResult {
    type: 'page' | 'program';
    title: string;
    description?: string;
    href: string;
    icon: React.ReactNode;
}

const staticPages: SearchResult[] = [
    {
        type: 'page',
        title: 'Apply for Admission',
        description: 'Submit your application online',
        href: admission.application.create.url(),
        icon: <FileText className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Track Application',
        description: 'Check your application status',
        href: trackRoute.url(),
        icon: <ClipboardCheck className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Manage Application',
        description: 'Upload documents and manage your application',
        href: trackRoute.url(),
        icon: <GraduationCap className="h-4 w-4" />,
    },
    {
        type: 'page',
        title: 'Programs',
        description: 'View available programs',
        href: admission.application.create.url(),
        icon: <GraduationCap className="h-4 w-4" />,
    },
];

interface SearchCommandProps {
    onClose: () => void;
}

export default function SearchCommand({ onClose }: SearchCommandProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>(staticPages);

    useEffect(() => {
        if (!query.trim()) {
            setResults(staticPages);
            return;
        }

        const q = query.toLowerCase();
        setResults(
            staticPages.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    r.description?.toLowerCase().includes(q),
            ),
        );
    }, [query]);

    const handleSelect = (href: string) => {
        onClose();
        router.visit(href);
    };

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="sr-only">Search</DialogTitle>
                </DialogHeader>
                <div className="flex items-center border-b border-blue-100 pb-3 dark:border-blue-900/50">
                    <Search className="ml-1 mr-3 h-5 w-5 text-gray-400" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search pages, programs..."
                        className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
                        autoFocus
                    />
                    <Kbd className="ml-2">ESC</Kbd>
                </div>
                <ScrollArea className="mt-2 max-h-[300px]">
                    {results.length === 0 ? (
                        <p className="py-6 text-center text-sm text-gray-500">
                            No results found.
                        </p>
                    ) : (
                        <div className="space-y-1">
                            {results.map((result, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(result.href)}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-blue-50 dark:hover:bg-blue-950"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                        {result.icon}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {result.title}
                                        </p>
                                        {result.description && (
                                            <p className="text-xs text-gray-500">
                                                {result.description}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}