import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/sas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\SASController::index
 * @see Modules/SAS/app/Http/Controllers/SASController.php:13
 * @route '/api/v1/sas'
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
* @see \Modules\SAS\Http\Controllers\SASController::store
 * @see Modules/SAS/app/Http/Controllers/SASController.php:29
 * @route '/api/v1/sas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/sas',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\SASController::store
 * @see Modules/SAS/app/Http/Controllers/SASController.php:29
 * @route '/api/v1/sas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\SASController::store
 * @see Modules/SAS/app/Http/Controllers/SASController.php:29
 * @route '/api/v1/sas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\SASController::store
 * @see Modules/SAS/app/Http/Controllers/SASController.php:29
 * @route '/api/v1/sas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\SASController::store
 * @see Modules/SAS/app/Http/Controllers/SASController.php:29
 * @route '/api/v1/sas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
export const show = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/sas/{sa}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
show.url = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sa: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sa: args.sa,
                }

    return show.definition.url
            .replace('{sa}', parsedArgs.sa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
show.get = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
show.head = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
    const showForm = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
        showForm.get = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\SASController::show
 * @see Modules/SAS/app/Http/Controllers/SASController.php:34
 * @route '/api/v1/sas/{sa}'
 */
        showForm.head = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
export const update = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/sas/{sa}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
update.url = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sa: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sa: args.sa,
                }

    return update.definition.url
            .replace('{sa}', parsedArgs.sa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
update.put = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
update.patch = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
    const updateForm = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
        updateForm.put = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\SAS\Http\Controllers\SASController::update
 * @see Modules/SAS/app/Http/Controllers/SASController.php:50
 * @route '/api/v1/sas/{sa}'
 */
        updateForm.patch = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\SASController::destroy
 * @see Modules/SAS/app/Http/Controllers/SASController.php:55
 * @route '/api/v1/sas/{sa}'
 */
export const destroy = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/sas/{sa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\SASController::destroy
 * @see Modules/SAS/app/Http/Controllers/SASController.php:55
 * @route '/api/v1/sas/{sa}'
 */
destroy.url = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sa: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sa: args.sa,
                }

    return destroy.definition.url
            .replace('{sa}', parsedArgs.sa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\SASController::destroy
 * @see Modules/SAS/app/Http/Controllers/SASController.php:55
 * @route '/api/v1/sas/{sa}'
 */
destroy.delete = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\SASController::destroy
 * @see Modules/SAS/app/Http/Controllers/SASController.php:55
 * @route '/api/v1/sas/{sa}'
 */
    const destroyForm = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\SASController::destroy
 * @see Modules/SAS/app/Http/Controllers/SASController.php:55
 * @route '/api/v1/sas/{sa}'
 */
        destroyForm.delete = (args: { sa: string | number } | [sa: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const sas = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default sas