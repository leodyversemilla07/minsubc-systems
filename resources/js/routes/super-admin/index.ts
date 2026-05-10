import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import users48860f from './users'
import systemSettings2a45d2 from './system-settings'
import auditLogs5bd45d from './audit-logs'
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
const superAdmin = {
    dashboard: Object.assign(dashboard, dashboard),
analytics: Object.assign(analytics, analytics),
users: Object.assign(users, users48860f),
systemSettings: Object.assign(systemSettings, systemSettings2a45d2),
auditLogs: Object.assign(auditLogs, auditLogs5bd45d),
reports: Object.assign(reports, reports),
systemConfig: Object.assign(systemConfig, systemConfig),
}

export default superAdmin