import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
export const edit = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
edit.url = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
edit.get = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::edit
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:37
 * @route '/library/admin/categories/{category}/edit'
 */
edit.head = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
export const update = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
update.put = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::update
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:42
 * @route '/library/admin/categories/{category}'
 */
update.patch = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::destroy
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:56
 * @route '/library/admin/categories/{category}'
 */
export const destroy = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::list
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/library/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::list
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::list
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::list
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})
const BookCategoryController = { index, create, store, show, edit, update, destroy, list }

export default BookCategoryController