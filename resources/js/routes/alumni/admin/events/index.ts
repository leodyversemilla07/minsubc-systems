import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:12
 * @route '/alumni/admin/events'
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
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:18
 * @route '/alumni/admin/events/create'
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
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:23
 * @route '/alumni/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/alumni/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:23
 * @route '/alumni/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:23
 * @route '/alumni/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:23
 * @route '/alumni/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:23
 * @route '/alumni/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
export const show = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
show.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
show.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
show.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
    const showForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
        showForm.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:39
 * @route '/alumni/admin/events/{event}'
 */
        showForm.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
export const edit = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/events/{event}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
edit.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return edit.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
edit.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
edit.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
    const editForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
        editForm.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:45
 * @route '/alumni/admin/events/{event}/edit'
 */
        editForm.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
export const update = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/alumni/admin/events/{event}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
update.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
update.put = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
update.patch = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
    const updateForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
        updateForm.put = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:50
 * @route '/alumni/admin/events/{event}'
 */
        updateForm.patch = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:65
 * @route '/alumni/admin/events/{event}'
 */
export const destroy = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alumni/admin/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:65
 * @route '/alumni/admin/events/{event}'
 */
destroy.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:65
 * @route '/alumni/admin/events/{event}'
 */
destroy.delete = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:65
 * @route '/alumni/admin/events/{event}'
 */
    const destroyForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EventController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EventController.php:65
 * @route '/alumni/admin/events/{event}'
 */
        destroyForm.delete = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const events = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default events