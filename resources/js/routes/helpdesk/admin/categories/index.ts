import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:11
 * @route '/admin/helpdesk/categories'
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/create'
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:17
 * @route '/admin/helpdesk/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/helpdesk/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:17
 * @route '/admin/helpdesk/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:17
 * @route '/admin/helpdesk/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:17
 * @route '/admin/helpdesk/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:17
 * @route '/admin/helpdesk/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
export const edit = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/categories/{category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
edit.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
edit.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
edit.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
    const editForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
        editForm.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}/edit'
 */
        editForm.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
export const update = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/helpdesk/categories/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
update.url = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
update.put = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
update.patch = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
    const updateForm = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
        updateForm.put = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:28
 * @route '/admin/helpdesk/categories/{category}'
 */
        updateForm.patch = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}'
 */
export const destroy = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/helpdesk/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}'
 */
destroy.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}'
 */
destroy.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}'
 */
    const destroyForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\CategoryController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/CategoryController.php:0
 * @route '/admin/helpdesk/categories/{category}'
 */
        destroyForm.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default categories