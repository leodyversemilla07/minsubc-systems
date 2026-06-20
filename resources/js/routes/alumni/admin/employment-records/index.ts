import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/employment-records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:11
 * @route '/alumni/admin/employment-records'
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
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/employment-records/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:17
 * @route '/alumni/admin/employment-records/create'
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
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:23
 * @route '/alumni/admin/employment-records'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/alumni/admin/employment-records',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:23
 * @route '/alumni/admin/employment-records'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:23
 * @route '/alumni/admin/employment-records'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:23
 * @route '/alumni/admin/employment-records'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:23
 * @route '/alumni/admin/employment-records'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
export const show = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/employment-records/{employment_record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
show.url = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employment_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    employment_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employment_record: args.employment_record,
                }

    return show.definition.url
            .replace('{employment_record}', parsedArgs.employment_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
show.get = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
show.head = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
    const showForm = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
        showForm.get = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:0
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
        showForm.head = (args: { employment_record: string | number } | [employment_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
export const edit = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/employment-records/{employment_record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
edit.url = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employment_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employment_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employment_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employment_record: typeof args.employment_record === 'object'
                ? args.employment_record.id
                : args.employment_record,
                }

    return edit.definition.url
            .replace('{employment_record}', parsedArgs.employment_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
edit.get = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
edit.head = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
    const editForm = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
        editForm.get = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:39
 * @route '/alumni/admin/employment-records/{employment_record}/edit'
 */
        editForm.head = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
export const update = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/alumni/admin/employment-records/{employment_record}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
update.url = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employment_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employment_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employment_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employment_record: typeof args.employment_record === 'object'
                ? args.employment_record.id
                : args.employment_record,
                }

    return update.definition.url
            .replace('{employment_record}', parsedArgs.employment_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
update.put = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
update.patch = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
    const updateForm = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
        updateForm.put = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:45
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
        updateForm.patch = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:58
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
export const destroy = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alumni/admin/employment-records/{employment_record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:58
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
destroy.url = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employment_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employment_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employment_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employment_record: typeof args.employment_record === 'object'
                ? args.employment_record.id
                : args.employment_record,
                }

    return destroy.definition.url
            .replace('{employment_record}', parsedArgs.employment_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:58
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
destroy.delete = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:58
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
    const destroyForm = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/EmploymentRecordController.php:58
 * @route '/alumni/admin/employment-records/{employment_record}'
 */
        destroyForm.delete = (args: { employment_record: number | { id: number } } | [employment_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const employmentRecords = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default employmentRecords