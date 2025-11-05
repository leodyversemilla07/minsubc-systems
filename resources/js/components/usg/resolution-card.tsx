import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Calendar, Download, Eye, FileText } from 'lucide-react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    file_path: string | null;
    status: 'published' | 'archived';
    category?: string;
    created_at: string;
}

interface ResolutionCardProps {
    resolution: Resolution;
}

export default function ResolutionCard({ resolution }: ResolutionCardProps) {
    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (resolution.file_path) {
            window.open(resolution.file_path, '_blank');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'archived':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'archived':
                return 'Archived';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    return (
        <Card className="flex flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900">
            <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="w-fit font-mono">
                        {resolution.resolution_number}
                    </Badge>
                    <Badge
                        className={`${getStatusColor(resolution.status)} w-fit`}
                    >
                        {formatStatus(resolution.status)}
                    </Badge>
                    {resolution.category && (
                        <Badge variant="secondary" className="w-fit">
                            {resolution.category}
                        </Badge>
                    )}
                </div>

                <Link
                    href={`/usg/resolutions/${resolution.id}`}
                    className="group/title"
                >
                    <CardTitle className="line-clamp-2 transition-colors group-hover/title:text-primary">
                        {resolution.title}
                    </CardTitle>
                </Link>

                <CardDescription className="space-y-1">
                    <div className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                            Passed on {formatDate(resolution.date_passed)}
                        </span>
                    </div>
                    {resolution.file_path && (
                        <div className="flex items-center gap-1 text-xs">
                            <FileText className="h-3 w-3" />
                            <span>Document available</span>
                        </div>
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow space-y-3">
                <p className="line-clamp-3 text-sm leading-relaxed">
                    {resolution.description}
                </p>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/usg/resolutions/${resolution.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Link>
                </Button>

                {resolution.file_path && (
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={handleDownload}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
