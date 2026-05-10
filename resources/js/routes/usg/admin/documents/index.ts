import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:26
 * @route '/usg/admin/documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:26
 * @route '/usg/admin/documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:26
 * @route '/usg/admin/documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:26
 * @route '/usg/admin/documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::create
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:56
 * @route '/usg/admin/documents/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::create
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:56
 * @route '/usg/admin/documents/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::create
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:56
 * @route '/usg/admin/documents/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::create
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:56
 * @route '/usg/admin/documents/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::store
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:68
 * @route '/usg/admin/documents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::store
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:68
 * @route '/usg/admin/documents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::store
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:68
 * @route '/usg/admin/documents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::show
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:83
 * @route '/usg/admin/documents/{document}'
 */
export const show = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/documents/{document}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::show
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:83
 * @route '/usg/admin/documents/{document}'
 */
show.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return show.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::show
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:83
 * @route '/usg/admin/documents/{document}'
 */
show.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::show
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:83
 * @route '/usg/admin/documents/{document}'
 */
show.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:95
 * @route '/usg/admin/documents/{document}/edit'
 */
export const edit = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/documents/{document}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:95
 * @route '/usg/admin/documents/{document}/edit'
 */
edit.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return edit.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:95
 * @route '/usg/admin/documents/{document}/edit'
 */
edit.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:95
 * @route '/usg/admin/documents/{document}/edit'
 */
edit.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::update
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:109
 * @route '/usg/admin/documents/{document}'
 */
export const update = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/documents/{document}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::update
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:109
 * @route '/usg/admin/documents/{document}'
 */
update.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return update.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::update
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:109
 * @route '/usg/admin/documents/{document}'
 */
update.put = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::update
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:109
 * @route '/usg/admin/documents/{document}'
 */
update.patch = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:121
 * @route '/usg/admin/documents/{document}'
 */
export const destroy = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:121
 * @route '/usg/admin/documents/{document}'
 */
destroy.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return destroy.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:121
 * @route '/usg/admin/documents/{document}'
 */
destroy.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::download
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:133
 * @route '/usg/admin/documents/{document}/download'
 */
export const download = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/usg/admin/documents/{document}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::download
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:133
 * @route '/usg/admin/documents/{document}/download'
 */
download.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return download.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::download
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:133
 * @route '/usg/admin/documents/{document}/download'
 */
download.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DocumentController::download
 * @see Modules/USG/app/Http/Controllers/Admin/DocumentController.php:133
 * @route '/usg/admin/documents/{document}/download'
 */
download.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})
const documents = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
download: Object.assign(download, download),
}

export default documents