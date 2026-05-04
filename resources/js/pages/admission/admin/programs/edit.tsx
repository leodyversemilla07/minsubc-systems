import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Course {
    id: number;
    code: string;
    name: string;
}

interface Program {
    id: number;
    course_id: number;
    name: string;
    academic_year: string;
    semester: string;
    description: string | null;
    slots: number;
    application_start: string;
    application_end: string;
    status: string;
    course: { id: number; code: string; name: string };
}

interface EditProgramPageProps extends PageProps {
    program: Program;
    courses: Course[];
}

export default function EditProgram({ program, courses }: EditProgramPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: String(program.course_id),
        academic_year: program.academic_year,
        semester: program.semester,
        name: program.name,
        description: program.description || '',
        slots: String(program.slots),
        application_start: program.application_start,
        application_end: program.application_end,
        status: program.status,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admission.admin.programs.update', program.id));
    }

    return (
        <>
            <Head title="Edit Program" />

            <div className="space-y-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Program</h1>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Label>Course *</Label>
                                <Select value={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select course..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>
                                                {c.code} — {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.course_id && <p className="mt-1 text-sm text-red-600">{errors.course_id}</p>}
                            </div>
                            <div>
                                <Label>Program Name *</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <Label>Academic Year *</Label>
                                <Input value={data.academic_year} onChange={(e) => setData('academic_year', e.target.value)} className="mt-1" />
                                {errors.academic_year && <p className="mt-1 text-sm text-red-600">{errors.academic_year}</p>}
                            </div>
                            <div>
                                <Label>Semester *</Label>
                                <Select value={data.semester} onValueChange={(v) => setData('semester', v)}>
                                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Semester</SelectItem>
                                        <SelectItem value="2nd">2nd Semester</SelectItem>
                                        <SelectItem value="Summer">Summer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Slots *</Label>
                                <Input type="number" min={1} value={data.slots} onChange={(e) => setData('slots', e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label>Status *</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                        <SelectItem value="full">Full</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Application Start *</Label>
                                <Input type="date" value={data.application_start} onChange={(e) => setData('application_start', e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label>Application End *</Label>
                                <Input type="date" value={data.application_end} onChange={(e) => setData('application_end', e.target.value)} className="mt-1" />
                            </div>
                            <div className="sm:col-span-2">
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.get(route('admission.admin.programs.index'))}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Program'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditProgram.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;