import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    filters?: {
        categories?: string[];
        statuses?: string[];
        dateRanges?: string[];
    };
    activeFilters?: {
        categories?: string[];
        statuses?: string[];
        dateRange?: string;
    };
    onFiltersChange?: (filters: {
        categories?: string[];
        statuses?: string[];
        dateRange?: string;
    }) => void;
    showFilters?: boolean;
    className?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search...',
    filters,
    activeFilters,
    onFiltersChange,
    showFilters = false,
    className = '',
}: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChange('');
    };

    const handleCategoryFilter = (category: string, checked: boolean) => {
        if (!onFiltersChange) return;

        const currentCategories = activeFilters?.categories || [];
        const newCategories = checked
            ? [...currentCategories, category]
            : currentCategories.filter((c) => c !== category);

        onFiltersChange({
            ...activeFilters,
            categories: newCategories,
        });
    };

    const handleStatusFilter = (status: string, checked: boolean) => {
        if (!onFiltersChange) return;

        const currentStatuses = activeFilters?.statuses || [];
        const newStatuses = checked
            ? [...currentStatuses, status]
            : currentStatuses.filter((s) => s !== status);

        onFiltersChange({
            ...activeFilters,
            statuses: newStatuses,
        });
    };

    const handleDateRangeFilter = (dateRange: string) => {
        if (!onFiltersChange) return;

        onFiltersChange({
            ...activeFilters,
            dateRange:
                dateRange === activeFilters?.dateRange ? undefined : dateRange,
        });
    };

    const clearAllFilters = () => {
        if (!onFiltersChange) return;

        onFiltersChange({
            categories: [],
            statuses: [],
            dateRange: undefined,
        });
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (activeFilters?.categories?.length)
            count += activeFilters.categories.length;
        if (activeFilters?.statuses?.length)
            count += activeFilters.statuses.length;
        if (activeFilters?.dateRange) count += 1;
        return count;
    };

    const hasActiveFilters = getActiveFilterCount() > 0;

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Search Input */}
            <div className="relative flex items-center gap-2">
                <div
                    className={`relative flex-1 ${isFocused ? 'rounded-md ring-2 ring-blue-500' : ''}`}
                >
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className="pr-10 pl-10"
                    />
                    {value && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transform p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Filter Button */}
                {showFilters && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="relative"
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                                {hasActiveFilters && (
                                    <Badge
                                        variant="secondary"
                                        className="ml-2 h-5 w-5 p-0 text-xs"
                                    >
                                        {getActiveFilterCount()}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            {/* Categories Filter */}
                            {filters?.categories &&
                                filters.categories.length > 0 && (
                                    <>
                                        <DropdownMenuLabel>
                                            Categories
                                        </DropdownMenuLabel>
                                        {filters.categories.map((category) => (
                                            <DropdownMenuCheckboxItem
                                                key={category}
                                                checked={activeFilters?.categories?.includes(
                                                    category,
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleCategoryFilter(
                                                        category,
                                                        checked,
                                                    )
                                                }
                                            >
                                                {category}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                    </>
                                )}

                            {/* Status Filter */}
                            {filters?.statuses &&
                                filters.statuses.length > 0 && (
                                    <>
                                        <DropdownMenuLabel>
                                            Status
                                        </DropdownMenuLabel>
                                        {filters.statuses.map((status) => (
                                            <DropdownMenuCheckboxItem
                                                key={status}
                                                checked={activeFilters?.statuses?.includes(
                                                    status,
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleStatusFilter(
                                                        status,
                                                        checked,
                                                    )
                                                }
                                            >
                                                <span className="capitalize">
                                                    {status}
                                                </span>
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                    </>
                                )}

                            {/* Date Range Filter */}
                            {filters?.dateRanges &&
                                filters.dateRanges.length > 0 && (
                                    <>
                                        <DropdownMenuLabel>
                                            Date Range
                                        </DropdownMenuLabel>
                                        {filters.dateRanges.map((dateRange) => (
                                            <DropdownMenuCheckboxItem
                                                key={dateRange}
                                                checked={
                                                    activeFilters?.dateRange ===
                                                    dateRange
                                                }
                                                onCheckedChange={() =>
                                                    handleDateRangeFilter(
                                                        dateRange,
                                                    )
                                                }
                                            >
                                                {dateRange}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                    </>
                                )}

                            {/* Clear All Filters */}
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="w-full justify-start"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Clear All Filters
                                </Button>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {activeFilters?.categories?.map((category) => (
                        <Badge
                            key={category}
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                        >
                            {category}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    handleCategoryFilter(category, false)
                                }
                                className="ml-1 h-3 w-3 p-0 hover:bg-transparent"
                            >
                                <X className="h-2 w-2" />
                            </Button>
                        </Badge>
                    ))}

                    {activeFilters?.statuses?.map((status) => (
                        <Badge
                            key={status}
                            variant="secondary"
                            className="px-2 py-1 text-xs capitalize"
                        >
                            {status}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    handleStatusFilter(status, false)
                                }
                                className="ml-1 h-3 w-3 p-0 hover:bg-transparent"
                            >
                                <X className="h-2 w-2" />
                            </Button>
                        </Badge>
                    ))}

                    {activeFilters?.dateRange && (
                        <Badge
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                        >
                            {activeFilters.dateRange}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    handleDateRangeFilter(
                                        activeFilters.dateRange!,
                                    )
                                }
                                className="ml-1 h-3 w-3 p-0 hover:bg-transparent"
                            >
                                <X className="h-2 w-2" />
                            </Button>
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-6 px-2 py-1 text-xs"
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}
