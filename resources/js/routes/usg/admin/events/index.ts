import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
export const show = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
    const showForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
        showForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
        showForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
export const edit = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/{event}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return edit.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
    const editForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
        editForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
        editForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
export const update = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.put = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
    const updateForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
        updateForm.put = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
        updateForm.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
export const destroy = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
destroy.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
destroy.delete = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
    const destroyForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
        destroyForm.delete = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
export const publish = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

publish.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
publish.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return publish.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
publish.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
    const publishForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
        publishForm.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
export const cancel = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

cancel.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/cancel',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
cancel.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return cancel.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
cancel.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
    const cancelForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
        cancelForm.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
export const archive = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

archive.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/archive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
archive.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return archive.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
archive.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
    const archiveForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: archive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
        archiveForm.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: archive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    archive.form = archiveForm
const events = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
publish: Object.assign(publish, publish),
cancel: Object.assign(cancel, cancel),
archive: Object.assign(archive, archive),
}

export default events