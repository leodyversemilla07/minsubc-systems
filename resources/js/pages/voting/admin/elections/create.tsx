import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

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
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Create New Election</h1>
                        <p className="text-sm text-gray-600 mt-1">Set up a new election cycle</p>
                    </div>

                    {/* Form */}
                    <Form action={voting.admin.elections.store.url()} method="post">
                        {({ processing }) => (
                            <div className="p-6 space-y-6">
                                {/* Election Name */}
                                <FieldGroup>
                                    <Field>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Election Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="e.g., Student Council Election 2025"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && (
                                            <FieldError>
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.name}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* End Time */}
                                <FieldGroup>
                                    <Field>
                                        <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                                            End Time
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            id="end_time"
                                            name="end_time"
                                            className={errors.end_time ? 'border-red-500' : ''}
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Leave empty for no end time limit
                                        </p>
                                        {errors.end_time && (
                                            <FieldError>
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.end_time}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* Status */}
                                <FieldGroup>
                                    <Field>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="active">Active</option>
                                            <option value="ended">Ended</option>
                                        </select>
                                        {errors.status && (
                                            <FieldError>
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.status}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                {/* Form Actions */}
                                <div className="flex gap-4 pt-4 border-t">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Creating...' : 'Create Election'}
                                    </Button>
                                    <Link href={voting.admin.elections.index.url()}>
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
