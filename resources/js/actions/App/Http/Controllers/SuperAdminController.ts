import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/super-admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/super-admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/super-admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::showUser
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
export const showUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUser.url(args, options),
    method: 'get',
})

showUser.definition = {
    methods: ["get","head"],
    url: '/super-admin/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::showUser
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
showUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::showUser
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
showUser.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUser.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::showUser
 * @see app/Http/Controllers/SuperAdminController.php:124
 * @route '/super-admin/users/{user}'
 */
showUser.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showUser.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::updateUserRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
export const updateUserRoles = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUserRoles.url(args, options),
    method: 'patch',
})

updateUserRoles.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/roles',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::updateUserRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
updateUserRoles.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateUserRoles.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::updateUserRoles
 * @see app/Http/Controllers/SuperAdminController.php:141
 * @route '/super-admin/users/{user}/roles'
 */
updateUserRoles.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUserRoles.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::resetUserPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
export const resetUserPassword = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resetUserPassword.url(args, options),
    method: 'patch',
})

resetUserPassword.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/reset-password',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::resetUserPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
resetUserPassword.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return resetUserPassword.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::resetUserPassword
 * @see app/Http/Controllers/SuperAdminController.php:172
 * @route '/super-admin/users/{user}/reset-password'
 */
resetUserPassword.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resetUserPassword.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::disableUser
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
export const disableUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: disableUser.url(args, options),
    method: 'patch',
})

disableUser.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/disable',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::disableUser
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
disableUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return disableUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::disableUser
 * @see app/Http/Controllers/SuperAdminController.php:200
 * @route '/super-admin/users/{user}/disable'
 */
disableUser.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: disableUser.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::enableUser
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
export const enableUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: enableUser.url(args, options),
    method: 'patch',
})

enableUser.definition = {
    methods: ["patch"],
    url: '/super-admin/users/{user}/enable',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::enableUser
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
enableUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return enableUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::enableUser
 * @see app/Http/Controllers/SuperAdminController.php:232
 * @route '/super-admin/users/{user}/enable'
 */
enableUser.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: enableUser.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
export const systemSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemSettings.url(options),
    method: 'get',
})

systemSettings.definition = {
    methods: ["get","head"],
    url: '/super-admin/system-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.url = (options?: RouteQueryOptions) => {
    return systemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemSettings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::updateSystemSetting
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
export const updateSystemSetting = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSystemSetting.url(args, options),
    method: 'patch',
})

updateSystemSetting.definition = {
    methods: ["patch"],
    url: '/super-admin/system-settings/{systemSetting}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::updateSystemSetting
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
updateSystemSetting.url = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { systemSetting: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { systemSetting: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    systemSetting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        systemSetting: typeof args.systemSetting === 'object'
                ? args.systemSetting.id
                : args.systemSetting,
                }

    return updateSystemSetting.definition.url
            .replace('{systemSetting}', parsedArgs.systemSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::updateSystemSetting
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
updateSystemSetting.patch = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSystemSetting.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/super-admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::showAuditLog
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
export const showAuditLog = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAuditLog.url(args, options),
    method: 'get',
})

showAuditLog.definition = {
    methods: ["get","head"],
    url: '/super-admin/audit-logs/{auditLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::showAuditLog
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
showAuditLog.url = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { auditLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { auditLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    auditLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        auditLog: typeof args.auditLog === 'object'
                ? args.auditLog.id
                : args.auditLog,
                }

    return showAuditLog.definition.url
            .replace('{auditLog}', parsedArgs.auditLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::showAuditLog
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
showAuditLog.get = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAuditLog.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::showAuditLog
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
showAuditLog.head = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showAuditLog.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/super-admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
export const systemConfig = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})

systemConfig.definition = {
    methods: ["get","head"],
    url: '/super-admin/system-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.url = (options?: RouteQueryOptions) => {
    return systemConfig.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemConfig.url(options),
    method: 'head',
})
const SuperAdminController = { dashboard, analytics, users, showUser, updateUserRoles, resetUserPassword, disableUser, enableUser, systemSettings, updateSystemSetting, auditLogs, showAuditLog, reports, systemConfig }

export default SuperAdminController