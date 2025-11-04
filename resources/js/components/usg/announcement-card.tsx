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
import { show as publicShow } from '@/routes/usg/announcements';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Eye } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    publish_date: string;
    views_count?: number;
    featured_image?: string;
    category?: string;
}

interface AnnouncementCardProps {
    announcement: Announcement;
}

export default function AnnouncementCard({
    announcement,
}: AnnouncementCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-900">
            {/* Featured Image */}
            {announcement.featured_image && (
                <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={announcement.featured_image}
                        alt={announcement.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {announcement.category && (
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                                {announcement.category}
                            </Badge>
                        </div>
                    )}
                </div>
            )}

            <CardHeader className="pb-3">
                {/* Category badge - only show if no image */}
                {!announcement.featured_image && announcement.category && (
                    <Badge variant="outline" className="w-fit">
                        {announcement.category}
                    </Badge>
                )}

                <Link
                    href={publicShow.url(announcement.slug)}
                    className="group/title"
                >
                    <CardTitle className="line-clamp-2 group-hover/title:text-primary transition-colors">
                        {announcement.title}
                    </CardTitle>
                </Link>

                <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(announcement.publish_date).toLocaleDateString()}
                    </span>
                    {announcement.views_count !== undefined && (
                        <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {announcement.views_count} views
                        </span>
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
                <p className="text-sm leading-relaxed line-clamp-3">
                    {announcement.excerpt}
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    <Link href={publicShow.url(announcement.slug)}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
