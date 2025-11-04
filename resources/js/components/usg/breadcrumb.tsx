import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm"
        >
            <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 transition-colors hover:text-[var(--usg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 dark:text-gray-400 dark:hover:text-green-400"
                aria-label="Home"
            >
                <Home className="h-4 w-4" />
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        {isLast || !item.href ? (
                            <span
                                className="font-medium text-gray-900 dark:text-white"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-gray-600 transition-colors hover:text-[var(--usg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 dark:text-gray-400 dark:hover:text-green-400"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
