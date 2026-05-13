import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
export const index = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}/panels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
    const indexForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        indexForm.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        indexForm.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
export const create = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}/panels/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
    const createForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
        createForm.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
        createForm.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
export const store = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/panels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
store.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
store.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
    const storeForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        storeForm.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
export const show = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/panels/{panel}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
show.url = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { panel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    panel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        panel: args.panel,
                }

    return show.definition.url
            .replace('{panel}', parsedArgs.panel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
show.get = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
show.head = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
    const showForm = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
        showForm.get = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
        showForm.head = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
export const edit = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/panels/{panel}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
edit.url = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { panel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    panel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        panel: args.panel,
                }

    return edit.definition.url
            .replace('{panel}', parsedArgs.panel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
edit.get = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
edit.head = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
    const editForm = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
        editForm.get = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}/edit'
 */
        editForm.head = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
export const update = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/panels/{panel}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
update.url = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { panel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    panel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        panel: args.panel,
                }

    return update.definition.url
            .replace('{panel}', parsedArgs.panel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
update.put = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
update.patch = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
    const updateForm = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
        updateForm.put = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
        updateForm.patch = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PanelController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
export const destroy = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/panels/{panel}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
destroy.url = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { panel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    panel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        panel: args.panel,
                }

    return destroy.definition.url
            .replace('{panel}', parsedArgs.panel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
destroy.delete = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
    const destroyForm = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/panels/{panel}'
 */
        destroyForm.delete = (args: { panel: string | number } | [panel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PanelController::assignChair
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:18
 * @route '/research/admin/panels/{panel}/assign-chair'
 */
export const assignChair = (args: { panel: number | { id: number } } | [panel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignChair.url(args, options),
    method: 'post',
})

assignChair.definition = {
    methods: ["post"],
    url: '/research/admin/panels/{panel}/assign-chair',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::assignChair
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:18
 * @route '/research/admin/panels/{panel}/assign-chair'
 */
assignChair.url = (args: { panel: number | { id: number } } | [panel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { panel: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { panel: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    panel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        panel: typeof args.panel === 'object'
                ? args.panel.id
                : args.panel,
                }

    return assignChair.definition.url
            .replace('{panel}', parsedArgs.panel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::assignChair
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:18
 * @route '/research/admin/panels/{panel}/assign-chair'
 */
assignChair.post = (args: { panel: number | { id: number } } | [panel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignChair.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::assignChair
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:18
 * @route '/research/admin/panels/{panel}/assign-chair'
 */
    const assignChairForm = (args: { panel: number | { id: number } } | [panel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignChair.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::assignChair
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:18
 * @route '/research/admin/panels/{panel}/assign-chair'
 */
        assignChairForm.post = (args: { panel: number | { id: number } } | [panel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignChair.url(args, options),
            method: 'post',
        })
    
    assignChair.form = assignChairForm
const PanelController = { index, create, store, show, edit, update, destroy, assignChair }

export default PanelController