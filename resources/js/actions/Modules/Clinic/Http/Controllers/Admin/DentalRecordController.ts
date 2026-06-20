import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/dental-records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:11
 * @route '/clinic/admin/dental-records'
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
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/dental-records/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:17
 * @route '/clinic/admin/dental-records/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:23
 * @route '/clinic/admin/dental-records'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/dental-records',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:23
 * @route '/clinic/admin/dental-records'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:23
 * @route '/clinic/admin/dental-records'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:23
 * @route '/clinic/admin/dental-records'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:23
 * @route '/clinic/admin/dental-records'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
export const show = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/dental-records/{dental_record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
show.url = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dental_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dental_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dental_record: args.dental_record,
                }

    return show.definition.url
            .replace('{dental_record}', parsedArgs.dental_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
show.get = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
show.head = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
    const showForm = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
        showForm.get = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
        showForm.head = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
export const edit = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/dental-records/{dental_record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
edit.url = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dental_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dental_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dental_record: args.dental_record,
                }

    return edit.definition.url
            .replace('{dental_record}', parsedArgs.dental_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
edit.get = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
edit.head = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
    const editForm = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
        editForm.get = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}/edit'
 */
        editForm.head = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
export const update = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/dental-records/{dental_record}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
update.url = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dental_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dental_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dental_record: args.dental_record,
                }

    return update.definition.url
            .replace('{dental_record}', parsedArgs.dental_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
update.put = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
update.patch = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
    const updateForm = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
        updateForm.put = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:0
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
        updateForm.patch = (args: { dental_record: string | number } | [dental_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:37
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
export const destroy = (args: { dental_record: number | { id: number } } | [dental_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/dental-records/{dental_record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:37
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
destroy.url = (args: { dental_record: number | { id: number } } | [dental_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dental_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { dental_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    dental_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dental_record: typeof args.dental_record === 'object'
                ? args.dental_record.id
                : args.dental_record,
                }

    return destroy.definition.url
            .replace('{dental_record}', parsedArgs.dental_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:37
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
destroy.delete = (args: { dental_record: number | { id: number } } | [dental_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:37
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
    const destroyForm = (args: { dental_record: number | { id: number } } | [dental_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\DentalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/DentalRecordController.php:37
 * @route '/clinic/admin/dental-records/{dental_record}'
 */
        destroyForm.delete = (args: { dental_record: number | { id: number } } | [dental_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DentalRecordController = { index, create, store, show, edit, update, destroy }

export default DentalRecordController