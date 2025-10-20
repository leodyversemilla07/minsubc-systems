import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PriorityBadge from '@/components/usg/priority-badge';
import PublicLayout from '@/layouts/public-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    ExternalLink,
    Eye,
    Share2,
    Tag,
    User,
} from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    priority: 'low' | 'medium' | 'high';
    publish_date: string;
    views_count?: number;
    featured_image?: string;
    category?: string;
    author?: string;
    tags?: string[];
    attachments?: {
        id: number;
        filename: string;
        file_path: string;
        file_size: number;
    }[];
}

interface Props {
    announcement: Announcement;
    relatedAnnouncements?: Announcement[];
}

export default function AnnouncementShow({
    announcement,
    relatedAnnouncements = [],
}: Props) {
    const handleBack = () => {
        router.visit('/usg/announcements');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: announcement.title,
                    text: announcement.excerpt,
                    url: window.location.href,
                });
            } catch {
                // User cancelled sharing or error occurred
                console.log('Sharing cancelled');
            }
        } else {
            // Fallback to copying URL to clipboard
            navigator.clipboard.writeText(window.location.href);
            // You could show a toast notification here
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (
            Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
        );
    };

    return (
        <PublicLayout>
            <Head title={`${announcement.title} - USG Announcements`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="mb-2"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Announcements
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Main Content */}
                    <article className="space-y-6">
                        {/* Header */}
                        <Card>
                            <CardHeader>
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <PriorityBadge
                                            priority={announcement.priority}
                                        />
                                        {announcement.category && (
                                            <Badge variant="outline">
                                                {announcement.category}
                                            </Badge>
                                        )}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleShare}
                                    >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                    {announcement.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Published on{' '}
                                        {formatDate(announcement.publish_date)}
                                    </div>

                                    {announcement.author && (
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            {announcement.author}
                                        </div>
                                    )}

                                    {announcement.views_count !== undefined && (
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {announcement.views_count} views
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Featured Image */}
                        {announcement.featured_image && (
                            <Card>
                                <CardContent className="p-0">
                                    <img
                                        src={announcement.featured_image}
                                        alt={announcement.title}
                                        className="h-64 w-full rounded-t-lg object-cover sm:h-80"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Content */}
                        <Card>
                            <CardContent className="p-6">
                                <div
                                    className="prose prose-gray dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: announcement.content,
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        {announcement.tags && announcement.tags.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        <span className="font-medium">
                                            Tags
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {announcement.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Attachments */}
                        {announcement.attachments &&
                            announcement.attachments.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">
                                            Attachments
                                        </h3>
                                        <div className="space-y-2">
                                            {announcement.attachments.map(
                                                (attachment) => (
                                                    <div
                                                        key={attachment.id}
                                                        className="flex items-center justify-between rounded-lg border p-3"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">
                                                                    {
                                                                        attachment.filename
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-muted-foreground">
                                                                    {formatFileSize(
                                                                        attachment.file_size,
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    attachment.file_path,
                                                                    '_blank',
                                                                )
                                                            }
                                                        >
                                                            Download
                                                        </Button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                    </article>

                    {/* Related Announcements */}
                    {relatedAnnouncements.length > 0 && (
                        <div className="mt-12">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                Related Announcements
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {relatedAnnouncements
                                    .slice(0, 4)
                                    .map((related) => (
                                        <Card
                                            key={related.id}
                                            className="cursor-pointer transition-shadow hover:shadow-lg"
                                            onClick={() =>
                                                router.visit(
                                                    `/usg/announcements/${related.slug}`,
                                                )
                                            }
                                        >
                                            <CardContent className="p-4">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <PriorityBadge
                                                        priority={
                                                            related.priority
                                                        }
                                                    />
                                                    {related.category && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {related.category}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h4 className="mb-2 line-clamp-2 font-semibold">
                                                    {related.title}
                                                </h4>
                                                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                                    {related.excerpt}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(
                                                        related.publish_date,
                                                    ).toLocaleDateString()}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Stay Updated
                                </h3>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    Don't miss out on important announcements
                                    from the USG.
                                </p>
                                <Button
                                    onClick={() =>
                                        router.visit('/usg/announcements')
                                    }
                                >
                                    View All Announcements
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
