import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:13
 * @route '/research/admin/journals'
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
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/create'
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
* @see \Modules\Research\Http\Controllers\Admin\JournalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:14
 * @route '/research/admin/journals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/journals',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:14
 * @route '/research/admin/journals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:14
 * @route '/research/admin/journals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:14
 * @route '/research/admin/journals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:14
 * @route '/research/admin/journals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
export const show = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals/{journal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
show.url = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { journal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: typeof args.journal === 'object'
                ? args.journal.id
                : args.journal,
                }

    return show.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
show.get = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
show.head = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
    const showForm = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
        showForm.get = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:20
 * @route '/research/admin/journals/{journal}'
 */
        showForm.head = (args: { journal: number | { id: number } } | [journal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
export const edit = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals/{journal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
edit.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return edit.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
edit.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
edit.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
    const editForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
        editForm.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}/edit'
 */
        editForm.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
export const update = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/journals/{journal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
update.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return update.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
update.put = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
update.patch = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
    const updateForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
        updateForm.put = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
        updateForm.patch = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
export const destroy = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/journals/{journal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
destroy.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return destroy.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
destroy.delete = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
    const destroyForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalController.php:0
 * @route '/research/admin/journals/{journal}'
 */
        destroyForm.delete = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const JournalController = { index, create, store, show, edit, update, destroy }

export default JournalController