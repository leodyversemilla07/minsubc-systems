import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
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

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    priority: number;
    election_id: number;
    election: Election;
}

interface Props {
    position: Position;
    errors?: Record<string, string>;
}

export default function Edit({ position, errors = {} }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Positions', href: voting.admin.positions.index.url() },
        {
            title: position.description,
            href: voting.admin.positions.show.url({
                position: position.position_id,
            }),
        },
        {
            title: 'Edit',
            href: voting.admin.positions.edit.url({
                position: position.position_id,
            }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Position" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">Edit Position</h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Update position details
                    </p>
                </div>

                <Form
                    action={voting.admin.positions.update.url({
                        position: position.position_id,
                    })}
                    method="put"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            {/* Election (Read-only) */}
                            <Field>
                                <FieldLabel>Election</FieldLabel>
                                <div className="w-full rounded-lg border bg-muted px-4 py-2 text-muted-foreground">
                                    {position.election.name}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Election cannot be changed
                                </p>
                            </Field>

                            {/* Position Description */}
                            <Field>
                                <FieldLabel htmlFor="description">
                                    Position Title{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id="description"
                                    name="description"
                                    defaultValue={position.description}
                                    required
                                    maxLength={255}
                                    className={
                                        errors.description
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                {errors.description && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.description}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Max Vote */}
                            <Field>
                                <FieldLabel htmlFor="max_vote">
                                    Maximum Votes{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    type="number"
                                    id="max_vote"
                                    name="max_vote"
                                    defaultValue={position.max_vote}
                                    required
                                    min={1}
                                    max={20}
                                    className={
                                        errors.max_vote
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Number of candidates voters can select for
                                    this position (1-20)
                                </p>
                                {errors.max_vote && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.max_vote}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Priority */}
                            <Field>
                                <FieldLabel htmlFor="priority">
                                    Display Priority{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    defaultValue={position.priority}
                                    required
                                    min={0}
                                    className={
                                        errors.priority
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Order in which this position appears (lower
                                    numbers appear first)
                                </p>
                                {errors.priority && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.priority}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Actions */}
                            <Field>
                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <Link
                                        href={voting.admin.positions.index.url()}
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
                                            : 'Update Position'}
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
