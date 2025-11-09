import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import voting from '@/routes/voting';
import { format } from 'date-fns';

interface Election {
    id: number;
    name: string;
}

interface Voter {
    id: number;
    voters_id: string;
}

interface VoterFeedback {
    id: number;
    voter_id: number;
    election_id: number;
    rating: number;
    comment: string | null;
    experience: string | null;
    would_recommend: boolean | null;
    improvements: string[] | null;
    created_at: string;
    voter: Voter;
    election: Election;
}

interface PaginatedFeedback {
    data: VoterFeedback[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Statistics {
    total: number;
    average_rating: number;
    ratings_breakdown?: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    would_recommend?: {
        yes: number;
        no: number;
    };
}

interface Props {
    feedback: PaginatedFeedback;
    elections: Election[];
    statistics: Statistics;
    filters: {
        election_id?: number;
        rating?: number;
        experience?: string;
    };
}

export default function Index({ feedback, elections, statistics, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get(
            voting.admin.feedback.index.url(),
            {
                ...filters,
                [key]: value || undefined,
            },
            { preserveState: true }
        );
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    const getExperienceBadge = (experience: string | null) => {
        if (!experience) return null;

        const colors: Record<string, string> = {
            excellent: 'bg-green-100 text-green-800',
            good: 'bg-blue-100 text-blue-800',
            average: 'bg-yellow-100 text-yellow-800',
            poor: 'bg-red-100 text-red-800',
        };

        return (
            <Badge className={colors[experience] || ''}>{experience.charAt(0).toUpperCase() + experience.slice(1)}</Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Voter Feedback" />

            <div className="bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="border-b p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Voter Feedback</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                View and analyze feedback from voters
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Select
                            value={filters.election_id?.toString() || ''}
                            onValueChange={(value) => handleFilterChange('election_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Elections" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Elections</SelectItem>
                                {elections.map((election) => (
                                    <SelectItem key={election.id} value={election.id.toString()}>
                                        {election.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.rating?.toString() || ''}
                            onValueChange={(value) => handleFilterChange('rating', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Ratings" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Ratings</SelectItem>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <SelectItem key={rating} value={rating.toString()}>
                                        {rating} Star{rating !== 1 ? 's' : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.experience || ''}
                            onValueChange={(value) => handleFilterChange('experience', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Experiences" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Experiences</SelectItem>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="average">Average</SelectItem>
                                <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {(filters.election_id || filters.rating || filters.experience) && (
                        <div className="mt-3">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    router.get(voting.admin.feedback.index.url(), {}, { preserveState: true })
                                }
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b bg-gray-50">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Average Rating
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{statistics.average_rating}</span>
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>

                    {statistics.would_recommend && (
                        <>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Would Recommend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5 text-green-600" />
                                        <span className="text-2xl font-bold text-green-600">
                                            {statistics.would_recommend.yes}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Would Not Recommend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <ThumbsDown className="w-5 h-5 text-red-600" />
                                        <span className="text-2xl font-bold text-red-600">
                                            {statistics.would_recommend.no}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                {/* Table */}
                <div className="p-6">
                    {feedback.data.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <MessageSquare className="w-12 h-12" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>No Feedback Yet</EmptyTitle>
                                <EmptyDescription>
                                    {filters.election_id || filters.rating || filters.experience
                                        ? 'No feedback found matching your filters.'
                                        : 'No voter feedback has been submitted yet.'}
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Voter ID</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Experience</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feedback.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                {item.voter.voters_id}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {item.election.name}
                                            </TableCell>
                                            <TableCell>{renderStars(item.rating)}</TableCell>
                                            <TableCell>{getExperienceBadge(item.experience)}</TableCell>
                                            <TableCell className="max-w-xs">
                                                {item.comment ? (
                                                    <div className="truncate text-sm text-gray-600">
                                                        {item.comment}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">No comment</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {format(new Date(item.created_at), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link
                                                    href={voting.admin.feedback.show.url({
                                                        feedback: item.id,
                                                    })}
                                                >
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {feedback.last_page > 1 && (
                                <div className="flex justify-center gap-1 mt-6">
                                    {feedback.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'ghost'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
