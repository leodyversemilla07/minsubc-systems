import { Clock2Icon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimePickerProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
}

export function TimePicker({
    id,
    label,
    value,
    onChange,
    error,
    disabled = false,
    required = false,
    placeholder = 'HH:MM',
}: TimePickerProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative flex w-full items-center gap-2">
                <Clock2Icon className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground select-none" />
                <Input
                    id={id}
                    type="time"
                    step="1"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${
                        error ? 'border-red-500' : ''
                    }`}
                    disabled={disabled}
                    required={required}
                />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
