import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/usg/status-badge';
import USGLayout from '@/layouts/usg-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Download,
    ExternalLink,
    Eye,
    FileText,
    Gavel,
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
        <USGLayout>
            <Head
                title={`${resolution.resolution_number}: ${resolution.title} - USG Resolutions`}
            />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 text-white">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="mb-6 text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resolutions
                    </Button>

                    <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                            <Gavel className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="border-white/30 bg-white/10 font-mono text-white backdrop-blur-sm"
                                >
                                    {resolution.resolution_number}
                                </Badge>
                                <div className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                                    <StatusBadge
                                        status={resolution.status}
                                        showIcon
                                    />
                                </div>
                                {resolution.category && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-white/10 text-white backdrop-blur-sm"
                                    >
                                        {resolution.category}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                                {resolution.title}
                            </h1>

                            <div className="mb-6 grid grid-cols-1 gap-3 text-sm text-blue-100 sm:grid-cols-2">
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

                            <div className="flex flex-wrap items-center gap-3">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleShare}
                                    className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>

                                {resolution.file_path && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleDownload}
                                        className="bg-white text-blue-600 hover:bg-blue-50"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <article className="space-y-8">
                    {/* Description */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                            Summary
                        </h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            {resolution.description}
                        </p>
                    </div>

                    {/* Full Content */}
                    {resolution.content && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                                Full Text
                            </h2>
                            <div
                                className="prose prose-gray dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: resolution.content,
                                }}
                            />
                        </div>
                    )}

                    {/* Vote Results */}
                    {resolution.vote_results && getTotalVotes() > 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                Voting Results
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                            {resolution.vote_results.for}
                                        </div>
                                        <div className="text-sm text-green-600 dark:text-green-400">
                                            For (
                                            {getVotePercentage(
                                                resolution.vote_results.for,
                                            )}
                                            %)
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
                                        <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                                            {resolution.vote_results.against}
                                        </div>
                                        <div className="text-sm text-red-600 dark:text-red-400">
                                            Against (
                                            {getVotePercentage(
                                                resolution.vote_results.against,
                                            )}
                                            %)
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                        <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                            {resolution.vote_results.abstain}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Abstain (
                                            {getVotePercentage(
                                                resolution.vote_results.abstain,
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
                        </div>
                    )}

                    {/* Tags */}
                    {resolution.tags && resolution.tags.length > 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <div className="mb-4 flex items-center gap-2">
                                <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tags
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {resolution.tags.map((tag, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attachments */}
                    {resolution.attachments &&
                        resolution.attachments.length > 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                                <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    Additional Documents
                                </h3>
                                <div className="space-y-3">
                                    {resolution.attachments.map(
                                        (attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-950">
                                                        <ExternalLink className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {attachment.filename}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
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
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                </article>

                {/* Related Resolutions */}
                {relatedResolutions.length > 0 && (
                    <div className="mt-12">
                        <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Related Resolutions
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {relatedResolutions.slice(0, 4).map((related) => (
                                <div
                                    key={related.id}
                                    className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
                                    onClick={() =>
                                        router.visit(
                                            `/usg/resolutions/${related.id}`,
                                        )
                                    }
                                >
                                    <div className="mb-3 flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="font-mono text-xs"
                                        >
                                            {related.resolution_number}
                                        </Badge>
                                        <StatusBadge status={related.status} />
                                    </div>
                                    <h4 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {related.title}
                                    </h4>
                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                        {related.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(related.date_passed)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-12">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-center text-white shadow-lg">
                        <h3 className="mb-3 text-2xl font-bold">
                            Explore More Resolutions
                        </h3>
                        <p className="mb-6 text-blue-100">
                            Browse our complete archive of USG resolutions and
                            legislative documents.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                onClick={() =>
                                    router.visit('/usg/resolutions')
                                }
                                className="bg-white text-blue-600 hover:bg-blue-50"
                            >
                                View All Resolutions
                            </Button>
                            {resolution.file_path && (
                                <Button
                                    variant="outline"
                                    onClick={handleDownload}
                                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Document
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </USGLayout>
    );
}
