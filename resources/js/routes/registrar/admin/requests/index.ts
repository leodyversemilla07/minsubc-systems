import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
export const show = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/requests/{documentRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return show.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
export const updateStatus = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/requests/{documentRequest}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
updateStatus.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return updateStatus.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
updateStatus.patch = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
export const markReady = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReady.url(args, options),
    method: 'post',
})

markReady.definition = {
    methods: ["post"],
    url: '/admin/requests/{documentRequest}/ready',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
markReady.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return markReady.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
markReady.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReady.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::release
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
export const release = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: release.url(args, options),
    method: 'post',
})

release.definition = {
    methods: ["post"],
    url: '/admin/requests/{documentRequest}/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::release
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
release.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return release.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::release
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
release.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: release.url(args, options),
    method: 'post',
})
const requests = {
    show: Object.assign(show, show),
updateStatus: Object.assign(updateStatus, updateStatus),
markReady: Object.assign(markReady, markReady),
release: Object.assign(release, release),
}

export default requests