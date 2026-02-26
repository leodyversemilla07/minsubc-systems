import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
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
    { title: 'Positions', href: voting.admin.positions.index.url() },
    { title: 'Create', href: voting.admin.positions.create.url() },
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

    const handleElectionChange = (value: string) => {
        setSelectedElection(Number(value));
        router.get(
            voting.admin.positions.create.url() + `?election_id=${value}`,
            {},
            { preserveState: false },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Position" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                        Add New Position
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Create a new position for the election
                    </p>
                </div>

                <Form action={voting.admin.positions.store.url()} method="post">
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
                                    required
                                    maxLength={255}
                                    placeholder="e.g., President, Vice President, Secretary"
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
                                    required
                                    min={1}
                                    max={20}
                                    defaultValue={1}
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
                                    required
                                    min={0}
                                    defaultValue={0}
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
                                            ? 'Creating...'
                                            : 'Create Position'}
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
