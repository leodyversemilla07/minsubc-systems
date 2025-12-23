import { Check } from 'lucide-react';

interface Step {
    id: string;
    label: string;
    description?: string;
}

interface VotingProgressProps {
    currentStep: number;
    steps?: Step[];
}

const defaultSteps: Step[] = [
    { id: 'login', label: 'Login', description: 'Authenticate' },
    { id: 'ballot', label: 'Vote', description: 'Select candidates' },
    { id: 'preview', label: 'Review', description: 'Verify selections' },
    { id: 'confirm', label: 'Submit', description: 'Confirm vote' },
];

export function VotingProgress({
    currentStep,
    steps = defaultSteps,
}: VotingProgressProps) {
    return (
        <div className="w-full py-6">
            <div className="mx-auto max-w-4xl px-4">
                {/* Desktop Progress */}
                <div className="hidden md:block">
                    <div className="flex items-start justify-center gap-4">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isCurrent = stepNumber === currentStep;
                            const isUpcoming = stepNumber > currentStep;

                            return (
                                <div
                                    key={step.id}
                                    className="flex items-center"
                                >
                                    {/* Step Circle and Label */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-all ${isCompleted
                                                ? 'border-green-600 bg-green-600 text-white dark:border-green-500 dark:bg-green-500'
                                                : isCurrent
                                                    ? 'border-green-600 bg-white text-green-600 ring-4 ring-green-100 dark:border-green-500 dark:bg-gray-900 dark:text-green-400 dark:ring-green-900/50'
                                                    : 'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                stepNumber
                                            )}
                                        </div>

                                        {/* Step Label */}
                                        <div className="mt-3 w-24 text-center">
                                            <div
                                                className={`text-sm font-semibold ${isCurrent
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : isCompleted
                                                        ? 'text-gray-700 dark:text-gray-300'
                                                        : 'text-gray-400 dark:text-gray-500'
                                                    }`}
                                            >
                                                {step.label}
                                            </div>
                                            {step.description && (
                                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    {step.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Connector Line */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`mb-auto mt-6 h-0.5 w-16 transition-all ${isCompleted
                                                ? 'bg-green-600 dark:bg-green-500'
                                                : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Progress */}
                <div className="md:hidden">
                    <div className="flex items-center gap-4">
                        {/* Current Step Display */}
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-600 bg-white text-lg font-bold text-green-600 ring-4 ring-green-100 dark:border-green-500 dark:bg-gray-900 dark:text-green-400 dark:ring-green-900/50">
                            {currentStep}
                        </div>

                        {/* Step Info */}
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                Step {currentStep} of {steps.length}
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                {steps[currentStep - 1]?.label}
                            </div>
                            {steps[currentStep - 1]?.description && (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {steps[currentStep - 1]?.description}
                                </div>
                            )}
                        </div>

                        {/* Mini Progress Bar */}
                        <div className="w-16 flex-shrink-0">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-full bg-green-600 transition-all duration-300 dark:bg-green-500"
                                    style={{
                                        width: `${(currentStep / steps.length) * 100}%`,
                                    }}
                                />
                            </div>
                            <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                                {Math.round((currentStep / steps.length) * 100)}
                                %
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
