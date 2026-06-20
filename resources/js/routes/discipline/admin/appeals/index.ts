import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/appeals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:11
 * @route '/admin/discipline/appeals'
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
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
export const show = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/appeals/{appeal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
show.url = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appeal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appeal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appeal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appeal: typeof args.appeal === 'object'
                ? args.appeal.id
                : args.appeal,
                }

    return show.definition.url
            .replace('{appeal}', parsedArgs.appeal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
show.get = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
show.head = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
    const showForm = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
        showForm.get = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::show
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:18
 * @route '/admin/discipline/appeals/{appeal}'
 */
        showForm.head = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:24
 * @route '/admin/discipline/appeals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discipline/appeals',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:24
 * @route '/admin/discipline/appeals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:24
 * @route '/admin/discipline/appeals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:24
 * @route '/admin/discipline/appeals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:24
 * @route '/admin/discipline/appeals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::review
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:36
 * @route '/admin/discipline/appeals/{appeal}/review'
 */
export const review = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: review.url(args, options),
    method: 'put',
})

review.definition = {
    methods: ["put"],
    url: '/admin/discipline/appeals/{appeal}/review',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::review
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:36
 * @route '/admin/discipline/appeals/{appeal}/review'
 */
review.url = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appeal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appeal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appeal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appeal: typeof args.appeal === 'object'
                ? args.appeal.id
                : args.appeal,
                }

    return review.definition.url
            .replace('{appeal}', parsedArgs.appeal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::review
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:36
 * @route '/admin/discipline/appeals/{appeal}/review'
 */
review.put = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: review.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::review
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:36
 * @route '/admin/discipline/appeals/{appeal}/review'
 */
    const reviewForm = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: review.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\AppealController::review
 * @see Modules/Discipline/app/Http/Controllers/Admin/AppealController.php:36
 * @route '/admin/discipline/appeals/{appeal}/review'
 */
        reviewForm.put = (args: { appeal: number | { id: number } } | [appeal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: review.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    review.form = reviewForm
const appeals = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
store: Object.assign(store, store),
review: Object.assign(review, review),
}

export default appeals