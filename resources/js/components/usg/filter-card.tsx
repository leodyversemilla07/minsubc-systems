import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * FilterCard Component
 * 
 * A reusable card component for filtering content across USG public index pages.
 * Uses shadcn Card components to maintain design consistency.
 * 
 * @example
 * ```tsx
 * <FilterCard
 *   title="Filter Events"
 *   description="Filter events by category, status, and date range"
 *   hasActiveFilters={activeFilters.category || activeFilters.status}
 *   onClearFilters={() => setActiveFilters({})}
 *   filters={[
 *     {
 *       label: "Category",
 *       icon: <Tag className="h-4 w-4" />,
 *       value: activeFilters.category,
 *       placeholder: "All Categories",
 *       options: categories,
 *       onChange: (value) => setActiveFilters({...activeFilters, category: value})
 *     }
 *   ]}
 * />
 * ```
 */

export interface FilterOption {
    /** Label for the filter */
    label: string;
    /** Icon to display next to the label */
    icon?: ReactNode;
    /** Current selected value */
    value?: string;
    /** Placeholder text */
    placeholder: string;
    /** Available options */
    options: string[] | { value: string; label: string }[];
    /** Callback when value changes */
    onChange: (value: string | undefined) => void;
    /** Optional formatter for option display */
    formatLabel?: (value: string) => string;
}

interface FilterCardProps {
    /** Title displayed in the card header */
    title: string;
    /** Optional description displayed below the title */
    description?: string;
    /** Whether any filters are currently active (shows clear button) */
    hasActiveFilters: boolean;
    /** Callback when clear all button is clicked */
    onClearFilters: () => void;
    /** Array of filter configurations */
    filters: FilterOption[];
}

export default function FilterCard({
    title,
    description,
    hasActiveFilters,
    onClearFilters,
    filters,
}: FilterCardProps) {
    return (
        <Card className="bg-white dark:bg-gray-900">
            <CardHeader className="bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-[var(--usg-primary)]" />
                        <CardTitle>{title}</CardTitle>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            <X className="mr-1 h-4 w-4" />
                            Clear All
                        </Button>
                    )}
                </div>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>

            <CardContent className="bg-white dark:bg-gray-900">
                <div className={`grid grid-cols-1 gap-4 ${filters.length === 2 ? 'md:grid-cols-2' : filters.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
                    {filters.map((filter, index) => (
                        <div key={index} className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {filter.icon && (
                                    <span className="text-gray-400">
                                        {filter.icon}
                                    </span>
                                )}
                                {filter.label}
                            </label>
                            <Select
                                value={filter.value}
                                onValueChange={(value) => {
                                    filter.onChange(value || undefined);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={filter.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {filter.options.map((option) => {
                                        const optionValue = typeof option === 'string' ? option : option.value;
                                        const optionLabel = typeof option === 'string' 
                                            ? (filter.formatLabel ? filter.formatLabel(option) : option)
                                            : option.label;
                                        
                                        return (
                                            <SelectItem key={optionValue} value={optionValue}>
                                                {optionLabel}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Active filters:
                        </span>
                        {filters.map((filter, index) => {
                            if (!filter.value) return null;
                            
                            const displayValue = filter.formatLabel 
                                ? filter.formatLabel(filter.value)
                                : filter.value;
                            
                            return (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {filter.icon && (
                                        <span className="[&>svg]:h-3 [&>svg]:w-3">
                                            {filter.icon}
                                        </span>
                                    )}
                                    {displayValue}
                                    <button
                                        onClick={() => filter.onChange(undefined)}
                                        className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
