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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Position {
    position_id: number;
    description: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Candidate {
    id: number;
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
                candidate: candidate.id,
            }),
        },
        {
            title: 'Edit',
            href: voting.admin.candidates.edit.url({
                candidate: candidate.id,
            }),
        },
    ];

    const [selectedPosition, setSelectedPosition] = useState<string>(
        candidate.position_id.toString(),
    );
    const [selectedPartylist, setSelectedPartylist] = useState<string>(
        candidate.partylist_id?.toString() || 'independent',
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Candidate" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                        Edit Candidate
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Update candidate information
                    </p>
                </div>

                <Form
                    action={voting.admin.candidates.update.url({
                        candidate: candidate.id,
                    })}
                    method="put"
                    encType="multipart/form-data"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            {/* Position */}
                            <Field>
                                <FieldLabel htmlFor="position_id">
                                    Position{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <input
                                    type="hidden"
                                    name="position_id"
                                    value={selectedPosition}
                                />
                                <Select
                                    value={selectedPosition}
                                    onValueChange={setSelectedPosition}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {positions.map((position) => (
                                            <SelectItem
                                                key={position.position_id}
                                                value={position.position_id.toString()}
                                            >
                                                {position.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.position_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.position_id}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Name Fields - Responsive Grid */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* First Name */}
                                <Field>
                                    <FieldLabel htmlFor="firstname">
                                        First Name{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        defaultValue={candidate.firstname}
                                        required
                                        maxLength={30}
                                        className={
                                            errors.firstname
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.firstname && (
                                        <FieldError>
                                            <AlertCircle className="mr-1 h-4 w-4" />
                                            {errors.firstname}
                                        </FieldError>
                                    )}
                                </Field>

                                {/* Last Name */}
                                <Field>
                                    <FieldLabel htmlFor="lastname">
                                        Last Name{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        defaultValue={candidate.lastname}
                                        required
                                        maxLength={30}
                                        className={
                                            errors.lastname
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.lastname && (
                                        <FieldError>
                                            <AlertCircle className="mr-1 h-4 w-4" />
                                            {errors.lastname}
                                        </FieldError>
                                    )}
                                </Field>
                            </div>

                            {/* Partylist */}
                            <Field>
                                <FieldLabel htmlFor="partylist_id">
                                    Partylist
                                </FieldLabel>
                                <input
                                    type="hidden"
                                    name="partylist_id"
                                    value={
                                        selectedPartylist === 'independent'
                                            ? ''
                                            : selectedPartylist
                                    }
                                />
                                <Select
                                    value={selectedPartylist}
                                    onValueChange={setSelectedPartylist}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Independent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="independent">
                                            Independent
                                        </SelectItem>
                                        {partylists.map((partylist) => (
                                            <SelectItem
                                                key={partylist.partylist_id}
                                                value={partylist.partylist_id.toString()}
                                            >
                                                {partylist.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.partylist_id && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.partylist_id}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Current Photo */}
                            {candidate.photo && (
                                <Field>
                                    <FieldLabel>Current Photo</FieldLabel>
                                    <div className="h-32 w-32 overflow-hidden rounded-lg border-2">
                                        <img
                                            src={`/storage/${candidate.photo}`}
                                            alt="Current"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </Field>
                            )}

                            {/* New Photo */}
                            <Field>
                                <FieldLabel htmlFor="photo">
                                    {candidate.photo ? 'Change Photo' : 'Photo'}
                                </FieldLabel>
                                <Input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    className={
                                        errors.photo ? 'border-destructive' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Max 2MB, JPG/PNG
                                </p>
                                {errors.photo && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.photo}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Platform */}
                            <Field>
                                <FieldLabel htmlFor="platform">
                                    Platform / Bio
                                </FieldLabel>
                                <Textarea
                                    id="platform"
                                    name="platform"
                                    rows={4}
                                    defaultValue={candidate.platform || ''}
                                    className={
                                        errors.platform
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                {errors.platform && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.platform}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Actions */}
                            <Field>
                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <Link
                                        href={voting.admin.candidates.index.url()}
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
                                            : 'Update Candidate'}
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
