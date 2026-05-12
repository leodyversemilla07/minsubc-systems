import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:13
 * @route '/library/admin/categories'
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/library/admin/categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:19
 * @route '/library/admin/categories/create'
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:24
 * @route '/library/admin/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/library/admin/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:24
 * @route '/library/admin/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:24
 * @route '/library/admin/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:24
 * @route '/library/admin/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:24
 * @route '/library/admin/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
export const show = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/admin/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
show.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return show.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
show.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
show.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
    const showForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
        showForm.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:0
 * @route '/library/admin/categories/{category}'
 */
        showForm.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
export const edit = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/library/admin/categories/{category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
edit.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return edit.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
edit.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
edit.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
    const editForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
        editForm.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
        editForm.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/library/admin/categories/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
update.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
update.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
update.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
    const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
        updateForm.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
        updateForm.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
export const destroy = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/library/admin/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
destroy.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
destroy.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
    const destroyForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
        destroyForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const categories = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default categories