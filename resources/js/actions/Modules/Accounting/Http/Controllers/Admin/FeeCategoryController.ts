import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:13
 * @route '/accounting/admin/fee-categories'
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:19
 * @route '/accounting/admin/fee-categories/create'
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:24
 * @route '/accounting/admin/fee-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/fee-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:24
 * @route '/accounting/admin/fee-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:24
 * @route '/accounting/admin/fee-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:24
 * @route '/accounting/admin/fee-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:24
 * @route '/accounting/admin/fee-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
export const show = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-categories/{fee_category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
show.url = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    fee_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_category: args.fee_category,
                }

    return show.definition.url
            .replace('{fee_category}', parsedArgs.fee_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
show.get = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
show.head = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
    const showForm = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
        showForm.get = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:0
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
        showForm.head = (args: { fee_category: string | number } | [fee_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
export const edit = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-categories/{fee_category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
edit.url = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_category: typeof args.fee_category === 'object'
                ? args.fee_category.id
                : args.fee_category,
                }

    return edit.definition.url
            .replace('{fee_category}', parsedArgs.fee_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
edit.get = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
edit.head = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
    const editForm = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
        editForm.get = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:36
 * @route '/accounting/admin/fee-categories/{fee_category}/edit'
 */
        editForm.head = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
export const update = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/accounting/admin/fee-categories/{fee_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
update.url = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_category: typeof args.fee_category === 'object'
                ? args.fee_category.id
                : args.fee_category,
                }

    return update.definition.url
            .replace('{fee_category}', parsedArgs.fee_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
update.put = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
update.patch = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
    const updateForm = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
        updateForm.put = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:41
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
        updateForm.patch = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:54
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
export const destroy = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/accounting/admin/fee-categories/{fee_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:54
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
destroy.url = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_category: typeof args.fee_category === 'object'
                ? args.fee_category.id
                : args.fee_category,
                }

    return destroy.definition.url
            .replace('{fee_category}', parsedArgs.fee_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:54
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
destroy.delete = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:54
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
    const destroyForm = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeCategoryController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeCategoryController.php:54
 * @route '/accounting/admin/fee-categories/{fee_category}'
 */
        destroyForm.delete = (args: { fee_category: number | { id: number } } | [fee_category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const FeeCategoryController = { index, create, store, show, edit, update, destroy }

export default FeeCategoryController