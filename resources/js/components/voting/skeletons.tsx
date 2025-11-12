import { Skeleton } from '@/components/ui/skeleton';

export function BallotSkeleton() {
    return (
        <div className="space-y-6">
            {/* Instructions Skeleton */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                <Skeleton className="mb-3 h-6 w-48 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>

            {/* Position Cards Skeleton */}
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                    <Skeleton className="mb-2 h-7 w-64 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="mb-6 h-4 w-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((j) => (
                            <div
                                key={j}
                                className="rounded-lg border-2 border-gray-200 p-4 dark:border-gray-700"
                            >
                                <div className="flex items-start gap-4">
                                    <Skeleton className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
                                        <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                                        <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-700" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ResultsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Statistics Skeleton */}
            <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                        <Skeleton className="mb-2 h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-8 w-16 bg-gray-200 dark:bg-gray-700" />
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                <Skeleton className="mb-6 h-8 w-64 bg-gray-200 dark:bg-gray-700" />
                <div className="grid gap-6 lg:grid-cols-2">
                    <Skeleton className="h-[300px] w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-[300px] w-full bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
}
