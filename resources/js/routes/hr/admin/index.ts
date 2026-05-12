import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import departments from './departments'
import positions from './positions'
import employees from './employees'
import attendance from './attendance'
import leave from './leave'
import evaluations from './evaluations'
import reports from './reports'
/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/hr/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
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
departments: Object.assign(departments, departments),
positions: Object.assign(positions, positions),
employees: Object.assign(employees, employees),
attendance: Object.assign(attendance, attendance),
leave: Object.assign(leave, leave),
evaluations: Object.assign(evaluations, evaluations),
reports: Object.assign(reports, reports),
}

export default admin