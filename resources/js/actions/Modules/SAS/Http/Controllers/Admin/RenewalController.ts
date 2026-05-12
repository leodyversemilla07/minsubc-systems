import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:21
 * @route '/sas/admin/renewals'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::sendReminders
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:69
 * @route '/sas/admin/renewals/send-reminders'
 */
    const sendRemindersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendReminders.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::sendReminders
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:69
 * @route '/sas/admin/renewals/send-reminders'
 */
        sendRemindersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendReminders.url(options),
            method: 'post',
        })
    
    sendReminders.form = sendRemindersForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::createRenewal
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
export const createRenewal = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRenewal.url(args, options),
    method: 'post',
})

createRenewal.definition = {
    methods: ["post"],
    url: '/sas/admin/renewals/{recipientId}/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::createRenewal
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
createRenewal.url = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return createRenewal.definition.url
            .replace('{recipientId}', parsedArgs.recipientId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::createRenewal
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
createRenewal.post = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRenewal.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::createRenewal
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
    const createRenewalForm = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createRenewal.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::createRenewal
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:87
 * @route '/sas/admin/renewals/{recipientId}/create'
 */
        createRenewalForm.post = (args: { recipientId: string | number } | [recipientId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createRenewal.url(args, options),
            method: 'post',
        })
    
    createRenewal.form = createRenewalForm
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
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::bulkRenew
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:114
 * @route '/sas/admin/renewals/bulk-renew'
 */
    const bulkRenewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkRenew.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::bulkRenew
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:114
 * @route '/sas/admin/renewals/bulk-renew'
 */
        bulkRenewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkRenew.url(options),
            method: 'post',
        })
    
    bulkRenew.form = bulkRenewForm
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

    /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
    const historyForm = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
        historyForm.get = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\RenewalController::history
 * @see Modules/SAS/app/Http/Controllers/Admin/RenewalController.php:154
 * @route '/sas/admin/renewals/history/{studentId}'
 */
        historyForm.head = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
const RenewalController = { index, sendReminders, createRenewal, bulkRenew, history }

export default RenewalController