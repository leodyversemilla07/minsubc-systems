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
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function AcademicTermCreate() {
    const { data, setData, post, processing, errors } = useForm({
        academic_year: '',
        semester: '1st',
        enrollment_start: '',
        enrollment_end: '',
        classes_start: '',
        classes_end: '',
        status: 'upcoming',
        is_active: false,
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admission.admin.terms.store'));
    };

    return (
        <>
            <Head title="Create Academic Term" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.terms.index')} className="p-2 hover:bg-accent rounded-md">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Academic Term</h1>
                        <p className="text-muted-foreground">Add a new academic year and semester</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Term Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="academic_year">Academic Year *</Label>
                                    <Input
                                        id="academic_year"
                                        value={data.academic_year}
                                        onChange={(e) => setData('academic_year', e.target.value)}
                                        placeholder="e.g., 2025-2026"
                                    />
                                    {errors.academic_year && <span className="text-xs text-destructive">{errors.academic_year}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester *</Label>
                                    <Select
                                        value={data.semester || 'noop'}
                                        onValueChange={(v: string | null) => setData('semester', (v === 'noop' ? '1st' : v) ?? '1st')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">1st</SelectItem>
                                            <SelectItem value="2nd">2nd</SelectItem>
                                            <SelectItem value="Summer">Summer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && <span className="text-xs text-destructive">{errors.semester}</span>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="enrollment_start">Enrollment Start *</Label>
                                    <Input
                                        id="enrollment_start"
                                        type="date"
                                        value={data.enrollment_start}
                                        onChange={(e) => setData('enrollment_start', e.target.value)}
                                    />
                                    {errors.enrollment_start && <span className="text-xs text-destructive">{errors.enrollment_start}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="enrollment_end">Enrollment End *</Label>
                                    <Input
                                        id="enrollment_end"
                                        type="date"
                                        value={data.enrollment_end}
                                        onChange={(e) => setData('enrollment_end', e.target.value)}
                                    />
                                    {errors.enrollment_end && <span className="text-xs text-destructive">{errors.enrollment_end}</span>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="classes_start">Classes Start</Label>
                                    <Input
                                        id="classes_start"
                                        type="date"
                                        value={data.classes_start}
                                        onChange={(e) => setData('classes_start', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="classes_end">Classes End</Label>
                                    <Input
                                        id="classes_end"
                                        type="date"
                                        value={data.classes_end}
                                        onChange={(e) => setData('classes_end', e.target.value)}
                                    />
                                    {errors.classes_end && <span className="text-xs text-destructive">{errors.classes_end}</span>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status || 'noop'}
                                        onValueChange={(v: string | null) => setData('status', (v === 'noop' ? 'upcoming' : v) ?? 'upcoming')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="enrollment">Enrollment</SelectItem>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="ended">Ended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <span className="text-xs text-destructive">{errors.status}</span>}
                                </div>
                                <div className="flex items-end gap-2 pb-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(v) => setData('is_active', v === true)}
                                    />
                                    <Label htmlFor="is_active">Set as active term</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.terms.index')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                            Cancel
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Term'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

AcademicTermCreate.layout = (page: React.ReactNode) => <AppLayout children={page} />;