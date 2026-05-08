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

interface Props extends PageProps {
    terms: Term[];
    courses: Course[];
    selectedTerm: Term | null;
    selectedCourse: Course | null;
}

export default function SectionCreate({ terms, courses, selectedTerm, selectedCourse }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        academic_term_id: selectedTerm ? String(selectedTerm.id) : '',
        course_id: selectedCourse ? String(selectedCourse.id) : '',
        name: '',
        year_level: '1',
        max_students: '40',
        room: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admission.admin.sections.store'));
    };

    return (
        <>
            <Head title="Create Section" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.sections.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                    <div><h1 className="text-2xl font-bold tracking-tight">Create Section</h1><p className="text-muted-foreground">Add a new class section</p></div>
                </div>
                <form onSubmit={submit} className="max-w-3xl">
                    <Card><CardHeader><CardTitle>Section Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Term *</Label>
                                    <Select value={data.academic_term_id || 'noop'} onValueChange={(v: string | null) => setData('academic_term_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
                                        <SelectContent>{terms.map((t) => (
                                            <SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    {errors.academic_term_id && <span className="text-xs text-destructive">{errors.academic_term_id}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Course *</Label>
                                    <Select value={data.course_id || 'noop'} onValueChange={(v: string | null) => setData('course_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                                        <SelectContent>{courses.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>{c.code} — {c.name}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    {errors.course_id && <span className="text-xs text-destructive">{errors.course_id}</span>}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Section Name *</Label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g., BSIT-1A" />
                                    {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Year Level *</Label>
                                    <Select value={data.year_level || 'noop'} onValueChange={(v: string | null) => setData('year_level', (v === 'noop' ? '1' : v) ?? '1')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{[1, 2, 3, 4].map((y) => (<SelectItem key={y} value={String(y)}>Year {y}</SelectItem>))}</SelectContent>
                                    </Select>
                                    {errors.year_level && <span className="text-xs text-destructive">{errors.year_level}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Max Students</Label>
                                    <Input type="number" min={1} max={200} value={data.max_students} onChange={(e) => setData('max_students', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Room</Label>
                                <Input value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="e.g., Rm 201" />
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.sections.index')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</Link>
                        <Button type="submit" disabled={processing}>{processing ? 'Creating...' : 'Create Section'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SectionCreate.layout = (page: React.ReactNode) => <AppLayout children={page} />;