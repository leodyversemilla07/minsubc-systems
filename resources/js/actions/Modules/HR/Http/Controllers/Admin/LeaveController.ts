import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::index
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:15
 * @route '/hr/admin/leave'
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
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
export const show = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/admin/leave/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
show.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return show.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
show.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
show.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
    const showForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
        showForm.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::show
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:39
 * @route '/hr/admin/leave/{leaveRequest}'
 */
        showForm.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::approve
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:45
 * @route '/hr/admin/leave/{leaveRequest}/approve'
 */
export const approve = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/hr/admin/leave/{leaveRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::approve
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:45
 * @route '/hr/admin/leave/{leaveRequest}/approve'
 */
approve.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return approve.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::approve
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:45
 * @route '/hr/admin/leave/{leaveRequest}/approve'
 */
approve.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::approve
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:45
 * @route '/hr/admin/leave/{leaveRequest}/approve'
 */
    const approveForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::approve
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:45
 * @route '/hr/admin/leave/{leaveRequest}/approve'
 */
        approveForm.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::reject
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:59
 * @route '/hr/admin/leave/{leaveRequest}/reject'
 */
export const reject = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/hr/admin/leave/{leaveRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::reject
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:59
 * @route '/hr/admin/leave/{leaveRequest}/reject'
 */
reject.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return reject.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::reject
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:59
 * @route '/hr/admin/leave/{leaveRequest}/reject'
 */
reject.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::reject
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:59
 * @route '/hr/admin/leave/{leaveRequest}/reject'
 */
    const rejectForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\LeaveController::reject
 * @see Modules/HR/app/Http/Controllers/Admin/LeaveController.php:59
 * @route '/hr/admin/leave/{leaveRequest}/reject'
 */
        rejectForm.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const LeaveController = { index, show, approve, reject }

export default LeaveController