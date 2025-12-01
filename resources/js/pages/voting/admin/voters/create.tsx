import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

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

export default function Create({
    elections,
    availableStudents,
    selectedElectionId,
    errors = {},
}: Props) {
    const [selectedElection, setSelectedElection] =
        useState(selectedElectionId);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const handleElectionChange = (value: string) => {
        setSelectedElection(Number(value));
        router.get(
            voting.admin.voters.create.url() + `?election_id=${value}`,
            {},
            { preserveState: false },
        );
    };

    const handleStudentToggle = (studentId: string) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId],
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Generate Voters" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">Generate Voters in Bulk</h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Create voter accounts from student records
                    </p>
                </div>

                <Form action={voting.admin.voters.store.url()} method="post">
                    {({ processing }) => (
                        <FieldGroup>
                            {/* Election */}
                            <Field>
                                <FieldLabel htmlFor="election_id">
                                    Election{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <input
                                    type="hidden"
                                    name="election_id"
                                    value={selectedElection}
                                />
                                <Select
                                    value={selectedElection.toString()}
                                    onValueChange={handleElectionChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select election" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {elections.map((election) => (
                                            <SelectItem
                                                key={election.id}
                                                value={election.id.toString()}
                                            >
                                                {election.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.election_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.election_id}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Generation Batch & Prefix */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="generation_batch">
                                        Generation Batch{' '}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        id="generation_batch"
                                        name="generation_batch"
                                        defaultValue={1}
                                        required
                                        min={1}
                                        className={
                                            errors.generation_batch
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        For tracking purposes
                                    </p>
                                    {errors.generation_batch && (
                                        <FieldError>
                                            <AlertCircle className="mr-1 h-4 w-4" />
                                            {errors.generation_batch}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="prefix">
                                        Prefix (Optional)
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        id="prefix"
                                        name="prefix"
                                        maxLength={10}
                                        placeholder="e.g., 2025"
                                    />
                                </Field>
                            </div>

                            {/* Default Password */}
                            <Field>
                                <FieldLabel htmlFor="default_password">
                                    Default Password
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id="default_password"
                                    name="default_password"
                                    defaultValue="password"
                                />
                                <p className="text-xs text-muted-foreground">
                                    All voters will use this password initially
                                </p>
                            </Field>

                            {/* Select Students */}
                            <Field>
                                <FieldLabel>
                                    Select Students{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <div className="rounded-lg border bg-muted p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Available Students:{' '}
                                            {availableStudents.length}
                                        </span>
                                        <span className="text-sm font-medium text-primary">
                                            {selectedStudents.length} selected
                                        </span>
                                    </div>
                                    {availableStudents.length === 0 ? (
                                        <p className="py-8 text-center text-muted-foreground">
                                            All active students are already
                                            voters for this election
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {availableStudents.map((student) => (
                                                <label
                                                    key={student.student_id}
                                                    className="flex cursor-pointer items-center rounded-lg border bg-background p-3 hover:border-primary"
                                                >
                                                    <Checkbox
                                                        name="student_ids[]"
                                                        value={student.student_id}
                                                        checked={selectedStudents.includes(
                                                            student.student_id,
                                                        )}
                                                        onCheckedChange={() =>
                                                            handleStudentToggle(
                                                                student.student_id,
                                                            )
                                                        }
                                                        className="mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">
                                                            {student.user.full_name}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {student.course} -{' '}
                                                            {student.year_level} -{' '}
                                                            {student.campus}
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.student_ids && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.student_ids}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Actions */}
                            <Field>
                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <Link
                                        href={voting.admin.voters.index.url()}
                                        className="w-full sm:w-auto"
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full sm:w-auto"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={
                                            selectedStudents.length === 0 ||
                                            processing
                                        }
                                        className="w-full sm:w-auto"
                                    >
                                        {processing
                                            ? 'Generating...'
                                            : 'Generate Voters'}
                                    </Button>
                                </div>
                            </Field>
                        </FieldGroup>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
