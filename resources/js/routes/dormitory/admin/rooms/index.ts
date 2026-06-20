import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/rooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:12
 * @route '/admin/dormitory/rooms'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/rooms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::create
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/create'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:18
 * @route '/admin/dormitory/rooms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/dormitory/rooms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:18
 * @route '/admin/dormitory/rooms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:18
 * @route '/admin/dormitory/rooms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:18
 * @route '/admin/dormitory/rooms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::store
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:18
 * @route '/admin/dormitory/rooms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/{room}'
 */
export const destroy = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/dormitory/rooms/{room}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/{room}'
 */
destroy.url = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: args.room,
                }

    return destroy.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/{room}'
 */
destroy.delete = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/{room}'
 */
    const destroyForm = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\RoomController::destroy
 * @see Modules/Dormitory/app/Http/Controllers/Admin/RoomController.php:0
 * @route '/admin/dormitory/rooms/{room}'
 */
        destroyForm.delete = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rooms = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default rooms