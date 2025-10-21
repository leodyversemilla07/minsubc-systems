import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
    date?: Date;
    onDateChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    showClearButton?: boolean;
    name?: string;
}

export function DatePicker({
    date,
    onDateChange,
    placeholder = 'Pick a date',
    disabled = false,
    minDate,
    maxDate,
    className,
    showClearButton = true,
    name,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDateChange?.(undefined);
    };

    return (
        <>
            {/* Hidden input for form submission */}
            {name && date && (
                <input
                    type="hidden"
                    name={name}
                    value={format(date, 'yyyy-MM-dd')}
                />
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'h-10 w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                            className,
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, 'PPP')
                        ) : (
                            <span>{placeholder}</span>
                        )}
                        {date && showClearButton && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-auto h-7 w-7 p-0 hover:bg-transparent"
                                onClick={handleClear}
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate: Date | undefined) => {
                            onDateChange?.(newDate);
                            setOpen(false);
                        }}
                        disabled={(checkDate: Date) => {
                            if (minDate && checkDate < minDate) return true;
                            if (maxDate && checkDate > maxDate) return true;
                            return false;
                        }}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}
