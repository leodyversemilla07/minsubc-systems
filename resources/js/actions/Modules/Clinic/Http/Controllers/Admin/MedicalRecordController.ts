import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/medical-records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:11
 * @route '/clinic/admin/medical-records'
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
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/medical-records/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:17
 * @route '/clinic/admin/medical-records/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:22
 * @route '/clinic/admin/medical-records'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/medical-records',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:22
 * @route '/clinic/admin/medical-records'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:22
 * @route '/clinic/admin/medical-records'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:22
 * @route '/clinic/admin/medical-records'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:22
 * @route '/clinic/admin/medical-records'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
export const show = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/medical-records/{medical_record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
show.url = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medical_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { medical_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    medical_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        medical_record: typeof args.medical_record === 'object'
                ? args.medical_record.id
                : args.medical_record,
                }

    return show.definition.url
            .replace('{medical_record}', parsedArgs.medical_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
show.get = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
show.head = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
    const showForm = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
        showForm.get = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:35
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
        showForm.head = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
export const edit = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/medical-records/{medical_record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
edit.url = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medical_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { medical_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    medical_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        medical_record: typeof args.medical_record === 'object'
                ? args.medical_record.id
                : args.medical_record,
                }

    return edit.definition.url
            .replace('{medical_record}', parsedArgs.medical_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
edit.get = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
edit.head = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
    const editForm = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
        editForm.get = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:41
 * @route '/clinic/admin/medical-records/{medical_record}/edit'
 */
        editForm.head = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
export const update = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/medical-records/{medical_record}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
update.url = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medical_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { medical_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    medical_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        medical_record: typeof args.medical_record === 'object'
                ? args.medical_record.id
                : args.medical_record,
                }

    return update.definition.url
            .replace('{medical_record}', parsedArgs.medical_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
update.put = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
update.patch = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
    const updateForm = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
        updateForm.put = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:46
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
        updateForm.patch = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:59
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
export const destroy = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/medical-records/{medical_record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:59
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
destroy.url = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medical_record: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { medical_record: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    medical_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        medical_record: typeof args.medical_record === 'object'
                ? args.medical_record.id
                : args.medical_record,
                }

    return destroy.definition.url
            .replace('{medical_record}', parsedArgs.medical_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:59
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
destroy.delete = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:59
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
    const destroyForm = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\MedicalRecordController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/MedicalRecordController.php:59
 * @route '/clinic/admin/medical-records/{medical_record}'
 */
        destroyForm.delete = (args: { medical_record: number | { id: number } } | [medical_record: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MedicalRecordController = { index, create, store, show, edit, update, destroy }

export default MedicalRecordController