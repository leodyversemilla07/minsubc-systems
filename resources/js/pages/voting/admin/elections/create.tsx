import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlertCircle, CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Elections', href: voting.admin.elections.index.url() },
    { title: 'Create', href: voting.admin.elections.create.url() },
];

interface Props {
    errors?: Record<string, string>;
}

export default function Create({ errors = {} }: Props) {
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<string>('17:00');
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    // Combine date and time into a single value for the hidden input
    const getEndTimeValue = () => {
        if (!endDate) return '';
        const dateStr = format(endDate, 'yyyy-MM-dd');
        if (endTime) {
            return `${dateStr}T${endTime}`;
        }
        return `${dateStr}T00:00`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Election" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:space-y-8 md:p-8">
                <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                        Create New Election
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Set up a new election cycle for your organization
                    </p>
                </div>

                <Form action={voting.admin.elections.store.url()} method="post">
                    {({ processing }) => (
                        <FieldGroup>
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
                                        <Clock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                                <p className="text-xs text-muted-foreground">
                                    Leave empty for no end time limit
                                </p>
                                {errors.end_time && (
                                    <FieldError>
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.end_time}
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
                                            ? 'Creating...'
                                            : 'Create Election'}
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
