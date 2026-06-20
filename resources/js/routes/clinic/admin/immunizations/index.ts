import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/immunizations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:11
 * @route '/clinic/admin/immunizations'
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
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/immunizations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:17
 * @route '/clinic/admin/immunizations/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:23
 * @route '/clinic/admin/immunizations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/immunizations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:23
 * @route '/clinic/admin/immunizations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:23
 * @route '/clinic/admin/immunizations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:23
 * @route '/clinic/admin/immunizations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:23
 * @route '/clinic/admin/immunizations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
export const show = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/immunizations/{immunization}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
show.url = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { immunization: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { immunization: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    immunization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        immunization: typeof args.immunization === 'object'
                ? args.immunization.id
                : args.immunization,
                }

    return show.definition.url
            .replace('{immunization}', parsedArgs.immunization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
show.get = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
show.head = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
    const showForm = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
        showForm.get = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:37
 * @route '/clinic/admin/immunizations/{immunization}'
 */
        showForm.head = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
export const edit = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/immunizations/{immunization}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
edit.url = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { immunization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    immunization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        immunization: args.immunization,
                }

    return edit.definition.url
            .replace('{immunization}', parsedArgs.immunization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
edit.get = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
edit.head = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
    const editForm = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
        editForm.get = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}/edit'
 */
        editForm.head = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
export const update = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/immunizations/{immunization}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
update.url = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { immunization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    immunization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        immunization: args.immunization,
                }

    return update.definition.url
            .replace('{immunization}', parsedArgs.immunization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
update.put = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
update.patch = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
    const updateForm = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
        updateForm.put = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:0
 * @route '/clinic/admin/immunizations/{immunization}'
 */
        updateForm.patch = (args: { immunization: string | number } | [immunization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:43
 * @route '/clinic/admin/immunizations/{immunization}'
 */
export const destroy = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/immunizations/{immunization}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:43
 * @route '/clinic/admin/immunizations/{immunization}'
 */
destroy.url = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { immunization: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { immunization: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    immunization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        immunization: typeof args.immunization === 'object'
                ? args.immunization.id
                : args.immunization,
                }

    return destroy.definition.url
            .replace('{immunization}', parsedArgs.immunization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:43
 * @route '/clinic/admin/immunizations/{immunization}'
 */
destroy.delete = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:43
 * @route '/clinic/admin/immunizations/{immunization}'
 */
    const destroyForm = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ImmunizationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ImmunizationController.php:43
 * @route '/clinic/admin/immunizations/{immunization}'
 */
        destroyForm.delete = (args: { immunization: number | { id: number } } | [immunization: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const immunizations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default immunizations