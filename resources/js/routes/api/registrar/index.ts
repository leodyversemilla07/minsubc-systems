import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::index
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:13
 * @route '/api/v1/registrars'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/registrars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::index
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:13
 * @route '/api/v1/registrars'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::index
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:13
 * @route '/api/v1/registrars'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::index
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:13
 * @route '/api/v1/registrars'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::store
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:29
 * @route '/api/v1/registrars'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/registrars',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::store
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:29
 * @route '/api/v1/registrars'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::store
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:29
 * @route '/api/v1/registrars'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::show
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:34
 * @route '/api/v1/registrars/{registrar}'
 */
export const show = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/registrars/{registrar}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::show
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:34
 * @route '/api/v1/registrars/{registrar}'
 */
show.url = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registrar: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    registrar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registrar: args.registrar,
                }

    return show.definition.url
            .replace('{registrar}', parsedArgs.registrar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::show
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:34
 * @route '/api/v1/registrars/{registrar}'
 */
show.get = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::show
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:34
 * @route '/api/v1/registrars/{registrar}'
 */
show.head = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::update
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:50
 * @route '/api/v1/registrars/{registrar}'
 */
export const update = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/registrars/{registrar}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::update
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:50
 * @route '/api/v1/registrars/{registrar}'
 */
update.url = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registrar: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    registrar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registrar: args.registrar,
                }

    return update.definition.url
            .replace('{registrar}', parsedArgs.registrar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::update
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:50
 * @route '/api/v1/registrars/{registrar}'
 */
update.put = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::update
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:50
 * @route '/api/v1/registrars/{registrar}'
 */
update.patch = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::destroy
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:55
 * @route '/api/v1/registrars/{registrar}'
 */
export const destroy = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/registrars/{registrar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::destroy
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:55
 * @route '/api/v1/registrars/{registrar}'
 */
destroy.url = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registrar: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    registrar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registrar: args.registrar,
                }

    return destroy.definition.url
            .replace('{registrar}', parsedArgs.registrar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\RegistrarController::destroy
 * @see Modules/Registrar/app/Http/Controllers/RegistrarController.php:55
 * @route '/api/v1/registrars/{registrar}'
 */
destroy.delete = (args: { registrar: string | number } | [registrar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const registrar = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default registrar