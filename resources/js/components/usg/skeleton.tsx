import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
                className,
            )}
        />
    );
}

export function AnnouncementCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-900">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="mb-2 h-7 w-3/4" />
                <Skeleton className="mb-4 h-16 w-full" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    );
}

export function EventCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-900">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="mb-2 h-7 w-3/4" />
                <Skeleton className="mb-4 h-12 w-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );
}

export function OfficerCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Skeleton className="mb-4 h-32 w-32 rounded-full" />
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-4 w-40" />
            </div>
        </div>
    );
}

export function StatCardSkeleton() {
    return (
        <div className="text-center">
            <Skeleton className="mx-auto mb-2 h-10 w-20" />
            <Skeleton className="mx-auto h-4 w-32" />
        </div>
    );
}
