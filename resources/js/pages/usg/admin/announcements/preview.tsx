import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/usg/admin/announcements';
import { show as publicShow } from '@/routes/usg/announcements';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    ExternalLink,
    Eye,
    Tag,
    User,
} from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    status: string;
    publish_date: string | null;
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

export default function AnnouncementPreview({
    announcement,
    relatedAnnouncements = [],
}: Props) {
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
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Announcements', href: index.url() },
                { title: 'Preview', href: '' },
            ]}
        >
            <Head title={`${announcement.title} - Preview`} />

            <div className="space-y-6 py-6">
                {/* Admin Preview Notice */}
                {(announcement.status !== 'published' ||
                    !announcement.publish_date) && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm font-medium">
                                {announcement.status === 'draft'
                                    ? 'This announcement is a DRAFT and not visible to the public.'
                                    : !announcement.publish_date
                                      ? 'This announcement has no publish date set.'
                                      : 'Preview Mode - Viewing as Administrator'}
                            </p>
                        </div>
                    </div>
                )}

                <div className="container mx-auto max-w-4xl px-6">
                    {/* Main Content */}
                    <article className="space-y-6">
                        {/* Header */}
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                {announcement.category && (
                                    <Badge variant="outline">
                                        {announcement.category}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="mb-4 text-3xl font-bold text-card-foreground">
                                {announcement.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {announcement.publish_date ? (
                                        <>
                                            Published on{' '}
                                            {formatDate(
                                                announcement.publish_date,
                                            )}
                                        </>
                                    ) : (
                                        <>No publish date set</>
                                    )}
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
                            <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                                <img
                                    src={announcement.featured_image}
                                    alt={announcement.title}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <div
                                className="prose prose-gray dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: announcement.content,
                                }}
                            />
                        </div>

                        {/* Tags */}
                        {announcement.tags && announcement.tags.length > 0 && (
                            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
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
                                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                                    <h3 className="mb-4 font-semibold text-card-foreground">
                                        Attachments
                                    </h3>
                                    <div className="space-y-2">
                                        {announcement.attachments.map(
                                            (attachment) => (
                                                <div
                                                    key={attachment.id}
                                                    className="flex items-center justify-between rounded-lg border border-border p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <div className="font-medium text-card-foreground">
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
                                </div>
                            )}
                    </article>
                </div>

                {/* Related Announcements */}
                {relatedAnnouncements.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-bold text-card-foreground">
                            Related Announcements
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {relatedAnnouncements.slice(0, 4).map((related) => (
                                <Link
                                    key={related.id}
                                    href={publicShow.url(related.slug)}
                                    className="block rounded-lg bg-card p-6 text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        {related.category && (
                                            <Badge variant="outline">
                                                {related.category}
                                            </Badge>
                                        )}
                                        <div className="text-sm text-muted-foreground">
                                            {related.publish_date &&
                                                new Date(
                                                    related.publish_date,
                                                ).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 font-semibold text-card-foreground hover:text-orange-600 dark:hover:text-orange-500">
                                        {related.title}
                                    </h3>
                                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                        {related.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
