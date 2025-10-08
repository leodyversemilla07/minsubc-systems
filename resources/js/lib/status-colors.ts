export const statusColors = {
    pending_payment: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    payment_expired: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    ready_for_pickup: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    released: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
} as const;

export const paymentStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    refunded: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
} as const;

export type StatusColorKey = keyof typeof statusColors;
export type PaymentStatusColorKey = keyof typeof paymentStatusColors;