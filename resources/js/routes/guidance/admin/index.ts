import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import counselors from './counselors'
import slots from './slots'
import appointments from './appointments'
import sessions from './sessions'
import assessments from './assessments'
import referrals from './referrals'
import interventions from './interventions'
import incidentReports from './incident-reports'
import reports from './reports'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:27
 * @route '/guidance/admin/dashboard'
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
counselors: Object.assign(counselors, counselors),
slots: Object.assign(slots, slots),
appointments: Object.assign(appointments, appointments),
sessions: Object.assign(sessions, sessions),
assessments: Object.assign(assessments, assessments),
referrals: Object.assign(referrals, referrals),
interventions: Object.assign(interventions, interventions),
incidentReports: Object.assign(incidentReports, incidentReports),
reports: Object.assign(reports, reports),
}

export default admin