import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/transparency',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::index
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:26
 * @route '/usg/admin/transparency'
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/transparency/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::create
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:69
 * @route '/usg/admin/transparency/create'
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::store
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:81
 * @route '/usg/admin/transparency'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/transparency',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::store
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:81
 * @route '/usg/admin/transparency'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::store
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:81
 * @route '/usg/admin/transparency'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::store
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:81
 * @route '/usg/admin/transparency'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::store
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:81
 * @route '/usg/admin/transparency'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
export const show = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/transparency/{transparencyReport}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
show.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return show.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
show.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
show.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
    const showForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
        showForm.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::show
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:96
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
        showForm.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
export const edit = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/transparency/{transparencyReport}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
edit.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return edit.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
edit.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
edit.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
    const editForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
        editForm.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:108
 * @route '/usg/admin/transparency/{transparencyReport}/edit'
 */
        editForm.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
export const update = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/transparency/{transparencyReport}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
update.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return update.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
update.put = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
update.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
    const updateForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
        updateForm.put = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::update
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:122
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
        updateForm.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:134
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
export const destroy = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/transparency/{transparencyReport}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:134
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
destroy.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return destroy.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:134
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
destroy.delete = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:134
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
    const destroyForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:134
 * @route '/usg/admin/transparency/{transparencyReport}'
 */
        destroyForm.delete = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
export const download = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/usg/admin/transparency/{transparencyReport}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
download.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return download.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
download.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
download.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
    const downloadForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
        downloadForm.get = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::download
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:166
 * @route '/usg/admin/transparency/{transparencyReport}/download'
 */
        downloadForm.head = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:146
 * @route '/usg/admin/transparency/{transparencyReport}/publish'
 */
export const publish = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

publish.definition = {
    methods: ["patch"],
    url: '/usg/admin/transparency/{transparencyReport}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:146
 * @route '/usg/admin/transparency/{transparencyReport}/publish'
 */
publish.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return publish.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:146
 * @route '/usg/admin/transparency/{transparencyReport}/publish'
 */
publish.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:146
 * @route '/usg/admin/transparency/{transparencyReport}/publish'
 */
    const publishForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:146
 * @route '/usg/admin/transparency/{transparencyReport}/publish'
 */
        publishForm.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:156
 * @route '/usg/admin/transparency/{transparencyReport}/unpublish'
 */
export const unpublish = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unpublish.url(args, options),
    method: 'patch',
})

unpublish.definition = {
    methods: ["patch"],
    url: '/usg/admin/transparency/{transparencyReport}/unpublish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:156
 * @route '/usg/admin/transparency/{transparencyReport}/unpublish'
 */
unpublish.url = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transparencyReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.id
                : args.transparencyReport,
                }

    return unpublish.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:156
 * @route '/usg/admin/transparency/{transparencyReport}/unpublish'
 */
unpublish.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unpublish.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:156
 * @route '/usg/admin/transparency/{transparencyReport}/unpublish'
 */
    const unpublishForm = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unpublish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\TransparencyReportController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/TransparencyReportController.php:156
 * @route '/usg/admin/transparency/{transparencyReport}/unpublish'
 */
        unpublishForm.patch = (args: { transparencyReport: number | { id: number } } | [transparencyReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unpublish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    unpublish.form = unpublishForm
const TransparencyReportController = { index, create, store, show, edit, update, destroy, download, publish, unpublish }

export default TransparencyReportController