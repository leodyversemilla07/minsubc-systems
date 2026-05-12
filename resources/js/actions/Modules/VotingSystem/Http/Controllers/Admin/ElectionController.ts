import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/elections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:18
 * @route '/voting/admin/elections'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/admin/elections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:30
 * @route '/voting/admin/elections/create'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:38
 * @route '/voting/admin/elections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/admin/elections',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:38
 * @route '/voting/admin/elections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:38
 * @route '/voting/admin/elections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:38
 * @route '/voting/admin/elections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:38
 * @route '/voting/admin/elections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
export const show = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/elections/{election}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
show.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return show.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
show.get = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
show.head = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
    const showForm = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
        showForm.get = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:59
 * @route '/voting/admin/elections/{election}'
 */
        showForm.head = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
export const edit = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/voting/admin/elections/{election}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
edit.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return edit.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
edit.get = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
edit.head = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
    const editForm = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
        editForm.get = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:69
 * @route '/voting/admin/elections/{election}/edit'
 */
        editForm.head = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:77
 * @route '/voting/admin/elections/{election}'
 */
export const update = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/voting/admin/elections/{election}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:77
 * @route '/voting/admin/elections/{election}'
 */
update.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return update.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:77
 * @route '/voting/admin/elections/{election}'
 */
update.put = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:77
 * @route '/voting/admin/elections/{election}'
 */
    const updateForm = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:77
 * @route '/voting/admin/elections/{election}'
 */
        updateForm.put = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:105
 * @route '/voting/admin/elections/{election}'
 */
export const destroy = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voting/admin/elections/{election}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:105
 * @route '/voting/admin/elections/{election}'
 */
destroy.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return destroy.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:105
 * @route '/voting/admin/elections/{election}'
 */
destroy.delete = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:105
 * @route '/voting/admin/elections/{election}'
 */
    const destroyForm = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:105
 * @route '/voting/admin/elections/{election}'
 */
        destroyForm.delete = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::toggleStatus
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:93
 * @route '/voting/admin/elections/{election}/toggle-status'
 */
export const toggleStatus = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

toggleStatus.definition = {
    methods: ["post"],
    url: '/voting/admin/elections/{election}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::toggleStatus
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:93
 * @route '/voting/admin/elections/{election}/toggle-status'
 */
toggleStatus.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return toggleStatus.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::toggleStatus
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:93
 * @route '/voting/admin/elections/{election}/toggle-status'
 */
toggleStatus.post = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::toggleStatus
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:93
 * @route '/voting/admin/elections/{election}/toggle-status'
 */
    const toggleStatusForm = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ElectionController::toggleStatus
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ElectionController.php:93
 * @route '/voting/admin/elections/{election}/toggle-status'
 */
        toggleStatusForm.post = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, options),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const ElectionController = { index, create, store, show, edit, update, destroy, toggleStatus }

export default ElectionController