import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/offenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/admin/discipline/offenses'
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
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:18
 * @route '/admin/discipline/offenses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discipline/offenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:18
 * @route '/admin/discipline/offenses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:18
 * @route '/admin/discipline/offenses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:18
 * @route '/admin/discipline/offenses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:18
 * @route '/admin/discipline/offenses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
export const update = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/discipline/offenses/{offense}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
update.url = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { offense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    offense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        offense: typeof args.offense === 'object'
                ? args.offense.id
                : args.offense,
                }

    return update.definition.url
            .replace('{offense}', parsedArgs.offense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
update.put = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
update.patch = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
    const updateForm = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
        updateForm.put = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:31
 * @route '/admin/discipline/offenses/{offense}'
 */
        updateForm.patch = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:44
 * @route '/admin/discipline/offenses/{offense}'
 */
export const destroy = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/discipline/offenses/{offense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:44
 * @route '/admin/discipline/offenses/{offense}'
 */
destroy.url = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { offense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    offense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        offense: typeof args.offense === 'object'
                ? args.offense.id
                : args.offense,
                }

    return destroy.definition.url
            .replace('{offense}', parsedArgs.offense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:44
 * @route '/admin/discipline/offenses/{offense}'
 */
destroy.delete = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:44
 * @route '/admin/discipline/offenses/{offense}'
 */
    const destroyForm = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:44
 * @route '/admin/discipline/offenses/{offense}'
 */
        destroyForm.delete = (args: { offense: number | { id: number } } | [offense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const offenses = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default offenses