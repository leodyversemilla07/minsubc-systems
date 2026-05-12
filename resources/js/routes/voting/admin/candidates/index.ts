import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/candidates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:21
 * @route '/voting/admin/candidates'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/admin/candidates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:45
 * @route '/voting/admin/candidates/create'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:68
 * @route '/voting/admin/candidates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/admin/candidates',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:68
 * @route '/voting/admin/candidates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:68
 * @route '/voting/admin/candidates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:68
 * @route '/voting/admin/candidates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:68
 * @route '/voting/admin/candidates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
export const show = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/candidates/{candidate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
show.url = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { candidate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    candidate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        candidate: typeof args.candidate === 'object'
                ? args.candidate.id
                : args.candidate,
                }

    return show.definition.url
            .replace('{candidate}', parsedArgs.candidate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
show.get = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
show.head = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
    const showForm = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
        showForm.get = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:94
 * @route '/voting/admin/candidates/{candidate}'
 */
        showForm.head = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
export const edit = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/voting/admin/candidates/{candidate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
edit.url = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { candidate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    candidate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        candidate: typeof args.candidate === 'object'
                ? args.candidate.id
                : args.candidate,
                }

    return edit.definition.url
            .replace('{candidate}', parsedArgs.candidate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
edit.get = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
edit.head = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
    const editForm = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
        editForm.get = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:104
 * @route '/voting/admin/candidates/{candidate}/edit'
 */
        editForm.head = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:123
 * @route '/voting/admin/candidates/{candidate}'
 */
export const update = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/voting/admin/candidates/{candidate}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:123
 * @route '/voting/admin/candidates/{candidate}'
 */
update.url = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { candidate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    candidate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        candidate: typeof args.candidate === 'object'
                ? args.candidate.id
                : args.candidate,
                }

    return update.definition.url
            .replace('{candidate}', parsedArgs.candidate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:123
 * @route '/voting/admin/candidates/{candidate}'
 */
update.put = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:123
 * @route '/voting/admin/candidates/{candidate}'
 */
    const updateForm = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:123
 * @route '/voting/admin/candidates/{candidate}'
 */
        updateForm.put = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:152
 * @route '/voting/admin/candidates/{candidate}'
 */
export const destroy = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voting/admin/candidates/{candidate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:152
 * @route '/voting/admin/candidates/{candidate}'
 */
destroy.url = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { candidate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    candidate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        candidate: typeof args.candidate === 'object'
                ? args.candidate.id
                : args.candidate,
                }

    return destroy.definition.url
            .replace('{candidate}', parsedArgs.candidate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:152
 * @route '/voting/admin/candidates/{candidate}'
 */
destroy.delete = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:152
 * @route '/voting/admin/candidates/{candidate}'
 */
    const destroyForm = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\CandidateController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/CandidateController.php:152
 * @route '/voting/admin/candidates/{candidate}'
 */
        destroyForm.delete = (args: { candidate: number | { id: number } } | [candidate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const candidates = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default candidates