import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlertCircle, CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: boolean;
    computed_status: 'active' | 'ended';
    end_time: string | null;
}

interface Props {
    election: Election;
    errors?: Record<string, string>;
}

export default function Edit({ election, errors = {} }: Props) {
    // Parse existing end_time
    const initialEndDate = election.end_time
        ? new Date(election.end_time)
        : undefined;
    const initialEndTime = election.end_time
        ? format(new Date(election.end_time), 'HH:mm')
        : '17:00';

    const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);
    const [endTime, setEndTime] = useState<string>(initialEndTime);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(election.status);

    // Combine date and time into a single value for the hidden input
    const getEndTimeValue = () => {
        if (!endDate) return '';
        const dateStr = format(endDate, 'yyyy-MM-dd');
        if (endTime) {
            return `${dateStr}T${endTime}`;
        }
        return `${dateStr}T00:00`;
    };

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

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">Edit Election</h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Update the election details and settings
                    </p>
                </div>

                <Form
                    action={voting.admin.elections.update.url({
                        election: election.id,
                    })}
                    method="post"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            <input
                                type="hidden"
                                name="_method"
                                value="PUT"
                            />

                            {/* Election Name */}
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Election Name{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={election.name}
                                    required
                                    placeholder="e.g., Student Council Election 2025"
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

                            {/* Election Code (Read-only) */}
                            <Field>
                                <FieldLabel htmlFor="election_code">
                                    Election Code
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id="election_code"
                                    value={election.election_code}
                                    disabled
                                    className="bg-muted text-muted-foreground"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Election code cannot be changed
                                </p>
                            </Field>

                            {/* End Date and Time */}
                            <Field>
                                <FieldLabel>End Date & Time</FieldLabel>
                                <input
                                    type="hidden"
                                    name="end_time"
                                    value={getEndTimeValue()}
                                />
                                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                                    <Popover
                                        open={datePickerOpen}
                                        onOpenChange={setDatePickerOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="end_date"
                                                type="button"
                                                className={cn(
                                                    'justify-start text-left font-normal',
                                                    !endDate &&
                                                        'text-muted-foreground',
                                                    errors.end_time &&
                                                        'border-destructive',
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {endDate
                                                    ? format(endDate, 'PPP')
                                                    : 'Pick a date'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={(date) => {
                                                    setEndDate(date);
                                                    setDatePickerOpen(false);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <div className="relative">
                                        <Clock className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                        <Input
                                            type="time"
                                            id="end_time_picker"
                                            value={endTime}
                                            onChange={(e) =>
                                                setEndTime(e.target.value)
                                            }
                                            className={cn(
                                                'pl-10 sm:w-40',
                                                errors.end_time &&
                                                    'border-destructive',
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setEndDate(undefined);
                                            setEndTime('17:00');
                                        }}
                                        className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                                    >
                                        Clear date
                                    </Button>
                                    <span className="text-xs text-muted-foreground">
                                        Leave empty for no end time limit
                                    </span>
                                </div>
                                {errors.end_time && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.end_time}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Active Status Toggle */}
                            <Field>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FieldLabel
                                            htmlFor="status"
                                            className="text-base"
                                        >
                                            Election Active
                                        </FieldLabel>
                                        <p className="text-sm text-muted-foreground">
                                            {isActive
                                                ? 'Election is currently accepting votes'
                                                : 'Election is disabled and not accepting votes'}
                                        </p>
                                    </div>
                                    <Switch
                                        id="status"
                                        checked={isActive}
                                        onCheckedChange={setIsActive}
                                    />
                                    <input
                                        type="hidden"
                                        name="status"
                                        value={isActive ? '1' : '0'}
                                    />
                                </div>
                                {errors.status && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.status}
                                    </FieldError>
                                )}
                            </Field>

                            {/* Actions */}
                            <Field>
                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <Link
                                        href={voting.admin.elections.index.url()}
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
                                            : 'Update Election'}
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
