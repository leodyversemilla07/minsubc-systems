import { Link } from '@inertiajs/react';
import { TrendingUp, Trophy, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: boolean;
    end_time: string | null;
}

interface Candidate {
    id: number;
    fullname: string;
    photo: string | null;
    platform: string | null;
    partylist: string | null;
    votes: number;
}

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    total_votes: number;
    candidates: Candidate[];
}

interface Statistics {
    total_voters: number;
    voted_count: number;
    not_voted_count: number;
    total_votes: number;
    turnout_percentage: number;
}

interface ResultsPageProps {
    elections: Election[];
    election: Election | null;
    results: Position[];
    statistics: Statistics | null;
}

export default function Results({
    election,
    results,
    statistics,
}: ResultsPageProps) {
    if (!election || !statistics) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-950">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                            No Election Selected
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Please select an election to view results.
                        </p>
                        <Link
                            href="/voting"
                            className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="bg-green-600 text-white shadow-lg dark:bg-green-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <img
                            src="/votesys-logo.png"
                            alt="VoteSys Logo"
                            className="hidden h-12 w-auto sm:block"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">
                                Election Results
                            </h1>
                            <p className="text-sm opacity-90">
                                {election.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                {/* Election Statistics */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                            Total Voters
                        </div>
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {statistics.total_voters}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                            Voted
                        </div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {statistics.voted_count}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                            Not Voted
                        </div>
                        <div className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                            {statistics.not_voted_count}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                            Turnout
                        </div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {statistics.turnout_percentage.toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Results by Position */}
                {results.map((position) => {
                    // Define vibrant colors that work in both light and dark mode
                    const chartColors = [
                        '#10b981', // green-500
                        '#3b82f6', // blue-500
                        '#f59e0b', // amber-500
                        '#ef4444', // red-500
                        '#8b5cf6', // violet-500
                        '#ec4899', // pink-500
                        '#06b6d4', // cyan-500
                        '#f97316', // orange-500
                        '#84cc16', // lime-500
                        '#6366f1', // indigo-500
                    ];

                    // Prepare chart data
                    const chartData = position.candidates.map(
                        (candidate, index) => ({
                            name:
                                candidate.fullname.length > 20
                                    ? candidate.fullname.substring(0, 20) +
                                      '...'
                                    : candidate.fullname,
                            fullname: candidate.fullname,
                            votes: candidate.votes,
                            fill: chartColors[index % chartColors.length],
                        }),
                    );

                    // Chart config with dynamic colors
                    const chartConfig: ChartConfig = {
                        votes: { label: 'Votes' },
                        ...Object.fromEntries(
                            position.candidates.map((candidate, index) => [
                                candidate.id.toString(),
                                {
                                    label: candidate.fullname,
                                    color: chartColors[
                                        index % chartColors.length
                                    ],
                                },
                            ]),
                        ),
                    };

                    return (
                        <div
                            key={position.position_id}
                            className="mb-8 space-y-6"
                        >
                            {/* Position Header */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                        {position.description}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Total Votes: {position.total_votes}
                                    </p>
                                </div>
                            </div>

                            {position.candidates.length > 0 ? (
                                <div className="grid gap-6 lg:grid-cols-2">
                                    {/* Bar Chart */}
                                    <Card className="dark:border-gray-800 dark:bg-gray-900">
                                        <CardHeader>
                                            <CardTitle className="dark:text-gray-100">
                                                Vote Distribution
                                            </CardTitle>
                                            <CardDescription className="dark:text-gray-400">
                                                Bar chart showing votes per
                                                candidate
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer
                                                config={chartConfig}
                                            >
                                                <BarChart
                                                    accessibilityLayer
                                                    data={chartData}
                                                >
                                                    <CartesianGrid
                                                        vertical={false}
                                                    />
                                                    <XAxis
                                                        dataKey="name"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        axisLine={false}
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={80}
                                                    />
                                                    <ChartTooltip
                                                        content={
                                                            <ChartTooltipContent />
                                                        }
                                                        cursor={{
                                                            fill: 'hsl(var(--muted))',
                                                        }}
                                                    />
                                                    <Bar
                                                        dataKey="votes"
                                                        radius={8}
                                                    />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                        <CardFooter className="flex-col gap-2 text-sm">
                                            <div className="flex items-center gap-2 leading-none font-medium dark:text-gray-200">
                                                {position.total_votes > 0 && (
                                                    <>
                                                        Leading candidate:{' '}
                                                        {
                                                            position
                                                                .candidates[0]
                                                                ?.fullname
                                                        }
                                                        <TrendingUp className="h-4 w-4" />
                                                    </>
                                                )}
                                            </div>
                                            <div className="leading-none text-muted-foreground">
                                                {position.description}
                                            </div>
                                        </CardFooter>
                                    </Card>

                                    {/* Pie Chart */}
                                    <Card className="dark:border-gray-800 dark:bg-gray-900">
                                        <CardHeader>
                                            <CardTitle className="dark:text-gray-100">
                                                Vote Share
                                            </CardTitle>
                                            <CardDescription className="dark:text-gray-400">
                                                Percentage distribution of votes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer
                                                config={chartConfig}
                                                className="mx-auto aspect-square max-h-[300px]"
                                            >
                                                <PieChart>
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={
                                                            <ChartTooltipContent
                                                                hideLabel
                                                            />
                                                        }
                                                    />
                                                    <Pie
                                                        data={chartData}
                                                        dataKey="votes"
                                                        nameKey="fullname"
                                                        label={(entry) =>
                                                            `${entry.name}: ${entry.votes}`
                                                        }
                                                        labelLine={false}
                                                    />
                                                    <ChartLegend
                                                        content={
                                                            <ChartLegendContent />
                                                        }
                                                    />
                                                </PieChart>
                                            </ChartContainer>
                                        </CardContent>
                                        <CardFooter className="flex-col gap-2 text-sm">
                                            <div className="flex items-center gap-2 leading-none font-medium dark:text-gray-200">
                                                <Users className="h-4 w-4" />
                                                {
                                                    position.candidates.length
                                                }{' '}
                                                candidates
                                            </div>
                                            <div className="leading-none text-muted-foreground">
                                                Total: {position.total_votes}{' '}
                                                votes cast
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ) : (
                                <Card className="dark:border-gray-800 dark:bg-gray-900">
                                    <CardContent className="py-8">
                                        <div className="text-center text-gray-500 dark:text-gray-400">
                                            No candidates for this position
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Candidate Details List */}
                            <Card className="dark:border-gray-800 dark:bg-gray-900">
                                <CardHeader>
                                    <CardTitle className="dark:text-gray-100">
                                        Detailed Results
                                    </CardTitle>
                                    <CardDescription className="dark:text-gray-400">
                                        Complete ranking with candidate
                                        information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {position.candidates.map(
                                            (candidate, index) => {
                                                const isWinner =
                                                    index === 0 &&
                                                    candidate.votes > 0;
                                                const percentage =
                                                    position.total_votes > 0
                                                        ? (candidate.votes /
                                                              position.total_votes) *
                                                          100
                                                        : 0;

                                                return (
                                                    <div
                                                        key={candidate.id}
                                                        className="relative"
                                                    >
                                                        {/* Progress Bar Background */}
                                                        <div className="absolute inset-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                                                            <div
                                                                className={`h-full transition-all duration-500 ${
                                                                    isWinner
                                                                        ? 'bg-green-200 dark:bg-green-900'
                                                                        : 'bg-green-50 dark:bg-green-950'
                                                                }`}
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Candidate Info */}
                                                        <div className="relative flex items-center justify-between p-4">
                                                            <div className="flex items-center gap-4">
                                                                {/* Rank Badge */}
                                                                <div className="flex-shrink-0">
                                                                    {isWinner ? (
                                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 dark:bg-yellow-500">
                                                                            <Trophy className="h-5 w-5 text-white" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                                            {index +
                                                                                1}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Photo */}
                                                                {candidate.photo ? (
                                                                    <img
                                                                        src={`/storage/${candidate.photo}`}
                                                                        alt={
                                                                            candidate.fullname
                                                                        }
                                                                        className="h-12 w-12 rounded-full border-2 border-white object-cover shadow dark:border-gray-700"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-600 shadow dark:bg-gray-600 dark:text-gray-300">
                                                                        {candidate.fullname.charAt(
                                                                            0,
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Name and Partylist */}
                                                                <div>
                                                                    <div className="font-bold text-gray-800 dark:text-gray-100">
                                                                        {
                                                                            candidate.fullname
                                                                        }
                                                                    </div>
                                                                    {candidate.partylist ? (
                                                                        <div className="text-sm text-green-600 dark:text-green-400">
                                                                            {
                                                                                candidate.partylist
                                                                            }
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-sm text-gray-500 italic dark:text-gray-400">
                                                                            Independent
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Vote Count */}
                                                            <div className="text-right">
                                                                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                                                    {
                                                                        candidate.votes
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {percentage.toFixed(
                                                                        1,
                                                                    )}
                                                                    %
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}

                {/* Back Button */}
                <div className="text-center">
                    <Link
                        href="/voting"
                        className="inline-block rounded-lg bg-green-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
