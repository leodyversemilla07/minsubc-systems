import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:11
 * @route '/admin/facilities/maintenance'
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
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:18
 * @route '/admin/facilities/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/facilities/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:18
 * @route '/admin/facilities/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:18
 * @route '/admin/facilities/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:18
 * @route '/admin/facilities/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:18
 * @route '/admin/facilities/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:33
 * @route '/admin/facilities/maintenance/{maintenance}'
 */
export const update = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/facilities/maintenance/{maintenance}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:33
 * @route '/admin/facilities/maintenance/{maintenance}'
 */
update.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return update.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:33
 * @route '/admin/facilities/maintenance/{maintenance}'
 */
update.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:33
 * @route '/admin/facilities/maintenance/{maintenance}'
 */
    const updateForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\MaintenanceController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/MaintenanceController.php:33
 * @route '/admin/facilities/maintenance/{maintenance}'
 */
        updateForm.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const maintenance = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default maintenance