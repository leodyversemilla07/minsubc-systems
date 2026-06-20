import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/dormitory/maintenance'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/maintenance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/create'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:16
 * @route '/admin/dormitory/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/dormitory/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:16
 * @route '/admin/dormitory/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:16
 * @route '/admin/dormitory/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:16
 * @route '/admin/dormitory/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:16
 * @route '/admin/dormitory/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/{maintenance}'
 */
export const destroy = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/dormitory/maintenance/{maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/{maintenance}'
 */
destroy.url = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: args.maintenance,
                }

    return destroy.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/{maintenance}'
 */
destroy.delete = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/{maintenance}'
 */
    const destroyForm = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/dormitory/maintenance/{maintenance}'
 */
        destroyForm.delete = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::resolve
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:26
 * @route '/admin/dormitory/maintenance/{maintenance}/resolve'
 */
export const resolve = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resolve.url(args, options),
    method: 'patch',
})

resolve.definition = {
    methods: ["patch"],
    url: '/admin/dormitory/maintenance/{maintenance}/resolve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::resolve
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:26
 * @route '/admin/dormitory/maintenance/{maintenance}/resolve'
 */
resolve.url = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: args.maintenance,
                }

    return resolve.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::resolve
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:26
 * @route '/admin/dormitory/maintenance/{maintenance}/resolve'
 */
resolve.patch = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resolve.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::resolve
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:26
 * @route '/admin/dormitory/maintenance/{maintenance}/resolve'
 */
    const resolveForm = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resolve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\MaintenanceController::resolve
 * @see Modules/Dormitory/app/Http/Controllers/Admin/MaintenanceController.php:26
 * @route '/admin/dormitory/maintenance/{maintenance}/resolve'
 */
        resolveForm.patch = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resolve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    resolve.form = resolveForm
const maintenance = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
resolve: Object.assign(resolve, resolve),
}

export default maintenance