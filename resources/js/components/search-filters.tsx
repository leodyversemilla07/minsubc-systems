import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Filter, RotateCcw, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

export interface FilterField {
    name: string;
    label: string;
    type: 'text' | 'select' | 'date';
    placeholder?: string;
    options?: { value: string; label: string }[];
}

interface SearchFiltersProps {
    fields: FilterField[];
    filters: Record<string, string>;
    baseUrl: string;
    title?: string;
    description?: string;
}

export function SearchFilters({
    fields,
    filters,
    baseUrl,
    title = 'Search & Filter',
    description = 'Filter results using the options below',
}: SearchFiltersProps) {
    const [localFilters, setLocalFilters] = useState<Record<string, string>>(
        filters || {},
    );

    const handleChange = useCallback((name: string, value: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleApply = useCallback(() => {
        // Remove empty values
        const cleanFilters = Object.fromEntries(
            Object.entries(localFilters).filter(
                ([, value]) => value && value !== 'all',
            ),
        );
        router.get(baseUrl, cleanFilters, { preserveState: true });
    }, [localFilters, baseUrl]);

    const handleReset = useCallback(() => {
        setLocalFilters({});
        router.get(baseUrl, {}, { preserveState: true });
    }, [baseUrl]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleApply();
            }
        },
        [handleApply],
    );

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            {field.type === 'text' && (
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id={field.name}
                                        placeholder={field.placeholder}
                                        value={localFilters[field.name] || ''}
                                        onChange={(e) =>
                                            handleChange(
                                                field.name,
                                                e.target.value,
                                            )
                                        }
                                        onKeyDown={handleKeyDown}
                                        className="pl-8"
                                    />
                                </div>
                            )}
                            {field.type === 'select' && (
                                <Select
                                    value={localFilters[field.name] || 'all'}
                                    onValueChange={(value) =>
                                        handleChange(field.name, value)
                                    }
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue
                                            placeholder={
                                                field.placeholder || 'Select...'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {field.options?.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {field.type === 'date' && (
                                <Input
                                    id={field.name}
                                    type="date"
                                    value={localFilters[field.name] || ''}
                                    onChange={(e) =>
                                        handleChange(field.name, e.target.value)
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <Button onClick={handleApply}>
                        <Filter className="mr-2 h-4 w-4" />
                        Apply Filters
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
