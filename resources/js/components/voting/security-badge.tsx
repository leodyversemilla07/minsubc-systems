import { CheckCircle2, Lock, Shield } from 'lucide-react';

interface SecurityBadgeProps {
    variant?: 'default' | 'compact';
    message?: string;
}

export function SecurityBadge({
    variant = 'default',
    message,
}: SecurityBadgeProps) {
    if (variant === 'compact') {
        return (
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                <Lock className="h-3 w-3" />
                <span className="font-medium">Secure & Anonymous</span>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 dark:bg-green-700">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-green-900 dark:text-green-100">
                        Your Vote is Protected
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                        {message ||
                            'End-to-end encrypted. Anonymous voting. Your privacy is guaranteed.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
