import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:11
 * @route '/admin/facilities/reservations'
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
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
export const show = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/reservations/{reservation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
show.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return show.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
show.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
show.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
    const showForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
        showForm.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:18
 * @route '/admin/facilities/reservations/{reservation}'
 */
        showForm.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::approve
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:24
 * @route '/admin/facilities/reservations/{reservation}/approve'
 */
export const approve = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/facilities/reservations/{reservation}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::approve
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:24
 * @route '/admin/facilities/reservations/{reservation}/approve'
 */
approve.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return approve.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::approve
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:24
 * @route '/admin/facilities/reservations/{reservation}/approve'
 */
approve.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::approve
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:24
 * @route '/admin/facilities/reservations/{reservation}/approve'
 */
    const approveForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::approve
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:24
 * @route '/admin/facilities/reservations/{reservation}/approve'
 */
        approveForm.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::reject
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:34
 * @route '/admin/facilities/reservations/{reservation}/reject'
 */
export const reject = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/facilities/reservations/{reservation}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::reject
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:34
 * @route '/admin/facilities/reservations/{reservation}/reject'
 */
reject.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return reject.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::reject
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:34
 * @route '/admin/facilities/reservations/{reservation}/reject'
 */
reject.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::reject
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:34
 * @route '/admin/facilities/reservations/{reservation}/reject'
 */
    const rejectForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::reject
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:34
 * @route '/admin/facilities/reservations/{reservation}/reject'
 */
        rejectForm.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::complete
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:43
 * @route '/admin/facilities/reservations/{reservation}/complete'
 */
export const complete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/admin/facilities/reservations/{reservation}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::complete
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:43
 * @route '/admin/facilities/reservations/{reservation}/complete'
 */
complete.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return complete.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::complete
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:43
 * @route '/admin/facilities/reservations/{reservation}/complete'
 */
complete.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::complete
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:43
 * @route '/admin/facilities/reservations/{reservation}/complete'
 */
    const completeForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\ReservationController::complete
 * @see Modules/Facilities/app/Http/Controllers/Admin/ReservationController.php:43
 * @route '/admin/facilities/reservations/{reservation}/complete'
 */
        completeForm.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
const reservations = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
complete: Object.assign(complete, complete),
}

export default reservations