import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
export const show = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
show.get = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:66
 * @route '/library/admin/books/{book}'
 */
show.head = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
export const edit = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
edit.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
edit.get = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:72
 * @route '/library/admin/books/{book}/edit'
 */
edit.head = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
export const update = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
update.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
update.put = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:78
 * @route '/library/admin/books/{book}'
 */
update.patch = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:101
 * @route '/library/admin/books/{book}'
 */
export const destroy = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::addCopies
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:108
 * @route '/library/admin/books/{book}/add-copies'
 */
export const addCopies = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
addCopies.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
addCopies.post = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCopies.url(args, options),
    method: 'post',
})
const books = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
addCopies: Object.assign(addCopies, addCopies),
}

export default books