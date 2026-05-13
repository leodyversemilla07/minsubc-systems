import { Head, Link } from '@inertiajs/react';
import { BookOpen, FileText, ClipboardList, BookCheck, BarChart3, Target, GraduationCap, FileSignature } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface DashboardStats {
    total_programs: number;
    total_courses: number;
    total_curricula: number;
    total_syllabi: number;
    published_syllabi: number;
    draft_syllabi: number;
    total_program_outcomes: number;
    total_course_outcomes: number;
    programs: Array<{ id: number; name: string; code: string; curricula_count: number; outcomes_count: number }>;
    recent_syllabi: Array<{ id: number; title: string; course: { code: string; name: string } | null; status: string }>;
    recent_curricula: Array<{ id: number; name: string; program: { name: string } | null; status: string }>;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const cards = [
        { title: 'Programs', value: stats.total_programs, icon: BookOpen, color: 'text-blue-600', href: route('curriculum.admin.programs.index') },
        { title: 'Courses', value: stats.total_courses, icon: FileText, color: 'text-green-600', href: route('curriculum.admin.courses.index') },
        { title: 'Curricula', value: stats.total_curricula, icon: ClipboardList, color: 'text-purple-600', href: route('curriculum.admin.curricula.index') },
        { title: 'Syllabi', value: stats.total_syllabi, icon: BookCheck, color: 'text-cyan-600', href: route('curriculum.admin.syllabi.index') },
        { title: 'Published', value: stats.published_syllabi, icon: BookCheck, color: 'text-emerald-600' },
        { title: 'Drafts', value: stats.draft_syllabi, icon: FileSignature, color: 'text-yellow-600' },
        { title: 'Program Outcomes', value: stats.total_program_outcomes, icon: Target, color: 'text-indigo-600' },
        { title: 'Course Outcomes', value: stats.total_course_outcomes, icon: GraduationCap, color: 'text-orange-600' },
    ];

    return (
        <AppLayout>
            <Head title="Curriculum Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Curriculum Management Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => {
                        const content = (
                            <Card className={card.href ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className={`${card.color} h-5 w-5`} />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{card.value}</div></CardContent>
                            </Card>
                        );
                        return card.href ? <Link key={card.title} href={card.href}>{content}</Link> : <div key={card.title}>{content}</div>;
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg">Programs Overview</CardTitle>
                        {stats.programs?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Program</TableHead>
                                        <TableHead className="text-right">Curricula</TableHead>
                                        <TableHead className="text-right">Outcomes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.programs.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-mono text-sm">{p.code}</TableCell>
                                            <TableCell className="font-medium">{p.name}</TableCell>
                                            <TableCell className="text-right">{p.curricula_count}</TableCell>
                                            <TableCell className="text-right">{p.outcomes_count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground text-sm">No programs yet.</p>}
                    </Card>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <CardTitle className="mb-3 text-lg">Recent Syllabi</CardTitle>
                            {stats.recent_syllabi?.length ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recent_syllabi.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="max-w-xs truncate font-medium">{s.title}</TableCell>
                                                <TableCell>
                                                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${s.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{s.status}</span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : <p className="text-muted-foreground text-sm">No recent syllabi.</p>}
                        </Card>

                        <Card className="p-6">
                            <CardTitle className="mb-3 text-lg">Recent Curricula</CardTitle>
                            {stats.recent_curricula?.length ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Program</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recent_curricula.map((c) => (
                                            <TableRow key={c.id}>
                                                <TableCell className="max-w-xs truncate font-medium">{c.name}</TableCell>
                                                <TableCell>{c.program?.name ?? '—'}</TableCell>
                                                <TableCell><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{c.status}</span></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : <p className="text-muted-foreground text-sm">No recent curricula.</p>}
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}