import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/books',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:14
 * @route '/library/admin/books'
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/library/admin/books/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:36
 * @route '/library/admin/books/create'
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:42
 * @route '/library/admin/books'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/library/admin/books',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:42
 * @route '/library/admin/books'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:42
 * @route '/library/admin/books'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:42
 * @route '/library/admin/books'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:42
 * @route '/library/admin/books'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
export const show = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/admin/books/{book}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
show.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return show.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
show.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
show.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
    const showForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
        showForm.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
        showForm.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
export const edit = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/library/admin/books/{book}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
edit.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return edit.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
edit.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
edit.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
    const editForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
        editForm.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
        editForm.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
export const update = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/library/admin/books/{book}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
update.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return update.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
update.put = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
update.patch = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
    const updateForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
        updateForm.put = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
        updateForm.patch = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
export const destroy = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/library/admin/books/{book}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
destroy.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return destroy.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
destroy.delete = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
    const destroyForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
        destroyForm.delete = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
export const addCopies = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCopies.url(args, options),
    method: 'post',
})

addCopies.definition = {
    methods: ["post"],
    url: '/library/admin/books/{book}/add-copies',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
addCopies.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return addCopies.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
addCopies.post = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCopies.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
    const addCopiesForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addCopies.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
        addCopiesForm.post = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addCopies.url(args, options),
            method: 'post',
        })
    
    addCopies.form = addCopiesForm
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/library/books/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
export const popular = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})

popular.definition = {
    methods: ["get","head"],
    url: '/api/library/books/popular',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.url = (options?: RouteQueryOptions) => {
    return popular.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: popular.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
    const popularForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: popular.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
        popularForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popular.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
        popularForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popular.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    popular.form = popularForm
const BookController = { index, create, store, show, edit, update, destroy, addCopies, search, popular }

export default BookController