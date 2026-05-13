import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:14
 * @route '/research/admin/proposals'
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:19
 * @route '/research/admin/proposals/create'
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:20
 * @route '/research/admin/proposals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/proposals',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:20
 * @route '/research/admin/proposals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:20
 * @route '/research/admin/proposals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:20
 * @route '/research/admin/proposals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:20
 * @route '/research/admin/proposals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
export const show = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
show.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return show.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
show.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
show.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
    const showForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
        showForm.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:31
 * @route '/research/admin/proposals/{proposal}'
 */
        showForm.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
export const edit = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
edit.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return edit.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
edit.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
edit.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
    const editForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
        editForm.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}/edit'
 */
        editForm.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
export const update = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/proposals/{proposal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
update.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return update.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
update.put = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
update.patch = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
    const updateForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
        updateForm.put = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
        updateForm.patch = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
export const destroy = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/proposals/{proposal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
destroy.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return destroy.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
destroy.delete = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
    const destroyForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:0
 * @route '/research/admin/proposals/{proposal}'
 */
        destroyForm.delete = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::submit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:36
 * @route '/research/admin/proposals/{proposal}/submit'
 */
export const submit = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::submit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:36
 * @route '/research/admin/proposals/{proposal}/submit'
 */
submit.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return submit.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::submit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:36
 * @route '/research/admin/proposals/{proposal}/submit'
 */
submit.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::submit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:36
 * @route '/research/admin/proposals/{proposal}/submit'
 */
    const submitForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::submit
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:36
 * @route '/research/admin/proposals/{proposal}/submit'
 */
        submitForm.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::approve
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:41
 * @route '/research/admin/proposals/{proposal}/approve'
 */
export const approve = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::approve
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:41
 * @route '/research/admin/proposals/{proposal}/approve'
 */
approve.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return approve.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::approve
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:41
 * @route '/research/admin/proposals/{proposal}/approve'
 */
approve.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::approve
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:41
 * @route '/research/admin/proposals/{proposal}/approve'
 */
    const approveForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::approve
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:41
 * @route '/research/admin/proposals/{proposal}/approve'
 */
        approveForm.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::assignAdviser
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:46
 * @route '/research/admin/proposals/{proposal}/assign-adviser'
 */
export const assignAdviser = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAdviser.url(args, options),
    method: 'post',
})

assignAdviser.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/assign-adviser',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::assignAdviser
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:46
 * @route '/research/admin/proposals/{proposal}/assign-adviser'
 */
assignAdviser.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return assignAdviser.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::assignAdviser
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:46
 * @route '/research/admin/proposals/{proposal}/assign-adviser'
 */
assignAdviser.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAdviser.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::assignAdviser
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:46
 * @route '/research/admin/proposals/{proposal}/assign-adviser'
 */
    const assignAdviserForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignAdviser.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::assignAdviser
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:46
 * @route '/research/admin/proposals/{proposal}/assign-adviser'
 */
        assignAdviserForm.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignAdviser.url(args, options),
            method: 'post',
        })
    
    assignAdviser.form = assignAdviserForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:52
 * @route '/research/admin/proposals/{proposal}/authors'
 */
export const addAuthor = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAuthor.url(args, options),
    method: 'post',
})

addAuthor.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/authors',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:52
 * @route '/research/admin/proposals/{proposal}/authors'
 */
addAuthor.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return addAuthor.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:52
 * @route '/research/admin/proposals/{proposal}/authors'
 */
addAuthor.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAuthor.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:52
 * @route '/research/admin/proposals/{proposal}/authors'
 */
    const addAuthorForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addAuthor.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:52
 * @route '/research/admin/proposals/{proposal}/authors'
 */
        addAuthorForm.post = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addAuthor.url(args, options),
            method: 'post',
        })
    
    addAuthor.form = addAuthorForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:58
 * @route '/research/admin/proposals/{proposal}/authors/{author}'
 */
export const removeAuthor = (args: { proposal: number | { id: number }, author: number | { id: number } } | [proposal: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeAuthor.url(args, options),
    method: 'delete',
})

removeAuthor.definition = {
    methods: ["delete"],
    url: '/research/admin/proposals/{proposal}/authors/{author}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:58
 * @route '/research/admin/proposals/{proposal}/authors/{author}'
 */
removeAuthor.url = (args: { proposal: number | { id: number }, author: number | { id: number } } | [proposal: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                    author: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                                author: typeof args.author === 'object'
                ? args.author.id
                : args.author,
                }

    return removeAuthor.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace('{author}', parsedArgs.author.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:58
 * @route '/research/admin/proposals/{proposal}/authors/{author}'
 */
removeAuthor.delete = (args: { proposal: number | { id: number }, author: number | { id: number } } | [proposal: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeAuthor.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:58
 * @route '/research/admin/proposals/{proposal}/authors/{author}'
 */
    const removeAuthorForm = (args: { proposal: number | { id: number }, author: number | { id: number } } | [proposal: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeAuthor.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ProposalController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/ProposalController.php:58
 * @route '/research/admin/proposals/{proposal}/authors/{author}'
 */
        removeAuthorForm.delete = (args: { proposal: number | { id: number }, author: number | { id: number } } | [proposal: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeAuthor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeAuthor.form = removeAuthorForm
const ProposalController = { index, create, store, show, edit, update, destroy, submit, approve, assignAdviser, addAuthor, removeAuthor }

export default ProposalController