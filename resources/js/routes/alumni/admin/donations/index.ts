import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/donations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:11
 * @route '/alumni/admin/donations'
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
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/donations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:17
 * @route '/alumni/admin/donations/create'
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
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:23
 * @route '/alumni/admin/donations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/alumni/admin/donations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:23
 * @route '/alumni/admin/donations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:23
 * @route '/alumni/admin/donations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:23
 * @route '/alumni/admin/donations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:23
 * @route '/alumni/admin/donations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
export const show = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/donations/{donation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
show.url = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { donation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { donation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    donation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        donation: typeof args.donation === 'object'
                ? args.donation.id
                : args.donation,
                }

    return show.definition.url
            .replace('{donation}', parsedArgs.donation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
show.get = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
show.head = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
    const showForm = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
        showForm.get = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:38
 * @route '/alumni/admin/donations/{donation}'
 */
        showForm.head = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:44
 * @route '/alumni/admin/donations/{donation}'
 */
export const destroy = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alumni/admin/donations/{donation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:44
 * @route '/alumni/admin/donations/{donation}'
 */
destroy.url = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { donation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { donation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    donation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        donation: typeof args.donation === 'object'
                ? args.donation.id
                : args.donation,
                }

    return destroy.definition.url
            .replace('{donation}', parsedArgs.donation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:44
 * @route '/alumni/admin/donations/{donation}'
 */
destroy.delete = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:44
 * @route '/alumni/admin/donations/{donation}'
 */
    const destroyForm = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DonationController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/DonationController.php:44
 * @route '/alumni/admin/donations/{donation}'
 */
        destroyForm.delete = (args: { donation: number | { id: number } } | [donation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const donations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default donations