import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import events from './events'
import academicSchedules from './academic-schedules'
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/scheduling/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Scheduling/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/scheduling/dashboard'
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
events: Object.assign(events, events),
academicSchedules: Object.assign(academicSchedules, academicSchedules),
}

export default admin