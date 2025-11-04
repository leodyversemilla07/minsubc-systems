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
import { Calendar, Download, Eye, FileText, User } from 'lucide-react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path: string | null;
    status: 'draft' | 'review' | 'published' | 'rejected' | 'archived';
    category?: string;
    tags?: string[];
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
            case 'draft':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'review':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            case 'rejected':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            case 'archived':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'draft':
                return 'Draft';
            case 'review':
                return 'Under Review';
            case 'rejected':
                return 'Rejected';
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
                    <div className="flex items-center gap-1 text-xs">
                        <User className="h-3 w-3" />
                        <span>by {resolution.author}</span>
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

                {resolution.tags && resolution.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 border-t border-border pt-3">
                        {resolution.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
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
