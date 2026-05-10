import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import requests from './requests'
import auditLogs5bd45d from './audit-logs'
import analytics72d765 from './analytics'
import bulk from './bulk'
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::analytics
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::analytics
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::analytics
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::analytics
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
requests: Object.assign(requests, requests),
auditLogs: Object.assign(auditLogs, auditLogs5bd45d),
analytics: Object.assign(analytics, analytics72d765),
bulk: Object.assign(bulk, bulk),
}

export default admin