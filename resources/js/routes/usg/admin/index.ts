import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import analytics72d765 from './analytics'
import vmgo from './vmgo'
import officers from './officers'
import announcements from './announcements'
import events from './events'
import resolutions from './resolutions'
import documents from './documents'
import transparency from './transparency'
/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/usg/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
analytics: Object.assign(analytics, analytics72d765),
vmgo: Object.assign(vmgo, vmgo),
officers: Object.assign(officers, officers),
announcements: Object.assign(announcements, announcements),
events: Object.assign(events, events),
resolutions: Object.assign(resolutions, resolutions),
documents: Object.assign(documents, documents),
transparency: Object.assign(transparency, transparency),
}

export default admin