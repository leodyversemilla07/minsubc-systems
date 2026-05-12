import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:14
 * @route '/accounting/admin/fee-items'
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-items/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:20
 * @route '/accounting/admin/fee-items/create'
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:26
 * @route '/accounting/admin/fee-items'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/fee-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:26
 * @route '/accounting/admin/fee-items'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:26
 * @route '/accounting/admin/fee-items'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:26
 * @route '/accounting/admin/fee-items'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:26
 * @route '/accounting/admin/fee-items'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
export const show = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-items/{fee_item}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
show.url = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_item: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    fee_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_item: args.fee_item,
                }

    return show.definition.url
            .replace('{fee_item}', parsedArgs.fee_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
show.get = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
show.head = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
    const showForm = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
        showForm.get = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:0
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
        showForm.head = (args: { fee_item: string | number } | [fee_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
export const edit = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/fee-items/{fee_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
edit.url = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_item: typeof args.fee_item === 'object'
                ? args.fee_item.id
                : args.fee_item,
                }

    return edit.definition.url
            .replace('{fee_item}', parsedArgs.fee_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
edit.get = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
edit.head = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
    const editForm = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
        editForm.get = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:41
 * @route '/accounting/admin/fee-items/{fee_item}/edit'
 */
        editForm.head = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
export const update = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/accounting/admin/fee-items/{fee_item}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
update.url = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_item: typeof args.fee_item === 'object'
                ? args.fee_item.id
                : args.fee_item,
                }

    return update.definition.url
            .replace('{fee_item}', parsedArgs.fee_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
update.put = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
update.patch = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
    const updateForm = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
        updateForm.put = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:47
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
        updateForm.patch = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:63
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
export const destroy = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/accounting/admin/fee-items/{fee_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:63
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
destroy.url = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fee_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fee_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fee_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fee_item: typeof args.fee_item === 'object'
                ? args.fee_item.id
                : args.fee_item,
                }

    return destroy.definition.url
            .replace('{fee_item}', parsedArgs.fee_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:63
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
destroy.delete = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:63
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
    const destroyForm = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:63
 * @route '/accounting/admin/fee-items/{fee_item}'
 */
        destroyForm.delete = (args: { fee_item: number | { id: number } } | [fee_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/accounting/fee-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
const FeeItemController = { index, create, store, show, edit, update, destroy, list }

export default FeeItemController