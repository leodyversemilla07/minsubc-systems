import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/research-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:12
 * @route '/research/admin/research-types'
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
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/research-types/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::create
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/create'
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
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:13
 * @route '/research/admin/research-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/research-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:13
 * @route '/research/admin/research-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:13
 * @route '/research/admin/research-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:13
 * @route '/research/admin/research-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::store
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:13
 * @route '/research/admin/research-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
export const show = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/research-types/{research_type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
show.url = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { research_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    research_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        research_type: args.research_type,
                }

    return show.definition.url
            .replace('{research_type}', parsedArgs.research_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
show.get = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
show.head = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
    const showForm = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
        showForm.get = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::show
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}'
 */
        showForm.head = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
export const edit = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/research-types/{research_type}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
edit.url = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { research_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    research_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        research_type: args.research_type,
                }

    return edit.definition.url
            .replace('{research_type}', parsedArgs.research_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
edit.get = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
edit.head = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
    const editForm = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
        editForm.get = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:0
 * @route '/research/admin/research-types/{research_type}/edit'
 */
        editForm.head = (args: { research_type: string | number } | [research_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
export const update = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/research-types/{research_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
update.url = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { research_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { research_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    research_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        research_type: typeof args.research_type === 'object'
                ? args.research_type.id
                : args.research_type,
                }

    return update.definition.url
            .replace('{research_type}', parsedArgs.research_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
update.put = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
update.patch = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
    const updateForm = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
        updateForm.put = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::update
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:19
 * @route '/research/admin/research-types/{research_type}'
 */
        updateForm.patch = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:25
 * @route '/research/admin/research-types/{research_type}'
 */
export const destroy = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/research-types/{research_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:25
 * @route '/research/admin/research-types/{research_type}'
 */
destroy.url = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { research_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { research_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    research_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        research_type: typeof args.research_type === 'object'
                ? args.research_type.id
                : args.research_type,
                }

    return destroy.definition.url
            .replace('{research_type}', parsedArgs.research_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:25
 * @route '/research/admin/research-types/{research_type}'
 */
destroy.delete = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:25
 * @route '/research/admin/research-types/{research_type}'
 */
    const destroyForm = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ResearchTypeController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/ResearchTypeController.php:25
 * @route '/research/admin/research-types/{research_type}'
 */
        destroyForm.delete = (args: { research_type: number | { id: number } } | [research_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ResearchTypeController = { index, create, store, show, edit, update, destroy }

export default ResearchTypeController