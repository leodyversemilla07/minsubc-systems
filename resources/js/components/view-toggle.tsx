import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ViewToggleProps {
    view: 'grid' | 'table';
    onViewChange: (view: 'grid' | 'table') => void;
    className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
    return (
        <div
            className={`inline-flex items-center rounded-lg border bg-background p-1 ${className || ''}`}
        >
            <Button
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('grid')}
                className="h-8 px-3"
                title="Grid View"
            >
                <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
                variant={view === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('table')}
                className="h-8 px-3"
                title="Table View"
            >
                <LayoutList className="h-4 w-4" />
            </Button>
        </div>
    );
}
