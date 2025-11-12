import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: 'active' | 'ended';
    end_time: string | null;
}

interface Props {
    election: Election;
    errors?: Record<string, string>;
}

export default function Edit({ election, errors = {} }: Props) {
    // Format end_time for datetime-local input
    const formattedEndTime = election.end_time
        ? new Date(election.end_time).toISOString().slice(0, 16)
        : '';

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Elections', href: voting.admin.elections.index.url() },
        {
            title: election.name,
            href: voting.admin.elections.show.url({ election: election.id }),
        },
        {
            title: 'Edit',
            href: voting.admin.elections.edit.url({ election: election.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Election" />

            <div className="max-w-3xl">
                <div className="rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Election
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update election details
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        action={voting.admin.elections.update.url({
                            election: election.id,
                        })}
                        method="post"
                    >
                        {({ processing }) => (
                            <div className="space-y-6 p-6">
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />

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
                                            defaultValue={election.name}
                                            required
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

                                {/* Election Code (Read-only) */}
                                <FieldGroup>
                                    <Field>
                                        <label
                                            htmlFor="election_code"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Election Code
                                        </label>
                                        <Input
                                            type="text"
                                            id="election_code"
                                            value={election.election_code}
                                            disabled
                                            className="bg-gray-50 text-gray-500"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Election code cannot be changed
                                        </p>
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
                                            defaultValue={formattedEndTime}
                                            className={
                                                errors.end_time
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        />
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
                                            defaultValue={election.status}
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
                                            ? 'Updating...'
                                            : 'Update Election'}
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
