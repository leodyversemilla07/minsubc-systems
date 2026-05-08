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

interface Course { id: number; code: string; name: string }
interface Term { id: number; academic_year: string; semester: string }
interface Adviser { id: number; name: string }

interface SectionData {
    id: number;
    academic_term_id: number;
    course_id: number;
    name: string;
    year_level: number;
    max_students: number | null;
    adviser_id: number | null;
    room: string | null;
    notes: string | null;
    course: Course;
    academic_term: Term;
}

interface Props extends PageProps {
    section: SectionData;
    terms: Term[];
    courses: Course[];
    advisers: Adviser[];
}

export default function SectionEdit({ section, terms, courses, advisers }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        academic_term_id: String(section.academic_term_id),
        course_id: String(section.course_id),
        name: section.name,
        year_level: String(section.year_level),
        max_students: String(section.max_students ?? '40'),
        adviser_id: section.adviser_id ? String(section.adviser_id) : '',
        room: section.room ?? '',
        notes: section.notes ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admission.admin.sections.update', section.id));
    };

    return (
        <>
            <Head title={`Edit: ${section.name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.sections.show', section.id)} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                    <div><h1 className="text-2xl font-bold tracking-tight">Edit Section</h1><p className="text-muted-foreground">{section.name}</p></div>
                </div>
                <form onSubmit={submit} className="max-w-3xl">
                    <Card><CardHeader><CardTitle>Section Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Term *</Label>
                                    <Select value={data.academic_term_id || 'noop'} onValueChange={(v: string | null) => setData('academic_term_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{terms.map((t) => (
                                            <SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Course *</Label>
                                    <Select value={data.course_id || 'noop'} onValueChange={(v: string | null) => setData('course_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{courses.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>{c.code} — {c.name}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Section Name *</Label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Year Level *</Label>
                                    <Select value={data.year_level || 'noop'} onValueChange={(v: string | null) => setData('year_level', (v === 'noop' ? '1' : v) ?? '1')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{[1, 2, 3, 4].map((y) => (<SelectItem key={y} value={String(y)}>Year {y}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Max Students</Label>
                                    <Input type="number" min={1} max={200} value={data.max_students} onChange={(e) => setData('max_students', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Adviser</Label>
                                    <Select value={data.adviser_id || 'noop'} onValueChange={(v: string | null) => setData('adviser_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                                        <SelectContent><SelectItem value="">None</SelectItem>
                                            {advisers.map((a) => (<SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Room</Label>
                                    <Input value={data.room} onChange={(e) => setData('room', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.sections.show', section.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</Link>
                        <Button type="submit" disabled={processing}>{processing ? 'Updating...' : 'Update Section'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SectionEdit.layout = (page: React.ReactNode) => <AppLayout children={page} />;