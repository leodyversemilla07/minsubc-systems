import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:18
 * @route '/voting/admin/positions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/positions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:18
 * @route '/voting/admin/positions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:18
 * @route '/voting/admin/positions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:18
 * @route '/voting/admin/positions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:40
 * @route '/voting/admin/positions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/admin/positions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:40
 * @route '/voting/admin/positions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:40
 * @route '/voting/admin/positions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:40
 * @route '/voting/admin/positions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:54
 * @route '/voting/admin/positions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/admin/positions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:54
 * @route '/voting/admin/positions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:54
 * @route '/voting/admin/positions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:72
 * @route '/voting/admin/positions/{position}'
 */
export const show = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/positions/{position}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:72
 * @route '/voting/admin/positions/{position}'
 */
show.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return show.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:72
 * @route '/voting/admin/positions/{position}'
 */
show.get = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:72
 * @route '/voting/admin/positions/{position}'
 */
show.head = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:82
 * @route '/voting/admin/positions/{position}/edit'
 */
export const edit = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/voting/admin/positions/{position}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:82
 * @route '/voting/admin/positions/{position}/edit'
 */
edit.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return edit.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:82
 * @route '/voting/admin/positions/{position}/edit'
 */
edit.get = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::edit
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:82
 * @route '/voting/admin/positions/{position}/edit'
 */
edit.head = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:92
 * @route '/voting/admin/positions/{position}'
 */
export const update = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/voting/admin/positions/{position}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:92
 * @route '/voting/admin/positions/{position}'
 */
update.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return update.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:92
 * @route '/voting/admin/positions/{position}'
 */
update.put = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:109
 * @route '/voting/admin/positions/{position}'
 */
export const destroy = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voting/admin/positions/{position}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:109
 * @route '/voting/admin/positions/{position}'
 */
destroy.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return destroy.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:109
 * @route '/voting/admin/positions/{position}'
 */
destroy.delete = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveUp
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:121
 * @route '/voting/admin/positions/{position}/move-up'
 */
export const moveUp = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: moveUp.url(args, options),
    method: 'post',
})

moveUp.definition = {
    methods: ["post"],
    url: '/voting/admin/positions/{position}/move-up',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveUp
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:121
 * @route '/voting/admin/positions/{position}/move-up'
 */
moveUp.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return moveUp.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveUp
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:121
 * @route '/voting/admin/positions/{position}/move-up'
 */
moveUp.post = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: moveUp.url(args, options),
    method: 'post',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveDown
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:145
 * @route '/voting/admin/positions/{position}/move-down'
 */
export const moveDown = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: moveDown.url(args, options),
    method: 'post',
})

moveDown.definition = {
    methods: ["post"],
    url: '/voting/admin/positions/{position}/move-down',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveDown
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:145
 * @route '/voting/admin/positions/{position}/move-down'
 */
moveDown.url = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { position: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'position_id' in args) {
            args = { position: args.position_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    position: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        position: typeof args.position === 'object'
                ? args.position.position_id
                : args.position,
                }

    return moveDown.definition.url
            .replace('{position}', parsedArgs.position.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\PositionController::moveDown
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/PositionController.php:145
 * @route '/voting/admin/positions/{position}/move-down'
 */
moveDown.post = (args: { position: number | { position_id: number } } | [position: number | { position_id: number } ] | number | { position_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: moveDown.url(args, options),
    method: 'post',
})
const positions = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
moveUp: Object.assign(moveUp, moveUp),
moveDown: Object.assign(moveDown, moveDown),
}

export default positions