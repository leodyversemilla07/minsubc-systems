import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import alumni from './alumni'
import events from './events'
import donations from './donations'
import employmentRecords from './employment-records'
import surveys from './surveys'
import reports from './reports'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/alumni/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
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
alumni: Object.assign(alumni, alumni),
events: Object.assign(events, events),
donations: Object.assign(donations, donations),
employmentRecords: Object.assign(employmentRecords, employmentRecords),
surveys: Object.assign(surveys, surveys),
reports: Object.assign(reports, reports),
}

export default admin