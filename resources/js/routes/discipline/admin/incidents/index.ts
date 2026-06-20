import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/incidents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:12
 * @route '/admin/discipline/incidents'
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
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/incidents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::create
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:19
 * @route '/admin/discipline/incidents/create'
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
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:25
 * @route '/admin/discipline/incidents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discipline/incidents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:25
 * @route '/admin/discipline/incidents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:25
 * @route '/admin/discipline/incidents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:25
 * @route '/admin/discipline/incidents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:25
 * @route '/admin/discipline/incidents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
export const show = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/incidents/{incident}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
show.url = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incident: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incident: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident: typeof args.incident === 'object'
                ? args.incident.id
                : args.incident,
                }

    return show.definition.url
            .replace('{incident}', parsedArgs.incident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
show.get = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
show.head = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
    const showForm = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
        showForm.get = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:41
 * @route '/admin/discipline/incidents/{incident}'
 */
        showForm.head = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:47
 * @route '/admin/discipline/incidents/{incident}'
 */
export const update = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/discipline/incidents/{incident}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:47
 * @route '/admin/discipline/incidents/{incident}'
 */
update.url = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incident: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incident: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident: typeof args.incident === 'object'
                ? args.incident.id
                : args.incident,
                }

    return update.definition.url
            .replace('{incident}', parsedArgs.incident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:47
 * @route '/admin/discipline/incidents/{incident}'
 */
update.put = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:47
 * @route '/admin/discipline/incidents/{incident}'
 */
    const updateForm = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\IncidentController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/IncidentController.php:47
 * @route '/admin/discipline/incidents/{incident}'
 */
        updateForm.put = (args: { incident: number | { id: number } } | [incident: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const incidents = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
}

export default incidents