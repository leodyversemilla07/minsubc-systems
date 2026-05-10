import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:16
 * @route '/library/admin/borrowings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:16
 * @route '/library/admin/borrowings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:16
 * @route '/library/admin/borrowings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:16
 * @route '/library/admin/borrowings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::active
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:40
 * @route '/library/admin/borrowings/active'
 */
export const active = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

active.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::active
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:40
 * @route '/library/admin/borrowings/active'
 */
active.url = (options?: RouteQueryOptions) => {
    return active.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::active
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:40
 * @route '/library/admin/borrowings/active'
 */
active.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::active
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:40
 * @route '/library/admin/borrowings/active'
 */
active.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::overdue
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:45
 * @route '/library/admin/borrowings/overdue'
 */
export const overdue = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overdue.url(options),
    method: 'get',
})

overdue.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings/overdue',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::overdue
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:45
 * @route '/library/admin/borrowings/overdue'
 */
overdue.url = (options?: RouteQueryOptions) => {
    return overdue.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::overdue
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:45
 * @route '/library/admin/borrowings/overdue'
 */
overdue.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overdue.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::overdue
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:45
 * @route '/library/admin/borrowings/overdue'
 */
overdue.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overdue.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::history
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:58
 * @route '/library/admin/borrowings/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::history
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:58
 * @route '/library/admin/borrowings/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::history
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:58
 * @route '/library/admin/borrowings/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::history
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:58
 * @route '/library/admin/borrowings/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:63
 * @route '/library/admin/borrowings/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:63
 * @route '/library/admin/borrowings/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:63
 * @route '/library/admin/borrowings/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::create
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:63
 * @route '/library/admin/borrowings/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:69
 * @route '/library/admin/borrowings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/library/admin/borrowings',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:69
 * @route '/library/admin/borrowings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::store
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:69
 * @route '/library/admin/borrowings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:100
 * @route '/library/admin/borrowings/{borrowing}'
 */
export const show = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/admin/borrowings/{borrowing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:100
 * @route '/library/admin/borrowings/{borrowing}'
 */
show.url = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return show.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:100
 * @route '/library/admin/borrowings/{borrowing}'
 */
show.get = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:100
 * @route '/library/admin/borrowings/{borrowing}'
 */
show.head = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::approve
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:106
 * @route '/library/admin/borrowings/{borrowing}/approve'
 */
export const approve = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/library/admin/borrowings/{borrowing}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::approve
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:106
 * @route '/library/admin/borrowings/{borrowing}/approve'
 */
approve.url = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return approve.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::approve
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:106
 * @route '/library/admin/borrowings/{borrowing}/approve'
 */
approve.post = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::returnMethod
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:124
 * @route '/library/admin/borrowings/{borrowing}/return'
 */
export const returnMethod = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: returnMethod.url(args, options),
    method: 'post',
})

returnMethod.definition = {
    methods: ["post"],
    url: '/library/admin/borrowings/{borrowing}/return',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::returnMethod
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:124
 * @route '/library/admin/borrowings/{borrowing}/return'
 */
returnMethod.url = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return returnMethod.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::returnMethod
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:124
 * @route '/library/admin/borrowings/{borrowing}/return'
 */
returnMethod.post = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: returnMethod.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::markLost
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:151
 * @route '/library/admin/borrowings/{borrowing}/mark-lost'
 */
export const markLost = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLost.url(args, options),
    method: 'post',
})

markLost.definition = {
    methods: ["post"],
    url: '/library/admin/borrowings/{borrowing}/mark-lost',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::markLost
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:151
 * @route '/library/admin/borrowings/{borrowing}/mark-lost'
 */
markLost.url = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return markLost.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BorrowingController::markLost
 * @see Modules/Library/app/Http/Controllers/Admin/BorrowingController.php:151
 * @route '/library/admin/borrowings/{borrowing}/mark-lost'
 */
markLost.post = (args: { borrowing: string | number | { id: string | number } } | [borrowing: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLost.url(args, options),
    method: 'post',
})
const borrowings = {
    index: Object.assign(index, index),
active: Object.assign(active, active),
overdue: Object.assign(overdue, overdue),
history: Object.assign(history, history),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
approve: Object.assign(approve, approve),
return: Object.assign(returnMethod, returnMethod),
markLost: Object.assign(markLost, markLost),
}

export default borrowings