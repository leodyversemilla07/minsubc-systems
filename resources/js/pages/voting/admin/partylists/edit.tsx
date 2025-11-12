import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

interface Election {
    id: number;
    name: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
    election_id: number;
    election: Election;
}

interface Props {
    partylist: Partylist;
    errors?: Record<string, string>;
}

export default function Edit({ partylist, errors = {} }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Partylists', href: voting.admin.partylists.index.url() },
        {
            title: partylist.name,
            href: voting.admin.partylists.show.url({
                partylist: partylist.partylist_id,
            }),
        },
        {
            title: 'Edit',
            href: voting.admin.partylists.edit.url({
                partylist: partylist.partylist_id,
            }),
        },
    ];
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('_method', 'PUT');
        router.post(
            voting.admin.partylists.update.url({
                partylist: partylist.partylist_id,
            }),
            formData,
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Partylist" />

            <div className="max-w-3xl">
                <div className="rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Partylist
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update partylist details
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Election (Read-only) */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Election
                            </label>
                            <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-600">
                                {partylist.election.name}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Election cannot be changed
                            </p>
                        </div>

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
                                    defaultValue={partylist.name}
                                    required
                                    maxLength={255}
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
                                Update Partylist
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
