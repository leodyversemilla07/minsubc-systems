import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/my/appointments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::create
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::store
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/my/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::store
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::store
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::store
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::store
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
export const cancel = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/guidance/my/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
cancel.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return cancel.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
cancel.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
    const cancelForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
        cancelForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const appointments = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
cancel: Object.assign(cancel, cancel),
}

export default appointments