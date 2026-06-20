import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import offenseCategories from './offense-categories'
import offenses from './offenses'
import incidents from './incidents'
import sanctions from './sanctions'
import appeals from './appeals'
import reports from './reports'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
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
offenseCategories: Object.assign(offenseCategories, offenseCategories),
offenses: Object.assign(offenses, offenses),
incidents: Object.assign(incidents, incidents),
sanctions: Object.assign(sanctions, sanctions),
appeals: Object.assign(appeals, appeals),
reports: Object.assign(reports, reports),
}

export default admin