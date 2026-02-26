import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Partylist" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                        Edit Partylist
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Update partylist details
                    </p>
                </div>

                <Form
                    action={voting.admin.partylists.update.url({
                        partylist: partylist.partylist_id,
                    })}
                    method="put"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            {/* Election (Read-only) */}
                            <Field>
                                <FieldLabel>Election</FieldLabel>
                                <div className="w-full rounded-lg border bg-muted px-4 py-2 text-muted-foreground">
                                    {partylist.election.name}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Election cannot be changed
                                </p>
                            </Field>

                            {/* Partylist Name */}
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Partylist Name{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={partylist.name}
                                    required
                                    maxLength={255}
                                    className={
                                        errors.name ? 'border-destructive' : ''
                                    }
                                />
                                {errors.name && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.name}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Actions */}
                            <Field>
                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <Link
                                        href={voting.admin.partylists.index.url()}
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
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        {processing
                                            ? 'Updating...'
                                            : 'Update Partylist'}
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
