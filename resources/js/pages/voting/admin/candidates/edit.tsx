import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

interface Position {
    position_id: number;
    description: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Candidate {
    candidate_id: number;
    firstname: string;
    lastname: string;
    photo: string | null;
    platform: string | null;
    position_id: number;
    partylist_id: number | null;
    election_id: number;
}

interface Props {
    candidate: Candidate;
    positions: Position[];
    partylists: Partylist[];
    errors?: Record<string, string>;
}

export default function Edit({
    candidate,
    positions,
    partylists,
    errors = {},
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Candidates', href: voting.admin.candidates.index.url() },
        {
            title: `${candidate.firstname} ${candidate.lastname}`,
            href: voting.admin.candidates.show.url({
                candidate: candidate.candidate_id,
            }),
        },
        {
            title: 'Edit',
            href: voting.admin.candidates.edit.url({
                candidate: candidate.candidate_id,
            }),
        },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('_method', 'PUT');
        router.post(
            voting.admin.candidates.update.url({
                candidate: candidate.candidate_id,
            }),
            formData,
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Candidate" />

            <div className="max-w-3xl">
                <div className="rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Candidate
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update candidate information
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Position */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="position_id"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Position{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="position_id"
                                    name="position_id"
                                    required
                                    defaultValue={candidate.position_id}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    {positions.map((position) => (
                                        <option
                                            key={position.position_id}
                                            value={position.position_id}
                                        >
                                            {position.description}
                                        </option>
                                    ))}
                                </select>
                                {errors.position_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.position_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* First Name */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="firstname"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    First Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    defaultValue={candidate.firstname}
                                    required
                                    maxLength={30}
                                    className={
                                        errors.firstname ? 'border-red-500' : ''
                                    }
                                />
                                {errors.firstname && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.firstname}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Last Name */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="lastname"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Last Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    defaultValue={candidate.lastname}
                                    required
                                    maxLength={30}
                                    className={
                                        errors.lastname ? 'border-red-500' : ''
                                    }
                                />
                                {errors.lastname && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.lastname}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Partylist */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="partylist_id"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Partylist
                                </label>
                                <select
                                    id="partylist_id"
                                    name="partylist_id"
                                    defaultValue={candidate.partylist_id || ''}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Independent</option>
                                    {partylists.map((partylist) => (
                                        <option
                                            key={partylist.partylist_id}
                                            value={partylist.partylist_id}
                                        >
                                            {partylist.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.partylist_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.partylist_id}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Current Photo */}
                        {candidate.photo && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Current Photo
                                </label>
                                <img
                                    src={`/storage/${candidate.photo}`}
                                    alt="Current"
                                    className="h-32 w-32 rounded-lg border-2 border-gray-200 object-cover"
                                />
                            </div>
                        )}

                        {/* New Photo */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="photo"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    {candidate.photo ? 'Change Photo' : 'Photo'}
                                </label>
                                <Input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    className={
                                        errors.photo ? 'border-red-500' : ''
                                    }
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Max 2MB, JPG/PNG
                                </p>
                                {errors.photo && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.photo}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Platform */}
                        <FieldGroup>
                            <Field>
                                <label
                                    htmlFor="platform"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Platform / Bio
                                </label>
                                <Textarea
                                    id="platform"
                                    name="platform"
                                    rows={4}
                                    defaultValue={candidate.platform || ''}
                                    className={
                                        errors.platform ? 'border-red-500' : ''
                                    }
                                />
                                {errors.platform && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.platform}
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
                                Update Candidate
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
