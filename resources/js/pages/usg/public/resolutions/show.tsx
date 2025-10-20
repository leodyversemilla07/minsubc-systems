import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatusBadge from '@/components/usg/status-badge';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Download,
    ExternalLink,
    Eye,
    FileText,
    Share2,
    Tag,
    User,
} from 'lucide-react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    content?: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path: string | null;
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
    category?: string;
    tags?: string[];
    vote_results?: {
        for: number;
        against: number;
        abstain: number;
    };
    attachments?: {
        id: number;
        filename: string;
        file_path: string;
        file_size: number;
    }[];
    created_at: string;
}

interface Props {
    resolution: Resolution;
    relatedResolutions?: Resolution[];
}

export default function ResolutionShow({
    resolution,
    relatedResolutions = [],
}: Props) {
    const handleBack = () => {
        router.visit('/usg/resolutions');
    };

    const handleDownload = () => {
        if (resolution.file_path) {
            window.open(resolution.file_path, '_blank');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${resolution.resolution_number}: ${resolution.title}`,
                    text: resolution.description,
                    url: window.location.href,
                });
            } catch {
                console.log('Sharing cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

    const getTotalVotes = () => {
        if (!resolution.vote_results) return 0;
        return (
            resolution.vote_results.for +
            resolution.vote_results.against +
            resolution.vote_results.abstain
        );
    };

    const getVotePercentage = (votes: number) => {
        const total = getTotalVotes();
        return total > 0 ? Math.round((votes / total) * 100) : 0;
    };

    return (
        <>
            <Head
                title={`${resolution.resolution_number}: ${resolution.title} - USG Resolutions`}
            />

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
                            Back to Resolutions
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
                                        <Badge
                                            variant="outline"
                                            className="font-mono"
                                        >
                                            {resolution.resolution_number}
                                        </Badge>
                                        <StatusBadge
                                            status={resolution.status}
                                            showIcon
                                        />
                                        {resolution.category && (
                                            <Badge variant="secondary">
                                                {resolution.category}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleShare}
                                        >
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>

                                        {resolution.file_path && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleDownload}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                    {resolution.title}
                                </h1>

                                <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Date Passed:{' '}
                                        {formatDate(resolution.date_passed)}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Author: {resolution.author}
                                    </div>

                                    {resolution.file_path && (
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            Official document available
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        Resolution #
                                        {resolution.resolution_number}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Summary
                                </h2>
                                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                    {resolution.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Full Content */}
                        {resolution.content && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        Full Text
                                    </h2>
                                    <div
                                        className="prose prose-gray dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: resolution.content,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Vote Results */}
                        {resolution.vote_results && getTotalVotes() > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        Voting Results
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                                                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                                    {
                                                        resolution.vote_results
                                                            .for
                                                    }
                                                </div>
                                                <div className="text-sm text-green-600 dark:text-green-400">
                                                    For (
                                                    {getVotePercentage(
                                                        resolution.vote_results
                                                            .for,
                                                    )}
                                                    %)
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
                                                <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                                                    {
                                                        resolution.vote_results
                                                            .against
                                                    }
                                                </div>
                                                <div className="text-sm text-red-600 dark:text-red-400">
                                                    Against (
                                                    {getVotePercentage(
                                                        resolution.vote_results
                                                            .against,
                                                    )}
                                                    %)
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                                    {
                                                        resolution.vote_results
                                                            .abstain
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Abstain (
                                                    {getVotePercentage(
                                                        resolution.vote_results
                                                            .abstain,
                                                    )}
                                                    %)
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center text-sm text-muted-foreground">
                                            Total votes: {getTotalVotes()}
                                        </div>

                                        {/* Vote Progress Bar */}
                                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div className="flex h-full">
                                                <div
                                                    className="bg-green-500"
                                                    style={{
                                                        width: `${getVotePercentage(resolution.vote_results.for)}%`,
                                                    }}
                                                />
                                                <div
                                                    className="bg-red-500"
                                                    style={{
                                                        width: `${getVotePercentage(resolution.vote_results.against)}%`,
                                                    }}
                                                />
                                                <div
                                                    className="bg-gray-400"
                                                    style={{
                                                        width: `${getVotePercentage(resolution.vote_results.abstain)}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Tags */}
                        {resolution.tags && resolution.tags.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        <span className="font-medium">
                                            Tags
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {resolution.tags.map((tag, index) => (
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
                        {resolution.attachments &&
                            resolution.attachments.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">
                                            Additional Documents
                                        </h3>
                                        <div className="space-y-2">
                                            {resolution.attachments.map(
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

                    {/* Related Resolutions */}
                    {relatedResolutions.length > 0 && (
                        <div className="mt-12">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                Related Resolutions
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {relatedResolutions
                                    .slice(0, 4)
                                    .map((related) => (
                                        <Card
                                            key={related.id}
                                            className="cursor-pointer transition-shadow hover:shadow-lg"
                                            onClick={() =>
                                                router.visit(
                                                    `/usg/resolutions/${related.id}`,
                                                )
                                            }
                                        >
                                            <CardContent className="p-4">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="font-mono text-xs"
                                                    >
                                                        {
                                                            related.resolution_number
                                                        }
                                                    </Badge>
                                                    <StatusBadge
                                                        status={related.status}
                                                    />
                                                </div>
                                                <h4 className="mb-2 line-clamp-2 font-semibold">
                                                    {related.title}
                                                </h4>
                                                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                                    {related.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        related.date_passed,
                                                    )}
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
                                    Explore More Resolutions
                                </h3>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    Browse our complete archive of USG
                                    resolutions and legislative documents.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        onClick={() =>
                                            router.visit('/usg/resolutions')
                                        }
                                    >
                                        View All Resolutions
                                    </Button>
                                    {resolution.file_path && (
                                        <Button
                                            variant="outline"
                                            onClick={handleDownload}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Document
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
