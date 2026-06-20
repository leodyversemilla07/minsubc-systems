import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:11
 * @route '/clinic/admin/appointments'
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
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/appointments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:17
 * @route '/clinic/admin/appointments/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:22
 * @route '/clinic/admin/appointments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:22
 * @route '/clinic/admin/appointments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:22
 * @route '/clinic/admin/appointments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:22
 * @route '/clinic/admin/appointments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:22
 * @route '/clinic/admin/appointments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
export const show = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/appointments/{appointment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
show.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return show.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
show.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
show.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
    const showForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
        showForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:34
 * @route '/clinic/admin/appointments/{appointment}'
 */
        showForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
export const edit = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/appointments/{appointment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
edit.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return edit.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
edit.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
edit.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
    const editForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
        editForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:39
 * @route '/clinic/admin/appointments/{appointment}/edit'
 */
        editForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
export const update = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/appointments/{appointment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
update.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return update.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
update.put = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
update.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
    const updateForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
        updateForm.put = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:44
 * @route '/clinic/admin/appointments/{appointment}'
 */
        updateForm.patch = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:54
 * @route '/clinic/admin/appointments/{appointment}'
 */
export const destroy = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/appointments/{appointment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:54
 * @route '/clinic/admin/appointments/{appointment}'
 */
destroy.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return destroy.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:54
 * @route '/clinic/admin/appointments/{appointment}'
 */
destroy.delete = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:54
 * @route '/clinic/admin/appointments/{appointment}'
 */
    const destroyForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\AppointmentController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/AppointmentController.php:54
 * @route '/clinic/admin/appointments/{appointment}'
 */
        destroyForm.delete = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AppointmentController = { index, create, store, show, edit, update, destroy }

export default AppointmentController