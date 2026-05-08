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

interface Course {
    id: number;
    code: string;
    name: string;
}

interface Props extends PageProps {
    courses: Course[];
    selectedCourse?: Course | null;
}

export default function SubjectCreate({ courses, selectedCourse }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: selectedCourse?.id ? String(selectedCourse.id) : '',
        code: '',
        name: '',
        description: '',
        units: '3',
        semester: '1st',
        year_level: '1',
        type: 'lec',
        lab_hours: '0',
        lec_hours: '0',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admission.admin.subjects.store'));
    };

    return (
        <>
            <Head title="Create Subject" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.subjects.index')} className="p-2 hover:bg-accent rounded-md">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Subject</h1>
                        <p className="text-muted-foreground">Add a new subject to the curriculum</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subject Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="course_id">Course *</Label>
                                    <Select
                                        value={data.course_id || 'noop'}
                                        onValueChange={(v: string | null) => setData("course_id", (v === "noop" ? "" : v) ?? "")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((c) => (
                                                <SelectItem key={c.id} value={String(c.id)}>
                                                    {c.code} — {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.course_id && <span className="text-xs text-destructive">{errors.course_id}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code">Subject Code *</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="e.g., IT101"
                                    />
                                    {errors.code && <span className="text-xs text-destructive">{errors.code}</span>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Subject Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Introduction to Computing"
                                />
                                {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="space-y-2">
                                    <Label htmlFor="units">Units *</Label>
                                    <Input
                                        id="units"
                                        type="number"
                                        min={1}
                                        max={10}
                                        value={data.units}
                                        onChange={(e) => setData('units', e.target.value)}
                                    />
                                    {errors.units && <span className="text-xs text-destructive">{errors.units}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year_level">Year Level *</Label>
                                    <Select
                                        value={data.year_level || 'noop'}
                                        onValueChange={(v: string | null) => setData("year_level", (v === "noop" ? "1" : v) ?? "1")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4].map((y) => (
                                                <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.year_level && <span className="text-xs text-destructive">{errors.year_level}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester *</Label>
                                    <Select
                                        value={data.semester || 'noop'}
                                        onValueChange={(v: string | null) => setData("semester", (v === "noop" ? "1st" : v) ?? "1st")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">1st</SelectItem>
                                            <SelectItem value="2nd">2nd</SelectItem>
                                            <SelectItem value="Summer">Summer</SelectItem>
                                            <SelectItem value="All">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && <span className="text-xs text-destructive">{errors.semester}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Type *</Label>
                                    <Select
                                        value={data.type || 'noop'}
                                        onValueChange={(v: string | null) => setData("type", (v === "noop" ? "lec" : v) ?? "lec")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lec">Lecture</SelectItem>
                                            <SelectItem value="lab">Laboratory</SelectItem>
                                            <SelectItem value="both">Both</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <span className="text-xs text-destructive">{errors.type}</span>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lec_hours">Lecture Hours</Label>
                                    <Input
                                        id="lec_hours"
                                        type="number"
                                        min={0}
                                        value={data.lec_hours}
                                        onChange={(e) => setData('lec_hours', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lab_hours">Lab Hours</Label>
                                    <Input
                                        id="lab_hours"
                                        type="number"
                                        min={0}
                                        value={data.lab_hours}
                                        onChange={(e) => setData('lab_hours', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(v) => setData('is_active', v === true)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.subjects.index')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                            Cancel
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Subject'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SubjectCreate.layout = (page: React.ReactNode) => <AppLayout children={page} />;