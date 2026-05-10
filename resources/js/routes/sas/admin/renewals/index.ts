import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/renewals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::sendReminders
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:69
 * @route '/sas/admin/renewals/send-reminders'
 */
export const sendReminders = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendReminders.url(options),
    method: 'post',
})

sendReminders.definition = {
    methods: ["post"],
    url: '/sas/admin/renewals/send-reminders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::sendReminders
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:69
 * @route '/sas/admin/renewals/send-reminders'
 */
sendReminders.url = (options?: RouteQueryOptions) => {
    return sendReminders.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::sendReminders
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:69
 * @route '/sas/admin/renewals/send-reminders'
 */
sendReminders.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendReminders.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
export const create = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/sas/admin/renewals/{recipientId}/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
create.url = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { recipientId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    recipientId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        recipientId: args.recipientId,
                }

    return create.definition.url
            .replace('{recipientId}', parsedArgs.recipientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
create.post = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::bulkRenew
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:114
 * @route '/sas/admin/renewals/bulk-renew'
 */
export const bulkRenew = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRenew.url(options),
    method: 'post',
})

bulkRenew.definition = {
    methods: ["post"],
    url: '/sas/admin/renewals/bulk-renew',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::bulkRenew
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:114
 * @route '/sas/admin/renewals/bulk-renew'
 */
bulkRenew.url = (options?: RouteQueryOptions) => {
    return bulkRenew.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::bulkRenew
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:114
 * @route '/sas/admin/renewals/bulk-renew'
 */
bulkRenew.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRenew.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
export const history = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/sas/admin/renewals/history/{studentId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
history.url = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    studentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentId: args.studentId,
                }

    return history.definition.url
            .replace('{studentId}', parsedArgs.studentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
history.get = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
history.head = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})
const renewals = {
    index: Object.assign(index, index),
sendReminders: Object.assign(sendReminders, sendReminders),
create: Object.assign(create, create),
bulkRenew: Object.assign(bulkRenew, bulkRenew),
history: Object.assign(history, history),
}

export default renewals