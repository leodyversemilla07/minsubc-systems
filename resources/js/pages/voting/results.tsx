import { Link } from '@inertiajs/react';
import { TrendingUp, Trophy, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            No Election Selected
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Please select an election to view results.
                        </p>
                        <Link
                            href="/voting"
                            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">Election Results</h1>
                    <p className="text-sm opacity-90">{election.name}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Election Statistics */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Total Voters</div>
                        <div className="text-3xl font-bold text-gray-800">
                            {statistics.total_voters}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Voted</div>
                        <div className="text-3xl font-bold text-green-600">
                            {statistics.voted_count}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Not Voted</div>
                        <div className="text-3xl font-bold text-gray-400">
                            {statistics.not_voted_count}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Turnout</div>
                        <div className="text-3xl font-bold text-green-600">
                            {statistics.turnout_percentage.toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Results by Position */}
                {results.map((position) => {
                    // Prepare chart data
                    const chartData = position.candidates.map((candidate) => ({
                        name: candidate.fullname.length > 20 
                            ? candidate.fullname.substring(0, 20) + '...' 
                            : candidate.fullname,
                        fullname: candidate.fullname,
                        votes: candidate.votes,
                        fill: `var(--color-${candidate.id})`,
                    }));

                    // Chart config with dynamic colors
                    const chartConfig: ChartConfig = {
                        votes: { label: 'Votes' },
                        ...Object.fromEntries(
                            position.candidates.map((candidate, index) => [
                                candidate.id.toString(),
                                {
                                    label: candidate.fullname,
                                    color: `hsl(var(--chart-${(index % 5) + 1}))`,
                                },
                            ])
                        ),
                    };

                    return (
                        <div key={position.position_id} className="space-y-6 mb-8">
                            {/* Position Header */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="border-b pb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {position.description}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Total Votes: {position.total_votes}
                                    </p>
                                </div>
                            </div>

                            {position.candidates.length > 0 ? (
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* Bar Chart */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Vote Distribution</CardTitle>
                                            <CardDescription>
                                                Bar chart showing votes per candidate
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={chartConfig}>
                                                <BarChart accessibilityLayer data={chartData}>
                                                    <CartesianGrid vertical={false} />
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
                                                        content={<ChartTooltipContent />}
                                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                                    />
                                                    <Bar dataKey="votes" radius={8} />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                        <CardFooter className="flex-col gap-2 text-sm">
                                            <div className="flex items-center gap-2 font-medium leading-none">
                                                {position.total_votes > 0 && (
                                                    <>
                                                        Leading candidate:{' '}
                                                        {position.candidates[0]?.fullname}
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
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Vote Share</CardTitle>
                                            <CardDescription>
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
                                                        content={<ChartTooltipContent hideLabel />}
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
                                                        content={<ChartLegendContent />}
                                                    />
                                                </PieChart>
                                            </ChartContainer>
                                        </CardContent>
                                        <CardFooter className="flex-col gap-2 text-sm">
                                            <div className="flex items-center gap-2 font-medium leading-none">
                                                <Users className="h-4 w-4" />
                                                {position.candidates.length} candidates
                                            </div>
                                            <div className="leading-none text-muted-foreground">
                                                Total: {position.total_votes} votes cast
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="py-8">
                                        <div className="text-center text-gray-500">
                                            No candidates for this position
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Candidate Details List */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Detailed Results</CardTitle>
                                    <CardDescription>
                                        Complete ranking with candidate information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {position.candidates.map((candidate, index) => {
                                            const isWinner = index === 0 && candidate.votes > 0;
                                            const percentage =
                                                position.total_votes > 0
                                                    ? (candidate.votes / position.total_votes) * 100
                                                    : 0;

                                            return (
                                                <div key={candidate.id} className="relative">
                                                    {/* Progress Bar Background */}
                                                    <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all duration-500 ${
                                                                isWinner
                                                                    ? 'bg-green-200'
                                                                    : 'bg-green-50'
                                                            }`}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>

                                                    {/* Candidate Info */}
                                                    <div className="relative flex items-center justify-between p-4">
                                                        <div className="flex items-center gap-4">
                                                            {/* Rank Badge */}
                                                            <div className="flex-shrink-0">
                                                                {isWinner ? (
                                                                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                                                        <Trophy className="w-5 h-5 text-white" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                                                                        {index + 1}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Photo */}
                                                            {candidate.photo ? (
                                                                <img
                                                                    src={`/storage/${candidate.photo}`}
                                                                    alt={candidate.fullname}
                                                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold shadow">
                                                                    {candidate.fullname.charAt(0)}
                                                                </div>
                                                            )}

                                                            {/* Name and Partylist */}
                                                            <div>
                                                                <div className="font-bold text-gray-800">
                                                                    {candidate.fullname}
                                                                </div>
                                                                {candidate.partylist ? (
                                                                    <div className="text-sm text-green-600">
                                                                        {candidate.partylist}
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-sm text-gray-500 italic">
                                                                        Independent
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Vote Count */}
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-gray-800">
                                                                {candidate.votes}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {percentage.toFixed(1)}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
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
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
