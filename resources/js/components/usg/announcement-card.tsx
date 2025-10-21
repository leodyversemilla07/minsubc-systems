import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { show as publicShow } from '@/routes/usg/announcements';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Eye } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    priority: 'low' | 'normal' | 'high';
    publish_date: string;
    views_count?: number;
    featured_image?: string;
    category?: string;
}

interface AnnouncementCardProps {
    announcement: Announcement;
    showImage?: boolean;
    compact?: boolean;
}

export default function AnnouncementCard({
    announcement,
    showImage = true,
    compact = false,
}: AnnouncementCardProps) {
    const priorityVariant = {
        low: 'secondary',
        normal: 'default',
        high: 'destructive',
    } as const;

    return (
        <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <CardContent className={`p-0 ${compact ? '' : ''}`}>
                {/* Featured Image */}
                {showImage && announcement.featured_image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                        <img
                            src={announcement.featured_image}
                            alt={announcement.title}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                            <Badge
                                variant={priorityVariant[announcement.priority]}
                            >
                                {announcement.priority}
                            </Badge>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className={`p-${compact ? '4' : '6'}`}>
                    {/* Badges and Meta - only show if no image or compact */}
                    {(!showImage || !announcement.featured_image) && (
                        <div className="mb-3 flex items-center gap-2">
                            <Badge
                                variant={priorityVariant[announcement.priority]}
                            >
                                {announcement.priority}
                            </Badge>
                            {announcement.category && (
                                <Badge variant="outline">
                                    {announcement.category}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Title */}
                    <Link
                        href={publicShow.url(announcement.slug)}
                        className="group/title block"
                    >
                        <h3
                            className={`mb-2 line-clamp-2 font-semibold transition-colors group-hover/title:text-blue-600 ${
                                compact ? 'text-base' : 'text-lg'
                            }`}
                        >
                            {announcement.title}
                        </h3>
                    </Link>

                    {/* Excerpt */}
                    {!compact && (
                        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                            {announcement.excerpt}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                    {new Date(
                                        announcement.publish_date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            {announcement.views_count !== undefined && (
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{announcement.views_count}</span>
                                </div>
                            )}
                        </div>

                        <Link
                            href={publicShow.url(announcement.slug)}
                            className="flex items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-700"
                        >
                            Read more
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
