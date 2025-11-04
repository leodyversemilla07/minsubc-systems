import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
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
    publish_date: string;
    views_count?: number;
    featured_image?: string;
    category?: string;
    author_name?: string;
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
        <USGLayout>
            <Head title={`${announcement.title} - USG Announcements`} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-700 via-orange-600 to-red-600 py-12 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 container mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="mb-6 text-white hover:bg-white/20"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Announcements
                    </Button>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-4xl px-4">
                    <article className="space-y-8">
                        {/* Header */}
                        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                {announcement.category && (
                                    <Badge variant="outline">
                                        {announcement.category}
                                    </Badge>
                                )}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleShare}
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                            </div>

                            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                                {announcement.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Published on{' '}
                                    {formatDate(announcement.publish_date)}
                                </div>

                                {announcement.author_name && (
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {announcement.author_name}
                                    </div>
                                )}

                                {announcement.views_count !== undefined && (
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {announcement.views_count} views
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured Image */}
                        {announcement.featured_image && (
                            <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
                                <img
                                    src={announcement.featured_image}
                                    alt={announcement.title}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                            <div
                                className="prose prose-gray dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: announcement.content,
                                }}
                            />
                        </div>

                        {/* Tags */}
                        {announcement.tags && announcement.tags.length > 0 && (
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                <div className="mb-3 flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    <span className="font-medium">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {announcement.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attachments */}
                        {announcement.attachments &&
                            announcement.attachments.length > 0 && (
                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                        Attachments
                                    </h3>
                                    <div className="space-y-2">
                                        {announcement.attachments.map(
                                            (attachment) => (
                                                <div
                                                    key={attachment.id}
                                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    attachment.filename
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
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
                                </div>
                            )}
                    </article>

                    {/* Related Announcements */}
                    {relatedAnnouncements.length > 0 && (
                        <div className="mt-12 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Related Announcements
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {relatedAnnouncements
                                    .slice(0, 4)
                                    .map((related) => (
                                        <div
                                            key={related.id}
                                            className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-900"
                                            onClick={() =>
                                                router.visit(
                                                    `/usg/announcements/${related.slug}`,
                                                )
                                            }
                                        >
                                            <div className="mb-3 flex items-start justify-between">
                                                {related.category && (
                                                    <Badge variant="outline">
                                                        {related.category}
                                                    </Badge>
                                                )}
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(
                                                        related.publish_date,
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-500">
                                                {related.title}
                                            </h3>
                                            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                {related.excerpt}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 p-12 text-center text-white shadow-lg">
                        <h2 className="mb-4 text-3xl font-bold">
                            Stay Updated with USG
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Never miss an important announcement. Follow us on
                            social media.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() =>
                                    window.open(
                                        'https://facebook.com/minsubcusg',
                                        '_blank',
                                    )
                                }
                                className="bg-white text-orange-600 hover:bg-gray-100"
                            >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Follow on Facebook
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() =>
                                    router.visit('/usg/announcements')
                                }
                                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            >
                                View All Announcements
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
