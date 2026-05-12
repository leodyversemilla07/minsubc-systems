import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:25
 * @route '/sas/admin/activities'
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/activities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:43
 * @route '/sas/admin/activities/create'
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:55
 * @route '/sas/admin/activities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:55
 * @route '/sas/admin/activities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:55
 * @route '/sas/admin/activities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:55
 * @route '/sas/admin/activities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:55
 * @route '/sas/admin/activities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
export const show = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/activities/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
show.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return show.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
show.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
show.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
    const showForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
        showForm.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:71
 * @route '/sas/admin/activities/{activity}'
 */
        showForm.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
export const edit = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/activities/{activity}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
edit.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return edit.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
edit.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
edit.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
    const editForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
        editForm.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:83
 * @route '/sas/admin/activities/{activity}/edit'
 */
        editForm.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
export const update = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/activities/{activity}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
update.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return update.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
update.put = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
update.patch = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
    const updateForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
        updateForm.put = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:97
 * @route '/sas/admin/activities/{activity}'
 */
        updateForm.patch = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:110
 * @route '/sas/admin/activities/{activity}'
 */
export const destroy = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/activities/{activity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:110
 * @route '/sas/admin/activities/{activity}'
 */
destroy.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return destroy.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:110
 * @route '/sas/admin/activities/{activity}'
 */
destroy.delete = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:110
 * @route '/sas/admin/activities/{activity}'
 */
    const destroyForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:110
 * @route '/sas/admin/activities/{activity}'
 */
        destroyForm.delete = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::complete
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:123
 * @route '/sas/admin/activities/{id}/complete'
 */
export const complete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/sas/admin/activities/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::complete
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:123
 * @route '/sas/admin/activities/{id}/complete'
 */
complete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return complete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::complete
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:123
 * @route '/sas/admin/activities/{id}/complete'
 */
complete.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::complete
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:123
 * @route '/sas/admin/activities/{id}/complete'
 */
    const completeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::complete
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:123
 * @route '/sas/admin/activities/{id}/complete'
 */
        completeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::cancel
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:144
 * @route '/sas/admin/activities/{id}/cancel'
 */
export const cancel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/sas/admin/activities/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::cancel
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:144
 * @route '/sas/admin/activities/{id}/cancel'
 */
cancel.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return cancel.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::cancel
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:144
 * @route '/sas/admin/activities/{id}/cancel'
 */
cancel.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::cancel
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:144
 * @route '/sas/admin/activities/{id}/cancel'
 */
    const cancelForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ActivityController::cancel
 * @see Modules/SAS/app/Http/Controllers/Admin/ActivityController.php:144
 * @route '/sas/admin/activities/{id}/cancel'
 */
        cancelForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const activities = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
complete: Object.assign(complete, complete),
cancel: Object.assign(cancel, cancel),
}

export default activities