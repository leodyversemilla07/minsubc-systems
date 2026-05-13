import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/publications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:14
 * @route '/research/admin/publications'
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/publications/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:15
 * @route '/research/admin/publications/create'
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:16
 * @route '/research/admin/publications'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/publications',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:16
 * @route '/research/admin/publications'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:16
 * @route '/research/admin/publications'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:16
 * @route '/research/admin/publications'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:16
 * @route '/research/admin/publications'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
export const show = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/publications/{publication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
show.url = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: args.publication,
                }

    return show.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
show.get = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
show.head = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
    const showForm = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
        showForm.get = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::show
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
        showForm.head = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
export const edit = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/publications/{publication}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
edit.url = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: args.publication,
                }

    return edit.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
edit.get = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
edit.head = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
    const editForm = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
        editForm.get = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}/edit'
 */
        editForm.head = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
export const update = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/publications/{publication}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
update.url = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: args.publication,
                }

    return update.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
update.put = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
update.patch = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
    const updateForm = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
        updateForm.put = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::update
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
        updateForm.patch = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
export const destroy = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/publications/{publication}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
destroy.url = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: args.publication,
                }

    return destroy.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
destroy.delete = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
    const destroyForm = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:0
 * @route '/research/admin/publications/{publication}'
 */
        destroyForm.delete = (args: { publication: string | number } | [publication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:26
 * @route '/research/admin/publications/{publication}/authors'
 */
export const addAuthor = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAuthor.url(args, options),
    method: 'post',
})

addAuthor.definition = {
    methods: ["post"],
    url: '/research/admin/publications/{publication}/authors',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:26
 * @route '/research/admin/publications/{publication}/authors'
 */
addAuthor.url = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { publication: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: typeof args.publication === 'object'
                ? args.publication.id
                : args.publication,
                }

    return addAuthor.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:26
 * @route '/research/admin/publications/{publication}/authors'
 */
addAuthor.post = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAuthor.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:26
 * @route '/research/admin/publications/{publication}/authors'
 */
    const addAuthorForm = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addAuthor.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::addAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:26
 * @route '/research/admin/publications/{publication}/authors'
 */
        addAuthorForm.post = (args: { publication: number | { id: number } } | [publication: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addAuthor.url(args, options),
            method: 'post',
        })
    
    addAuthor.form = addAuthorForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:32
 * @route '/research/admin/publications/{publication}/authors/{author}'
 */
export const removeAuthor = (args: { publication: number | { id: number }, author: number | { id: number } } | [publication: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeAuthor.url(args, options),
    method: 'delete',
})

removeAuthor.definition = {
    methods: ["delete"],
    url: '/research/admin/publications/{publication}/authors/{author}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:32
 * @route '/research/admin/publications/{publication}/authors/{author}'
 */
removeAuthor.url = (args: { publication: number | { id: number }, author: number | { id: number } } | [publication: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    publication: args[0],
                    author: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publication: typeof args.publication === 'object'
                ? args.publication.id
                : args.publication,
                                author: typeof args.author === 'object'
                ? args.author.id
                : args.author,
                }

    return removeAuthor.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace('{author}', parsedArgs.author.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:32
 * @route '/research/admin/publications/{publication}/authors/{author}'
 */
removeAuthor.delete = (args: { publication: number | { id: number }, author: number | { id: number } } | [publication: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeAuthor.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:32
 * @route '/research/admin/publications/{publication}/authors/{author}'
 */
    const removeAuthorForm = (args: { publication: number | { id: number }, author: number | { id: number } } | [publication: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeAuthor.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PublicationController::removeAuthor
 * @see Modules/Research/app/Http/Controllers/Admin/PublicationController.php:32
 * @route '/research/admin/publications/{publication}/authors/{author}'
 */
        removeAuthorForm.delete = (args: { publication: number | { id: number }, author: number | { id: number } } | [publication: number | { id: number }, author: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeAuthor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeAuthor.form = removeAuthorForm
const publications = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
addAuthor: Object.assign(addAuthor, addAuthor),
removeAuthor: Object.assign(removeAuthor, removeAuthor),
}

export default publications