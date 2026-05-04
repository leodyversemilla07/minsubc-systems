export function ApplicationStatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        under_review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        interview_scheduled: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        accepted: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
        waitlisted: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        enrolled: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };

    const labels: Record<string, string> = {
        draft: 'Draft',
        submitted: 'Submitted',
        under_review: 'Under Review',
        interview_scheduled: 'Interview Scheduled',
        accepted: 'Accepted',
        waitlisted: 'Waitlisted',
        rejected: 'Rejected',
        enrolled: 'Enrolled',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors[status] || colors.draft}`}>
            {labels[status] || status}
        </span>
    );
}