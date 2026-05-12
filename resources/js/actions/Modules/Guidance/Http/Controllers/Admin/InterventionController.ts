import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/interventions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:352
 * @route '/guidance/admin/interventions'
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/interventions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:358
 * @route '/guidance/admin/interventions/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:363
 * @route '/guidance/admin/interventions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/interventions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:363
 * @route '/guidance/admin/interventions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:363
 * @route '/guidance/admin/interventions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:363
 * @route '/guidance/admin/interventions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:363
 * @route '/guidance/admin/interventions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
export const show = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/interventions/{intervention}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
show.url = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { intervention: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { intervention: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    intervention: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        intervention: typeof args.intervention === 'object'
                ? args.intervention.id
                : args.intervention,
                }

    return show.definition.url
            .replace('{intervention}', parsedArgs.intervention.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
show.get = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
show.head = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
    const showForm = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
        showForm.get = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:378
 * @route '/guidance/admin/interventions/{intervention}'
 */
        showForm.head = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
export const edit = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/interventions/{intervention}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
edit.url = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { intervention: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    intervention: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        intervention: args.intervention,
                }

    return edit.definition.url
            .replace('{intervention}', parsedArgs.intervention.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
edit.get = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
edit.head = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
    const editForm = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
        editForm.get = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}/edit'
 */
        editForm.head = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
export const update = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/guidance/admin/interventions/{intervention}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
update.url = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { intervention: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    intervention: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        intervention: args.intervention,
                }

    return update.definition.url
            .replace('{intervention}', parsedArgs.intervention.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
update.put = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
update.patch = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
    const updateForm = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
        updateForm.put = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
        updateForm.patch = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
export const destroy = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/interventions/{intervention}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
destroy.url = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { intervention: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    intervention: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        intervention: args.intervention,
                }

    return destroy.definition.url
            .replace('{intervention}', parsedArgs.intervention.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
destroy.delete = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
    const destroyForm = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/interventions/{intervention}'
 */
        destroyForm.delete = (args: { intervention: string | number } | [intervention: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::manageParticipants
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:384
 * @route '/guidance/admin/interventions/{intervention}/manage-participants'
 */
export const manageParticipants = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manageParticipants.url(args, options),
    method: 'post',
})

manageParticipants.definition = {
    methods: ["post"],
    url: '/guidance/admin/interventions/{intervention}/manage-participants',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::manageParticipants
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:384
 * @route '/guidance/admin/interventions/{intervention}/manage-participants'
 */
manageParticipants.url = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { intervention: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { intervention: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    intervention: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        intervention: typeof args.intervention === 'object'
                ? args.intervention.id
                : args.intervention,
                }

    return manageParticipants.definition.url
            .replace('{intervention}', parsedArgs.intervention.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::manageParticipants
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:384
 * @route '/guidance/admin/interventions/{intervention}/manage-participants'
 */
manageParticipants.post = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manageParticipants.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::manageParticipants
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:384
 * @route '/guidance/admin/interventions/{intervention}/manage-participants'
 */
    const manageParticipantsForm = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: manageParticipants.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\InterventionController::manageParticipants
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:384
 * @route '/guidance/admin/interventions/{intervention}/manage-participants'
 */
        manageParticipantsForm.post = (args: { intervention: number | { id: number } } | [intervention: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: manageParticipants.url(args, options),
            method: 'post',
        })
    
    manageParticipants.form = manageParticipantsForm
const InterventionController = { index, create, store, show, edit, update, destroy, manageParticipants }

export default InterventionController