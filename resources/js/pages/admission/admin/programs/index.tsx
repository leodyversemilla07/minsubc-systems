import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Program {
    id: number;
    name: string;
    course: string;
    course_code: string;
    academic_year: string;
    semester: string;
    slots: number;
    slots_filled: number;
    slots_available: number;
    status: string;
    applicants_count: number;
    application_period: string;
}

interface Course {
    id: number;
    code: string;
    name: string;
}

interface ProgramsPageProps extends PageProps {
    programs: { data: Program[] };
    courses: Course[];
}

export default function ProgramsIndex({ programs, courses }: ProgramsPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        academic_year: '',
        semester: '1st',
        name: '',
        description: '',
        slots: '30',
        application_start: '',
        application_end: '',
        status: 'open',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admission.admin.programs.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    course_id: '', academic_year: '', semester: '1st', name: '',
                    description: '', slots: '30', application_start: '', application_end: '', status: 'open',
                });
            },
        });
    }

    return (
        <>
            <Head title="Programs" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Offered Programs
                    </h1>
                    <Link href={route('admission.admin.programs.create')}>
                        <Button>Add Program</Button>
                    </Link>
                </div>

                {/* Programs Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Period</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slots</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applicants</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {programs.data.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{p.course}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{p.application_period}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className="font-medium">{p.slots_filled}</span>
                                        <span className="text-gray-500">/{p.slots}</span>
                                        {p.slots_available < 5 && (
                                            <span className="ml-1 text-xs text-amber-600">({p.slots_available} left)</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{p.applicants_count}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                            p.status === 'open' ? 'bg-green-100 text-green-700' :
                                            p.status === 'full' ? 'bg-orange-100 text-orange-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>{p.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={route('admission.admin.programs.edit', p.id)}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {programs.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-sm text-gray-500">
                                        No programs yet. Click "Add Program" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

ProgramsIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;