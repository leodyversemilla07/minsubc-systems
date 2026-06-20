import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/offense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:11
 * @route '/admin/discipline/offense-categories'
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
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:17
 * @route '/admin/discipline/offense-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discipline/offense-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:17
 * @route '/admin/discipline/offense-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:17
 * @route '/admin/discipline/offense-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:17
 * @route '/admin/discipline/offense-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:17
 * @route '/admin/discipline/offense-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
export const update = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/discipline/offense-categories/{offense_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
update.url = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offense_category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { offense_category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    offense_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        offense_category: typeof args.offense_category === 'object'
                ? args.offense_category.id
                : args.offense_category,
                }

    return update.definition.url
            .replace('{offense_category}', parsedArgs.offense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
update.put = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
update.patch = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
    const updateForm = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
        updateForm.put = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:29
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
        updateForm.patch = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:41
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
export const destroy = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/discipline/offense-categories/{offense_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:41
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
destroy.url = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offense_category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { offense_category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    offense_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        offense_category: typeof args.offense_category === 'object'
                ? args.offense_category.id
                : args.offense_category,
                }

    return destroy.definition.url
            .replace('{offense_category}', parsedArgs.offense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:41
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
destroy.delete = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:41
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
    const destroyForm = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController::destroy
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseCategoryController.php:41
 * @route '/admin/discipline/offense-categories/{offense_category}'
 */
        destroyForm.delete = (args: { offense_category: number | { id: number } } | [offense_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const OffenseCategoryController = { index, store, update, destroy }

export default OffenseCategoryController