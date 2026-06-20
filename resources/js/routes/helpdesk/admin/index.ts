import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import tickets from './tickets'
import categories from './categories'
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/DashboardController.php:11
 * @route '/admin/helpdesk/dashboard'
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::reports
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
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
tickets: Object.assign(tickets, tickets),
categories: Object.assign(categories, categories),
reports: Object.assign(reports, reports),
}

export default admin