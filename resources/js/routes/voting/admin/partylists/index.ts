import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/partylists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:18
 * @route '/voting/admin/partylists'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/admin/partylists/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:40
 * @route '/voting/admin/partylists/create'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:54
 * @route '/voting/admin/partylists'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/admin/partylists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:54
 * @route '/voting/admin/partylists'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:54
 * @route '/voting/admin/partylists'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:54
 * @route '/voting/admin/partylists'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:54
 * @route '/voting/admin/partylists'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
export const show = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/partylists/{partylist}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
show.url = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partylist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'partylist_id' in args) {
            args = { partylist: args.partylist_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    partylist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partylist: typeof args.partylist === 'object'
                ? args.partylist.partylist_id
                : args.partylist,
                }

    return show.definition.url
            .replace('{partylist}', parsedArgs.partylist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
show.get = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
show.head = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
    const showForm = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
        showForm.get = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:70
 * @route '/voting/admin/partylists/{partylist}'
 */
        showForm.head = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
export const edit = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/voting/admin/partylists/{partylist}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
edit.url = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partylist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'partylist_id' in args) {
            args = { partylist: args.partylist_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    partylist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partylist: typeof args.partylist === 'object'
                ? args.partylist.partylist_id
                : args.partylist,
                }

    return edit.definition.url
            .replace('{partylist}', parsedArgs.partylist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
edit.get = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
edit.head = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
    const editForm = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
        editForm.get = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:80
 * @route '/voting/admin/partylists/{partylist}/edit'
 */
        editForm.head = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:90
 * @route '/voting/admin/partylists/{partylist}'
 */
export const update = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/voting/admin/partylists/{partylist}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:90
 * @route '/voting/admin/partylists/{partylist}'
 */
update.url = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partylist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'partylist_id' in args) {
            args = { partylist: args.partylist_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    partylist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partylist: typeof args.partylist === 'object'
                ? args.partylist.partylist_id
                : args.partylist,
                }

    return update.definition.url
            .replace('{partylist}', parsedArgs.partylist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:90
 * @route '/voting/admin/partylists/{partylist}'
 */
update.put = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:90
 * @route '/voting/admin/partylists/{partylist}'
 */
    const updateForm = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:90
 * @route '/voting/admin/partylists/{partylist}'
 */
        updateForm.put = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:105
 * @route '/voting/admin/partylists/{partylist}'
 */
export const destroy = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voting/admin/partylists/{partylist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:105
 * @route '/voting/admin/partylists/{partylist}'
 */
destroy.url = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partylist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'partylist_id' in args) {
            args = { partylist: args.partylist_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    partylist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partylist: typeof args.partylist === 'object'
                ? args.partylist.partylist_id
                : args.partylist,
                }

    return destroy.definition.url
            .replace('{partylist}', parsedArgs.partylist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:105
 * @route '/voting/admin/partylists/{partylist}'
 */
destroy.delete = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:105
 * @route '/voting/admin/partylists/{partylist}'
 */
    const destroyForm = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PartylistController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PartylistController.php:105
 * @route '/voting/admin/partylists/{partylist}'
 */
        destroyForm.delete = (args: { partylist: number | { partylist_id: number } } | [partylist: number | { partylist_id: number } ] | number | { partylist_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const partylists = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default partylists