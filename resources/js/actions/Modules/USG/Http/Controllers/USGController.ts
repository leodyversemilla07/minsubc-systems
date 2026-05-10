import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\USGController::index
 * @see Modules/USG/app/Http/Controllers/USGController.php:13
 * @route '/api/v1/usgs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/usgs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\USGController::index
 * @see Modules/USG/app/Http/Controllers/USGController.php:13
 * @route '/api/v1/usgs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\USGController::index
 * @see Modules/USG/app/Http/Controllers/USGController.php:13
 * @route '/api/v1/usgs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\USGController::index
 * @see Modules/USG/app/Http/Controllers/USGController.php:13
 * @route '/api/v1/usgs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\USGController::store
 * @see Modules/USG/app/Http/Controllers/USGController.php:29
 * @route '/api/v1/usgs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/usgs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\USGController::store
 * @see Modules/USG/app/Http/Controllers/USGController.php:29
 * @route '/api/v1/usgs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\USGController::store
 * @see Modules/USG/app/Http/Controllers/USGController.php:29
 * @route '/api/v1/usgs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\USG\Http\Controllers\USGController::show
 * @see Modules/USG/app/Http/Controllers/USGController.php:34
 * @route '/api/v1/usgs/{usg}'
 */
export const show = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/usgs/{usg}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\USGController::show
 * @see Modules/USG/app/Http/Controllers/USGController.php:34
 * @route '/api/v1/usgs/{usg}'
 */
show.url = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { usg: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    usg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        usg: args.usg,
                }

    return show.definition.url
            .replace('{usg}', parsedArgs.usg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\USGController::show
 * @see Modules/USG/app/Http/Controllers/USGController.php:34
 * @route '/api/v1/usgs/{usg}'
 */
show.get = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\USGController::show
 * @see Modules/USG/app/Http/Controllers/USGController.php:34
 * @route '/api/v1/usgs/{usg}'
 */
show.head = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\USGController::update
 * @see Modules/USG/app/Http/Controllers/USGController.php:50
 * @route '/api/v1/usgs/{usg}'
 */
export const update = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/usgs/{usg}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\USGController::update
 * @see Modules/USG/app/Http/Controllers/USGController.php:50
 * @route '/api/v1/usgs/{usg}'
 */
update.url = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { usg: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    usg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        usg: args.usg,
                }

    return update.definition.url
            .replace('{usg}', parsedArgs.usg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\USGController::update
 * @see Modules/USG/app/Http/Controllers/USGController.php:50
 * @route '/api/v1/usgs/{usg}'
 */
update.put = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\USGController::update
 * @see Modules/USG/app/Http/Controllers/USGController.php:50
 * @route '/api/v1/usgs/{usg}'
 */
update.patch = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\USGController::destroy
 * @see Modules/USG/app/Http/Controllers/USGController.php:55
 * @route '/api/v1/usgs/{usg}'
 */
export const destroy = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/usgs/{usg}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\USGController::destroy
 * @see Modules/USG/app/Http/Controllers/USGController.php:55
 * @route '/api/v1/usgs/{usg}'
 */
destroy.url = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { usg: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    usg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        usg: args.usg,
                }

    return destroy.definition.url
            .replace('{usg}', parsedArgs.usg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\USGController::destroy
 * @see Modules/USG/app/Http/Controllers/USGController.php:55
 * @route '/api/v1/usgs/{usg}'
 */
destroy.delete = (args: { usg: string | number } | [usg: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const USGController = { index, store, show, update, destroy }

export default USGController