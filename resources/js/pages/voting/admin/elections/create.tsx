import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Elections', href: voting.admin.elections.index.url() },
    { title: 'Create', href: voting.admin.elections.create.url() },
];

interface Props {
    errors?: Record<string, string>;
}

export default function Create({ errors = {} }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Election" />

            <div className="max-w-3xl">
                <div className="rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create New Election
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Set up a new election cycle
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        action={voting.admin.elections.store.url()}
                        method="post"
                    >
                        {({ processing }) => (
                            <div className="space-y-6 p-6">
                                {/* Election Name */}
                                <FieldGroup>
                                    <Field>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Election Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="e.g., Student Council Election 2025"
                                            className={
                                                errors.name
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        {errors.name && (
                                            <FieldError>
                                                <AlertCircle className="mr-1 h-4 w-4" />
                                                {errors.name}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* End Time */}
                                <FieldGroup>
                                    <Field>
                                        <label
                                            htmlFor="end_time"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            End Time
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            id="end_time"
                                            name="end_time"
                                            className={
                                                errors.end_time
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Leave empty for no end time limit
                                        </p>
                                        {errors.end_time && (
                                            <FieldError>
                                                <AlertCircle className="mr-1 h-4 w-4" />
                                                {errors.end_time}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* Status */}
                                <FieldGroup>
                                    <Field>
                                        <label
                                            htmlFor="status"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Status{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="ended">Ended</option>
                                        </select>
                                        {errors.status && (
                                            <FieldError>
                                                <AlertCircle className="mr-1 h-4 w-4" />
                                                {errors.status}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* Form Actions */}
                                <div className="flex gap-4 border-t pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing
                                            ? 'Creating...'
                                            : 'Create Election'}
                                    </Button>
                                    <Link
                                        href={voting.admin.elections.index.url()}
                                    >
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
