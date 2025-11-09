import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Candidates', href: voting.admin.candidates.index.url() },
    { title: 'Create', href: voting.admin.candidates.create.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Props {
    elections: Election[];
    positions: Position[];
    partylists: Partylist[];
    selectedElectionId: number;
    errors?: Record<string, string>;
}

export default function Create({ elections, positions, partylists, selectedElectionId, errors = {} }: Props) {
    const [selectedElection, setSelectedElection] = useState(selectedElectionId);

    const handleElectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const electionId = e.target.value;
        setSelectedElection(Number(electionId));
        router.get(voting.admin.candidates.create.url() + `?election_id=${electionId}`, {}, { preserveState: false });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(voting.admin.candidates.store.url(), formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Candidate" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Add New Candidate</h1>
                        <p className="text-sm text-gray-600 mt-1">Add a candidate to the election</p>
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

                        {/* Position */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="position_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Position <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="position_id"
                                    name="position_id"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((position) => (
                                        <option key={position.position_id} value={position.position_id}>
                                            {position.description}
                                        </option>
                                    ))}
                                </select>
                                {errors.position_id && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.position_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* First Name */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    required
                                    maxLength={30}
                                    className={errors.firstname ? 'border-red-500' : ''}
                                />
                                {errors.firstname && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.firstname}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Last Name */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    required
                                    maxLength={30}
                                    className={errors.lastname ? 'border-red-500' : ''}
                                />
                                {errors.lastname && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.lastname}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Partylist */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="partylist_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Partylist
                                </label>
                                <select
                                    id="partylist_id"
                                    name="partylist_id"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Independent</option>
                                    {partylists.map((partylist) => (
                                        <option key={partylist.partylist_id} value={partylist.partylist_id}>
                                            {partylist.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-gray-500">Leave empty for independent candidate</p>
                                {errors.partylist_id && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.partylist_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Photo */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                                    Photo
                                </label>
                                <Input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    className={errors.photo ? 'border-red-500' : ''}
                                />
                                <p className="mt-1 text-xs text-gray-500">Max 2MB, JPG/PNG</p>
                                {errors.photo && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.photo}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Platform */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                                    Platform / Bio
                                </label>
                                <Textarea
                                    id="platform"
                                    name="platform"
                                    rows={4}
                                    className={errors.platform ? 'border-red-500' : ''}
                                />
                                {errors.platform && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.platform}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Form Actions */}
                        <div className="flex gap-4 pt-4 border-t">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Add Candidate
                            </Button>
                            <Link href={voting.admin.candidates.index.url()}>
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
