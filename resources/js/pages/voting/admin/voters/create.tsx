import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Voters', href: voting.admin.voters.index.url() },
    { title: 'Create', href: voting.admin.voters.create.url() },
];

interface Election {
    id: number;
    name: string;
}

interface User {
    full_name: string;
}

interface Student {
    student_id: string;
    course?: string;
    year_level?: string;
    campus?: string;
    user: User;
}

interface Props {
    elections: Election[];
    availableStudents: Student[];
    selectedElectionId: number;
    errors?: Record<string, string>;
}

export default function Create({ elections, availableStudents, selectedElectionId, errors = {} }: Props) {
    const [selectedElection, setSelectedElection] = useState(selectedElectionId);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const handleElectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const electionId = e.target.value;
        setSelectedElection(Number(electionId));
        router.get(voting.admin.voters.create.url() + `?election_id=${electionId}`, {}, { preserveState: false });
    };

    const handleStudentToggle = (studentId: string) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(voting.admin.voters.store.url(), formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Generate Voters" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Generate Voters in Bulk</h1>
                        <p className="text-sm text-gray-600 mt-1">Create voter accounts from student records</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Election */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="election_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Election <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="election_id"
                                    name="election_id"
                                    required
                                    value={selectedElection}
                                    onChange={handleElectionChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {elections.map((election) => (
                                        <option key={election.id} value={election.id}>
                                            {election.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.election_id && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.election_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Generation Batch & Prefix */}
                        <div className="grid grid-cols-2 gap-4">
                            <FieldGroup>
                                <Field>
                                    <label
                                        htmlFor="generation_batch"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Generation Batch <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="number"
                                        id="generation_batch"
                                        name="generation_batch"
                                        defaultValue={1}
                                        required
                                        min={1}
                                        className={errors.generation_batch ? 'border-red-500' : ''}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">For tracking purposes</p>
                                    {errors.generation_batch && (
                                        <FieldError>
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.generation_batch}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>

                            <FieldGroup>
                                <Field>
                                    <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 mb-2">
                                        Prefix (Optional)
                                    </label>
                                    <Input
                                        type="text"
                                        id="prefix"
                                        name="prefix"
                                        maxLength={10}
                                        placeholder="e.g., 2025"
                                    />
                                </Field>
                            </FieldGroup>
                        </div>

                        {/* Default Password */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="default_password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Default Password
                                </label>
                                <Input
                                    type="text"
                                    id="default_password"
                                    name="default_password"
                                    defaultValue="password"
                                />
                                <p className="mt-1 text-xs text-gray-500">All voters will use this password initially</p>
                            </Field>
                        </FieldGroup>

                        {/* Select Students */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Students <span className="text-red-500">*</span>
                            </label>
                            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                <div className="mb-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Available Students: {availableStudents.length}
                                    </span>
                                    <span className="text-sm font-medium text-blue-600">
                                        {selectedStudents.length} selected
                                    </span>
                                </div>
                                {availableStudents.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">
                                        All active students are already voters for this election
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {availableStudents.map((student) => (
                                            <label
                                                key={student.student_id}
                                                className="flex items-center p-3 bg-white rounded-lg border hover:border-blue-500 cursor-pointer"
                                            >
                                                <Checkbox
                                                    name="student_ids[]"
                                                    value={student.student_id}
                                                    checked={selectedStudents.includes(student.student_id)}
                                                    onCheckedChange={() => handleStudentToggle(student.student_id)}
                                                    className="mr-3"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-800">
                                                        {student.user.full_name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {student.course} - {student.year_level} - {student.campus}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.student_ids && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.student_ids}
                                </p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-4 pt-4 border-t">
                            <Button
                                type="submit"
                                disabled={selectedStudents.length === 0}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                Generate Voters
                            </Button>
                            <Link href={voting.admin.voters.index.url()}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
