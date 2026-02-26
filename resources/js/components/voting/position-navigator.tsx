import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Circle, List } from 'lucide-react';

interface Position {
    position_id: number;
    description: string;
}

interface PositionNavigatorProps {
    positions: Position[];
    selectedVotes: Record<number, number[]>;
    onNavigate: (positionId: number) => void;
}

export function PositionNavigator({
    positions,
    selectedVotes,
    onNavigate,
}: PositionNavigatorProps) {
    const handleNavigate = (positionId: number) => {
        const element = document.getElementById(`position-${positionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        onNavigate(positionId);
    };

    const completedCount = Object.keys(selectedVotes).filter(
        (key) => selectedVotes[parseInt(key)]?.length > 0,
    ).length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full border-2 border-green-600 bg-white shadow-xl transition-all hover:scale-110 md:h-16 md:w-16 dark:border-green-500 dark:bg-gray-900"
                >
                    <div className="relative">
                        <List className="h-6 w-6 text-green-600 dark:text-green-400" />
                        {completedCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white dark:bg-green-500">
                                {completedCount}
                            </span>
                        )}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0" sideOffset={10}>
                <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Quick Navigation
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        {completedCount} of {positions.length} positions
                        selected
                    </p>
                </div>

                <ScrollArea className="h-[400px]">
                    <div className="space-y-1 p-2">
                        {positions.map((position, index) => {
                            const isCompleted =
                                selectedVotes[position.position_id]?.length > 0;

                            return (
                                <button
                                    key={position.position_id}
                                    type="button"
                                    onClick={() =>
                                        handleNavigate(position.position_id)
                                    }
                                    className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
                                        isCompleted
                                            ? 'bg-green-50 dark:bg-green-950'
                                            : ''
                                    }`}
                                >
                                    {/* Position Number */}
                                    <div
                                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                            isCompleted
                                                ? 'bg-green-600 text-white dark:bg-green-500'
                                                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                        }`}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Position Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {position.description}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            {isCompleted ? (
                                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Selected
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                    <Circle className="h-3 w-3" />
                                                    Not selected
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status Icon */}
                                    {isCompleted && (
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                        Click any position to jump directly to it
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
