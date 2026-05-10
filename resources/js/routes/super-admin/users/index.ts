import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
export const show = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/super-admin/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
show.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
show.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
show.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::updateRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
export const updateRoles = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRoles.url(args, options),
    method: 'patch',
})

updateRoles.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/roles',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::updateRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
updateRoles.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return updateRoles.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::updateRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
updateRoles.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRoles.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::resetPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
export const resetPassword = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resetPassword.url(args, options),
    method: 'patch',
})

resetPassword.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/reset-password',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::resetPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
resetPassword.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return resetPassword.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::resetPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
resetPassword.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resetPassword.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::disable
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
export const disable = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: disable.url(args, options),
    method: 'patch',
})

disable.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/disable',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::disable
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
disable.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return disable.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::disable
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
disable.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: disable.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::enable
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
export const enable = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: enable.url(args, options),
    method: 'patch',
})

enable.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/enable',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::enable
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
enable.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return enable.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::enable
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
enable.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: enable.url(args, options),
    method: 'patch',
})
const users = {
    show: Object.assign(show, show),
updateRoles: Object.assign(updateRoles, updateRoles),
resetPassword: Object.assign(resetPassword, resetPassword),
disable: Object.assign(disable, disable),
enable: Object.assign(enable, enable),
}

export default users