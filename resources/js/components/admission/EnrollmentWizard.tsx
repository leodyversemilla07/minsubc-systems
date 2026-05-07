import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
    id: string;
    title: string;
    description?: string;
}

interface EnrollmentWizardProps {
    steps: Step[];
    currentStepId: string;
    onStepClick?: (stepId: string) => void;
    className?: string;
}

export function EnrollmentWizard({
    steps,
    currentStepId,
    onStepClick,
    className,
}: EnrollmentWizardProps) {
    const currentIndex = steps.findIndex((s) => s.id === currentStepId);

    const isStepComplete = (stepId: string) => {
        const stepIndex = steps.findIndex((s) => s.id === stepId);
        return stepIndex < currentIndex;
    };

    const isStepCurrent = (stepId: string) => {
        return stepId === currentStepId;
    };

    const isStepClickable = (stepId: string) => {
        const stepIndex = steps.findIndex((s) => s.id === stepId);
        return stepIndex <= currentIndex && onStepClick;
    };

    return (
        <div className={cn('relative', className)}>
            {/* Progress Bar */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
                <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{
                        width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                    }}
                />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const isComplete = isStepComplete(step.id);
                    const isCurrent = isStepCurrent(step.id);
                    const isClickable = isStepClickable(step.id);

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                'flex flex-col items-center',
                                isClickable && 'cursor-pointer'
                            )}
                            onClick={() =>
                                isClickable ? onStepClick(step.id) : undefined
                            }
                        >
                            {/* Step Circle */}
                            <div
                                className={cn(
                                    'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                                    isComplete
                                        ? 'border-blue-600 bg-blue-600 text-white'
                                        : isCurrent
                                          ? 'border-blue-600 bg-white text-blue-600 dark:bg-gray-900'
                                          : 'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800'
                                )}
                            >
                                {isComplete ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <span className="text-sm font-bold">
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Step Text */}
                            <div
                                className={cn(
                                    'mt-2 text-center',
                                    isCurrent && 'font-medium'
                                )}
                            >
                                <p
                                    className={cn(
                                        'text-sm',
                                        isCurrent
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : isComplete
                                              ? 'text-gray-900 dark:text-white'
                                              : 'text-gray-500 dark:text-gray-400'
                                    )}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}