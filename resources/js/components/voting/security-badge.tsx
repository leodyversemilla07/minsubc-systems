import { Shield, Lock, CheckCircle2 } from 'lucide-react';

interface SecurityBadgeProps {
    variant?: 'default' | 'compact';
    message?: string;
}

export function SecurityBadge({ variant = 'default', message }: SecurityBadgeProps) {
    if (variant === 'compact') {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs text-green-700">
                <Lock className="w-3 h-3" />
                <span className="font-medium">Secure & Anonymous</span>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-green-900 mb-1 flex items-center gap-2">
                        Your Vote is Protected
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </h4>
                    <p className="text-xs text-green-700">
                        {message || 'End-to-end encrypted. Anonymous voting. Your privacy is guaranteed.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
