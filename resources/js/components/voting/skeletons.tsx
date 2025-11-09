import { Skeleton } from '@/components/ui/skeleton';

export function BallotSkeleton() {
    return (
        <div className="space-y-6">
            {/* Instructions Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                <Skeleton className="h-6 w-48 mb-3 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>

            {/* Position Cards Skeleton */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                    <Skeleton className="h-7 w-64 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-48 mb-6 bg-gray-200 dark:bg-gray-700" />
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
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
            <div className="grid md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                        <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-8 w-16 bg-gray-200 dark:bg-gray-700" />
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
                <Skeleton className="h-8 w-64 mb-6 bg-gray-200 dark:bg-gray-700" />
                <div className="grid lg:grid-cols-2 gap-6">
                    <Skeleton className="h-[300px] w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-[300px] w-full bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
}
