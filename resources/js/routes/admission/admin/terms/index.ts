import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:18
 * @route '/admission/admin/terms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/terms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:18
 * @route '/admission/admin/terms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:18
 * @route '/admission/admin/terms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:18
 * @route '/admission/admin/terms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:37
 * @route '/admission/admin/terms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/terms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:37
 * @route '/admission/admin/terms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:37
 * @route '/admission/admin/terms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:37
 * @route '/admission/admin/terms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:45
 * @route '/admission/admin/terms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/terms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:45
 * @route '/admission/admin/terms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:45
 * @route '/admission/admin/terms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:73
 * @route '/admission/admin/terms/{term}'
 */
export const show = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/terms/{term}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:73
 * @route '/admission/admin/terms/{term}'
 */
show.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return show.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:73
 * @route '/admission/admin/terms/{term}'
 */
show.get = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:73
 * @route '/admission/admin/terms/{term}'
 */
show.head = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:96
 * @route '/admission/admin/terms/{term}/edit'
 */
export const edit = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/terms/{term}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:96
 * @route '/admission/admin/terms/{term}/edit'
 */
edit.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return edit.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:96
 * @route '/admission/admin/terms/{term}/edit'
 */
edit.get = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:96
 * @route '/admission/admin/terms/{term}/edit'
 */
edit.head = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:106
 * @route '/admission/admin/terms/{term}'
 */
export const update = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/terms/{term}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:106
 * @route '/admission/admin/terms/{term}'
 */
update.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return update.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:106
 * @route '/admission/admin/terms/{term}'
 */
update.patch = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:134
 * @route '/admission/admin/terms/{term}'
 */
export const destroy = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/terms/{term}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:134
 * @route '/admission/admin/terms/{term}'
 */
destroy.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return destroy.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:134
 * @route '/admission/admin/terms/{term}'
 */
destroy.delete = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::setActive
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:152
 * @route '/admission/admin/terms/{term}/set-active'
 */
export const setActive = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setActive.url(args, options),
    method: 'post',
})

setActive.definition = {
    methods: ["post"],
    url: '/admission/admin/terms/{term}/set-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::setActive
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:152
 * @route '/admission/admin/terms/{term}/set-active'
 */
setActive.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return setActive.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\AcademicTermController::setActive
 * @see Modules/Admission/app/Http/Controllers/Admin/AcademicTermController.php:152
 * @route '/admission/admin/terms/{term}/set-active'
 */
setActive.post = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setActive.url(args, options),
    method: 'post',
})
const terms = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
setActive: Object.assign(setActive, setActive),
}

export default terms