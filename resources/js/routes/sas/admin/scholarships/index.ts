import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
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
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
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
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/scholarships',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const show = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return show.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
    const showForm = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
        showForm.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
        showForm.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
export const edit = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/{scholarship}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return edit.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
    const editForm = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
        editForm.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
        editForm.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const update = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return update.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.put = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.patch = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
    const updateForm = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
        updateForm.put = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
        updateForm.patch = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const destroy = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
destroy.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return destroy.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
destroy.delete = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
    const destroyForm = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
        destroyForm.delete = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const scholarships = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default scholarships