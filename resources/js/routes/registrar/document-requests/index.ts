import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/document-requests/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::create
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:52
 * @route '/document-requests/create'
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
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::store
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:80
 * @route '/document-requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/document-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::store
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:80
 * @route '/document-requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::store
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:80
 * @route '/document-requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::store
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:80
 * @route '/document-requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::store
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:80
 * @route '/document-requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
export const edit = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
edit.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return edit.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
edit.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
edit.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
    const editForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
        editForm.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::edit
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:150
 * @route '/document-requests/{documentRequest}/edit'
 */
        editForm.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::update
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:168
 * @route '/document-requests/{documentRequest}'
 */
export const update = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/document-requests/{documentRequest}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::update
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:168
 * @route '/document-requests/{documentRequest}'
 */
update.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return update.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::update
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:168
 * @route '/document-requests/{documentRequest}'
 */
update.patch = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::update
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:168
 * @route '/document-requests/{documentRequest}'
 */
    const updateForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::update
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:168
 * @route '/document-requests/{documentRequest}'
 */
        updateForm.patch = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::destroy
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:194
 * @route '/document-requests/{documentRequest}'
 */
export const destroy = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/document-requests/{documentRequest}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::destroy
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:194
 * @route '/document-requests/{documentRequest}'
 */
destroy.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return destroy.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::destroy
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:194
 * @route '/document-requests/{documentRequest}'
 */
destroy.delete = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::destroy
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:194
 * @route '/document-requests/{documentRequest}'
 */
    const destroyForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::destroy
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:194
 * @route '/document-requests/{documentRequest}'
 */
        destroyForm.delete = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/document-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::index
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:26
 * @route '/document-requests'
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
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
export const show = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
show.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return show.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
show.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
show.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
    const showForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
        showForm.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::show
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:138
 * @route '/document-requests/{documentRequest}'
 */
        showForm.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::confirmClaim
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:209
 * @route '/document-requests/{documentRequest}/confirm-claim'
 */
export const confirmClaim = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmClaim.url(args, options),
    method: 'post',
})

confirmClaim.definition = {
    methods: ["post"],
    url: '/document-requests/{documentRequest}/confirm-claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::confirmClaim
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:209
 * @route '/document-requests/{documentRequest}/confirm-claim'
 */
confirmClaim.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return confirmClaim.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::confirmClaim
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:209
 * @route '/document-requests/{documentRequest}/confirm-claim'
 */
confirmClaim.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmClaim.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::confirmClaim
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:209
 * @route '/document-requests/{documentRequest}/confirm-claim'
 */
    const confirmClaimForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirmClaim.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\DocumentRequestController::confirmClaim
 * @see Modules/Registrar/app/Http/Controllers/DocumentRequestController.php:209
 * @route '/document-requests/{documentRequest}/confirm-claim'
 */
        confirmClaimForm.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirmClaim.url(args, options),
            method: 'post',
        })
    
    confirmClaim.form = confirmClaimForm
const documentRequests = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
index: Object.assign(index, index),
show: Object.assign(show, show),
confirmClaim: Object.assign(confirmClaim, confirmClaim),
}

export default documentRequests