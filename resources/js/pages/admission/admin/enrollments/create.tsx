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
import { ArrowLeft, Users } from 'lucide-react';

interface Applicant { id: number; application_number: string; first_name: string; last_name: string; program: { course: { id: number; code: string; name: string } } }
interface Term { id: number; academic_year: string; semester: string }
interface Course { id: number; code: string; name: string }

interface Props extends PageProps {
    acceptedApplicants: Applicant[];
    terms: Term[];
    courses: Course[];
    selectedApplicant: Applicant | null;
}

export default function EnrollmentCreate({ acceptedApplicants, terms, courses, selectedApplicant }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        applicant_id: selectedApplicant ? String(selectedApplicant.id) : '',
        academic_year: '',
        semester: '1st',
        year_level: '1',
        academic_term_id: '',
        section_id: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admission.admin.enrollments.store'));
    };

    return (
        <>
            <Head title="Create Enrollment" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.enrollments.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                    <div><h1 className="text-2xl font-bold tracking-tight">Create Enrollment</h1><p className="text-muted-foreground">Enroll an accepted applicant</p></div>
                </div>
                <form onSubmit={submit} className="max-w-3xl">
                    <Card><CardHeader><CardTitle>Enrollment Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Applicant *</Label>
                                {acceptedApplicants.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No accepted applicants available for enrollment.</p>
                                ) : (
                                    <Select value={data.applicant_id || 'noop'} onValueChange={(v: string | null) => setData('applicant_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select applicant" /></SelectTrigger>
                                        <SelectContent>{acceptedApplicants.map((a) => (
                                            <SelectItem key={a.id} value={String(a.id)}>{a.application_number} — {a.first_name} {a.last_name} ({a.program?.course?.code})</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                )}
                                {errors.applicant_id && <span className="text-xs text-destructive">{errors.applicant_id}</span>}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Term</Label>
                                    <Select value={data.academic_term_id || 'noop'} onValueChange={(v: string | null) => setData('academic_term_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
                                        <SelectContent>{terms.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Year Level</Label>
                                    <Select value={data.year_level || 'noop'} onValueChange={(v: string | null) => setData('year_level', (v === 'noop' ? '1' : v) ?? '1')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{[1, 2, 3, 4].map((y) => (<SelectItem key={y} value={String(y)}>Year {y}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Academic Year</Label>
                                    <Input value={data.academic_year} onChange={(e) => setData('academic_year', e.target.value)} placeholder="e.g., 2025-2026" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Semester</Label>
                                    <Select value={data.semester || 'noop'} onValueChange={(v: string | null) => setData('semester', (v === 'noop' ? '1st' : v) ?? '1st')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="1st">1st</SelectItem><SelectItem value="2nd">2nd</SelectItem><SelectItem value="Summer">Summer</SelectItem></SelectContent>
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
                        <Link href={route('admission.admin.enrollments.index')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</Link>
                        <Button type="submit" disabled={processing || acceptedApplicants.length === 0}>{processing ? 'Creating...' : 'Create Enrollment'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EnrollmentCreate.layout = (page: React.ReactNode) => <AppLayout children={page} />;