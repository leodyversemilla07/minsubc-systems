import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PriorityBadge from '@/components/usg/priority-badge';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/usg/admin/announcements';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Edit,
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
    priority: 'low' | 'normal' | 'high';
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
}

export default function AnnouncementShow({ announcement }: Props) {
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
                { title: announcement.title, href: '' },
            ]}
        >
            <Head title={`${announcement.title} - Announcement Details`} />

            <div className="space-y-6 py-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => router.visit(index.url())}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Announcements
                    </Button>

                    <Button
                        onClick={() =>
                            router.visit(edit.url(announcement.id))
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Announcement
                    </Button>
                </div>

                <div className="container mx-auto max-w-4xl px-6">
                    {/* Main Content */}
                    <article className="space-y-6">
                        {/* Header */}
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <PriorityBadge
                                        priority={announcement.priority}
                                    />
                                    {announcement.category && (
                                        <Badge variant="outline">
                                            {announcement.category}
                                        </Badge>
                                    )}
                                    <Badge
                                        variant={
                                            announcement.status === 'published'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {announcement.status}
                                    </Badge>
                                </div>
                            </div>

                            <h1 className="mb-4 text-3xl font-bold text-card-foreground">
                                {announcement.title}
                            </h1>

                            <p className="mb-6 text-lg text-muted-foreground">
                                {announcement.excerpt}
                            </p>

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
                            <h2 className="mb-4 text-xl font-semibold text-card-foreground">
                                Content
                            </h2>
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
            </div>
        </AppLayout>
    );
}
