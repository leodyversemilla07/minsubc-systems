import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/counselors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:36
 * @route '/guidance/admin/counselors'
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/counselors/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:42
 * @route '/guidance/admin/counselors/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:47
 * @route '/guidance/admin/counselors'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/counselors',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:47
 * @route '/guidance/admin/counselors'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:47
 * @route '/guidance/admin/counselors'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:47
 * @route '/guidance/admin/counselors'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:47
 * @route '/guidance/admin/counselors'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
export const show = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/counselors/{counselor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
show.url = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { counselor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    counselor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        counselor: args.counselor,
                }

    return show.definition.url
            .replace('{counselor}', parsedArgs.counselor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
show.get = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
show.head = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
    const showForm = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
        showForm.get = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/counselors/{counselor}'
 */
        showForm.head = (args: { counselor: string | number } | [counselor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
export const edit = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/counselors/{counselor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
edit.url = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { counselor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { counselor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    counselor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        counselor: typeof args.counselor === 'object'
                ? args.counselor.id
                : args.counselor,
                }

    return edit.definition.url
            .replace('{counselor}', parsedArgs.counselor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
edit.get = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
edit.head = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
    const editForm = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
        editForm.get = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:62
 * @route '/guidance/admin/counselors/{counselor}/edit'
 */
        editForm.head = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
export const update = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/guidance/admin/counselors/{counselor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
update.url = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { counselor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { counselor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    counselor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        counselor: typeof args.counselor === 'object'
                ? args.counselor.id
                : args.counselor,
                }

    return update.definition.url
            .replace('{counselor}', parsedArgs.counselor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
update.put = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
update.patch = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
    const updateForm = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
        updateForm.put = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:67
 * @route '/guidance/admin/counselors/{counselor}'
 */
        updateForm.patch = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:84
 * @route '/guidance/admin/counselors/{counselor}'
 */
export const destroy = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/counselors/{counselor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:84
 * @route '/guidance/admin/counselors/{counselor}'
 */
destroy.url = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { counselor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { counselor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    counselor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        counselor: typeof args.counselor === 'object'
                ? args.counselor.id
                : args.counselor,
                }

    return destroy.definition.url
            .replace('{counselor}', parsedArgs.counselor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:84
 * @route '/guidance/admin/counselors/{counselor}'
 */
destroy.delete = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:84
 * @route '/guidance/admin/counselors/{counselor}'
 */
    const destroyForm = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:84
 * @route '/guidance/admin/counselors/{counselor}'
 */
        destroyForm.delete = (args: { counselor: number | { id: number } } | [counselor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
export const listAvailable = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listAvailable.url(options),
    method: 'get',
})

listAvailable.definition = {
    methods: ["get","head"],
    url: '/api/guidance/counselors/available',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
listAvailable.url = (options?: RouteQueryOptions) => {
    return listAvailable.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
listAvailable.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listAvailable.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
listAvailable.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listAvailable.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
    const listAvailableForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listAvailable.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
        listAvailableForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listAvailable.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::listAvailable
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
        listAvailableForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listAvailable.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listAvailable.form = listAvailableForm
const CounselorController = { index, create, store, show, edit, update, destroy, listAvailable }

export default CounselorController