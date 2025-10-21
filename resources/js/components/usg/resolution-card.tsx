import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import {
    Calendar,
    Download,
    ExternalLink,
    Eye,
    FileText,
    User,
} from 'lucide-react';
import StatusBadge from './status-badge';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path: string | null;
    status:
        | 'draft'
        | 'pending'
        | 'review'
        | 'published'
        | 'rejected'
        | 'archived';
    category?: string;
    tags?: string[];
    created_at: string;
}

interface ResolutionCardProps {
    resolution: Resolution;
    variant?: 'full' | 'compact';
    showActions?: boolean;
}

export default function ResolutionCard({
    resolution,
    variant = 'full',
    showActions = true,
}: ResolutionCardProps) {
    const handleViewResolution = () => {
        router.visit(`/usg/resolutions/${resolution.id}`);
    };

    const handleDownload = (e: React.MouseEvent) => {
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

    if (variant === 'compact') {
        return (
            <Card
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={handleViewResolution}
            >
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="font-mono text-xs"
                                >
                                    {resolution.resolution_number}
                                </Badge>
                                <StatusBadge status={resolution.status} />
                            </div>

                            <h3 className="mb-2 line-clamp-2 text-sm font-semibold">
                                {resolution.title}
                            </h3>

                            <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(resolution.date_passed)}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {resolution.author}
                                </div>
                            </div>

                            {resolution.category && (
                                <Badge variant="secondary" className="text-xs">
                                    {resolution.category}
                                </Badge>
                            )}
                        </div>

                        {resolution.file_path && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDownload}
                                className="ml-2"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                            {resolution.resolution_number}
                        </Badge>
                        <StatusBadge status={resolution.status} showIcon />
                    </div>

                    {resolution.file_path && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDownload}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    )}
                </div>

                <CardTitle className="line-clamp-2 text-xl">
                    {resolution.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="mb-4 line-clamp-3 text-muted-foreground">
                    {resolution.description}
                </p>

                <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Date Passed: {formatDate(resolution.date_passed)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Author: {resolution.author}
                    </div>

                    {resolution.file_path && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            Document available for download
                        </div>
                    )}
                </div>

                {resolution.category && (
                    <div className="mb-4">
                        <Badge variant="secondary">{resolution.category}</Badge>
                    </div>
                )}

                {resolution.tags && resolution.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1">
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

                {showActions && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handleViewResolution}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>

                        {resolution.file_path && (
                            <Button variant="ghost" onClick={handleDownload}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Open Document
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
