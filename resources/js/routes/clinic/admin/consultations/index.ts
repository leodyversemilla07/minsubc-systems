import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/consultations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:11
 * @route '/clinic/admin/consultations'
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
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/consultations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:17
 * @route '/clinic/admin/consultations/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:23
 * @route '/clinic/admin/consultations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/consultations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:23
 * @route '/clinic/admin/consultations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:23
 * @route '/clinic/admin/consultations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:23
 * @route '/clinic/admin/consultations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:23
 * @route '/clinic/admin/consultations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
export const show = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/consultations/{consultation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
show.url = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { consultation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { consultation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    consultation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        consultation: typeof args.consultation === 'object'
                ? args.consultation.id
                : args.consultation,
                }

    return show.definition.url
            .replace('{consultation}', parsedArgs.consultation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
show.get = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
show.head = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
    const showForm = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
        showForm.get = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:38
 * @route '/clinic/admin/consultations/{consultation}'
 */
        showForm.head = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
export const edit = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/consultations/{consultation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
edit.url = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { consultation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { consultation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    consultation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        consultation: typeof args.consultation === 'object'
                ? args.consultation.id
                : args.consultation,
                }

    return edit.definition.url
            .replace('{consultation}', parsedArgs.consultation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
edit.get = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
edit.head = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
    const editForm = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
        editForm.get = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:44
 * @route '/clinic/admin/consultations/{consultation}/edit'
 */
        editForm.head = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
export const update = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/consultations/{consultation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
update.url = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { consultation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { consultation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    consultation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        consultation: typeof args.consultation === 'object'
                ? args.consultation.id
                : args.consultation,
                }

    return update.definition.url
            .replace('{consultation}', parsedArgs.consultation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
update.put = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
update.patch = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
    const updateForm = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
        updateForm.put = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:50
 * @route '/clinic/admin/consultations/{consultation}'
 */
        updateForm.patch = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:63
 * @route '/clinic/admin/consultations/{consultation}'
 */
export const destroy = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/consultations/{consultation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:63
 * @route '/clinic/admin/consultations/{consultation}'
 */
destroy.url = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { consultation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { consultation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    consultation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        consultation: typeof args.consultation === 'object'
                ? args.consultation.id
                : args.consultation,
                }

    return destroy.definition.url
            .replace('{consultation}', parsedArgs.consultation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:63
 * @route '/clinic/admin/consultations/{consultation}'
 */
destroy.delete = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:63
 * @route '/clinic/admin/consultations/{consultation}'
 */
    const destroyForm = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ConsultationController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/ConsultationController.php:63
 * @route '/clinic/admin/consultations/{consultation}'
 */
        destroyForm.delete = (args: { consultation: number | { id: number } } | [consultation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const consultations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default consultations