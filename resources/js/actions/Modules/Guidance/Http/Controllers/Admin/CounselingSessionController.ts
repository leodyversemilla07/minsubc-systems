import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:202
 * @route '/guidance/admin/sessions'
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/sessions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:217
 * @route '/guidance/admin/sessions/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:224
 * @route '/guidance/admin/sessions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/sessions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:224
 * @route '/guidance/admin/sessions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:224
 * @route '/guidance/admin/sessions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:224
 * @route '/guidance/admin/sessions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:224
 * @route '/guidance/admin/sessions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
export const show = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/sessions/{session}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
show.url = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { session: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: typeof args.session === 'object'
                ? args.session.id
                : args.session,
                }

    return show.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
show.get = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
show.head = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
    const showForm = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
        showForm.get = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:248
 * @route '/guidance/admin/sessions/{session}'
 */
        showForm.head = (args: { session: number | { id: number } } | [session: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
export const edit = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/sessions/{session}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
edit.url = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: args.session,
                }

    return edit.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
edit.get = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
edit.head = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
    const editForm = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
        editForm.get = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/edit'
 */
        editForm.head = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
export const update = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/guidance/admin/sessions/{session}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
update.url = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: args.session,
                }

    return update.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
update.put = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
update.patch = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
    const updateForm = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
        updateForm.put = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
        updateForm.patch = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
export const destroy = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/sessions/{session}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
destroy.url = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: args.session,
                }

    return destroy.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
destroy.delete = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
    const destroyForm = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}'
 */
        destroyForm.delete = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
export const print = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/sessions/{session}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
print.url = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: args.session,
                }

    return print.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
print.get = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
print.head = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
    const printForm = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: print.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
        printForm.get = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/sessions/{session}/print'
 */
        printForm.head = (args: { session: string | number } | [session: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    print.form = printForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
export const searchStudents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchStudents.url(options),
    method: 'get',
})

searchStudents.definition = {
    methods: ["get","head"],
    url: '/api/guidance/students/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
searchStudents.url = (options?: RouteQueryOptions) => {
    return searchStudents.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
searchStudents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchStudents.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
searchStudents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchStudents.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
    const searchStudentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: searchStudents.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
        searchStudentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchStudents.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::searchStudents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
        searchStudentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchStudents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    searchStudents.form = searchStudentsForm
const CounselingSessionController = { index, create, store, show, edit, update, destroy, print, searchStudents }

export default CounselingSessionController