import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/slots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:98
 * @route '/guidance/admin/slots'
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
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/slots/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:108
 * @route '/guidance/admin/slots/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:114
 * @route '/guidance/admin/slots'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/slots',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:114
 * @route '/guidance/admin/slots'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:114
 * @route '/guidance/admin/slots'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:114
 * @route '/guidance/admin/slots'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:114
 * @route '/guidance/admin/slots'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
export const show = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/slots/{slot}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
show.url = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slot: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slot: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slot: args.slot,
                }

    return show.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
show.get = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
show.head = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
    const showForm = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
        showForm.get = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/slots/{slot}'
 */
        showForm.head = (args: { slot: string | number } | [slot: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:129
 * @route '/guidance/admin/slots/{slot}'
 */
export const destroy = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/slots/{slot}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:129
 * @route '/guidance/admin/slots/{slot}'
 */
destroy.url = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slot: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slot: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slot: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slot: typeof args.slot === 'object'
                ? args.slot.id
                : args.slot,
                }

    return destroy.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:129
 * @route '/guidance/admin/slots/{slot}'
 */
destroy.delete = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:129
 * @route '/guidance/admin/slots/{slot}'
 */
    const destroyForm = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:129
 * @route '/guidance/admin/slots/{slot}'
 */
        destroyForm.delete = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const slots = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default slots