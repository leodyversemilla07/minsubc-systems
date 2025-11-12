import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Partylists', href: voting.admin.partylists.index.url() },
    { title: 'Create', href: voting.admin.partylists.create.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Props {
    elections: Election[];
    selectedElectionId: number;
    errors?: Record<string, string>;
}

export default function Create({
    elections,
    selectedElectionId,
    errors = {},
}: Props) {
    const [selectedElection, setSelectedElection] =
        useState(selectedElectionId);

    const handleElectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const electionId = e.target.value;
        setSelectedElection(Number(electionId));
        router.get(
            voting.admin.partylists.create.url() + `?election_id=${electionId}`,
            {},
            { preserveState: false },
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(voting.admin.partylists.store.url(), formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Partylist" />

            <div className="max-w-3xl">
                <div className="rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add New Partylist
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Create a new political party or group
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Election */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="election_id"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Election{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="election_id"
                                    name="election_id"
                                    required
                                    value={selectedElection}
                                    onChange={handleElectionChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    {elections.map((election) => (
                                        <option
                                            key={election.id}
                                            value={election.id}
                                        >
                                            {election.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.election_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.election_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Partylist Name */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Partylist Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    maxLength={255}
                                    placeholder="e.g., Fearless Party, Independent Alliance"
                                    className={
                                        errors.name ? 'border-red-500' : ''
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

                        {/* Form Actions */}
                        <div className="flex gap-4 border-t pt-4">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Create Partylist
                            </Button>
                            <Link href={voting.admin.partylists.index.url()}>
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
