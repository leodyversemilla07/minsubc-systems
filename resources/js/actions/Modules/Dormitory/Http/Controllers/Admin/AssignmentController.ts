import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:12
 * @route '/admin/dormitory/assignments'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/assignments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/create'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:18
 * @route '/admin/dormitory/assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/dormitory/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:18
 * @route '/admin/dormitory/assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:18
 * @route '/admin/dormitory/assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:18
 * @route '/admin/dormitory/assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:18
 * @route '/admin/dormitory/assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/{assignment}'
 */
export const destroy = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/dormitory/assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/{assignment}'
 */
destroy.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: args.assignment,
                }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/{assignment}'
 */
destroy.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/{assignment}'
 */
    const destroyForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:0
 * @route '/admin/dormitory/assignments/{assignment}'
 */
        destroyForm.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::checkout
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:31
 * @route '/admin/dormitory/assignments/{assignment}/checkout'
 */
export const checkout = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: checkout.url(args, options),
    method: 'patch',
})

checkout.definition = {
    methods: ["patch"],
    url: '/admin/dormitory/assignments/{assignment}/checkout',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::checkout
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:31
 * @route '/admin/dormitory/assignments/{assignment}/checkout'
 */
checkout.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return checkout.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::checkout
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:31
 * @route '/admin/dormitory/assignments/{assignment}/checkout'
 */
checkout.patch = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: checkout.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::checkout
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:31
 * @route '/admin/dormitory/assignments/{assignment}/checkout'
 */
    const checkoutForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkout.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\AssignmentController::checkout
 * @see Modules/Dormitory/app/Http/Controllers/Admin/AssignmentController.php:31
 * @route '/admin/dormitory/assignments/{assignment}/checkout'
 */
        checkoutForm.patch = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkout.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    checkout.form = checkoutForm
const AssignmentController = { index, create, store, destroy, checkout }

export default AssignmentController