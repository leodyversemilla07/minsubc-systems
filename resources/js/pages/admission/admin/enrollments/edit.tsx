import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface EnrollmentData {
    id: number;
    student_id: string | null;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    notes: string | null;
    applicant: { first_name: string; last_name: string; application_number: string } | null;
    user: { id: number; name: string } | null;
    section: { id: number; name: string; course: { id: number; code: string; name: string } } | null;
    academic_term: { id: number; academic_year: string; semester: string } | null;
}

interface Term { id: number; academic_year: string; semester: string }
interface Section { id: number; name: string }

interface Props extends PageProps {
    enrollment: EnrollmentData;
    terms: Term[];
    sections: Section[];
}

export default function EnrollmentEdit({ enrollment, terms, sections }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        section_id: enrollment.section?.id ? String(enrollment.section.id) : '',
        academic_term_id: enrollment.academic_term?.id ? String(enrollment.academic_term.id) : '',
        year_level: enrollment.year_level ?? '1',
        academic_year: enrollment.academic_year ?? '',
        semester: enrollment.semester ?? '1st',
        status: enrollment.status ?? 'confirmed',
        notes: enrollment.notes ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admission.admin.enrollments.update', enrollment.id));
    };

    return (
        <>
            <Head title="Edit Enrollment" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.enrollments.show', enrollment.id)} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Enrollment</h1>
                        <p className="text-muted-foreground">{enrollment.applicant ? `${enrollment.applicant.first_name} ${enrollment.applicant.last_name}` : enrollment.user?.name}</p>
                    </div>
                </div>
                <form onSubmit={submit} className="max-w-3xl">
                    <Card><CardHeader><CardTitle>Enrollment Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Term</Label>
                                    <Select value={data.academic_term_id || 'noop'} onValueChange={(v: string | null) => setData('academic_term_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{terms.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select value={data.status || 'noop'} onValueChange={(v: string | null) => setData('status', (v === 'noop' ? 'confirmed' : v) ?? 'confirmed')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="confirmed">Confirmed</SelectItem><SelectItem value="enrolled">Enrolled</SelectItem><SelectItem value="dropped">Dropped</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Year Level</Label>
                                    <Select value={data.year_level || 'noop'} onValueChange={(v: string | null) => setData('year_level', (v === 'noop' ? '1' : v) ?? '1')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{[1, 2, 3, 4].map((y) => (<SelectItem key={y} value={String(y)}>Year {y}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Section</Label>
                                    <Select value={data.section_id || 'noop'} onValueChange={(v: string | null) => setData('section_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Not assigned" /></SelectTrigger>
                                        <SelectContent><SelectItem value="">None</SelectItem>
                                            {sections.map((s) => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.enrollments.show', enrollment.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</Link>
                        <Button type="submit" disabled={processing}>{processing ? 'Updating...' : 'Update Enrollment'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EnrollmentEdit.layout = (page: React.ReactNode) => <AppLayout children={page} />;