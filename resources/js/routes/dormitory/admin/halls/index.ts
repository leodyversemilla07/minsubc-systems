import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/halls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:11
 * @route '/admin/dormitory/halls'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/halls/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/create'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:16
 * @route '/admin/dormitory/halls'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/dormitory/halls',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:16
 * @route '/admin/dormitory/halls'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:16
 * @route '/admin/dormitory/halls'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:16
 * @route '/admin/dormitory/halls'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:16
 * @route '/admin/dormitory/halls'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
export const show = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/halls/{hall}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
show.url = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hall: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    hall: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hall: args.hall,
                }

    return show.definition.url
            .replace('{hall}', parsedArgs.hall.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
show.get = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
show.head = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
    const showForm = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
        showForm.get = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::show
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}'
 */
        showForm.head = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
export const edit = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/halls/{hall}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
edit.url = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hall: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    hall: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hall: args.hall,
                }

    return edit.definition.url
            .replace('{hall}', parsedArgs.hall.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
edit.get = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
edit.head = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
    const editForm = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
        editForm.get = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::edit
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:0
 * @route '/admin/dormitory/halls/{hall}/edit'
 */
        editForm.head = (args: { hall: string | number } | [hall: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
export const update = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/dormitory/halls/{hall}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
update.url = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hall: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hall: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hall: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hall: typeof args.hall === 'object'
                ? args.hall.id
                : args.hall,
                }

    return update.definition.url
            .replace('{hall}', parsedArgs.hall.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
update.put = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
update.patch = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
    const updateForm = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
        updateForm.put = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::update
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:29
 * @route '/admin/dormitory/halls/{hall}'
 */
        updateForm.patch = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:43
 * @route '/admin/dormitory/halls/{hall}'
 */
export const destroy = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/dormitory/halls/{hall}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:43
 * @route '/admin/dormitory/halls/{hall}'
 */
destroy.url = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hall: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hall: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hall: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hall: typeof args.hall === 'object'
                ? args.hall.id
                : args.hall,
                }

    return destroy.definition.url
            .replace('{hall}', parsedArgs.hall.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:43
 * @route '/admin/dormitory/halls/{hall}'
 */
destroy.delete = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:43
 * @route '/admin/dormitory/halls/{hall}'
 */
    const destroyForm = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\HallController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/HallController.php:43
 * @route '/admin/dormitory/halls/{hall}'
 */
        destroyForm.delete = (args: { hall: number | { id: number } } | [hall: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const halls = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default halls