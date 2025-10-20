import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Filter, 
    X, 
    Search,
    ChevronDown,
    Tag,
    Calendar,
    User
} from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

interface DateRange {
    from?: Date;
    to?: Date;
}

interface CategoryFilterProps {
    // Categories
    categories: FilterOption[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    
    // Status/Tags (optional)
    statuses?: FilterOption[];
    selectedStatuses?: string[];
    onStatusChange?: (statuses: string[]) => void;
    
    // Authors (optional)
    authors?: FilterOption[];
    selectedAuthors?: string[];
    onAuthorChange?: (authors: string[]) => void;
    
    // Date range (optional)
    dateRange?: DateRange;
    onDateRangeChange?: (range: DateRange) => void;
    
    // Search
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    
    // Configuration
    showSearch?: boolean;
    showDateFilter?: boolean;
    showStatusFilter?: boolean;
    showAuthorFilter?: boolean;
    placeholder?: string;
    className?: string;
    
    // Actions
    onClearAll?: () => void;
}

export function CategoryFilter({
    categories,
    selectedCategories,
    onCategoryChange,
    statuses = [],
    selectedStatuses = [],
    onStatusChange,
    authors = [],
    selectedAuthors = [],
    onAuthorChange,
    dateRange,
    onDateRangeChange,
    searchQuery = '',
    onSearchChange,
    showSearch = true,
    showDateFilter = false,
    showStatusFilter = false,
    showAuthorFilter = false,
    placeholder = "Search...",
    className = '',
    onClearAll
}: CategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleCategory = (categoryValue: string) => {
        if (selectedCategories.includes(categoryValue)) {
            onCategoryChange(selectedCategories.filter(cat => cat !== categoryValue));
        } else {
            onCategoryChange([...selectedCategories, categoryValue]);
        }
    };
    
    const toggleStatus = (statusValue: string) => {
        if (!onStatusChange) return;
        if (selectedStatuses.includes(statusValue)) {
            onStatusChange(selectedStatuses.filter(status => status !== statusValue));
        } else {
            onStatusChange([...selectedStatuses, statusValue]);
        }
    };
    
    const toggleAuthor = (authorValue: string) => {
        if (!onAuthorChange) return;
        if (selectedAuthors.includes(authorValue)) {
            onAuthorChange(selectedAuthors.filter(author => author !== authorValue));
        } else {
            onAuthorChange([...selectedAuthors, authorValue]);
        }
    };
    
    const clearAllFilters = () => {
        onCategoryChange([]);
        if (onStatusChange) onStatusChange([]);
        if (onAuthorChange) onAuthorChange([]);
        if (onDateRangeChange) onDateRangeChange({});
        if (onSearchChange) onSearchChange('');
        if (onClearAll) onClearAll();
    };
    
    const getActiveFilterCount = () => {
        let count = selectedCategories.length + selectedStatuses.length + selectedAuthors.length;
        if (dateRange?.from || dateRange?.to) count += 1;
        if (searchQuery.trim()) count += 1;
        return count;
    };
    
    const activeFilterCount = getActiveFilterCount();
    
    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}>
            {/* Search Input */}
            {showSearch && onSearchChange && (
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 pr-4"
                    />
                    {searchQuery && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onSearchChange('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    )}
                </div>
            )}
            
            {/* Filter Dropdown */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2 min-w-fit"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge variant="destructive" className="ml-1 h-5 min-w-[20px] text-xs">
                                {activeFilterCount}
                            </Badge>
                        )}
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Filters</h4>
                            {activeFilterCount > 0 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>
                        
                        {/* Categories */}
                        {categories.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Categories
                                </Label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {categories.map((category) => (
                                        <div
                                            key={category.value}
                                            className="flex items-center justify-between"
                                        >
                                            <label className="flex items-center gap-2 cursor-pointer flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.value)}
                                                    onChange={() => toggleCategory(category.value)}
                                                    className="rounded border-gray-300"
                                                />
                                                <span className="text-sm">{category.label}</span>
                                            </label>
                                            {category.count !== undefined && (
                                                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5">
                                                    {category.count}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Status Filter */}
                        {showStatusFilter && statuses.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Badge className="w-4 h-4" />
                                    Status
                                </Label>
                                <div className="space-y-2">
                                    {statuses.map((status) => (
                                        <label
                                            key={status.value}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedStatuses.includes(status.value)}
                                                onChange={() => toggleStatus(status.value)}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="text-sm">{status.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Author Filter */}
                        {showAuthorFilter && authors.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Authors
                                </Label>
                                <div className="space-y-2 max-h-24 overflow-y-auto">
                                    {authors.map((author) => (
                                        <label
                                            key={author.value}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedAuthors.includes(author.value)}
                                                onChange={() => toggleAuthor(author.value)}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="text-sm">{author.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Date Range Filter */}
                        {showDateFilter && onDateRangeChange && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Date Range
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label className="text-xs text-gray-500">From</Label>
                                        <Input
                                            type="date"
                                            value={dateRange?.from ? dateRange.from.toISOString().split('T')[0] : ''}
                                            onChange={(e) => {
                                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                                onDateRangeChange({
                                                    ...dateRange,
                                                    from: date
                                                });
                                            }}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500">To</Label>
                                        <Input
                                            type="date"
                                            value={dateRange?.to ? dateRange.to.toISOString().split('T')[0] : ''}
                                            onChange={(e) => {
                                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                                onDateRangeChange({
                                                    ...dateRange,
                                                    to: date
                                                });
                                            }}
                                            className="text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
            
            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((categoryValue) => {
                        const category = categories.find(cat => cat.value === categoryValue);
                        return category ? (
                            <Badge
                                key={categoryValue}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {category.label}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCategory(categoryValue)}
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </Badge>
                        ) : null;
                    })}
                    
                    {selectedStatuses.map((statusValue) => {
                        const status = statuses.find(st => st.value === statusValue);
                        return status ? (
                            <Badge
                                key={statusValue}
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                {status.label}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleStatus(statusValue)}
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </Badge>
                        ) : null;
                    })}
                    
                    {selectedAuthors.map((authorValue) => {
                        const author = authors.find(au => au.value === authorValue);
                        return author ? (
                            <Badge
                                key={authorValue}
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                {author.label}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleAuthor(authorValue)}
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </Badge>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
}