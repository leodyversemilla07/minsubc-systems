import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import halls from './halls'
import rooms from './rooms'
import assignments from './assignments'
import maintenance from './maintenance'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Dormitory/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dormitory/dashboard'
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
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
halls: Object.assign(halls, halls),
rooms: Object.assign(rooms, rooms),
assignments: Object.assign(assignments, assignments),
maintenance: Object.assign(maintenance, maintenance),
reports: Object.assign(reports, reports),
}

export default admin