import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/discounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:13
 * @route '/accounting/admin/discounts'
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
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/discounts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:19
 * @route '/accounting/admin/discounts/create'
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
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:24
 * @route '/accounting/admin/discounts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/discounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:24
 * @route '/accounting/admin/discounts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:24
 * @route '/accounting/admin/discounts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:24
 * @route '/accounting/admin/discounts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:24
 * @route '/accounting/admin/discounts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
export const show = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/discounts/{discount}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
show.url = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    discount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        discount: args.discount,
                }

    return show.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
show.get = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
show.head = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
    const showForm = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
        showForm.get = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:0
 * @route '/accounting/admin/discounts/{discount}'
 */
        showForm.head = (args: { discount: string | number } | [discount: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
export const edit = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/discounts/{discount}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
edit.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { discount: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    discount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        discount: typeof args.discount === 'object'
                ? args.discount.id
                : args.discount,
                }

    return edit.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
edit.get = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
edit.head = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
    const editForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
        editForm.get = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:37
 * @route '/accounting/admin/discounts/{discount}/edit'
 */
        editForm.head = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
export const update = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/accounting/admin/discounts/{discount}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
update.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { discount: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    discount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        discount: typeof args.discount === 'object'
                ? args.discount.id
                : args.discount,
                }

    return update.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
update.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
update.patch = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
    const updateForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
        updateForm.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:42
 * @route '/accounting/admin/discounts/{discount}'
 */
        updateForm.patch = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:56
 * @route '/accounting/admin/discounts/{discount}'
 */
export const destroy = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/accounting/admin/discounts/{discount}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:56
 * @route '/accounting/admin/discounts/{discount}'
 */
destroy.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { discount: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    discount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        discount: typeof args.discount === 'object'
                ? args.discount.id
                : args.discount,
                }

    return destroy.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:56
 * @route '/accounting/admin/discounts/{discount}'
 */
destroy.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:56
 * @route '/accounting/admin/discounts/{discount}'
 */
    const destroyForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DiscountController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/DiscountController.php:56
 * @route '/accounting/admin/discounts/{discount}'
 */
        destroyForm.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DiscountController = { index, create, store, show, edit, update, destroy }

export default DiscountController