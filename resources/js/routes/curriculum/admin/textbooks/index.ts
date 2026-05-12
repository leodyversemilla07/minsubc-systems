import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/textbooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:13
 * @route '/curriculum/admin/textbooks'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/textbooks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:18
 * @route '/curriculum/admin/textbooks/create'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:19
 * @route '/curriculum/admin/textbooks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/textbooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:19
 * @route '/curriculum/admin/textbooks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:19
 * @route '/curriculum/admin/textbooks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:19
 * @route '/curriculum/admin/textbooks'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:19
 * @route '/curriculum/admin/textbooks'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
export const show = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/textbooks/{textbook}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
show.url = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { textbook: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    textbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        textbook: args.textbook,
                }

    return show.definition.url
            .replace('{textbook}', parsedArgs.textbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
show.get = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
show.head = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
    const showForm = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
        showForm.get = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:0
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
        showForm.head = (args: { textbook: string | number } | [textbook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
export const edit = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/textbooks/{textbook}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
edit.url = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { textbook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { textbook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    textbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        textbook: typeof args.textbook === 'object'
                ? args.textbook.id
                : args.textbook,
                }

    return edit.definition.url
            .replace('{textbook}', parsedArgs.textbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
edit.get = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
edit.head = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
    const editForm = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
        editForm.get = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:25
 * @route '/curriculum/admin/textbooks/{textbook}/edit'
 */
        editForm.head = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
export const update = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/textbooks/{textbook}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
update.url = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { textbook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { textbook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    textbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        textbook: typeof args.textbook === 'object'
                ? args.textbook.id
                : args.textbook,
                }

    return update.definition.url
            .replace('{textbook}', parsedArgs.textbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
update.put = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
update.patch = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
    const updateForm = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
        updateForm.put = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:26
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
        updateForm.patch = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:32
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
export const destroy = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/textbooks/{textbook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:32
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
destroy.url = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { textbook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { textbook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    textbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        textbook: typeof args.textbook === 'object'
                ? args.textbook.id
                : args.textbook,
                }

    return destroy.definition.url
            .replace('{textbook}', parsedArgs.textbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:32
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
destroy.delete = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:32
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
    const destroyForm = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\TextbookController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/TextbookController.php:32
 * @route '/curriculum/admin/textbooks/{textbook}'
 */
        destroyForm.delete = (args: { textbook: number | { id: number } } | [textbook: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const textbooks = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default textbooks