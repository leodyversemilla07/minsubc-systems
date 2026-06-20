import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import facilities from './facilities'
import equipment from './equipment'
import reservations from './reservations'
import maintenance from './maintenance'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
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
facilities: Object.assign(facilities, facilities),
equipment: Object.assign(equipment, equipment),
reservations: Object.assign(reservations, reservations),
maintenance: Object.assign(maintenance, maintenance),
}

export default admin