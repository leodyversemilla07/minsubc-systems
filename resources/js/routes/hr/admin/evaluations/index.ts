import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/hr/admin/evaluations'
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
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/hr/admin/evaluations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:29
 * @route '/hr/admin/evaluations/create'
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
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:36
 * @route '/hr/admin/evaluations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hr/admin/evaluations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:36
 * @route '/hr/admin/evaluations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:36
 * @route '/hr/admin/evaluations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:36
 * @route '/hr/admin/evaluations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:36
 * @route '/hr/admin/evaluations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
export const show = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/admin/evaluations/{evaluation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
show.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { evaluation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    evaluation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        evaluation: typeof args.evaluation === 'object'
                ? args.evaluation.id
                : args.evaluation,
                }

    return show.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
show.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
show.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
    const showForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
        showForm.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EvaluationController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EvaluationController.php:56
 * @route '/hr/admin/evaluations/{evaluation}'
 */
        showForm.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const evaluations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
}

export default evaluations