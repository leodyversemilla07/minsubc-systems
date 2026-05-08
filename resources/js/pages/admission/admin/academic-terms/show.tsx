import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Edit, Trash2, CheckCircle } from 'lucide-react';

interface Fee {
    id: number;
    name: string;
    amount: number;
    type: string;
}

interface Section {
    id: number;
    name: string;
    course: { code: string; name: string };
}

interface TermData {
    id: number;
    academic_year: string;
    semester: string;
    status: string;
    is_active: boolean;
    enrollment_start: string;
    enrollment_end: string;
    classes_start: string | null;
    classes_end: string | null;
    notes: string | null;
    sections: Section[];
    fees: Fee[];
}

interface Props extends PageProps {
    term: TermData;
    stats: {
        total_sections: number;
        total_enrollments: number;
        active_enrollments: number;
        total_fees: number;
    };
}

export default function AcademicTermShow({ term, stats }: Props) {
    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this academic term?')) return;
        router.delete(route('admission.admin.terms.destroy', term.id), {
            onError: (err) => alert(Object.values(err).join('\n')),
        });
    };

    const handleSetActive = () => {
        router.post(route('admission.admin.terms.set-active', term.id));
    };

    const statusColors: Record<string, string> = {
        upcoming: 'secondary',
        enrollment: 'default',
        ongoing: 'default',
        ended: 'secondary',
    };

    return (
        <>
            <Head title={`Term: ${term.academic_year} ${term.semester}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.terms.index')} className="p-2 hover:bg-accent rounded-md">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{term.academic_year}</h1>
                            <p className="text-muted-foreground">{term.semester} Semester</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!term.is_active && (
                            <Button variant="outline" onClick={handleSetActive}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Set Active
                            </Button>
                        )}
                        <Link href={route('admission.admin.terms.edit', term.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant={(statusColors[term.status] || 'secondary') as 'default' | 'secondary'}>
                                {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                            </Badge>
                            {term.is_active && <Badge variant="secondary" className="ml-2">Active</Badge>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Sections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.total_sections}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Enrollments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.total_enrollments}</p>
                            <p className="text-sm text-muted-foreground">{stats.active_enrollments} active</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Fees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.total_fees}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Enrollment</span>
                                <span className="text-sm font-medium">
                                    {term.enrollment_start ? new Date(term.enrollment_start).toLocaleDateString() : '-'}
                                    {' — '}
                                    {term.enrollment_end ? new Date(term.enrollment_end).toLocaleDateString() : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Classes</span>
                                <span className="text-sm font-medium">
                                    {term.classes_start ? new Date(term.classes_start).toLocaleDateString() : 'TBD'}
                                    {term.classes_end ? ` — ${new Date(term.classes_end).toLocaleDateString()}` : ''}
                                </span>
                            </div>
                            {term.notes && (
                                <div>
                                    <span className="text-sm text-muted-foreground">Notes</span>
                                    <p className="mt-1 text-sm">{term.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Fees ({stats.total_fees})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {term.fees.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No fees configured.</p>
                            ) : (
                                <div className="space-y-2">
                                    {term.fees.map((fee) => (
                                        <div key={fee.id} className="flex justify-between text-sm">
                                            <span>{fee.name}</span>
                                            <span className="font-medium">₱{Number(fee.amount).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Sections ({stats.total_sections})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {term.sections.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No sections assigned.</p>
                        ) : (
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {term.sections.map((section: any) => (
                                    <div key={section.id} className="rounded-md border p-3 text-sm">
                                        <p className="font-medium">{section.name}</p>
                                        <p className="text-muted-foreground">{section.course?.code ?? '-'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AcademicTermShow.layout = (page: React.ReactNode) => <AppLayout children={page} />;