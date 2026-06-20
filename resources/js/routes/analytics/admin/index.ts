import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::dashboard
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
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
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
}

export default admin