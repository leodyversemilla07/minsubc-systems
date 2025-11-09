import { Skeleton } from '@/components/ui/skeleton';

export function BallotSkeleton() {
    return (
        <div className="space-y-6">
            {/* Instructions Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <Skeleton className="h-6 w-48 mb-3" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>

            {/* Position Cards Skeleton */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <Skeleton className="h-7 w-64 mb-2" />
                    <Skeleton className="h-4 w-48 mb-6" />
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="border-2 rounded-lg p-4">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="w-16 h-16 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-full" />
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
                    <div key={i} className="bg-white rounded-lg shadow-md p-6">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="grid lg:grid-cols-2 gap-6">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-[300px] w-full" />
                </div>
            </div>
        </div>
    );
}
