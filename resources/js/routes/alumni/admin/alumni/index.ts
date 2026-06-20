import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/alumni',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:11
 * @route '/alumni/admin/alumni'
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
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/alumni/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:19
 * @route '/alumni/admin/alumni/create'
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
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:24
 * @route '/alumni/admin/alumni'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/alumni/admin/alumni',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:24
 * @route '/alumni/admin/alumni'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:24
 * @route '/alumni/admin/alumni'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:24
 * @route '/alumni/admin/alumni'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:24
 * @route '/alumni/admin/alumni'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
export const show = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/alumni/{alumnus}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
show.url = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alumnus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: typeof args.alumnus === 'object'
                ? args.alumnus.id
                : args.alumnus,
                }

    return show.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
show.get = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
show.head = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
    const showForm = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
        showForm.get = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:39
 * @route '/alumni/admin/alumni/{alumnus}'
 */
        showForm.head = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
export const edit = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/alumni/{alumnus}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
edit.url = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alumnus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: typeof args.alumnus === 'object'
                ? args.alumnus.id
                : args.alumnus,
                }

    return edit.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
edit.get = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
edit.head = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
    const editForm = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
        editForm.get = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:45
 * @route '/alumni/admin/alumni/{alumnus}/edit'
 */
        editForm.head = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
export const update = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/alumni/admin/alumni/{alumnus}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
update.url = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alumnus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: typeof args.alumnus === 'object'
                ? args.alumnus.id
                : args.alumnus,
                }

    return update.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
update.put = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
update.patch = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
    const updateForm = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
        updateForm.put = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:50
 * @route '/alumni/admin/alumni/{alumnus}'
 */
        updateForm.patch = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:63
 * @route '/alumni/admin/alumni/{alumnus}'
 */
export const destroy = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alumni/admin/alumni/{alumnus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:63
 * @route '/alumni/admin/alumni/{alumnus}'
 */
destroy.url = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alumnus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: typeof args.alumnus === 'object'
                ? args.alumnus.id
                : args.alumnus,
                }

    return destroy.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:63
 * @route '/alumni/admin/alumni/{alumnus}'
 */
destroy.delete = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:63
 * @route '/alumni/admin/alumni/{alumnus}'
 */
    const destroyForm = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\AlumnusController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/AlumnusController.php:63
 * @route '/alumni/admin/alumni/{alumnus}'
 */
        destroyForm.delete = (args: { alumnus: number | { id: number } } | [alumnus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const alumni = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default alumni