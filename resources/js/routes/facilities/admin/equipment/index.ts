import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/equipment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:11
 * @route '/admin/facilities/equipment'
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
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:17
 * @route '/admin/facilities/equipment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/facilities/equipment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:17
 * @route '/admin/facilities/equipment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:17
 * @route '/admin/facilities/equipment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:17
 * @route '/admin/facilities/equipment'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:17
 * @route '/admin/facilities/equipment'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
export const update = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/facilities/equipment/{equipment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
update.url = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { equipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { equipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    equipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        equipment: typeof args.equipment === 'object'
                ? args.equipment.id
                : args.equipment,
                }

    return update.definition.url
            .replace('{equipment}', parsedArgs.equipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
update.put = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
update.patch = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
    const updateForm = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
        updateForm.put = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:35
 * @route '/admin/facilities/equipment/{equipment}'
 */
        updateForm.patch = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:54
 * @route '/admin/facilities/equipment/{equipment}'
 */
export const destroy = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/facilities/equipment/{equipment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:54
 * @route '/admin/facilities/equipment/{equipment}'
 */
destroy.url = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { equipment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { equipment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    equipment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        equipment: typeof args.equipment === 'object'
                ? args.equipment.id
                : args.equipment,
                }

    return destroy.definition.url
            .replace('{equipment}', parsedArgs.equipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:54
 * @route '/admin/facilities/equipment/{equipment}'
 */
destroy.delete = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:54
 * @route '/admin/facilities/equipment/{equipment}'
 */
    const destroyForm = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\EquipmentController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/EquipmentController.php:54
 * @route '/admin/facilities/equipment/{equipment}'
 */
        destroyForm.delete = (args: { equipment: number | { id: number } } | [equipment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const equipment = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default equipment