import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/defenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:14
 * @route '/research/admin/defenses'
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/defenses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::create
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:19
 * @route '/research/admin/defenses/create'
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::store
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:24
 * @route '/research/admin/defenses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/defenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::store
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:24
 * @route '/research/admin/defenses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::store
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:24
 * @route '/research/admin/defenses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::store
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:24
 * @route '/research/admin/defenses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::store
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:24
 * @route '/research/admin/defenses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
export const show = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/defenses/{defense}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
show.url = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: args.defense,
                }

    return show.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
show.get = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
show.head = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
    const showForm = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
        showForm.get = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::show
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
        showForm.head = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
export const edit = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/defenses/{defense}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
edit.url = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: args.defense,
                }

    return edit.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
edit.get = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
edit.head = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
    const editForm = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
        editForm.get = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}/edit'
 */
        editForm.head = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
export const update = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/defenses/{defense}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
update.url = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: args.defense,
                }

    return update.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
update.put = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
update.patch = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
    const updateForm = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
        updateForm.put = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::update
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
        updateForm.patch = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
export const destroy = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/defenses/{defense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
destroy.url = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: args.defense,
                }

    return destroy.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
destroy.delete = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
    const destroyForm = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:0
 * @route '/research/admin/defenses/{defense}'
 */
        destroyForm.delete = (args: { defense: string | number } | [defense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::score
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:33
 * @route '/research/admin/defenses/{defense}/score'
 */
export const score = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: score.url(args, options),
    method: 'post',
})

score.definition = {
    methods: ["post"],
    url: '/research/admin/defenses/{defense}/score',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::score
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:33
 * @route '/research/admin/defenses/{defense}/score'
 */
score.url = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { defense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: typeof args.defense === 'object'
                ? args.defense.id
                : args.defense,
                }

    return score.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::score
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:33
 * @route '/research/admin/defenses/{defense}/score'
 */
score.post = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: score.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::score
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:33
 * @route '/research/admin/defenses/{defense}/score'
 */
    const scoreForm = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: score.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::score
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:33
 * @route '/research/admin/defenses/{defense}/score'
 */
        scoreForm.post = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: score.url(args, options),
            method: 'post',
        })
    
    score.form = scoreForm
/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::complete
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:42
 * @route '/research/admin/defenses/{defense}/complete'
 */
export const complete = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/research/admin/defenses/{defense}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::complete
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:42
 * @route '/research/admin/defenses/{defense}/complete'
 */
complete.url = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { defense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    defense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defense: typeof args.defense === 'object'
                ? args.defense.id
                : args.defense,
                }

    return complete.definition.url
            .replace('{defense}', parsedArgs.defense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::complete
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:42
 * @route '/research/admin/defenses/{defense}/complete'
 */
complete.post = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::complete
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:42
 * @route '/research/admin/defenses/{defense}/complete'
 */
    const completeForm = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DefenseController::complete
 * @see Modules/Research/app/Http/Controllers/Admin/DefenseController.php:42
 * @route '/research/admin/defenses/{defense}/complete'
 */
        completeForm.post = (args: { defense: number | { id: number } } | [defense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
const defenses = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
score: Object.assign(score, score),
complete: Object.assign(complete, complete),
}

export default defenses