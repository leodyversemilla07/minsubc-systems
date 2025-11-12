import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
}

export function HelpTooltip({ content, side = 'top' }: HelpTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
                        aria-label="Help information"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side={side} className="max-w-xs">
                    <p className="text-sm">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
