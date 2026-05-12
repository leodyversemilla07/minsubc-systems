import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/positions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::index
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:13
 * @route '/hr/admin/positions'
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
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/hr/admin/positions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::create
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:19
 * @route '/hr/admin/positions/create'
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
* @see \Modules\HR\Http\Controllers\Admin\PositionController::store
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:24
 * @route '/hr/admin/positions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hr/admin/positions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::store
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:24
 * @route '/hr/admin/positions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::store
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:24
 * @route '/hr/admin/positions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::store
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:24
 * @route '/hr/admin/positions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::store
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:24
 * @route '/hr/admin/positions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
export const show = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/admin/positions/{position}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
show.url = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: args.position,
                }

    return show.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
show.get = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
show.head = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
    const showForm = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
        showForm.get = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::show
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:0
 * @route '/hr/admin/positions/{position}'
 */
        showForm.head = (args: { position: string | number } | [position: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
export const edit = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/hr/admin/positions/{position}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
edit.url = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { position: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.id
                : args.position,
                }

    return edit.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
edit.get = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
edit.head = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
    const editForm = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
        editForm.get = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:41
 * @route '/hr/admin/positions/{position}/edit'
 */
        editForm.head = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
export const update = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/hr/admin/positions/{position}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
update.url = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { position: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.id
                : args.position,
                }

    return update.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
update.put = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
update.patch = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
    const updateForm = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
        updateForm.put = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::update
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:46
 * @route '/hr/admin/positions/{position}'
 */
        updateForm.patch = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:64
 * @route '/hr/admin/positions/{position}'
 */
export const destroy = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hr/admin/positions/{position}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:64
 * @route '/hr/admin/positions/{position}'
 */
destroy.url = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { position: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.id
                : args.position,
                }

    return destroy.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:64
 * @route '/hr/admin/positions/{position}'
 */
destroy.delete = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:64
 * @route '/hr/admin/positions/{position}'
 */
    const destroyForm = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/PositionController.php:64
 * @route '/hr/admin/positions/{position}'
 */
        destroyForm.delete = (args: { position: number | { id: number } } | [position: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const positions = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default positions