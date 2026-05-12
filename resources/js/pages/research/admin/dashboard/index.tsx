import { Head } from '@inertiajs/react';
import { BookOpen, FileText, GraduationCap, LayoutGrid, Users, CalendarCheck, Tags } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Proposal {
    id: number;
    title: string;
    status: string;
    research_type: { id: number; name: string } | null;
    created_at: string;
}

interface Defense {
    id: number;
    scheduled_date: string;
    status: string;
    proposal: { id: number; title: string } | null;
}

interface DashboardStats {
    total_proposals: number;
    submitted_proposals: number;
    approved_proposals: number;
    in_progress: number;
    completed: number;
    total_publications: number;
    scheduled_defenses: number;
    total_journals: number;
    recent_proposals: Proposal[];
    upcoming_defenses: Defense[];
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const statusCards = [
        { title: 'Total Proposals', value: stats.total_proposals, icon: FileText, color: 'text-blue-600' },
        { title: 'Submitted', value: stats.submitted_proposals, icon: FileText, color: 'text-yellow-600' },
        { title: 'Approved', value: stats.approved_proposals, icon: FileText, color: 'text-green-600' },
        { title: 'In Progress', value: stats.in_progress, icon: BookOpen, color: 'text-indigo-600' },
        { title: 'Completed', value: stats.completed, icon: GraduationCap, color: 'text-purple-600' },
        { title: 'Publications', value: stats.total_publications, icon: FileText, color: 'text-cyan-600' },
        { title: 'Scheduled Defenses', value: stats.scheduled_defenses, icon: CalendarCheck, color: 'text-orange-600' },
        { title: 'Journals', value: stats.total_journals, icon: Tags, color: 'text-pink-600' },
    ];

    return (
        <AppLayout>
            <Head title="Research Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Research Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statusCards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <card.icon className={`${card.color} h-4 w-4`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Recent Proposals</h2>
                        {stats.recent_proposals?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.recent_proposals.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="max-w-xs truncate font-medium">{p.title}</TableCell>
                                            <TableCell>{p.research_type?.name ?? '—'}</TableCell>
                                            <TableCell>
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    p.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    p.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                                                    p.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>{p.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground">No proposals yet.</p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Upcoming Defenses</h2>
                        {stats.upcoming_defenses?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Proposal</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.upcoming_defenses.map((d) => (
                                        <TableRow key={d.id}>
                                            <TableCell className="max-w-xs truncate font-medium">{d.proposal?.title ?? '—'}</TableCell>
                                            <TableCell>{d.scheduled_date}</TableCell>
                                            <TableCell>
                                                <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">{d.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground">No upcoming defenses.</p>
                        )}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}