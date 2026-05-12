import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/employees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::index
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:15
 * @route '/hr/admin/employees'
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/hr/admin/employees/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::create
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:39
 * @route '/hr/admin/employees/create'
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:46
 * @route '/hr/admin/employees'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hr/admin/employees',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:46
 * @route '/hr/admin/employees'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:46
 * @route '/hr/admin/employees'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:46
 * @route '/hr/admin/employees'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::store
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:46
 * @route '/hr/admin/employees'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
export const show = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/admin/employees/{employee}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
show.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return show.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
show.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
show.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
    const showForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
        showForm.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::show
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:75
 * @route '/hr/admin/employees/{employee}'
 */
        showForm.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
export const edit = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/hr/admin/employees/{employee}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
edit.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return edit.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
edit.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
edit.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
    const editForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
        editForm.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::edit
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:83
 * @route '/hr/admin/employees/{employee}/edit'
 */
        editForm.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
export const update = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/hr/admin/employees/{employee}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
update.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return update.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
update.put = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
update.patch = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
    const updateForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
        updateForm.put = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::update
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:90
 * @route '/hr/admin/employees/{employee}'
 */
        updateForm.patch = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:120
 * @route '/hr/admin/employees/{employee}'
 */
export const destroy = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hr/admin/employees/{employee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:120
 * @route '/hr/admin/employees/{employee}'
 */
destroy.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return destroy.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:120
 * @route '/hr/admin/employees/{employee}'
 */
destroy.delete = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:120
 * @route '/hr/admin/employees/{employee}'
 */
    const destroyForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::destroy
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:120
 * @route '/hr/admin/employees/{employee}'
 */
        destroyForm.delete = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::uploadPhoto
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:139
 * @route '/hr/admin/employees/{employee}/upload-photo'
 */
export const uploadPhoto = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(args, options),
    method: 'post',
})

uploadPhoto.definition = {
    methods: ["post"],
    url: '/hr/admin/employees/{employee}/upload-photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::uploadPhoto
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:139
 * @route '/hr/admin/employees/{employee}/upload-photo'
 */
uploadPhoto.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return uploadPhoto.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::uploadPhoto
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:139
 * @route '/hr/admin/employees/{employee}/upload-photo'
 */
uploadPhoto.post = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::uploadPhoto
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:139
 * @route '/hr/admin/employees/{employee}/upload-photo'
 */
    const uploadPhotoForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadPhoto.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::uploadPhoto
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:139
 * @route '/hr/admin/employees/{employee}/upload-photo'
 */
        uploadPhotoForm.post = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadPhoto.url(args, options),
            method: 'post',
        })
    
    uploadPhoto.form = uploadPhotoForm
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/hr/employees/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
const EmployeeController = { index, create, store, show, edit, update, destroy, uploadPhoto, search }

export default EmployeeController